
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, 
  FileSpreadsheet, ShieldCheck, Activity, Eye, 
  MessageSquare, Send, Database, Target, Lock, Zap
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Global UI Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'green' | 'amber' | 'slate', className?: string }) => {
  const styles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border uppercase tracking-widest ${styles[variant]} inline-flex items-center gap-1 ${className}`}>
      {children}
    </span>
  );
};

const PremiumLogo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
      <Database className="w-4 h-4" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-base font-black tracking-tighter text-white leading-none">
        VOTERLIST<span className="text-blue-500">EXCEL</span>
      </h1>
      <span className="text-[6px] font-bold text-slate-500 uppercase tracking-[0.2em]">High Security Node</span>
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const selectState = (state: StateData) => {
    setActiveState(state);
    setView('STATE_VIEW');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setView('HOME');
    setActiveState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <OrderNotification />
      
      {/* NAVIGATION: COMPACT & DARK */}
      <nav className="fixed top-0 w-full z-[100] glass-nav h-14 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleHome}>
            <PremiumLogo />
          </div>
          <button 
            onClick={() => setView('CONTACT')} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Phone className="w-3 h-3" /> ANALYST DESK
          </button>
        </div>
      </nav>

      <main className="pt-14">
        {view === 'HOME' ? (
          <>
            {/* COMPACT DARK HERO */}
            <section className="px-4 py-10 md:py-16 max-w-7xl mx-auto text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md mb-4">
                <Badge variant="blue" className="animate-pulse">Live Repository</Badge>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">2026-27 Electoral Metadata Synchronized</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase leading-[1.05] text-white">
                Download <span className="text-blue-500">Voter List</span> <br/>
                Metadata In Excel Format
              </h1>
              <p className="text-slate-400 text-xs md:text-base max-w-xl mx-auto font-medium mb-8 leading-relaxed">
                Premium 19-column structured data for <span className="text-blue-400">Punjab 2026</span> and <span className="text-blue-400">West Bengal</span>. Optimized for booth-level micro-targeting.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
                >
                  BROWSE REGISTRY
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 px-8 py-3 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> VIEW SAMPLE
                </button>
              </div>
            </section>

            {/* FEATURED BANNER */}
            <section className="px-4 max-w-7xl mx-auto mb-10">
               <div className="glass-card rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <Badge variant="amber">Strategic Hub</Badge>
                    <h2 className="text-xl md:text-3xl font-black tracking-tight text-white uppercase">Punjab <span className="text-blue-500">2026</span> Active</h2>
                    <p className="text-slate-500 text-[10px] md:text-xs font-medium">All 117 AC segments verified and formatted for the upcoming legislative cycles.</p>
                  </div>
                  <button 
                    onClick={() => { const pb = INDIAN_STATES.find(s => s.code === 'PB'); if (pb) selectState(pb); }}
                    className="bg-blue-600/10 hover:bg-blue-600 border border-blue-600/20 text-blue-400 hover:text-white px-6 py-2.5 rounded-md font-bold uppercase text-[9px] tracking-widest transition-all shrink-0"
                  >
                    ACCESS PUNJAB NODES
                  </button>
               </div>
            </section>

            {/* STATE REGISTRY: TIGHTER CARDS */}
            <section id="states" className="px-4 py-8 max-w-7xl mx-auto">
              <div className="mb-6 flex justify-between items-end border-l-2 border-blue-600 pl-4">
                <div>
                  <h2 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white">Archives Registry</h2>
                  <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">Select region for segment-wise extraction</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {INDIAN_STATES.map((state) => {
                  const isHigh = state.code === 'PB' || state.code === 'WB';
                  return (
                    <div 
                      key={state.id}
                      onClick={() => selectState(state)}
                      className={`p-4 rounded-xl border hover-lift cursor-pointer glass-card ${
                        isHigh ? 'border-blue-500/20 shadow-[inset_0_0_15px_rgba(37,99,235,0.05)]' : 'border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-8 h-8 bg-slate-900 border border-slate-800 text-blue-500 rounded flex items-center justify-center font-black text-xs">
                           {state.code}
                        </div>
                        {isHigh && <Badge variant="green">Live</Badge>}
                      </div>
                      <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-white">{state.name}</h3>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">{state.totalSeats} AC Nodes Available</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <TrustSection />
            <LegalDisclaimer />
          </>
        ) : view === 'STATE_VIEW' && activeState ? (
          <StateView 
            state={activeState} 
            onBack={() => setView('HOME')} 
            onBuy={(ac) => { setSelectedAC(ac); setIsModalOpen(true); }}
          />
        ) : view === 'CONTACT' ? (
          <ContactView onBack={() => setView('HOME')} />
        ) : null}
      </main>

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ac={selectedAC} stateName={activeState?.name} />
      <SamplePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      {/* FOOTER: ULTRA COMPACT */}
      <footer className="mt-8 px-4 py-6 border-t border-slate-900 bg-brand-midnight">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <PremiumLogo />
          <div className="flex gap-6 text-[8px] font-bold text-slate-500 uppercase tracking-widest">
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setView('HOME')}>Home</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setView('CONTACT')}>Support</span>
            <span className="hover:text-blue-500 cursor-pointer">Security Policy</span>
          </div>
          <p className="text-[7px] font-bold text-slate-600 uppercase tracking-widest">© 2025 VOTERLISTEXCEL.IN • DATA REGISTRY</p>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-View: State Level ---

