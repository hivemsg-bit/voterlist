import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, ChevronRight, Phone, Sparkles, ArrowLeft, X, 
  FileSpreadsheet, ShieldCheck, Activity, Eye, 
  MessageSquare, Send, Database, Target, Lock, Zap, HelpCircle, ChevronDown, CheckCircle2, UserCheck,
  Grid3X3, Download, MapPin, TrendingUp, ShieldAlert, Clock, Users, Gift,
  FileText, ArrowRight, RefreshCw, Layers, Printer, Smartphone, Headphones, BarChart3, FileDigit,
  Image as ImageIcon, Calendar, Palette, Type, MousePointerClick, Share2, 
  Mic, ListChecks, PenTool, Lightbulb, Copy, Info, Table2, Filter, Calculator
} from 'lucide-react';
import { INDIAN_STATES, CONTACT_WHATSAPP } from './constants';
import { StateData, ViewState, AssemblyConstituency } from './types';
import { getPoliticalInsight, generateCampaignAI } from './services/geminiService';
import { Globe } from 'lucide-react';

// Add type definition for adsbygoogle
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

// --- Custom Hook for Dynamic SEO ---
const usePageSEO = (view: ViewState, state: StateData | null) => {
  useEffect(() => {
    // 1. Default Home SEO
    let title = "VoterListExcel.in | Booth Wise Voter List Data Download 2025";
    let desc = "Download 2025-26 Voter List in Excel. Booth-wise data for Punjab, WB, UP. Perfect for Panna Pramukh & political campaign management. Instant WhatsApp Delivery.";
    let keywords = "voter list excel download, pdf to excel service, scanned pdf to excel converter, hindi data entry, election data cleaning, raw data formatting, panna pramukh list maker";

    // 2. Logic for Pages
    if (view === 'STATE_VIEW' && state) {
      title = `${state.name} Voter List Excel Download 2025 | Verified Booth Data`;
      desc = `Download official ${state.name} 2025 Voter List in Excel. Accurate booth & ward wise data for ${state.name} elections. Format: CSV/Excel.`;
      keywords = `${state.name} voter list excel, ${state.name} booth wise data, ${state.name} election roll download, matdata suchi ${state.name}`;
    } else if (view === 'CONTACT') {
      title = "Contact for Bulk Voter Data | VoterListExcel.in";
      desc = "Get full state voter list excel at 40% discount. Contact our data experts for custom survey formats.";
    } else if (view === 'FREE_TOOLS') {
      title = "AI Political War Room - Slogan, Script & Survey Generator | Free Tools";
      desc = "Use our AI Tools to generate Election Slogans, IVR Voice Call Scripts, and Opinion Poll Questions. Free Political Campaign Management Software.";
      keywords = "ai slogan generator, political slogan maker, ivr script writer, election voice call script, ai survey builder, opinion poll question generator, political ai tools";
    }
    else if (view === 'PRINTING') {
      title = "Voter Slip Printing Service India 2025 | Photo Parchi & QR Code Slips";
      desc = "Best Election Voter Slip (Parchi) Printing Service. We provide Booth-wise sorted Photo Slips with Candidate Symbol. Fast Delivery for Punjab, UP, Bihar & All States.";
      keywords = "voter slip printing, election parchi print, photo voter slip, booth wise slips, election stationary, door to door distribution slips, matdata parchi printing";
    } else if (view === 'APP_DEV') {
      title = "Political Election Management App Software | War Room & Voter Search Tool";
      desc = "Launch your own Election Campaign App. Features: Karyakarta Management, Booth Analytics, Voter Search, and Digital War Room Software. Whitelabel Solution.";
      keywords = "election management app, political campaign software, rural search tool, karyakarta app, political war room dashboard, chunav prachar app";
    } else if (view === 'SURVEY') {
      title = "Political Survey Agency & IVR Call Service | Election Opinion Polls India";
      desc = "Top Rated Political Survey Company. We offer Door-to-Door Surveys, IVR Call Blasting, Opinion Polls, and Caste Equation Analysis for Winning Elections.";
      keywords = "political survey agency, election opinion poll, ivr call blasting, voter survey india, pre-poll survey, caste analysis report, election campaign management";
    } else if (view === 'DATA_CONVERSION') {
      title = "Bulk PDF to Excel Data Entry Service | Voter List Digitization Expert";
      desc = "Convert Scanned Voter Lists (PDF) to Excel with 100% Accuracy. Manual Verification for High Volume Data. Best for Panna Pramukh Lists & Govt Record Digitization.";
      keywords = "pdf to excel data entry, voter list conversion, bulk data digitization, scanned image to excel, electoral roll processing, manual data verification, hindi typing service";
    } else if (view === 'FORM20') {
      title = "Form 20 Result in Excel | Booth Wise Election Analysis Data";
      desc = "Download Form 20 Final Result Sheet in Excel format. Booth-wise votes for every candidate. Sortable and Filterable Excel Data for Election Analysis.";
      keywords = "form 20 in excel, form 20 excel download, booth wise election result excel, vidhan sabha result excel, chunav parinam form 20 data";
    }

    // 3. Apply SEO Tags
    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      // Create if doesn't exist (safety fallback)
      const k = document.createElement('meta');
      k.name = "keywords";
      k.content = keywords;
      document.head.appendChild(k);
    }

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
  // Light Mode Colors with Orange Accent options
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
      className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform active:scale-95 animate-pulse-soft"
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

// --- Added Missing Components ---

const OrderNotification = () => null;

const TrustSection = () => (
  <section className="py-12 bg-white px-4 border-t border-slate-100">
    <div className="max-w-7xl mx-auto text-center">
       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by Political Consultants across India</p>
       <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale">
          <div className="font-black text-xl text-slate-300">BJP IT CELL</div>
          <div className="font-black text-xl text-slate-300">INC DATA</div>
          <div className="font-black text-xl text-slate-300">AAP WAR ROOM</div>
          <div className="font-black text-xl text-slate-300">IPAC</div>
       </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-16 px-4 max-w-7xl mx-auto">
     <div className="text-center mb-12">
        <h2 className="text-2xl font-black uppercase text-slate-900">Client Success Stories</h2>
     </div>
     <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex gap-1 text-orange-400 mb-4"><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /></div>
           <p className="text-sm text-slate-600 mb-4">"The booth wise data for Punjab was 100% accurate. Helped us deploy Panna Pramukhs efficiently."</p>
           <div className="font-bold text-xs uppercase text-slate-900">- Campaign Manager, Ludhiana</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex gap-1 text-orange-400 mb-4"><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /></div>
           <p className="text-sm text-slate-600 mb-4">"Converted 500 PDF pages of Voter List to Excel in 2 days. Great speed and accuracy."</p>
           <div className="font-bold text-xs uppercase text-slate-900">- Data Head, UP East</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex gap-1 text-orange-400 mb-4"><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /><Sparkles className="w-4 h-4 fill-current" /></div>
           <p className="text-sm text-slate-600 mb-4">"The Voter Slip printing quality is excellent. QR codes worked perfectly for booth location."</p>
           <div className="font-bold text-xs uppercase text-slate-900">- MLA Candidate, Bihar</div>
        </div>
     </div>
  </section>
);

const FAQSection = () => (
   <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black uppercase text-center text-slate-900 mb-10">Frequently Asked Questions</h2>
      <div className="space-y-4">
         <details className="bg-white p-4 rounded-xl border border-slate-200 group">
            <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center text-slate-800">
               Is the data updated for 2025?
               <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">Yes, we process the latest final electoral rolls released by the Election Commission. The data is formatted for 2025-26 campaign use.</p>
         </details>
         <details className="bg-white p-4 rounded-xl border border-slate-200 group">
            <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center text-slate-800">
               In which format will I get the data?
               <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">You will receive the data in Microsoft Excel (.xlsx) format, which is easy to filter, sort, and print. We also provide CSV if requested.</p>
         </details>
         <details className="bg-white p-4 rounded-xl border border-slate-200 group">
            <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center text-slate-800">
               How do I pay and download?
               <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">Click on the 'Download' button for any constituency. It will open WhatsApp where you can pay via UPI. The file is shared instantly on WhatsApp.</p>
         </details>
      </div>
   </section>
);

const DataCoverageIndex = () => null;

const LegalDisclaimer = () => (
   <section className="py-8 px-4 text-center border-t border-slate-200 bg-slate-50">
      <p className="text-[10px] text-slate-400 max-w-4xl mx-auto leading-relaxed">
         Disclaimer: VoterListExcel.in is a private data processing service. We help organize publicly available electoral roll data (PDFs) into digital formats (Excel) for ease of analysis. We are not affiliated with the Election Commission of India. All data is for internal campaign management and research purposes only.
      </p>
   </section>
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
               <p className="text-[10px] text-center text-slate-400 mt-4 font-medium">100% Secure & Verified • Instant Delivery</p>
            </div>
         </div>
      </div>
   );
};

const SamplePreviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
   if (!isOpen) return null;
   return null; 
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
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-widest">Last Updated: Today</span>
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
            <div className="p-3 bg-white/10 rounded-lg">
               <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
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
                     <button 
                        onClick={() => onBuy(ac)}
                        className="bg-slate-900 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                     >
                        Download <Download className="w-3 h-3" />
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {filteredAcs.length === 0 && (
            <div className="text-center py-20 opacity-50">
               <Search className="w-12 h-12 mx-auto mb-4" />
               <p className="font-bold">No constituencies found matching "{searchTerm}"</p>
            </div>
         )}
      </div>
   );
};

