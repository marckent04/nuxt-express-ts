import Server from './server'

// const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.ts')
config.dev = process.env.NODE_ENV !== 'production'

const app = new Server(config)

app.start()
