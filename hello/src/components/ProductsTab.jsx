import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    type: '',
    price: '',
    current_stock: ''
  });
  const [editModal, setEditModal] = useState({ open: false, product: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null });
  const [editProduct, setEditProduct] = useState({ name: '', type: '', price: '', current_stock: '' });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      (product.product_id ? product.product_id.toString().toLowerCase() : '').includes(query) ||
      (product.name || '').toLowerCase().includes(query) ||
      (product.type || '').toLowerCase().includes(query) ||
      (product.price !== undefined ? product.price.toString() : '').includes(query) ||
      (product.current_stock !== undefined ? product.current_stock.toString() : '').includes(query)
    );
  });

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await api.createItem({
        name: newProduct.name,
        type: newProduct.type,
        price: Number(newProduct.price),
        current_stock: Number(newProduct.current_stock)
      });
      // Refresh product list
      const res = await api.getAllItems();
      setProducts(res.data || []);
      setShowModal(false);
      setNewProduct({ name: '', type: '', price: '', current_stock: '' });
      // Reset to first page after adding new product
      setCurrentPage(1);
    } catch (err) {
      alert('Failed to add product.');
    }
  };

  const openEditModal = (product) => {
    setEditProduct({
      name: product.name,
      type: product.type,
      price: product.price,
      current_stock: product.current_stock
    });
    setEditModal({ open: true, product });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      await api.updateItem(editModal.product.product_id, {
        name: editProduct.name,
        type: editProduct.type,
        price: Number(editProduct.price),
        current_stock: Number(editProduct.current_stock)
      });
      const res = await api.getAllItems();
      setProducts(res.data || []);
      setEditModal({ open: false, product: null });
    } catch (err) {
      alert('Failed to update product.');
    }
  };

  const openDeleteModal = (product) => {
    setDeleteModal({ open: true, product });
  };

  const handleDeleteProduct = async () => {
    try {
      await api.deleteItem(deleteModal.product.product_id);
      const res = await api.getAllItems();
      setProducts(res.data || []);
      setDeleteModal({ open: false, product: null });
      // Reset to first page if current page would be empty after deletion
      if (currentProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getAllItems();
        setProducts(res.data || []);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex justify-between items-center p-6 border-b">
        <h3 className="text-lg font-semibold">Product List</h3>
        <div className="flex space-x-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowModal(true)}
          >
            <PlusCircle size={16} className="mr-2" /> Add Product
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {/* Modal for Add Product */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Type"
                  value={newProduct.type}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <input
                  type="number"
                  name="current_stock"
                  placeholder="Current Stock"
                  value={newProduct.current_stock}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                >
                  Add Product
                </button>
              </form>
            </div>
          </div>
        )}
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="p-4">Product ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">Current Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.product_id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{product.product_id}</td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.type}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.current_stock !== undefined ? product.current_stock : 'N/A'}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(product)}>Edit</button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => openDeleteModal(product)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Edit Product Modal */}
      {editModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setEditModal({ open: false, product: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={editProduct.name}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={editProduct.type}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editProduct.price}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="number"
                name="current_stock"
                placeholder="Current Stock"
                value={editProduct.current_stock}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Delete Product Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setDeleteModal({ open: false, product: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{deleteModal.product.name}</span>?</p>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={() => setDeleteModal({ open: false, product: null })}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleDeleteProduct}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={18} />
          </button>
          
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => {
            // Show only a few page numbers around the current page
            if (
              i === 0 || 
              i === Math.ceil(filteredProducts.length / productsPerPage) - 1 ||
              (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
              return (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              );
            }
            return null;
          })}
          
          <button 
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
            className={`p-2 rounded ${currentPage === Math.ceil(filteredProducts.length / productsPerPage) ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;