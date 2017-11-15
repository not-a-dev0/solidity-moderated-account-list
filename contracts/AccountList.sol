pragma solidity 0.4.18;
import "./Moderated.sol";
import "./AddressList.sol";


contract AccountList is Moderated {
  /* Storage vars
  ** ********************** */
  using AddressList for AddressList.Data;
  AddressList.Data internal accountData;

  /* Modifiers
  ** ********************** */
  modifier onlyAccount {
    require(accountData.contains(msg.sender));
    _;
  }

  /* Event loggers
  ** ********************** */
  event LogAddAccount(address account, uint numAcccounts);
  event LogRemoveAccount(address account, uint numAccounts);

  /* Constructor
  ** ********************** */
  function AccountList(address[] initialAccounts, address[] initialMods)
    public
    Moderated(initialMods)
  {
    for (uint i = 0; i < initialAccounts.length; i++) {
      addAccount(initialAccounts[i]);
    }
  }

  /* Public functions
  ** ********************** */
  function getAccounts() public view returns(address[]) {
    return accountData.items;
  }

  function addAccount(address accToAdd) public onlyModOrOwner {
    accountData.add(accToAdd);
    LogAddAccount(accToAdd, accountData.items.length);
  }

  function removeAccount(address accToRemove) public onlyModOrOwner {
    accountData.remove(accToRemove);
    LogRemoveAccount(accToRemove, accountData.items.length);
  }
}