const StateView = ({ state, onBack, onBuy }: { state: StateData, onBack: () => void, onBuy: (ac: AssemblyConstituency) => void }) => {
  const [search, setSearch] = useState("");
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => 
    state.acs.filter(ac => ac.name.toLowerCase().includes(search.toLowerCase()) || ac.number.toString().includes(search)),
    [state.acs, search]
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const text = await getPoliticalInsight(state.name, 'STATE');
      setInsight(text);
      setLoading(false);
    };
    load();
  }, [state.name]);

  return (
    <div className="max-w-7xl mx-auto px-4 animate-fade-in pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 text-[9px] font-black uppercase tracking-widest mb-6">
        <ArrowLeft className="w-3 h-3" /> EXIT TO ARCHIVES
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
        <div className="space-y-1">
          <Badge variant="blue">Registry Active</Badge>
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white">{state.name}</h2>
          <p className="text-slate-500 font-medium text-xs md:text-sm">Legislative segments for {state.code === 'PB' ? '2026' : '2025-26'} verified.</p>
        </div>
        <div className="w-full lg:w-[24rem] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text" 
            placeholder="Search Segment..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-lg py-2.5 pl-9 pr-4 focus:border-blue-600 outline-none font-bold text-xs transition-all"
          />
        </div>
      </div>

      {/* COMPACT AI BAR */}
      <div className="glass-card rounded-lg p-4 mb-6 relative overflow-hidden">
         <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Intelligence Analysis</span>
         </div>
         {loading ? <div className="animate-pulse h-4 bg-slate-800 rounded w-1/3"></div> : <p className="text-xs md:text-sm font-medium italic text-slate-300">"{insight}"</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {filtered.map(ac => (
          <div key={ac.id} className="p-4 rounded-xl glass-card hover-lift group border-slate-800">
            <div className="flex justify-between items-center mb-4">
               <span className="text-[10px] font-bold text-slate-600">AC #{ac.number}</span>
               <Badge variant="green" className="!text-[7px]">Ready</Badge>
            </div>
            <h4 className="text-sm font-black text-white truncate uppercase tracking-tight mb-4">{ac.name}</h4>
            <div className="flex items-center justify-between pt-3 border-t border-slate-800/50">
               <span className="text-sm font-black text-blue-500">₹{ac.price}</span>
               <button onClick={() => onBuy(ac)} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded text-[8px] font-black uppercase tracking-widest">GET EXCEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Trust & Legal Components ---

const TrustSection = () => (
  <section className="px-4 py-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[
        { icon: <ShieldCheck className="w-4 h-4" />, title: "Verified Node", desc: "Multi-tier extraction." },
        { icon: <Target className="w-4 h-4" />, title: "19-Column", desc: "Pro-structured metadata." },
        /* Fixed error on line 279: Added missing Zap icon import */
        { icon: <Zap className="w-4 h-4" />, title: "Instant Sync", desc: "WhatsApp delivery node." },
        { icon: <Lock className="w-4 h-4" />, title: "Encrypted Desk", desc: "Secure data transfer." }
      ].map((item, idx) => (
        <div key={idx} className="flex gap-3 items-center p-3 glass-card rounded-lg border-slate-800">
          <div className="text-blue-500 shrink-0">{item.icon}</div>
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-tight text-white leading-none mb-1">{item.title}</h4>
            <p className="text-[8px] text-slate-500 font-bold uppercase">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const LegalDisclaimer = () => (
  <section className="px-4 py-6 max-w-7xl mx-auto mb-6">
    <div className="glass-card border-slate-800 rounded-lg p-4 flex gap-4 items-center">
      <Lock className="w-4 h-4 text-slate-600 shrink-0" />
      <p className="text-slate-500 text-[8px] font-bold uppercase tracking-widest text-center md:text-left leading-relaxed">
        Independent metadata extraction node. All voter archives subject to regional Election Commission privacy mandates and strategic usage guidelines.
      </p>
    </div>
  </section>
);

// --- Modals ---

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
       <div className="bg-brand-midnight w-full max-w-sm rounded-xl overflow-hidden shadow-2xl border border-slate-800 animate-slide-up">
          <div className="p-6 space-y-6">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-white">
                   <FileSpreadsheet className="w-5 h-5 text-blue-500" />
                   <h3 className="text-base font-black uppercase tracking-tighter">Order Dataset</h3>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
             </div>
             <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 space-y-4">
                <div>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target Constituency</p>
                   <h4 className="text-xl font-black text-white uppercase tracking-tighter">{ac.name}</h4>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-slate-800">
                   <div>
                      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Access Fee</p>
                      <p className="text-xl font-black text-blue-500">₹{ac.price}</p>
                   </div>
                   <p className="text-[8px] font-bold text-slate-400 uppercase">Excel Export</p>
                </div>
             </div>
             <button 
              onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for AC: ${ac.name} (${stateName})`, '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-black uppercase tracking-widest text-[9px] shadow-[0_5px_15px_rgba(37,99,235,0.3)] transition-all"
             >
               CONFIRM ORDER VIA WHATSAPP
             </button>
          </div>
       </div>
    </div>
  );
};

const ContactView = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Data Enquiry: Name: ${formData.name}, Phone: ${formData.phone}`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="max-w-5xl mx-auto px-4 animate-fade-in py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 text-[9px] font-black uppercase tracking-widest mb-10 transition-all">
        <ArrowLeft className="w-3 h-3" /> RETURN
      </button>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
           <Badge variant="blue">Strategic Support</Badge>
           <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Expert <br/> <span className="text-blue-500">Consultation</span></h2>
           <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-sm">Connect with our primary analyst desk for state-wide extraction or custom institutional datasets.</p>
           <div 
             onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
             className="flex items-center gap-3 text-white font-black text-sm cursor-pointer hover:text-blue-500 transition-all group"
           >
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all"><MessageSquare className="w-5 h-5" /></div>
              WhatsApp Analyst Direct
           </div>
        </div>
        <div className="glass-card p-6 md:p-8 rounded-xl border-slate-800">
           <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Identity Name" className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 focus:border-blue-600 outline-none font-bold text-xs text-white" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              <input required type="tel" placeholder="+91 Node Number" className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 focus:border-blue-600 outline-none font-bold text-xs text-white" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 active:scale-95 text-[9px]">INITIATE REQUEST <Send className="w-4 h-4" /></button>
           </form>
        </div>
      </div>
    </div>
  );
};

const OrderNotification = () => {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({ name: "", state: "" });
  useEffect(() => {
    const trigger = () => {
      const randomState = INDIAN_STATES[Math.floor(Math.random() * INDIAN_STATES.length)];
      if (randomState.acs.length) {
        setOrder({ name: randomState.acs[Math.floor(Math.random() * randomState.acs.length)].name, state: randomState.name });
        setVisible(true);
        setTimeout(() => setVisible(false), 4000);
      }
    };
    const interval = setInterval(trigger, 18000);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[250] animate-slide-up hidden md:block">
      <div className="glass-card text-white p-3 px-4 rounded-lg shadow-2xl flex items-center gap-3 border-slate-800">
        <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
        <div>
          <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Extraction Complete</p>
          <p className="text-[10px] font-bold tracking-tight uppercase text-white">{order.name}, {order.state}</p>
        </div>
      </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
       <div className="bg-brand-midnight w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh] border border-slate-800">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">19-Column Metadata Sample</h3>
                <p className="text-[8px] font-bold text-slate-500 uppercase">Standard Dataset Node Format</p>
             </div>
             <button onClick={onClose} className="text-slate-500 hover:text-white transition-all"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 overflow-auto bg-brand-midnight">
             <table className="w-full text-left border-separate border-spacing-0 glass-card rounded-lg overflow-hidden">
                <thead>
                   <tr className="bg-slate-900 text-slate-400 uppercase text-[8px] tracking-widest font-black">
                      <th className="p-3">Legislative AC</th><th className="p-3">EPIC Node</th><th className="p-3">Voter Name</th><th className="p-3">Relation</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-[10px] font-bold text-slate-400">
                   <tr><td className="p-3">Ajnala (PB)</td><td className="p-3 text-blue-500">IFC262XXXX</td><td className="p-3 text-white">Kuldeep Singh</td><td className="p-3">47 / M</td></tr>
                   <tr><td className="p-3">Ballygunge (WB)</td><td className="p-3 text-emerald-500">WB/32/XXXX</td><td className="p-3 text-white">Debasish Roy</td><td className="p-3">52 / M</td></tr>
                </tbody>
             </table>
             <div className="mt-4 p-2 bg-blue-600/10 border border-blue-600/20 rounded text-[7px] font-black text-blue-400 uppercase tracking-widest text-center">
                + Final export contains Booth ID, Part No, Section, and 12 Advanced Intelligence Columns.
             </div>
          </div>
       </div>
    </div>
  );
}

export default App;
