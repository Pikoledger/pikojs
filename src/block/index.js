const crypto = require('crypto')

module.exports = class Block {
  constructor (type, block) {
    this.block = block
    this.block.type = type
  }

  async setPreviousBlock (node) {
    const lattice = await node.request('getBlocks', [ this.block.sender ])
    
    this.block.chainedBlock = lattice?.[lattice.length - 1] ?? null

    this.updateHash()
  }

  updateHash () {
    if (this.block.type === "send") {
      this.block.hash = crypto.createHash('ripemd160').update(this.block.type + this.block.sender + this.block.recipient + this.block.amount + this.block.chainedBlock).digest('hex')
    } else if (this.block.type === "receive") {
      this.block.hash = crypto.createHash('ripemd160').update(this.block.type + this.block.sender + this.block.block + this.block.chainedBlock).digest('hex')
    }
  }

  async signBlock (wallet) {
    this.block.signature = await wallet.sign(Buffer.from(this.block.hash, 'hex'))
  }

  async submit (node) {
    return await node.request('submitBlock', [ this.block ])
  }
}