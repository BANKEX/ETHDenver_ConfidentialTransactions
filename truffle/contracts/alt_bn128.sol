pragma solidity ^0.4.19;

library alt_bn128 {

    uint256 public constant q = 21888242871839275222246405745257275088548364400416034343698204186575808495617; // curve order
    uint256 public constant n = 21888242871839275222246405745257275088696311157297823662689037894645226208583; // prime field order
    
    struct G1Point {
        uint256 X;
        uint256 Y;
    }

    function add(G1Point p1, G1Point p2) internal view returns (G1Point r) {
        uint256[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        assembly {
            if iszero(staticcall(not(0), 6, input, 0x80, r, 0x40)) {
                revert(0, 0)
            }
        }
    }

    function mul(G1Point p, uint256 s) internal view returns (G1Point r) {
        uint256[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        assembly {
            if iszero(staticcall(not(0), 7, input, 0x60, r, 0x40)) {
                revert(0, 0)
            }
        }
    }

    function neg(G1Point p) internal returns (G1Point) {
        // uint n = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, n - (p.Y % n));
    }

    function eq(G1Point p1, G1Point p2) internal pure returns (bool) {
        return p1.X == p2.X && p1.Y == p2.Y;
    }

    function add(uint256 x, uint256 y) internal pure returns (uint256) {
        return addmod(x, y, q);
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulmod(x, y, q);
    }

    function inv(uint256 x) internal view returns (uint256) {
        return exp(x, q - 2);
    }

    function mod(uint256 x) internal pure returns (uint256) {
        return x % q;
    }

    function sub(uint256 x, uint256 y) internal pure returns (uint256) {
        return x >= y ? x - y : q - y + x;
    }

    function neg(uint256 x) internal pure returns (uint256) {
        return q - x;
    }

    function exp(uint256 base, uint256 exponent) internal view returns (uint256) {
        uint256[6] memory input;
        uint256[1] memory output;
        input[0] = 0x20;  // length_of_BASE
        input[1] = 0x20;  // length_of_EXPONENT
        input[2] = 0x20;  // length_of_MODULUS
        input[3] = base;
        input[4] = exponent;
        input[5] = q;
        assembly {
            if iszero(staticcall(not(0), 5, input, 0xc0, output, 0x20)) {
                revert(0, 0)
            }
        }
        return output[0];
    }
}
