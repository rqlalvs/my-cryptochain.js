export class BlockChain {
    chain: Block[];
    difficulty: number;
    pendingTransactions: any[];
    miningRewards: number;
    createGenesisBlock(): Block;
    getLatestBlock(): Block;
    minePendingTransactions(miningRewardAddress: any): void;
    addTransaction(transaction: any): void;
    getBalanceOfAddress(address: any): number;
    isChainValid(): boolean;
}
export class Transaction {
    constructor(fromAddress: any, toAddress: any, amount: any);
    fromAddress: any;
    toAddress: any;
    amount: any;
    calculateHash(): any;
    signTransaction(signingKey: any): void;
    signature: any;
    isValid(): any;
}
declare class Block {
    constructor(timestamp: any, transactions: any, previousHash?: string);
    timestamp: any;
    transactions: any;
    previousHash: string;
    hash: any;
    nonce: number;
    calculateHash(): any;
    mineBlock(difficulty: any): void;
    hasValidTransaction(): boolean;
}
export {};
