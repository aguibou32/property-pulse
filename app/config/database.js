import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    // If the database is already connected, don't connect again
    if(connected){
        console.log('MongoDB is already connected')
        return;
    }

    // Check if MONGODB_URI is defined
    if(!process.env.MONGODB_URI){
        throw new Error('MONGODB_URI is not defined in environment variables')
    }

    try {
        console.log('Attempting to connect to MongoDB...')
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
        console.log('MongoDB connected successfully')

    } catch (error) {
        console.error('MongoDB connection error:', error)
        throw error
    }
}

export default connectDB