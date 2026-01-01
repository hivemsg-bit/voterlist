import React, { useState, useMemo } from 'react';
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
  Table
} from 'lucide-react';
import { INDIAN_STATES, APP_NAME, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

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
  if (!isOpen) return null;
  
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
        
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent! Our agent will contact you shortly.'); onClose(); }}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Full Name" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input type="email" placeholder="Email Address" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input type="tel" placeholder="WhatsApp Number" required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" />
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <textarea placeholder="Tell us which state/AC you need..." rows={3} required className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-blue transition-all" />
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

const Header = ({ setView, onOpenEnquiry }: { setView: (v: ViewState) => void, onOpenEnquiry: () => void }) => (
  <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center h-16">
        <div 
          className="flex items-center cursor-pointer gap-3" 
          onClick={() => setView('HOME')}
        >
          <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center glow-shadow">
            <Terminal className="text-white w-5 h-5" />
          </div>
          <div className="leading-none">
            <h1 className="text-lg font-bold text-white tracking-tight">{APP_NAME}</h1>
            <p className="text-[10px] text-brand-cyan font-mono">AI DATA CORE v4.0</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
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

const ProductPreviewCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <div className={`glass-panel p-6 rounded-2xl border-t-2 ${color} relative group overflow-hidden`}>
    <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon className="w-20 h-20" />
    </div>
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center border border-white/5">
        <Icon className={`w-6 h-6 ${color.replace('border-t-', 'text-')}`} />
      </div>
      <div>
        <h4 className="text-white font-bold">{title}</h4>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest">{desc}</p>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-2">
      <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full animate-pulse ${color.replace('border-t-', 'bg-')}`} style={{ width: '70%' }}></div>
      </div>
    </div>
  </div>
);

const Hero = ({ onStart, onOpenEnquiry }: { onStart: () => void, onOpenEnquiry: () => void }) => (
  <div className="relative pt-32 pb-20 px-4 max-w-[1400px] mx-auto text-center overflow-hidden">
    {/* Animated Blobs Background */}
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

      {/* Product Image Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 px-4">
        <ProductPreviewCard 
          icon={FileText} 
          title="Voter PDF Analytics" 
          desc="Booth Wise Voter Summary" 
          color="border-t-brand-blue" 
        />
        <ProductPreviewCard 
          icon={Table} 
          title="Campaign Excel Sheet" 
          desc="Raw Data for CRM & SMS" 
          color="border-t-brand-success" 
        />
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
  <section id="database" className="py-20 bg-slate-950 border-t border-white/5 relative">
    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    <div className="max-w-[1400px] mx-auto px-4 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">National Directory (State-wise)</h2>
          <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Select to access AC-wise Excel Data Sheets.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge color="cyan">Total States Active: {INDIAN_STATES.length}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {INDIAN_STATES.map((state) => (
          <div 
            key={state.id}
            onClick={() => onSelect(state)}
            className="group cursor-pointer bg-slate-900/50 border border-slate-800 hover:border-brand-blue p-5 rounded-xl transition-all hover:bg-slate-800 hover:-translate-y-1 shadow-lg shadow-black/50 relative overflow-hidden"
          >
            {/* Hover Scan Effect */}
            <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute w-full h-1 bg-brand-cyan/20 animate-scan"></div>
            </div>
            
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors text-brand-blue font-black text-lg">
                {state.code}
              </div>
              <Activity className="w-3 h-3 text-slate-700 group-hover:text-brand-cyan animate-pulse" />
            </div>
            <h3 className="text-white text-sm font-bold truncate">{state.name}</h3>
            <div className="text-[9px] text-slate-500 mt-2 font-mono flex items-center gap-2 uppercase tracking-tighter border-t border-white/5 pt-2">
              {state.totalSeats} AC Records Ready
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

      {/* List */}
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
               <p className="text-[9px] text-slate-500 font-mono mt-1">INCLUDES BOOTH-WISE SUMMARY</p>
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

const Footer = () => (
  <footer className="bg-slate-950 py-16 border-t border-white/5">
    <div className="max-w-[1400px] mx-auto px-4 text-center">
      <div className="flex justify-center mb-8">
        <div className="w-12 h-1 border-t-2 border-brand-blue"></div>
      </div>
      <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Official Data Integrity Portal</h3>
      <p className="text-slate-500 text-xs mb-8 max-w-xl mx-auto leading-relaxed font-mono uppercase">
        India's most trusted source to buy AC+ voterlist in excel. Professional-grade demographic insights for winning campaigns. 
        Data pricing optimized between ₹4,000 to ₹5,000 per assembly constituency.
      </p>
      <div className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.5em]">
        © 2025 BHARAT DATA CORE • SECURE DATA SYSTEMS • AI INFUSED V4.1
      </div>
    </div>
  </footer>
);

const App = () => {
  const [viewState, setViewState] = useState<ViewState>('HOME');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const handleStateSelect = (state: StateData) => {
    setSelectedState(state);
    setViewState('STATE_VIEW');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 grid-bg selection:bg-brand-blue selection:text-white">
      <Header setView={setViewState} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
      
      <main>
        {viewState === 'HOME' ? (
          <>
            <Hero onStart={() => document.getElementById('database')?.scrollIntoView({ behavior: 'smooth' })} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
            <StateGrid onSelect={handleStateSelect} />
            <Footer />
          </>
        ) : selectedState ? (
          <DataView state={selectedState} onBack={() => setViewState('HOME')} onOpenEnquiry={() => setIsEnquiryOpen(true)} />
        ) : null}
      </main>
      
      {/* Floating Action Button for Mobile Enquiry */}
      <button 
        onClick={() => setIsEnquiryOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-cyan text-slate-950 p-4 rounded-full shadow-2xl md:hidden animate-bounce glow-shadow"
      >
        <Mail className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;
