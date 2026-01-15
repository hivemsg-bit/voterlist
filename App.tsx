import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, 
  FileSpreadsheet, ShieldCheck, Activity, Eye, 
  MessageSquare, Send, Database, Target, Lock, Zap, HelpCircle, ChevronDown, CheckCircle2, UserCheck,
  Grid3X3, Download, MapPin, TrendingUp, ShieldAlert, Clock, Users, Gift
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Custom Hook for Dynamic SEO ---
const usePageSEO = (view: ViewState, state: StateData | null) => {
  useEffect(() => {
    let title = "Voter List Excel Download 2025 | Booth Wise Data India";
    let desc = "Download 2025-26 Voter List in Excel. Booth-wise data for Punjab, WB, UP. Perfect for Panna Pramukh & political campaign management. Instant WhatsApp Delivery.";

    if (view === 'STATE_VIEW' && state) {
      title = `${state.name} Voter List Excel Download 2025 | Verified Booth Data`;
      desc = `Download official ${state.name} 2025 Voter List in Excel. Accurate booth & ward wise data for ${state.name} elections. Format: CSV/Excel.`;
    } else if (view === 'CONTACT') {
      title = "Contact for Bulk Voter Data | VoterListExcel.in";
      desc = "Get full state voter list excel at 40% discount. Contact our data experts for custom survey formats.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [view, state]);
};

// --- Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'green' | 'amber' | 'slate' | 'whatsapp' | 'red', className?: string }) => {
  const styles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    whatsapp: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20',
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

const FloatingWhatsApp = () => (
  <div className="fixed bottom-6 right-6 z-[999] group flex items-center gap-3">
    <div className="bg-slate-900 border border-slate-800 text-white px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-2xl">
      Chat with Admin
    </div>
    <button 
      onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, I want to inquire about Voter List Excel.`, '_blank')}
      className="w-14 h-14 bg-[#25D366] text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform active:scale-95 animate-pulse-soft"
    >
      <MessageSquare className="w-7 h-7" />
    </button>
  </div>
);

const VisitorCounter = () => {
  const [count, setCount] = useState(12);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => Math.max(8, Math.min(24, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-500 animate-pulse">
      <Users className="w-3 h-3" /> {count} People viewing this constituency right now
    </div>
  );
};

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  usePageSEO(view, activeState);

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
    <div className="min-h-screen pb-10">
      <OrderNotification />
      <FloatingWhatsApp />
      
      <nav className="fixed top-0 w-full z-[100] glass-nav h-14 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleHome}>
            <PremiumLogo />
          </div>
          <button 
            onClick={() => setView('CONTACT')} 
            className="bg-[#25D366] hover:bg-[#20bd5a] text-black px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-1.5 shadow-lg"
          >
            <Phone className="w-3 h-3" /> Get Bulk Discount
          </button>
        </div>
      </nav>

      <main className="pt-14">
        {view === 'HOME' ? (
          <>
            <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
              
              <div className="flex flex-col items-center gap-4 mb-8">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
                    <Badge variant="whatsapp" className="animate-pulse">Live: 2026 Elections</Badge>
                    <h2 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Verified Election Data Hub</h2>
                 </div>
                 <div className="flex items-center gap-4 text-[9px] font-black text-emerald-500 uppercase">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Instant Download</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 100% Reliable</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Hindi/English Support</span>
                 </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[1] text-white">
                Download <span className="text-blue-500">Voter List</span> <br/>
                Excel & CSV (2025)
              </h1>
              <p className="text-slate-400 text-xs md:text-lg max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
                Unlock high-precision booth-level data for <span className="text-blue-400">Winning Campaigns</span>. 
                Full 19-Column format with <span className="text-emerald-400">Age, Family Groupings & Booth Sorting</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" /> Start Choosing State
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> See 19 Columns
                </button>
              </div>

              <div className="mt-8 flex justify-center items-center gap-8 opacity-60">
                 <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-white">10K+</span>
                    <span className="text-[7px] uppercase font-bold text-slate-500">Downloads</span>
                 </div>
                 <div className="w-px h-8 bg-slate-800"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-white">100%</span>
                    <span className="text-[7px] uppercase font-bold text-slate-500">Accuracy</span>
                 </div>
                 <div className="w-px h-8 bg-slate-800"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-white">24/7</span>
                    <span className="text-[7px] uppercase font-bold text-slate-500">Support</span>
                 </div>
              </div>
            </section>

            {/* URGENCY ALERT */}
            <section className="px-4 max-w-7xl mx-auto mb-10">
               <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center"><Gift className="w-6 h-6" /></div>
                     <div>
                        <h3 className="text-xs font-black uppercase text-white">Punjab Election Special Offer!</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Buy Full State Data & Get 50% Off. Limited Time only.</p>
                     </div>
                  </div>
                  <button onClick={() => setView('CONTACT')} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase">Claim Offer</button>
               </div>
            </section>

            <section id="states" className="px-4 py-8 max-w-7xl mx-auto">
              <div className="mb-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
                <div className="text-center md:text-left border-l-4 border-blue-600 pl-4">
                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white">Constituency Database</h2>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Official Matdata Suchi Format (2025-26)</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="green">Punjab</Badge>
                  <Badge variant="blue">UP</Badge>
                  <Badge variant="amber">Delhi</Badge>
                  <Badge variant="red">Bihar</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {INDIAN_STATES.map((state) => (
                  <article 
                    key={state.id}
                    onClick={() => selectState(state)}
                    className="p-5 rounded-2xl border border-slate-800 hover-lift cursor-pointer glass-card group"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-10 h-10 bg-slate-900 border border-slate-800 text-blue-500 rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         {state.code}
                      </div>
                      <Badge variant="slate" className="!text-[7px]">Verified</Badge>
                    </div>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white">{state.name}</h3>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">{state.totalSeats} AC Nodes Live</p>
                  </article>
                ))}
              </div>
            </section>

            <TrustSection />
            <Testimonials />
            <FAQSection /> 
            <DataCoverageIndex />
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

      <footer className="mt-12 px-4 py-10 border-t border-slate-900 bg-brand-midnight">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">
          <PremiumLogo />
          <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setView('HOME')}>Home</span>
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setView('CONTACT')}>Bulk Discount</span>
            <span className="hover:text-blue-500 cursor-pointer">Privacy</span>
          </div>
          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest text-center md:text-right">
            © 2025 VOTERLISTEXCEL.IN <br/>
            Secure Encryption Active
          </p>
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
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-500 text-[9px] font-black uppercase tracking-widest mb-10 group transition-all">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO REGIONS
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
        <div className="space-y-3">
          <Badge variant="blue">State Verified</Badge>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">{state.name} Voter List</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl">
            Latest 2025 electoral nodes for {state.name}. Format: Excel with family grouping and ward sorting. Instant delivery.
          </p>
          <div className="flex items-center gap-3">
             <VisitorCounter />
          </div>
        </div>
        <div className="w-full lg:w-[28rem] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
          <input 
            type="text" 
            placeholder={`Find ${state.name} Constituency...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-600 outline-none font-bold text-sm transition-all shadow-xl"
          />
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 mb-10 border-blue-900/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full"></div>
         <div className="flex items-center gap-3 mb-3 relative z-10">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Strategic Demographic Insight</span>
         </div>
         {loading ? (
            <div className="space-y-2 relative z-10">
              <div className="animate-pulse h-4 bg-slate-800 rounded w-full"></div>
              <div className="animate-pulse h-4 bg-slate-800 rounded w-2/3"></div>
            </div>
         ) : (
            <p className="text-sm md:text-lg font-bold italic text-slate-200 relative z-10 leading-relaxed">"{insight}"</p>
         )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(ac => (
          <div key={ac.id} className="p-6 rounded-2xl glass-card hover-lift group border-slate-800 flex flex-col justify-between h-full relative overflow-hidden">
            {ac.number % 5 === 0 && (
              <div className="absolute top-0 right-0 bg-amber-500 text-black font-black text-[7px] px-3 py-1 uppercase tracking-widest rounded-bl-lg z-10">Best Seller</div>
            )}
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">No. {ac.number}</span>
                <Badge variant="whatsapp" className="!text-[8px]">Available</Badge>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-4 group-hover:text-blue-500 transition-colors">{ac.name}</h4>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-6">Booth-Wise Excel Data</p>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-slate-800/50 mt-auto">
               <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-500 line-through mb-0.5">₹{ac.price + 1000}</span>
                  <span className="text-lg font-black text-emerald-400">₹{ac.price}</span>
               </div>
               <button 
                  onClick={() => onBuy(ac)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
               >
                 BUY DATA
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sections ---

const TrustSection = () => (
  <section className="px-4 py-16 max-w-7xl mx-auto">
    <div className="text-center mb-10">
       <h3 className="text-xl md:text-3xl font-black uppercase text-white tracking-tighter">Why Choose VoterListExcel.in?</h3>
       <p className="text-[10px] font-bold text-slate-500 uppercase mt-2 tracking-widest">Humare data ki khasiyat</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Verified Format", desc: "Official Column Structure" },
        { icon: <Target className="w-6 h-6" />, title: "Booth Sorting", desc: "Easy Panna Pramukh Use" },
        { icon: <Zap className="w-6 h-6" />, title: "Fast Sync", desc: "WhatsApp Instant Delivery" },
        { icon: <Lock className="w-6 h-6" />, title: "Data Privacy", desc: "Confidential Consulting" }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col gap-4 p-6 glass-card rounded-2xl border-slate-800 text-center items-center">
          <div className="text-blue-500 bg-blue-500/10 p-4 rounded-xl">{item.icon}</div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-2">{item.title}</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section className="px-4 py-12 max-w-5xl mx-auto">
    <div className="text-center mb-10">
      <Badge variant="slate">Social Proof</Badge>
      <h3 className="text-2xl md:text-4xl font-black uppercase text-white mt-4 tracking-tighter">Don't Take Our Word For It</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass-card p-8 rounded-2xl border-slate-800 relative">
        <div className="absolute -top-3 left-8 bg-blue-600 text-white px-3 py-1 rounded text-[7px] font-black uppercase">Verified Order</div>
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <TrendingUp key={i} className="w-3 h-3 text-emerald-500" />)}
        </div>
        <p className="text-xs md:text-sm text-slate-300 italic mb-6 leading-relaxed">
          "Panna pramukh list banane mein bahot help mili. Excel format perfect tha filtering ke liye. Very reliable data for Punjab."
        </p>
        <div className="flex items-center gap-3">
           <UserCheck className="w-5 h-5 text-emerald-500" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Vikramjit S.</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Political Consultant, PB</span>
           </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border-slate-800 relative">
        <div className="absolute -top-3 left-8 bg-blue-600 text-white px-3 py-1 rounded text-[7px] font-black uppercase">Verified Order</div>
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <TrendingUp key={i} className="w-3 h-3 text-emerald-500" />)}
        </div>
        <p className="text-xs md:text-sm text-slate-300 italic mb-6 leading-relaxed">
          "Booth wise data for UP was very accurate. I used it for my survey in Lucknow. Delivery was instant on WhatsApp."
        </p>
        <div className="flex items-center gap-3">
           <UserCheck className="w-5 h-5 text-emerald-500" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Alok Pathak</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Election Strategist, UP</span>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="px-4 py-20 max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Common Questions</h2>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Sabhi Sawal ke Jawab</p>
    </div>
    
    <div className="space-y-4">
      {[
        { q: "Is it really 2025-26 data?", a: "Yes, we provide the most recent electoral node data available, structured for immediate campaign use in 2025/26." },
        { q: "Can I open it on my phone?", a: "Yes, the Excel file works perfectly with Google Sheets, Microsoft Excel, and WPS Office on both Android and iPhone." },
        { q: "What if some booths are missing?", a: "We guarantee 100% booth coverage for the selected constituency. If anything is missing, we update it for free within 24 hours." },
        { q: "Is this legal to use?", a: "We provide structured data services for publicly available records. It is intended for internal political survey and analysis use." }
      ].map((item, idx) => (
        <div key={idx} className="glass-card p-6 rounded-xl border-slate-800 hover:border-blue-500/30 transition-all">
          <h3 className="text-sm font-black text-white uppercase tracking-wide mb-3 flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-blue-500" /> {item.q}
          </h3>
          <p className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-medium pl-7">{item.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const DataCoverageIndex = () => {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto border-t border-slate-900 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-blue-500" />
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em]">Data Coverage Site-Map (Local SEO)</h3>
        </div>
        <div className="text-[8px] font-bold text-slate-600 uppercase">Keywords: Booth-wise, Excel Download, Matdata Suchi</div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {INDIAN_STATES.map(state => (
           <div key={state.id} className="group">
              <h4 className="text-[11px] font-black text-white uppercase mb-4 border-b border-slate-800 pb-2 group-hover:border-blue-600 transition-colors">{state.name} Voter List Excel Download</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                 Download Excel: {state.acs.slice(0, 20).map(ac => ac.name).join(', ')}...
                 <span className="text-blue-500/50 block mt-2 text-[8px] font-bold">ALL {state.totalSeats} VIDHAN SABHA SEGMENTS COVERED FOR {state.name.toUpperCase()}</span>
              </p>
           </div>
        ))}
      </div>
      <div className="mt-10 p-6 glass-card rounded-xl border-slate-800 text-[9px] text-slate-500 uppercase leading-loose font-bold tracking-widest text-center">
        Varanasi Voter List, Amritsar Voter List 2026, Kolkata Voter List, Lucknow Booth Wise Data, Chandigarh Voter List Excel, Bathinda Electoral Roll, Patna Voter List CSV, Jaipur Voter Data Download, Ahmedabad Excel List.
      </div>
    </section>
  )
}

const LegalDisclaimer = () => (
  <section className="px-4 py-8 max-w-7xl mx-auto mb-10">
    <div className="glass-card border-slate-800 rounded-2xl p-6 flex gap-6 items-center">
      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-slate-800">
        <Lock className="w-6 h-6 text-slate-500" />
      </div>
      <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-relaxed">
        **Notice:** VoterListExcel.in is an independent data structuring consultancy. We provide clean Excel formats for publicly available electoral rolls. We are not the Election Commission of India. Data is for survey purposes only.
      </p>
    </div>
  </section>
);

// --- Modals ---

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
       <div className="bg-brand-midnight w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-800 animate-slide-up">
          <div className="p-8 space-y-8">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-white">
                   <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center"><FileSpreadsheet className="w-6 h-6 text-[#25D366]" /></div>
                   <h3 className="text-xl font-black uppercase tracking-tighter">Instant Buy</h3>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition-all"><X className="w-6 h-6" /></button>
             </div>
             
             <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Constituency Node</p>
                   <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{ac.name}</h4>
                   <div className="flex items-center gap-2 mt-2">
                      <Badge variant="green">Verified 2025</Badge>
                      <Badge variant="blue">Excel + CSV</Badge>
                   </div>
                </div>

                <div className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">One Time Payment</p>
                      <div className="flex items-center gap-2">
                         <span className="text-xs text-slate-500 line-through">₹{ac.price + 1000}</span>
                         <p className="text-3xl font-black text-[#25D366]">₹{ac.price}</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end">
                      <Clock className="w-4 h-4 text-amber-500 mb-1" />
                      <p className="text-[8px] font-black text-amber-500 uppercase">Offer ends today</p>
                   </div>
                </div>
             </div>

             <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <p className="text-[9px] font-black uppercase text-slate-400">Included in this pack:</p>
                <div className="grid grid-cols-2 gap-2">
                   <span className="text-[8px] font-bold text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Full AC Data</span>
                   <span className="text-[8px] font-bold text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Booth Sorting</span>
                   <span className="text-[8px] font-bold text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Family Grouping</span>
                   <span className="text-[8px] font-bold text-slate-500 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Lifetime Access</span>
                </div>
             </div>
             
             <div className="space-y-4">
                <button 
                  onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hello, I want to download Voter List Excel for ${ac.name} (${stateName}). I've seen the offer price: ₹${ac.price}. Please share UPI link.`, '_blank')}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-5 h-5" /> Buy via WhatsApp (Fastest)
                </button>
                <div className="flex items-center justify-center gap-4 opacity-50">
                   <Lock className="w-3 h-3" />
                   <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">SSL Secure Payment Node</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  
  const columns = [
    { name: "AC Number", icon: <Database className="w-3 h-3" /> },
    { name: "Part Number", icon: <Grid3X3 className="w-3 h-3" /> },
    { name: "Section No", icon: <Target className="w-3 h-3" /> },
    { name: "Serial No", icon: <Activity className="w-3 h-3" /> },
    { name: "Voter Name (Eng)", icon: <UserCheck className="w-3 h-3" /> },
    { name: "Voter Name (Hin)", icon: <UserCheck className="w-3 h-3" /> },
    { name: "Relation Name", icon: <Users className="w-3 h-3" /> },
    { name: "Relation Type", icon: <Users className="w-3 h-3" /> },
    { name: "Age", icon: <Activity className="w-3 h-3" /> },
    { name: "Gender", icon: <Users className="w-3 h-3" /> },
    { name: "House No", icon: <MapPin className="w-3 h-3" /> },
    { name: "EPIC Number", icon: <Lock className="w-3 h-3" /> },
    { name: "Mobile Format", icon: <Phone className="w-3 h-3" /> },
    { name: "Booth Name", icon: <Target className="w-3 h-3" /> },
    { name: "Station Name", icon: <MapPin className="w-3 h-3" /> },
    { name: "Category", icon: <Grid3X3 className="w-3 h-3" /> },
    { name: "Age Group", icon: <TrendingUp className="w-3 h-3" /> },
    { name: "Address", icon: <MapPin className="w-3 h-3" /> },
    { name: "Pin Code", icon: <Target className="w-3 h-3" /> }
  ];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl animate-fade-in">
       <div className="bg-brand-midnight w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-800">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Download className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-widest">Metadata Structure (19 Columns)</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Electoral Roll Excel Format</p>
                </div>
             </div>
             <button onClick={onClose} className="text-slate-500 hover:text-white transition-all bg-slate-900 p-2 rounded-full"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-8 overflow-auto bg-brand-midnight space-y-10">
             
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <Grid3X3 className="w-5 h-5 text-blue-500" />
                   <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Included Excel Columns</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                   {columns.map((col, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all">
                         <div className="text-blue-500 mb-2 group-hover:scale-110 transition-transform">{col.icon}</div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide">{col.name}</span>
                      </div>
                   ))}
                </div>
             </div>

             <div>
               <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Live Data Quality Preview</h4>
               <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl">
                 <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                       <tr className="bg-slate-900 text-slate-400 uppercase text-[9px] tracking-widest font-black">
                          <th className="p-5 border-b border-slate-800">AC Name</th>
                          <th className="p-5 border-b border-slate-800">EPIC / Voter ID</th>
                          <th className="p-5 border-b border-slate-800">Voter Name</th>
                          <th className="p-5 border-b border-slate-800">Age / Gen</th>
                          <th className="p-5 border-b border-slate-800">Booth Name</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px] font-bold text-slate-400">
                       <tr className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-5">Amritsar (PB)</td>
                          <td className="p-5 text-blue-500 font-mono">IFC262XXXX</td>
                          <td className="p-5 text-white">Sukhwinder S.</td>
                          <td className="p-5">42 / M</td>
                          <td className="p-5">Govt School No. 12</td>
                       </tr>
                       <tr className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-5">Lucknow (UP)</td>
                          <td className="p-5 text-blue-500 font-mono">UP/321XXXX</td>
                          <td className="p-5 text-white">Rahul Verma</td>
                          <td className="p-5">31 / M</td>
                          <td className="p-5">Panchayat Bhavan</td>
                       </tr>
                    </tbody>
                 </table>
               </div>
             </div>
             
             <div className="bg-emerald-900/10 p-8 rounded-3xl border border-emerald-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h5 className="text-white font-black uppercase text-sm mb-1 tracking-tight">Need a customized Sample?</h5>
                    <p className="text-[11px] text-emerald-300 font-medium">Chat with us on WhatsApp to get a sample of your specific constituency.</p>
                 </div>
                 <button 
                  onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, Please send me a CUSTOM SAMPLE EXCEL for my area.`, '_blank')}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-2xl transition-all"
                 >
                    <MessageSquare className="w-5 h-5" /> Get Custom Sample
                 </button>
             </div>
          </div>
       </div>
    </div>
  );
}

const ContactView = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bulk Data Enquiry: Name: ${formData.name}, Phone: ${formData.phone}`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  return (
    <div className="max-w-5xl mx-auto px-4 animate-fade-in py-12">
      <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-blue-500 text-[10px] font-black uppercase tracking-widest mb-12 group transition-all">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> BACK TO DASHBOARD
      </button>
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
           <Badge variant="blue">Wholesale Data Hub</Badge>
           <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Bulk Data <br/> <span className="text-blue-500">Service</span></h2>
           <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed max-w-sm">
             Are you a Surveyor or Campaign Lead? Get the lowest prices for full state data. Up to 50% discount on bulk orders.
           </p>
           <div className="p-6 glass-card rounded-2xl border-emerald-500/20">
              <div className="flex items-center gap-4 text-white font-black text-sm">
                 <div className="w-12 h-12 bg-[#25D366] text-black rounded-xl flex items-center justify-center shadow-xl"><MessageSquare className="w-6 h-6" /></div>
                 <div>
                    <p className="text-xs uppercase tracking-widest">Connect with Sales</p>
                    <p className="text-[#25D366] font-mono text-lg">+91 97994 79444</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="glass-card p-10 rounded-3xl border-slate-800 shadow-2xl">
           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Your Name (नाम)</label>
                 <input required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 px-5 focus:border-blue-600 outline-none font-bold text-sm text-white" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mobile Number (फोन)</label>
                 <input required type="tel" placeholder="+91 XXXX XXX XXX" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 px-5 focus:border-blue-600 outline-none font-bold text-sm text-white" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-xs">SEND ENQUIRY <Send className="w-5 h-5" /></button>
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
        setTimeout(() => setVisible(false), 5000);
      }
    };
    const interval = setInterval(trigger, 18000); // Trigger more often for trust
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-24 right-6 z-[250] animate-slide-up hidden md:block">
      <div className="glass-card text-white p-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 border-slate-800 bg-slate-900/95">
        <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
        <div>
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Order</p>
          <p className="text-xs font-black tracking-tight uppercase text-white">{order.name}, {order.state} - Excel Dispatched</p>
        </div>
      </div>
    </div>
  );
};

export default App;