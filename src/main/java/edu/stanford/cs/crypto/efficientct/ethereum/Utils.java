package edu.stanford.cs.crypto.efficientct.ethereum;

import edu.stanford.cs.crypto.efficientct.circuit.groups.BouncyCastleECPoint;

import java.math.BigInteger;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

public class Utils {

    public static BigInteger getX(BouncyCastleECPoint point) {
        return point.getPoint().normalize().getRawXCoord().toBigInteger();
    }

    public static BigInteger getY(BouncyCastleECPoint point) {
        return point.getPoint().normalize().getRawYCoord().toBigInteger();
    }

    public static List<BigInteger> getXs(Collection<BouncyCastleECPoint> points) {
        return points.stream().map(Utils::getX).collect(toList());
    }

    public static List<BigInteger> getYs(Collection<BouncyCastleECPoint> points) {
        return points.stream().map(Utils::getY).collect(toList());
    }

    public static List<BigInteger> listCoords(Collection<BouncyCastleECPoint> points) {
        List<BigInteger> result = getXs(points);
        result.addAll(getYs(points));
        return result;
    }
}
