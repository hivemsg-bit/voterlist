import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, 
  FileSpreadsheet, ShieldCheck, Activity, Eye, 
  MessageSquare, Database, Target, Lock, Zap, HelpCircle, ChevronDown, CheckCircle2, 
  Download, MapPin, TrendingUp, Users, 
  FileText, ArrowRight, Printer, BarChart3, 
  Globe, Info, Table2, Calculator, Settings, Code, FileSearch, Layers
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight } from './services/geminiService';

// --- Custom Hook for Dynamic SEO ---
const usePageSEO = (view: ViewState, state: StateData | null) => {
  useEffect(() => {
    let title = "VoterListExcel.in | Booth Wise Voter List Data Download 2025";
    let desc = "Download 2025-26 Voter List in Excel. Booth-wise data for Punjab, WB, UP. Perfect for Panna Pramukh & political campaign management. Instant WhatsApp Delivery.";
    let keywords = "voter list excel download, how to convert voter list to excel, pdf to excel voter list, electoral roll data entry, scanned pdf to excel converter, hindi voter list excel, election data cleaning, panna pramukh excel sheet, voter data extraction";

    if (view === 'STATE_VIEW' && state) {
      title = `${state.name} Voter List Excel Download 2025 | Verified Booth Data`;
      desc = `Download official ${state.name} 2025 Voter List in Excel. Accurate booth & ward wise data for ${state.name} elections. Format: CSV/Excel.`;
      keywords = `${state.name} voter list excel, how to convert ${state.name} voter list to excel, booth wise data ${state.name}, election roll download`;
    } else if (view === 'DATA_CONVERSION') {
      title = "How to Convert Voter List to Excel | PDF to Excel Service 2025";
      desc = "Complete guide on how to convert voter list PDF to Excel. Professional data entry and OCR services for scanned electoral rolls. 100% accuracy guaranteed.";
      keywords = "how to convert voter list to excel, pdf to excel voter list conversion, scanned voter list ocr, electoral roll data entry service, bulk pdf to csv election, voter list software india";
    } else if (view === 'CONTACT') {
      title = "Contact for Bulk Voter Data | VoterListExcel.in";
      desc = "Get full state voter list excel at 40% discount. Contact our data experts for custom survey formats.";
    } else if (view === 'FORM20') {
      title = "Form 20 Result in Excel | Booth Wise Election Analysis Data";
      desc = "Download Form 20 Final Result Sheet in Excel format. Booth-wise votes for every candidate. Sortable and Filterable Excel Data.";
      keywords = "form 20 in excel, form 20 excel download, booth wise election result excel, vidhan sabha result excel data";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) metaKeywords.setAttribute('content', keywords);
  }, [view, state]);
};

// --- Components ---

const AdPlaceholder = ({ text = "Google Ad Space" }: { text?: string }) => (
  <div className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg h-32 flex flex-col items-center justify-center text-slate-400 my-6 relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
    <p className="font-bold text-xs uppercase tracking-widest">{text}</p>
    <p className="text-[10px]">Auto Ads / Display Ad</p>
  </div>
);

const Badge = ({ children, variant = 'blue', className = "" }: { children?: React.ReactNode, variant?: 'blue' | 'green' | 'amber' | 'slate' | 'whatsapp' | 'red' | 'purple' | 'orange', className?: string }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    whatsapp: 'bg-green-50 text-green-700 border-green-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    slate: 'bg-slate-100 text-slate-600 border-slate-200',
    red: 'bg-red-50 text-red-700 border-red-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-widest ${styles[variant]} inline-flex items-center gap-1 ${className}`}>
      {children}
    </span>
  );
};

const PremiumLogo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:bg-orange-600 transition-colors">
      <Database className="w-4 h-4" />
    </div>
    <div className="flex flex-col">
      <h1 className="text-base font-black tracking-tighter text-slate-900 leading-none">
        VOTERLIST<span className="text-orange-500">EXCEL</span>
      </h1>
      <span className="text-[6px] font-bold text-slate-500 uppercase tracking-[0.2em]">Verified Data Hub</span>
    </div>
  </div>
);

