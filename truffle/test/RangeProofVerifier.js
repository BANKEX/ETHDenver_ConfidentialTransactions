const RangeProofVerifier = artifacts.require('RangeProofVerifier')

contract('RangeProofVerifier', () => {
  beforeEach(async () => {
    this.rangeProofVerifier = await RangeProofVerifier.deployed()
  })

  it('completeness: valid proof is valid', async () => {
    const valid = await this.rangeProofVerifier.verify(
        [
            new web3.BigNumber('0x2651409ef3d15f88b7e9501f2e22c39b9ef563a7c76eeb27a7e43a8a73321f22'),
            new web3.BigNumber('0xb425dd12f91a800fc9e3ecca4da98ec7a0bbd30cb01723fc0498159a2e5743'),
            new web3.BigNumber('0x22ab2759c66d59cb62a831ceebee93bba0df4d631ca6ddee09147e90a67d2418'),
            new web3.BigNumber('0x7ee021d6cc8d7cec00ed82ccf350acecdfa3715b01d080c1733c87627518be9'),
            new web3.BigNumber('0x18675ca5b2135217a2767aa744e117bfb08a69faa4b3498526d28482541c8bb3'),
            new web3.BigNumber('0x119de8e064a5c4c2696d71c58705bf1493c63bf445405c71aab9a37656b09a35'),
            new web3.BigNumber('0x11d9d31bfc58e61cc3aa99df50022eb21f7f9e8d9e40633a316098d57ba2be55'),
            new web3.BigNumber('0x148115c13af2c77a3e5063fea052148c2db17881350789d1ae81aa166ba726ad'),
            new web3.BigNumber('0x189a24a327e636bf8fa11ef12b0b05a85ed593bb9ec5c692ede7b3d38a0ea252'),
            new web3.BigNumber('0x4184147b42fc2c346e6eef9263284b843a54596ee21c67544c4d49e1ddc0831')
        ],
        [
            new web3.BigNumber('12661659262630987745094479700854064597738610746875343949176401127211676335760'),
            new web3.BigNumber('10136885695276308639098869364532943227810987500897209755931833312663658764281'),
            new web3.BigNumber('21801688520927646292904427380367301541208492429955425473158383717313213591969'),
            new web3.BigNumber('19437151763957027543356517784439109157166230806897016435904079854199966873626'),
            new web3.BigNumber('9579176559168477936665988514293770137961839810410164699952223973764279061310'),
        ],
        [new web3.BigNumber('0x46e38c2a80fe9f9f6158e625ac75298d01f98e42b9dc42d4b0ee1c515f957e0'), new web3.BigNumber('0x2fe23c1e9318639c2e0d235d7aa7bdd04b9c948269dbc678ee398bee958b9a61'), new web3.BigNumber('0x23b250da6e95d1c005deee511cad08f0028fb661390a9079944d85423c20457f'), new web3.BigNumber('0x2ee89657fc5bd030dbcdd5e378e4e1fdab495eb9a80958bb17849031952d5c0a')],
        [new web3.BigNumber('0xbd6ace517d2a0900dd378cea7fb03eec6364bf03719ce65ea3637059aa4e272'), new web3.BigNumber('0x12750e49bea25773005d2562e56fec3b7357a503ee196340f93d5904ee462aba'), new web3.BigNumber('0x11f8e82b11c8bf130ded538d451b89f519e93619a3e44962ee85727456a98ee4'), new web3.BigNumber('0xece28ab61f4fb9cbda054fedff49ec002f2584420c7608f9842034963cba8dd')]
    )
    assert(valid, 'proof is valid')
    // 2f31832dab00aa20961d722829c386c1b07b6b2d70fc4366575400c56643c303
    // 2201aa5f54a026cf74c89b1247bb6739b548ca1146577bbb89b080a602faac6a
  })
})
