import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import rateLimit from 'express-rate-limit'

// app config
const app = express()
app.set('trust proxy', 1) // Trust first proxy (e.g., Render, Heroku)

const port = process.env.PORT || 4000

// Connect to database (CALL THE FUNCTION)
connectDB()
connectCloudinary()


// --- RATE LIMITER CONFIGURATION FOR ALL API ENDPOINTS ---
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    limit: 100, // Limit each IP to 100 requests per windowMs
    message: { success: false, message: 'Too many requests from this IP, please try again later.' },
    statusCode: 429, // Standard status code for rate limiting
    standardHeaders: 'draft-7', // Draft-7 standard; returns RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
});


// middlewares
app.use(express.json())
app.use(cors())

// Apply the rate limiter to all API endpoints
app.use('/api', apiLimiter);

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)


// app.get("/", (req, res) => {
//   res.send("API Working")
// });

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Backend Server started on PORT:${port}`))
}
// Export app for Vitest
export default app;