const FloatingWhatsApp = () => (
  <div className="fixed bottom-6 right-6 z-[999] group flex items-center gap-3">
    <div className="bg-white border border-slate-200 text-slate-800 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
      Chat with Admin
    </div>
    <button 
      onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, I want to inquire about Voter List Excel or Services.`, '_blank')}
      className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-95 animate-pulse"
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
    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-100">
      <Users className="w-3 h-3" /> {count} People viewing this
    </div>
  );
};

const LegalDisclaimer = () => (
   <section className="py-8 px-4 text-center border-t border-slate-200 bg-slate-50">
      <p className="text-[10px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
         Disclaimer: VoterListExcel.in is a private data processing service. We help organize publicly available electoral roll data (PDFs) into digital formats (Excel) for ease of analysis. We are not affiliated with the Election Commission of India. All data is for internal campaign management and research purposes only.
      </p>
   </section>
);

const DataConversionView = ({ onBack }: { onBack: () => void }) => (
  <div className="max-w-6xl mx-auto px-4 animate-fade-in pb-10">
    <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-purple-600 text-[9px] font-black uppercase tracking-widest mb-10 group transition-all">
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
    </button>

    <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="relative z-10">
        <Badge variant="purple" className="mb-6">Data Expert Solutions</Badge>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">How to Convert <br/><span className="text-purple-400">Voter List to Excel?</span></h1>
        <p className="text-slate-300 text-lg max-w-2xl font-medium leading-relaxed">
          Converting scanned voter list PDFs to clean, sortable Excel files is a complex task. 
          Discover the complete guide to data extraction and our premium conversion services.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="md:col-span-2 space-y-10">
        {/* Step-by-Step Guide Section */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black uppercase text-slate-900 mb-8 flex items-center gap-3">
            <Settings className="w-6 h-6 text-purple-600" /> Complete Guide: PDF to Excel
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-black text-purple-600 text-xl border-2 border-purple-200">1</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Identify PDF Type</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">Check if your voter list is a "Digital PDF" (Searchable) or a "Scanned PDF" (Image). Scanned lists require advanced OCR technology to extract Hindi or regional languages accurately.</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="slate">Searchable PDF</Badge>
                  <Badge variant="slate">Scanned Image</Badge>
                  <Badge variant="slate">Regional Language OCR</Badge>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-black text-purple-600 text-xl border-2 border-purple-200">2</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">OCR Processing (Scanned Lists)</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Standard tools like Adobe or SmallPDF often fail with Hindi fonts or complex table structures of the Indian Electoral Roll. Professional OCR tools or manual data entry are necessary for 100% precision.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center font-black text-purple-600 text-xl border-2 border-purple-200">3</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Data Structuring & Cleaning</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Once extracted, the data must be mapped into columns: S.No, EPIC Number, Name, Father/Husband Name, Age, and Gender. This is essential for <b>Panna Pramukh</b> list generation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-black uppercase text-slate-900 mb-6">Why Hire Our Experts?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4">
              <div className="text-purple-600"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Hindi Language Experts</h4>
                <p className="text-xs text-slate-500">Perfect extraction of names in Hindi/Regional scripts.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4">
              <div className="text-purple-600"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Panna Pramukh Ready</h4>
                <p className="text-xs text-slate-500">Sorted data by Part No. and Section No. for workers.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4">
              <div className="text-purple-600"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">EPIC Number Linking</h4>
                <p className="text-xs text-slate-500">Directly searchable Excel for quick voter verification.</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex gap-4">
              <div className="text-purple-600"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Affordable Pricing</h4>
                <p className="text-xs text-slate-500">Bulk conversion starting at ₹4500 per AC.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <div className="bg-purple-900 text-white p-6 rounded-2xl shadow-xl">
          <h3 className="font-black uppercase tracking-tight text-xl mb-4">Request Quote</h3>
          <p className="text-purple-200 text-xs mb-6">Send us a sample PDF, and we will share a free Excel sample within 1 hour.</p>
          <button 
             onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to convert my Voter List PDF to Excel. Please check sample.`, '_blank')}
             className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-900/50 hover:scale-105 transition-all"
          >
             <MessageSquare className="w-5 h-5" /> WhatsApp Sample
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Keyword Index</h4>
          <div className="flex flex-wrap gap-2">
            {["Voter List to Excel", "PDF to CSV", "Electoral Roll OCR", "Hindi Data Entry", "Election Analytics", "Panna Pramukh Tool", "Bulk Conversion", "Scanned PDF OCR"].map(k => (
              <span key={k} className="px-2 py-1 bg-slate-100 text-[9px] font-bold text-slate-600 rounded uppercase border border-slate-200">{k}</span>
            ))}
          </div>
        </div>

        <AdPlaceholder text="Conversion Page Ad" />
      </aside>
    </div>
  </div>
);

