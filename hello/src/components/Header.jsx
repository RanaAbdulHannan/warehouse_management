// import React from 'react';
// import { Search } from 'lucide-react';
// import { useLocation } from 'react-router-dom';

// export default function Header() {
//   const location = useLocation();
//   const getPageTitle = (pathname) => {
//     switch (pathname) {
//       case '/dashboard':
//         return 'Dashboard';
//       case '/products':
//         return 'Product Management';
//       case '/stock-in':
//         return 'Stock Inward';
//       case '/stock-out':
//         return 'Stock Outward';
//       case '/transactions':
//         return 'Transaction History';
//       case '/suppliers':
//         return 'Supplier Management';
//       case '/receivers':
//         return 'Receiver Management';
//       default:
//         return 'Dashboard';
//     }
//   };

//   return (
//     <header className="bg-white shadow px-6 py-4">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           {getPageTitle(location.pathname)}
//         </h2>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-20 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
//           </div>
//           <div className="bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-lg">
//             Admin
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import React from 'react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/products':
        return 'Product Management';
      case '/stock-in':
        return 'Stock Inward';
      case '/stock-out':
        return 'Stock Outward';
      case '/transactions':
        return 'Transaction History';
      case '/suppliers':
        return 'Supplier Management';
      case '/receivers':
        return 'Receiver Management';
      default:
        return 'Dashboard';
    }
  };

  // Paths where search bar should NOT be shown
  const hideSearchFor = ['/dashboard', '/stock-in', '/stock-out'];

  return (
    <header className="bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          {getPageTitle(pathname)}
        </h2>
     
      </div>
    </header>
  );
}
