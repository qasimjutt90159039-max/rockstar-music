import React, { useState } from 'react';
import { Mail, Phone, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    name: 'Adeel Murtaza',
    phone: '+92 301 7766554',
    email: 'adeel@example.com',
    subject: 'Yamaha Pacifica 012 Stock Inquiry',
    message: 'Hello Rockstar team, do you currently have the black Pacifica 012 available for physical inspection at the Peer Khurshid Colony shop?',
    status: 'read',
    createdAt: '2026-09-24 14:30'
  },
  {
    id: 'm2',
    name: 'Kashif Raza',
    phone: '+92 300 1199882',
    email: 'kashif@example.com',
    subject: 'Roland FP-30X Delivery to Bahawalpur',
    message: 'Can the Roland FP-30X piano be safely delivered to Bahawalpur via Cash on Delivery with wooden crate packing?',
    status: 'unread',
    createdAt: '2026-09-25 08:15'
  }
];

const AdminMessages = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const { addToast } = useToast();

  const handleToggleStatus = (id) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'unread' ? 'read' : 'unread' } : m
      )
    );
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    addToast('Message deleted.', 'info');
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Customer Inquiries
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            INBOX MESSAGES ({messages.length})
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Questions and product inquiries submitted from the Contact page.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`border rounded-2xl p-6 transition-all ${
              msg.status === 'unread'
                ? 'bg-[#151515] border-studio-gold/60 shadow-lg shadow-studio-gold/5'
                : 'bg-[#111111] border-studio-border'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-studio-border/60 mb-3">
              <div>
                <span className="font-bold text-sm text-white">{msg.name}</span>
                <span className="text-xs font-mono text-studio-gold ml-3">{msg.phone}</span>
                {msg.email && <span className="text-xs text-gray-400 ml-2 font-mono">({msg.email})</span>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-gray-500">{msg.createdAt}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    msg.status === 'unread'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-800'
                      : 'bg-black text-gray-400 border border-gray-700'
                  }`}
                >
                  {msg.status}
                </span>
              </div>
            </div>

            <div className="font-semibold text-xs text-studio-gold mb-1.5">{msg.subject}</div>
            <p className="text-xs text-gray-300 leading-relaxed mb-4">{msg.message}</p>

            <div className="flex items-center justify-between pt-3 border-t border-studio-border/40 text-xs">
              <a
                href={`tel:${msg.phone.replace(/[^0-9+]/g, '')}`}
                className="text-studio-gold font-bold hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer Back</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(msg.id)}
                  className="px-3 py-1 bg-black border border-studio-border hover:border-gray-500 text-gray-300 text-xs rounded-lg"
                >
                  Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-black"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
