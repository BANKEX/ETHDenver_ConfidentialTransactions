const EfficientInnerProductVerifier = artifacts.require('EfficientInnerProductVerifier')
const RangeProofVerifier = artifacts.require('RangeProofVerifier')

contract('Gas usage', () => {
  beforeEach(async () => {
    this.efficientInnerProductVerifier = await EfficientInnerProductVerifier.deployed()
    this.rangeProofVerifier = await RangeProofVerifier.deployed()
  })

  it('EfficientInnerProductVerifier', async () => {
    const txHash = await this.efficientInnerProductVerifier.verify.sendTransaction(
        new web3.BigNumber('0x95c8c4ffa8232d43483f593c9ed8cf7bac575dec685be639fb04d4df126620e'),
        new web3.BigNumber('0x13e72997ba0046bb4cf7d34a980d11d9e8516f196e8f192d2f31dc6f79ec1f17'),
        [new web3.BigNumber('0x2b3644248c14ba227592d308333d0956e9ab90c6aa67d0c5e4c6c006c830617e'), new web3.BigNumber('0x1199d10b21172c80b82dc85d57a5175947fa312fa42dee503b1a8977788171ca')],
        [new web3.BigNumber('0x21aa64a9b506a07cdf20ac5204f84c50cdfaeda92af8429393ff7f016569797e'), new web3.BigNumber('0x21ca3748469be8eb56f5780b8fe17a7f1331ef953e729524849e75399f221864')],
        [new web3.BigNumber('0x11a0e994702687b7eae12817c9989bfe86847dc7846c280d09a702d19949a46b'), new web3.BigNumber('0x257138a39e5bfb6775fc940ede8da9e77f8c5af75a184046bb1ee83cc0e04d7f')],
        [new web3.BigNumber('0x1b4f6eb3f2ad50eb6f3fd5c16aa5e74a17717435a043f6ea5dae1ae4a071526f'), new web3.BigNumber('0x2d4efb6510f16a94713901053eaf92d3501c16b0750d6fe42f61a7adfef95afc')],
        new web3.BigNumber('17529608024793094329094375098938047032828524085283958153474962285785364116403'),
        new web3.BigNumber('1009112455271111762241081486074988555544073628584788034730024131870209975373')
    )
    const txReceipt = web3.eth.getTransactionReceipt(txHash)
    console.log('Successful inner product verification for m = 2 costs ' + txReceipt.gasUsed + ' gas')
  })

  it('RangeProofVerifier', async () => {
    const txHash = await this.rangeProofVerifier.verify.sendTransaction(
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
    const txReceipt = web3.eth.getTransactionReceipt(txHash)
    console.log('Successful range proof verification for m = 2 costs ' + txReceipt.gasUsed + ' gas')
  })
})