const PurchaseModal = ({ isOpen, onClose, ac, stateName }: { isOpen: boolean, onClose: () => void, ac: AssemblyConstituency | null, stateName?: string }) => {
   if (!isOpen || !ac) return null;
   return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
         <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-start">
               <div>
                  <Badge variant="orange" className="mb-2">Instant Download</Badge>
                  <h3 className="text-xl font-black uppercase tracking-tight">{ac.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{stateName} • AC No. {ac.number}</p>
               </div>
               <button onClick={onClose} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <div>
                     <p className="text-xs font-bold text-slate-500 uppercase">Data Year</p>
                     <p className="font-bold text-slate-900">{ac.dataYear}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-bold text-slate-500 uppercase">Price</p>
                     <p className="text-2xl font-black text-green-600">₹{ac.price}</p>
                  </div>
               </div>
               
               <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> Full Booth Wise Voter Data
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> Phone Numbers (Where Available)
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                     <CheckCircle2 className="w-4 h-4 text-green-500" /> Excel (.xlsx) Format
                  </div>
               </div>

               <button 
                  onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want to buy Voter List Excel for *${ac.name} (${stateName})*. Please share payment details.`, '_blank')}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all active:scale-95"
               >
                  <MessageSquare className="w-5 h-5" /> Buy via WhatsApp
               </button>
            </div>
         </div>
      </div>
   );
};

const StateView = ({ state, onBack, onBuy }: { state: StateData, onBack: () => void, onBuy: (ac: AssemblyConstituency) => void }) => {
   const [searchTerm, setSearchTerm] = useState("");
   const filteredAcs = useMemo(() => {
      return state.acs.filter(ac => ac.name.toLowerCase().includes(searchTerm.toLowerCase()));
   }, [state.acs, searchTerm]);

   const [insight, setInsight] = useState("");

   useEffect(() => {
      getPoliticalInsight(state.name, 'STATE').then(setInsight);
   }, [state.name]);

   return (
      <div className="max-w-7xl mx-auto px-4 pb-12 animate-fade-in">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 text-[9px] font-black uppercase tracking-widest mb-8 group transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO ALL STATES
         </button>

         <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-4">
                  <Badge variant="blue">Verified Data</Badge>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Last Updated: 2025</span>
               </div>
               <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 mb-2">{state.name}</h1>
               <p className="text-slate-500 font-medium">Select your Assembly Constituency to download booth-wise list.</p>
            </div>
            <div className="relative w-full md:w-96">
               <input 
                  type="text" 
                  placeholder="Search Constituency Name..." 
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all font-bold text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
               <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
         </div>

         <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl mb-12 flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-lg"><Sparkles className="w-6 h-6 text-orange-400" /></div>
            <div>
               <h3 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2">AI Strategic Intelligence</h3>
               <p className="text-sm md:text-base leading-relaxed font-medium opacity-90 italic">"{insight}"</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAcs.map((ac) => (
               <div key={ac.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all group relative">
                  <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AC No. {ac.number}</span>
                     <Badge variant="green" className="opacity-0 group-hover:opacity-100 transition-opacity">Ready</Badge>
                  </div>
                  <h3 className="text-lg font-black uppercase text-slate-900 mb-1 truncate">{ac.name}</h3>
                  <p className="text-xs text-slate-500 font-bold mb-6">{ac.partsCount} Booths • {ac.dataYear}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                     <span className="text-lg font-black text-slate-700">₹{ac.price}</span>
                     <button onClick={() => onBuy(ac)} className="bg-slate-900 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                        Download <Download className="w-3 h-3" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const Form20View = ({ onBack }: { onBack: () => void }) => (
   <div className="max-w-6xl mx-auto px-4 animate-fade-in pb-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-[9px] font-black uppercase tracking-widest mb-10 group transition-all">
         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
      </button>

      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-2xl relative border-b-4 border-emerald-500">
         <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Form 20 Result <br/><span className="text-emerald-400">in Excel Format</span></h1>
         <p className="text-slate-300 text-lg max-w-xl mb-8">Download Booth-wise result sheets. Perfect for trend analysis and weak-booth identification.</p>
         <button 
            onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=I want Form 20 Result in Excel.`, '_blank')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg"
         >
            Buy on WhatsApp
         </button>
      </div>
      <AdPlaceholder text="Form 20 Bottom Ad" />
   </div>
);

