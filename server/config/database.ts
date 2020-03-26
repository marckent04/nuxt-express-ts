import { Sequelize } from 'sequelize'

export const database = new Sequelize({
  database: 'sequelizeNuxt',
  host: 'localhost',
  username: 'marc',
  password: 'root',
  dialect: 'mariadb'
})
