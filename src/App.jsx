import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';

const APP_DATA = [
  { id: 1, name: "STLAPPss-Litigation", cat: "Internal", icon: "🌐", desc: "Need anything for work? Check this app.", url: "https://sites.google.com/view/stlaf-litigation/home", dept: "Litigation Department" },
  { id: 2, name: "IT Asset Management", cat: "IT Operations", icon: "🖥️", desc: "Track, manage, and optimize the lifecycle of hardware assets.", url: "http://192.168.112.12:3005/", dept: "IT Department" },
  { id: 3, name: "HR Portal", cat: "Internal", icon: "🏢", desc: "View payslips, request leave, and manage benefits.", url: "https://google.com", dept: "HR Department" },
  { id: 4, name: "IT Support", cat: "Ticketing System", icon: "🛠️", desc: "Submit tickets for hardware or software issues.", url: "http://192.168.112.12:3000/", dept: "IT Department" },
  { id: 5, name: "Finance Hub", cat: "Accounting", icon: "💰", desc: "Submit expenses and view department budgets.", url: "https://google.com", dept: "Finance Team" },
  { id: 6, name: "Inventory", cat: "Logistics", icon: "📦", desc: "Track office supplies and company assets.", url: "https://google.com", dept: "Operations" },
  { id: 7, name: "Learning", cat: "Training", icon: "🎓", desc: "STLAF internal training and certification portal.", url: "https://google.com", dept: "L&D Department" },
  { id: 8, name: "Directory", cat: "People", icon: "🔍", desc: "Find contact information for all STLAF employees.", url: "https://google.com", dept: "IT Department" },
];

