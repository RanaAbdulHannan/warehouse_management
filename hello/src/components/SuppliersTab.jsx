import React, { useState, useEffect } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import api from '../services/api';

function SuppliersTab() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact_number: '',
    shop_address: '',
    supplied_product_types: ''
  });
  const [editModal, setEditModal] = useState({ open: false, supplier: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, supplier: null });
  const [editSupplier, setEditSupplier] = useState({ name: '', contact_number: '', shop_address: '', supplied_product_types: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    try {
      await api.createSupplier({
        name: newSupplier.name,
        contact_number: newSupplier.contact_number,
        shop_address: newSupplier.shop_address,
        supplied_product_types: newSupplier.supplied_product_types.split(',').map(s => s.trim())
      });
      const res = await api.getAllSuppliers();
      setSuppliers(res.data || []);
      setShowModal(false);
      setNewSupplier({ name: '', contact_number: '', shop_address: '', supplied_product_types: '' });
    } catch (err) {
      alert('Failed to add supplier.');
    }
  };

  const openEditModal = (supplier) => {
    setEditSupplier({
      name: supplier.name,
      contact_number: supplier.contact_number,
      shop_address: supplier.shop_address,
      supplied_product_types: Array.isArray(supplier.supplied_product_types) ? supplier.supplied_product_types.join(', ') : ''
    });
    setEditModal({ open: true, supplier });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditSupplier((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSupplier = async (e) => {
    e.preventDefault();
    try {
      await api.updateSupplier(editModal.supplier.supplier_id, {
        name: editSupplier.name,
        contact_number: editSupplier.contact_number,
        shop_address: editSupplier.shop_address,
        supplied_product_types: editSupplier.supplied_product_types.split(',').map(s => s.trim())
      });
      const res = await api.getAllSuppliers();
      setSuppliers(res.data || []);
      setEditModal({ open: false, supplier: null });
    } catch (err) {
      alert('Failed to update supplier.');
    }
  };

  const openDeleteModal = (supplier) => {
    setDeleteModal({ open: true, supplier });
  };

  const handleDeleteSupplier = async () => {
    try {
      await api.deleteSupplier(deleteModal.supplier.supplier_id);
      const res = await api.getAllSuppliers();
      setSuppliers(res.data || []);
      setDeleteModal({ open: false, supplier: null });
    } catch (err) {
      alert('Failed to delete supplier.');
    }
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getAllSuppliers();
        setSuppliers(res.data || []);
      } catch (err) {
        setError('Failed to load suppliers.');
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const query = searchQuery.toLowerCase();
    return (
      (supplier.supplier_id ? supplier.supplier_id.toString().toLowerCase() : '').includes(query) ||
      supplier.name.toLowerCase().includes(query) ||
      (supplier.contact_number || '').includes(query) ||
      (supplier.shop_address || '').toLowerCase().includes(query)
    );
  });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Supplier Management</h3>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search suppliers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
             </div>
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" onClick={() => setShowModal(true)}>
              <PlusCircle size={16} className="mr-2" /> Add Supplier
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {/* Modal for Add Supplier */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <h2 className="text-lg font-semibold mb-4">Add New Supplier</h2>
                <form onSubmit={handleAddSupplier} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    value={newSupplier.name}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={newSupplier.contact_number}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="shop_address"
                    placeholder="Shop Address"
                    value={newSupplier.shop_address}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name="supplied_product_types"
                    placeholder="Supplied Product Types (comma separated)"
                    value={newSupplier.supplied_product_types}
                    onChange={handleInputChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                  >
                    Add Supplier
                  </button>
                </form>
              </div>
            </div>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact Number</th>
                <th className="p-4">Shop Address</th>
                <th className="p-4">Supplied Product Types</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.supplier_id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{supplier.supplier_id}</td>
                  <td className="p-4">{supplier.name}</td>
                  <td className="p-4">{supplier.contact_number}</td>
                  <td className="p-4">{supplier.shop_address}</td>
                  <td className="p-4">{Array.isArray(supplier.supplied_product_types) ? supplier.supplied_product_types.join(', ') : ''}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800" onClick={() => openEditModal(supplier)}>Edit</button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => openDeleteModal(supplier)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Supplier Modal */}
      {editModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setEditModal({ open: false, supplier: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Supplier</h2>
            <form onSubmit={handleEditSupplier} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Supplier Name"
                value={editSupplier.name}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={editSupplier.contact_number}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="shop_address"
                placeholder="Shop Address"
                value={editSupplier.shop_address}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="supplied_product_types"
                placeholder="Supplied Product Types (comma separated)"
                value={editSupplier.supplied_product_types}
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

      {/* Delete Supplier Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setDeleteModal({ open: false, supplier: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Delete Supplier</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{deleteModal.supplier.name}</span>?</p>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={() => setDeleteModal({ open: false, supplier: null })}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleDeleteSupplier}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuppliersTab;