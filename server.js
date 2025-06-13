require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// ======================
// 1. Middleware
// ======================
app.use(cors());
app.use(express.json());

// ======================
// 2. Route Imports
// ======================
const dashboardRoutes = require('./routes/dashboardRoutes');
const inventoryRoutes = require ('./routes/inventoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const receiverRoutes = require('./routes/receiverRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// ======================
// 3. API Routes
// ======================
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/receivers', receiverRoutes);
app.use('/api/transactions', transactionRoutes);

// ======================
// 4. Error Handling
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ======================
// 5. Server Startup
// ======================
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});