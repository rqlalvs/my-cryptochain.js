const{BlockChain, Transaction} = require('./blockchain');
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");


//in order to make a transaction you will need the private key and a public matching one (derivates from the private);
const myKey = ec.keyFromPrivate('efacdc0ca1040a01afb7cb347860ebf1947c303ea1d6b796e55d90d774c0366c');
const myWalletAddress = myKey.getPublic('hex');

let RaCHAIN = new BlockChain();

//check other commits to find older versions and different tests.
//test transactions


//my address is one of muy public keys
const tx1 = new Transaction(myWalletAddress, 'public key from someone else', 10);

//signing with my private key
tx1.signTransaction(myKey);
RaCHAIN.addTransaction(tx1);

console.log('\n Starting the miner...');
RaCHAIN.minePendingTransactions(myWalletAddress);

console.log("\n Rach's balance is", RaCHAIN.getBalanceOfAddress(myWalletAddress));

//invalidates a transaction
RaCHAIN.chain[1].transactions[0].amount = 1;

console.log("Is chain valid?", RaCHAIN.isChainValid());