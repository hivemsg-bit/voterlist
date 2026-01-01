import React, { useState, useMemo, useEffect } from 'react';
import { 
  Database, Search, ChevronRight, Cpu, Activity, Phone, 
  Download, Terminal, Sparkles, ArrowLeft, X, Mail, 
  User, MessageSquare, Zap, Tag, Table, Globe, 
  Lock, Smartphone, CreditCard, Clock, CheckCircle2, ShieldCheck,
  BarChart3, Layers, FileSpreadsheet, HardDrive, Share2, Send
} from 'lucide-react';
import { INDIAN_STATES, APP_NAME, CONTACT_WHATSAPP } from './constants.ts';
import { StateData, ViewState, AssemblyConstituency } from './types.ts';
import { getPoliticalInsight } from './services/geminiService.ts';

const Badge = ({ children, color = 'blue' }: { children?: React.ReactNode, color?: 'blue'|'gold'|'green'|'red'|'cyan' }) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gold: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${colors[color]} uppercase tracking-widest font-bold`}>{children}</span>;
};

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac?: AssemblyConstituency, stateName?: string }) => {
  if (!isOpen || !ac) return null;

  const handleWhatsApp = () => {
    const text = `नमस्ते! मुझे *AC+ Voterlist in Excel* फाइल चाहिए।
