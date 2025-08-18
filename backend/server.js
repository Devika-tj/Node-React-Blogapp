const express=require('express')
const app=express()
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config()
const connectDB=require('./db/connection')
const userRoutes = require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes')
const PORT=process.env.PORT||3000
connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/blogs',blogRoutes)
app.use('/user',userRoutes)



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})