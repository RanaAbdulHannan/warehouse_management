// import React from 'react';
// import { useState } from 'react';
// import { ChevronDown, ChevronUp, Package, PlusCircle, Truck, Users, Clipboard, Search, ArrowDownCircle, ArrowUpCircle, Database } from 'lucide-react';

// export default function WarehouseManagementSystem() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
  
//   // Sample data
//   const recentTransactions = [
//     { id: 'TRX001', type: 'Stock In', product: 'Laptop Dell XPS', quantity: 25, price: 25000, date: '2025-05-05', supplier: 'Tech Solutions Inc.' },
//     { id: 'TRX003', type: 'Stock In', product: 'Samsung TV 55"', quantity: 15, price: 18000, date: '2025-05-03', supplier: 'Electronics Hub' },
//     { id: 'TRX004', type: 'Stock Out', product: 'Logitech Mouse', quantity: 50, price: 2500, date: '2025-05-02', receiver: 'Office Supplies Co.' },
//   ];

//   const lowStockItems = [
//     { id: 'P001', name: 'HP Printer', current: 5, minimum: 10 },
//     { id: 'P002', name: 'Wireless Headphones', current: 3, minimum: 15 },
//     { id: 'P003', name: 'USB-C Cables', current: 8, minimum: 20 },
//   ];

//   const inventorySummary = [
//     { category: 'Electronics', count: 120, value: 450000 },
//     { category: 'Furniture', count: 45, value: 120000 },
//     { category: 'Office Supplies', count: 350, value: 85000 },
//     { category: 'Network Equipment', count: 85, value: 210000 },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-blue-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
//         <div className="p-4 flex items-center justify-between">
//           {sidebarOpen ? (
//             <h1 className="text-xl font-bold">WareTrack</h1>
//           ) : (
//             <h1 className="text-xl font-bold">WT</h1>
//           )}
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="p-1 rounded hover:bg-blue-700"
//           >
//             {sidebarOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
//           </button>
//         </div>
        
//         <nav className="mt-6">
//           <SidebarItem
//             icon={<Database size={20} />}
//             label="Dashboard"
//             active={activeTab === 'dashboard'}
//             onClick={() => setActiveTab('dashboard')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<Package size={20} />}
//             label="Products"
//             active={activeTab === 'products'}
//             onClick={() => setActiveTab('products')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<ArrowDownCircle size={20} />}
//             label="Stock Inward"
//             active={activeTab === 'stock-in'}
//             onClick={() => setActiveTab('stock-in')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<ArrowUpCircle size={20} />}
//             label="Stock Outward"
//             active={activeTab === 'stock-out'}
//             onClick={() => setActiveTab('stock-out')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<Clipboard size={20} />}
//             label="Transactions"
//             active={activeTab === 'transactions'}
//             onClick={() => setActiveTab('transactions')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<Truck size={20} />}
//             label="Suppliers"
//             active={activeTab === 'suppliers'}
//             onClick={() => setActiveTab('suppliers')}
//             collapsed={!sidebarOpen}
//           />
//           <SidebarItem
//             icon={<Users size={20} />}
//             label="Receivers"
//             active={activeTab === 'receivers'}
//             onClick={() => setActiveTab('receivers')}
//             collapsed={!sidebarOpen}
//           />
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <header className="bg-white shadow px-6 py-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {activeTab === 'dashboard' && 'Dashboard'}
//               {activeTab === 'products' && 'Product Management'}
//               {activeTab === 'stock-in' && 'Stock Inward'}
//               {activeTab === 'stock-out' && 'Stock Outward'}
//               {activeTab === 'transactions' && 'Transaction History'}
//               {activeTab === 'suppliers' && 'Supplier Management'}
//               {activeTab === 'receivers' && 'Receiver Management'}
//             </h2>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
//               </div>
//               <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg">
//                 Admin
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="p-6">
//           {activeTab === 'dashboard' && <DashboardTab recentTransactions={recentTransactions} lowStockItems={lowStockItems} inventorySummary={inventorySummary} />}
//           {activeTab === 'products' && <ProductsTab />}
//           {activeTab === 'stock-in' && <StockInTab />}
//           {activeTab === 'stock-out' && <StockOutTab />}
//           {activeTab === 'transactions' && <TransactionsTab transactions={recentTransactions} />}
//           {activeTab === 'suppliers' && <SuppliersTab />}
//           {activeTab === 'receivers' && <ReceiversTab />}
//         </main>
//       </div>
//     </div>
//   );
// }

