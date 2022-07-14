const SHA256 = require("crypto-js/sha256");

//#region transaction 
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

//#endregion

//#region block
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined:" + this.hash);
  }
}
//#endregion

//#region blockchain
class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningRewards = 100;
  }

  createGenesisBlock() {
    return new Block("22/02/2022", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAdress){
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined.');
    this.chain.push(block);

    this.pendingTransactions = [
        new Transaction(null, miningRewardAdress, this.miningRewards)
    ]
  }

  createTransaction(transaction){
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address){
    let balance = 0;

    for(const block of this.chain){
        //because each block has many transactions
        for(const trans of block.transactions){
            if(trans.fromAddress === address){
                balance -= trans.amount;
            }

            if(trans.toAddress === address){
                balance += trans.amount;
            }
        }
    }
    return balance;
  }

  isChainValid() {
    //Always start on block 1, becouse block 0 is a genesis block, manually generated
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
//#endregion

let RaCHAIN = new BlockChain();


//test transactions

RaCHAIN.createTransaction(new Transaction('Raquel', 'Leuqar', 100));
RaCHAIN.createTransaction(new Transaction('Leuqar', 'Raquel', 50));

console.log('\n Starting the miner...');
RaCHAIN.minePendingTransactions('rach-address');
//The first balance will be 0 because the transaction is on PendingTransactions
console.log("\n Rach's balance is", RaCHAIN.getBalanceOfAddress('rach-address'));

//Now here, when we mine for the second time, should appear the balance of the first one. Works like this don't matter how many times you mine a block.
console.log('\n Starting the miner for the second time...');
RaCHAIN.minePendingTransactions('rach-address');

console.log("\n Rach's balance is", RaCHAIN.getBalanceOfAddress('rach-address'));