
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Database, Search, ChevronRight, Phone, 
  Terminal, Sparkles, ArrowLeft, X, Zap, 
  Table, Globe, Smartphone, ShieldCheck,
  FileSpreadsheet, ShoppingCart, UserCheck, TrendingUp,
  Newspaper, Calendar, ArrowUpRight, Share2,
  Lock, BarChart3, Layers, CheckCircle2, HelpCircle, ChevronDown,
  Users, Activity, MousePointer2, Eye, Download, Info,
  MapPin, Clock, ShieldAlert, Mail, MessageSquare, Send
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

const TrustSection = () => (
  <section className="px-4 py-20 max-w-7xl mx-auto border-t border-slate-100">
    <div className="grid md:grid-cols-4 gap-8">
      {[
        { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "100% Accurate", desc: "Data verified with 2025 final rolls." },
        { icon: <Clock className="w-8 h-8 text-emerald-600" />, title: "Instant Delivery", desc: "Get download link on WhatsApp in 5 mins." },
        { icon: <Table className="w-8 h-8 text-amber-600" />, title: "Ready-to-Use", desc: "19+ columns structured for bulk SMS/IVR." },
        { icon: <Lock className="w-8 h-8 text-rose-600" />, title: "Secure Payment", desc: "Safe UPI & Bank transfer nodes." }
      ].map((item, idx) => (
        <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-md transition-shadow">
          <div className="mb-4">{item.icon}</div>
          <h4 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
          <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="px-4 py-24 bg-slate-50 rounded-[4rem] mx-4 my-10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <Badge variant="amber">Simple Process</Badge>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase">How to Get Excel Data?</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 -z-10"></div>
        {[
          { step: "01", title: "Select State & AC", desc: "Find your assembly constituency from our archive." },
          { step: "02", title: "WhatsApp Admin", desc: "Click 'Get Excel' to send an automated request to our desk." },
          { step: "03", title: "Instant Access", desc: "Receive your professional 19-column excel link via WhatsApp." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[3rem] border border-slate-200 text-center space-y-4 relative">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold absolute -top-6 left-1/2 -translate-x-1/2 shadow-xl">
              {item.step}
            </div>
            <h4 className="text-xl font-bold text-slate-900 pt-4">{item.title}</h4>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LegalDisclaimer = () => (
  <section className="px-4 py-12 max-w-4xl mx-auto">
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
        <ShieldCheck className="w-6 h-6" />
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Legal Disclaimer & Usage Policy</h4>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
          The electoral data provided through www.voterlistexcel.in is intended solely for political analysis and campaign management. Users are responsible for complying with the Election Commission's guidelines and Data Privacy laws. We do not support any illegal usage of voter information.
        </p>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    { q: "How to download the voter list in excel format?", a: "Simply select your state, find your AC, and click 'Get Excel'. You will be redirected to our WhatsApp desk for the download link." },
    { q: "Is the 2025 electoral roll updated?", a: "Yes, we provide the absolute final 2025 revised data with the latest additions." },
    { q: "Can I filter the excel by Age or Gender?", a: "Yes, our excel structure includes dedicated columns for Age and Gender for precise micro-targeting." },
    { q: "Do you provide bulk state-level data?", a: "Yes, connect with our admin via the 'Support' section for whole district or state-level pricing." }
  ];

  return (
    <section className="px-4 py-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="blue">Knowledge Base</Badge>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mt-4 uppercase">FAQs</h2>
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
  { id: 'n000', title: "Delhi NCR Roll Update: 70 ACs Metadata Synchronized", date: "Nov 2, 2024", category: "Capital Update", summary: "Delhi voter list in excel format for all 70 assembly segments is now ready for download." },
  { id: 'n00', title: "Odisha Data Sync: 147 Assembly Constituencies Verified", date: "Oct 30, 2024", category: "New State", summary: "Odisha voter list in excel format for all 147 seats is now live." },
  { id: 'n1', title: "Punjab Data Release: 117 Assembly Seats Now Indexed", date: "Oct 25, 2024", category: "Data Release", summary: "Download the complete Punjab voter list in excel format including 2025 revisions." }
];

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeState, setActiveState] = useState<StateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAC, setSelectedAC] = useState<AssemblyConstituency | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let title = "Voter List in Excel Format 2025 | www.voterlistexcel.in";
    if (activeState) title = `${activeState.name} Voter List in Excel Format | Latest 2025`;
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
                <Badge variant="blue">Official 2025 Data Sync</Badge>
                <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest">Active Extractors</span>
              </div>
              <h1 className="text-3xl md:text-7xl font-display font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight text-balance">
                High-Quality <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Voter List in Excel Format</span> 2025
              </h1>
              <p className="text-slate-500 text-sm md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-12 px-2">
                Download searchable electoral rolls for all constituencies. Premium <span className="text-slate-900 font-bold">voter list in excel format</span> with 19+ structured columns for booth management.
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

            <TrustSection />

            <section id="states" className="px-4 py-16 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-slate-900 uppercase">Archive Registry</h2>
                  <p className="text-slate-400 text-xs md:text-base font-medium italic">Available states for instant <strong>voter list in excel format</strong> download.</p>
                </div>
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
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{state.totalSeats} ACs</p>
                  </div>
                ))}
              </div>
            </section>

            <HowItWorks />

            <section className="bg-slate-900 text-white py-20 mt-10 rounded-[3rem] mx-4 relative overflow-hidden">
               <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 relative z-10">
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-600/30">
                        <Table className="w-6 h-6 text-blue-400" />
                     </div>
                     <h4 className="text-xl font-bold">19-Column Structured</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">Format includes Voter ID, Local Name, English Name, Age, and more.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center border border-emerald-600/30">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                     </div>
                     <h4 className="text-xl font-bold">2025 Verified</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">Direct synchronization with the latest electoral rolls.</p>
                  </div>
                  <div className="space-y-4">
                     <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center border border-amber-600/30">
                        <Zap className="w-6 h-6 text-amber-400" />
                     </div>
                     <h4 className="text-xl font-bold">Instant Retrieval</h4>
                     <p className="text-slate-400 text-sm leading-relaxed">Receive your custom excel extract link within minutes on WhatsApp.</p>
                  </div>
               </div>
            </section>

            <LegalDisclaimer />
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

      <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ac={selectedAC} stateName={activeState?.name} />
      <SamplePreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />

      <footer className="mt-20 px-4 py-16 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-center md:text-left items-center md:items-start">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <FileSpreadsheet className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">VoterListExcel<span className="text-blue-600">.in</span></h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              India's premier node for verified electoral archives in professional excel format.
            </p>
          </div>
          <div className="flex gap-10">
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Platform</h4>
              <ul className="text-xs font-bold text-slate-600 space-y-3 uppercase tracking-wider">
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('HOME')}>State Archives</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('NEWS')}>Data News</li>
                <li className="hover:text-blue-600 cursor-pointer" onClick={() => setView('CONTACT')}>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">© 2025 VOTERLISTEXCEL.IN • PREMIUM DATA</p>
          <div className="flex items-center gap-6">
            <ShieldCheck className="w-5 h-5 text-slate-300" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured Node</span>
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
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to States
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 uppercase">{state.name} Assembly Data</h2>
          <p className="text-slate-400 font-medium text-sm md:text-lg italic">Extracting <strong>voter list in excel format</strong> for all segments.</p>
        </div>
        <div className="w-full lg:w-96 relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search Name or AC No..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-6 focus:border-blue-600 outline-none font-bold text-sm shadow-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-14 mb-16 relative overflow-hidden text-white">
         <div className="relative space-y-8">
            <div className="flex items-center gap-3">
               <Sparkles className="w-6 h-6 text-blue-400" />
               <span className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.4em]">Strategic AI Insight</span>
            </div>
            {loading ? <div className="animate-pulse h-6 bg-slate-700 rounded w-full"></div> : <p className="text-xl md:text-3xl font-medium italic text-slate-200">"{insight}"</p>}
         </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
           <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <p className="text-slate-500 font-bold uppercase tracking-widest">No matching constituencies found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(ac => (
            <div key={ac.id} className="bg-white p-8 rounded-3xl border border-slate-100 hover-lift flex flex-col justify-between h-full group">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <div className="w-12 h-12 bg-slate-50 text-slate-400 font-bold rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {ac.number}
                   </div>
                   <Badge variant="green">2025 Extract</Badge>
                </div>
                <div>
                   <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 truncate">{ac.name}</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Excel Format Ready</p>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-between pt-6 border-t border-slate-50">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</span>
                    <span className="text-2xl font-bold text-slate-900">₹{ac.price}</span>
                 </div>
                 <button onClick={() => onBuy(ac)} className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg transition-all active:scale-95">Get Excel</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NewsView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-4xl mx-auto px-4 animate-fade-in">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
      <ArrowLeft className="w-4 h-4" /> Return Home
    </button>
    <div className="space-y-8">
      <div className="text-center mb-12">
        <Badge variant="blue">Electoral Bulletins</Badge>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mt-4 uppercase">Latest Data News</h2>
      </div>
      <div className="grid gap-6">
        {NEWS_DATA.map((news) => (
          <div key={news.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="amber">{news.category}</Badge>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{news.date}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{news.title}</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">{news.summary}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactView = ({ onBack }: { onBack: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    ac: '',
    requirement: 'Single AC Data'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `नया संपर्क अनुरोध (VoterListExcel.in):\n\nनाम: ${formData.name}\nमोबाइल: ${formData.phone}\nराज्य: ${formData.state}\nAC: ${formData.ac}\nजरूरत: ${formData.requirement}`;
    window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 animate-fade-in">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 text-xs font-bold uppercase tracking-widest mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Return Home
      </button>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <Badge variant="amber">Contact Us</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 uppercase tracking-tight leading-none">Get in Touch</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed">
              Have questions about our <span className="text-blue-600 font-bold">voter list in excel format</span>? Our data experts are ready to assist you for single AC or bulk requirements.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">WhatsApp Support</h4>
                <p className="text-slate-500 font-medium">+91 97994 79444</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1 tracking-widest">Active Now</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Official Email</h4>
                <p className="text-slate-500 font-medium">support@voterlistexcel.in</p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100 group-hover:bg-amber-600 group-hover:text-white transition-all">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Official Data Desk</h4>
                <p className="text-slate-500 font-medium">Verified nodes for all 28 states & UTs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl -z-10"></div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Quick Enquiry Form</h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter full name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="Enter mobile number"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">State Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Punjab, UP"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">AC Name / Number</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Constituency name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:border-blue-600 outline-none transition-all font-medium text-sm"
                    value={formData.ac}
                    onChange={(e) => setFormData({...formData, ac: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Requirement Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:border-blue-600 outline-none transition-all font-bold text-sm"
                  value={formData.requirement}
                  onChange={(e) => setFormData({...formData, requirement: e.target.value})}
                >
                  <option>Single AC Data</option>
                  <option>District Level Bulk</option>
                  <option>Full State Package</option>
                  <option>Custom Analysis</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 mt-8"
            >
              Send Request to WhatsApp <Send className="w-4 h-4" />
            </button>
            <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4">Safe & Secure Lead Generation</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
  if (!isOpen || !ac) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
       <div className="bg-white w-full max-w-lg rounded-t-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl animate-slide-up">
          <div className="p-8 md:p-12 space-y-10">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm"><FileSpreadsheet className="w-8 h-8" /></div>
                   <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-none">Order Extract</h3>
                </div>
                <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 space-y-8">
                <div>
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Selected Constituency</p>
                   <h4 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">{ac.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                   <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Structure</p>
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">Excel (.xlsx)</p>
                   </div>
                   <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Amount</p>
                      <p className="text-2xl font-bold text-blue-600">₹{ac.price}</p>
                   </div>
                </div>
             </div>
             <button onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for AC: ${ac.name} (${stateName})`, '_blank')} className="w-full bg-blue-600 hover:bg-slate-900 text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] shadow-xl transition-all active:scale-95">Confirm WhatsApp</button>
          </div>
       </div>
    </div>
  );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  const sampleData = [
    { sn: 1, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", part: 1, secNo: 1, voterId: "IFC2625093", nameLoc: "ਕੁਲਦੀਪ ਸਿੰਘ", nameEng: "Kuldeep Singh", relLoc: "ਅਜਾਇਬ ਸਿੰਘ", relEng: "Ajaib Singh", house: "0", age: 47, gender: "Male" },
    { sn: 2, dist: "Amritsar", tehsil: "Ajnala", ps: "Ramdas", po: "", pin: "143603", psName: "1- Ghonewala", part: 1, secNo: 1, voterId: "IFC1293216", nameLoc: "ਰਾਣੀ", nameEng: "Rani", relLoc: "ਗੁਰਪ੍ਰੀत ਸਿੰਘ", relEng: "Gurpreet Singh", house: "00", age: 39, gender: "Female" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
       <div className="bg-white w-full max-w-6xl rounded-[3rem] overflow-hidden shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
             <div>
                <h3 className="text-2xl font-bold text-slate-900">19-Column Excel Structure</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Official Column Registry</p>
             </div>
             <button onClick={onClose} className="p-3 bg-white rounded-full hover:bg-slate-100 shadow-sm transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
          </div>
          <div className="p-4 md:p-8 overflow-x-auto flex-1 bg-slate-50/30">
             <div className="md:hidden flex items-center justify-center gap-2 mb-4 animate-pulse">
                <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                   <ChevronRight className="w-3 h-3" /> Scroll Right to see all columns
                </div>
             </div>
             <table className="min-w-max w-full text-left border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                   <tr className="bg-slate-900 text-white">
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">SN</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">District</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Tehsil</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">P.S.</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Polling Station</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Voter ID</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Name (Local)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Name (Eng)</th>
                      <th className="p-4 text-[9px] font-bold uppercase tracking-widest border-r border-slate-700">Rel Name</th>
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
                         <td className="p-4 font-bold text-slate-700 border-r border-slate-50 max-w-[150px] truncate">{row.psName}</td>
                         <td className="p-4 font-bold text-blue-600 border-r border-slate-50">{row.voterId}</td>
                         <td className="p-4 font-bold text-slate-900 border-r border-slate-50 bg-slate-50/50">{row.nameLoc}</td>
                         <td className="p-4 font-medium text-slate-700 border-r border-slate-50">{row.nameEng}</td>
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
                   <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center"><Download className="w-5 h-5" /></div>
                   <p className="text-sm font-bold text-slate-700">Exact 19-column structure provided in every extract.</p>
                </div>
                <button onClick={() => { onClose(); window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to order the 19-column excel format.`, '_blank'); }} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all">Order This Format</button>
             </div>
          </div>
       </div>
    </div>
  );
}

export default App;
