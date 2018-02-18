const CoinMixer = artifacts.require('CoinMixer')
const SimpleToken = artifacts.require('test/SimpleToken')
const RangeProofVerifier = artifacts.require("RangeProofVerifier.sol")

const q = new web3.BigNumber("21888242871839275222246405745257275088548364400416034343698204186575808495617", 10);
const secret2 = new web3.BigNumber("21888242871839275222246405745257275088548364400416034343698204186575808495494", 10);

const should = require('chai')
  .use(require('chai-bignumber')(web3.BigNumber))
  .should()

contract('CoinMixer', ([account1, account2]) => {
  beforeEach(async () => {
    const verifier = await RangeProofVerifier.deployed()
    this.token = await SimpleToken.new()
    this.coinMixer = await CoinMixer.new([
                new web3.BigNumber('0x77da99d806abd13c9f15ece5398525119d11e11e9836b2ee7d23f6159ad87d4'),
                new web3.BigNumber('0x1485efa927f2ad41bff567eec88f32fb0a0f706588b4e41a8d587d008b7f875'),
                new web3.BigNumber('0x1b7de3dcf359928dd19f643d54dc487478b68a5b2634f9f1903c9fb78331aef'),
                new web3.BigNumber('0x2bda7d3ae6a557c716477c108be0d0f94abc6c4dc6b1bd93caccbcceaaa71d6b')
            ],
            verifier.address,
            this.token.address)
  })

  it('can make a deposit', async () => {
      const value = 1000
      const oldAccountBalance = await this.token.balanceOf(account1)
      await this.token.approve(this.coinMixer.address, value)
      await this.coinMixer.deposit(value)
      const newAccountBalance = await this.token.balanceOf(account1)
      newAccountBalance.should.be.bignumber.equal(oldAccountBalance.minus(value))
      const contractBalance = await this.token.balanceOf(this.coinMixer.address)
      contractBalance.should.be.bignumber.equal(value)
  })

  it('can withdraw unshaded deposit', async () => {
      const value = 1000
      const oldAccountBalance = await this.token.balanceOf(account1)
      await this.token.approve(this.coinMixer.address, value)
      await this.coinMixer.deposit(value)
      await this.coinMixer.withdraw(value, 0)
      const newAccountBalance = await this.token.balanceOf(account1)
      newAccountBalance.should.be.bignumber.equal(oldAccountBalance)
      const contractBalance = await this.token.balanceOf(this.coinMixer.address)
      contractBalance.should.be.bignumber.equal(0)
  })

  it('can shade deposits via transfer', async () => {
      const oldAccountBalance = await this.token.balanceOf(account1)
      await this.token.approve(this.coinMixer.address, 1000)
      await this.coinMixer.deposit(1000)
      account2 = "0xc257274276a4e539741ca11b590b9447b26a8051"
    //   console.log(account2)
      await this.coinMixer.transfer(
          // 500 * G + 1 * H
          account1, new web3.BigNumber('0xe37350b91dd504726a2f819bab4cd35232deda17b810f38fdd0e0413febf723'), new web3.BigNumber('0x10e6d83bc58469a3d190396f025c55b23a44926c9d3f9111ebcea33f52aca0e6'),
          // 500 * G + (q - 1) * H
          account2, new web3.BigNumber('0xe2c581d2f347386e32f3c3b25d51856f9a1faed506d691582bffdca368680b5'), new web3.BigNumber('0x2f16b30346680751b1931dbc145727c9b55424f577d481ee946eae15908f49a7')
      )
      await this.coinMixer.withdraw(500, 1)
      const balance = await this.token.balanceOf(account1)
      balance.should.be.bignumber.equal(oldAccountBalance.minus(500))
  })

  it('can shade deposits via transfer with range proof', async () => {
    console.log("Mixer at " + this.coinMixer.address);
    account2 = "0xc257274276a4e539741ca11b590b9447b26a8051"
    const oldAccountBalance = await this.token.balanceOf(account1)
    await this.token.approve(this.coinMixer.address, 10)
    await this.coinMixer.deposit(10)
    const leftover = await this.token.balanceOf(account1)
    await this.token.transfer(account2, leftover)
    const zeroBalance = await this.token.balanceOf(account1)
    console.log("Set balance of account 1 to "+ zeroBalance.toString(10));
    // console.log(account2)
        // 7 * G + 123 * H
        // 3 * G + (q - 123) * H
    let result = await this.coinMixer.transferWithProofs(
        [account1, account2],
            ["0x2c9720c7b32969c3bb9897eb72f4095f7c1c420765a86d95e93fbb9ae96121f4",
            "0x47089c5274c047f5c3c5da435b528feb00ab585fa0a5727f9cad04bd2d20d6b",
            "0x6b36cb0c3625a82f54fff239333e3d0669322ca167f44e35522a9f8612206d5",
            "0x236aacd06f7962faf4c7072833c6e46f2994c4e8cb0530a00aab14f830404735",
            "0x83398aea01a4938642e51902d8574ffadc62039525a4c66a0bf90d1a969f199",
            "0xb4349aecb4fb159840a21e4110bf54eacb45384cef735435066fdcd24670b03",
            "0x1998bf54778570a8bec2934d2b765e90c682b030f9d9644034fdd1de71944e6b",
            "0x181932dd26ee62695e95715b7b2e8486297a045aaeb9d8efa4b969e64b4d580e",
            "0xc8b696d98a381ff82e4f5d4ec6f28d43cfe57fab79e56a329458e127d3dd1c6",
            "0x5709a34e3d00e47c519527e34e87549cf2cc19e30cc6c42f6c93084b5d551c4",
            "0x2204d8275df06d36b276eb55ec77e6686f2c9a6d3be8b218d0ac23575ba38087",
            "0x1b7e12b616435b2eb89579cb59b821ca6b0651286a5cf0a9fc3041031e91f771",
            "0x5064371840d36e455de0d4ab78ea8523dd2ed850b4cb1fedc7ac2a1f444a9db",
            "0xe632afde696d42d39773d2ae5bc05309ce5c88fa505a41aed330c7493c984aa",
            "0x1597bd20febb180a7a62862a30acf2602f127eca7b449f4ede4e53a1b2f7c9c0",
            "0x9758a998a307d618c47e40171a62bf5ecf82be7bb3520d7e2e997fa6cdf5642",
            "0x60267a2f6976d6d833e8cc5bf035a4b6b6b753c77a55fda3596e88b1c5bb763",
            "0x11f3c67205a3c6657d201dd40a66fa09266f9f983d4c3a943b43b3f0a437d7b6",
            "0x1facc37401175e83ec67db248ca41e68e115e038f4190ad2972cbed27cd8189c",
            "0x2a68b9a7d0834ff298150daceaa8352cb1e45f0e42c58409d0aaed6e9a2e6150"
        ],
            ["0x1a0006a995129b93784f984fd1e48557b51fc9b093cd9d39aea19375d4bf1cb9",
            "0x14f081e721cabe5bde32aa250aa88b355527819bdf41525664c82b51c35df918",
            "0x2fad51dae231a7ff1f7abbf21f44119181c49089e0b10ac6010b30e52b574ba6",
            "0x6b1e8c1bc3e6fd62477767afffdc44d4a656fed95c62e2c6bf7554d56dec0f3",
            "0x28d869bd911fca730e3b0bc1a73cc230ba935f24ca492d0ce4ddf1aa0f4c3c60",
            "0x1d8c8ea260f72b2e4d7204217dbce90e985f48ef64531a9b4d4e99d131a51614",
            "0x2d7a541f63eb90ac5ffb1a594110d5accb716c8df43941ec37f23d6b64e82216",
            "0x999e7dc508734730d57906dddbfe30d9f444cfafecbed91dc1b32eb82c244b7",
            "0x285c8f87beeb10a6b4a7762e3545e23b01c75f716ba5f70adefa5a6702d45ea1",
            "0x2fab6f87c59d17119c047cd1654ad953e1116036725bcc034d106aa0fcbd6009"
        ],
            ["0x1d164b71c139692217a71f13ce1cb58e242dfa9db14b2f6ef0291cb6ae9b9bcf",
            "0xfc3c9277e2d393093d9ed86181643deda08c643324add14faac04a520e113f6",
            "0x1e173947d165cec131efc7ed06cd6b62087466a5831777f2a2f639b9d7a23b90",
            "0x288b1b22434ff8f01a7f810add7d935cb1e1773dd2a5c77b687f892bf3effda4",
            "0x1b4fa103557f7685a17f3ffcb2e3cf64e7486d2ce7a003658e9a76e05e367125",
            "0x1cb7d332d02758415fe89ee3da2c997ca3a347689c5548803078dba0199e7ce5",
            "0x112cdd347435c99a1ad76b92fc7d644f2b95080f80e00decd8fab5cfa0e79eba",
            "0x2b3766d4cccf700aecb75bccd14ffa1a4bc8bc18414c230ffae96eae7c96be9"
        ],
            ["0x9b8deb2766e964b62dd877f03ffec86b799f3af2fbf447f96b6c2ef4e96a8d8",
            "0x2b922b3f24c5713b057eedcea5e2b3d33cf225863f963fbf1a8e07826253d411",
            "0x22c6b98ed44bc3d1f61cb45e884aa482b8e4161f7a0c9577a559454756bb594e",
            "0x255d5d6cfc5f533916134a36b32d52fa65db9c452ddcaffd303ee1054e2ddb04",
            "0x1cb930a42c6ee0fb2e12b697aa5d1f9945640ca2bc575d40a966b262f9ecd6aa",
            "0x270245ad30833a1aa6243fdf6677e0b339b0eec430ab3b96ac600cb63dfd5ac3",
            "0x12c635b5ad93e4d349b6c98d12c15356417c9a7a2b1cfde8ea7b7a03754a6223",
            "0x13facd5affcd3ffb02dda74cd03665efcd6697d0c6a43997e3225364b62d62ee"
        ]
    )
    // console.log(JSON.stringify(result.logs));
    console.log("Transfered successfully")
    result = await this.coinMixer.withdraw(7, 123)
    // console.log(JSON.stringify(result.logs));
    const balance = await this.token.balanceOf(account1);
    console.log("New balance of account 1 is " + balance.toString(10));
    balance.should.be.bignumber.equal(new web3.BigNumber(7))
    // balance.should.be.bignumber.equal(oldAccountBalance.minus(3))
    console.log("Has withdrawn for account 1");
    })
});