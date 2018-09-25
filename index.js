const network = require('@hyperswarm/network')
const crypto = require('crypto')
const figures = require('figures')

const net = network()

const k = crypto.createHash('sha256')
  .update('connect-test')
  .digest()

console.log(figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('  ' + figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('Hyperswarm Connect-Test')
console.log('  ' + figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log(figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star, ' ', figures.star)
console.log('')

console.log(figures.play, 'Testing hole-punchability...')
net.discovery.holepunchable((err, yes) => {
  if (err) console.error(figures.warning, 'Error while testing for holepunch capability', err)
  else if (yes) console.log(figures.tick, 'Your network is hole-punchable')
  else console.log(figures.cross, 'Your network is not hole-punchable. This will degrade connectivity.')

  net.on('connection', function (socket, info) {
    console.log(figures.pointerSmall, 'New connection!', info)
  })

  console.log('')
  console.log(figures.play, 'Joining hyperswarm under the sha256(\'connect-test\') topic')
  console.log(figures.info, 'Waiting for connections...')
  net.join(k, {announce: true, lookup: true})
})

process.once('SIGINT', function () {
  console.log('Shutting down ...')
  net.discovery.destroy()
  net.discovery.on('close', function () {
    process.exit()
  })
})