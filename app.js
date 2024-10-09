const express = require('express');
const app = express()
const dbConnect = require('./src/db/dbConnect')
const authRoutes = require('./src/routes/auth')
const authMiddleware = require('./src/middleware/authMiddleware')

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use(authMiddleware)
dbConnect()

const port = 5000 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
})