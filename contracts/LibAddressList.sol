pragma solidity 0.4.18;


library LibAddressList {
  /* Structs
  ** ********************** */
  struct Data {
    address[] items;
    mapping(address => uint) itemIdxs;
  }

  /* Public Functions
  ** ********************** */
  function add (Data storage self, address addrToAdd) public {
    require(!contains(self, addrToAdd));
    self.itemIdxs[addrToAdd] = self.items.push(addrToAdd);
  }

  function remove (Data storage self, address addrToRemove) public {
    require(contains(self, addrToRemove));
    uint addrToRemoveIdx = self.itemIdxs[addrToRemove] - 1;
    address lastAddr = self.items[self.items.length - 1];
    self.items[addrToRemoveIdx] = lastAddr;
    delete self.items[self.items.length - 1];
    self.itemIdxs[addrToRemove] = 0;
    self.items.length--;
  }

  function contains (Data storage self, address addrToLookup) public view returns(bool) {
    uint lookupIdxPlusOne = self.itemIdxs[addrToLookup];
    if (lookupIdxPlusOne == 0) return false;
    address foundAddr = self.items[lookupIdxPlusOne - 1];
    return foundAddr == addrToLookup;
  }
}
