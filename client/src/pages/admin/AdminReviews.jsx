import React, { useState } from 'react';
import { Star, Check, X, Trash2, MessageSquare } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const INITIAL_REVIEWS = [
  {
    id: 'r1',
    productName: 'Yamaha F310 Acoustic Guitar',
    userName: 'Hamza Khan',
    rating: 5,
    title: 'Outstanding tone and action right out of the box',
    comment: 'Collected from the Multan shop. The spruce top provides great projection and the neck is very comfortable.',
    isApproved: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'r2',
    productName: 'Shure SM58 Cardioid Dynamic Vocal Microphone',
    userName: 'Bilal Ahmed',
    rating: 5,
    title: 'Legendary quality for live performance',
    comment: 'Authentic Shure dynamic mic. Zero handling noise and incredible feedback resistance.',
    isApproved: true,
    createdAt: '2026-09-08'
  },
  {
    id: 'r3',
    productName: 'Behringer U-Phoria UM2 USB Audio Interface',
    userName: 'Zainab Fatima',
    rating: 4,
    title: 'Clean XENYX preamp for home studio',
    comment: 'Connecting to my PC was seamless. Very low latency for recording acoustic guitar and vocals.',
    isApproved: false,
    createdAt: '2026-09-18'
  }
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const { addToast } = useToast();

  const handleToggleApprove = (id) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: !r.isApproved } : r))
    );
    addToast('Review moderation status updated.', 'info');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      addToast('Review deleted.', 'info');
    }
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-studio-border gap-4">
        <div>
          <div className="text-xs font-mono text-studio-gold uppercase tracking-wider mb-1">
            Customer Feedback Moderation
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">
            REVIEWS QUEUE ({reviews.length})
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Verified buyer reviews submitted by genuine customers who purchased from Rockstar.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-[#111111] border border-studio-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-studio-gold">
                  {rev.productName}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-white font-semibold">{rev.userName}</span>
                <span className="text-[10px] font-mono text-gray-500">{rev.createdAt}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-studio-gold">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                {rev.title && <span className="text-xs font-bold text-white">{rev.title}</span>}
              </div>

              <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">{rev.comment}</p>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button
                onClick={() => handleToggleApprove(rev.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  rev.isApproved
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-studio-gold text-black font-extrabold'
                }`}
              >
                {rev.isApproved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{rev.isApproved ? 'Approved' : 'Approve Review'}</span>
              </button>

              <button
                onClick={() => handleDelete(rev.id)}
                className="p-2 text-gray-500 hover:text-red-400 rounded-xl hover:bg-black transition-colors"
                title="Delete review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;