// function SidebarItem({ icon, label, active, onClick, collapsed }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center w-full px-4 py-3 ${
//         active ? 'bg-blue-700' : 'hover:bg-blue-700'
//       } transition-colors duration-200`}
//     >
//       <div className={`${collapsed ? 'mx-auto' : 'mr-4'}`}>{icon}</div>
//       {!collapsed && <span>{label}</span>}
//     </button>
//   );
// }

// function DashboardTab({ recentTransactions, lowStockItems, inventorySummary }) {
//   return (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard title="Total Products" value="785" icon={<Package size={24} />} color="bg-blue-100 text-blue-800" />
//         <StatCard title="Total Suppliers" value="42" icon={<Truck size={24} />} color="bg-green-100 text-green-800" />
//         <StatCard title="Total Receivers" value="68" icon={<Users size={24} />} color="bg-purple-100 text-purple-800" />
//         <StatCard title="Transactions (Month)" value="203" icon={<Clipboard size={24} />} color="bg-orange-100 text-orange-800" />
//       </div>

//       {/* Recent Transactions and Low Stock */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Recent Transactions</h3>
//             <button className="text-blue-600 hover:text-blue-800">View All</button>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b">
//                   <th className="pb-2">ID</th>
//                   <th className="pb-2">Type</th>
//                   <th className="pb-2">Product</th>
//                   <th className="pb-2">Quantity</th>
//                   <th className="pb-2">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentTransactions.map((transaction) => (
//                   <tr key={transaction.id} className="border-b last:border-0">
//                     <td className="py-3">{transaction.id}</td>
//                     <td className={`py-3 ${transaction.type === 'Stock In' ? 'text-green-600' : 'text-blue-600'}`}>
//                       {transaction.type}
//                     </td>
//                     <td className="py-3">{transaction.product}</td>
//                     <td className="py-3">{transaction.quantity}</td>
//                     <td className="py-3">{transaction.date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Low Stock Alert</h3>
//             <button className="text-blue-600 hover:text-blue-800">View All</button>
//           </div>
//           <div className="space-y-4">
//             {lowStockItems.map((item) => (
//               <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
//                 <div>
//                   <h4 className="font-medium">{item.name}</h4>
//                   <p className="text-sm text-gray-500">ID: {item.id}</p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-red-600 font-semibold">{item.current} / {item.minimum}</p>
//                   <p className="text-xs text-gray-500">Current / Minimum</p>
//                 </div>
//                 <button className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-lg text-sm">
//                   Restock
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Inventory Summary */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Inventory Summary</h3>
//           <button className="text-blue-600 hover:text-blue-800">Generate Report</button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {inventorySummary.map((category, index) => (
//             <div key={index} className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">{category.category}</h4>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Items:</span>
//                 <span className="font-semibold">{category.count}</span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-500">Value:</span>
//                 <span className="font-semibold">${category.value.toLocaleString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon, color }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex items-center">
//         <div className={`p-3 rounded-full ${color}`}>{icon}</div>
//         <div className="ml-4">
//           <h3 className="text-gray-500 text-sm">{title}</h3>
//           <p className="text-2xl font-bold">{value}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ProductsTab() {
//   const [products, setProducts] = useState([
//     { id: 'P001', name: 'HP Printer', type: 'Electronics', price: 299.99, stock: 5 },
//     { id: 'P002', name: 'Wireless Headphones', type: 'Electronics', price: 149.99, stock: 3 },
//     { id: 'P003', name: 'USB-C Cables', type: 'Accessories', price: 19.99, stock: 8 },
//     { id: 'P004', name: 'Office Chair', type: 'Furniture', price: 249.99, stock: 12 },
//     { id: 'P005', name: 'Network Switch', type: 'Network Equipment', price: 179.99, stock: 7 },
//   ]);