विधानसभा: ${ac.name}
AC नंबर: ${ac.number}
राज्य: ${stateName}
कीमत: ₹${ac.price}
कृपया मुझे सुरक्षित डाउनलोड लिंक और पेमेंट डिटेल्स भेजें।`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.2)] border border-brand-cyan/20 animate-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-brand-cyan/30">
              <ShieldCheck className="text-brand-cyan w-7 h-7 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase font-mono">Secure Node Access</h2>
              <p className="text-[9px] text-brand-cyan font-mono tracking-widest uppercase opacity-70">Handshake verified • Node: {ac.number}</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="bg-slate-900/80 border border-brand-cyan/30 rounded-2xl p-6 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileSpreadsheet className="w-24 h-24" />
            </div>
            <div className="space-y-1 relative">
              <span className="text-[10px] text-brand-cyan font-mono uppercase tracking-widest font-bold">Encrypted Archive</span>
              <h3 className="text-3xl font-black text-white leading-none">{ac.name}</h3>
            </div>
            <div className="flex items-center gap-3 relative">
              <Badge color="green">AC+ Voterlist in Excel</Badge>
              <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">2025 Latest Build</span>
            </div>
            <div className="pt-6 border-t border-white/5 flex justify-between items-end relative">
              <div>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">Transaction Value</p>
                <p className="text-4xl font-black text-brand-gold terminal-glow">₹{ac.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-brand-success font-mono uppercase font-bold">Status: Synchronized</p>
              </div>
            </div>
          </div>

          <button onClick={handleWhatsApp} className="w-full bg-brand-blue hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-4 group uppercase tracking-[0.2em]">
            <Smartphone className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Confirm Purchase
          </button>
          
          <p className="text-[10px] text-center text-slate-500 font-mono uppercase tracking-widest opacity-60">
            Automated Delivery via WhatsApp Protocol within 120 seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactView = () => {
  const handleBulkWhatsApp = () => {
    const text = `Hi! I want to enquire about *Bulk Orders* for Electoral Data in Excel format. Please share the pricing for full states.`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen pt-40 pb-32 px-6 max-w-[1000px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-6 mb-20">
        <Badge color="gold">Official Order Desk</Badge>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Bulk Data Enquiry</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Need data for an entire state or multiple constituencies? Our bulk processing engine provides the most competitive rates for high-volume electoral intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass-panel p-10 rounded-[2.5rem] border-brand-cyan/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border border-brand-cyan/30 shadow-lg">
              <Zap className="text-brand-cyan w-8 h-8" />
            </div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Fast Track</h3>
            <p className="text-slate-400 font-mono text-sm leading-relaxed uppercase tracking-widest">
              Direct connection to our verified WhatsApp data desk for immediate pricing and samples.
            </p>
          </div>
          <button onClick={handleBulkWhatsApp} className="mt-12 w-full bg-brand-blue hover:bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3">
            <Smartphone className="w-5 h-5" /> WhatsApp Support
          </button>
        </div>

        <div className="glass-panel p-10 rounded-[2.5rem] border-white/5 space-y-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <Terminal className="text-brand-cyan w-6 h-6" /> System Status
          </h3>
          <div className="space-y-4 font-mono text-[11px] uppercase tracking-widest">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-500">Node Status</span>
              <span className="text-brand-success font-bold">Online</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-500">Average Response</span>
              <span className="text-brand-cyan font-bold">&lt; 5 mins</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-500">Bulk Capacity</span>
              <span className="text-brand-gold font-bold">Unlimited</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-slate-500">Current Queue</span>
              <span className="text-slate-400">Low Latency</span>
            </div>
          </div>
          <div className="pt-4">
             <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  "Our system processes millions of voter records daily. For custom extraction requests, please specify the State and AC numbers in your message."
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIStatusIndicator = () => (
  <div className="flex items-center gap-4 bg-slate-900/60 border border-white/10 px-5 py-2.5 rounded-full font-mono text-[10px] text-brand-cyan uppercase tracking-widest shadow-inner">
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
      </span>
      <span className="font-bold">Protocol Active</span>
    </div>
    <div className="w-px h-3 bg-white/10"></div>
    <div className="flex items-center gap-2">
       <Activity className="w-3 h-3 animate-pulse" />
       <span>Buffer: 0ms</span>
    </div>
  </div>
);

const ACList = ({ state, onBack }: { state: StateData; onBack: () => void }) => {
  const [search, setSearch] = useState("");
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | undefined>(undefined);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [aiLoading, setAiLoading] = useState(false);

  const filtered = useMemo(() => 
    state.acs.filter(ac => ac.name.toLowerCase().includes(search.toLowerCase()) || ac.number.toString().includes(search)), 
    [state.acs, search]
  );

  useEffect(() => {
    const fetchInsight = async () => {
      setAiLoading(true);
      const text = await getPoliticalInsight(state.name, 'STATE');
      setAiInsight(text);
      setAiLoading(false);
    };
    fetchInsight();
  }, [state.name]);

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1300px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PurchaseModal isOpen={isPurchaseOpen} onClose={() => setIsPurchaseOpen(false)} ac={selectedAC} stateName={state.name} />
      
      <button onClick={onBack} className="group flex items-center gap-2 text-slate-500 text-[10px] font-black mb-12 hover:text-brand-cyan transition-all uppercase tracking-[0.4em]">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" /> Main Database
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge color="cyan">{state.name} Archives</Badge>
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Master Node: {state.code}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">Assembly Segments</h1>
          <div className="flex items-center gap-3 text-slate-500 font-mono text-[12px] uppercase tracking-[0.2em]">
            <Database className="w-4 h-4 text-brand-cyan" />
            <span>{state.totalSeats} Excel Data Sheets Available</span>
          </div>
        </div>
        <div className="relative w-full lg:w-[450px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder={`Search AC by name or number...`} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-[10px] placeholder:tracking-widest"
          />
        </div>
      </div>

      <div className="glass-panel rounded-[2.5rem] p-8 border-brand-cyan/20 mb-12 relative overflow-hidden group">
        <div className="ai-scan-line"></div>
        <div className="flex items-center gap-3 mb-6 relative">
          <Sparkles className="w-5 h-5 text-brand-cyan animate-pulse" />
          <h3 className="text-[11px] font-mono font-black text-brand-cyan uppercase tracking-[0.5em]">AI Demographic Intelligence</h3>
        </div>
        <div className="min-h-[60px] flex items-center relative">
          {aiLoading ? (
            <div className="flex gap-4 items-center text-slate-500 font-mono text-[12px] uppercase tracking-widest">
              <Activity className="w-4 h-4 animate-spin" /> Synchronizing Analysis...
            </div>
          ) : (
            <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-brand-cyan/20 pl-8 italic">{aiInsight}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((ac) => (
          <div key={ac.id} className="glass-panel p-8 rounded-3xl flex flex-col justify-between gap-8 group hover:border-brand-blue/60 transition-all hover:bg-slate-900/50 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-all scale-150 rotate-12">
               <FileSpreadsheet className="w-20 h-20 text-brand-cyan" />
            </div>
            
            <div className="space-y-4 relative">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-brand-cyan font-black text-lg">
                  {ac.number}
                </div>
                <Badge color="green">AC+ voterlist in excel</Badge>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-brand-cyan transition-colors mb-2">{ac.name}</h3>
                <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] uppercase tracking-tighter font-bold">
                   <div className="flex items-center gap-1.5 text-brand-success"><Table className="w-3.5 h-3.5" /> VERIFIED 2025 EXCEL</div>
                   <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
                   <span>{ac.partsCount} PARTS READY</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 relative pt-6 border-t border-white/5">
              <div className="flex justify-between items-center">
                <div className="text-brand-gold font-black text-3xl terminal-glow">₹{ac.price.toLocaleString()}</div>
                <div className="text-[9px] text-right text-slate-500 font-mono uppercase tracking-widest leading-none">
                  High-Accuracy<br/>Full Data Node
                </div>
              </div>
              <button 
                onClick={() => { setSelectedAC(ac); setIsPurchaseOpen(true); }}
                className="w-full bg-slate-900 hover:bg-brand-blue border border-white/10 hover:border-brand-blue text-white py-4 rounded-xl font-black text-[12px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all group/btn shadow-lg"
              >
                <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" /> Get Excel List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Header = ({ onHome, onContact }: { onHome: () => void, onContact: () => void }) => (
  <header className="fixed top-0 w-full z-[90] bg-slate-950/70 backdrop-blur-2xl border-b border-white/5">
    <div className="max-w-[1500px] mx-auto px-8 h-24 flex justify-between items-center">
      <div className="flex items-center gap-5 cursor-pointer group" onClick={onHome}>
        <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/40 group-hover:scale-110 transition-transform">
          <Terminal className="text-white w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Bharat Intel</h1>
          <p className="text-[10px] text-brand-cyan font-mono tracking-[0.4em] mt-1 uppercase font-bold">Data Core v2.1</p>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden xl:block"><AIStatusIndicator /></div>
        <button 
          onClick={onContact}
          className="bg-white hover:bg-brand-cyan text-slate-950 px-8 py-3.5 rounded-2xl text-[11px] font-black transition-all uppercase tracking-[0.3em] shadow-xl active:scale-95"
        >
          Order Desk
        </button>
      </div>
    </div>
  </header>
);

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);

  const selectState = (state: StateData) => {
    setActiveState(state);
    setView('STATE_VIEW');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = () => {
    setView('HOME');
    setActiveState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateContact = () => {
    setView('CONTACT');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 grid-bg font-sans selection:bg-brand-cyan selection:text-slate-950 text-slate-300">
      <Header onHome={navigateHome} onContact={navigateContact} />
      
      <main>
        {view === 'HOME' ? (
          <>
            <section className="pt-52 pb-32 px-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] -z-10 animate-pulse-slow"></div>
              
              <div className="max-w-6xl mx-auto space-y-10">
                <div className="flex justify-center">
                   <Badge color="cyan">Archive v2025.1 • 100% RELIABLE</Badge>
                </div>
                <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] animate-in fade-in zoom-in duration-700">
                  Buy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue animate-glitch">AC+ Voterlist in Excel</span>
                </h1>
                <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed tracking-tight">
                  High-impact electoral intelligence for all Indian states. Secure your verified 2025 Assembly Constituency data in <span className="text-white font-bold border-b-2 border-brand-cyan pb-1 uppercase">Excel Format</span> instantly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-10">
                  <button onClick={() => document.getElementById('hub')?.scrollIntoView({behavior:'smooth'})} className="w-full sm:w-auto bg-brand-blue hover:bg-blue-600 text-white px-14 py-6 rounded-[2rem] font-black text-sm transition-all shadow-[0_20px_40px_rgba(37,99,235,0.25)] uppercase tracking-[0.3em] group">
                    Initialize Hub <ChevronRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button onClick={navigateContact} className="w-full sm:w-auto flex items-center justify-center gap-4 bg-slate-900/50 border border-slate-700 hover:border-brand-cyan text-white px-10 py-6 rounded-[2rem] font-black text-sm transition-all uppercase tracking-widest shadow-xl">
                    <Smartphone className="w-5 h-5 text-brand-cyan" /> Secure Order Desk
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-12 pt-24 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center"><ShieldCheck className="w-8 h-8 text-brand-success" /></div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-slate-500">100% Secure</div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center"><Clock className="w-8 h-8 text-brand-cyan" /></div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-slate-500">Instant Build</div>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center"><FileSpreadsheet className="w-8 h-8 text-brand-gold" /></div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-slate-500">Excel XLSX</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="hub" className="py-32 px-6 max-w-[1500px] mx-auto border-t border-white/5 relative">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Globe className="text-brand-cyan w-10 h-10 animate-pulse" />
                    <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Regional Grid</h2>
                  </div>
                  <p className="text-slate-500 font-mono text-[14px] uppercase tracking-[0.4em] max-w-xl">Synchronize with state-specific data nodes for Assembly Constituency lists.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                {INDIAN_STATES.map((state) => (
                  <div 
                    key={state.id} 
                    onClick={() => selectState(state)}
                    className="glass-panel group p-10 rounded-[3rem] cursor-pointer border border-white/5 hover:border-brand-cyan/40 hover:bg-slate-900/60 transition-all relative overflow-hidden flex flex-col items-center text-center hover:-translate-y-2"
                  >
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="w-20 h-20 bg-slate-950 border border-white/10 rounded-[2rem] flex items-center justify-center text-brand-blue font-black text-3xl mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner group-hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]">
                      {state.code}
                    </div>
                    
                    <h3 className="text-white font-black text-xl mb-3 group-hover:text-brand-cyan transition-colors uppercase tracking-tight leading-tight">{state.name}</h3>
                    <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-8">
                      {state.totalSeats} AC Nodes
                    </div>
                    
                    <div className="w-full flex items-center justify-center gap-3 text-[11px] font-black text-brand-blue opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 uppercase tracking-widest">
                      <span>Sync Data</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : view === 'STATE_VIEW' && activeState ? (
          <ACList state={activeState} onBack={navigateHome} />
        ) : view === 'CONTACT' ? (
          <ContactView />
        ) : null}
      </main>

      <footer className="bg-slate-950 border-t border-white/5 pt-32 pb-16 relative">
        <div className="max-w-[1500px] mx-auto px-8 grid md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-2 space-y-10">
            <div className="flex items-center gap-5">
              <Database className="text-brand-cyan w-8 h-8" />
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Bharat Data Core</h3>
            </div>
            <p className="text-slate-400 max-w-lg text-lg leading-relaxed font-light">
              Premium electoral datasets for professional election management. Specialized in high-accuracy <span className="text-brand-cyan font-bold">AC+ Voterlist in Excel</span> extraction and deployment.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black mb-10 text-xs uppercase tracking-[0.4em]">Intelligence Nodes</h4>
            <ul className="space-y-6 text-[11px] text-slate-500 font-black uppercase tracking-[0.3em]">
              <li onClick={navigateHome} className="hover:text-brand-cyan cursor-pointer transition-colors">State Archives</li>
              <li onClick={navigateContact} className="hover:text-brand-cyan cursor-pointer transition-colors">Voter Analysis</li>
              <li onClick={navigateContact} className="hover:text-brand-cyan cursor-pointer transition-colors">Excel Extraction</li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-white font-black mb-2 text-xs uppercase tracking-[0.4em]">System Protocol</h4>
            <div className="glass-panel p-8 rounded-[2rem] font-mono text-[11px] space-y-5 border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">ENCRYPTION</span>
                <span className="text-brand-success font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">VERSION</span>
                <span className="text-brand-cyan font-bold">2025.REL</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5">
                <div className="flex items-center gap-3 text-brand-success font-bold">
                  <div className="w-2 h-2 rounded-full bg-brand-success animate-ping"></div>
                  ALL NODES ONLINE
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-16 border-t border-white/5 px-10 flex flex-col lg:flex-row justify-between items-center gap-10 text-[11px] text-slate-600 font-mono uppercase tracking-[0.5em]">
          <p>© 2025 {APP_NAME.toUpperCase()} • BHARAT DATA GROUP</p>
          <div className="flex gap-12 font-black">
             <span className="hover:text-brand-cyan cursor-pointer transition-colors">Security</span>
             <span className="hover:text-brand-cyan cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;