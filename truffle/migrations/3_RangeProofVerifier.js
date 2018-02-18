var RangeProofVerifier = artifacts.require("./RangeProofVerifier.sol")
var EfficientInnerProductVerifier = artifacts.require("./EfficientInnerProductVerifier.sol")

module.exports = function(deployer) {
    console.log("Inner product verifier at " + EfficientInnerProductVerifier.address);
  deployer.deploy(RangeProofVerifier,
      [          
          new web3.BigNumber('0x77da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4'),
          new web3.BigNumber('0x1485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875'),
          new web3.BigNumber('0x1b7de3dcf359928dd19f643d54dc487478b68a5b2634f9f1903c9fb78331aef'),
          new web3.BigNumber('0x2bda7d3ae6a557c716477c108be0d0f94abc6c4dc6b1bd93caccbcceaaa71d6b')
      ],
      [
          new web3.BigNumber('0x2ee9d9ac7c3c8401799229d12a921be0a53a94e947b8fe4ad53c10271589475b'),
          new web3.BigNumber('0x519108633851fe30b4838cfaf87125ccab8d4b69ec3252ac1602e616e3a2153'),
          new web3.BigNumber('0x1a7a1daa878528015634237a65af5f902873b7aa5fffc5f64f00441974c14129'),
          new web3.BigNumber('0x2e2b1907c64b9e626f32e410528ba56b48087924f4128945d124ca30fddf948f'),
          new web3.BigNumber('0x27e30be9524ec86fa23ffd86df08f7534f873cfcd1c476acb06932f45e4b1aa3'),
          new web3.BigNumber('0x8874631f1dab5acd3ba1c7515ff8602a8a29d780a92ccb75ba4987d92343d75'),
          new web3.BigNumber('0x2d0947dd3b29da4c51c78592a8387970129d032e1780ebf81cd6402da3442287'),
          new web3.BigNumber('0x26ef630599deb3daad07d89a03128e344718ddb2b1341cbbc7d8ffee1ac82a90')
      ],
      [
          new web3.BigNumber('0x5b15e337abcece819885de2ed3156ffcabec15a950f964404243ac3fcc3bf14'),
          new web3.BigNumber('0x1e0c2181124139d3b10b3436a2aadb998567c855a1920e292c3fe5290aac5537'),
          new web3.BigNumber('0x16f3670892d79397118ab8f467b23bc27bfe18a415d6469166bfe95297dff6f0'),
          new web3.BigNumber('0x155c660440de206b6b7850d67b6a6c4490786607d3498e8d383a30372107d99e'),
          new web3.BigNumber('0x113704c3c34b857f7597bc982ed9ca82ea0f3abf9806b8da6d72c18552e7d308'),
          new web3.BigNumber('0x2c08ff1c34e9d097078a21114dd95427c05cd65974acf48334669ce4bb8daa96'),
          new web3.BigNumber('0x443cc7b905c13a74aba6df98c91127194586bf8d06713451d5921a944147f4'),
          new web3.BigNumber('0x2aed26812bc8cde8afa8d42e15adddb5890fa84f6994e0e5d8a368a0c1f8d140')
      ],
      EfficientInnerProductVerifier.address
  )
}