//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="flex justify-between items-center p-6 border-b">
//         <h3 className="text-lg font-semibold">Product List</h3>
//         <div className="flex space-x-2">
//           <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center">
//             <Search size={16} className="mr-2" /> Filter
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
//             <PlusCircle size={16} className="mr-2" /> Add Product
//           </button>
//         </div>
//       </div>
      
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="p-4">Product ID</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Type</th>
//               <th className="p-4">Price</th>
//               <th className="p-4">Current Stock</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.id} className="border-b last:border-0 hover:bg-gray-50">
//                 <td className="p-4">{product.id}</td>
//                 <td className="p-4">{product.name}</td>
//                 <td className="p-4">{product.type}</td>
//                 <td className="p-4">${product.price}</td>
//                 <td className="p-4">
//                   <span className={`px-2 py-1 rounded-full text-xs ${
//                     product.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                   }`}>
//                     {product.stock} units
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <div className="flex space-x-2">
//                     <button className="text-blue-600 hover:text-blue-800">Edit</button>
//                     <button className="text-red-600 hover:text-red-800">Delete</button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="flex justify-between items-center p-4 border-t">
//         <div className="text-sm text-gray-500">Showing 1-5 of 785 products</div>
//         <div className="flex space-x-1">
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
//           <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
//           <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StockInTab() {
//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Record Stock Inward</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
//               <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">Choose a product...</option>
//                 <option value="P001">HP Printer (P001)</option>
//                 <option value="P002">Wireless Headphones (P002)</option>
//                 <option value="P003">USB-C Cables (P003)</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//               <input
//                 type="number"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter quantity"
//                 min="1"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
//               <input
//                 type="number"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter unit price"
//                 step="0.01"
//                 min="0"
//               />
//             </div>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select Supplier</label>
//               <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">Choose a supplier...</option>
//                 <option value="S001">Tech Solutions Inc.</option>
//                 <option value="S002">Electronics Hub</option>
//                 <option value="S003">Office Depot</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
//               <input
//                 type="text"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter invoice number"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Date Received</label>
//               <input
//                 type="date"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//           <textarea
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Add any additional notes"
//             rows="3"
//           ></textarea>
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
//             Cancel
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//             Record Stock In
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Recent Stock Inward</h3>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="pb-2">Transaction ID</th>
//               <th className="pb-2">Product</th>
//               <th className="pb-2">Quantity</th>
//               <th className="pb-2">Supplier</th>
//               <th className="pb-2">Date</th>
//               <th className="pb-2">Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-3">STI001</td>
//               <td className="py-3">Laptop Dell XPS</td>
//               <td className="py-3">25</td>
//               <td className="py-3">Tech Solutions Inc.</td>
//               <td className="py-3">2025-05-05</td>
//               <td className="py-3">$25,000.00</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-3">STI002</td>
//               <td className="py-3">Samsung TV 55"</td>
//               <td className="py-3">15</td>
//               <td className="py-3">Electronics Hub</td>
//               <td className="py-3">2025-05-03</td>
//               <td className="py-3">$18,000.00</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function StockOutTab() {
//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Record Stock Outward</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
//               <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">Choose a product...</option>
//                 <option value="P001">HP Printer (P001) - 5 in stock</option>
//                 <option value="P002">Wireless Headphones (P002) - 3 in stock</option>
//                 <option value="P003">USB-C Cables (P003) - 8 in stock</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
//               <input
//                 type="number"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter quantity"
//                 min="1"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
//               <input
//                 type="number"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter unit price"
//                 step="0.01"
//                 min="0"
//               />
//             </div>
//           </div>
//           <div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Select Receiver</label>
//               <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 <option value="">Choose a receiver...</option>
//                 <option value="R001">Mobile World</option>
//                 <option value="R002">Office Supplies Co.</option>
//                 <option value="R003">Tech Retail Store</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
//               <input
//                 type="text"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter order number"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Dispatch Date</label>
//               <input
//                 type="date"
//                 className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
//           <textarea
//             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Add any additional notes"
//             rows="3"
//           ></textarea>
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
//             Cancel
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//             Record Stock Out
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow p-6">
//         <h3 className="text-lg font-semibold mb-4">Recent Stock Outward</h3>
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="pb-2">Transaction ID</th>
//               <th className="pb-2">Product</th>
//               <th className="pb-2">Quantity</th>
//               <th className="pb-2">Receiver</th>
//               <th className="pb-2">Date</th>
//               <th className="pb-2">Total Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-3">STO001</td>
//               <td className="py-3">iPhone 16 Pro</td>
//               <td className="py-3">10</td>
//               <td className="py-3">Mobile World</td>
//               <td className="py-3">2025-05-04</td>
//               <td className="py-3">$12,000.00</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-3">STO002</td>
//               <td className="py-3">Logitech Mouse</td>
//               <td className="py-3">50</td>
//               <td className="py-3">Office Supplies Co.</td>
//               <td className="py-3">2025-05-02</td>
//               <td className="py-3">$2,500.00</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// function TransactionsTab({ transactions }) {
//     return (
//       <div className="bg-white rounded-lg shadow">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h3 className="text-lg font-semibold">Transaction History</h3>
//           <div className="flex space-x-2">
//             <div className="flex items-center space-x-2">
//               <label className="text-sm text-gray-500">From:</label>
//               <input type="date" className="border rounded-lg px-3 py-1 text-sm" />
//             </div>
//             <div className="flex items-center space-x-2">
//               <label className="text-sm text-gray-500">To:</label>
//               <input type="date" className="border rounded-lg px-3 py-1 text-sm" />
//             </div>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//               Export
//             </button>
//           </div>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500 border-b">
//                 <th className="p-4">ID</th>
//                 <th className="p-4">Type</th>
//                 <th className="p-4">Product</th>
//                 <th className="p-4">Quantity</th>
//                 <th className="p-4">Price</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Source/Destination</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.map((transaction) => (
//                 <tr key={transaction.id} className="border-b last:border-0 hover:bg-gray-50">
//                   <td className="p-4">{transaction.id}</td>
//                   <td className={`p-4 ${transaction.type === 'Stock In' ? 'text-green-600' : 'text-blue-600'}`}>
//                     {transaction.type}
//                   </td>
//                   <td className="p-4">{transaction.product}</td>
//                   <td className="p-4">{transaction.quantity}</td>
//                   <td className="p-4">${transaction.price.toLocaleString()}</td>
//                   <td className="p-4">{transaction.date}</td>
//                   <td className="p-4">
//                     {transaction.type === 'Stock In' ? transaction.supplier : transaction.receiver}
//                   </td>
//                   <td className="p-4">
//                     <div className="flex space-x-2">
//                       <button className="text-blue-600 hover:text-blue-800">View</button>
//                       <button className="text-gray-600 hover:text-gray-800">Print</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
        
