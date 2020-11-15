/* eslint-disable arrow-parens */
/* eslint-disable spellcheck/spell-checker */
const XUMToken = artifacts.require('UFragments.sol');
const MoneyPolicy = artifacts.require('UFragmentsPolicy.sol');
const Orchestrator = artifacts.require('Orchestrator.sol');
const BigNumber = require('bignumber.js');

module.exports = async (deployer) => {
  try {
    const ownerAddr = '0x97EC98868ffB34CC5faF980A18994c8A2ebf181b';
    const cpiOracleAddr = '0xDB021b1B247fe2F1fa57e0A87C748Cc1E321F07F';
    const marketOracleAddr = '0x47fB203e1d75FB2c518Cd56f3a8094D22A46aF83';

    const args = process.argv.slice();
    console.log('args are ', JSON.stringify(args));
    console.log(`Deploying XUM token for owner ${ownerAddr}`);
    await deployer.deploy(XUMToken);
    const tokenInst = await XUMToken.deployed();
    await tokenInst.initialize(ownerAddr);

    console.log(`Deploying supply policy with owner ${ownerAddr} and token ${tokenInst.address}`);
    await deployer.deploy(MoneyPolicy);
    const policyInst = await MoneyPolicy.deployed();
    await policyInst.initialize(ownerAddr, tokenInst.address, new BigNumber(111442000000000007272));
    await policyInst.setCpiOracle(cpiOracleAddr);
    await policyInst.setMarketOracle(marketOracleAddr);
    await tokenInst.setMonetaryPolicy(policyInst.address);

    console.log(`Deploying orchestrator with polity addr ${policyInst.address}`);
    await deployer.deploy(Orchestrator, policyInst.address);
    const orchestratorInst = await Orchestrator.deployed();
    await policyInst.setOrchestrator(orchestratorInst.address);

    console.log('wow I am all done. Here are the addies:');
    console.log('- token address: ' + tokenInst.address);
    console.log('- policy address: ' + policyInst.address);
    console.log('- orchestrator address: ' + orchestratorInst.address);
  } catch (err) {
    console.error('Uh oh i got problem', err);
  }
};
