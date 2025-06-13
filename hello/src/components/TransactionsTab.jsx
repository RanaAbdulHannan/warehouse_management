import React, { useState, useEffect } from 'react';
import { Search, Clipboard, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';

function TransactionsTab() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getTransactions();
        setAllTransactions(res.data || []);
        setFilteredTransactions(res.data || []);
      } catch (err) {
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const applyFilter = () => {
    if (!dateRange.from && !dateRange.to) {
      setFilteredTransactions(allTransactions);
      setCurrentPage(1);
      return;
    }

    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;

    const filtered = allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.transaction_date);
      if (fromDate && toDate) return transactionDate >= fromDate && transactionDate <= toDate;
      else if (fromDate) return transactionDate >= fromDate;
      else if (toDate) return transactionDate <= toDate;
      return true;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setDateRange({ from: '', to: '' });
    setFilteredTransactions(allTransactions);
    setCurrentPage(1);
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`px-3 py-1 rounded-md ${currentPage === i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {i}
          </button>
        );
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <div className="flex space-x-2 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">From:</label>
            <input 
              type="date" 
              name="from"
              value={dateRange.from}
              onChange={handleDateChange}
              className="border rounded-lg px-3 py-1 text-sm" 
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">To:</label>
            <input 
              type="date" 
              name="to"
              value={dateRange.to}
              onChange={handleDateChange}
              className="border rounded-lg px-3 py-1 text-sm" 
            />
          </div>
          <button 
            onClick={applyFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1"
          >
            <Search size={16} />
            <span>Filter</span>
          </button>
          {(dateRange.from || dateRange.to) && (
            <button 
              onClick={resetFilter}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Type</th>
              <th className="p-4">Product</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Date</th>
              <th className="p-4">Supplier/Receiver</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.length > 0 ? (
              currentTransactions.map((transaction) => (
                <tr key={transaction.transaction_detail_id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{transaction.transaction_id}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.transaction_type === 'inward' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.transaction_type}
                    </span>
                  </td>
                  <td className="p-4">{transaction.product_name}</td>
                  <td className="p-4">{transaction.quantity}</td>
                  <td className="p-4">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td className="p-4">{transaction.supplier_name || transaction.receiver_name || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No transactions found for the selected date range
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Showing Count and Pagination */}
      <div className="flex justify-between items-center p-4">
        <div className="text-sm text-gray-500">
          {filteredTransactions.length > 0 && (
            <>
              Showing {indexOfFirstTransaction + 1}–{Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </>
          )}
        </div>

        <div className="flex items-center space-x-1">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          {renderPageNumbers()}
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionsTab;
