'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  LogOut, User, Mail, Phone, MapPin, Package, 
  Settings, CreditCard, Edit, Plus, Trash2, 
  ChevronRight, Calendar, Box, ShieldCheck, 
  Menu, X, Bell, ExternalLink, ArrowRight,
  Lock, AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { apiFetch } from '@/lib/api';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout, updateProfile } = useAuthStore();
  
  // 1. ADD STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    if (user) {
      setEditData({ 
        name: user.name, 
        phone: user.phone || '', 
        address: user.address || '' 
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(editData);
      setShowEditModal(false);
      setShowAddressModal(false);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-blue-500/20 rounded-full" />
          <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin absolute inset-0" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-deep-navy text-white selection:bg-blue-500/30 font-sans">
      <Navbar />
      
      <main className="flex-1 pt-24 md:pt-32 pb-12 flex relative overflow-hidden">
        {/* Anti-Gravity Glow Assets */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 relative z-10">
          
          {/* Mobile Sidebar Toggle - Premium Glass */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden flex items-center justify-between p-4 glass mb-4 w-full group active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                {activeTab === 'profile' && <User size={20} />}
                {activeTab === 'orders' && <Package size={20} />}
                {activeTab === 'address' && <MapPin size={20} />}
                {activeTab === 'settings' && <Settings size={20} />}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">{activeTab}</span>
            </div>
            {isSidebarOpen ? <X size={20} className="text-slate-500" /> : <Menu size={20} className="text-slate-500" />}
          </button>

          {/* 2. SIDEBAR FUNCTIONALITY */}
          <aside className={`
            fixed md:relative inset-y-0 left-0 z-50 w-[280px] md:w-[260px] 
            transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full md:translate-x-0 opacity-0 md:opacity-100'}
            md:block
          `}>
            <div className="h-full md:h-auto glass p-5 md:sticky md:top-32 space-y-2 flex flex-col shadow-2xl animate-float">
              <div className="px-4 py-4 mb-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Dashboard</p>
              </div>
              
              <SidebarItem 
                icon={<User size={18} />} 
                label="Profile" 
                active={activeTab === 'profile'} 
                onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<Package size={18} />} 
                label="Orders" 
                active={activeTab === 'orders'} 
                onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<MapPin size={18} />} 
                label="Address" 
                active={activeTab === 'address'} 
                onClick={() => { setActiveTab('address'); setIsSidebarOpen(false); }} 
              />
              <SidebarItem 
                icon={<Settings size={18} />} 
                label="Settings" 
                active={activeTab === 'settings'} 
                onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} 
              />

              <div className="pt-6 border-t border-white/5 mt-auto md:mt-8">
                {/* 5. SIGN OUT BUTTON */}
                <button 
                  onClick={() => { 
                    console.log("Signing out...");
                    logout();
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300 group cursor-pointer active:scale-95"
                >
                  <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-red-500/20 transition-colors">
                    <LogOut size={16} />
                  </div>
                  <span className="font-bold text-xs uppercase tracking-wider">Sign Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-deep-navy/80 backdrop-blur-md z-40 md:hidden cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* 3. DYNAMIC CONTENT SWITCHING */}
          <div className="flex-1 min-w-0">
            <div className="animate-fade-in-up transition-all duration-500">
              {activeTab === "profile" && <ProfileSection user={user} onEdit={() => setShowEditModal(true)} onReview={() => setActiveTab("settings")} />}
              {activeTab === "orders" && <OrdersSection />}
              {activeTab === "address" && <AddressSection user={user} onEdit={() => setShowAddressModal(true)} />}
              {activeTab === "settings" && <SettingsSection />}
            </div>
          </div>
        </div>
      </main>

      {/* 4. EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer" onClick={() => setShowEditModal(false)} />
          <div className="glass p-8 max-w-md w-full relative z-10 animate-fade-in-up border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase tracking-tight">Edit Account</h3>
              <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer active:scale-90">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleUpdateProfile}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Full Name</label>
                <input 
                  type="text" 
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Phone Number</label>
                <input 
                  type="tel" 
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="h-px bg-white/10 w-full" />
              
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowEditModal(false)} disabled={isUpdating} className="cursor-pointer active:scale-95">Cancel</Button>
                <Button type="submit" disabled={isUpdating} className="bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer" onClick={() => setShowAddressModal(false)} />
          <div className="glass p-8 max-w-md w-full relative z-10 animate-fade-in-up border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase tracking-tight">Logistics Configuration</h3>
              <button onClick={() => setShowAddressModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer active:scale-90">
                <X size={20} />
              </button>
            </div>
            
            <form className="space-y-6" onSubmit={handleUpdateProfile}>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Primary Hub Address</label>
                <textarea 
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[120px] resize-none"
                  placeholder="Enter full deployment address"
                  required
                />
              </div>

              <div className="h-px bg-white/10 w-full" />
              
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowAddressModal(false)} disabled={isUpdating} className="cursor-pointer active:scale-95">Cancel</Button>
                <Button type="submit" disabled={isUpdating} className="bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  {isUpdating ? 'Updating Node...' : 'Update Deployment Hub'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden cursor-pointer active:scale-95
        ${active 
          ? 'text-white' 
          : 'text-slate-500 hover:text-slate-200'}
      `}
    >
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10" />
      )}
      <div className={`
        p-2 rounded-lg transition-all duration-500 relative z-10
        ${active ? 'bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-slate-800/50 group-hover:bg-slate-700'}
      `}>
        {icon}
      </div>
      <span className="font-bold text-xs uppercase tracking-[0.1em] relative z-10">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse relative z-10" />}
    </button>
  );
}

function ProfileSection({ user, onEdit, onReview }: { user: any, onEdit: () => void, onReview: () => void }) {
  return (
    <div className="space-y-8">
      {/* Hero Profile Card */}
      <div className="glass p-8 md:p-10 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700" />
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
          <div className="relative">
            {/* Spinning Gradient Ring */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-tr from-blue-500 via-purple-500 to-cyan-400 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-deep-navy flex items-center justify-center overflow-hidden">
                <User size={80} className="text-blue-500/20" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-full border-4 border-deep-navy shadow-lg">
              <ShieldCheck size={16} className="text-white" />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{user.name}</h2>
              <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                {user.role}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400 group/item">
                <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:text-blue-400 transition-colors"><Mail size={16} /></div>
                <span className="text-sm font-semibold">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center justify-center md:justify-start gap-3 text-slate-400 group/item">
                  <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:text-blue-400 transition-colors"><Phone size={16} /></div>
                  <span className="text-sm font-semibold">{user.phone}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* 4. EDIT BUTTON FIX */}
              <Button 
                onClick={onEdit}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500 h-12 px-8 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 active:scale-95 cursor-pointer"
              >
                <Edit size={14} />
                Edit Account
              </Button>
              <button 
                onClick={() => console.log("Public Profile Viewed")}
                className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors flex items-center gap-2 px-4 h-12 cursor-pointer group/link active:scale-95"
              >
                Public Profile <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightCard 
          icon={<ShieldCheck size={24} />} 
          title="Security Health" 
          subtitle="Your account is protected"
          progress={85}
          color="blue"
          onReview={onReview}
        />
        <InsightCard 
          icon={<CreditCard size={24} />} 
          title="Payment Systems" 
          subtitle="Default: None set"
          progress={0}
          color="purple"
          onReview={onReview}
        />
      </div>
    </div>
  );
}

function InsightCard({ icon, title, subtitle, progress, color, onReview }: any) {
  const colorMap: any = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30 from-blue-500 to-cyan-400',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/30 from-purple-500 to-pink-400',
  };

  return (
    <div className="glass p-6 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group cursor-default">
      <div className="flex items-center gap-5 mb-6">
        <div className={`p-4 rounded-2xl ${colorMap[color].split(' from-')[0]} transition-all duration-500 group-hover:scale-110`}>
          {icon}
        </div>
        <div>
          <h3 className="font-black text-lg tracking-tight text-white uppercase">{title}</h3>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
          <div 
            className={`h-full bg-gradient-to-r ${colorMap[color].split(' border-')[1]} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.3)]`} 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{progress}% Complete</p>
          {/* 5. REVIEW BUTTON FIX */}
          <button 
            onClick={onReview}
            className="text-[10px] font-black text-white hover:text-blue-400 transition-colors uppercase tracking-[0.2em] flex items-center gap-1 cursor-pointer active:scale-95 group/review"
          >
            Review <ArrowRight size={10} className="group-hover/review:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OrdersSection() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ orders: any[] }>('/api/orders/my')
      .then(data => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="glass h-32 animate-pulse border-white/5" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="glass p-20 text-center flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="p-8 rounded-full bg-slate-800/30 border border-white/5 text-slate-700">
          <Box size={64} strokeWidth={1} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter">No orders found</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">You haven't secured any NanoCore packages yet. Our elite security awaits.</p>
        </div>
        <Button 
          onClick={() => {
            console.log("Navigating to products...");
            router.push('/products');
          }} 
          className="h-12 px-10 bg-white text-black hover:bg-blue-500 hover:text-white transition-all font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer active:scale-95"
        >
          Deploy Security
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Order History</h2>
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{orders.length} TOTAL DEPLOYMENTS</span>
      </div>
      
      {orders.map((order) => (
        <div 
          key={order.id} 
          className="glass p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-8 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-center gap-6 flex-1">
            <div className="p-5 rounded-2xl bg-slate-800/50 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all duration-500 transform group-hover:scale-110">
              <Package size={28} />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-black text-white uppercase tracking-[0.2em] text-[11px]">Deployment #{order.id.toString().padStart(6, '0')}</h3>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2 group/meta hover:text-slate-300 transition-colors">
                  <Calendar size={12} className="text-blue-500/50" />
                  {new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </div>
                <div className="flex items-center gap-2 group/meta hover:text-slate-300 transition-colors">
                  <CreditCard size={12} className="text-purple-500/50" />
                  {order.paymentMethod.replace('_', ' ')}
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-white/5">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-slate-400">
                    <span className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">{item.quantity}X</span>
                    <span className="text-slate-300">{item.variant.product.name}</span>
                    <span className="text-slate-500">— {item.variant.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
            <div className="text-left md:text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Assets</p>
              <p className="text-2xl font-black text-white tracking-tighter">₱{order.totalPrice.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => console.log(`Viewing details for order #${order.id}`)}
              className="h-10 px-6 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-blue-500 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2 group/btn cursor-pointer active:scale-95"
            >
              Details <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    'DELIVERED': 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
    'COMPLETED': 'text-green-400 bg-green-500/10 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
    'PENDING': 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.1)]',
    'PROCESSING': 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]',
    'CANCELLED': 'text-red-400 bg-red-500/10 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
  };
  
  const style = config[status.toUpperCase()] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';

  return (
    <span className={`px-3 py-1 rounded-full text-[9px] font-black border uppercase tracking-[0.2em] flex items-center gap-2 ${style}`}>
      <div className={`w-1.5 h-1.5 rounded-full ${style.split(' ')[0].replace('text-', 'bg-')} animate-pulse`} />
      {status}
    </span>
  );
}

function AddressSection({ user, onEdit }: { user: any, onEdit: () => void }) {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Logistics Support</h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Manage your secure shipping nodes</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            console.log("Add Node Clicked");
            onEdit();
          }}
          className="flex items-center gap-3 h-12 px-6 group/add border-white/10 hover:border-blue-500 transition-all active:scale-95 cursor-pointer"
        >
          <Plus size={18} className="text-blue-500 group-hover:rotate-90 transition-transform duration-500" />
          <span className="font-black uppercase tracking-widest text-[10px]">{user.address ? 'Update Node' : 'Add Node'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {user.address ? (
          <div className="glass p-8 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] transition-all duration-500 relative group overflow-hidden border-white/5 hover:border-blue-500/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={24} />
              </div>
              <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={onEdit}
                  className="p-3 rounded-xl bg-white/5 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-all border border-white/10 hover:border-blue-500/50 cursor-pointer active:scale-90"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => {
                    console.log("Delete Hub Clicked");
                    alert("Delete functionality coming soon in production release.");
                  }}
                  className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-white/10 hover:border-red-500/50 cursor-pointer active:scale-90"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 mb-8">
              <h4 className="font-black text-white uppercase tracking-[0.2em] text-xs">Primary Deployment Hub</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">{user.address}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">Default Node</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="col-span-full glass p-20 text-center border-dashed border-white/10 flex flex-col items-center gap-6">
            <div className="p-8 rounded-full bg-slate-800/30 text-slate-700">
              <MapPin size={64} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter">No Hubs Configured</h3>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Configure your shipping destination for rapid deployment of NanoCore assets.</p>
            </div>
            <Button 
              onClick={onEdit}
              className="mt-4 bg-blue-500 hover:bg-blue-600 h-12 px-10 font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer active:scale-95"
            >
              Add First Hub
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsSection() {
  const settings = [
    { id: 'password', icon: <Lock size={20} />, title: 'Authentication Control', desc: 'Update your high-security passphrase', action: 'Modify' },
    { id: 'notifications', icon: <Bell size={20} />, title: 'System Alerts', desc: 'Manage real-time deployment notifications', action: 'Configure', toggle: true },
    { id: 'privacy', icon: <ShieldCheck size={20} />, title: 'Data Encryption', desc: 'Verify end-to-end encryption status', action: 'Audit' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up max-w-3xl">
      <div className="px-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">System Protocols</h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Global account configurations and security</p>
      </div>

      <div className="glass p-2 overflow-hidden shadow-2xl">
        {settings.map((s, idx) => (
          <div 
            key={s.id} 
            className={`
              flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-xl transition-all duration-500 group
              ${idx !== settings.length - 1 ? 'border-b border-white/5' : ''}
              hover:bg-white/5
            `}
          >
            <div className="flex items-center gap-6">
              <div className="p-4 rounded-2xl bg-slate-800/50 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all duration-500 group-hover:scale-110">
                {s.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-white uppercase tracking-[0.1em] text-sm group-hover:text-blue-400 transition-colors">{s.title}</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.desc}</p>
              </div>
            </div>
            
            {s.toggle ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active</span>
                <div 
                  onClick={() => console.log(`${s.title} Toggle Clicked`)}
                  className="w-14 h-7 bg-blue-500 rounded-full relative cursor-pointer border border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] group/toggle active:scale-95 transition-transform"
                >
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-transform" />
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => console.log(`${s.title} Action Triggered`)}
                className="md:w-32 h-11 border-white/10 hover:border-blue-500 hover:text-blue-400 font-black uppercase tracking-widest text-[10px] active:scale-95 cursor-pointer"
              >
                {s.action}
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Danger Zone - Premium Red UI */}
      <div className="glass p-8 md:p-10 border-red-500/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-red-500/[0.02] pointer-events-none" />
        <div className="flex items-start gap-6 relative z-10">
          <div className="p-4 rounded-2xl bg-red-500/10 text-red-500 animate-pulse">
            <AlertCircle size={24} />
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <h4 className="font-black text-red-500 uppercase tracking-[0.2em] text-sm mb-2">Terminal Protocol</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-md font-bold uppercase tracking-wider">
                Initiating account termination is irreversible. All assets, keys, and deployment history will be purged from NanoCore systems.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                console.log("PURGE PROTOCOL INITIATED");
                alert("Critical security confirmation required. Please contact system administrator.");
              }}
              className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500 font-black uppercase tracking-widest text-[10px] h-11 px-8 active:scale-95 cursor-pointer"
            >
              Purge Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
