// const express = require('express')
const consola = require('consola')
const {Nuxt, Builder } = require('nuxt')
const honchoApp = require('./honcho_app.js')
const {app, http} = require('./app')
const ping = require('./ping.js')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host,
    port
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  http.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })

  honchoApp()
}
start()

require("./route.js")(app)

// mysql_run()
// setInterval(() => {
//   ping()
// }, 10000);


