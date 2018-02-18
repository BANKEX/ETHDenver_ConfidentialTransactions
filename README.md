# Confidential transactions using Bulletproofs

This work would not be possible without fascinating research https://eprint.iacr.org/2017/1066.pdf

and reference implementation https://github.com/bbuenz/BulletProofLib

## Under the hood

In this repository there is slightly modified and extended BulletProofLib source that allows generation of setup parameters for Ethereum coin-mixer smart contract.

Parameters generated include set of points on BN256 (also known as alt_bn128) curve with unknown discrete logs. There points were obtained by a hashing inputs like "G1", "G2", "H2" to points on a curve.

Original contribution includes a smart-contract for verification of such confidential transactions. Protocol for confidential transactions is based on Peddersen commitments with utilization of Bulletproof range proofs for compactness.

## Bulletproofs

Reference algorithm and motivation can be found here https://eprint.iacr.org/2017/1066.pdf

As described by authors of this paper, confidential transactions protocols require proof that transaction amounts under Peddersen commitments are strictly non-negative, otherwise creation of the coins out of the thin air is possible.

Bulletproofs are logarithmic in size, although require linear number of scalar multiplications on a curve for verification. So a proof that some set of size M of committed and blinded values Xs that are in range [0, 2^N - 1] has size of 2(log2(N) + log2(M) + 4) field elements and 5 scalar elements and number of verification operations in linear in N and M. Scalar multiplication operations are the most expensive part of verification in Ethereum smart contract as the precompiled scalar multiplication contract consumes 40000 gas per operation (https://github.com/ethereum/go-ethereum/blob/release/1.8/params/protocol_params.go). This price is the main limitation for extending confidential transactions to full precision of 256 bits. We hope that next forks of Ethereum will decrease the cost of cryptographic operations on BN256 curve and many solution will be limited by it, including zkSNARKs.

## Structure

The structure of this repository is the following:

- 'src' directory contains slightly (and dirty) modified content of https://github.com/bbuenz/BulletProofLib, mainly to output setup and demo parameters for ETHDenver hackathon.
- 'truffle' directory has a set of smart contracts and test that allow precision range of [0, 15] for values, with setup and demo parameters hardcoded.
- 'JSProover' directory is WIP port of Bulletproof algorithm using "elliptic" (https://github.com/indutny/elliptic) package extended to support keccak256 and BN256 curve. Although lack of strong typization is killing.

## How to have a feeling of it working

```
geth --dev --rpcapi eth,web3,personal,net,debug --rpc --rpcaddr "0.0.0.0" --rpccorsdomain "*" --dev.period 1
cd truffle
npm install -g truffle
npm install
truffle test ./test/CoinMixer.js
```
Note usage of --dev.period 1 otherwise current Truffle is stuck on deployment.

It demonstrates a deposit of 10 coins to the mixer, that confidential split of the deposit to two outputs:
- 7 coins (secret), blinding factor (secret) 123
- 3 coins (secret), blinding factor (secret) 21888242871839275222246405745257275088548364400416034343698204186575808495494 (that is BN256 curve group order minus 123)

After transfer user demonstrates knowledge of a both amount and blinding factor to withdraw

## What should be improved
- Right now withdraw reveals another output of the mixing transfer
    1) On deposit C = value_in * G + 0 * H.
    2) On transfer C = value_in * G + 0 * H = v_out1*G + blinding_1 * H + v_out2 * G + blinding_2 * H. This implies blinding_2 = q - blinding_1, where q is BN256 group order.
    3) Withdraw reveals v_out1 and blinding_1, so value v_out2 is releaved as value_in is public and blinding_2 is revealed. For test contract this issue is mitigated by requirement of sending transactions from corresponding beneficiary addresses, but better solution should be found (similar to Mimblewimble).
    4) Additional blinding of input should be used C' = value_in * G + secret * H.
- Some form of stealth addresses. Right now users have to communicate off-chain to send secret values to each other (related to the issue above).
- Add merge functionality, that is trivial and doesn't require range proofs (up to the extent that user should take care of not overflowing by himself, otherwise he looses a lot).
- Batch validation of range proofs (as suggested in original paper). Separate validation of M proofs (as done right now) as a size of 2M(log2(N) + 4) field elements and 5*M scalars, while batched verification will reduce is to 2(log2(N) + log2(M) + 4) field elements and 5 scalars.
- Find an optimum for range/gas price. Usage of such mixed can be economically efficient only for high transaction values (let's say > 100 ETH), so making it in range of [0, 65635] with denominator of 0.1 ETH should be efficient.
- Porting an algorithm to JS to allow generation of proofs on wide range of devices.
- An inclusion of "account abstractions" in next releases of Ethereum will allow to make process even more convenient without revealing a sender.
