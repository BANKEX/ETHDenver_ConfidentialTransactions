package edu.stanford.cs.crypto.efficientct.rangeproof;

import edu.stanford.cs.crypto.efficientct.GeneratorParams;
import edu.stanford.cs.crypto.efficientct.VerificationFailedException;
import edu.stanford.cs.crypto.efficientct.Verifier;
import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;
import edu.stanford.cs.crypto.efficientct.ethereum.EfficientInnerProductVerifier;
import edu.stanford.cs.crypto.efficientct.ethereum.RangeProofVerifier;
import org.web3j.crypto.CipherException;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.WalletUtils;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

import static edu.stanford.cs.crypto.efficientct.ethereum.Utils.*;
import static java.math.BigInteger.ONE;
import static java.math.BigInteger.ZERO;
import static java.util.Arrays.asList;

public class EthereumRangeProofVerifier implements Verifier<GeneratorParams<BouncyCastleECPoint>, BouncyCastleECPoint, RangeProof<BouncyCastleECPoint>> {

    private final Web3j web3;
    private final Credentials credentials;

    public EthereumRangeProofVerifier() throws IOException, CipherException {
        web3 = Web3j.build(new HttpService());
        credentials = WalletUtils.loadCredentials("", "D:\\X\\keystore\\UTC--2018-02-13T05-21-48.441433000Z--f078b74999a55cb7c656a06d6b3b7e839f9495d4");

    }

    @Override
    public void verify(GeneratorParams<BouncyCastleECPoint> params, BouncyCastleECPoint input, RangeProof<BouncyCastleECPoint> proof) throws VerificationFailedException {
        List<BigInteger> constructor_coords = asList(
                getX(params.getBase().g),
                getY(params.getBase().g),
                getX(params.getBase().h),
                getY(params.getBase().h)
        );
        List<BigInteger> gs_coords = listCoords(params.getVectorBase().getGs().getVector());
        List<BigInteger> hs_coords = listCoords(params.getVectorBase().getHs().getVector());

        List<BigInteger> coords = asList(
                getX(input),
                getY(input),
                getX(proof.getaI()),
                getY(proof.getaI()),
                getX(proof.getS()),
                getY(proof.getS()),
                getX(proof.gettCommits().get(0)),
                getY(proof.gettCommits().get(0)),
                getX(proof.gettCommits().get(1)),
                getY(proof.gettCommits().get(1))
        );
        List<BigInteger> scalars = asList(
                proof.getTauX(),
                proof.getMu(),
                proof.getT(),
                proof.getProductProof().getA(),
                proof.getProductProof().getB()
        );
        List<BigInteger> ls = listCoords(proof.getProductProof().getL());
        List<BigInteger> rs = listCoords(proof.getProductProof().getR());

        Boolean result;
        try {
            RemoteCall<EfficientInnerProductVerifier> deployIpVerifier = EfficientInnerProductVerifier.deploy(web3, credentials, ONE, new BigInteger("4500000"), ZERO, ZERO, gs_coords, hs_coords);
            EfficientInnerProductVerifier ipVerifierWrapper = deployIpVerifier.send();
            RemoteCall<RangeProofVerifier> deployRpVerifier = RangeProofVerifier.deploy(web3, credentials, ONE, new BigInteger("4500000"), constructor_coords, gs_coords, hs_coords, ipVerifierWrapper.getContractAddress());
            RangeProofVerifier rpVerifierWrapper = deployRpVerifier.send();
            result = rpVerifierWrapper.verify(coords, scalars, ls, rs).send();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        equal(result, true, "Verification failed");
    }
}
