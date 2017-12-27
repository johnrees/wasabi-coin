import * as SHA256 from "crypto-js/sha256";

class Block {
  private timestamp = Date.now();
  public hash: string;

  constructor(public index, private data, public previousHash?) {
    this.hash = this.calculateHash();
  }

  public calculateHash(): string {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class BlockChain {
  private chain = [this.genesisBlock];

  get genesisBlock(): Block {
    return new Block(0, "Genesis Block");
  }

  get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data: Object) {
    const newBlock = new Block(
      this.latestBlock.index + 1,
      data,
      this.latestBlock.hash
    );
    this.chain.push(newBlock);
  }
}

const wasabiCoin = new BlockChain();
wasabiCoin.addBlock({ a: 123 });
console.log(JSON.stringify(wasabiCoin, null, 2));