const App = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [selectedAc, setSelectedAc] = useState<AssemblyConstituency | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  usePageSEO(view, selectedState);

  const handleStateClick = (state: StateData) => {
    setSelectedState(state);
    setView('STATE_VIEW');
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (view) {
      case 'STATE_VIEW':
        return selectedState ? <StateView state={selectedState} onBack={() => setView('HOME')} onBuy={(ac) => { setSelectedAc(ac); setIsPurchaseModalOpen(true); }} /> : null;
      case 'FORM20':
        return <Form20View onBack={() => setView('HOME')} />;
      case 'DATA_CONVERSION':
        return <DataConversionView onBack={() => setView('HOME')} />;
      case 'CONTACT':
        return (
           <div className="max-w-4xl mx-auto px-4 animate-fade-in pb-10">
              <button onClick={() => setView('HOME')} className="mb-10 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-500 flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> BACK</button>
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10 text-center">
                 <h2 className="text-3xl font-black mb-6">Contact Us</h2>
                 <p className="text-slate-500 mb-8">Fastest response on WhatsApp for all data queries.</p>
                 <button onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')} className="bg-[#25D366] text-white px-10 py-5 rounded-2xl font-black uppercase text-xl shadow-xl hover:scale-105 transition-all">Chat on WhatsApp</button>
              </div>
           </div>
        );
      case 'HOME':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 pb-20">
            <div className="text-center py-20 bg-slate-900 text-white rounded-3xl mb-16 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 px-4">
                <Badge variant="orange" className="mb-6 scale-110">India's #1 Election Data Provider</Badge>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Win Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Election</span></h1>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10">Download 100% Accurate Booth-Wise Voter List Data in Excel. Professional conversion for all Indian states.</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                   <button onClick={() => document.getElementById('states-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">Download Data <ArrowRight className="w-5 h-5" /></button>
                   <button onClick={() => setView('DATA_CONVERSION')} className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all border border-white/10">Convert PDF to Excel</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
               <div onClick={() => setView('FORM20')} className="bg-emerald-50 hover:bg-emerald-100 p-6 rounded-2xl border border-emerald-100 cursor-pointer transition-all group">
                  <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Form 20 Excel</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Booth Wise Result</p>
               </div>
               <div onClick={() => setView('DATA_CONVERSION')} className="bg-purple-50 hover:bg-purple-100 p-6 rounded-2xl border border-purple-100 cursor-pointer transition-all group">
                  <FileSearch className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">PDF to Excel</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Guide & Service</p>
               </div>
               <div onClick={() => setView('CONTACT')} className="bg-blue-50 hover:bg-blue-100 p-6 rounded-2xl border border-blue-100 cursor-pointer transition-all group">
                  <Printer className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Voter Slips</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Parchi Printing</p>
               </div>
               <div onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')} className="bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl border border-orange-100 cursor-pointer transition-all group">
                  <Phone className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Bulk Quote</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Full State Data</p>
               </div>
            </div>

            <div id="states-section" className="mb-20">
               <h2 className="text-2xl font-black uppercase tracking-tight text-center mb-8">Select Your State</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {INDIAN_STATES.map((state) => (
                     <div key={state.id} onClick={() => handleStateClick(state)} className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 p-6 rounded-xl cursor-pointer transition-all group shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">{state.code}</div>
                           <Badge variant="slate">{state.totalSeats} Seats</Badge>
                        </div>
                        <h3 className="text-lg font-black uppercase text-slate-900 group-hover:text-orange-600 transition-colors">{state.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">Browse Constituencies <ChevronRight className="w-3 h-3 inline" /></p>
                     </div>
                  ))}
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div onClick={() => setView('HOME')}><PremiumLogo /></div>
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => setView('HOME')} className={`text-xs font-bold uppercase tracking-widest ${view === 'HOME' ? 'text-orange-500' : 'text-slate-600'}`}>Home</button>
             <button onClick={() => setView('FORM20')} className={`text-xs font-bold uppercase tracking-widest ${view === 'FORM20' ? 'text-orange-500' : 'text-slate-600'}`}>Form 20</button>
             <button onClick={() => setView('DATA_CONVERSION')} className={`text-xs font-bold uppercase tracking-widest ${view === 'DATA_CONVERSION' ? 'text-orange-500' : 'text-slate-600'}`}>Convert PDF</button>
             <button onClick={() => setView('CONTACT')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors">Support</button>
          </div>
        </div>
      </nav>

      <main className="pt-8">{renderContent()}</main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4 mt-auto">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
               <PremiumLogo />
               <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-sm">VoterListExcel.in provides premium electoral data solutions for 2025. Specilizing in "How to convert voter list to excel" and booth-wise analysis.</p>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Services</h4>
               <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li onClick={() => setView('DATA_CONVERSION')} className="cursor-pointer hover:text-orange-500 underline underline-offset-4 decoration-slate-200">PDF to Excel Conversion Guide</li>
                  <li onClick={() => setView('FORM20')} className="cursor-pointer hover:text-orange-500">Booth Wise Results</li>
                  <li onClick={() => setView('CONTACT')} className="cursor-pointer hover:text-orange-500">Bulk Data Supply</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Help</h4>
               <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li className="cursor-pointer hover:text-orange-500">Terms & Privacy</li>
                  <li onClick={() => setView('CONTACT')} className="cursor-pointer hover:text-orange-500">Contact Support</li>
               </ul>
            </div>
         </div>
         <LegalDisclaimer />
      </footer>

      <FloatingWhatsApp />
      <div className="fixed bottom-6 left-6 z-50"><VisitorCounter /></div>
      <PurchaseModal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)} ac={selectedAc} stateName={selectedState?.name} />
    </div>
  );
};

export default App;
