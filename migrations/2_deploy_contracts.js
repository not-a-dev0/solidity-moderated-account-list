var Moderated = artifacts.require("./Moderated.sol");
var AccountList = artifacts.require("./AccountList.sol");
var LibAddressList = artifacts.require("./LibAddressList.sol");

module.exports = function(deployer) {
  deployer.deploy(LibAddressList);
  deployer.link(LibAddressList, [Moderated, AccountList]);

  deployer.deploy(Moderated);
  deployer.link(Moderated, AccountList);

  deployer.deploy(AccountList);
}
