const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./src/db/dbConnect');

dotenv.config();

const app = express();

app.use(express.json());


dbConnect().catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
});


const userRoutes = require('./src/routes/userRoutes');
const mealRoutes = require('./src/routes/mealRoutes');
const nutritionRoutes = require('./src/routes/nutritionRoutes');

app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/nutrition', nutritionRoutes);


app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});