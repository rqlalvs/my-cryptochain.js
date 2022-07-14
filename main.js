const SHA256 = require("crypto-js/sha256");

//#region block
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
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
  }

  createGenesisBlock() {
    return new Block(0, "22/02/2022", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
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

//Creating Blocks
console.log("Mining block 1......");
RaCHAIN.addBlock(new Block(1, "13/07/2022", { amount: 2 }));
console.log("Mining block 2......");
RaCHAIN.addBlock(new Block(2, "12/07/2022", { amount: 5 }));

//console.log(JSON.stringify(RaCHAIN, null, 4));

//Messing with the chain for testing purposes
//console.log("Is blockchain valid: " + RaCHAIN.isChainValid());
//RaCHAIN.chain[1].data = { amount: 100 };
//RaCHAIN.chain[1].hash = RaCHAIN.chain[1].calculateHash();
//console.log("Is blockchain valid: " + RaCHAIN.isChainValid());
