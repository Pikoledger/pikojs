const fetch = require('node-fetch')

const { EventEmitter } = require('events')

module.exports = class Node extends EventEmitter {
  constructor (nodeAddress) {
    super()
    this.nodeAddress = nodeAddress

    this.emit('ready')
  }

  async request (method, args) {
    if (typeof method !== 'string' || typeof args !== 'object') throw Error('Method should be string, arguments should be an array.')

    const response = await fetch(this.nodeAddress, {
      method: 'post',
      body: JSON.stringify({ method, args }),
      headers: {'Content-Type': 'application/json'}
    })

    return (await response.json()).result
  }
}