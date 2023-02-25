# PikoJS 🧠
### A JavaScript library for interacting with pikod


## Installation
### Install module using ``npm install Pikoledger/pikojs`` in project folder.
## Usage
## Executing methods of pikod
```JS
const Pikojs = require('pikojs')

const pikoApi = new Pikojs.Node('http://213.226.119.56:3645/')

pikoApi.request('getNetworkInfo').then((networkInfo) => {
  console.log(networkInfo) // Will return network data
})
```
## Creating a wallet
```JS
const Pikojs = require('pikojs')

const wallet = Pikojs.Wallet.createOne()

console.log(wallet) // Will return a wallet object.
```
## Importing a wallet
```JS
const Pikojs = require('pikojs')

const wallet = new Pikojs.Wallet('privateKey')

console.log(wallet) // Will return a wallet object.
```
## Creating block(send)
```JS
const Pikojs = require('pikojs')

const pikoApi = new Pikojs.Node('http://213.226.119.56:3645/')
const wallet = new Pikojs.Wallet("privateKey")
const block = new Pikojs.Block('send', {
  sender: wallet.address,
  recipient: "recipient",
  amount: "amount"
})

block.setPreviousBlock(pikoApi).then(async () => {
  await block.signBlock(wallet)
  console.log(await block.submit(pikoApi)) // Should return hash of block
})
```
## Creating block(receive)
```JS
const Pikojs = require('pikojs')

const pikoApi = new Pikojs.Node('http://213.226.119.56:3645/')
const wallet = new Pikojs.Wallet("privateKey")
const block = new Pikojs.Block('receive', {
  sender: wallet.address,
  block: "blockHash"
})

block.setPreviousBlock(pikoApi).then(async () => {
  await block.signBlock(wallet)
  console.log(await block.submit(pikoApi)) // Should return hash of block
})
```