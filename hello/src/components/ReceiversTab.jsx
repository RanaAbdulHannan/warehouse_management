import React, { useState, useEffect } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import api from '../services/api';

function ReceiversTab() {
  const [receivers, setReceivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newReceiver, setNewReceiver] = useState({ 
    name: '', 
    contact_number: '', 
    address: '' 
  });
  const [editModal, setEditModal] = useState({ 
    open: false, 
    receiver: null 
  });
  const [deleteModal, setDeleteModal] = useState({ 
    open: false, 
    receiver: null 
  });
  const [editReceiver, setEditReceiver] = useState({ 
    name: '', 
    contact_number: '', 
    address: '' 
  });

  // Fetch receivers on component mount
  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getAllReceivers();
        setReceivers(res.data || []);
      } catch (err) {
        setError('Failed to load receivers.');
        console.error('Error fetching receivers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReceivers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReceiver(prev => ({ ...prev, [name]: value }));
  };

  const handleAddReceiver = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createReceiver(newReceiver);
      if (response.data) {
        setReceivers(prev => [...prev, response.data]);
        setShowModal(false);
        setNewReceiver({ name: '', contact_number: '', address: '' });
      }
    } catch (err) {
      alert('Failed to add receiver.');
      console.error('Error adding receiver:', err);
    }
  };

  const openEditModal = (receiver) => {
    setEditReceiver({
      name: receiver.name,
      contact_number: receiver.contact_number,
      address: receiver.address
    });
    setEditModal({ 
      open: true, 
      receiver: receiver 
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditReceiver(prev => ({ ...prev, [name]: value }));
  };

  const handleEditReceiver = async (e) => {
    e.preventDefault();
    try {
      const response = await api.updateReceiver(
        editModal.receiver.receiver_id, 
        editReceiver
      );
      if (response.data) {
        setReceivers(prev => 
          prev.map(r => 
            r.receiver_id === editModal.receiver.receiver_id ? response.data : r
          )
        );
        setEditModal({ open: false, receiver: null });
      }
    } catch (err) {
      alert('Failed to update receiver.');
      console.error('Error updating receiver:', err);
    }
  };

  const openDeleteModal = (receiver) => {
    setDeleteModal({ 
      open: true, 
      receiver: receiver 
    });
  };

  const handleDeleteReceiver = async () => {
    try {
      await api.deleteReceiver(deleteModal.receiver.receiver_id);
      setReceivers(prev => 
        prev.filter(r => r.receiver_id !== deleteModal.receiver.receiver_id)
      );
      setDeleteModal({ open: false, receiver: null });
    } catch (err) {
      alert('Failed to delete receiver.');
      console.error('Error deleting receiver:', err);
    }
  };

  const filteredReceivers = receivers.filter(receiver => {
    const query = searchQuery.toLowerCase();
    return (
      (receiver.receiver_id ? receiver.receiver_id.toString().toLowerCase() : '').includes(query) ||
      (receiver.name || '').toLowerCase().includes(query) ||
      (receiver.contact_number || '').toLowerCase().includes(query) ||
      (receiver.address || '').toLowerCase().includes(query)
    );
  });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Receiver Management</h3>
          <div className="flex space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search receivers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center" 
              onClick={() => setShowModal(true)}
            >
              <PlusCircle size={16} className="mr-2" /> Add Receiver
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact Number</th>
                <th className="p-4">Address</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReceivers.map((receiver) => (
                <tr key={receiver.receiver_id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4">{receiver.receiver_id}</td>
                  <td className="p-4">{receiver.name}</td>
                  <td className="p-4">{receiver.contact_number}</td>
                  <td className="p-4">{receiver.address}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800" 
                        onClick={() => openEditModal(receiver)}
                      >
                        Edit
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800" 
                        onClick={() => openDeleteModal(receiver)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Receiver Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Add New Receiver</h2>
            <form onSubmit={handleAddReceiver} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Receiver Name"
                value={newReceiver.name}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={newReceiver.contact_number}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newReceiver.address}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              >
                Add Receiver
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Receiver Modal */}
      {editModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setEditModal({ open: false, receiver: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Receiver</h2>
            <form onSubmit={handleEditReceiver} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Receiver Name"
                value={editReceiver.name}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={editReceiver.contact_number}
                onChange={handleEditInputChange}
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={editReceiver.address}
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

      {/* Delete Receiver Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setDeleteModal({ open: false, receiver: null })}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Delete Receiver</h2>
            <p>Are you sure you want to delete <span className="font-semibold">{deleteModal.receiver?.name}</span>?</p>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
                onClick={() => setDeleteModal({ open: false, receiver: null })}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleDeleteReceiver}
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

export default ReceiversTab;