const ContactView = ({ onBack }: { onBack: () => void }) => {
   return (
      <div className="max-w-4xl mx-auto px-4 animate-fade-in pb-10">
         <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-orange-500 text-[9px] font-black uppercase tracking-widest mb-10 group transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
         </button>
         
         <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-10 text-center text-white">
               <h1 className="text-3xl font-black uppercase tracking-tight mb-4">Contact Sales</h1>
               <p className="text-slate-400">For Bulk Orders, Custom Data requirements, or Support.</p>
            </div>
            <div className="p-10 text-center space-y-8">
               <div className="inline-block p-6 rounded-full bg-green-50 border border-green-100 mb-4">
                  <MessageSquare className="w-12 h-12 text-[#25D366]" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Support</h3>
                  <p className="text-slate-500 mb-6">Fastest response time (usually within 5 minutes)</p>
                  <button 
                     onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
                     className="bg-[#25D366] text-white px-8 py-4 rounded-xl font-black text-lg uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                     Chat on WhatsApp
                  </button>
               </div>
               <div className="pt-8 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operating Hours: 10:00 AM - 8:00 PM (Mon-Sat)</p>
               </div>
            </div>
         </div>
      </div>
   );
};

// --- NEW PAGE: FORM 20 (BOOTH WISE RESULTS IN EXCEL) ---
const Form20View = ({ onBack }: { onBack: () => void }) => {
   return (
     <div className="max-w-6xl mx-auto px-4 animate-fade-in pb-10">
       <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 text-[9px] font-black uppercase tracking-widest mb-10 group transition-all">
         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
       </button>
 
       {/* Hero Section - Excel Themed */}
       <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden text-white border-b-4 border-emerald-500 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute top-0 inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 pointer-events-none"></div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
             <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/50 border border-emerald-500/50 rounded-full mb-6">
                  <FileSpreadsheet className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Analysis Ready Data</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 leading-tight">
                  Form 20 Result <br/>
                  <span className="text-emerald-400">in Excel Format</span>
                </h1>
                <p className="text-slate-300 text-lg font-medium leading-relaxed mb-8 max-w-xl">
                  Convert static PDF Final Result Sheets into <span className="text-white font-bold underline decoration-emerald-500 decoration-2 underline-offset-4">Analysis Ready Excel</span>. 
                  Filter, Sort, and Calculate Booth-wise votes instantly.
                </p>
                <div className="flex flex-wrap gap-4">
                   <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                      <Table2 className="w-4 h-4 text-emerald-400" /> <span className="text-xs font-bold uppercase">Booth Wise Rows</span>
                   </div>
                   <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                      <Calculator className="w-4 h-4 text-emerald-400" /> <span className="text-xs font-bold uppercase">Auto Calculated</span>
                   </div>
                </div>
             </div>
             
             {/* Visual representation of Excel */}
             <div className="hidden md:block bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-slate-200">
                <div className="bg-emerald-600 h-8 flex items-center px-4">
                   <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4 grid gap-2">
                   <div className="h-6 bg-slate-100 rounded w-full"></div>
                   <div className="h-4 bg-slate-50 rounded w-full"></div>
                   <div className="h-4 bg-slate-50 rounded w-full"></div>
                   <div className="h-4 bg-slate-50 rounded w-3/4"></div>
                   <div className="h-4 bg-emerald-50 rounded w-full border border-emerald-100"></div>
                   <div className="h-4 bg-slate-50 rounded w-full"></div>
                </div>
                <div className="bg-slate-50 p-3 text-center text-[10px] font-bold text-slate-400 uppercase border-t border-slate-100">
                   Sample Excel Preview
                </div>
             </div>
          </div>
       </div>
 
       <AdPlaceholder text="Form 20 Page Top Ad" />
 
       <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Why Excel & Pricing */}
          <div className="md:col-span-2 space-y-8">
             
             {/* Why Excel? */}
             <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-black uppercase text-slate-900 mb-6 flex items-center gap-2">
                   <TrendingUp className="w-6 h-6 text-emerald-600" /> Why Download in Excel?
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                   <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <Filter className="w-5 h-5 text-emerald-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Easy Filtering</h4>
                      <p className="text-xs text-slate-600">Filter booths where your party got less than 10% votes instantly.</p>
                   </div>
                   <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <BarChart3 className="w-5 h-5 text-blue-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Compare Results</h4>
                      <p className="text-xs text-slate-600">Create charts and compare performance across different elections.</p>
                   </div>
                   <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                      <Target className="w-5 h-5 text-orange-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Booth Management</h4>
                      <p className="text-xs text-slate-600">Assign weak booths to workers by sorting data in ascending order.</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <FileText className="w-5 h-5 text-slate-600 mb-3" />
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Raw Data Access</h4>
                      <p className="text-xs text-slate-600">Get raw numbers for every single candidate and NOTA.</p>
                   </div>
                </div>
             </div>

             {/* Pricing Card - Prominent */}
             <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl border border-slate-800">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Database className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                   <Badge variant="green" className="mb-4">Best Value</Badge>
                   <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Pricing Plans</h3>
                   <p className="text-slate-400 text-sm mb-8">One-time payment. Lifetime access to the Excel file.</p>
                   
                   <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer group">
                         <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Single Assembly (AC)</div>
                         <div className="text-3xl font-black text-white mb-1">₹4500+</div>
                         <p className="text-[10px] text-slate-400">Per Vidhan Sabha Constituency</p>
                      </div>
                      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors cursor-pointer group">
                         <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Full Lok Sabha (PC)</div>
                         <div className="text-3xl font-black text-white mb-1">₹25000</div>
                         <p className="text-[10px] text-slate-400">All ACs in one Lok Sabha</p>
                      </div>
                   </div>

                   <button 
                      onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}?text=Hi, I want to buy Form 20 in Excel. Please share details.`, '_blank')}
                      className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-emerald-900/50 transition-all flex items-center justify-center gap-3 active:scale-95"
                   >
                      <MessageSquare className="w-5 h-5" /> Buy on WhatsApp
                   </button>
                </div>
             </div>
          </div>
 
          {/* Right Column: Educational Context */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="font-black uppercase tracking-widest text-xs mb-6 text-slate-500 flex items-center gap-2">
                   <Info className="w-4 h-4" /> Official Data Source
                </h3>
                
                <div className="space-y-6">
                   <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Form 20 क्या है?</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                         "चुनाव आयोग (Election Commission) के नियमों के अनुसार, प्रत्येक पोलिंग बूथ (Booth-wise) पर किस उम्मीदवार या पार्टी को कितने वोट मिले, इसकी जानकारी फॉर्म 20 (Form 20) में दर्ज होती है। इसे 'Final Result Sheet' भी कहा जाता है।"
                      </p>
                   </div>
                   
                   <div className="h-px bg-slate-100"></div>

                   <ul className="space-y-3">
                      <li className="flex gap-3">
                         <div className="mt-0.5"><Target className="w-3 h-3 text-emerald-600" /></div>
                         <div>
                            <span className="block text-xs font-bold text-slate-800">बूथ-वार विवरण</span>
                            <span className="text-[10px] text-slate-500">विधानसभा के हर बूथ का अलग डेटा।</span>
                         </div>
                      </li>
                      <li className="flex gap-3">
                         <div className="mt-0.5"><Users className="w-3 h-3 text-emerald-600" /></div>
                         <div>
                            <span className="block text-xs font-bold text-slate-800">उम्मीदवारों के वोट</span>
                            <span className="text-[10px] text-slate-500">EVM के अनुसार हर प्रत्याशी के वोट।</span>
                         </div>
                      </li>
                      <li className="flex gap-3">
                         <div className="mt-0.5"><FileText className="w-3 h-3 text-emerald-600" /></div>
                         <div>
                            <span className="block text-xs font-bold text-slate-800">पोस्टल बैलेट</span>
                            <span className="text-[10px] text-slate-500">पोस्टल वोटों की गिनती भी शामिल।</span>
                         </div>
                      </li>
                   </ul>
                </div>
             </div>

             <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-xs uppercase mb-4 text-slate-500">Where to verify data?</h4>
                <div className="space-y-3">
                   <a href="#" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><Globe className="w-3 h-3" /> Election Commission Website</a>
                   <a href="#" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><Globe className="w-3 h-3" /> CEO State Portals</a>
                   <a href="#" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><FileText className="w-3 h-3" /> RTI Request</a>
                </div>
             </div>
          </div>
       </div>
 
       <AdPlaceholder text="Bottom Content Ad" />
 
     </div>
   );
 }

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

  const handleBuy = (ac: AssemblyConstituency) => {
    setSelectedAc(ac);
    setIsPurchaseModalOpen(true);
  };

  const renderContent = () => {
    switch (view) {
      case 'STATE_VIEW':
        return selectedState ? (
          <StateView 
            state={selectedState} 
            onBack={() => setView('HOME')} 
            onBuy={handleBuy} 
          />
        ) : <div onClick={() => setView('HOME')}>Error loading state. Go Back</div>;
      
      case 'CONTACT':
        return <ContactView onBack={() => setView('HOME')} />;
        
      case 'FORM20':
        return <Form20View onBack={() => setView('HOME')} />;

      case 'HOME':
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 pb-20">
            {/* Hero Section */}
            <div className="text-center py-20 bg-slate-900 text-white rounded-3xl mb-16 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 px-4">
                <Badge variant="orange" className="mb-6 scale-110">India's #1 Election Data Provider</Badge>
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                  Win Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">Election</span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                  Download 100% Accurate Booth-Wise Voter List Data in Excel. <br className="hidden md:block"/> Used by 500+ MLAs and Campaign Managers across India.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                   <button 
                      onClick={() => document.getElementById('states-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-orange-500/30 flex items-center justify-center gap-2"
                   >
                      Download Data <ArrowRight className="w-5 h-5" />
                   </button>
                   <button 
                      onClick={() => setView('CONTACT')}
                      className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all backdrop-blur-sm border border-white/10"
                   >
                      Bulk Enquiry
                   </button>
                </div>
              </div>
            </div>
            
            <TrustSection />

            {/* Services Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
               <div onClick={() => setView('FORM20')} className="bg-emerald-50 hover:bg-emerald-100 p-6 rounded-2xl border border-emerald-100 cursor-pointer transition-all group">
                  <FileSpreadsheet className="w-8 h-8 text-emerald-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Form 20 Excel</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Booth Wise Result</p>
               </div>
               <div onClick={() => setView('PRINTING')} className="bg-blue-50 hover:bg-blue-100 p-6 rounded-2xl border border-blue-100 cursor-pointer transition-all group">
                  <Printer className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Voter Slips</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Photo Parchi Print</p>
               </div>
               <div onClick={() => setView('DATA_CONVERSION')} className="bg-purple-50 hover:bg-purple-100 p-6 rounded-2xl border border-purple-100 cursor-pointer transition-all group">
                  <FileDigit className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">PDF to Excel</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">100% Accuracy</p>
               </div>
               <div onClick={() => setView('SURVEY')} className="bg-orange-50 hover:bg-orange-100 p-6 rounded-2xl border border-orange-100 cursor-pointer transition-all group">
                  <Phone className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-black text-slate-900 uppercase text-sm">Survey / IVR</h3>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Campaign Tools</p>
               </div>
            </div>

            {/* States Grid */}
            <div id="states-section" className="mb-20">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Select Your State</h2>
                  <div className="h-px bg-slate-200 flex-1"></div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {INDIAN_STATES.map((state) => (
                     <div 
                        key={state.id} 
                        onClick={() => handleStateClick(state)}
                        className="bg-white hover:bg-slate-50 border border-slate-200 hover:border-orange-300 p-6 rounded-xl cursor-pointer transition-all group shadow-sm hover:shadow-md"
                     >
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                              {state.code}
                           </div>
                           <Badge variant="slate">{state.totalSeats} Seats</Badge>
                        </div>
                        <h3 className="text-lg font-black uppercase text-slate-900 group-hover:text-orange-600 transition-colors">{state.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-1">View Assembly Constituencies <ChevronRight className="w-3 h-3 inline" /></p>
                     </div>
                  ))}
               </div>
            </div>
            
            <AdPlaceholder text="Homepage Mid Ad" />
            <Testimonials />
            <FAQSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div onClick={() => setView('HOME')}>
             <PremiumLogo />
          </div>
          <div className="hidden md:flex items-center gap-8">
             <button onClick={() => setView('HOME')} className={`text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors ${view === 'HOME' ? 'text-orange-500' : 'text-slate-600'}`}>Home</button>
             <button onClick={() => setView('FORM20')} className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-orange-500 transition-colors">Form 20 Data</button>
             <button onClick={() => setView('CONTACT')} className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-orange-500 transition-colors">Contact</button>
             <button 
                onClick={() => window.open(`https://wa.me/${CONTACT_WHATSAPP}`, '_blank')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
             >
                Support
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-8">
         {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-4 mt-auto">
         <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
               <PremiumLogo />
               <p className="text-xs text-slate-500 mt-4 leading-relaxed max-w-sm">
                  VoterListExcel.in is India's most trusted platform for electoral data digitization. We provide booth-wise voter lists, Form 20 results, and campaign management tools.
               </p>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Quick Links</h4>
               <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li onClick={() => setView('HOME')} className="cursor-pointer hover:text-orange-500">Home</li>
                  <li onClick={() => setView('FORM20')} className="cursor-pointer hover:text-orange-500">Form 20 Result</li>
                  <li onClick={() => setView('PRINTING')} className="cursor-pointer hover:text-orange-500">Printing Services</li>
                  <li onClick={() => setView('CONTACT')} className="cursor-pointer hover:text-orange-500">Contact Us</li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-4">Legal</h4>
               <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li className="cursor-pointer hover:text-orange-500">Privacy Policy</li>
                  <li className="cursor-pointer hover:text-orange-500">Terms of Service</li>
                  <li className="cursor-pointer hover:text-orange-500">Refund Policy</li>
               </ul>
            </div>
         </div>
         <LegalDisclaimer />
         <div className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            © 2025 VoterListExcel.in • All Rights Reserved
         </div>
      </footer>

      <FloatingWhatsApp />
      <div className="fixed bottom-6 left-6 z-50">
         <VisitorCounter />
      </div>

      <PurchaseModal 
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        ac={selectedAc}
        stateName={selectedState?.name}
      />
    </div>
  );
};

export default App;
