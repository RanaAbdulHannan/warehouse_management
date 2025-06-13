import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

// Dashboard endpoints
export const getDashboardData = () => api.get('/dashboard');

// Inventory endpoints
export const getAllItems = () => api.get('/inventory');
export const getItemById = (id) => api.get(`/inventory/${id}`);
export const createItem = (data) => api.post('/inventory', data);
export const updateItem = (id, data) => api.put(`/inventory/${id}`, data);
export const deleteItem = (id) => api.delete(`/inventory/${id}`);

// Transaction endpoints
export const getRecentTransactions = () => api.get('/transactions/recent');
export const getTransactions = () => api.get('/transactions');
export const createStockIn = (data) => api.post('/transactions/stock-in', data);
export const createStockOut = (data) => api.post('/transactions/stock-out', data);

// Supplier endpoints
export const getAllSuppliers = () => api.get('/suppliers');
export const getSupplierById = (id) => api.get(`/suppliers/${id}`);
export const createSupplier = (data) => api.post('/suppliers', data);
export const updateSupplier = (id, data) => api.put(`/suppliers/${id}`, data);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`);

// Receiver endpoints
export const getAllReceivers = () => api.get('/receivers');
export const getReceiverById = (id) => api.get(`/receivers/${id}`);
export const createReceiver = (data) => api.post('/receivers', data);
export const updateReceiver = (id, data) => api.put(`/receivers/${id}`, data);
export const deleteReceiver = (id) => api.delete(`/receivers/${id}`);

export default {
    getDashboardData,
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getRecentTransactions,
    getTransactions,
    createStockIn,
    createStockOut,
    getAllSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllReceivers,
    getReceiverById,
    createReceiver,
    updateReceiver,
    deleteReceiver
};