
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, Zap, 
  FileSpreadsheet, ShieldCheck, HelpCircle, Activity, Eye, 
  MessageSquare, Send, Database, Target, Lock
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Shared UI Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'green' | 'slate', className?: string }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    slate: 'bg-slate-50 text-slate-600 border-slate-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${styles[variant]} inline-flex items-center gap-1 ${className}`}>
      {children}
    </span>
  );
};

const CompactLogo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-9 h-9 bg-brand-navy rounded-lg flex items-center justify-center text-white shadow-md">
      <Database className="w-5 h-5 text-blue-400" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-lg font-extrabold tracking-tighter text-brand-navy leading-none">
        VOTERLIST<span className="text-brand-primary">EXCEL</span>
      </h1>
      <span className="text-[7px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified Data Source</span>
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
    <div className="min-h-screen bg-white text-brand-navy">
      <OrderNotification />
      
      {/* HEADER: TIGHTER HEIGHT */}
      <nav className="fixed top-0 w-full z-[100] glass-nav border-b border-slate-200/60 h-14 md:h-16 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleHome}>
            <CompactLogo />
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setView('CONTACT')} 
              className="bg-brand-navy hover:bg-brand-primary text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3 h-3" /> SUPPORT DESK
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-24">
        {view === 'HOME' ? (
          <>
            {/* HERO: REMOVED EXTRA PADDING */}
            <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto text-center border-b border-slate-50 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-md mb-4">
                <Badge variant="blue" className="animate-pulse">Live Repository</Badge>
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">2026-27 Electoral Nodes Active</span>
              </div>
              <h1 className="text-3xl md:text-6xl font-black mb-4 tracking-tighter uppercase leading-[1.1]">
                Precision <span className="text-brand-primary">Voter List</span> <br/>
                Metadata In Excel
              </h1>
              <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto font-medium mb-8 italic">
                Advanced data nodes for <span className="text-brand-navy font-bold">Punjab 2026</span> and <span className="text-brand-navy font-bold">West Bengal</span>. Standardized 19-column structured mapping.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-primary hover:bg-brand-navy text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all"
                >
                  START SEARCH
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="bg-white border border-slate-200 text-slate-600 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> PREVIEW FILE
                </button>
              </div>
            </section>

            {/* FEATURED STATE BOX: TIGHTER */}
            <section className="px-4 max-w-7xl mx-auto mb-10">
               <div className="bg-brand-navy rounded-2xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="absolute top-0 right-0 w-48 h-full bg-blue-600/10 blur-[60px]"></div>
                  <div className="space-y-2 text-center md:text-left">
                    <Badge variant="blue">Strategic Priority</Badge>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight">PUNJAB <span className="text-blue-400">2026</span> REGISTRY</h2>
                    <p className="text-slate-400 text-xs md:text-sm font-medium">All 117 AC segments mapped and verified for the upcoming 2026 cycles.</p>
                  </div>
                  <button 
                    onClick={() => { const pb = INDIAN_STATES.find(s => s.code === 'PB'); if (pb) selectState(pb); }}
                    className="bg-white hover:bg-blue-100 text-brand-navy px-6 py-3 rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all shrink-0"
                  >
                    ACCESS PUNJAB NODES
                  </button>
               </div>
            </section>

            {/* STATE GRID: REDUCED MARGINS */}
            <section id="states" className="px-4 py-8 max-w-7xl mx-auto">
              <div className="mb-8 border-l-4 border-brand-primary pl-4">
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter">Regional Archives</h2>
                <p className="text-slate-500 text-xs font-medium">Verified constituency datasets available for instant extract.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {INDIAN_STATES.map((state) => {
                  const isHigh = state.code === 'PB' || state.code === 'WB';
                  return (
                    <div 
                      key={state.id}
                      onClick={() => selectState(state)}
                      className={`p-6 rounded-2xl border hover-lift cursor-pointer ${
                        isHigh ? 'bg-blue-50/30 border-blue-200' : 'bg-white border-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-10">
                        <div className="w-10 h-10 bg-brand-navy text-blue-400 rounded-lg flex items-center justify-center font-black text-sm">
                           {state.code}
                        </div>
                        {isHigh && <Badge variant="blue">Updated</Badge>}
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase tracking-tight mb-1">{state.name}</h3>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{state.totalSeats} AC Nodes</p>
                      </div>
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

      {/* FOOTER: MORE COMPACT */}
      <footer className="mt-12 px-4 py-8 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <CompactLogo />
          <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span className="hover:text-brand-primary cursor-pointer" onClick={() => setView('HOME')}>Archives</span>
            <span className="hover:text-brand-primary cursor-pointer" onClick={() => setView('CONTACT')}>Analyst Desk</span>
            <span className="hover:text-brand-primary cursor-pointer">Privacy</span>
          </div>
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© 2025 VOTERLISTEXCEL.IN • VERIFIED NODE</p>
        </div>
      </footer>
    </div>
  );
};

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
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-brand-primary text-[10px] font-black uppercase tracking-widest mb-6">
        <ArrowLeft className="w-3 h-3" /> ARCHIVES
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8">
        <div className="space-y-1">
          <Badge variant="blue">Extraction Active</Badge>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">{state.name}</h2>
          <p className="text-slate-400 font-medium text-sm md:text-base italic">Constituency segments verified for {state.code === 'PB' ? '2026' : '2025-26'}.</p>
        </div>
        <div className="w-full lg:w-[28rem] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search AC Name or No..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:border-brand-primary focus:bg-white outline-none font-bold text-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-brand-navy rounded-xl p-6 mb-8 relative overflow-hidden text-white shadow-lg">
         <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">AI Intelligence Node</span>
         </div>
         {loading ? <div className="animate-pulse h-6 bg-white/5 rounded w-1/2"></div> : <p className="text-sm md:text-lg font-medium italic text-slate-200 leading-relaxed">"{insight}"</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(ac => (
          <div key={ac.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover-lift group">
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <div className="text-xs font-black text-slate-300">AC #{ac.number}</div>
                  <Badge variant="green">{ac.dataYear}</Badge>
               </div>
               <h4 className="text-lg font-black text-brand-navy truncate uppercase tracking-tight">{ac.name}</h4>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
               <span className="text-lg font-black text-brand-navy">₹{ac.price}</span>
               <button onClick={() => onBuy(ac)} className="bg-brand-navy hover:bg-brand-primary text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">GET EXCEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustSection = () => (
  <section className="px-4 py-10 max-w-7xl mx-auto border-t border-slate-50">
    <div className="grid md:grid-cols-4 gap-6">
      {[
        { icon: <ShieldCheck className="w-5 h-5" />, title: "Verified Nodes", desc: "Rigorous roll verification." },
        { icon: <Target className="w-5 h-5" />, title: "19-Column Roll", desc: "Standard analysis format." },
        { icon: <Zap className="w-5 h-5" />, title: "Direct Sync", desc: "Instant WhatsApp delivery." },
        { icon: <Lock className="w-5 h-5" />, title: "Secure Desk", desc: "Encrypted data protocols." }
      ].map((item, idx) => (
        <div key={idx} className="flex gap-4 items-start p-4">
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 text-brand-primary border border-slate-100">{item.icon}</div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-tight text-brand-navy mb-1">{item.title}</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-brand-navy/90 backdrop-blur-sm animate-fade-in">
       <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-slide-up">
          <div className="p-8 space-y-6">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-xl flex items-center justify-center border border-blue-100"><FileSpreadsheet className="w-6 h-6" /></div>
                   <h3 className="text-xl font-black uppercase tracking-tighter">Order Access</h3>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-all"><X className="w-5 h-5" /></button>
             </div>
             <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target Segment</p>
                   <h4 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">{ac.name}</h4>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-slate-200">
                   <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Price Node</p>
                      <p className="text-2xl font-black text-brand-primary">₹{ac.price}</p>
                   </div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Excel File (.xlsx)</p>
                </div>
             </div>
             <button 
              onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for AC: ${ac.name} (${stateName})`, '_blank')}
              className="w-full bg-brand-navy hover:bg-brand-primary text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95 text-[10px]"
             >
               CONFIRM ON WHATSAPP
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
    const msg = `Enquiry: Name: ${formData.name}, Phone: ${formData.phone}`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="max-w-5xl mx-auto px-4 animate-fade-in py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-brand-primary text-[10px] font-black uppercase tracking-widest mb-10 transition-all">
        <ArrowLeft className="w-3 h-3" /> BACK
      </button>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
           <Badge variant="blue">Strategic Support</Badge>
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Custom <br/> <span className="text-brand-primary">Metadata</span></h2>
           <p className="text-slate-500 font-medium text-base italic leading-relaxed">Connect with our analysts for bulk state extraction or institutional datasets.</p>
           <div 
             onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
             className="flex items-center gap-4 text-brand-navy font-black text-lg cursor-pointer hover:text-brand-primary transition-all group"
           >
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all"><MessageSquare className="w-6 h-6" /></div>
              Direct WhatsApp Analyst
           </div>
        </div>
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl">
           <form onSubmit={handleSubmit} className="space-y-6">
              <input required type="text" placeholder="Your Identity" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-6 focus:bg-white focus:border-brand-primary outline-none font-bold text-sm" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              <input required type="tel" placeholder="+91 Secure Mobile" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-6 focus:bg-white focus:border-brand-primary outline-none font-bold text-sm" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              <button type="submit" className="w-full bg-brand-navy hover:bg-brand-primary text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 text-[10px]">INITIATE REQUEST <Send className="w-4 h-4" /></button>
           </form>
        </div>
      </div>
    </div>
  );
};

const LegalDisclaimer = () => (
  <section className="px-4 py-8 max-w-6xl mx-auto mb-10">
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
      <ShieldCheck className="w-8 h-8 text-slate-300 shrink-0" />
      <p className="text-slate-400 text-[10px] leading-relaxed font-bold uppercase tracking-wider text-center md:text-left">
        Independent metadata node for analysis. voterlistexcel.in provides extraction services subject to Election Commission regional privacy guidelines and local mandates.
      </p>
    </div>
  </section>
);

const OrderNotification = () => {
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState({ name: "", state: "" });
  useEffect(() => {
    const trigger = () => {
      const randomState = INDIAN_STATES[Math.floor(Math.random() * INDIAN_STATES.length)];
      if (randomState.acs.length) {
        setOrder({ name: randomState.acs[Math.floor(Math.random() * randomState.acs.length)].name, state: randomState.name });
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
      }
    };
    const timeout = setTimeout(trigger, 5000);
    const interval = setInterval(trigger, 20000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-6 z-[250] animate-slide-up hidden md:block">
      <div className="bg-brand-navy text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 border border-white/5">
        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white"><Activity className="w-4 h-4" /></div>
        <div>
          <p className="text-[7px] font-black text-blue-400 uppercase tracking-widest">Extraction Node Verified</p>
          <p className="text-xs font-bold tracking-tight uppercase">{order.name}, {order.state}</p>
        </div>
      </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-brand-navy/95 backdrop-blur-md animate-fade-in">
       <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div>
                <h3 className="text-2xl font-black text-brand-navy uppercase tracking-tighter">19-Column Metadata Output</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Standard Data Node Protocol</p>
             </div>
             <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-all text-slate-400"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-6 overflow-auto bg-white">
             <table className="w-full text-left border-separate border-spacing-0 bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                <thead>
                   <tr className="bg-brand-navy text-white uppercase text-[8px] tracking-widest font-black">
                      <th className="p-4">Legislative AC</th><th className="p-4">Voter ID (EPI)</th><th className="p-4">Identity Name</th><th className="p-4">Demographics</th><th className="p-4">Booth</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-[11px] font-bold text-slate-600">
                   <tr className="hover:bg-slate-50 transition-all"><td className="p-4">Ajnala (PB)</td><td className="p-4 text-blue-600">IFC262XXXX</td><td className="p-4">Kuldeep Singh</td><td className="p-4">47 / M (S/o Gurmej)</td><td className="p-4">Booth #122</td></tr>
                   <tr className="hover:bg-slate-50 transition-all"><td className="p-4">Ballygunge (WB)</td><td className="p-4 text-emerald-600">WB/32/XXXX</td><td className="p-4">Debasish Roy</td><td className="p-4">52 / M (S/o Ashok)</td><td className="p-4">Booth #45A</td></tr>
                   <tr className="hover:bg-slate-50 transition-all"><td className="p-4">Narela (DL)</td><td className="p-4 text-amber-600">DL/12/XXXX</td><td className="p-4">Sunita Devi</td><td className="p-4">39 / F (W/o Rakesh)</td><td className="p-4">Booth #02</td></tr>
                </tbody>
             </table>
             <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-[9px] font-bold text-blue-700 uppercase tracking-widest text-center">
                + 14 More Specialized Intelligence Columns included in final Excel export.
             </div>
          </div>
       </div>
    </div>
  );
}

export default App;
