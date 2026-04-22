import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';

const APP_DATA = [
  { id: 1, name: "LITIGATION", cat: "Communication", icon: "", desc: "Access your STLAF corporate email and calendar.", url: "https://sites.google.com/view/stlaf-litigation/home", dept: "Litigation Department" },
  { id: 2, name: "Teams", cat: "Collaboration", icon: "👥", desc: "Chat, meet, and collaborate with STLAF teams.", url: "https://teams.microsoft.com", dept: "IT Department" },
  { id: 3, name: "HR Portal", cat: "Internal", icon: "🏢", desc: "View payslips, request leave, and manage benefits.", url: "https://google.com", dept: "HR Department" },
  { id: 4, name: "IT Support", cat: "Ticketing System", icon: "🛠️", desc: "Submit tickets for hardware or software issues.", url: "http://192.168.112.12:3000/", dept: "IT Department" },
  { id: 5, name: "Finance Hub", cat: "Accounting", icon: "💰", desc: "Submit expenses and view department budgets.", url: "https://google.com", dept: "Finance Team" },
  { id: 6, name: "Inventory", cat: "Logistics", icon: "📦", desc: "Track office supplies and company assets.", url: "https://google.com", dept: "Operations" },
  { id: 7, name: "Learning", cat: "Training", icon: "🎓", desc: "STLAF internal training and certification portal.", url: "https://google.com", dept: "L&D Department" },
  { id: 8, name: "Directory", cat: "People", icon: "🔍", desc: "Find contact information for all STLAF employees.", url: "https://google.com", dept: "IT Department" },
];

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredApps = APP_DATA.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] font-sans text-[#0A3055]">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .footer-icon { transition: all 0.3s ease; }
        .footer-icon:hover { transform: scale(1.25); color: #CCAA49; }
      `}</style>

      {/* HEADER */}
      <nav className="bg-[#0A3055] text-white p-3 md:px-10 shadow-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <img 
            src={logo} 
            alt="STLAF" 
            className="h-10 md:h-12 w-auto object-contain cursor-pointer"
            onClick={() => setHasStarted(false)}
          />

          {hasStarted && (
            <div className="w-full max-w-[180px] md:max-w-sm ml-4">
              <input 
                type="text" 
                placeholder="Search apps" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-white text-sm outline-none focus:bg-white focus:text-[#0A3055] transition-all" 
              />
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col">
        
        {!hasStarted ? (
          /* RESTORED WELCOME PAGE + LIVE DATE/TIME */
          <div className="flex-grow flex flex-col justify-center items-center text-center px-6 py-20 animate-in fade-in duration-700">
            
            {/* LIVE DATE & TIME DISPLAY */}
            <div className="mb-6">
              <p className="text-[#CCAA49] font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                {dateTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-[#0A3055] font-light text-3xl md:text-5xl mt-1 tracking-tighter">
                {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#0A3055] tracking-tighter uppercase mb-4 leading-none">
              WELCOME TO THE <br/> STLAF PORTAL
            </h1>
            <p className="text-[#0A3055] text-base md:text-xl font-medium leading-relaxed mb-8 max-w-4xl">
              This web app is a list of applications where <span className="font-black">all departments</span> created their own apps to automate and innovate our workspace.
            </p>
            <button 
              onClick={() => setHasStarted(true)}
              className="bg-[#0A3055] text-white px-10 py-4 rounded-lg font-black uppercase text-lg tracking-widest shadow-xl hover:bg-[#CCAA49] transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        ) : (
          /* GRID VIEW WITH HOVER ANIMATION */
          <div className="max-w-[1600px] mx-auto w-full p-6 md:p-12 animate-in fade-in zoom-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredApps.map((app) => (
                <div 
                  key={app.id} 
                  className="group relative h-72 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                    <div className="text-7xl mb-4 p-6 bg-gray-50 rounded-full transition-colors group-hover:bg-blue-50">
                      {app.icon}
                    </div>
                    <h3 className="text-xl font-black text-[#0A3055] uppercase tracking-tight">{app.name}</h3>
                    <p className="text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-widest">{app.cat}</p>
                  </div>

                  <div className="absolute inset-0 bg-[#0A3055] p-8 flex flex-col justify-center items-center text-center translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    <span className="text-4xl mb-3">{app.icon}</span>
                    <h3 className="text-white text-2xl font-black uppercase tracking-tighter mb-1">{app.name}</h3>
                    <p className="text-[#CCAA49] text-[9px] font-bold uppercase tracking-widest mb-4">Dept: {app.dept}</p>
                    <p className="text-white/80 text-sm mb-6 leading-snug italic font-medium">
                      "{app.desc}"
                    </p>
                    <a 
                      href={app.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#CCAA49] text-[#0A3055] px-8 py-2.5 rounded font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                    >
                      Launch App
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0A3055] text-white py-6 px-6 md:px-12 shrink-0 border-t border-white/5 z-50">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-sm uppercase leading-none mb-1 tracking-tight">Sadsad Tamesis Legal and Accountancy Firm</h3>
            <p className="text-[9px] opacity-40 uppercase font-black tracking-widest">Copyright © 2026 STLAF Firm</p>
          </div>

          <div className="flex items-center gap-8">
            <a href="https://www.facebook.com/sadsadtamesislaw" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/sadsadtamesislawfirm/" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/sadsadtamesis/" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="mailto:legal@sadsadtamesislaw.com" className="footer-icon">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>
            </a>
            <a href="https://stlaf.global/" target="_blank" rel="noopener noreferrer" className="footer-icon">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;