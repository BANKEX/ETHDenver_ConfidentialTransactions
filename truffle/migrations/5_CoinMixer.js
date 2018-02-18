var CoinMixer = artifacts.require("./CoinMixer.sol")
var SimpleToken = artifacts.require("./test/SimpleToken.sol")
var RangeProofVerifier = artifacts.require("./RangeProofVerifier.sol")

module.exports = function(deployer) {
    console.log("Range proof verifier at " + RangeProofVerifier.address);
    deployer.deploy(CoinMixer,
        [
            new web3.BigNumber('0x77da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4'),
            new web3.BigNumber('0x1485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875'),
            new web3.BigNumber('0x1b7de3dcf359928dd19f643d54dc487478b68a5b2634f9f1903c9fb78331aef'),
            new web3.BigNumber('0x2bda7d3ae6a557c716477c108be0d0f94abc6c4dc6b1bd93caccbcceaaa71d6b')
        ],
        RangeProofVerifier.address,
        SimpleToken.address
    )
}