//         <div className="flex justify-between items-center p-4 border-t">
//           <div className="text-sm text-gray-500">Showing 1-{transactions.length} of 203 transactions</div>
//           <div className="flex space-x-1">
//             <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
//             <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
//             <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
//             <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
//             <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
//           </div>
//         </div>
        
//         <div className="p-6 border-t">
//           <h4 className="text-md font-semibold mb-4">Transaction Summary</h4>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="border rounded-lg p-4">
//               <h5 className="font-medium mb-2">Total Stock In</h5>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Count:</span>
//                 <span className="font-semibold">98 transactions</span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-500">Value:</span>
//                 <span className="font-semibold text-green-600">$485,250</span>
//               </div>
//             </div>
            
//             <div className="border rounded-lg p-4">
//               <h5 className="font-medium mb-2">Total Stock Out</h5>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Count:</span>
//                 <span className="font-semibold">105 transactions</span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-500">Value:</span>
//                 <span className="font-semibold text-blue-600">$523,750</span>
//               </div>
//             </div>
            
//             <div className="border rounded-lg p-4">
//               <h5 className="font-medium mb-2">Top Product</h5>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Name:</span>
//                 <span className="font-semibold">iPhone 16 Pro</span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-500">Transactions:</span>
//                 <span className="font-semibold">24</span>
//               </div>
//             </div>
            
//             <div className="border rounded-lg p-4">
//               <h5 className="font-medium mb-2">Monthly Trend</h5>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">This Month:</span>
//                 <span className="font-semibold">+12%</span>
//               </div>
//               <div className="flex justify-between text-sm mt-1">
//                 <span className="text-gray-500">Last Month:</span>
//                 <span className="font-semibold">+8%</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   function SuppliersTab() {
//     const [suppliers, setSuppliers] = useState([
//       { 
//         id: 'S001', 
//         name: 'Tech Solutions Inc.', 
//         contact: '+1 (555) 123-4567', 
//         email: 'contact@techsolutions.com',
//         address: '123 Tech Avenue, San Francisco, CA 94105',
//         category: 'Electronics',
//         status: 'Active'
//       },
//       { 
//         id: 'S002', 
//         name: 'Electronics Hub', 
//         contact: '+1 (555) 234-5678', 
//         email: 'sales@electronicshub.com',
//         address: '456 Circuit Road, Austin, TX 78701',
//         category: 'Electronics',
//         status: 'Active'
//       },
//       { 
//         id: 'S003', 
//         name: 'Office Depot', 
//         contact: '+1 (555) 345-6789', 
//         email: 'business@officedepot.com',
//         address: '789 Office Parkway, Chicago, IL 60601',
//         category: 'Office Supplies',
//         status: 'Active'
//       },
//       { 
//         id: 'S004', 
//         name: 'Furniture World', 
//         contact: '+1 (555) 456-7890', 
//         email: 'orders@furnitureworld.com',
//         address: '101 Chair Street, Boston, MA 02108',
//         category: 'Furniture',
//         status: 'Inactive'
//       },
//       { 
//         id: 'S005', 
//         name: 'Network Systems Co.', 
//         contact: '+1 (555) 567-8901', 
//         email: 'info@networksystems.com',
//         address: '202 Router Avenue, Seattle, WA 98101',
//         category: 'Network Equipment',
//         status: 'Active'
//       },
//     ]);
  
