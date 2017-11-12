pragma solidity 0.4.18;
import "./AddressList.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract Moderated is Ownable {
  /* Storage vars
  ** ********************** */
  using AddressList for AddressList.Data;
  AddressList.Data internal moderatorData;

  /* Modifiers
  ** ********************** */
  modifier onlyMod {
    require(moderatorData.contains(msg.sender));
    _;
  }

  modifier onlyModOrOwner {
    require(moderatorData.contains(msg.sender) || msg.sender == owner);
    _;
  }

  /* Event loggers
  ** ********************** */
  event LogAddMod(address moderator, uint numModerators);
  event LogRemoveMod(address moderator, uint numModerators);

  /* Constructor
  ** ********************** */
  function Moderated(address[] initialMods) public {
    for (uint i = 0; i < initialMods.length; i++) {
      addModerator(initialMods[i]);
    }
  }

  /* Public functions
  ** ********************** */
  function getModerators() public view returns(address[]) {
    return moderatorData.items;
  }

  function addModerator(address modToAdd) public onlyOwner {
    moderatorData.add(modToAdd);
    LogAddMod(modToAdd, moderatorData.items.length);
  }

  function removeModerator(address modToRemove) public onlyOwner {
    moderatorData.remove(modToRemove);
    LogRemoveMod(modToRemove, moderatorData.items.length);
  }
}
