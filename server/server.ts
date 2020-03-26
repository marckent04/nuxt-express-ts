import express from 'express'

import { Nuxt, Builder } from 'nuxt'

import consola from 'consola'
import { Configuration } from '@nuxt/types'
import { database } from './config/database'

export default class Server {
  private config: Configuration

  public app: express.Application

  constructor(config: Configuration) {
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

    database
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.')
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err)
      })
  }
}
