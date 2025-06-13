import React, { useState, useEffect } from 'react';
import { Package, Truck, Users, Clipboard } from 'lucide-react';
import api from '../services/api';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <div className="bg-tan rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-full ${color}`}>{icon}</div>
                <div className="ml-4">
                    <h3 className="text-blackboard text-sm">{title}</h3>
                    <p className="text-2xl font-bold text-oxblood">{value}</p>
                </div>
            </div>
        </div>
    );
};

const DashboardTab = () => {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        recentTransactions: [],
        lowStockItems: [],
        inventorySummary: [],
        statistics: {
            totalProducts: 0,
            totalSuppliers: 0,
            totalReceivers: 0,
            monthlyTransactions: 0
        }
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.getDashboardData();
            setDashboardData(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to load dashboard data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    const { products = [], recentTransactions, inventorySummary, statistics } = dashboardData;

    // Filter low stock products (current_stock <= 5)
    const lowStockProducts = products.filter(p => p.current_stock <= 5);

    // Filter transactions to only those from the last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const recentWeekTransactions = (recentTransactions || []).filter(t => {
        const tDate = new Date(t.transaction_date);
        return tDate >= oneWeekAgo && tDate <= new Date();
    });

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Products" 
                    value={statistics.totalProducts} 
                    icon={<Package size={24} />} 
                    color="bg-blue-100 text-blue-800" 
                />
                <StatCard 
                    title="Total Suppliers" 
                    value={statistics.totalSuppliers} 
                    icon={<Truck size={24} />} 
                    color="bg-green-100 text-green-800" 
                />
                <StatCard 
                    title="Total Receivers" 
                    value={statistics.totalReceivers} 
                    icon={<Users size={24} />} 
                    color="bg-purple-100 text-purple-800" 
                />
                <StatCard 
                    title="Transactions (Month)" 
                    value={statistics.monthlyTransactions} 
                    icon={<Clipboard size={24} />} 
                    color="bg-orange-100 text-orange-800" 
                />
            </div>

            {/* Recent Transactions and Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Recent Transactions</h3>
                    </div>
                    <div className={recentWeekTransactions.length > 5 ? "overflow-y-auto max-h-72" : "overflow-x-auto"}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-gray-500 border-b">
                                    <th className="pb-2">ID</th>
                                    <th className="pb-2">Type</th>
                                    <th className="pb-2">Product</th>
                                    <th className="pb-2">Quantity</th>
                                    <th className="pb-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentWeekTransactions.map((transaction) => (
                                    <tr key={transaction.transaction_detail_id} className="border-b last:border-0">
                                        <td className="py-3">{transaction.transaction_id}</td>
                                        <td className={`py-3 ${transaction.transaction_type === 'inward' ? 'text-green-600' : 'text-blue-600'}`}>{transaction.transaction_type}</td>
                                        <td className="py-3">{transaction.product_name}</td>
                                        <td className="py-3">{transaction.quantity}</td>
                                        <td className="py-3">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-red-600">Low Stock Alert</h3>
                    </div>
                    <div className="space-y-4">
                        {lowStockProducts.length === 0 ? (
                            <p className="mt-4 text-gray-600">No items are currently low on stock.</p>
                        ) : (
                            lowStockProducts.map((item) => (
                                <div key={item.product_id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">{item.name}</h4>
                                        <p className="text-sm text-gray-500">ID: {item.product_id}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-red-600 font-semibold">{item.current_stock} in stock</p>
                                        <p className="text-xs text-gray-500">Minimum required: 5</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Inventory Summary */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Inventory Summary</h3>
                    <button 
                        onClick={fetchDashboardData} 
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Refresh Data
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {inventorySummary.map((category, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">{category.type}</h4>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Items:</span>
                                <span className="font-semibold">{category.count}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                                <span className="text-gray-500">Value:</span>
                                <span className="font-semibold">${Number(category.total_value).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardTab;