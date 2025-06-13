// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import LoginTab from './components/LoginTab';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import DashboardTab from './components/DashboardTab';
// import ProductsTab from './components/ProductsTab';
// import StockInTab from './components/StockInTab';
// import StockOutTab from './components/StockOutTab';
// import TransactionsTab from './components/TransactionsTab';
// import SuppliersTab from './components/SuppliersTab';
// import ReceiversTab from './components/ReceiversTab';
// import api from './services/api';

// function App() {
//   const[LoginTabOpen, setLoginTabOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [recentTransactions, setRecentTransactions] = useState([]);
//   const [lowStockItems, setLowStockItems] = useState([]);
//   const [inventorySummary, setInventorySummary] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [receivers, setReceivers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [transactionsRes, inventoryRes, suppliersRes, receiversRes] = await Promise.all([
//           api.getTransactions(),
//           api.getAllItems(),
//           api.getAllSuppliers(),
//           api.getAllReceivers()
//         ]);

//         setRecentTransactions(transactionsRes.data || []);
//         setProducts(inventoryRes.data || []);
        
//         // Set low stock items
//         const lowStock = (inventoryRes.data || []).filter(item => item.quantity < item.minimum_stock);
//         setLowStockItems(lowStock);

//         // Calculate inventory summary
//         const summary = (inventoryRes.data || []).reduce((acc, item) => {
//           const category = acc.find(cat => cat.category === item.category);
//           if (category) {
//             category.count += 1;
//             category.value += item.price * item.quantity;
//           } else {
//             acc.push({ 
//               category: item.category, 
//               count: 1, 
//               value: item.price * item.quantity 
//             });
//           }
//           return acc;
//         }, []);
//         setInventorySummary(summary);

//         setSuppliers(suppliersRes.data || []);
//         setReceivers(receiversRes.data || []);
        
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message || 'An error occurred while fetching data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <div className="text-red-600 text-xl mb-4">Error</div>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="flex h-screen bg-gray-100">
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
//           <main className="flex-1 overflow-auto p-6">
//             <Routes>
//               <Route path="/" element={<Navigate to="/dashboard" replace />} />
//               <Route 
//                 path="/dashboard" 
//                 element={
//                   <DashboardTab 
//                     recentTransactions={recentTransactions}
//                     lowStockItems={lowStockItems}
//                     inventorySummary={inventorySummary}
//                   />
//                 } 
//               />
//               <Route 
//                 path="/products" 
//                 element={<ProductsTab products={products} />} 
//               />
//               <Route 
//                 path="/stock-in" 
//                 element={
//                   <StockInTab 
//                     products={products}
//                     suppliers={suppliers}
//                   />
//                 } 
//               />
//               <Route 
//                 path="/stock-out" 
//                 element={
//                   <StockOutTab 
//                     products={products}
//                     receivers={receivers}
//                   />
//                 } 
//               />
//               <Route 
//                 path="/transactions" 
//                 element={<TransactionsTab transactions={recentTransactions} />} 
//               />
//               <Route 
//                 path="/suppliers" 
//                 element={<SuppliersTab suppliers={suppliers} />} 
//               />
//               <Route 
//                 path="/receivers" 
//                 element={<ReceiversTab receivers={receivers} />} 
//               />
//               <Route path="*" element={<Navigate to="/dashboard" replace />} />
//             </Routes>
//           </main>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginTab from './components/LoginTab';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardTab from './components/DashboardTab';
import ProductsTab from './components/ProductsTab';
import StockInTab from './components/StockInTab';
import StockOutTab from './components/StockOutTab';
import TransactionsTab from './components/TransactionsTab';
import SuppliersTab from './components/SuppliersTab';
import ReceiversTab from './components/ReceiversTab';
import api from './services/api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Track login
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [inventorySummary, setInventorySummary] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [receivers, setReceivers] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return; // 🔐 Only fetch after login

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [transactionsRes, inventoryRes, suppliersRes, receiversRes] = await Promise.all([
          api.getTransactions(),
          api.getAllItems(),
          api.getAllSuppliers(),
          api.getAllReceivers()
        ]);

        setRecentTransactions(transactionsRes.data || []);
        setProducts(inventoryRes.data || []);

        const lowStock = (inventoryRes.data || []).filter(item => item.quantity < item.minimum_stock);
        setLowStockItems(lowStock);

        const summary = (inventoryRes.data || []).reduce((acc, item) => {
          const category = acc.find(cat => cat.category === item.category);
          if (category) {
            category.count += 1;
            category.value += item.price * item.quantity;
          } else {
            acc.push({
              category: item.category,
              count: 1,
              value: item.price * item.quantity
            });
          }
          return acc;
        }, []);
        setInventorySummary(summary);

        setSuppliers(suppliersRes.data || []);
        setReceivers(receiversRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <LoginTab onLogin={() => setIsLoggedIn(true)} />;
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={
                <DashboardTab
                  recentTransactions={recentTransactions}
                  lowStockItems={lowStockItems}
                  inventorySummary={inventorySummary}
                />
              } />
              <Route path="/products" element={<ProductsTab products={products} />} />
              <Route path="/stock-in" element={<StockInTab products={products} suppliers={suppliers} />} />
              <Route path="/stock-out" element={<StockOutTab products={products} receivers={receivers} />} />
              <Route path="/transactions" element={<TransactionsTab transactions={recentTransactions} />} />
              <Route path="/suppliers" element={<SuppliersTab suppliers={suppliers} />} />
              <Route path="/receivers" element={<ReceiversTab receivers={receivers} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
