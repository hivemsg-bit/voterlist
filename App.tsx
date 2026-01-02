
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Database, Search, ChevronRight, Phone, 
  Terminal, Sparkles, ArrowLeft, X, Zap, 
  Table, Globe, Smartphone, ShieldCheck,
  FileSpreadsheet, ShoppingCart, UserCheck, TrendingUp,
  Newspaper, Calendar, ArrowUpRight, Share2,
  Lock, BarChart3, Layers, CheckCircle2, HelpCircle, ChevronDown,
  Users, Activity, MousePointer2, Eye, Download
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP, APP_NAME } from './constants';
import { StateData, ViewState, AssemblyConstituency, NewsItem } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Components ---

const Badge = ({ children, variant = 'blue' }: { children?: React.ReactNode, variant?: 'blue' | 'amber' | 'green' | 'red' }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold border uppercase tracking-wider ${styles[variant]} whitespace-nowrap inline-flex items-center gap-1.5`}>
      {children}
    </span>
  );
};

const FAQSection = () => {
  const faqs = [
    { q: "How to download the voter list in excel format?", a: "To download the voter list in excel format, simply select your state from our archive registry, find your assembly constituency, and click on 'Get Excel'. Our admin will provide the direct download link via WhatsApp." },
    { q: "Is the 2025 electoral roll data updated?", a: "Yes, we provide the final 2025 revised electoral rolls. Our voter list in excel format includes the latest names added during the special summary revisions." },
    { q: "Can I use this excel file for mobile campaigning?", a: "Absolutely. Our excel format is optimized for bulk SMS platforms, IVR systems, and political CRM software used for voter micro-targeting." },
    { q: "What columns are included in the excel file?", a: "The files typically contain Voter ID (EPIC) Number, Name (Local & English), Father/Husband Name, Age, Gender, and Booth/Part details structured for professional filtering." }
  ];

  return (
    <section className="px-4 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="blue">Knowledge Base</Badge>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mt-4 uppercase">Common Queries</h2>
        <p className="text-slate-500 mt-2 font-medium">Everything you need to know about our voter list in excel format.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 hover:border-blue-200 transition-all shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600" /> {faq.q}
            </h3>
            <p className="text-slate-500 mt-4 leading-relaxed font-medium pl-8">{faq.a}</p>
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
      const acList = randomState.acs;
      if (acList && acList.length > 0) {
        const randomAC = acList[Math.floor(Math.random() * acList.length)];
        setOrder({ name: randomAC.name, state: randomState.name });
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
      }
    };
    const interval = setInterval(trigger, 18000);
    setTimeout(trigger, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[100] animate-slide-up">
      <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-md mx-auto">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0">
          <ShoppingCart className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Live Order</p>
          <p className="text-xs font-bold text-slate-800 truncate">
            Excel Data: <span className="text-blue-600">{order.name}</span>
          </p>
          <p className="text-[10px] text-slate-500">{order.state} • Just now</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-slate-300 hover:text-slate-500">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const NEWS_DATA: NewsItem[] = [
  { id: 'n000', title: "Delhi NCR Roll Update: 70 ACs Metadata Synchronized", date: "Nov 2, 2024", category: "Capital Update", summary: "Delhi voter list in excel format for all 70 assembly segments is now ready for download. High-precision 2025 final roll data including New Delhi, Dwarka, and Rohini." },
  { id: 'n00', title: "Odisha Data Sync: 147 Assembly Constituencies Verified", date: "Oct 30, 2024", category: "New State", summary: "Odisha voter list in excel format for all 147 seats is now live. Includes final 2025 roll revisions for Bhubaneswar, Cuttack, and Puri districts." },
  { id: 'n0', title: "Madhya Pradesh Release: 230 Assembly segments Ready", date: "Oct 28, 2024", category: "Big Data", summary: "Premium voter list in excel format for MP is now available. Get detailed booth-level demographic reports for all 230 constituencies including Indore, Bhopal, and Gwalior." },
  { id: 'n1', title: "Punjab Data Release: 117 Assembly Seats Now Indexed", date: "Oct 25, 2024", category: "Data Release", summary: "Download the complete Punjab voter list in excel format. Includes 2025 final revision data for Majha, Malwa, and Doaba regions." }
];

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let title = "Voter List in Excel Format 2025 | www.voterlistexcel.in";
    let metaDesc = "Download official voter list in excel format for all assembly constituencies. Premium electoral roll data for campaign management.";

    if (activeState) {
      title = `${activeState.name} Voter List in Excel Format 2025 | Latest Download`;
      metaDesc = `Get the latest ${activeState.name} voter list in excel format. Verified 2025 data for all ${activeState.totalSeats} constituencies ready for instant extract.`;
    } else if (view === 'NEWS') {
      title = "Political Election News & Data Updates | VoterListExcel.in";
    }

    document.title = title;
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) metaTag.setAttribute('content', metaDesc);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": title,
      "description": metaDesc,
      "url": window.location.href,
      "license": "https://www.voterlistexcel.in/data-policy",
      "isAccessibleForFree": "false",
      "creator": { "@type": "Organization", "name": "VoterListExcel.in" }
    };
    
    const existingScript = document.getElementById('seo-schema');
    if (existingScript) existingScript.remove();
    const script = document.createElement('script');
    script.id = 'seo-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

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
    <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white pb-10">
      <OrderNotification />
      
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={handleHome}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm md:text-xl font-bold tracking-tight text-slate-900 leading-none">VoterListExcel<span className="text-blue-600">.in</span></span>
              <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Official Electoral Data</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="hidden md:flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
            >
              <Eye className="w-4 h-4" /> Sample Excel
            </button>
            <button 
              onClick={() => setView('CONTACT')}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-bold transition-all shadow-xl active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" /> Support
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {view === 'HOME' ? (
          <>
            <section className="px-4 py-12 md:py-24 max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-8 animate-fade-in">
                <Badge variant="blue">Official 2025 Data Node</Badge>
                <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest underline decoration-dotted">Live Sync</span>
              </div>
              <h1 className="text-3xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight text-balance">
                Latest <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Voter List in Excel Format</span> 2025
              </h1>
              <p className="text-slate-500 text-sm md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-12 px-2">
                Download verified, searchable electoral rolls for all assembly constituencies. Premium <span className="text-slate-900 font-bold">voter list in excel format</span> optimized for election strategy and booth management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => document.getElementById('states')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 transition-all hover:scale-105"
                >
                  Start Extraction <ChevronRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsPreviewOpen(true)}
                  className="w-full sm:w-auto bg-white border-2 border-slate-100 text-slate-700 px-10 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:border-blue-200 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> View Sample Excel
                </button>
              </div>
            </section>

            <section id="states" className="px-4 py-16 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 uppercase">Archive Registry</h2>
                  <p className="text-slate-400 text-xs md:text-base font-medium italic">Available states for instant <strong>voter list in excel format</strong> download.</p>
                </div>
                <div className="h-0.5 flex-1 bg-slate-100 hidden md:block mx-10 mb-5"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {INDIAN_STATES.map((state) => (
                  <div 
                    key={state.id}
                    onClick={() => selectState(state)}
                    className="bg-white p-6 rounded-3xl border border-slate-100 hover-lift cursor-pointer flex flex-col items-center text-center group"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-bold text-xl md:text-2xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {state.code}
                    </div>
                    <h3 className="text-slate-900 font-bold text-sm md:text-base mb-1 truncate w-full">{state.name}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{state.totalSeats} AC Node</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 text-white py-20 mt-10 rounded-[3rem] mx-4 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
               <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 relative z-10">
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-600/30">
                        <Table className="w-6 h-6 text-blue-400" />
                     </div>
                     <h4 className="text-xl font-bold">Pivot-Ready XLS</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">Our <span className="text-white">voter list in excel format</span> is structured for Microsoft Excel analytics. Ready for demographic filtering instantly.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-600/30">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                     </div>
                     <h4 className="text-xl font-bold">2025 Verified</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">Direct synchronization with the latest electoral revisions. We ensure 100% data fidelity for election success.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center border border-amber-600/30">
                        <Zap className="w-6 h-6 text-amber-400" />
                     </div>
                     <h4 className="text-xl font-bold">Fast Retrieval</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">No complex forms. Message us on WhatsApp and receive your custom excel extract link within minutes.</p>
                  </div>
               </div>
            </section>

            <FAQSection />
          </>
        ) : view === 'STATE_VIEW' && activeState ? (
          <StateView 
            state={activeState} 
            onBack={() => setView('HOME')} 
            onBuy={(ac) => { setSelectedAC(ac); setIsModalOpen(true); }} 
          />
        ) : view === 'NEWS' ? (
          <NewsView onBack={() => setView('HOME')} />
        ) : view === 'CONTACT' ? (
          <ContactView onBack={() => setView('HOME')} />
        ) : null}
      </main>

      <PurchaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ac={selectedAC} 
        stateName={activeState?.name} 
      />

      <SamplePreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />

      <footer className="mt-20 px-4 py-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">VoterListExcel<span className="text-blue-600">.in</span></h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              India's premier marketplace for verified electoral archives. Specializing in high-precision <span className="font-bold text-slate-700">voter list in excel format</span> for election management professionals.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Platform</h4>
              <ul className="text-xs font-bold text-slate-600 space-y-3 uppercase tracking-wider">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('HOME')}>State Archives</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('NEWS')}>Industry News</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact</h4>
              <ul className="text-xs font-bold text-slate-600 space-y-3 uppercase tracking-wider">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('CONTACT')}>Support Node</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}>WhatsApp</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">© 2025 VOTERLISTEXCEL.IN • PREMIUM ELECTORAL DATA</p>
          <div className="flex items-center gap-6">
            <ShieldCheck className="w-5 h-5 text-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured Archive v2.1</span>
          </div>
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
  const [liveStats, setLiveStats] = useState({ visitors: 0, downloads: 0 });

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

    const baseVisitors = 1200 + Math.floor(Math.random() * 500);
    const baseDownloads = 45 + Math.floor(Math.random() * 20);
    setLiveStats({ visitors: baseVisitors, downloads: baseDownloads });

    const interval = setInterval(() => {
        setLiveStats(prev => ({
            visitors: prev.visitors + (Math.random() > 0.5 ? 1 : 0),
            downloads: prev.downloads + (Math.random() > 0.9 ? 1 : 0)
        }));
    }, 5000);

    return () => clearInterval(interval);
  }, [state.name]);

  return (
    <div className="max-w-7xl mx-auto px-4 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to States
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <Globe className="w-6 h-6 text-blue-600" />
             <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase tracking-tight">{state.name} Assembly Data</h2>
          </div>
          <p className="text-slate-400 font-medium text-sm md:text-lg">Verified <strong>voter list in excel format</strong> for all {state.totalSeats} segments.</p>
        </div>
        <div className="w-full lg:w-96 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search AC Name or Number..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-6 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none font-bold text-sm shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visits Today</p>
            <p className="text-2xl font-bold text-slate-900">{liveStats.visitors.toLocaleString()}</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-emerald-500 font-bold text-xs">
            <TrendingUp className="w-3 h-3" /> +12%
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Now</p>
            <p className="text-2xl font-bold text-slate-900">{(liveStats.visitors / 45).toFixed(0)} Users</p>
          </div>
          <div className="ml-auto">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
            <MousePointer2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Excel Orders</p>
            <p className="text-2xl font-bold text-slate-900">{liveStats.downloads.toLocaleString()}+</p>
          </div>
          <div className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg uppercase tracking-tighter">
            High Demand
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 mb-16 relative overflow-hidden text-white border border-slate-800 shadow-2xl">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
         <div className="relative space-y-8">
            <div className="flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-blue-400" />
               <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em]">Strategic AI Demographics Insight</span>
            </div>
            {loading ? (
               <div className="animate-pulse flex flex-col space-y-4">
                  <div className="h-6 bg-slate-700 rounded w-full"></div>
                  <div className="h-6 bg-slate-700 rounded w-2/3"></div>
               </div>
            ) : (
               <p className="text-xl md:text-3xl font-medium italic text-slate-200 leading-relaxed max-w-5xl">"{insight}"</p>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(ac => (
          <div key={ac.id} className="bg-white p-8 rounded-3xl border border-slate-100 hover-lift flex flex-col justify-between h-full group">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                 <div className="w-12 h-12 bg-slate-50 text-slate-400 font-bold rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {ac.number}
                 </div>
                 <Badge variant="green">2025 Sync</Badge>
              </div>
              <div>
                 <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 truncate">{ac.name}</h4>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Excel Format Ready
                 </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-50">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
                  <span className="text-2xl font-bold text-slate-900">₹{ac.price}</span>
               </div>
               <button 
                onClick={() => onBuy(ac)}
                className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95"
               >
                 Get Excel
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto px-4 animate-fade-in">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Return Home
    </button>
    <div className="space-y-4 mb-16">
       <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase">Election Insights</h2>
       <p className="text-slate-500 font-medium">Updates on <span className="text-blue-600 font-bold">voter list in excel format</span> availability and strategy guides.</p>
       <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
    </div>
    <div className="space-y-10">
       {NEWS_DATA.map(news => (
         <article key={news.id} className="bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 hover-lift space-y-6 group">
            <div className="flex items-center gap-4">
               <Badge variant="blue">{news.category}</Badge>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Calendar className="w-4 h-4" /> {news.date}
               </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
               {news.title}
            </h3>
            <p className="text-slate-500 text-sm md:text-lg leading-relaxed font-medium">
               {news.summary}
            </p>
            <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
               <button className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors">
                  Read Data Node <ArrowUpRight className="w-4 h-4" />
               </button>
               <Share2 className="w-5 h-5 text-slate-300 hover:text-blue-600 cursor-pointer" />
            </div>
         </article>
       ))}
    </div>
  </div>
);

const ContactView = ({ onBack }: { onBack: () => void }) => {
  const handleBulk = () => {
    const msg = `Hi, I need to purchase bulk voter list excel files from www.voterlistexcel.in. Please share packages.`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return Home
      </button>
      <div className="bg-white p-10 md:p-20 rounded-[4rem] border border-slate-100 text-center space-y-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50 blur-[120px] rounded-full"></div>
         <div className="space-y-6">
            <Badge variant="amber">Bulk Procurement Desk</Badge>
            <h2 className="text-3xl md:text-6xl font-display font-bold text-slate-900 uppercase tracking-tight leading-none">Order Desk</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-lg">Need an entire state or multiple districts? Connect with our dedicated data administrators for premium <span className="text-blue-600 font-bold">voter list in excel format</span> packages.</p>
         </div>
         <div className="grid grid-cols-2 gap-4 md:gap-10 max-w-lg mx-auto">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
               <Lock className="w-8 h-8 text-blue-600 mb-3" />
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Secured Node</span>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col items-center">
               <Layers className="w-8 h-8 text-emerald-600 mb-3" />
               <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Bulk Sync</span>
            </div>
         </div>
         <button 
           onClick={handleBulk}
           className="w-full md:w-auto bg-blue-600 hover:bg-slate-900 text-white px-16 py-6 rounded-3xl font-bold text-sm uppercase tracking-[0.3em] shadow-2xl shadow-blue-100 transition-all hover:scale-105 active:scale-95"
         >
           WhatsApp Admin Desk
         </button>
      </div>
    </div>
  );
};

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;

  const handlePay = () => {
    const msg = `नमस्ते! मुझे www.voterlistexcel.in से *Voter List in Excel Format* चाहिए।\n\nAC: ${ac.name}\nAC No: ${ac.number}\nState: ${stateName}\nFormat: MS Excel (.xlsx)\nPrice: ₹${ac.price}\n\nकृपया मुझे पेमेंट डिटेल्स और file link भेजें।`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
       <div className="bg-white w-full max-w-lg rounded-t-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl animate-slide-up">
          <div className="p-8 md:p-12 space-y-10">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
                      <FileSpreadsheet className="w-8 h-8" />
                   </div>
                   <div className="flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none">Order Extract</h3>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2">Node Ref: {ac.id.toUpperCase()}</span>
                   </div>
                </div>
                <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
                   <X className="w-6 h-6 text-slate-400" />
                </button>
             </div>

             <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-8">
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Selected Constituency</p>
                   <h4 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">{ac.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                   <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Structure</p>
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Excel Format</p>
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount</p>
                      <p className="text-2xl font-bold text-blue-600">₹{ac.price}</p>
                   </div>
                </div>
             </div>

             <div className="space-y-5 pt-4">
                <button 
                  onClick={handlePay}
                  className="w-full bg-blue-600 hover:bg-slate-900 text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] shadow-xl shadow-blue-100 flex items-center justify-center gap-4 transition-all active:scale-95"
                >
                  Confirm WhatsApp
                </button>
                <div className="flex flex-col items-center gap-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Verified 2025 Electoral Data</p>
                   <ShieldCheck className="w-5 h-5 text-blue-200" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  const sampleData = [
    { sn: 1, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", psAddr: "Government Elementary School, Ghonewala", part: 1, secNo: 1, secName: "GHONEWALA", voterId: "IFC2625093", nameLoc: "ਕੁਲਦੀਪ ਸਿੰਘ", nameEng: "Kuldeep Singh", relLoc: "ਅਜਾਇਬ ਸਿੰਘ", relEng: "Ajaib Singh", house: "0", age: 47, gender: "Male" },
    { sn: 2, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", psAddr: "Government Elementary School, Ghonewala", part: 1, secNo: 1, secName: "GHONEWALA", voterId: "IFC1293216", nameLoc: "ਰਾਣੀ", nameEng: "Rani", relLoc: "ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ", relEng: "Gurpreet Singh", house: "00", age: 39, gender: "Female" },
    { sn: 3, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", psAddr: "Government Elementary School, Ghonewala", part: 1, secNo: 1, secName: "GHONEWALA", voterId: "IFC1293190", nameLoc: "ਬਿਮਲਾ", nameEng: "Bimla", relLoc: "ਰਾਜਾ ਮਸੀਹ", relEng: "Raja Masih", house: "00", age: 38, gender: "Female" },
    { sn: 4, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", psAddr: "Government Elementary School, Ghonewala", part: 1, secNo: 1, secName: "GHONEWALA", voterId: "IFC1292796", nameLoc: "ਜੁਗਰਾਜ ਕੌਰ", nameEng: "Jugraj Kaur", relLoc: "ਮਨਦੀਪ ਸਿੰਘ", relEng: "Mandeep Singh", house: "00", age: 31, gender: "Female" },
    { sn: 5, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", psAddr: "Government Elementary School, Ghonewala", part: 1, secNo: 1, secName: "GHONEWALA", voterId: "IFC2434736", nameLoc: "ਨਵਦੀਪ ਕੌਰ", nameEng: "Navdeep Kaur", relLoc: "ਜਸਪਿੰਦਰ ਸਿੰਘ", relEng: "Jaspinder Singh", house: "00", age: 30, gender: "Female" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
       <div className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div>
                <h3 className="text-2xl font-bold text-slate-900">Voter List Excel Structure</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Detailed Column Registry for 2025</p>
             </div>
             <button onClick={onClose} className="p-3 bg-white rounded-full hover:bg-slate-100 shadow-sm transition-colors">
                <X className="w-6 h-6 text-slate-400" />
             </button>
          </div>
          <div className="p-4 md:p-8 overflow-x-auto flex-1 bg-slate-50/30">
             <table className="min-w-max w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                   <tr className="bg-slate-900 text-white">
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">SN</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">District</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Tehsil</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">P.S.</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">P.O.</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Pin</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Polling Station</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Part</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Section</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Voter ID</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Name (Local)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Name (English)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Rel. Name (Local)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Rel. Name (Eng)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">H.No</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Age</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest">Gender</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {sampleData.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/50 transition-colors text-[11px]">
                         <td className="p-4 font-bold text-slate-400 border-r border-slate-50">{row.sn}</td>
                         <td className="p-4 font-bold text-slate-700 border-r border-slate-50">{row.dist}</td>
                         <td className="p-4 font-medium text-slate-600 border-r border-slate-50">{row.tehsil}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.ps}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.po || "-"}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.pin}</td>
                         <td className="p-4 font-bold text-slate-700 border-r border-slate-50 max-w-[150px] truncate">{row.psName}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.part}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.secNo}</td>
                         <td className="p-4 font-bold text-blue-600 border-r border-slate-50">{row.voterId}</td>
                         <td className="p-4 font-bold text-slate-900 border-r border-slate-50 bg-slate-50/50">{row.nameLoc}</td>
                         <td className="p-4 font-medium text-slate-700 border-r border-slate-50">{row.nameEng}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.relLoc}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.relEng}</td>
                         <td className="p-4 font-medium text-slate-500 border-r border-slate-50">{row.house}</td>
                         <td className="p-4 font-bold text-slate-700 border-r border-slate-50">{row.age}</td>
                         <td className="p-4 font-medium text-slate-500">{row.gender}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="mt-8 bg-blue-600/5 p-6 rounded-3xl border border-blue-600/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5" />
                   </div>
                   <p className="text-sm font-bold text-slate-700">This exact 19-column structure is provided in every MS Excel extract.</p>
                </div>
                <button 
                  onClick={() => { onClose(); window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, I want to purchase voter list excel files with the 19-column structure.`, '_blank'); }}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all"
                >
                  Order This Format
                </button>
             </div>
          </div>
       </div>
    </div>
  );
}

export default App;
