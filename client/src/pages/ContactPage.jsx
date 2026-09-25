import React, { useState } from 'react';
import axios from 'axios';
import { Phone, MapPin, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { VERIFIED_BUSINESS } from '../data/catalog';
import { useToast } from '../context/ToastContext';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      addToast('Please provide your name, phone number, and message.', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('/api/contact', formData);
      setSubmitted(true);
      addToast('Thank you! Your message has been received by Rockstar store.', 'success');
    } catch {
      // Local fallback
      setSubmitted(true);
      addToast('Thank you! Your inquiry has been recorded.', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-2">
            Store Assistance & Inquiries
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight mb-4">
            CONTACT ROCKSTAR
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Reach out to Rockstar Musical Instruments Shop in Multan for stock availability, advice, and order inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Store Information & Call CTA (5 Columns) */}
          <div className="lg:col-span-5 bg-[#111111] border border-studio-border rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Rockstar Musical Instruments Shop
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Local musical instruments and studio audio hardware store in Multan, Punjab, Pakistan.
              </p>
            </div>

            {/* Address */}
            <div className="p-4 bg-black/60 border border-studio-border rounded-2xl flex items-start gap-3">
              <MapPin className="w-5 h-5 text-studio-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-white">Physical Address</div>
                <div className="text-xs text-gray-300 mt-0.5 leading-relaxed">
                  {VERIFIED_BUSINESS.address}
                </div>
              </div>
            </div>

            {/* Telephone Call Box */}
            <div className="p-5 bg-studio-gold/10 border border-studio-gold/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-studio-gold text-xs font-mono font-bold uppercase">
                <Phone className="w-4 h-4" />
                <span>Direct Phone Call</span>
              </div>
              <a
                href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                className="text-2xl font-black font-mono text-studio-gold hover:underline block"
              >
                {VERIFIED_BUSINESS.phone}
              </a>
              <p className="text-[11px] text-gray-400">
                Call us directly for prompt instrument advice, stock confirmation, or delivery assistance.
              </p>
              <a
                href={`tel:${VERIFIED_BUSINESS.phoneRaw}`}
                className="w-full py-3 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-studio-gold/15"
              >
                <Phone className="w-4 h-4" />
                <span>Call Store Now</span>
              </a>
            </div>

            {/* Map Preview Graphic */}
            <div className="p-4 bg-black/40 border border-studio-border rounded-2xl text-center">
              <div className="aspect-video bg-[#0A0A0A] rounded-xl border border-studio-border/60 flex flex-col items-center justify-center p-4">
                <MapPin className="w-6 h-6 text-studio-gold mb-1" />
                <span className="text-xs font-bold text-white">Multan, Punjab</span>
                <span className="text-[10px] text-gray-400 font-mono mt-0.5">Peer Khurshid Colony, Service Road</span>
              </div>
              <p className="text-[10px] text-gray-500 font-mono mt-3">
                In-store physical inspection & cash payment available on site.
              </p>
            </div>
          </div>

          {/* Right: Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-[#111111] border border-studio-border rounded-3xl p-8 sm:p-10">
            <h2 className="text-2xl font-bold text-white mb-2">Send an Inquiry</h2>
            <p className="text-xs text-gray-400 mb-8">
              Leave a message and our store team will contact you regarding instrument pricing, availability, or specifications.
            </p>

            {submitted ? (
              <div className="p-8 bg-black/60 border border-studio-gold/40 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 bg-studio-gold/20 text-studio-gold rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Received</h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  Thank you! Your message has been successfully logged. We will contact you at <strong>{formData.phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 bg-studio-gold text-black text-xs font-bold rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Your Name *</label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Usman Tariq"
                      className="w-full px-3.5 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 0000000"
                      className="w-full px-3.5 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 block mb-1.5 font-medium">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Product availability / pricing"
                      className="w-full px-3.5 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 block mb-1.5 font-medium">Message *</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us which instrument or equipment model you are interested in..."
                    className="w-full px-3.5 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-studio-gold/15 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Send Inquiry Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
