import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, 
  FileSpreadsheet, ShieldCheck, Activity, Eye, 
  MessageSquare, Send, Database, Target, Lock, Zap, HelpCircle, ChevronDown, CheckCircle2, UserCheck,
  Grid3X3, Download, MapPin, TrendingUp
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Custom Hook for Dynamic SEO ---
const usePageSEO = (view: ViewState, state: StateData | null) => {
  useEffect(() => {
    let title = "Voter List Excel Download 2025 | Booth Wise Data India";
    let desc = "Election Data: Download 2025 Voter List in Excel. Booth-wise data for Punjab, West Bengal, UP. Perfect for Panna Pramukh & Booth Management.";

    if (view === 'STATE_VIEW' && state) {
      title = `${state.name} Voter List Excel Download 2025 | Booth Wise Data`;
      desc = `Download ${state.name} 2025-26 Voter List in Excel format. Ward wise and booth wise data for ${state.name} elections. Official Matdata Suchi CSV.`;
    } else if (view === 'CONTACT') {
      title = "Bulk Order & Contact | VoterListExcel.in";
      desc = "Contact for bulk voter list excel data. Custom formatting for political surveys and campaign management.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [view, state]);
};

// --- Components ---

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'green' | 'amber' | 'slate' | 'whatsapp', className?: string }) => {
  const styles = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    whatsapp: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20',
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
            <Phone className="w-3 h-3" /> WhatsApp Enquiry
          </button>
        </div>
      </nav>

      <main className="pt-14">
        {view === 'HOME' ? (
          <>
            <section className="px-4 py-12 md:py-20 max-w-7xl mx-auto text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-600/5 blur-[120px] -z-10 rounded-full"></div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-md mb-6">
                <Badge variant="whatsapp" className="animate-pulse">Active 2025-26</Badge>
                <h2 className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Election Data Intelligence Hub</h2>
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-[1] text-white">
                Premium <span className="text-blue-500">Voter List</span> <br/>
                Excel Database
              </h1>
              <p className="text-slate-400 text-xs md:text-lg max-w-2xl mx-auto font-medium mb-10 leading-relaxed">
                Download high-precision 19-Column Excel data with Booth-wise separation. 
                Optimized for <span className="text-blue-400">Panna Pramukh</span> management and <span className="text-blue-400">Campaign Outreach</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all"
                >
                  Browse All States
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="bg-slate-900 border border-slate-800 text-slate-300 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Metadata Sample
                </button>
              </div>
            </section>

            <section id="states" className="px-4 py-8 max-w-7xl mx-auto">
              <div className="mb-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-4">
                <div className="text-center md:text-left border-l-4 border-blue-600 pl-4">
                  <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white">Select Region</h2>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Matdata Suchi Database (CSV/Excel)</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="green">Punjab</Badge>
                  <Badge variant="blue">UP</Badge>
                  <Badge variant="amber">Delhi</Badge>
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
                      <Badge variant="slate" className="!text-[7px]">2025 Node</Badge>
                    </div>
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white">{state.name}</h3>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">{state.totalSeats} Segments Active</p>
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
            <span className="hover:text-blue-500 cursor-pointer" onClick={() => setView('CONTACT')}>Bulk Access</span>
            <span className="hover:text-blue-500 cursor-pointer">Security Policy</span>
          </div>
          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest text-center md:text-right">
            © 2025 VOTERLISTEXCEL.IN <br/>
            All Data Verified for Local Survey Use
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
          <Badge variant="blue">Database Live</Badge>
          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">{state.name} Data Hub</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl">
            Access booth-level electoral data for {state.name}. Format optimized for mobile marketing and Panna Pramukh assignments.
          </p>
        </div>
        <div className="w-full lg:w-[28rem] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
          <input 
            type="text" 
            placeholder={`Search ${state.name} Constituency...`}
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
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">AI Electoral Analysis</span>
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
          <div key={ac.id} className="p-6 rounded-2xl glass-card hover-lift group border-slate-800 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">Node {ac.number}</span>
                <Badge variant="whatsapp" className="!text-[8px]">Excel</Badge>
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter mb-6 group-hover:text-blue-500 transition-colors">{ac.name}</h4>
            </div>
            <div className="flex items-center justify-between pt-5 border-t border-slate-800/50 mt-auto">
               <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-500 uppercase mb-0.5">Price (INR)</span>
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Verified Nodes", desc: "Data Cross-Checked" },
        { icon: <Target className="w-6 h-6" />, title: "Hyper Local", desc: "Booth Wise Separation" },
        { icon: <Zap className="w-6 h-6" />, title: "Direct Sync", desc: "WhatsApp Delivery" },
        { icon: <Lock className="w-6 h-6" />, title: "Data Privacy", desc: "Confidential Service" }
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
      <Badge variant="slate">Testimonials</Badge>
      <h3 className="text-2xl md:text-4xl font-black uppercase text-white mt-4 tracking-tighter">Trusted by Campaign Managers</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="glass-card p-8 rounded-2xl border-slate-800">
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <TrendingUp key={i} className="w-3 h-3 text-emerald-500" />)}
        </div>
        <p className="text-xs md:text-sm text-slate-300 italic mb-6 leading-relaxed">
          "The Excel format provided was exactly what my team needed for booth management in Punjab. Ward-wise filtering was a breeze."
        </p>
        <div className="flex items-center gap-3">
           <UserCheck className="w-5 h-5 text-emerald-500" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">R. Singh</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Election Strategist, PB</span>
           </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border-slate-800">
        <div className="flex items-center gap-1 mb-4">
          {[1,2,3,4,5].map(i => <TrendingUp key={i} className="w-3 h-3 text-emerald-500" />)}
        </div>
        <p className="text-xs md:text-sm text-slate-300 italic mb-6 leading-relaxed">
          "Fast delivery. I received the data within 15 minutes of payment on WhatsApp. Very professional service for independent candidates."
        </p>
        <div className="flex items-center gap-3">
           <UserCheck className="w-5 h-5 text-emerald-500" />
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">M. Pathak</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Independent Candidate, UP</span>
           </div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="px-4 py-20 max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Help Desk</h2>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Sawal Jawab (FAQ)</p>
    </div>
    
    <div className="space-y-4">
      {[
        { q: "Is the data updated for 2025?", a: "Yes, we provide the latest electoral roll data structured for 2025/26 elections. Our formats are verified regularly." },
        { q: "Which file format will I receive?", a: "You will receive both Excel (.xlsx) and CSV (.csv) formats. These are compatible with all SMS, WhatsApp, and Survey tools." },
        { q: "Do you offer Bulk discounts?", a: "Absolutely. For full district or full state data, we offer up to 40% discount. Chat on WhatsApp for custom pricing." },
        { q: "Can I use this for Panna Pramukh?", a: "Yes, this data includes Voter Name, EPIC, House No, and Serial No, making it perfect for booth and Panna Pramukh assignment." }
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
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-[0.2em]">Keyword Data Index (SEO Directory)</h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {INDIAN_STATES.map(state => (
           <div key={state.id} className="group">
              <h4 className="text-[11px] font-black text-white uppercase mb-4 border-b border-slate-800 pb-2 group-hover:border-blue-600 transition-colors">{state.name} Voter List Excel</h4>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                 {state.acs.slice(0, 15).map(ac => ac.name).join(' Excel, ')}...
                 <span className="text-blue-500/50 block mt-2 text-[8px] font-bold">COVERING ALL {state.totalSeats} SEGMENTS IN {state.name.toUpperCase()}</span>
              </p>
           </div>
        ))}
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
        **Notice:** VoterListExcel.in is an independent data consultancy. We provide data structuring services for publicly available electoral rolls. We are not affiliated with the ECI. Data is for internal survey and strategic analysis only. Use ethically.
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
                   <h3 className="text-xl font-black uppercase tracking-tighter">Purchase Data</h3>
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition-all"><X className="w-6 h-6" /></button>
             </div>
             
             <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Selected Segment</p>
                   <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{ac.name}</h4>
                   <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">{stateName} | Verified 2025 Node</p>
                </div>

                <div className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5">
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Fee</p>
                      <p className="text-3xl font-black text-[#25D366]">₹{ac.price}</p>
                   </div>
                   <Badge variant="whatsapp">Instant Link</Badge>
                </div>
             </div>
             
             <div className="space-y-4">
                <button 
                  onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hello, I want to buy Voter List Excel for AC: ${ac.name} (${stateName}). Price: ${ac.price}. Please share payment methods.`, '_blank')}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black py-5 rounded-xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-5 h-5" /> Buy via WhatsApp
                </button>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Admin Online Now</p>
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
    "AC Number", "Part Number", "Section No", "Serial No", 
    "Voter Name (Eng)", "Voter Name (Hin)", "Relation Name", "Relation Type", 
    "Age", "Gender", "House No", "EPIC Number", 
    "Mobile Column", "Booth Name", "Polling Station", "Category", 
    "Age Group", "Address", "Pin Code"
  ];

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/98 backdrop-blur-xl animate-fade-in">
       <div className="bg-brand-midnight w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-800">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Download className="w-6 h-6 text-white" /></div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-widest">19-Column Metadata Sample</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Election Data Format Specifications</p>
                </div>
             </div>
             <button onClick={onClose} className="text-slate-500 hover:text-white transition-all bg-slate-900 p-2 rounded-full"><X className="w-6 h-6" /></button>
          </div>
          <div className="p-8 overflow-auto bg-brand-midnight space-y-10">
             
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <Grid3X3 className="w-5 h-5 text-blue-500" />
                   <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Excel Data Schema</h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                   {columns.map((col, idx) => (
                      <div key={idx} className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl text-[10px] font-black text-slate-400 text-center uppercase tracking-wide group hover:border-blue-500 transition-all">
                         <span className="text-[8px] text-blue-500/50 block mb-1">Col {idx+1}</span>
                         {col}
                      </div>
                   ))}
                </div>
             </div>

             <div>
               <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Visual Data Grid</h4>
               <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-2xl">
                 <table className="w-full text-left border-separate border-spacing-0">
                    <thead>
                       <tr className="bg-slate-900 text-slate-400 uppercase text-[9px] tracking-widest font-black">
                          <th className="p-5 border-b border-slate-800">AC Name</th>
                          <th className="p-5 border-b border-slate-800">EPIC / Voter ID</th>
                          <th className="p-5 border-b border-slate-800">Voter Name</th>
                          <th className="p-5 border-b border-slate-800">Age / Gen</th>
                          <th className="p-5 border-b border-slate-800">House No</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-[11px] font-bold text-slate-400">
                       <tr className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-5">Ajnala (PB)</td>
                          <td className="p-5 text-blue-500 font-mono">IFC262XXXX</td>
                          <td className="p-5 text-white">Kuldeep Singh</td>
                          <td className="p-5">47 / MALE</td>
                          <td className="p-5 font-mono">12/A</td>
                       </tr>
                       <tr className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-5">Ajnala (PB)</td>
                          <td className="p-5 text-blue-500 font-mono">IFC262XXXX</td>
                          <td className="p-5 text-white">Manjit Kaur</td>
                          <td className="p-5">45 / FEMALE</td>
                          <td className="p-5 font-mono">12/A</td>
                       </tr>
                       <tr className="hover:bg-blue-600/5 transition-colors">
                          <td className="p-5">Ballygunge (WB)</td>
                          <td className="p-5 text-emerald-500 font-mono">WB/32/XXXX</td>
                          <td className="p-5 text-white">Debasish Roy</td>
                          <td className="p-5">52 / MALE</td>
                          <td className="p-5 font-mono">88-B</td>
                       </tr>
                    </tbody>
                 </table>
               </div>
             </div>
             
             <div className="bg-blue-900/10 p-8 rounded-3xl border border-blue-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div>
                    <h5 className="text-white font-black uppercase text-sm mb-1 tracking-tight">Ready to integrate?</h5>
                    <p className="text-[11px] text-blue-300 font-medium">Download the full high-res sample file on WhatsApp to verify columns.</p>
                 </div>
                 <button 
                  onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, Please send me a FULL SAMPLE EXCEL file for evaluation.`, '_blank')}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-2xl transition-all"
                 >
                    <MessageSquare className="w-5 h-5" /> Get Sample File Now
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
             Ideal for survey companies and political consultants. Get full state data with custom columns and phone number structures.
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
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Name</label>
                 <input required type="text" placeholder="Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 px-5 focus:border-blue-600 outline-none font-bold text-sm text-white" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contact Phone</label>
                 <input required type="tel" placeholder="Mobile Number" className="w-full bg-slate-900 border border-slate-800 rounded-xl py-4 px-5 focus:border-blue-600 outline-none font-bold text-sm text-white" onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-xl font-black uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-xs">SUBMIT ENQUIRY <Send className="w-5 h-5" /></button>
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
    const interval = setInterval(trigger, 25000);
    return () => clearInterval(interval);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-24 right-6 z-[250] animate-slide-up hidden md:block">
      <div className="glass-card text-white p-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 border-slate-800 bg-slate-900/95">
        <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
        <div>
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Transaction</p>
          <p className="text-xs font-black tracking-tight uppercase text-white">{order.name}, {order.state} Node Dispatched</p>
        </div>
      </div>
    </div>
  );
};

export default App;