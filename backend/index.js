import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import emailRoute from './routes/email.route.js'
import path from 'path'

dotenv.config({})

connectDB() // always placed below dotenv 

const app = express()
const PORT = 8000

const _dirname = path.resolve()

// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))

// routes
app.use('/api/v1/user', userRoute)
app.use('/api/v1/email', emailRoute)

// server front-end 
app.use(express.static(path.join(_dirname, '/frontend/dist')))
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})

