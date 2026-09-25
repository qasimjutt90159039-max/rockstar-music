import React, { useState } from 'react';
import { Users, Search, Phone, Mail, MapPin } from 'lucide-react';

const INITIAL_CUSTOMERS = [
  {
    id: 'cust_1',
    name: 'Hamza Khan',
    email: 'hamza@example.com',
    phone: '+92 300 8923411',
    city: 'Multan',
    ordersCount: 2,
    totalSpent: 83500,
    registeredAt: '2026-08-15'
  },
  {
    id: 'cust_2',
    name: 'Bilal Ahmed',
    email: 'bilal@example.com',
    phone: '+92 321 4455667',
    city: 'Lahore',
    ordersCount: 1,
    totalSpent: 65000,
    registeredAt: '2026-08-20'
  },
  {
    id: 'cust_3',
    name: 'Shahid Mehmood',
    email: 'shahid@example.com',
    phone: '+92 333 1122334',
    city: 'Multan',
    ordersCount: 1,
    totalSpent: 49500,
    registeredAt: '2026-09-02'
  },
  {
    id: 'cust_4',
    name: 'Zainab Fatima',
    email: 'zainab@example.com',
    phone: '+92 345 9988776',
    city: 'Islamabad',
    ordersCount: 1,
    totalSpent: 185000,
    registeredAt: '2026-09-10'
  }
];

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Registered Customers
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            CUSTOMER DIRECTORY ({customers.length})
          </h1>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer name, phone, city, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
        />
      </div>

      <div className="bg-[#111111] border border-studio-border rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151515] text-gray-400 border-b border-studio-border font-mono">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">City</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4">Total Spent (PKR)</th>
                <th className="p-4">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border/50">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-black/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{cust.name}</div>
                  </td>
                  <td className="p-4 font-mono text-gray-300">
                    <div>{cust.phone}</div>
                    <div className="text-[10px] text-gray-500">{cust.email}</div>
                  </td>
                  <td className="p-4 text-studio-gold font-medium">{cust.city}</td>
                  <td className="p-4 text-center font-mono font-bold text-white">
                    {cust.ordersCount}
                  </td>
                  <td className="p-4 font-mono font-bold text-studio-gold">
                    PKR {cust.totalSpent.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-gray-400">
                    {cust.registeredAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
