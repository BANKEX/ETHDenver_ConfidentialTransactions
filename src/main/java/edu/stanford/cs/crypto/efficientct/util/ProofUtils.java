package edu.stanford.cs.crypto.efficientct.util;/*
 * Decompiled with CFR 0_110.
 */

import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;
import edu.stanford.cs.crypto.efficientct.circuit.groups.GroupElement;
import org.bouncycastle.jcajce.provider.digest.Keccak;
import org.bouncycastle.math.ec.ECPoint;
import org.web3j.abi.datatypes.generated.Uint256;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;

import static java.util.Arrays.asList;
import static org.web3j.abi.TypeEncoder.encode;
import static org.web3j.crypto.Hash.sha3;
import static org.web3j.utils.Numeric.hexStringToByteArray;

public class ProofUtils {
    private static final ThreadLocal<MessageDigest> KECCACK;
    private static final SecureRandom RNG;

    public static <T extends GroupElement<T>> BigInteger computeChallenge(BigInteger q,Iterable<T> points) {
        StringBuilder x = new StringBuilder();
        for (T point : points) {
            BouncyCastleECPoint z = (BouncyCastleECPoint) point;
            ECPoint point1 = z.getPoint();
            point1 = point1.normalize();
            x.append(encode(new Uint256(point1.getAffineXCoord().toBigInteger()))).append(encode(new Uint256(point1.getAffineYCoord().toBigInteger())));
        }
        return new BigInteger(1, hexStringToByteArray(sha3(x.toString()))).mod(q);
    }

    public static <T extends GroupElement<T>> BigInteger computeChallenge(BigInteger q,T... points) {
        return computeChallenge(q, asList(points));
    }

    public static <T extends GroupElement<T>> BigInteger computeChallenge(BigInteger q,BigInteger[] ints, T... points) {
        MessageDigest sha = KECCACK.get();
        for (BigInteger integer : ints) {
            sha.update(integer.toByteArray());
        }
        for (T point : points) {
            sha.update(point.canonicalRepresentation());
        }
        byte[] hash = sha.digest();
        return new BigInteger(hash).mod(q);
    }

    public static BigInteger challengeFromints(BigInteger q, BigInteger... ints){
        StringBuilder x = new StringBuilder();
        for (BigInteger anInt : ints) {
            x.append(encode(new Uint256(anInt)));
        }
        return new BigInteger(1, hexStringToByteArray(sha3(x.toString()))).mod(q);
    }

    public static BigInteger hash(String string) {
        KECCACK.get().update(string.getBytes());
        return new BigInteger(KECCACK.get().digest());
    }

    public static BigInteger hash(String id, BigInteger salt) {
        KECCACK.get().update(id.getBytes());
        KECCACK.get().update(salt.toByteArray());
        return new BigInteger(KECCACK.get().digest());
    }

    public static BigInteger randomNumber(int bits) {
        return new BigInteger(bits, RNG);
    }

    public static BigInteger randomNumber() {
        return ProofUtils.randomNumber(256);
    }


    static {
        RNG = new SecureRandom();
        KECCACK = ThreadLocal.withInitial(Keccak.Digest256::new);
    }
}

