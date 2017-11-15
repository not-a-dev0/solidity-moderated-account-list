const { assert } = require('chai');
const { promisifyAll } = require('bluebird');
const AccountList = promisifyAll(artifacts.require('AccountList'));

contract('AccountList', (accounts) => {
  const [
    owner,
    modOne, modTwo,
    accOne, accTwo, accThree
  ] = accounts;
  const initialMods = [modOne, modTwo];
  const initialAccounts = [accOne, accTwo, accThree];

  describe('Ownable', () => {
    it('should have expected owner', async () => {
      const accList = await AccountList.deployed();
      const currOwner = await accList.owner.call();
      assert.equal(owner, currOwner);
    });

    it('should be able to transfer ownership', async () => {
      const accList = await AccountList.deployed();
      await accList.transferOwnership(modOne);
      const currOwner = await accList.owner.call();
      assert.equal(modOne, currOwner);
    })
  });

  describe('Moderated', () => {
    it('should seed with initial moderators', async () => {
      const accList = await AccountList.new([], initialMods);
      const currMods = await accList.getModerators.call();
      assert.sameMembers(currMods, initialMods);
    });

    it('should allow owner to add a moderator', async () => {
      const accList = await AccountList.new();
      await accList.addModerator(modOne);
      const currMods = await accList.getModerators.call();
      assert.sameMembers(currMods, [modOne]);
    });

    it('should allow owner to remove a moderator', async () => {
      const accList = await AccountList.new([], initialMods);
      await accList.removeModerator(modOne);
      const currMods = await accList.getModerators.call();
      assert.sameMembers(currMods, [modTwo]);
    });

    it('should throw when owner tries to add an existing moderator', async () => {
      const accList = await AccountList.new([], [modOne]);
      try { await accList.addModerator(modOne); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    })

    it('should throw when owner tries to remove a nonexistant moderator', async () => {
      const accList = await AccountList.new();
      try { await accList.removeModerator(modOne); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    });

    it('should throw when a moderator tries to add a moderator', async () => {
      const accList = await AccountList.new([], [modOne]);
      try { await accList.addModerator(modTwo, {from: modOne}); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    });

    it('should throw when a moderator tries to remove a moderator', async () => {
      const accList = await AccountList.new([], initialMods);
      try { await accList.removeModerator(modTwo, {from: modOne}); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    });
  })

  describe('AccountList', async () => {
    it('should seed with initial accounts', async () => {
      const accList = await AccountList.new(initialAccounts, initialMods);
      const currAccounts = await accList.getAccounts.call();
      assert.sameMembers(currAccounts, initialAccounts);
    })

    it('should allow owner to add an account', async () => {
      const accList = await AccountList.new();
      await accList.addAccount(accOne);
      const currAccounts = await accList.getAccounts.call();
      assert.sameMembers(currAccounts, [accOne]);
    });

    it('should allow owner to remove an account', async () => {
      const accList = await AccountList.new(initialAccounts, []);
      await accList.removeAccount(accThree);
      const currAccounts = await accList.getAccounts.call();
      assert.sameMembers(currAccounts, [accOne, accTwo]);
    });

    it('should allow a moderator to add an account', async () => {
      const accList = await AccountList.new([], initialMods);
      await accList.addAccount(accOne, {from: modOne});
      const currAccounts = await accList.getAccounts.call();
      assert.sameMembers(currAccounts, [accOne]);
    });

    it('should allow a moderator to remove an account', async () => {
      const accList = await AccountList.new(initialAccounts, initialMods);
      await accList.removeAccount(accThree, {from: modOne});
      const currAccounts = await accList.getAccounts.call();
      assert.sameMembers(currAccounts, [accOne, accTwo]);
    });

    it('should throw when owner tries to add an existing account', async () => {
      const acclist = await AccountList.new(initialAccounts);
      try { accList.addAccount(accOne); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    })

    it('should throw when owner tries to remove a nonexistant account', async () => {
      const acclist = await AccountList.new();
      try { accList.removeAccount(accOne); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    });

    it('should throw when a moderator tries to add an existing account', async () => {
      const acclist = await AccountList.new(initialAccounts, initialMods);
      try { accList.addAccount(accOne, {from: modOne}); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    })

    it('should throw when a moderator tries to remove a nonexistant account', async () => {
      const acclist = await AccountList.new([], initialMods);
      try { accList.removeAccount(accOne, {from: modOne}); }
      catch (err) { return true; }
      throw new Error('I should never see this!');
    });
  })
});
