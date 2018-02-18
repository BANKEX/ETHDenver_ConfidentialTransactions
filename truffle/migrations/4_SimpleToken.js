var SimpleToken = artifacts.require("./test/SimpleToken.sol")

module.exports = function(deployer) {
    deployer.deploy(SimpleToken)
}
