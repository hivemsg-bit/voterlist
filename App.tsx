
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, Zap, 
  FileSpreadsheet, ShieldCheck, ArrowUpRight, Layers, 
  HelpCircle, Activity, Eye, Mail, MessageSquare, Send, 
  Rocket, LayoutDashboard, Database, Target, Lock, Download
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Reusable Styled Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'amber' | 'green' | 'red' | 'purple' | 'crimson', className?: string }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    crimson: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border uppercase tracking-wider ${styles[variant]} whitespace-nowrap inline-flex items-center gap-1.5 ${className}`}>
      {children}
    </span>
  );
};

const PremiumLogo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:bg-blue-600 transition-all duration-500 overflow-hidden transform group-hover:scale-105">
        <Database className="w-5 h-5 md:w-7 md:h-7 relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full animate-bounce shadow-lg"></div>
    </div>
    <div className="flex flex-col">
      <h1 className="text-xl md:text-2xl font-display font-extrabold tracking-tighter text-slate-900 leading-none">
        VOTERLIST<span className="text-blue-600">EXCEL</span>
      </h1>
      <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 flex items-center gap-1.5">
        <span className="w-3 h-[2px] bg-blue-600 rounded-full"></span> PREMIER DATA HUB
      </span>
    </div>
  </div>
);

const SectionHeader = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-16 space-y-4 ${centered ? 'text-center' : ''}`}>
    <Badge variant="blue">{badge}</Badge>
    <h2 className="text-3xl md:text-6xl font-display font-bold text-slate-900 uppercase tracking-tight leading-none">
      {title}
    </h2>
    <p className="text-slate-500 font-medium text-sm md:text-lg max-w-2xl mx-auto italic">
      {subtitle}
    </p>
  </div>
);

