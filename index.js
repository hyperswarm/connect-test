#!/usr/bin/env node

const { inspect } = require('util')
const hyperswarm = require('hyperswarm')
const crypto = require('crypto')
const figures = require('figures')

const swarm = hyperswarm()
const topic = process.argv[2] ? process.argv[2] : 'connect-test'

const k = crypto.createHash('sha256')
  .update(topic)
  .digest()

console.log(figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('  ' + figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('Hyperswarm Connect-Test')
console.log('  ' + figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log(figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('')

function Peer (peer) {
  return peer && `${peer.host}:${peer.port}`
}

console.log(figures.play, `Joining hyperswarm under the sha256(${topic}) topic`, k.toString('hex'))

swarm.on('error', function (err) {
  console.error(figures.cross, 'There was an error', err)
})

swarm.on('peer', function (peer) {
  console.log(figures.pointerSmall, 'New peer!', Peer(peer))
})

swarm.on('connection', function (socket, info) {
  const {
    priority,
    status,
    retries,
    peer,
    client
  } = info
  console.log('new connection!', `
    priority: ${priority}
    status: ${status}
    retries: ${retries}
    client: ${client}
    peer: ${!peer ? peer : `
      ${inspect(peer, { indentationLvl: 4 }).slice(2, -2)}
      `}
    `)
  process.stdin.pipe(socket).pipe(process.stdout)
})

swarm.on('disconnection', function (socket, info) {
  console.log(figures.cross, 'Connection has been dropped', Peer(info.peer))
})

swarm.on('peer-rejected', function (peer) {
  console.log(figures.cross, 'Peer rejected!', Peer(peer))
})

swarm.on('updated', function (peer) {
  console.log(figures.tick, 'Successfully updated')
})

swarm.join(k, {
  announce: true,
  lookup: true
}, (err) => {
  if (err) console.error(figures.warning, 'Error while testing for connectivity', err)

  var holepunchable = swarm.holepunchable()
  if (holepunchable) console.log(figures.tick, 'Your network is hole-punchable!')

  console.log(figures.info, 'Waiting for connections...')
})


process.once('SIGINT', function () {
  console.log('Shutting down ...')
  swarm.destroy(function () {
    process.exit()
  })
})
