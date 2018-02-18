package edu.stanford.cs.crypto.efficientct.rangeproof;

import edu.stanford.cs.crypto.efficientct.GeneratorParams;
import edu.stanford.cs.crypto.efficientct.VerificationFailedException;
import edu.stanford.cs.crypto.efficientct.Verifier;
import edu.stanford.cs.crypto.efficientct.circuit.groups.BN128Group;
import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;
import edu.stanford.cs.crypto.efficientct.circuit.groups.Group;
import edu.stanford.cs.crypto.efficientct.commitments.PeddersenCommitment;
import edu.stanford.cs.crypto.efficientct.util.ProofUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.math.BigInteger;
import java.util.List;

import static java.util.Arrays.asList;


/**
 * Created by buenz on 7/1/17.
 */

@RunWith(Parameterized.class)
public class BN128Test {
    private Group<BouncyCastleECPoint> group = new BN128Group();

    @Parameterized.Parameters
    public static List<Object> data() throws Exception {
        return asList(
                new RangeProofVerifier<BouncyCastleECPoint>(),
                // new EthereumRangeProofVerifier(),
                new EthereumRangeProofParamsCreator()
        );
    }

    @Parameterized.Parameter
    public Verifier<GeneratorParams<BouncyCastleECPoint>, BouncyCastleECPoint, RangeProof<BouncyCastleECPoint>> verifier;

    // @Test
    // public void testCompletness() throws VerificationFailedException {
    //     BigInteger number = BigInteger.valueOf(5);
    //     BigInteger randomness = ProofUtils.randomNumber();

    //     GeneratorParams<BouncyCastleECPoint> parameters = GeneratorParams.generateParams(16, group);
    //     BouncyCastleECPoint v = parameters.getBase().commit(number, randomness);
    //     PeddersenCommitment<BouncyCastleECPoint> witness = new PeddersenCommitment<>(parameters.getBase(), number, randomness);
    //     RangeProofProver<BouncyCastleECPoint> prover = new RangeProofProver<>();
    //     RangeProof<BouncyCastleECPoint> proof = prover.generateProof(parameters, v, witness);
    //     verifier.verify(parameters, v, proof);
    // }

    // @Test
    // public void testCompletness2() throws VerificationFailedException {
    //     BigInteger number = BigInteger.valueOf(100);
    //     BigInteger randomness = ProofUtils.randomNumber();

    //     GeneratorParams<BouncyCastleECPoint> parameters = GeneratorParams.generateParams(16, group);
    //     BouncyCastleECPoint v = parameters.getBase().commit(number, randomness);
    //     PeddersenCommitment<BouncyCastleECPoint> witness = new PeddersenCommitment<>(parameters.getBase(), number, randomness);
    //     RangeProofProver<BouncyCastleECPoint> prover = new RangeProofProver<>();
    //     RangeProof<BouncyCastleECPoint> proof = prover.generateProof(parameters, v, witness);
    //     verifier.verify(parameters, v, proof);
    // }

    @Test
    public void getValuesForDemo() throws VerificationFailedException {
        BigInteger total = BigInteger.valueOf(10);
        BigInteger number = BigInteger.valueOf(7);
        BigInteger change = BigInteger.valueOf(3);
        // BigInteger randomness = ProofUtils.randomNumber();
        BigInteger randomness = BigInteger.valueOf(123);
        BigInteger q = group.groupOrder();
        System.out.print("Group order = " + q.toString(10) + "\n");
        System.out.print("Secret 1 = " + randomness.toString(10) + "\n");
        System.out.print("Secret 2 = " + q.subtract(randomness).toString(10) + "\n");
        GeneratorParams<BouncyCastleECPoint> parameters = GeneratorParams.generateParams(4, group);
        BouncyCastleECPoint v = parameters.getBase().commit(number, randomness);
        BouncyCastleECPoint v_change = parameters.getBase().commit(change, q.subtract(randomness));
        PeddersenCommitment<BouncyCastleECPoint> witness = new PeddersenCommitment<>(parameters.getBase(), number, randomness);
        PeddersenCommitment<BouncyCastleECPoint> witness_change = new PeddersenCommitment<>(parameters.getBase(), change, q.subtract(randomness));
        RangeProofProver<BouncyCastleECPoint> prover = new RangeProofProver<>();
        RangeProof<BouncyCastleECPoint> proof = prover.generateProof(parameters, v, witness);
        RangeProof<BouncyCastleECPoint> proof_change = prover.generateProof(parameters, v_change, witness_change);
        System.out.print("Amount\n");
        verifier.verify(parameters, v, proof);
        System.out.print("Change\n");
        verifier.verify(parameters, v_change, proof_change);
    }

    // @Test(expected = VerificationFailedException.class)
    // public void testSoundness() throws VerificationFailedException {
    //     BigInteger number = BigInteger.valueOf(70000);
    //     BigInteger randomness = ProofUtils.randomNumber();

    //     GeneratorParams<BouncyCastleECPoint> parameters = GeneratorParams.generateParams(16, group);
    //     BouncyCastleECPoint v = parameters.getBase().commit(number, randomness);
    //     PeddersenCommitment<BouncyCastleECPoint> witness = new PeddersenCommitment<>(parameters.getBase(), number, randomness);
    //     RangeProofProver<BouncyCastleECPoint> prover = new RangeProofProver<>();
    //     RangeProof<BouncyCastleECPoint> proof = prover.generateProof(parameters, v, witness);
    //     verifier.verify(parameters, v, proof);
    // }


}