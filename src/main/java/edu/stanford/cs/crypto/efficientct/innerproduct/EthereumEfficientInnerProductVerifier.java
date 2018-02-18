package edu.stanford.cs.crypto.efficientct.innerproduct;

import edu.stanford.cs.crypto.efficientct.VerificationFailedException;
import edu.stanford.cs.crypto.efficientct.Verifier;
import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;
import edu.stanford.cs.crypto.efficientct.ethereum.EfficientInnerProductVerifier;
import edu.stanford.cs.crypto.efficientct.linearalgebra.VectorBase;
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

public class EthereumEfficientInnerProductVerifier implements Verifier<VectorBase<BouncyCastleECPoint>, BouncyCastleECPoint, InnerProductProof<BouncyCastleECPoint>> {

    private final Web3j web3;
    private final Credentials credentials;

    public EthereumEfficientInnerProductVerifier() throws IOException, CipherException {
        web3 = Web3j.build(new HttpService());
        credentials = WalletUtils.loadCredentials("", "D:\\X\\keystore\\UTC--2018-02-13T05-21-48.441433000Z--f078b74999a55cb7c656a06d6b3b7e839f9495d4");
    }

    @Override
    public void verify(VectorBase<BouncyCastleECPoint> params, BouncyCastleECPoint input, InnerProductProof<BouncyCastleECPoint> proof) throws VerificationFailedException {
        BigInteger H_x = getX(params.getH());
        BigInteger H_y = getY(params.getH());
        List<BigInteger> gs_coords = listCoords(params.getGs().getVector());
        List<BigInteger> hs_coords = listCoords(params.getHs().getVector());
        RemoteCall<EfficientInnerProductVerifier> deploy = EfficientInnerProductVerifier.deploy(web3, credentials, ONE, new BigInteger("4500000"), H_x, H_y, gs_coords, hs_coords);
        Boolean result;
        try {
            EfficientInnerProductVerifier wrapper = deploy.send();
            RemoteCall<Boolean> call = wrapper.verify(getX(input), getY(input), getXs(proof.getL()), getYs(proof.getL()), getXs(proof.getR()), getYs(proof.getR()), proof.getA(), proof.getB());
            result = call.send();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        equal(result, true, "Verification failed");
    }
}
