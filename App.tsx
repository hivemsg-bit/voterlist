
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, Zap, 
  FileSpreadsheet, ShieldCheck, ArrowUpRight, Layers, 
  HelpCircle, Activity, Eye, Mail, MessageSquare, Send, 
  Rocket, Database, Target, Lock, Download
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Reusable Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'gold' | 'green' | 'red' | 'slate', className?: string }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    gold: 'bg-amber-50 text-amber-700 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    red: 'bg-rose-50 text-rose-700 border-rose-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold border uppercase tracking-wider ${styles[variant]} whitespace-nowrap inline-flex items-center gap-1.5 ${className}`}>
      {children}
    </span>
  );
};

const PremiumLogo = () => (
  <div className="flex items-center gap-2 group">
    <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-amber-500 shadow-lg group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
      <Database className="w-5 h-5" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl font-display font-black tracking-tighter text-slate-950 leading-none">
        VOTERLIST<span className="text-amber-600">EXCEL</span>
      </h1>
      <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">PREMIUM DATA HUB</span>
    </div>
  </div>
);

const SectionHeader = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-10 space-y-3 ${centered ? 'text-center' : ''}`}>
    <Badge variant="gold">{badge}</Badge>
    <h2 className="text-2xl md:text-5xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">
      {title}
    </h2>
    <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto italic">
      {subtitle}
    </p>
  </div>
);

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let title = "Voter List Excel 2026 | Punjab & West Bengal Verified";
    if (activeState) title = `${activeState.name} Voter List Excel | Premium 2026`;
    document.title = title;
  }, [activeState]);

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
    <div className="min-h-screen bg-white">
      <OrderNotification />
      
      {/* COMPACT NAVIGATION */}
      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex justify-between items-center">
          <div className="cursor-pointer scale-90 md:scale-100" onClick={handleHome}>
            <PremiumLogo />
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => setView('CONTACT')} 
              className="bg-slate-950 hover:bg-amber-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3 h-3" /> SUPPORT
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-28">
        {view === 'HOME' ? (
          <>
            {/* COMPACT HERO */}
            <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg mb-6">
                <Badge variant="green" className="animate-pulse">Live 2026</Badge>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Electoral Rolls Synchronized</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black text-slate-950 leading-[0.95] mb-6 tracking-tighter uppercase">
                Download Authentic <br/>
                <span className="gold-text italic">Voter List</span> In Excel
              </h1>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-10 px-4 italic">
                Precision Metadata for Strategic Campaigns. Specialized nodes for <span className="text-slate-950 font-bold">Punjab 2026</span> and <span className="text-slate-950 font-bold">West Bengal</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-slate-950 hover:bg-amber-600 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95"
                >
                  Enter Registry <ChevronRight className="w-4 h-4 ml-1 inline" />
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> View Sample
                </button>
              </div>
            </section>

            {/* PUNJAB PRIORITY CARD */}
            <section className="px-4 max-w-7xl mx-auto mb-12">
               <div className="relative overflow-hidden bg-slate-950 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px]"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-4">
                      <Badge variant="gold">Strategic Hub</Badge>
                      <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight">PUNJAB <span className="text-amber-500">2026</span></h2>
                      <p className="text-slate-400 text-sm md:text-base font-medium max-w-lg">Verified 117 AC segments with 19-column structured mapping ready for extraction.</p>
                    </div>
                    <button 
                      onClick={() => {
                        const pb = INDIAN_STATES.find(s => s.code === 'PB');
                        if (pb) selectState(pb);
                      }}
                      className="bg-amber-500 hover:bg-white hover:text-amber-600 text-slate-950 px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all shrink-0"
                    >
                      Access Punjab Node
                    </button>
                  </div>
               </div>
            </section>

            <section id="states" className="px-4 py-12 max-w-7xl mx-auto">
              <SectionHeader 
                badge="Registry" 
                title="Regional Archives" 
                subtitle="Select a state to explore constituency-wise verified data."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {INDIAN_STATES.map((state) => {
                  const isPunjab = state.code === 'PB';
                  const isWB = state.code === 'WB';
                  return (
                    <div 
                      key={state.id}
                      onClick={() => selectState(state)}
                      className={`group relative h-64 rounded-3xl overflow-hidden hover-lift cursor-pointer border border-slate-100 ${
                        isPunjab ? 'bg-amber-50/30 border-amber-200' : 'bg-white'
                      }`}
                    >
                      <div className="p-8 flex flex-col justify-between h-full relative z-10">
                         <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                              isPunjab ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'
                            }`}>
                               {state.code}
                            </div>
                            {isPunjab && <Badge variant="gold">2026 Ready</Badge>}
                            {isWB && <Badge variant="green">High Volume</Badge>}
                         </div>
                         <div className="space-y-1">
                            <h3 className="text-2xl font-display font-black text-slate-950 uppercase tracking-tighter">{state.name}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{state.totalSeats} AC Nodes Available</p>
                         </div>
                      </div>
                      <div className={`absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100 ${
                        isPunjab ? 'bg-amber-500' : 'bg-slate-950'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </section>

            <TrustSection />
            <LegalDisclaimer />
            <FAQSection />
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

      <footer className="mt-16 px-4 py-12 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 items-start">
          <div className="space-y-4 max-w-sm">
            <PremiumLogo />
            <p className="text-slate-500 text-xs font-medium leading-relaxed italic">
              India's premier electoral node for verified data extraction. Serving professionals since 2019.
            </p>
          </div>
          <div className="flex gap-16">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LINKS</h4>
              <ul className="text-xs font-bold text-slate-900 space-y-3 uppercase tracking-wider">
                <li className="hover:text-amber-600 cursor-pointer" onClick={() => setView('HOME')}>Archives</li>
                <li className="hover:text-amber-600 cursor-pointer" onClick={() => setView('CONTACT')}>Support</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LEGAL</h4>
              <ul className="text-xs font-bold text-slate-900 space-y-3 uppercase tracking-wider">
                <li>Privacy Policy</li>
                <li>EC Compliance</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-50 flex justify-between items-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2025 VOTERLISTEXCEL.IN</p>
           <ShieldCheck className="w-5 h-5 text-slate-300" />
        </div>
      </footer>
    </div>
  );
};

// --- Sub-Views ---

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
    <div className="max-w-7xl mx-auto px-4 animate-fade-in pb-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-amber-600 text-[10px] font-black uppercase tracking-widest mb-10 transition-all">
        <ArrowLeft className="w-3 h-3" /> EXIT TO ARCHIVES
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
        <div className="space-y-3">
          <Badge variant="gold">Regional Node Active</Badge>
          <h2 className="text-4xl md:text-7xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">{state.name}</h2>
          <p className="text-slate-400 font-medium text-lg italic">Verified electoral segments for {state.code === 'PB' ? '2026' : '2025-26'}.</p>
        </div>
        <div className="w-full lg:w-[32rem] relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search Segment..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 focus:border-amber-500 focus:bg-white outline-none font-bold text-base transition-all"
          />
        </div>
      </div>

      {/* COMPACT INSIGHT BAR */}
      <div className="bg-slate-950 rounded-2xl p-6 md:p-10 mb-10 relative overflow-hidden text-white shadow-xl">
         <div className="absolute top-0 right-0 w-32 h-full bg-amber-500/10 blur-[50px]"></div>
         <div className="flex items-center gap-4 mb-4">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">AI Intelligence</span>
         </div>
         {loading ? <div className="animate-pulse h-8 bg-white/5 rounded-lg w-3/4"></div> : <p className="text-xl md:text-3xl font-medium italic text-slate-100 tracking-tight leading-snug">"{insight}"</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ac => (
          <div key={ac.id} className="bg-white p-8 rounded-3xl border border-slate-100 hover-lift group">
            <div className="space-y-6">
               <div className="flex justify-between items-center">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 font-black rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-slate-950 group-hover:text-amber-500 transition-colors">
                    {ac.number}
                  </div>
                  <Badge variant="green">{ac.dataYear}</Badge>
               </div>
               <div>
                  <h4 className="text-2xl font-display font-black text-slate-950 mb-1 truncate uppercase tracking-tight">{ac.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Excel Node Ready</p>
               </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-2xl font-black text-slate-950 tracking-tighter">₹{ac.price}</span>
               <button onClick={() => onBuy(ac)} className="bg-slate-950 hover:bg-amber-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95">GET DATA</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TrustSection = () => (
  <section className="px-4 py-12 max-w-7xl mx-auto">
    <SectionHeader badge="Assurance" title="Protocol Standards" subtitle="The legislative benchmark for political demographics." centered />
    <div className="grid md:grid-cols-4 gap-6">
      {[
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Verified Node", desc: "Multi-tier roll verification." },
        { icon: <Target className="w-6 h-6" />, title: "19-Column Roll", desc: "Formatted for micro-targeting." },
        { icon: <Zap className="w-6 h-6" />, title: "Instant Sync", desc: "WhatsApp delivery in minutes." },
        { icon: <Lock className="w-6 h-6" />, title: "Secure Desk", desc: "Encrypted data handoff." }
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover-lift text-center group">
          <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-amber-600 group-hover:bg-slate-950 transition-colors">{item.icon}</div>
          <h4 className="text-lg font-display font-black text-slate-950 mb-2 uppercase tracking-tight">{item.title}</h4>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
       <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
          <div className="p-8 md:p-12 space-y-8">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100"><FileSpreadsheet className="w-8 h-8" /></div>
                   <h3 className="text-2xl font-display font-black text-slate-950 uppercase tracking-tighter">Order Node</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X className="w-6 h-6" /></button>
             </div>
             <div className="bg-slate-50 rounded-2xl p-8 space-y-6">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Constituency Node</p>
                   <h4 className="text-4xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">{ac.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Format</p>
                      <p className="text-sm font-bold text-slate-950 uppercase">Excel (.xlsx)</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fee</p>
                      <p className="text-3xl font-black text-amber-600 tracking-tighter">₹{ac.price}</p>
                   </div>
                </div>
             </div>
             <button 
              onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for AC: ${ac.name} (${stateName})`, '_blank')}
              className="w-full bg-slate-950 hover:bg-amber-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 text-xs"
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
    <div className="max-w-7xl mx-auto px-4 animate-fade-in py-12">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-amber-600 text-[10px] font-black uppercase tracking-widest mb-10 transition-all">
        <ArrowLeft className="w-3 h-3" /> BACK
      </button>
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
           <Badge variant="gold">Expert Desk</Badge>
           <h2 className="text-5xl md:text-8xl font-display font-black text-slate-950 uppercase tracking-tighter leading-none">Secure <br/> <span className="text-amber-500">Node</span></h2>
           <p className="text-slate-500 font-medium text-lg leading-relaxed italic max-w-md">Connect with our analysts for full-state extraction or custom datasets.</p>
           <div 
             onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
             className="flex items-center gap-6 text-slate-950 font-black text-xl cursor-pointer hover:text-amber-600 transition-all group"
           >
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:bg-amber-500 group-hover:text-white transition-all"><MessageSquare className="w-7 h-7" /></div>
              WhatsApp Analyst Node
           </div>
        </div>
        <div className="bg-white p-10 md:p-12 rounded-[2rem] border border-slate-100 shadow-xl relative overflow-hidden">
           <form onSubmit={handleSubmit} className="space-y-8">
              <h3 className="text-3xl font-display font-black text-slate-950 uppercase tracking-tighter">Instant Request</h3>
              <div className="space-y-6">
                 <input required type="text" placeholder="Identity Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-base" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                 <input required type="tel" placeholder="+91 Secure Mobile" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:bg-white focus:border-amber-500 outline-none transition-all font-bold text-base" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              </div>
              <button type="submit" className="w-full bg-slate-950 hover:bg-amber-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-4 active:scale-95 text-xs">INITIATE EXTRACTION <Send className="w-5 h-5" /></button>
           </form>
        </div>
      </div>
    </div>
  );
};

const LegalDisclaimer = () => (
  <section className="px-4 py-12 max-w-6xl mx-auto">
    <div className="bg-slate-950 text-white rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-full bg-amber-500/5 blur-[40px]"></div>
      <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-xl text-slate-950">
        <ShieldCheck className="w-10 h-10" />
      </div>
      <div className="space-y-2 text-center md:text-left">
        <h4 className="text-2xl font-display font-black uppercase tracking-tight">Compliance Protocol</h4>
        <p className="text-slate-400 text-sm leading-relaxed font-medium italic">
          voterlistexcel.in provides independent metadata for strategic analysis. All data remains subject to Election Commission regional guidelines.
        </p>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    { q: "Is the Punjab 2026 registry live?", a: "Yes, our Punjab 2026 data nodes are synchronized with the latest preliminary rolls." },
    { q: "What fields are in the Excel?", a: "Voter ID (EPIC), Name, Age, Gender, and Relation mapping." },
    { q: "Do you offer state-wide data?", a: "Yes. Contact our analyst desk for institutional volume rates." }
  ];
  return (
    <section className="px-4 py-12 max-w-4xl mx-auto">
      <SectionHeader badge="Assistance" title="Common Queries" subtitle="Clarifications on our methodology." centered />
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-display font-black text-slate-950 flex items-center gap-4 tracking-tight uppercase leading-none"><HelpCircle className="w-6 h-6 text-amber-500 shrink-0" /> {faq.q}</h3>
            <p className="text-slate-500 mt-4 leading-relaxed font-medium pl-10 text-base italic">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
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
        setTimeout(() => setVisible(false), 6000);
      }
    };
    const interval = setInterval(trigger, 25000);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-8 left-8 z-[250] animate-slide-up hidden md:block">
      <div className="bg-slate-950 text-white p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-white/5">
        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg text-slate-950"><Activity className="w-5 h-5" /></div>
        <div>
          <p className="text-[8px] font-black text-amber-500 uppercase tracking-widest">Live Extraction</p>
          <p className="text-sm font-bold tracking-tighter uppercase">{order.name}, {order.state}</p>
        </div>
      </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in">
       <div className="bg-white w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
             <div>
                <h3 className="text-3xl font-display font-black text-slate-950 tracking-tighter uppercase leading-none">19-Column Output</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Standard Metadata Registry Protocol</p>
             </div>
             <button onClick={onClose} className="p-3 bg-slate-100 rounded-full hover:bg-slate-950 hover:text-white transition-all"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-8 overflow-auto flex-1 bg-white">
             <table className="w-full text-left border-separate border-spacing-0 bg-white border border-slate-100 rounded-xl overflow-hidden">
                <thead>
                   <tr className="bg-slate-950 text-white uppercase text-[9px] tracking-widest font-black">
                      <th className="p-6">District</th><th className="p-6">Legislative AC</th><th className="p-6">Voter ID</th><th className="p-6">Identity</th><th className="p-6">Relation</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs font-bold text-slate-600">
                   <tr className="hover:bg-slate-50 transition-all"><td className="p-6">Amritsar</td><td className="p-6">Ajnala</td><td className="p-6 text-amber-600">IFC262XXXX</td><td className="p-6">Kuldeep Singh</td><td className="p-6">47 / M (GURMEJ)</td></tr>
                   <tr className="hover:bg-slate-50 transition-all"><td className="p-6">Kolkata South</td><td className="p-6">Ballygunge</td><td className="p-6 text-emerald-600">WB/32/XXXX</td><td className="p-6">Debasish Roy</td><td className="p-6">52 / M (ASHOK)</td></tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}

export default App;
