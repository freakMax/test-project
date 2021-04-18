const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000;
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://max:max88283920@cluster0.63gwb.mongodb.net/Cleaners?retryWrites=true&w=majority',
    );
    app.listen(PORT, () => console.log(`Listen on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
