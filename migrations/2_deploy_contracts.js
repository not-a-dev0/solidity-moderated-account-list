var Moderated = artifacts.require("./Moderated.sol");
var AccountList = artifacts.require("./AccountList.sol");
var AddressList = artifacts.require("./AddressList.sol");

module.exports = function(deployer) {
  deployer.deploy(AddressList);
  deployer.link(AddressList, [Moderated, AccountList]);

  deployer.deploy(Moderated);
  deployer.link(Moderated, AccountList);

  deployer.deploy(AccountList);
}
