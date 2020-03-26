import express from 'express'

import { Nuxt, Builder } from 'nuxt'

import consola from 'consola'

export default class Server {
  private config: any

  public app: express.Application

  constructor(config: any) {
    this.app = express()
    this.config = config
  }

  public async start() {
    const nuxt = new Nuxt(this.config)
    const { host, port } = nuxt.options.server
    await nuxt.ready()

    if (this.config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    // Give nuxt middleware to express
    this.app.use(nuxt.render)

    // Listen the server
    this.app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  }
}
