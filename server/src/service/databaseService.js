import mongoose from 'mongoose'
import config from '../config/config.js'

export default {
    connect: async () => {
        try {
            await mongoose.connect(config.DATABASE_URL, {
                serverSelectionTimeoutMS: 20000
            })
            console.log('Database connected successfully')
            return mongoose.connection
        } catch (err) {
            throw err
        }
    }
}
