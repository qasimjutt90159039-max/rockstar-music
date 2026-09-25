import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How does Cash on Delivery (COD) work?',
    a: 'When you place an order with Cash on Delivery, our store verifies instrument availability and contacts you to confirm shipment. You pay the exact order amount in cash directly to the courier upon delivery at your doorstep.'
  },
  {
    q: 'Are catalog prices fixed or subject to verification?',
    a: 'During our current platform pre-launch phase, all displayed prices carry the "DEMO DATA — VERIFY BEFORE LAUNCH" notice. They reflect standard market reference for genuine gear and are confirmed with our Multan store before final dispatch.'
  },
  {
    q: 'Can I visit the store in Multan to test an instrument before buying?',
    a: 'Yes, customers in Multan and surrounding Punjab districts are welcome to visit our physical store on Service Road, Peer Khurshid Colony, Chah Usman Wala to inspect and test instruments in person.'
  },
  {
    q: 'How are fragile musical instruments packed for nationwide delivery?',
    a: 'Every guitar, keyboard, and microphone is packaged using high-density shock-absorbing bubble wrap, neck supports, and reinforced exterior carton walls to prevent any physical or transit damage.'
  },
  {
    q: 'What should I do if an instrument arrives damaged?',
    a: 'Please inspect your parcel immediately upon arrival with the delivery courier. If any physical defect or transit damage is detected, contact our direct phone number (+92 300 6303618) within 48 hours for swift resolution.'
  },
  {
    q: 'Do you provide guitar tuning or initial setup?',
    a: 'All guitars and instruments undergo basic inspection at our store prior to shipment to ensure straight necks, functional electronics, and proper hardware assembly.'
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <div className="bg-[#000000] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-studio-border text-studio-gold text-xs font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Store Help & Answers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-sm text-gray-400">
            Common questions regarding orders, Cash on Delivery, and physical store visits in Multan.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-[#111111] border border-studio-border rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-studio-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-studio-gold flex-shrink-0 transition-transform duration-200 ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-xs text-gray-300 leading-relaxed border-t border-studio-border/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
