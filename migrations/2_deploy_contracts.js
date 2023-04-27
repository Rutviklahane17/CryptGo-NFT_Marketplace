/* eslint-disable no-undef */
const CryptgoNFT = artifacts.require('CryptgoNFT')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(CryptgoNFT, 'Cryptgo NFTs', 'TNT', 10, accounts[1])
}