//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow">
//           <div className="flex justify-between items-center p-6 border-b">
//             <h3 className="text-lg font-semibold">Supplier Management</h3>
//             <div className="flex space-x-2">
//               <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center">
//                 <Search size={16} className="mr-2" /> Filter
//               </button>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
//                 <PlusCircle size={16} className="mr-2" /> Add Supplier
//               </button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b">
//                   <th className="p-4">ID</th>
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Contact</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {suppliers.map((supplier) => (
//                   <tr key={supplier.id} className="border-b last:border-0 hover:bg-gray-50">
//                     <td className="p-4">{supplier.id}</td>
//                     <td className="p-4">{supplier.name}</td>
//                     <td className="p-4">{supplier.contact}</td>
//                     <td className="p-4">{supplier.category}</td>
//                     <td className="p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {supplier.status}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800">View</button>
//                         <button className="text-blue-600 hover:text-blue-800">Edit</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="flex justify-between items-center p-4 border-t">
//             <div className="text-sm text-gray-500">Showing 1-5 of 42 suppliers</div>
//             <div className="flex space-x-1">
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
//               <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
//             </div>
//           </div>
//         </div>
  
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Supplier Performance</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">Top Suppliers (by Volume)</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Tech Solutions Inc.</span>
//                   <span className="font-semibold">257 items</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Electronics Hub</span>
//                   <span className="font-semibold">189 items</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Office Depot</span>
//                   <span className="font-semibold">142 items</span>
//                 </li>
//               </ol>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">On-Time Delivery Rate</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Network Systems Co.</span>
//                   <span className="font-semibold text-green-600">98%</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Tech Solutions Inc.</span>
//                   <span className="font-semibold text-green-600">95%</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Electronics Hub</span>
//                   <span className="font-semibold text-yellow-600">87%</span>
//                 </li>
//               </ol>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">Quality Rating</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Electronics Hub</span>
//                   <span className="font-semibold">4.9/5</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Office Depot</span>
//                   <span className="font-semibold">4.8/5</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Tech Solutions Inc.</span>
//                   <span className="font-semibold">4.7/5</span>
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   function ReceiversTab() {
//     const [receivers, setReceivers] = useState([
//       { 
//         id: 'R001', 
//         name: 'Mobile World', 
//         contact: '+1 (555) 901-2345', 
//         email: 'orders@mobileworld.com',
//         address: '555 Smartphone Street, New York, NY 10001',
//         category: 'Retail',
//         status: 'Active'
//       },
//       { 
//         id: 'R002', 
//         name: 'Office Supplies Co.', 
//         contact: '+1 (555) 012-3456', 
//         email: 'purchasing@officesupplies.com',
//         address: '666 Paper Road, Philadelphia, PA 19019',
//         category: 'B2B',
//         status: 'Active'
//       },
//       { 
//         id: 'R003', 
//         name: 'Tech Retail Store', 
//         contact: '+1 (555) 123-4567', 
//         email: 'inventory@techretail.com',
//         address: '777 Gadget Drive, Miami, FL 33101',
//         category: 'Retail',
//         status: 'Active'
//       },
//       { 
//         id: 'R004', 
//         name: 'Corporate Office Solutions', 
//         contact: '+1 (555) 234-5678', 
//         email: 'procurement@corpoffice.com',
//         address: '888 Business Plaza, Denver, CO 80201',
//         category: 'B2B',
//         status: 'Inactive'
//       },
//       { 
//         id: 'R005', 
//         name: 'Electronics Outlet', 
//         contact: '+1 (555) 345-6789', 
//         email: 'stock@electronicsoutlet.com',
//         address: '999 Discount Avenue, Las Vegas, NV 89101',
//         category: 'Retail',
//         status: 'Active'
//       },
//     ]);
  
//     return (
//       <div className="space-y-6">
//         <div className="bg-white rounded-lg shadow">
//           <div className="flex justify-between items-center p-6 border-b">
//             <h3 className="text-lg font-semibold">Receiver Management</h3>
//             <div className="flex space-x-2">
//               <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center">
//                 <Search size={16} className="mr-2" /> Filter
//               </button>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
//                 <PlusCircle size={16} className="mr-2" /> Add Receiver
//               </button>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-500 border-b">
//                   <th className="p-4">ID</th>
//                   <th className="p-4">Name</th>
//                   <th className="p-4">Contact</th>
//                   <th className="p-4">Category</th>
//                   <th className="p-4">Status</th>
//                   <th className="p-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {receivers.map((receiver) => (
//                   <tr key={receiver.id} className="border-b last:border-0 hover:bg-gray-50">
//                     <td className="p-4">{receiver.id}</td>
//                     <td className="p-4">{receiver.name}</td>
//                     <td className="p-4">{receiver.contact}</td>
//                     <td className="p-4">{receiver.category}</td>
//                     <td className="p-4">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         receiver.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {receiver.status}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex space-x-2">
//                         <button className="text-blue-600 hover:text-blue-800">View</button>
//                         <button className="text-blue-600 hover:text-blue-800">Edit</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="flex justify-between items-center p-4 border-t">
//             <div className="text-sm text-gray-500">Showing 1-5 of 68 receivers</div>
//             <div className="flex space-x-1">
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
//               <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
//               <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
//             </div>
//           </div>
//         </div>
  
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Order History</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">Top Receivers (by Volume)</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Mobile World</span>
//                   <span className="font-semibold">156 orders</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Office Supplies Co.</span>
//                   <span className="font-semibold">122 orders</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Tech Retail Store</span>
//                   <span className="font-semibold">97 orders</span>
//                 </li>
//               </ol>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">Order Frequency</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Mobile World</span>
//                   <span className="font-semibold">Bi-weekly</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Office Supplies Co.</span>
//                   <span className="font-semibold">Monthly</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Tech Retail Store</span>
//                   <span className="font-semibold">Weekly</span>
//                 </li>
//               </ol>
//             </div>
//             <div className="border rounded-lg p-4">
//               <h4 className="font-medium mb-2">Payment Status</h4>
//               <ol className="space-y-2">
//                 <li className="flex justify-between items-center">
//                   <span>Mobile World</span>
//                   <span className="font-semibold text-green-600">All Clear</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Office Supplies Co.</span>
//                   <span className="font-semibold text-yellow-600">1 Pending</span>
//                 </li>
//                 <li className="flex justify-between items-center">
//                   <span>Electronics Outlet</span>
//                   <span className="font-semibold text-red-600">2 Overdue</span>
//                 </li>
//               </ol>
//             </div>
//           </div>
//         </div>
  
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Receiver Details</h3>
//           <div className="border rounded-lg p-6">
//             <div className="flex justify-between">
//               <div>
//                 <h4 className="text-xl font-semibold">Mobile World</h4>
//                 <p className="text-gray-500">ID: R001</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="flex items-center text-blue-600 hover:text-blue-800">
//                   <Edit size={16} className="mr-1" /> Edit
//                 </button>
//                 <button className="flex items-center text-red-600 hover:text-red-800">
//                   <XCircle size={16} className="mr-1" /> Deactivate
//                 </button>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <Phone size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Contact Number</p>
//                     <p>+1 (555) 901-2345</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Mail size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Email Address</p>
//                     <p>orders@mobileworld.com</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <MapPin size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Address</p>
//                     <p>555 Smartphone Street, New York, NY 10001</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <Globe size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Category</p>
//                     <p>Retail</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Clipboard size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Order Count</p>
//                     <p>156 orders</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start">
//                   <Package size={20} className="mr-3 text-gray-400 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-gray-500">Most Ordered Product</p>
//                     <p>iPhone 16 Pro</p>
//                   </div>
//                 </div>
//                </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }