const tweetnacl = require('tweetnacl')

module.exports = class Wallet {
  constructor (privateKey) {
    this._keyPair = tweetnacl.sign.keyPair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey, 'hex')))

    this.address = Buffer.from(this._keyPair.publicKey).toString('hex')
    this.privateKey = privateKey
  }

  static createOne () {
    const keyPair = tweetnacl.sign.keyPair()

    return new Wallet(Buffer.from(keyPair.secretKey).toString('hex'))
  }

  sign (data) {
    return Buffer.from(tweetnacl.sign.detached(Uint8Array.from(data), this._keyPair.secretKey)).toString('hex')
  }
}