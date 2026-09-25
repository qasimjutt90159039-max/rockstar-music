import React, { useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../../data/catalog';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    businessName: VERIFIED_BUSINESS.name,
    tagline: VERIFIED_BUSINESS.tagline,
    category: VERIFIED_BUSINESS.category,
    phone: VERIFIED_BUSINESS.phone,
    address: VERIFIED_BUSINESS.address,
    city: VERIFIED_BUSINESS.city,
    country: VERIFIED_BUSINESS.country,
    priceNotice: VERIFIED_BUSINESS.priceNotice,
    deliveryPolicy: 'We deliver across Multan and nationwide throughout Pakistan via trusted courier partners. Cash on Delivery is available for all eligible orders. Store verification is conducted before order dispatch.',
    returnPolicy: 'Items can be inspected upon delivery. Damaged or defective instruments must be reported within 48 hours with order reference and proof of purchase.'
  });

  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Store configuration saved successfully.', 'success');
  };

  return (
    <div className="p-6 sm:p-10 space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Store Configuration
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            BUSINESS SETTINGS
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Strictly verified business identity and policies for Rockstar Musical Instruments Shop.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-[#111111] border border-studio-border rounded-3xl p-6 sm:p-10 space-y-6 text-xs">
        <div>
          <h3 className="text-base font-bold text-white mb-1">Store Information</h3>
          <p className="text-gray-400">Do not invent missing information. Only verified details may be edited.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 block mb-1 font-medium">Business Name</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-bold"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1 font-medium">Direct Telephone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 block mb-1 font-medium">Physical Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 block mb-1 font-medium">City</label>
            <input
              type="text"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white"
            />
          </div>
          <div>
            <label className="text-gray-300 block mb-1 font-medium">Country</label>
            <input
              type="text"
              value={settings.country}
              onChange={(e) => setSettings({ ...settings, country: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-gray-300 block mb-1 font-medium">Mandatory Pricing Disclaimer</label>
          <input
            type="text"
            value={settings.priceNotice}
            onChange={(e) => setSettings({ ...settings, priceNotice: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-studio-gold font-mono"
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-studio-border">
          <div>
            <label className="text-gray-300 block mb-1 font-medium">Delivery Policy Summary</label>
            <textarea
              rows={2}
              value={settings.deliveryPolicy}
              onChange={(e) => setSettings({ ...settings, deliveryPolicy: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white leading-relaxed"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-1 font-medium">Return Policy Summary</label>
            <textarea
              rows={2}
              value={settings.returnPolicy}
              onChange={(e) => setSettings({ ...settings, returnPolicy: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-studio-border rounded-xl text-white leading-relaxed"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-studio-gold hover:bg-studio-goldHover text-black font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-studio-gold/15"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
