const EfficientInnerProductVerifier = artifacts.require('EfficientInnerProductVerifier')

contract('EfficientInnerProductVerifier', () => {
  beforeEach(async () => {
    this.efficientInnerProductVerifier = await EfficientInnerProductVerifier.deployed()
  })

  it('completeness: valid proof is valid', async () => {
    const valid = await this.efficientInnerProductVerifier.verify(
        new web3.BigNumber('0x95c8c4ffa8232d43483f593c9ed8cf7bac575dec685be639fb04d4df126620e'),
        new web3.BigNumber('0x13e72997ba0046bb4cf7d34a980d11d9e8516f196e8f192d2f31dc6f79ec1f17'),
        [new web3.BigNumber('0x2b3644248c14ba227592d308333d0956e9ab90c6aa67d0c5e4c6c006c830617e'), new web3.BigNumber('0x1199d10b21172c80b82dc85d57a5175947fa312fa42dee503b1a8977788171ca')],
        [new web3.BigNumber('0x21aa64a9b506a07cdf20ac5204f84c50cdfaeda92af8429393ff7f016569797e'), new web3.BigNumber('0x21ca3748469be8eb56f5780b8fe17a7f1331ef953e729524849e75399f221864')],
        [new web3.BigNumber('0x11a0e994702687b7eae12817c9989bfe86847dc7846c280d09a702d19949a46b'), new web3.BigNumber('0x257138a39e5bfb6775fc940ede8da9e77f8c5af75a184046bb1ee83cc0e04d7f')],
        [new web3.BigNumber('0x1b4f6eb3f2ad50eb6f3fd5c16aa5e74a17717435a043f6ea5dae1ae4a071526f'), new web3.BigNumber('0x2d4efb6510f16a94713901053eaf92d3501c16b0750d6fe42f61a7adfef95afc')],
        new web3.BigNumber('17529608024793094329094375098938047032828524085283958153474962285785364116403'),
        new web3.BigNumber('1009112455271111762241081486074988555544073628584788034730024131870209975373')
    )
    assert(valid, 'proof is valid')
    // 1db25300a1526fc8218a680a2a086bf003358f6693c702e5b3fbadcea94af1a7
    // 20d7982038743dfd5d03af1ccb572fe4f06193938488032eecb9412b66fcc4cf
  })
})