const PunjabSpecialHero = ({ onAction }: { onAction: () => void }) => (
  <div className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-8 md:p-16 mb-20 text-white shadow-2xl border border-white/5 ring-1 ring-white/10">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[120px] -z-10"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-500/10 blur-[100px] -z-10"></div>
    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-xs uppercase tracking-widest">
           <Rocket className="w-4 h-4 animate-bounce" /> Strategic Hub: Punjab 2026
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-bold leading-tight">
          Punjab <span className="text-blue-500">2026</span> <br/>
          <span className="text-slate-400">Data Node Active</span>
        </h2>
        <p className="text-slate-400 text-lg font-medium max-w-xl">
          Verified preliminary 2026 electoral rolls for all 117 Assembly constituencies. Clean, 19-column structured Excel format.
        </p>
        <button 
          onClick={onAction}
          className="group bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 flex items-center gap-4 mx-auto md:mx-0"
        >
          Access Punjab Data <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="hidden lg:flex flex-col gap-6 w-1/4">
         <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <h4 className="text-4xl font-bold text-blue-400">117</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Full AC Segments</p>
         </div>
         <div className="bg-emerald-500/5 p-8 rounded-[2rem] border border-emerald-500/20 backdrop-blur-md">
            <h4 className="text-4xl font-bold text-emerald-500">Live</h4>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Real-time Extraction</p>
         </div>
      </div>
    </div>
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
  }, [activeState, view]);

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
    <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-10 bg-[#f8fafc]">
      <OrderNotification />
      
      {/* IMPROVED NAVIGATION: No more overlap */}
      <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-28 flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleHome}>
            <PremiumLogo />
          </div>
          <div className="flex items-center gap-4 md:gap-12">
            <div className="hidden lg:flex items-center gap-10">
               {['Data Archives', 'Campaign Insights', 'Pricing'].map((item) => (
                 <button 
                  key={item}
                  onClick={() => item === 'Data Archives' ? document.getElementById('states')?.scrollIntoView({behavior: 'smooth'}) : null}
                  className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] hover:text-blue-600 transition-all hover:translate-y-[-1px]"
                 >
                   {item}
                 </button>
               ))}
            </div>
            <button 
              onClick={() => setView('CONTACT')} 
              className="bg-slate-900 hover:bg-blue-600 text-white px-5 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-blue-300/50 active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> SUPPORT DESK
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-28 md:pt-40">
        {view === 'HOME' ? (
          <>
            <section className="px-4 py-16 md:py-28 max-w-7xl mx-auto text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full mb-12 shadow-md animate-fade-in ring-4 ring-slate-50">
                <Badge variant="blue" className="animate-pulse">Live Extraction</Badge>
                <span className="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">2026 Elector Rolls Synchronized</span>
              </div>
              <h1 className="text-4xl md:text-8xl font-display font-bold text-slate-900 leading-[0.95] mb-12 tracking-tighter text-balance uppercase">
                Download Authentic <br/>
                <span className="text-blue-600 italic">Voter List</span> in Excel
              </h1>
              <p className="text-slate-500 text-sm md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-20 px-4">
                Political precision metadata. Specialized datasets for <span className="text-slate-900 font-bold">Punjab 2026</span> and <span className="text-slate-900 font-bold">West Bengal</span> high-volume target segments.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-blue-600 text-white px-14 py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  START SEARCH <ChevronRight className="w-5 h-5 ml-2 inline" />
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 px-14 py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm"
                >
                  <Eye className="w-5 h-5" /> VIEW SAMPLE
                </button>
              </div>
            </section>

            <section className="px-4 max-w-7xl mx-auto">
               <PunjabSpecialHero onAction={() => {
                 const pb = INDIAN_STATES.find(s => s.code === 'PB');
                 if (pb) selectState(pb);
               }} />
            </section>

            <section id="states" className="px-4 py-20 max-w-7xl mx-auto">
              <SectionHeader 
                badge="Data Registry" 
                title="Regional Archives" 
                subtitle="Select your target state to explore constituency-wise extraction nodes."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {INDIAN_STATES.map((state) => {
                  const isPunjab = state.code === 'PB';
                  const isWB = state.code === 'WB';
                  const isHighPriority = isPunjab || isWB;

                  return (
                    <div 
                      key={state.id}
                      onClick={() => selectState(state)}
                      className={`group relative h-80 rounded-[4rem] overflow-hidden hover-lift cursor-pointer transition-all duration-700 ${
                        isPunjab ? 'ring-4 ring-blue-600/30 bg-blue-50/50' : 
                        isWB ? 'ring-4 ring-rose-600/30 bg-rose-50/50' : 
                        'glass-card bg-white'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                        isPunjab ? 'from-blue-600/20 to-transparent' : 
                        isWB ? 'from-rose-600/20 to-transparent' : 
                        'from-slate-100 to-transparent'
                      }`}></div>
                      
                      <div className="p-14 flex flex-col justify-between h-full relative z-10">
                         <div className="flex justify-between items-start">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl transition-all duration-700 group-hover:rotate-[360deg] ${
                              isPunjab ? 'bg-blue-600 text-white' : 
                              isWB ? 'bg-rose-600 text-white' : 
                              'bg-slate-900 text-white'
                            }`}>
                               {state.code}
                            </div>
                            {isPunjab && <Badge variant="blue" className="shadow-lg border-blue-200">2026 Ready</Badge>}
                            {isWB && <Badge variant="crimson" className="shadow-lg border-rose-200">High Volume</Badge>}
                         </div>
                         <div className="space-y-3">
                            <h3 className="text-3xl font-display font-extrabold text-slate-900 tracking-tighter uppercase leading-none">{state.name}</h3>
                            <div className="flex items-center gap-4">
                               <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isHighPriority ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">{state.totalSeats} AC Nodes</span>
                            </div>
                         </div>
                      </div>
                      <div className={`absolute bottom-0 left-0 w-full h-2 transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100 ${
                        isPunjab ? 'bg-blue-600' : isWB ? 'bg-rose-600' : 'bg-slate-900'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </section>

            <TrustSection />
            <HowItWorks />
            <BlogSection />
            <LegalDisclaimer />
            <FAQSection />
          </>
        ) : view === 'STATE_VIEW' && activeState ? (
          <StateView 
            state={activeState} 
            onBack={() => setView('HOME')} 
            onBuy={(ac) => { setSelectedAC(ac); setIsModalOpen(true); }}
            onContact={() => setView('CONTACT')}
          />
        ) : view === 'CONTACT' ? (
          <ContactView onBack={() => setView('HOME')} />
        ) : null}
      </main>

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ac={selectedAC} stateName={activeState?.name} />
      <SamplePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      <footer className="mt-32 px-4 py-24 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 items-start">
          <div className="space-y-8 max-w-sm">
            <PremiumLogo />
            <p className="text-slate-500 text-base font-medium leading-relaxed">
              India's premier electoral node for verified data extraction. Serving high-impact campaigns with precision metadata since 2019.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">REGISTRY</h4>
              <ul className="text-xs font-black text-slate-900 space-y-5 uppercase tracking-widest">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('HOME')}>Archives</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('CONTACT')}>Expert Desk</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">LEGAL</h4>
              <ul className="text-xs font-black text-slate-900 space-y-5 uppercase tracking-widest">
                <li className="hover:text-blue-600 cursor-pointer">Data Privacy</li>
                <li className="hover:text-blue-600 cursor-pointer">EC Guidelines</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">© 2025 VOTERLISTEXCEL.IN • VERIFIED EXTRACTION NODE</p>
          <div className="flex items-center gap-10">
            <Badge variant="blue" className="shadow-sm">High Security Node</Badge>
            <ShieldCheck className="w-6 h-6 text-slate-300" />
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Sub-Views ---

const StateView = ({ state, onBack, onBuy, onContact }: { state: StateData, onBack: () => void, onBuy: (ac: AssemblyConstituency) => void, onContact: () => void }) => {
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
    <div className="max-w-7xl mx-auto px-4 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-16 transition-all hover:translate-x-[-4px]">
        <ArrowLeft className="w-4 h-4" /> EXIT TO ARCHIVES
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold">{state.code}</div>
             <Badge variant="blue">Legislative Node Active</Badge>
          </div>
          <h2 className="text-4xl md:text-8xl font-display font-bold text-slate-900 uppercase tracking-tighter leading-none">{state.name}</h2>
          <p className="text-slate-400 font-medium text-xl md:text-2xl italic">Download <strong>Voter List Excel</strong> for {state.code === 'PB' ? '2026' : '2025-26'}.</p>
        </div>
        <div className="w-full lg:w-[36rem] relative">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search AC Name or No..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-[2.5rem] py-7 pl-18 pr-10 focus:border-blue-600 focus:ring-8 focus:ring-blue-50 outline-none font-bold text-lg shadow-2xl shadow-slate-200/50 transition-all"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 mb-24 relative overflow-hidden text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/5">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/20 blur-[120px] -z-10"></div>
         <div className="relative space-y-12">
            <div className="flex items-center gap-5">
               <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-600/40">
                  <Sparkles className="w-7 h-7 text-blue-400" />
               </div>
               <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">ALGORITHMIC DEMOGRAPHIC INSIGHT</span>
            </div>
            {loading ? <div className="animate-pulse space-y-6"><div className="h-12 bg-white/5 rounded-2xl w-full"></div><div className="h-12 bg-white/5 rounded-2xl w-3/4"></div></div> : <p className="text-3xl md:text-6xl font-medium italic text-slate-100 leading-[1.15] tracking-tight">"{insight}"</p>}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map(ac => (
          <div key={ac.id} className="bg-white p-14 rounded-[4rem] border border-slate-100 hover-lift flex flex-col justify-between group shadow-lg shadow-slate-100/50 hover:shadow-2xl">
            <div className="space-y-12">
               <div className="flex justify-between items-center">
                  <div className="w-18 h-18 bg-slate-50 text-slate-400 font-black rounded-[2rem] flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-inner">
                    {ac.number}
                  </div>
                  <Badge variant="green" className="shadow-md border-emerald-100">{ac.dataYear}</Badge>
               </div>
               <div>
                  <h4 className="text-4xl font-display font-extrabold text-slate-900 mb-3 truncate uppercase tracking-tighter">{ac.name}</h4>
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Ready for Extraction</p>
                  </div>
               </div>
            </div>
            <div className="mt-16 pt-12 border-t border-slate-100 flex items-center justify-between">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Extract Rate</span>
                  <span className="text-4xl font-bold text-slate-900 tracking-tighter">₹{ac.price}</span>
               </div>
               <button onClick={() => onBuy(ac)} className="bg-slate-900 hover:bg-blue-600 text-white px-12 py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl transition-all active:scale-95 hover:translate-y-[-2px]">GET EXCEL</button>
            </div>
          </div>
        ))}
        {/* Bulk Data Call to Action */}
        <div className="bg-blue-600 p-14 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-10 shadow-2xl shadow-blue-200">
           <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center backdrop-blur-md border border-white/20">
              <Layers className="w-12 h-12 text-white" />
           </div>
           <div>
              <p className="text-lg font-black text-white uppercase tracking-widest">BULK DATA REQUEST?</p>
              <p className="text-blue-100 text-sm mt-3 font-medium opacity-80">Full-State or District-wide professional packages available.</p>
           </div>
           <button onClick={onContact} className="w-full bg-white text-blue-600 px-10 py-7 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.4em] hover:bg-slate-900 hover:text-white transition-all shadow-xl">SPEAK TO ANALYST</button>
        </div>
      </div>
    </div>
  );
};

const TrustSection = () => (
  <section className="px-4 py-40 max-w-7xl mx-auto">
    <SectionHeader 
      badge="Trust Protocol" 
      title="Precision Metadata" 
      subtitle="The legislative data standard for Indian political micro-targeting."
      centered
    />
    <div className="grid md:grid-cols-4 gap-12">
      {[
        { icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, title: "Verified Node", desc: "Multi-tier extraction verification." },
        { icon: <Target className="w-10 h-10 text-emerald-600" />, title: "19-Column Structure", desc: "Ready for booth-level micro-analysis." },
        { icon: <Zap className="w-10 h-10 text-amber-600" />, title: "Instant Sync", desc: "WhatsApp delivery in under 5 minutes." },
        { icon: <Lock className="w-10 h-10 text-rose-600" />, title: "Secure Transfer", desc: "Fully encrypted data handoff protocols." }
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-xl hover-lift text-center group">
          <div className="mb-10 bg-slate-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner group-hover:bg-blue-600 transition-colors duration-500 group-hover:text-white">{item.icon}</div>
          <h4 className="text-2xl font-display font-extrabold text-slate-900 mb-5 tracking-tight uppercase">{item.title}</h4>
          <p className="text-slate-500 text-base font-medium leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="px-4 py-28 bg-slate-900 rounded-[6rem] mx-4 my-20 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[150px]"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <SectionHeader 
        badge="Extraction Flow" 
        title="Zero Friction Link" 
        subtitle="Our streamlined node ensures you receive data via secure WhatsApp link."
        centered
      />
      <div className="grid md:grid-cols-3 gap-16">
        {[
          { icon: <Search className="w-7 h-7" />, title: "Registry Search", desc: "Locate your constituency segment in our data hub." },
          { icon: <MessageSquare className="w-7 h-7" />, title: "WhatsApp Sync", desc: "Confirm your order with our automated desk." },
          { icon: <Download className="w-7 h-7" />, title: "Excel Link", desc: "Instant professional link for your 19-column data." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/5 p-16 rounded-[5rem] border border-white/10 text-center space-y-10 relative group backdrop-blur-sm">
            <div className="w-24 h-24 bg-blue-600 text-white rounded-[3rem] flex items-center justify-center absolute -top-12 left-1/2 -translate-x-1/2 shadow-[0_20px_50px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
              {item.icon}
            </div>
            <h4 className="text-3xl font-display font-bold pt-12 uppercase tracking-tighter">{item.title}</h4>
            <p className="text-slate-400 text-base font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlogSection = () => {
  const blogs = [
    { title: "Punjab 2026: Strategic Value of 19-Column Data", category: "Strategy", date: "Feb 2, 2025" },
    { title: "West Bengal: Booth-Level Demographics for 2026", category: "Intel", date: "Jan 28, 2025" },
    { title: "How to use Voter List Excel for Bulk SMS Targeting", category: "Tech", date: "Jan 15, 2025" }
  ];

  return (
    <section className="px-4 py-32 max-w-7xl mx-auto">
      <SectionHeader 
        badge="Strategy Intelligence" 
        title="Election Intel Hub" 
        subtitle="Guides on maximizing the impact of your premium electoral metadata."
      />
      <div className="grid md:grid-cols-3 gap-12">
        {blogs.map((blog, idx) => (
          <div key={idx} className="bg-white p-14 rounded-[4.5rem] border border-slate-100 hover:border-blue-200 shadow-2xl shadow-slate-200/50 transition-all group cursor-pointer hover-lift">
             <div className="flex justify-between items-center mb-12">
                <Badge variant="amber">{blog.category}</Badge>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{blog.date}</span>
             </div>
             <h4 className="text-3xl font-display font-extrabold text-slate-900 leading-none mb-14 group-hover:text-blue-600 transition-colors uppercase tracking-tighter">{blog.title}</h4>
             <div className="flex items-center gap-4 text-[11px] font-black text-blue-600 uppercase tracking-[0.4em]">
                Read Article <ArrowUpRight className="w-5 h-5" />
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-8 bg-slate-900/95 backdrop-blur-2xl animate-fade-in">
       <div className="bg-white w-full max-w-2xl rounded-t-[5rem] md:rounded-[6rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.5)] animate-slide-up">
          <div className="p-14 md:p-20 space-y-16">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                   <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[3rem] flex items-center justify-center border border-blue-100 shadow-inner"><FileSpreadsheet className="w-12 h-12" /></div>
                   <div className="space-y-1">
                      <h3 className="text-4xl font-display font-extrabold text-slate-900 leading-none tracking-tighter uppercase">Order Data</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Legislative Segment Verified</p>
                   </div>
                </div>
                <button onClick={onClose} className="p-5 bg-slate-100 rounded-full hover:bg-slate-900 hover:text-white transition-all"><X className="w-8 h-8" /></button>
             </div>
             <div className="bg-slate-50 border border-slate-200 rounded-[4rem] p-16 space-y-16 shadow-inner">
                <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-5">Constituency Node</p>
                   <h4 className="text-6xl font-display font-extrabold text-slate-900 uppercase tracking-tighter leading-none">{ac.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-12 pt-16 border-t border-slate-200">
                   <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">File Format</p>
                      <p className="text-lg font-bold text-slate-900 uppercase tracking-widest">Excel Node (.xlsx)</p>
                   </div>
                   <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Access Fee</p>
                      <p className="text-5xl font-bold text-blue-600 tracking-tighter leading-none">₹{ac.price}</p>
                   </div>
                </div>
             </div>
             <button 
              onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for AC: ${ac.name} (${stateName})`, '_blank')}
              className="w-full bg-blue-600 hover:bg-slate-900 text-white py-9 rounded-[2.5rem] font-black uppercase tracking-[0.5em] shadow-[0_30px_60px_-10px_rgba(37,99,235,0.4)] transition-all active:scale-95 text-sm"
             >
               CONFIRM EXTRACTION
             </button>
          </div>
       </div>
    </div>
  );
};

const ContactView = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', state: '', ac: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Data Enquiry from VoterListExcel.in:\nName: ${formData.name}\nPhone: ${formData.phone}\nState: ${formData.state}\nAC: ${formData.ac}`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 animate-fade-in py-12">
      <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] mb-24 transition-all hover:translate-x-[-4px]">
        <ArrowLeft className="w-4 h-4" /> RETURN TO HOME
      </button>
      <div className="grid lg:grid-cols-2 gap-32 items-start">
        <div className="space-y-16">
           <Badge variant="amber">Expert Consultation</Badge>
           <h2 className="text-5xl md:text-9xl font-display font-extrabold text-slate-900 uppercase leading-[0.85] tracking-tighter">Secure <br/> <span className="text-blue-600">Data Desk</span></h2>
           <p className="text-slate-500 font-medium text-xl md:text-2xl leading-relaxed max-w-lg italic">
             Our legislative analysts are standing by. Connect with us for state-wide extraction or custom demographic nodes.
           </p>
           <div className="space-y-12 pt-12">
              <div 
                onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
                className="flex items-center gap-8 text-slate-900 font-bold text-3xl cursor-pointer hover:text-blue-600 transition-all group"
              >
                 <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"><MessageSquare className="w-10 h-10" /></div>
                 Secure WhatsApp Node
              </div>
              <div className="flex items-center gap-8 text-slate-900 font-bold text-3xl group">
                 <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500"><Mail className="w-10 h-10" /></div>
                 support@voterlistexcel.in
              </div>
           </div>
        </div>
        <div className="bg-white p-14 md:p-24 rounded-[6rem] border border-slate-100 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.1)] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] -z-10"></div>
           <form onSubmit={handleSubmit} className="space-y-12">
              <h3 className="text-4xl font-display font-extrabold text-slate-900 mb-16 uppercase tracking-tighter">Instant Request</h3>
              <div className="space-y-10">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Full Identity</label>
                    <input required type="text" placeholder="Candidate or Analyst Name" className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] py-7 px-12 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-lg shadow-inner" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Secure Mobile</label>
                    <input required type="tel" placeholder="+91 Node Number" className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] py-7 px-12 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-lg shadow-inner" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                 </div>
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Target State</label>
                        <input required type="text" placeholder="Punjab, WB..." className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] py-7 px-12 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-lg shadow-inner" onChange={(e) => setFormData({...formData, state: e.target.value})}/>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] ml-3">Legislative AC</label>
                        <input required type="text" placeholder="AC Name/No" className="w-full bg-slate-50 border-2 border-transparent rounded-[2rem] py-7 px-12 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-lg shadow-inner" onChange={(e) => setFormData({...formData, ac: e.target.value})}/>
                    </div>
                 </div>
              </div>
              <button type="submit" className="w-full bg-slate-900 hover:bg-blue-600 text-white py-10 rounded-[2.5rem] font-black uppercase tracking-[0.6em] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-5 active:scale-95 mt-16 text-sm">INITIATE EXTRACTION <Send className="w-6 h-6" /></button>
           </form>
        </div>
      </div>
    </div>
  );
};

const LegalDisclaimer = () => (
  <section className="px-4 py-24 max-w-6xl mx-auto">
    <div className="bg-slate-900 text-white rounded-[5rem] p-16 md:p-24 flex flex-col md:flex-row gap-16 items-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-full bg-blue-600/10 blur-[100px] -z-10"></div>
      <div className="w-32 h-32 bg-blue-600 rounded-[3rem] flex items-center justify-center shrink-0 shadow-[0_30px_60px_rgba(37,99,235,0.4)]">
        <ShieldCheck className="w-16 h-16" />
      </div>
      <div className="space-y-8">
        <h4 className="text-3xl font-display font-extrabold uppercase tracking-tight leading-none">Privacy & Usage Protocol</h4>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          voterlistexcel.in provides independent metadata extraction services for strategic analysis. All data remains subject to Election Commission guidelines and regional privacy mandates. We empower analysts with structured, clean legislative nodes.
        </p>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    { q: "Is the Punjab 2026 registry currently live?", a: "Yes, our Punjab 2026 data nodes are synchronized with the latest preliminary electoral rolls updated for the upcoming legislative polls." },
    { q: "What fields are included in the 19-Column structure?", a: "Standard fields include Voter ID (EPI), Names (Local & English), Age, Gender, Booth Registry, and Strategic Relation mapping." },
    { q: "Do you offer state-wide institutional bulk data?", a: "Certainly. We provide district-wide and state-wide institutional datasets at professional volume rates. Contact our analyst desk for a custom quote." }
  ];
  return (
    <section className="px-4 py-40 max-w-5xl mx-auto">
      <SectionHeader badge="Support" title="Common Queries" subtitle="Clarifications on our extraction methodology and sync protocols." centered />
      <div className="space-y-10">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-[4rem] p-16 hover:border-blue-200 shadow-xl transition-all shadow-slate-200/40">
            <h3 className="text-3xl font-display font-extrabold text-slate-900 flex items-center gap-8 tracking-tighter leading-none"><HelpCircle className="w-10 h-10 text-blue-600 shrink-0" /> {faq.q}</h3>
            <p className="text-slate-500 mt-10 leading-relaxed font-medium pl-18 text-xl italic opacity-80">{faq.a}</p>
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
    const interval = setInterval(trigger, 22000);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-12 left-12 z-[250] animate-slide-up hidden md:block">
      <div className="bg-slate-900 text-white p-7 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex items-center gap-8 border border-white/10 backdrop-blur-xl">
        <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl animate-pulse"><Activity className="w-9 h-9" /></div>
        <div>
          <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em] mb-2">Live Extraction Node</p>
          <p className="text-lg font-bold tracking-tighter uppercase">{order.name}, {order.state}</p>
        </div>
        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping ml-6"></div>
      </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-3xl animate-fade-in">
       <div className="bg-white w-full max-w-7xl rounded-[5rem] overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,0.6)] flex flex-col max-h-[92vh]">
          <div className="p-16 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div className="space-y-3">
                <h3 className="text-5xl font-display font-extrabold text-slate-900 tracking-tighter uppercase leading-none">Standard 19-Column Output</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-1">Legislative Metadata Registry Protocol</p>
             </div>
             <button onClick={onClose} className="p-6 bg-white rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-xl"><X className="w-10 h-10" /></button>
          </div>
          <div className="p-16 overflow-auto flex-1 bg-white">
             <div className="bg-slate-900 text-white p-14 rounded-[4rem] mb-16 flex items-center justify-between shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-1/4 h-full bg-blue-600/20 blur-[100px]"></div>
                <div className="space-y-3 relative z-10">
                   <p className="font-bold text-2xl uppercase tracking-tighter leading-none">Verified Node Extraction</p>
                   <p className="text-slate-400 text-base opacity-80 max-w-md font-medium">The industry standard format for verified political demographics.</p>
                </div>
                <div className="flex items-center gap-4 px-8 py-4 bg-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-white/10 backdrop-blur-md">Node Active</div>
             </div>
             <table className="w-full text-left border-separate border-spacing-0 bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-2xl">
                <thead>
                   <tr className="bg-slate-50 text-slate-900 uppercase text-[11px] tracking-[0.3em] font-black">
                      <th className="p-10 border-b border-slate-100">Regional District</th>
                      <th className="p-10 border-b border-slate-100">Legislative AC</th>
                      <th className="p-10 border-b border-slate-100">Voter ID (EPI)</th>
                      <th className="p-10 border-b border-slate-100">Identity Node</th>
                      <th className="p-10 border-b border-slate-100">Demo/Relation</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   <tr className="text-lg font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-default">
                      <td className="p-10">Amritsar</td><td className="p-10">Ajnala</td><td className="p-10 text-blue-600 font-black">IFC262XXXX</td><td className="p-10">Kuldeep Singh</td><td className="p-10">47 / M (GURMEJ)</td>
                   </tr>
                   <tr className="text-lg font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-default">
                      <td className="p-10">Ludhiana</td><td className="p-10">Gill</td><td className="p-10 text-rose-600 font-black">PB/12/XXXX</td><td className="p-10">Simran Kaur</td><td className="p-10">39 / F (AVTAR)</td>
                   </tr>
                   <tr className="text-lg font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-default opacity-60">
                      <td className="p-10">Kolkata South</td><td className="p-10">Ballygunge</td><td className="p-10 text-emerald-600 font-black">WB/32/XXXX</td><td className="p-10">Debasish Roy</td><td className="p-10">52 / M (ASHOK)</td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}

export default App;
