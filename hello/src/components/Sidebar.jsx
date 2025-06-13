import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Package, ArrowDownCircle, ArrowUpCircle, Clipboard, Truck, Users, Database } from 'lucide-react';

export const SidebarItem = ({ icon, label, to, active, onClick, collapsed }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 ${
        active ? 'bg-blue-700' : 'hover:bg-blue-700'
      } transition-colors duration-200`}
    >
      <div className={`${collapsed ? 'mx-auto' : 'mr-4'}`}>{icon}</div>
      {!collapsed && <span>{label}</span>}
    </button>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`bg-blue-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">FAST Warehouse</h1>
        ) : (
          <h1 className="text-xl font-bold">FW</h1>
        )}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded hover:bg-blue-700"
        >
          {sidebarOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      
      <nav className="mt-6">
        <SidebarItem
          icon={<Database size={20} />}
          label="Dashboard"
          active={currentPath === '/dashboard'}
          onClick={() => navigate('/dashboard')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<Package size={20} />}
          label="Products"
          active={currentPath === '/products'}
          onClick={() => navigate('/products')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<ArrowDownCircle size={20} />}
          label="Stock Inward"
          active={currentPath === '/stock-in'}
          onClick={() => navigate('/stock-in')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<ArrowUpCircle size={20} />}
          label="Stock Outward"
          active={currentPath === '/stock-out'}
          onClick={() => navigate('/stock-out')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<Clipboard size={20} />}
          label="Transactions"
          active={currentPath === '/transactions'}
          onClick={() => navigate('/transactions')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<Truck size={20} />}
          label="Suppliers"
          active={currentPath === '/suppliers'}
          onClick={() => navigate('/suppliers')}
          collapsed={!sidebarOpen}
        />
        <SidebarItem
          icon={<Users size={20} />}
          label="Receivers"
          active={currentPath === '/receivers'}
          onClick={() => navigate('/receivers')}
          collapsed={!sidebarOpen}
        />
      </nav>
    </div>
  );
};

export default Sidebar;