const VALID_USERNAME = "stlafEmp";
const VALID_PASSWORD = "stlaf@2026!";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [showLoginPanel, setShowLoginPanel] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginShake, setLoginShake] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("stlaf_user");
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentPage("apps");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    setCurrentPage("login");
    setTimeout(() => setShowLoginPanel(true), 50);
  };

  const handleBackToWelcome = () => {
    setShowLoginPanel(false);
    setTimeout(() => {
      setCurrentPage("welcome");
      setUsername("");
      setPassword("");
      setLoginError("");
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("stlaf_user", "authenticated");
        setIsLoggedIn(true);
        setCurrentPage("apps");
        setShowLoginPanel(false);
        setUsername("");
        setPassword("");
        setLoginError("");
      } else {
        setLoginError("Invalid username or password. Please try again.");
        setLoginShake(true);
        setTimeout(() => setLoginShake(false), 600);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("welcome");
    setShowLoginPanel(false);
    setSearchTerm("");
    localStorage.removeItem("stlaf_user");
  };

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
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(204, 170, 73, 0.1); }
          50% { box-shadow: 0 0 40px rgba(204, 170, 73, 0.3); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .login-shake {
          animation: shake 0.6s ease-in-out;
        }
        .login-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .spinner {
          animation: spin 1s linear infinite;
        }
        .page-enter {
          animation: fadeIn 0.5s ease-out;
        }

        /* No scroll for welcome & login */
        .no-scroll-page {
          height: 100vh;
          overflow: hidden;
        }

        /* Split panel layout */
        .split-container {
          display: flex;
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        /* Left panel */
        .left-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 10;
        }
        .left-panel.slide-left {
          width: 50%;
        }

        /* Right panel */
        .right-panel {
          width: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0A3055;
          position: relative;
          z-index: 10;
        }
        .right-panel.show {
          width: 50%;
          opacity: 1;
        }
        .right-panel .login-inner {
          opacity: 0;
          transform: translateX(60px);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }
        .right-panel.show .login-inner {
          opacity: 1;
          transform: translateX(0);
        }

        /* Reduced blur for header & footer */
        .blur-section {
          transition: filter 0.7s ease, opacity 0.7s ease;
        }
        .blur-section.blurred {
          filter: blur(1px);
          opacity: 0.6;
          pointer-events: none;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .left-panel.slide-left {
            display: none;
          }
          .right-panel.show {
            width: 100%;
            position: fixed;
            inset: 0;
            z-index: 100;
            overflow-y: auto;
          }
          .split-container.login-active::before {
            content: '';
            position: fixed;
            inset: 0;
            background: rgba(10, 48, 85, 0.7);
            backdrop-filter: blur(3px);
            z-index: 90;
          }
        }

        .login-bg-pattern {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(204, 170, 73, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(10, 48, 85, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 60% 80%, rgba(204, 170, 73, 0.05) 0%, transparent 50%);
        }
      `}</style>

      {/* ======================== WELCOME + LOGIN PAGE ======================== */}
      {(currentPage === "welcome" || currentPage === "login") && (
        <div className="no-scroll-page flex flex-col">

          {/* HEADER */}
          <nav className={`bg-[#0A3055] text-white p-3 md:px-10 shadow-md shrink-0 blur-section ${currentPage === "login" ? "blurred" : ""}`}>
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              <img src={logo} alt="STLAF" className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </nav>

          {/* SPLIT CONTAINER */}
          <div className={`split-container ${currentPage === "login" ? "login-active" : ""}`}>

            {/* LEFT PANEL */}
            <div className={`left-panel ${showLoginPanel ? "slide-left" : ""}`}>
              <div className="max-w-xl">
                <div className="mb-6">
                  <p className="text-[#CCAA49] font-black tracking-[0.3em] uppercase text-xs md:text-sm">
                    {dateTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-[#0A3055] font-light text-3xl md:text-5xl mt-1 tracking-tighter">
                    {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0A3055] tracking-tighter uppercase mb-4 leading-none">
                  WELCOME TO THE <br /> STLAF PORTAL
                </h1>
                <p className="text-[#0A3055] text-sm md:text-lg font-medium leading-relaxed mb-8 max-w-4xl">
                  This web app is a list of applications where <span className="font-black">all departments</span> created their own apps to automate and innovate our workspace.
                </p>

                {!showLoginPanel && (
                  <button
                    onClick={handleGetStarted}
                    className="bg-[#0A3055] text-white px-10 py-4 rounded-lg font-black uppercase text-lg tracking-widest shadow-xl hover:bg-[#CCAA49] transition-all active:scale-95"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className={`right-panel login-bg-pattern ${showLoginPanel ? "show" : ""}`}>
              <div className="login-inner w-full max-w-md px-6 md:px-8">

                {/* Back Button */}
                <button
                  onClick={handleBackToWelcome}
                  className="flex items-center gap-2 text-white/50 hover:text-[#CCAA49] text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group mb-6"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden login-glow ${loginShake ? 'login-shake' : ''}`}>

                  {/* Card Header - No icon */}
                  <div className="bg-gradient-to-r from-[#0A3055] to-[#0d3d6e] px-8 py-6 text-center">
                    <h2 className="text-white text-2xl font-black uppercase tracking-tight">Sign In</h2>
                    <p className="text-white/50 text-xs mt-2 uppercase tracking-widest font-semibold">Access STLAF Portal</p>
                  </div>

                  {/* Card Body */}
                  <div className="px-8 py-8">
                    <form onSubmit={handleLogin} className="space-y-5">

                      {/* Username */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setLoginError(""); }}
                            placeholder="Enter your username"
                            required
                            disabled={isLoading}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium text-[#0A3055] outline-none focus:border-[#CCAA49] focus:bg-white transition-all duration-300 disabled:opacity-50"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Password</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                            placeholder="Enter your password"
                            required
                            disabled={isLoading}
                            className="w-full pl-11 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm font-medium text-[#0A3055] outline-none focus:border-[#CCAA49] focus:bg-white transition-all duration-300 disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0A3055] transition-colors"
                          >
                            {showPassword ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Error */}
                      {loginError && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold">
                          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {loginError}
                        </div>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isLoading || !username || !password}
                        className="w-full bg-[#0A3055] text-white py-3.5 rounded-xl font-black uppercase text-sm tracking-widest shadow-lg hover:bg-[#CCAA49] hover:text-[#0A3055] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0A3055] disabled:hover:text-white flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <svg className="w-4 h-4 spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Signing In...
                          </>
                        ) : (
                          <>Sign In</>
                        )}
                      </button>
                    </form>
                  </div>
                </div>

                <p className="text-center text-white/30 text-[10px] uppercase font-bold tracking-widest mt-6">
                  Secured by STLAF IT Department
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <footer className={`bg-[#0A3055] text-white py-6 px-6 md:px-12 shrink-0 border-t border-white/5 blur-section ${currentPage === "login" ? "blurred" : ""}`}>
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-sm uppercase leading-none mb-1 tracking-tight">Sadsad Tamesis Legal and Accountancy Firm</h3>
                <p className="text-[9px] opacity-40 uppercase font-black tracking-widest">Copyright © 2026 STLAF Firm</p>
              </div>
              <div className="flex items-center gap-8">
                <a href="https://www.facebook.com/sadsadtamesislaw" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/sadsadtamesislawfirm/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.instagram.com/sadsadtamesis/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="mailto:legal@sadsadtamesislaw.com" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" /></svg>
                </a>
                <a href="https://stlaf.global/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* ======================== APPS PAGE ======================== */}
      {currentPage === "apps" && isLoggedIn && (
        <div className="min-h-screen flex flex-col page-enter">

          {/* Apps Header */}
          <nav className="bg-[#0A3055] text-white p-3 md:px-10 shadow-md sticky top-0 z-50">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
              <img
                src={logo}
                alt="STLAF"
                className="h-10 md:h-12 w-auto object-contain cursor-pointer"
                onClick={() => setSearchTerm("")}
              />

              {/* Search + Logout grouped on right */}
              <div className="flex items-center gap-3 ml-4">
                <div className="w-[140px] md:w-[280px]">
                  <input
                    type="text"
                    placeholder="Search apps"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-white text-sm outline-none focus:bg-white focus:text-[#0A3055] transition-all placeholder:text-white/40"
                  />
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-white/10 hover:bg-red-500 text-white px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 shrink-0"
                  title="Sign Out"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Apps Content */}
          <main className="flex-grow">
            <div className="max-w-[1600px] mx-auto w-full p-6 md:p-12">

              {/* Greeting */}
              <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-[#0A3055] uppercase tracking-tight">
                  Hello there! 👋
                </h2>
                <p className="text-sm text-gray-400 mt-1 font-medium">
                  Browse and launch your department applications below.
                </p>
              </div>

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

              {filteredApps.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-6xl mb-4">🔍</p>
                  <p className="text-xl font-black text-[#0A3055] uppercase tracking-tight">No apps found</p>
                  <p className="text-sm text-gray-400 mt-2">Try a different search term</p>
                </div>
              )}
            </div>
          </main>

          {/* Apps Footer */}
          <footer className="bg-[#0A3055] text-white py-6 px-6 md:px-12 shrink-0 border-t border-white/5 z-50">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-sm uppercase leading-none mb-1 tracking-tight">Sadsad Tamesis Legal and Accountancy Firm</h3>
                <p className="text-[9px] opacity-40 uppercase font-black tracking-widest">Copyright © 2026 STLAF Firm</p>
              </div>
              <div className="flex items-center gap-8">
                <a href="https://www.facebook.com/sadsadtamesislaw" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/sadsadtamesislawfirm/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.instagram.com/sadsadtamesis/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="mailto:legal@sadsadtamesislaw.com" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" /></svg>
                </a>
                <a href="https://stlaf.global/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;