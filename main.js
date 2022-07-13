const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "22/02/2022", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
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

let RaCHAIN = new BlockChain();
//Creating Blocks
RaCHAIN.addBlock(new Block(1, "13/07/2022", { amount: 8 }));
RaCHAIN.addBlock(new Block(1, "12/07/2022", { amount: 22 }));



//console.log(JSON.stringify(RaCHAIN, null, 4));
console.log('Is blockchain valid: ' + RaCHAIN.isChainValid());

RaCHAIN.chain[1].data = {amount: 100};
RaCHAIN.chain[1].hash = RaCHAIN.chain[1].calculateHash();


console.log('Is blockchain valid: ' + RaCHAIN.isChainValid());