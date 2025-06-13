import React, { useState, useEffect } from 'react';
import api from '../services/api';

const StockOutTab = () => {
  const [products, setProducts] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [recentStockOut, setRecentStockOut] = useState([]);
  const [form, setForm] = useState({ productId: '', receiverId: '', quantity: '', price: '', order: '', date: '', notes: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, receiversRes, transactionsRes] = await Promise.all([
          api.getAllItems(),
          api.getAllReceivers(),
          api.getTransactions()
        ]);
        setProducts(productsRes.data || []);
        setReceivers(receiversRes.data || []);
        setRecentStockOut((transactionsRes.data || []).filter(t => t.transaction_type === 'outward').slice(0, 10));
      } catch (err) {
        setError('Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createStockOut({
        receiver_id: form.receiverId,
        items: [{ product_id: form.productId, quantity: Number(form.quantity) }],
        total_price: Number(form.price) * Number(form.quantity)
      });
      // Refresh recent stock out
      const transactionsRes = await api.getTransactions();
      setRecentStockOut((transactionsRes.data || []).filter(t => t.transaction_type === 'outward').slice(0, 10));
      setForm({ productId: '', receiverId: '', quantity: '', price: '', order: '', date: '', notes: '' });
    } catch (err) {
      setError('Failed to record stock out.');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <form className="bg-white rounded-lg shadow p-6" onSubmit={handleSubmit}>
        <h3 className="text-lg font-semibold mb-4">Record Stock Outward</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
              <select name="productId" value={form.productId} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Choose a product...</option>
                {products.map(product => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.name} ({product.current_stock})
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input name="quantity" type="number" value={form.quantity} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter quantity" min="1" required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter unit price" step="0.01" min="0" required />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Receiver</label>
              <select name="receiverId" value={form.receiverId} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                <option value="">Choose a receiver...</option>
                {receivers.map(receiver => (
                  <option key={receiver.receiver_id} value={receiver.receiver_id}>
                    {receiver.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Dispatch Date</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg" onClick={() => setForm({ productId: '', receiverId: '', quantity: '', price: '', order: '', date: '', notes: '' })}>
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Record Stock Out
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Stock Outward</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-2">Transaction ID</th>
              <th className="pb-2">Product</th>
              <th className="pb-2">Quantity</th>
              <th className="pb-2">Receiver</th>
              <th className="pb-2">Date</th>
              {/* <th className="pb-2">Total Price</th> */}
            </tr>
          </thead>
          <tbody>
            {recentStockOut.map(tx => (
              <tr key={`${tx.transaction_id}-${tx.transaction_detail_id}`} className="border-b">
                <td className="py-3">{tx.transaction_id}</td>
                <td className="py-3">{tx.product_name}</td>
                <td className="py-3">{tx.quantity}</td>
                <td className="py-3">{tx.receiver_name}</td>
                <td className="py-3">{new Date(tx.transaction_date).toLocaleDateString()}</td>
                {/* <td className="py-3">${Number(tx.quantity) * Number(tx.price || 0)}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOutTab;