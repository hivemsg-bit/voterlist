
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Database, 
  Search, 
  ChevronRight, 
  Cpu, 
  ShieldCheck, 
  Activity,
  Phone,
  Filter,
  Download,
  Terminal,
  ArrowUpRight,
  Sparkles,
  ArrowLeft,
  X,
  Mail,
  User,
  MessageSquare,
  Zap,
  Tag,
  FileText,
  Table,
  Globe,
  Lock,
  Smartphone,
  Eye,
  Trash2,
  LogIn,
  LogOut,
  Calendar
} from 'lucide-react';
import { INDIAN_STATES, APP_NAME, CONTACT_WHATSAPP } from './constants.ts';
import { StateData, ViewState, AssemblyConstituency, Enquiry } from './types.ts';
import { getPoliticalInsight } from './services/geminiService.ts';

// --- Components ---

const Badge = ({ children, color = 'blue' }: { children?: React.ReactNode, color?: 'blue'|'gold'|'green'|'red'|'cyan' }) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gold: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  };
  
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${colors[color]} uppercase tracking-wider`}>
      {children}
    </span>
  );
};

const EnquiryModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  if (!isOpen) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiry: Enquiry = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date().toLocaleString()
    };

    const existing = JSON.parse(localStorage.getItem('enquiries') || '[]');
    localStorage.setItem('enquiries', JSON.stringify([newEnquiry, ...existing]));

    alert('Enquiry Sent! AI Core has logged your request. Our agent will contact you shortly.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-300">
        <div className="bg-brand-blue/10 p-6 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Zap className="text-brand-cyan w-5 h-5 animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-tight">Quick Data Enquiry</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" 
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="Email Address" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" 
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input 
                type="tel" 
                placeholder="WhatsApp Number" 
                required 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" 
              />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <textarea 
                placeholder="Tell us which state/AC you need..." 
                rows={3} 
                required 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" 
              />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-brand-blue hover:bg-blue-600 text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-blue-900/30 transform hover:scale-[1.02]">
            Submit AI Enquiry Request
          </button>
          
          <p className="text-[10px] text-center text-slate-500 font-mono uppercase tracking-widest">
            Verified response within 15 minutes
          </p>
        </form>
      </div>
    </div>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@admin.com' && password === 'admin112233') {
      onLogin();
      onClose();
    } else {
      alert('Invalid Credentials. System Access Denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
      <div className="glass-panel w-full max-w-sm rounded-2xl overflow-hidden border border-brand-cyan/20">
        <div className="p-8 text-center border-b border-white/5 bg-brand-blue/5">
          <Lock className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white tracking-tighter">ADMIN TERMINAL</h2>
          <p className="text-xs text-slate-500 font-mono uppercase mt-1">Authorized Personnel Only</p>
        </div>
        <form className="p-8 space-y-4" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Admin Email" 
            required 
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-3 px-4 text-white focus:border-brand-cyan outline-none font-mono text-sm" 
          />
          <input 
            type="password" 
            placeholder="Access Password" 
            required 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg py-3 px-4 text-white focus:border-brand-cyan outline-none font-mono text-sm" 
          />
          <button type="submit" className="w-full bg-brand-cyan text-slate-950 py-3 rounded-lg font-bold hover:bg-white transition-all">
            Unlock Terminal
          </button>
          <button type="button" onClick={onClose} className="w-full text-slate-500 text-xs font-mono uppercase hover:text-white transition-colors">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ setView }: { setView: (v: ViewState) => void }) => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('enquiries') || '[]');
    setEnquiries(data);
  }, []);

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter(e => e.id !== id);
    setEnquiries(updated);
    localStorage.setItem('enquiries', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-[1400px] mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tighter flex items-center gap-3">
            <Cpu className="text-brand-cyan w-8 h-8" /> ENQUIRY DASHBOARD
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase mt-1">Real-time Lead Management System</p>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setView('HOME')} className="bg-slate-900 text-white px-6 py-2 rounded-lg border border-white/10 font-bold text-sm">
             Exit Admin
           </button>
        </div>
      </div>

      <div className="grid gap-4">
        {enquiries.length === 0 ? (
          <div className="glass-panel p-20 text-center rounded-2xl border-dashed border-2 border-slate-800">
            <Activity className="w-12 h-12 text-slate-700 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-500 font-mono">NO ACTIVE ENQUIRIES FOUND IN DATABASE</p>
          </div>
        ) : (
          enquiries.map((enq) => (
            <div key={enq.id} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-cyan/30 transition-all group">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                      <User className="text-brand-blue w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{enq.name}</h3>
                      <div className="flex gap-3 text-[10px] font-mono text-slate-500 uppercase">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {enq.email}</span>
                        <span className="flex items-center gap-1 text-brand-success"><Smartphone className="w-3 h-3" /> {enq.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                    <p className="text-sm text-slate-300 italic">"{enq.message}"</p>
                  </div>
                </div>
                
                <div className="md:text-right flex flex-col justify-between items-end gap-4">
                  <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> {enq.timestamp}
                  </div>
                  <button 
                    onClick={() => deleteEnquiry(enq.id)}
                    className="p-3 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const Header = ({ setView, onOpenEnquiry, isAdmin }: { setView: (v: ViewState) => void, onOpenEnquiry: () => void, isAdmin: boolean }) => (
  <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center h-16">
        <div 
          className="flex items-center cursor-pointer gap-3" 
          onClick={() => { setView('HOME'); window.scrollTo(0,0); }}
        >
          <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center glow-shadow">
            <Terminal className="text-white w-5 h-5" />
          </div>
          <div className="leading-none">
            <h1 className="text-lg font-bold text-white tracking-tight">{APP_NAME}</h1>
            <p className="text-[10px] text-brand-cyan font-mono">AI DATA CORE v4.1</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          {isAdmin && (
            <button 
              onClick={() => setView('ADMIN')}
              className="hidden md:flex items-center gap-2 text-brand-cyan hover:text-white transition-colors text-sm font-bold mr-4"
            >
              <Lock className="w-4 h-4" /> Admin Panel
            </button>
          )}
          <button 
            onClick={onOpenEnquiry}
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium mr-4"
          >
            Bulk Enquiry
          </button>
          <a 
            href={`https://wa.me/${CONTACT_WHATSAPP}`}
            className="flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-900/20"
          >
            <Phone className="w-3 h-3" /> Get Wholesale Data
          </a>
        </nav>
      </div>
    </div>
  </header>
);

const AIInsightPanel = ({ target, type }: { target: string, type: 'STATE' | 'AC' }) => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await getPoliticalInsight(target, type);
    setInsight(text);
    setLoading(false);
  };

  return (
    <div className="mb-8 border border-brand-blue/30 bg-brand-blue/5 rounded-lg p-6 relative overflow-hidden shadow-2xl shadow-blue-900/10">
      <div className="absolute top-0 left-0 w-1 h-full bg-brand-cyan animate-pulse"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-bold text-brand-cyan font-mono uppercase tracking-tighter">Live Demographic Scanner</h3>
        </div>
        {!insight && !loading && (
          <button 
            onClick={handleGenerate}
            className="text-xs bg-brand-blue/20 hover:bg-brand-blue/40 text-brand-blue px-4 py-2 rounded border border-brand-blue/30 transition-all flex items-center gap-2 font-mono uppercase"
          >
            Run AI Scan <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
          <Activity className="w-4 h-4 animate-spin text-brand-cyan" />
          Scanning electoral rolls for {target}...
        </div>
      )}

      {insight && (
        <p className="text-slate-300 text-sm leading-relaxed font-light pl-4 border-l border-brand-blue/30">
          {insight}
        </p>
      )}
    </div>
  );
};

const DocumentPreview = ({ type }: { type: 'PDF' | 'EXCEL' }) => (
  <div className="relative w-full aspect-[4/5] bg-slate-900 rounded-lg border border-white/10 overflow-hidden shadow-2xl group">
    <div className="ai-scan-line"></div>
    <div className={`${type === 'PDF' ? 'bg-red-600' : 'bg-emerald-600'} h-8 w-full flex items-center px-3 justify-between`}>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
      </div>
      <span className="text-[8px] font-bold text-white uppercase tracking-widest">{type} PREVIEW</span>
    </div>
    <div className="p-4 space-y-3">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="flex gap-2">
          <div className="h-2 w-4 bg-slate-800 rounded"></div>
          <div className="h-2 flex-1 bg-slate-800 rounded"></div>
          <div className="h-2 w-8 bg-slate-800 rounded"></div>
        </div>
      ))}
      <div className="pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <Activity className={`w-3 h-3 ${type === 'PDF' ? 'text-red-400' : 'text-emerald-400'} animate-pulse`} />
          <div className="h-1.5 w-20 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
      {type === 'PDF' ? <FileText className="w-16 h-16 text-red-500" /> : <Table className="w-16 h-16 text-emerald-500" />}
    </div>
    <div className="absolute bottom-4 left-0 w-full px-4">
      <div className="bg-slate-950/80 backdrop-blur border border-white/5 p-2 rounded flex items-center justify-between">
         <span className="text-[10px] font-bold text-white">{type === 'PDF' ? 'Voter List PDF' : 'Election Excel'}</span>
         <Badge color={type === 'PDF' ? 'red' : 'green'}>AI Verified</Badge>
      </div>
    </div>
  </div>
);

const Hero = ({ onStart, onOpenEnquiry }: { onStart: () => void, onOpenEnquiry: () => void }) => (
  <div className="relative pt-32 pb-20 px-4 max-w-[1400px] mx-auto text-center overflow-hidden">
    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

    <div className="relative z-10">
      <div className="inline-block mb-6 animate-float">
        <Badge color="green">Database Status: 2025 SIR LIVE</Badge>
      </div>
      <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter">
        The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Campaign Intelligence</span>
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Buy <span className="text-white font-bold">AC+ Voterlist in Excel</span>. 
        Highly-accurate demographic data for strategic campaigning. 
        Verified and formatted for instant use.
      </p>

      <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto mb-16 items-center justify-center px-4">
        <div className="w-full max-w-[280px] transform hover:scale-105 transition-all rotate-[-3deg]">
          <DocumentPreview type="PDF" />
        </div>
        <div className="hidden md:flex flex-col items-center gap-2">
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-brand-cyan to-transparent"></div>
          <Sparkles className="w-6 h-6 text-brand-cyan animate-pulse" />
          <div className="h-16 w-px bg-gradient-to-b from-brand-cyan via-brand-cyan to-transparent"></div>
        </div>
        <div className="w-full max-w-[280px] transform hover:scale-105 transition-all rotate-[3deg]">
          <DocumentPreview type="EXCEL" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={onStart}
          className="bg-brand-blue hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 transform hover:scale-105 shadow-xl shadow-blue-600/20"
        >
          Browse Database <ChevronRight className="w-5 h-5" />
        </button>
        <button 
          onClick={onOpenEnquiry}
          className="bg-slate-900 border border-slate-700 hover:border-brand-cyan text-slate-300 hover:text-white px-10 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          Enquiry Now <Mail className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

const StateGrid = ({ onSelect }: { onSelect: (s: StateData) => void }) => (
  <section id="database" className="py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    <div className="max-w-[1400px] mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 text-center md:text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <Globe className="text-brand-cyan w-5 h-5 animate-pulse" />
            <span className="text-brand-cyan font-mono text-xs uppercase tracking-[0.2em]">National Repository</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Electoral Core Matrix</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest max-w-xl">Select a jurisdiction to initialize Assembly Constituency (AC) data extraction protocols.</p>
        </div>
        <div className="mt-6 md:mt-0">
          <Badge color="cyan">Active Nodes: {INDIAN_STATES.length}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {INDIAN_STATES.map((state) => (
          <div 
            key={state.id}
            onClick={() => onSelect(state)}
            className="group cursor-pointer bg-slate-900/40 border border-slate-800 p-6 rounded-2xl transition-all duration-300 ease-out hover:bg-slate-850 hover:border-brand-blue hover:scale-[1.05] hover:shadow-2xl hover:shadow-brand-blue/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-blue/[0.03] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute w-full h-[2px] bg-brand-cyan/30 animate-scan"></div>
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 text-brand-blue group-hover:text-white font-black text-xl">
                {state.code}
              </div>
              <div className="p-2 rounded-lg bg-slate-900/50 group-hover:bg-brand-cyan/10 transition-colors">
                <Activity className="w-4 h-4 text-slate-700 group-hover:text-brand-cyan animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-white text-base font-bold truncate group-hover:text-brand-cyan transition-colors mb-2">{state.name}</h3>
            
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter group-hover:text-slate-300 transition-colors">
                {state.totalSeats} AC Nodes
              </span>
              <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DataView = ({ state, onBack, onOpenEnquiry }: { state: StateData; onBack: () => void, onOpenEnquiry: () => void }) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return state.acs.filter(ac => 
      ac.name.toLowerCase().includes(search.toLowerCase()) || 
      ac.number.toString().includes(search)
    ).sort((a,b) => a.number - b.number);
  }, [state.acs, search]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-[1400px] mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-brand-blue text-xs font-mono font-bold mb-8 hover:text-brand-cyan transition-colors uppercase tracking-widest">
        <ArrowLeft className="w-3 h-3" /> Back to States List
      </button>

      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
        <div>
          <Badge color="blue">{state.name} State Directory</Badge>
          <h1 className="text-4xl font-bold text-white mt-4 tracking-tight">Electoral Core Data</h1>
          <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-tighter">Verified 2025 SIR • AI Scan Optimized</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input 
              type="text" 
              placeholder={`Search ${state.name} ACs...`} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-brand-blue transition-all font-mono"
            />
          </div>
          <button onClick={onOpenEnquiry} className="w-full md:w-auto bg-slate-900 border border-brand-cyan/30 text-brand-cyan text-sm font-bold px-6 py-3 rounded-full hover:bg-brand-cyan/10 transition-all">
            Bulk Pricing Enquiry
          </button>
        </div>
      </div>

      <AIInsightPanel target={state.name} type="STATE" />

      <div className="space-y-2 bg-slate-900/20 rounded-lg overflow-hidden border border-white/5">
        {filteredData.map((ac) => (
          <div key={ac.id} className="group md:grid md:grid-cols-12 gap-4 px-8 py-5 border-b border-white/5 items-center hover:bg-brand-blue/[0.05] transition-colors relative overflow-hidden">
            <div className="hidden md:block col-span-1 font-mono text-slate-500 group-hover:text-brand-blue font-bold">#{ac.number}</div>
            <div className="col-span-12 md:col-span-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center border border-white/5 shrink-0 group-hover:bg-slate-700 transition-colors">
                <Table className="w-5 h-5 text-brand-success" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">{ac.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                   <Badge color="gold">AC #{ac.number}</Badge>
                   <span className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">Verified Excel Source</span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4">
               <div className="flex items-center gap-2 mb-1">
                 <Tag className="w-3 h-3 text-brand-gold" />
                 <span className="text-brand-gold font-bold font-mono text-lg">₹{ac.price.toLocaleString()}</span>
               </div>
               <div className="text-brand-success text-[10px] font-bold font-mono uppercase tracking-tighter animate-pulse">
                 AC+ voterlist in excel
               </div>
               <p className="text-[9px] text-slate-500 font-mono mt-1 uppercase">Price Range: ₹4,000 - ₹5,000</p>
            </div>
            <div className="col-span-12 md:col-span-3 flex justify-end mt-4 md:mt-0">
               <a 
                 href={`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy AC+ voterlist in excel for AC: ${ac.name} (AC ${ac.number}) of ${state.name}. Price mentioned: ₹${ac.price}.`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full md:w-auto bg-brand-blue hover:bg-blue-600 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-blue/40 transform hover:scale-105"
               >
                 <Download className="w-4 h-4" /> Download Sheet
               </a>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
         <div className="py-24 text-center text-slate-500 font-mono italic bg-slate-900/10 rounded-xl border border-dashed border-slate-800">
           SYSTEM ALERT: NO CONSTITUENCY FOUND MATCHING "{search.toUpperCase()}"
         </div>
      )}
    </div>
  );
};

const Footer = ({ onOpenEnquiry, onOpenLogin, setView, isLoggedIn }: { onOpenEnquiry: () => void, onOpenLogin: () => void, setView: (v: ViewState) => void, isLoggedIn: boolean }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setView('HOME'); window.scrollTo(0,0); }}>
              <div className="w-10 h-10 bg-brand-blue rounded flex items-center justify-center glow-shadow">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-none">{APP_NAME}</h3>
                <p className="text-[10px] text-brand-cyan font-mono mt-1">SECURE DATA CORE v4.1</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's premier AI-powered portal to buy <span className="text-white font-semibold">AC+ voterlist in excel</span>. 
              We provide verified election data for every assembly constituency with 99.9% accuracy.
            </p>
            <div className="flex items-center gap-4">
              <a href={`https://wa.me/${CONTACT_WHATSAPP}`} className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:bg-brand-blue hover:text-white transition-all">
                <Smartphone className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${CONTACT_WHATSAPP}`} className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:bg-brand-blue hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-cyan" /> Data Services
            </h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> AC Voter Lists (Excel)
              </li>
              <li className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Booth Analytics (PDF)
              </li>
              <li className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Demographic Reports
              </li>
              <li className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Caste Matrix Data
              </li>
              <li className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-2">
                <ChevronRight className="w-3 h-3" /> Bulk Data Packages
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> Instant Support
            </h4>
            <div className="space-y-4">
              <div 
                onClick={onOpenEnquiry}
                className="p-4 rounded-xl bg-slate-900/50 border border-white/5 hover:border-brand-blue transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Pricing Inquiry</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-brand-blue" />
                </div>
                <p className="text-white font-bold">₹4,000 - ₹5,000 / AC</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase">Instant Quote via AI Agent</p>
              </div>
              <a 
                href={`https://wa.me/${CONTACT_WHATSAPP}`}
                className="block p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/30 hover:bg-brand-blue/20 transition-all text-center"
              >
                <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">Connect on WhatsApp</span>
                <p className="text-white font-bold mt-1">Talk to Expert</p>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-cyan" /> System Monitor
            </h4>
            <div className="glass-panel p-4 rounded-xl space-y-3 font-mono">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500">DATABASE INTEGRITY</span>
                <span className="text-brand-success">100% OK</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500">ECI SYNC STATUS</span>
                <span className="text-brand-cyan uppercase animate-pulse">Live Tracking</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500">UPTIME</span>
                <span className="text-slate-300">99.98%</span>
              </div>
              <div className="h-px bg-white/5"></div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500">
                <Globe className="w-3 h-3" /> 
                ENCRYPTED TRANSFERS ENABLED
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Delivery</span>
            <span className="hover:text-white transition-colors cursor-pointer">Data Compliance</span>
            <span 
              onClick={isLoggedIn ? () => setView('ADMIN') : onOpenLogin}
              className="hover:text-brand-cyan transition-colors cursor-pointer flex items-center gap-1"
            >
              <LogIn className="w-3 h-3" /> {isLoggedIn ? 'Admin Dash' : 'Admin Login'}
            </span>
          </div>
          <div className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.3em]">
            © 2025 {APP_NAME.toUpperCase()} • DESIGNED BY AI ARCHITECTS
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [viewState, setViewState] = useState<ViewState>('HOME');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleStateSelect = (state: StateData) => {
    setSelectedState(state);
    setViewState('STATE_VIEW');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogin = () => {
    setIsLoggedIn(true);
    setViewState('ADMIN');
  };

  return (
    <div className="min-h-screen bg-slate-950 grid-bg selection:bg-brand-blue selection:text-white flex flex-col">
      <Header 
        setView={setViewState} 
        onOpenEnquiry={() => setIsEnquiryOpen(true)} 
        isAdmin={isLoggedIn}
      />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleAdminLogin}
      />
      <main className="flex-grow">
        {viewState === 'HOME' ? (
          <>
            <Hero 
              onStart={() => document.getElementById('database')?.scrollIntoView({ behavior: 'smooth' })} 
              onOpenEnquiry={() => setIsEnquiryOpen(true)} 
            />
            <StateGrid onSelect={handleStateSelect} />
          </>
        ) : viewState === 'ADMIN' ? (
          <AdminDashboard setView={setViewState} />
        ) : selectedState ? (
          <DataView 
            state={selectedState} 
            onBack={() => setViewState('HOME')} 
            onOpenEnquiry={() => setIsEnquiryOpen(true)} 
          />
        ) : null}
      </main>
      <Footer 
        onOpenEnquiry={() => setIsEnquiryOpen(true)} 
        onOpenLogin={() => setIsLoginOpen(true)}
        setView={setViewState} 
        isLoggedIn={isLoggedIn}
      />
      {viewState !== 'ADMIN' && (
        <button 
          onClick={() => setIsEnquiryOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-brand-cyan text-slate-950 p-4 rounded-full shadow-2xl md:hidden animate-bounce glow-shadow"
        >
          <Mail className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default App;
