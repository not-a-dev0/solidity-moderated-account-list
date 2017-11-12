var Moderated = artifacts.require("./Moderated.sol");
var WhiteList = artifacts.require("./WhiteList.sol");
var AddressList = artifacts.require("./AddressList.sol");

module.exports = function(deployer) {
  deployer.deploy(AddressList);
  deployer.link(AddressList, [Moderated, WhiteList]);

  deployer.deploy(Moderated);
  deployer.link(Moderated, WhiteList);

  deployer.deploy(WhiteList);
}
