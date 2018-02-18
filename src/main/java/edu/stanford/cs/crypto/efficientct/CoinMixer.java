package edu.stanford.cs.crypto.efficientct;

import edu.stanford.cs.crypto.efficientct.circuit.groups.BN128Group;
import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;
import edu.stanford.cs.crypto.efficientct.circuit.groups.Group;

import java.math.BigInteger;

public class CoinMixer {

    public static void main(String[] args) {
        Group<BouncyCastleECPoint> group = new BN128Group();
        GeneratorParams<BouncyCastleECPoint> parameters = GeneratorParams.generateParams(4, group);
        System.out.println(parameters.getBase().g.getPoint().normalize());
        System.out.println(parameters.getBase().h.getPoint().normalize());
        System.out.println(parameters.getBase().commit(new BigInteger("500"), new BigInteger("1")).getPoint().normalize());
        System.out.println(parameters.getBase().commit(new BigInteger("500"), group.groupOrder().subtract(new BigInteger("1"))).getPoint().normalize());
    }

}
