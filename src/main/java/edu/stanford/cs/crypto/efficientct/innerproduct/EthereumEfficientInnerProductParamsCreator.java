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

public class EthereumEfficientInnerProductParamsCreator implements Verifier<VectorBase<BouncyCastleECPoint>, BouncyCastleECPoint, InnerProductProof<BouncyCastleECPoint>> {

    public EthereumEfficientInnerProductParamsCreator() throws IOException, CipherException {
    }

    @Override
    public void verify(VectorBase<BouncyCastleECPoint> params, BouncyCastleECPoint input, InnerProductProof<BouncyCastleECPoint> proof) throws VerificationFailedException {
        BigInteger H_x = getX(params.getH());
        BigInteger H_y = getY(params.getH());
        System.out.print("Constructor coords X \n");
        System.out.print(H_x.toString(16));
        System.out.print("\nConstructor coords Y\n");
        System.out.print(H_y.toString(16));
        System.out.print("\nGs coords\n");
        List<BigInteger> gs_coords = listCoords(params.getGs().getVector());
        gs_coords.stream().map(bi -> bi.toString(16)).forEach(System.out::println);
        System.out.print("\nHs coords\n");
        List<BigInteger> hs_coords = listCoords(params.getHs().getVector());
        hs_coords.stream().map(bi -> bi.toString(16)).forEach(System.out::println);
        System.out.print("\n");
    }
}
