import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';

const APP_DATA = [
  { id: 1, name: "STLAPPss-Litigation", cat: "Internal", desc: "Need anything for work? Check this app.", url: "https://sites.google.com/view/stlaf-litigation/home", dept: "Litigation Department" },
  { id: 9, name: "Liaison Operations Tracker", cat: "Internal", desc: "Centralized platform for assigning, monitoring, and managing field liaison tasks across all firm departments.", url: "https://stlaf-lo-tracker.base44.app/", dept: "Litigation Department" },
  { id: 2, name: "IT Asset Management", cat: "IT Operations", desc: "Track, manage, and optimize the lifecycle of hardware assets.", url: "http://192.168.112.12:3005/", dept: "IT Department" },
  { id: 4, name: "IT Support", cat: "IT Support & Service Desk", desc: "Allows users to submit and track tickets for hardware and software issues.", url: "http://192.168.112.12:3000/", dept: "IT Department" },
  { id: 10, name: "IT Support Bot", cat: "Knowledge Assistant", desc: "Uses AI to analyze documents, answer questions, and generate insights based on uploaded IT-related materials.", url: "https://notebooklm.google.com/notebook/91564952-5aa6-4032-897b-56a0146f1f3a", dept: "IT Department" },
  { id: 3, name: "HR Portal", cat: "Internal", desc: "View payslips, request leave, and manage benefits.", url: "https://google.com", dept: "HR Department" },
  { id: 11, name: "Recruitment Hub", cat: "Internal", desc: "Manage job postings, applicants, and interview schedules.", url: "https://google.com", dept: "HR Department" },
  { id: 17, name: "Campaign Manager", cat: "Marketing", desc: "Plan, execute, and track marketing campaigns.", url: "https://google.com", dept: "Marketing Department" },
  { id: 18, name: "Social Media Hub", cat: "Marketing", desc: "Schedule posts and monitor social media analytics.", url: "https://google.com", dept: "Marketing Department" },
  { id: 15, name: "Tax Filing System", cat: "Accounting", desc: "Prepare and submit client tax documents and filings.", url: "https://google.com", dept: "Accounting Department" },
  { id: 16, name: "Audit Workspace", cat: "Accounting", desc: "Manage audit schedules, working papers, and findings.", url: "https://google.com", dept: "Accounting Department" },
  { id: 19, name: "Board Portal", cat: "Corporate", desc: "Access board meeting agendas, minutes, and resolutions.", url: "https://google.com", dept: "Corporate Department" },
  { id: 20, name: "Policy Manager", cat: "Corporate", desc: "View, update, and distribute company policies.", url: "https://google.com", dept: "Corporate Department" },
];

const VALID_USERNAME = "stlafEmp";
const VALID_PASSWORD = "stlaf@2026!";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [panelClosing, setPanelClosing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const detailRef = useRef(null);
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [loginCardVisible, setLoginCardVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginShake, setLoginShake] = useState(false);
  const [mobileTab, setMobileTab] = useState("info");
  const listRef = useRef(null);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const launchTimerRef = useRef(null);
  const launchUrlRef = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("stlaf_user")) { setIsLoggedIn(true); setCurrentPage("apps"); }
    const su = localStorage.getItem("stlaf_remember_user"), sp = localStorage.getItem("stlaf_remember_pass");
    if (su && sp) { setUsername(su); setPassword(sp); setRememberMe(true); }
    if (localStorage.getItem("stlaf_theme") === "dark") setDarkMode(true);
  }, []);
  useEffect(() => { const t = setInterval(() => setDateTime(new Date()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); }; document.addEventListener("mousedown", h); return () => document.removeEventListener("mousedown", h); }, []);
  useEffect(() => { const h = (e) => { if (e.key === "Escape" && selectedApp) handleClosePanel(); }; document.addEventListener("keydown", h); return () => document.removeEventListener("keydown", h); }, [selectedApp]);
  useEffect(() => { if (selectedApp) { setMobileTab("info"); setLaunchProgress(0); setIsLaunching(false); } }, [selectedApp]);
  useEffect(() => { return () => { if (launchTimerRef.current) clearInterval(launchTimerRef.current); }; }, []);

  const dm = darkMode;
  const toggleDarkMode = () => { setDarkMode(!dm); localStorage.setItem("stlaf_theme", !dm ? "dark" : "light"); };
  const handleGetStarted = () => { setCurrentPage("login"); setTimeout(() => setShowLoginPanel(true), 50); setTimeout(() => setLoginCardVisible(true), 600); };
  const handleCloseLogin = () => { setIsClosing(true); setLoginCardVisible(false); setTimeout(() => { setShowLoginPanel(false); setIsClosing(false); }, 400); setTimeout(() => { setCurrentPage("welcome"); setLoginError(""); }, 900); };
  const handleLogin = (e) => { e.preventDefault(); setLoginError(""); setIsLoading(true); setTimeout(() => { if (username === VALID_USERNAME && password === VALID_PASSWORD) { localStorage.setItem("stlaf_user", "authenticated"); if (rememberMe) { localStorage.setItem("stlaf_remember_user", username); localStorage.setItem("stlaf_remember_pass", password); } else { localStorage.removeItem("stlaf_remember_user"); localStorage.removeItem("stlaf_remember_pass"); } setIsLoggedIn(true); setCurrentPage("apps"); setShowLoginPanel(false); setLoginCardVisible(false); setLoginError(""); } else { setLoginError("Invalid credentials."); setLoginShake(true); setTimeout(() => setLoginShake(false), 600); } setIsLoading(false); }, 800); };
  const handleLogout = () => { setIsLoggedIn(false); setCurrentPage("welcome"); setShowLoginPanel(false); setLoginCardVisible(false); setSearchTerm(""); setActiveFilter("All"); setSelectedApp(null); localStorage.removeItem("stlaf_user"); if (!rememberMe) { setUsername(""); setPassword(""); } };
  const handleSelectApp = (app) => { setSelectedApp(app); setPanelClosing(false); };
  const handleClosePanel = () => { setPanelClosing(true); setIsLaunching(false); setLaunchProgress(0); if (launchTimerRef.current) clearInterval(launchTimerRef.current); setTimeout(() => { setSelectedApp(null); setPanelClosing(false); }, 350); };

  const handleLaunchClick = (url) => {
    if (isLaunching) return;
    setIsLaunching(true);
    setLaunchProgress(0);
    launchUrlRef.current = url;
    let progress = 0;
    const totalDuration = 2000;
    const interval = 16;
    const increment = 100 / (totalDuration / interval);
    launchTimerRef.current = setInterval(() => {
      progress += increment;
      if (progress >= 100) {
        progress = 100;
        clearInterval(launchTimerRef.current);
        setLaunchProgress(100);
        setTimeout(() => {
          window.open(launchUrlRef.current, "_blank", "noopener,noreferrer");
          setTimeout(() => {
            setIsLaunching(false);
            setLaunchProgress(0);
          }, 400);
        }, 200);
      } else {
        setLaunchProgress(progress);
      }
    }, interval);
  };

  const departments = ["All", ...new Set(APP_DATA.map(a => a.dept))];
  const filteredApps = APP_DATA.filter(app => { const q = searchTerm.toLowerCase(); return (app.name.toLowerCase().includes(q) || app.cat.toLowerCase().includes(q) || app.dept.toLowerCase().includes(q)) && (activeFilter === "All" || app.dept === activeFilter); });
  const panelOpen = !!selectedApp && !panelClosing;

  const socialLinks = [
    { href: "https://www.facebook.com/sadsadtamesislaw", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { href: "https://www.linkedin.com/company/sadsadtamesislawfirm/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
    { href: "https://www.instagram.com/sadsadtamesis/", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { href: "mailto:legal@sadsadtamesislaw.com", icon: "M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" },
    { href: "https://stlaf.global/", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
  ];
  const SocialIcons = ({ size = "w-5 h-5" }) => (<>{socialLinks.map((l, i) => (<a key={i} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="text-white hover:text-[#CCAA49] transition-all duration-300 hover:scale-125"><svg className={`${size} fill-current`} viewBox="0 0 24 24"><path d={l.icon} /></svg></a>))}</>);

  const n = {
    bg: "#030a18", bgCard: "#071428", bgCardHover: "#0c1e38", bgNav: "#040e1f",
    bgPanel: "#081830", bgPanelSection: "#0a1e3a",
    border: "#00BFFF18", borderActive: "#00BFFF55", borderHover: "#00BFFF40", borderPanel: "#00BFFF22",
    neon: "#00BFFF", neonSoft: "#00BFFF99", neonMuted: "#00BFFF60", neonDim: "#00BFFF35", neonFaint: "#00BFFF18", neonGhost: "#00BFFF0a",
    textPrimary: "#e8f4ff", textSecondary: "#a0cfee", textMuted: "#5a9dc4", textDim: "#3d7a9e",
    green: "#00ff88", greenDim: "#00ff8866", gold: "#CCAA49",
  };

  const renderPanelContent = (app, tab = null) => {
    const showInfo = tab === null || tab === "info";
    return (
      <>
        {showInfo && (
          <>
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}` }}>
              <svg className="w-4 h-4" style={{ color: n.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: n.gold }}>{app.dept}</p>
            </div>
            {tab === null && (
              <>
                <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: dm ? n.neonMuted : "rgba(255,255,255,.3)" }}>About</h4>
                <p className="text-sm font-light leading-relaxed mb-7" style={{ color: dm ? n.textSecondary : "rgba(255,255,255,.6)" }}>{app.desc}</p>
              </>
            )}
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: dm ? n.neonMuted : "rgba(255,255,255,.3)" }}>Details</h4>
            <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.08)"}` }}>
              {[{ label: "Category", value: app.cat }, { label: "Department", value: app.dept }, { label: "Status", isStatus: true }].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3" style={{ borderBottom: i < 2 ? `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.08)"}` : "none", background: i % 2 === 0 ? (dm ? n.bgPanelSection : "rgba(255,255,255,.03)") : "transparent" }}>
                  <span className="text-xs" style={{ color: dm ? n.textDim : "rgba(255,255,255,.35)" }}>{row.label}</span>
                  {row.isStatus ? <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#4ade80", boxShadow: `0 0 6px ${dm ? n.greenDim : "rgba(74,222,128,.5)"}` }} /><span className="text-xs font-semibold" style={{ color: dm ? n.green : "#4ade80" }}>Active</span></span>
                    : <span className="text-xs font-semibold" style={{ color: dm ? n.textPrimary : "rgba(255,255,255,.8)" }}>{row.value}</span>}
                </div>
              ))}
            </div>
            {tab === null && (
              <div className="mt-5 rounded-xl p-4" style={{ background: dm ? n.bgPanelSection : "rgba(255,255,255,.05)", border: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.08)"}` }}>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-3.5 h-3.5" style={{ color: dm ? n.neonMuted : "rgba(255,255,255,.5)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: dm ? n.textDim : "rgba(255,255,255,.4)" }}>URL</p>
                </div>
                <p className="text-xs font-medium break-all" style={{ color: dm ? n.textMuted : "rgba(255,255,255,.5)" }}>{app.url}</p>
              </div>
            )}
          </>
        )}
        {tab === "about" && (
          <>
            <h4 className="text-lg font-black tracking-tight mb-4" style={{ color: dm ? n.textPrimary : "white" }}>{app.name}</h4>
            <p className="text-sm font-light leading-relaxed mb-6" style={{ color: dm ? n.textSecondary : "rgba(255,255,255,.6)" }}>{app.desc}</p>
            <div className="rounded-xl p-4 mb-4" style={{ background: dm ? n.bgPanelSection : "rgba(255,255,255,.05)", border: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.08)"}` }}>
              <div className="flex items-center gap-2 mb-2"><svg className="w-3.5 h-3.5" style={{ color: n.gold }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg><p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: n.gold }}>Department</p></div>
              <p className="text-sm font-medium" style={{ color: dm ? n.textPrimary : "rgba(255,255,255,.7)" }}>{app.dept}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: dm ? n.bgPanelSection : "rgba(255,255,255,.05)", border: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.08)"}` }}>
              <div className="flex items-center gap-2 mb-2"><svg className="w-3.5 h-3.5" style={{ color: dm ? n.neonMuted : "rgba(255,255,255,.5)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg><p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: dm ? n.textDim : "rgba(255,255,255,.4)" }}>URL</p></div>
              <p className="text-xs font-medium break-all" style={{ color: dm ? n.textMuted : "rgba(255,255,255,.5)" }}>{app.url}</p>
            </div>
          </>
        )}
      </>
    );
  };

  const LaunchButton = ({ url }) => {
    const done = launchProgress >= 100;
    const active = isLaunching;
    const pct = Math.min(launchProgress, 100);

    const fillColor = dm ? n.gold : n.gold;
    const baseColor = dm ? n.bgPanelSection : "white";
    const textIdle = dm ? n.textPrimary : "#123765";
    const textFilling = "white";
    const textDone = "white";

    const currentText = done ? "Launching..." : active ? `${Math.round(pct)}%` : "Launch App";
    const currentTextColor = active ? (pct > 50 ? textFilling : textIdle) : textIdle;

    return (
      <button
        onClick={(e) => { e.preventDefault(); handleLaunchClick(url); }}
        disabled={isLaunching}
        className="launch-btn relative block w-full py-3.5 rounded-xl font-bold text-sm text-center overflow-hidden select-none"
        style={{
          background: baseColor,
          color: done ? textDone : currentTextColor,
          border: dm ? `1px solid ${n.borderPanel}` : "none",
          boxShadow: active
            ? (dm ? `0 0 20px ${n.gold}33, 0 0 40px ${n.gold}15` : `0 8px 25px ${n.gold}33`)
            : (dm ? `0 0 10px ${n.neonGhost}` : "0 4px 14px rgba(0,0,0,.08)"),
          cursor: isLaunching ? "not-allowed" : "pointer",
          transition: "box-shadow .3s ease, color .15s ease",
        }}
      >
        {/* Fill bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${pct}%`,
            background: fillColor,
            borderRadius: "inherit",
            transition: pct === 0 ? "none" : "width 0.05s linear",
            zIndex: 0,
          }}
        />
        {/* Shimmer on fill */}
        {active && !done && (
          <div
            className="launch-shimmer"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${pct}%`,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.25) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              borderRadius: "inherit",
              zIndex: 1,
            }}
          />
        )}
        {/* Text */}
        <span className="relative z-10 flex items-center justify-center gap-2" style={{ transition: "color .15s ease" }}>
          {done && (
            <svg className="w-4 h-4 launch-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {active && !done && (
            <svg className="w-4 h-4 launch-spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          <span style={{ letterSpacing: active ? "0.12em" : "0.05em", transition: "letter-spacing .3s ease" }}>{currentText}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-[#0A3055]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body{font-family:'Inter',sans-serif;margin:0}
        @keyframes shake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-4px)}20%,40%,60%,80%{transform:translateX(4px)}}
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:scale(.98)}to{opacity:1;transform:scale(1)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardPop{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes dropdownIn{from{opacity:0;transform:translateY(-8px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes neonPulse{0%,100%{box-shadow:0 0 6px ${n.neonFaint},0 0 18px ${n.neonGhost}}50%{box-shadow:0 0 14px ${n.neonDim},0 0 35px ${n.neonFaint}}}
        @keyframes panelSlideIn{from{transform:translateX(40px);opacity:0}to{transform:translateX(0);opacity:1}}
        @keyframes panelSlideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(40px);opacity:0}}
        @keyframes panelMobileIn{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes panelMobileOut{from{transform:translateY(0);opacity:1}to{transform:translateY(100%);opacity:0}}
        @keyframes launchShimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes launchSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes launchCheckPop{0%{transform:scale(0);opacity:0}50%{transform:scale(1.3)}100%{transform:scale(1);opacity:1}}
        .detail-panel-in{animation:panelSlideIn .4s cubic-bezier(.22,1,.36,1) both}
        .detail-panel-out{animation:panelSlideOut .3s cubic-bezier(.4,0,1,1) both}
        .mobile-panel-in{animation:panelMobileIn .4s cubic-bezier(.22,1,.36,1) both}
        .mobile-panel-out{animation:panelMobileOut .3s cubic-bezier(.4,0,1,1) both}
        .login-shake{animation:shake .6s ease-in-out}.spinner{animation:spin 1s linear infinite}
        .page-enter{animation:fadeIn .5s ease-out}
        .slide-up{animation:slideUp .6s ease-out both}.slide-up-delay{animation:slideUp .6s ease-out .15s both}.slide-up-delay-2{animation:slideUp .6s ease-out .3s both}
        .card-pop{animation:cardPop .4s ease-out both}.dropdown-enter{animation:dropdownIn .2s ease-out both}
        .no-scroll{height:100vh;overflow:hidden}
        .close-btn{transition:all .3s ease}.close-btn:hover{transform:rotate(90deg) scale(1.1)}
        .input-field{transition:all .3s ease;border:1.5px solid #E2E8F0}.input-field:focus{border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.1)}
        .checkbox-custom{appearance:none;width:18px;height:18px;border:2px solid #CBD5E1;border-radius:5px;cursor:pointer;transition:all .2s ease;position:relative;flex-shrink:0}
        .checkbox-custom:checked{background:#3B82F6;border-color:#3B82F6}.checkbox-custom:checked::after{content:'';position:absolute;top:2px;left:5px;width:5px;height:9px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.checkbox-custom:hover{border-color:#3B82F6}
        .welcome-wrapper{transition:all .6s cubic-bezier(.4,0,.2,1)}.welcome-wrapper.slid{transform:translateX(-30%);filter:blur(6px);opacity:.3;pointer-events:none}
        .header-blur{transition:all .6s cubic-bezier(.4,0,.2,1)}.header-blur.blurred{filter:blur(6px);opacity:.3;pointer-events:none}
        .login-overlay{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;pointer-events:none;opacity:0;transition:opacity .3s ease}
        .login-overlay.visible{pointer-events:all;opacity:1}
        .login-card-animated{transform:translateY(40px) scale(.95);opacity:0;transition:all .5s cubic-bezier(.34,1.56,.64,1)}
        .login-card-animated.show{transform:translateY(0) scale(1);opacity:1}
        .login-card-animated.closing{transform:translateY(30px) scale(.97);opacity:0;transition:all .35s cubic-bezier(.4,0,1,1)}
        .login-backdrop{position:fixed;inset:0;background:rgba(10,48,85,.6);z-index:90;opacity:0;transition:opacity .5s ease;pointer-events:none}.login-backdrop.show{opacity:1;pointer-events:all}
        .filter-scroll::-webkit-scrollbar{display:none}.filter-scroll{-ms-overflow-style:none;scrollbar-width:none}
        .app-card{position:relative;overflow:hidden;transition:transform .3s cubic-bezier(.34,1.3,.64,1),box-shadow .3s ease,border-color .3s ease,background-color .3s ease}
        .app-card::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%);background-size:200% auto;opacity:0;transition:opacity .3s ease;pointer-events:none;border-radius:inherit}
        .app-card:hover{transform:translateY(-4px) scale(1.01)}.app-card:hover::before{opacity:1;animation:shimmer .9s ease}.app-card:active{transform:translateY(-1px) scale(.995)}
        .app-card-light:hover{box-shadow:0 14px 40px rgba(10,48,85,.12),0 2px 10px rgba(10,48,85,.06);border-color:#93C5FD!important}
        .app-card-dark:hover{box-shadow:0 0 1px ${n.borderHover},0 8px 32px ${n.neonFaint},0 0 60px ${n.neonGhost};border-color:${n.borderHover}!important}
        .app-list-item{transition:all .2s ease}.app-list-item:hover{transform:translateX(4px)}
        .list-scrollbar::-webkit-scrollbar{width:4px}.list-scrollbar::-webkit-scrollbar-track{background:transparent}
        .list-scrollbar::-webkit-scrollbar-thumb{background:rgba(0,191,255,.2);border-radius:10px}.list-scrollbar::-webkit-scrollbar-thumb:hover{background:rgba(0,191,255,.4)}
        .list-scrollbar{scrollbar-width:thin;scrollbar-color:rgba(0,191,255,.2) transparent}
        .list-scrollbar-light::-webkit-scrollbar{width:4px}.list-scrollbar-light::-webkit-scrollbar-track{background:transparent}
        .list-scrollbar-light::-webkit-scrollbar-thumb{background:rgba(150,150,150,.3);border-radius:10px}.list-scrollbar-light::-webkit-scrollbar-thumb:hover{background:rgba(150,150,150,.5)}
        .list-scrollbar-light{scrollbar-width:thin;scrollbar-color:rgba(150,150,150,.3) transparent}
        .hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;overflow-y:auto}

        .launch-btn{position:relative;overflow:hidden}
        .launch-shimmer{animation:launchShimmer 1s linear infinite}
        .launch-spinner{animation:launchSpin .8s linear infinite}
        .launch-check{animation:launchCheckPop .4s cubic-bezier(.34,1.56,.64,1) both}

        @media(max-width:768px){.welcome-wrapper.slid{transform:translateX(-50%);opacity:.1}.login-overlay{padding:0;align-items:stretch}.login-card-animated{max-width:100%;width:100%;height:100%}.login-split-card{flex-direction:column!important;min-height:100vh!important;border-radius:0!important}.login-left-panel{display:none!important}.login-right-panel{width:100%!important;min-height:100vh;padding:0!important}.login-right-inner{border-radius:0!important;min-height:100vh;display:flex;flex-direction:column;justify-content:center}}
      `}</style>

      {/* ======================== WELCOME + LOGIN ======================== */}
      {(currentPage === "welcome" || currentPage === "login") && (
        <div className="no-scroll flex flex-col relative bg-[#F8FAFC]">
          <nav className={`bg-[#0A3055] text-white p-3 md:px-10 shadow-md shrink-0 z-50 header-blur ${showLoginPanel ? "blurred" : ""}`}><div className="max-w-[1600px] mx-auto"><img src={logo} alt="STLAF" className="h-10 md:h-12 w-auto object-contain" /></div></nav>
          <div className={`welcome-wrapper flex-grow flex flex-col justify-center items-center text-center px-6 py-20 ${showLoginPanel ? "slid" : ""}`}>
            <div className="mb-6"><p className="text-[#CCAA49] font-black tracking-[0.3em] uppercase text-xs md:text-sm">{dateTime.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p><p className="text-[#0A3055] font-light text-3xl md:text-5xl mt-1 tracking-tighter">{dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</p></div>
            <h1 className="text-4xl md:text-6xl font-black text-[#0A3055] tracking-tighter uppercase mb-4 leading-none">WELCOME TO THE <br /> STLAF PORTAL</h1>
            <p className="text-[#0A3055] text-base md:text-xl font-medium leading-relaxed mb-8 max-w-4xl">This web app is a list of applications where <span className="font-black">all departments</span> created their own apps to automate and innovate our workspace.</p>
            {!showLoginPanel && <button onClick={handleGetStarted} className="bg-[#0A3055] text-white px-10 py-4 rounded-lg font-black uppercase text-lg tracking-widest shadow-xl hover:bg-[#CCAA49] transition-all active:scale-95">Get Started</button>}
          </div>
          <footer className={`bg-[#0A3055] text-white py-6 px-6 md:px-12 shrink-0 border-t border-white/5 header-blur ${showLoginPanel ? "blurred" : ""}`}><div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6"><div className="text-center md:text-left"><h3 className="font-bold text-sm uppercase leading-none mb-1 tracking-tight">Sadsad Tamesis Legal and Accountancy Firm</h3><p className="text-[9px] opacity-40 uppercase font-black tracking-widest">Copyright © 2026 STLAF Firm</p></div><div className="flex items-center gap-8"><SocialIcons /></div></div></footer>
          <div className={`login-backdrop ${showLoginPanel ? "show" : ""}`} />
          <div className={`login-overlay ${loginCardVisible ? "visible" : ""}`}>
            <div className={`w-full max-w-[960px] mx-auto login-card-animated ${loginCardVisible && !isClosing ? "show" : ""} ${isClosing ? "closing" : ""} ${loginShake ? "login-shake" : ""}`}>
              <div className="login-split-card bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden flex flex-col md:flex-row min-h-[520px]">
                <div className="login-left-panel md:w-[45%] p-8 md:p-12 flex flex-col justify-between bg-white"><div><h2 className="text-[#0A3055] text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3">Your Workspace,<br /><span className="text-[#CCAA49]">One Portal.</span></h2><p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs mb-10">Access all department tools, manage tasks, and collaborate — all from a single, secure platform.</p><div className="space-y-4">{[{ color: "blue", icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Fast access to department apps" },{ color: "green", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "Secure and authenticated access" },{ color: "amber", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", text: "Built by teams, for teams" }].map((item, i) => (<div key={i} className="flex items-center gap-3"><div className={`w-8 h-8 bg-${item.color}-50 rounded-lg flex items-center justify-center flex-shrink-0`}><svg className={`w-4 h-4 text-${item.color}-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg></div><p className="text-sm text-gray-500 font-light">{item.text}</p></div>))}</div></div><div className="mt-8 pt-6 border-t border-gray-100"><p className="text-gray-500 text-[10px] uppercase font-semibold tracking-[0.15em]">IT & Innovations Department</p></div></div>
                <div className="login-right-panel md:w-[55%] bg-white p-3 md:p-4"><div className="login-right-inner w-full h-full bg-[#123765] rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center relative border border-white/40"><button onClick={handleCloseLogin} className="close-btn absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl bg-white hover:bg-red-50 text-gray-400 hover:text-red-500 shadow-sm z-10"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button><div className="md:hidden mb-6"><img src={logo} alt="STLAF" className="h-10 w-auto object-contain mx-auto brightness-0 invert opacity-80" /></div><div className="slide-up w-full"><h3 className="text-white text-2xl md:text-3xl font-black tracking-tight mb-1">Sign in</h3><p className="text-white/50 text-sm font-light mb-8">Enter your credentials to access the portal</p></div>
                  <form onSubmit={handleLogin} className="space-y-5 w-full">
                    <div className="slide-up-delay"><label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">Username</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div><input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setLoginError(""); }} placeholder="Enter your username" required disabled={isLoading} className="input-field w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-sm font-medium text-[#0A3055] outline-none disabled:opacity-50 placeholder:text-gray-400 placeholder:font-light" /></div></div>
                    <div className="slide-up-delay"><label className="block text-[11px] font-semibold uppercase tracking-wider text-white/50 mb-2">Password</label><div className="relative"><div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => { setPassword(e.target.value); setLoginError(""); }} placeholder="Enter your password" required disabled={isLoading} className="input-field w-full pl-12 pr-12 py-3.5 bg-white rounded-xl text-sm font-medium text-[#0A3055] outline-none disabled:opacity-50 placeholder:text-gray-400 placeholder:font-light" /><button type="button" onClick={() => setShowPassword(!showPassword)} disabled={isLoading} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#0A3055] transition-colors"><svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">{showPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /> : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>}</svg></button></div></div>
                    <div className="slide-up-delay-2 flex items-center gap-3"><input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="checkbox-custom" disabled={isLoading} /><label htmlFor="rememberMe" className="text-sm text-white/50 font-light cursor-pointer select-none">Remember me</label></div>
                    {loginError && <div className="flex items-center gap-2.5 bg-red-50 border border-red-100 text-red-500 px-4 py-3 rounded-xl text-xs font-medium"><svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{loginError}</div>}
                    <div className="slide-up-delay-2 pt-2"><button type="submit" disabled={isLoading || !username || !password} className="w-full bg-[#0A3055] text-white py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">{isLoading ? <><svg className="w-4 h-4 spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>Signing in...</> : "Sign in"}</button></div>
                  </form>
                  <p className="md:hidden text-white/20 text-[9px] uppercase font-semibold tracking-[0.15em] mt-8">Secured by STLAF IT Department</p>
                </div></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================== APPS PAGE ======================== */}
      {currentPage === "apps" && isLoggedIn && (
        <div className="h-screen flex flex-col page-enter transition-colors duration-300 overflow-hidden" style={{ background: dm ? n.bg : "#f0f4f8", color: dm ? n.textPrimary : "#0A3055" }}>
          <nav className="shrink-0 z-50 text-white transition-colors duration-300" style={{ background: dm ? n.bgNav : "#0A3055", borderBottom: `1px solid ${dm ? n.border : "transparent"}` }}>
            <div className="max-w-[1600px] mx-auto px-4 md:px-10"><div className="flex items-center justify-between h-16">
              <img src={logo} alt="STLAF" className="h-9 md:h-11 w-auto object-contain cursor-pointer" onClick={() => { setSearchTerm(""); setActiveFilter("All"); handleClosePanel(); }} />
              <div className="flex items-center gap-2 md:gap-3">
                <button onClick={toggleDarkMode} className="p-2 rounded-xl transition-all" style={{ background: dm ? n.neonFaint : "rgba(255,255,255,.1)" }}>{dm ? <svg className="w-4 h-4" style={{ color: "#fbbf24" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> : <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}</button>
                <div className="relative w-[120px] md:w-[240px]"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-4 h-4" style={{ color: dm ? n.neonDim : "rgba(255,255,255,.4)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div><input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all" style={{ background: dm ? n.neonGhost : "rgba(255,255,255,.1)", border: `1px solid ${dm ? n.border : "rgba(255,255,255,.1)"}`, color: "white" }} /></div>
                <button onClick={handleLogout} className="bg-white/10 hover:bg-red-500 text-white p-2 md:px-3 md:py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 shrink-0"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg><span className="hidden md:inline">Logout</span></button>
              </div>
            </div></div>
          </nav>

          <div className="shrink-0 z-40 transition-colors duration-300" style={{ background: dm ? n.bg : "#f0f4f8", borderBottom: `1px solid ${dm ? n.neonGhost : "rgba(229,231,235,.5)"}` }}>
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 py-3"><div className="flex items-center justify-between gap-4">
              <div className="hidden md:flex rounded-xl p-1 items-center gap-0.5 overflow-x-auto filter-scroll flex-grow" style={{ background: dm ? n.neonGhost : "white", border: `1px solid ${dm ? n.border : "#e5e7eb"}` }}>
                {departments.map(dept => (<button key={dept} onClick={() => setActiveFilter(dept)} className="px-3.5 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all" style={activeFilter === dept ? { background: dm ? n.neon : "#0A3055", color: dm ? n.bg : "white", boxShadow: dm ? `0 0 12px ${n.neonDim}` : "0 1px 3px rgba(0,0,0,.1)" } : { color: dm ? n.textMuted : "#6b7280" }}>{dept}</button>))}
              </div>
              <div className="md:hidden relative flex-grow" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full rounded-xl border px-4 py-2.5 flex items-center justify-between text-sm font-semibold" style={{ background: dm ? n.neonGhost : "white", borderColor: dm ? n.border : "#e5e7eb", color: dm ? n.textPrimary : "#0A3055" }}><span>{activeFilter === "All" ? "All Departments" : activeFilter}</span><svg className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} style={{ color: dm ? n.textDim : "#9ca3af" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                {dropdownOpen && (<div className="dropdown-enter absolute top-full left-0 right-0 mt-2 rounded-xl shadow-xl py-1 z-50 max-h-[280px] overflow-y-auto" style={{ background: dm ? n.bgCard : "white", border: `1px solid ${dm ? n.border : "#e5e7eb"}` }}>{departments.map(dept => (<button key={dept} onClick={() => { setActiveFilter(dept); setDropdownOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors" style={{ color: activeFilter === dept ? (dm ? n.neon : "#0A3055") : (dm ? n.textMuted : "#6b7280") }}>{dept === "All" ? "All Departments" : dept}</button>))}</div>)}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0"><p className="text-[11px] font-medium" style={{ color: dm ? n.textDim : "#9ca3af" }}>{filteredApps.length} {filteredApps.length === 1 ? "app" : "apps"}</p>{(activeFilter !== "All" || searchTerm) && <button onClick={() => { setActiveFilter("All"); setSearchTerm(""); }} className="text-[11px] font-medium" style={{ color: dm ? n.neon : "#3b82f6" }}>Clear</button>}</div>
            </div></div>
          </div>

          <main className="flex-grow overflow-hidden">
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 h-full">
              {/* DESKTOP */}
              <div className="hidden md:flex gap-5 h-full py-4">
                <div ref={listRef} className={`overflow-y-auto pr-2 transition-all duration-[450ms] ease-in-out ${dm ? "list-scrollbar" : "list-scrollbar-light"} ${panelOpen ? "w-[340px] lg:w-[400px] flex-shrink-0" : "w-full"}`}>
                  <div className={`${panelOpen ? "flex flex-col gap-2.5" : "grid grid-cols-2 lg:grid-cols-3 gap-4"} pb-4`}>
                    {filteredApps.map((app, i) => {
                      const sel = selectedApp?.id === app.id;
                      if (panelOpen) return (
                        <div key={app.id} onClick={() => handleSelectApp(app)} className="app-list-item cursor-pointer rounded-xl border p-4 flex items-center gap-4" style={{ borderColor: sel ? (dm ? n.borderActive : "rgba(10,48,85,.25)") : (dm ? n.neonGhost : "#e5e7eb"), background: sel ? (dm ? `${n.neon}10` : "rgba(10,48,85,.04)") : (dm ? n.bgCard : "white") }}>
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-black" style={{ background: sel ? (dm ? n.neon : "#0A3055") : (dm ? n.neonFaint : "rgba(10,48,85,.1)"), color: sel ? (dm ? n.bg : "white") : (dm ? n.neonSoft : "rgba(10,48,85,.6)") }}>{app.name.charAt(0)}</div>
                          <div className="flex-grow min-w-0"><h3 className="text-sm font-bold tracking-tight truncate" style={{ color: dm ? n.textPrimary : "#0A3055" }}>{app.name}</h3><p className="text-[10px] font-medium uppercase tracking-widest truncate" style={{ color: dm ? n.neonMuted : n.gold }}>{app.dept}</p></div>
                          <div className="flex items-center gap-1.5 flex-shrink-0"><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#22c55e" }} /><svg className="w-3.5 h-3.5" style={{ color: sel ? (dm ? n.neon : "#0A3055") : (dm ? n.neonFaint : "#d1d5db") }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div>
                        </div>
                      );
                      return (
                        <div key={app.id} onClick={() => handleSelectApp(app)} className={`app-card ${dm ? "app-card-dark" : "app-card-light"} card-pop cursor-pointer group rounded-2xl border p-5 sm:p-6`} style={{ borderColor: dm ? n.neonGhost : "#e5e7eb", background: dm ? n.bgCard : "white" }} onMouseEnter={dm ? (e) => { e.currentTarget.style.background = n.bgCardHover; } : undefined} onMouseLeave={dm ? (e) => { e.currentTarget.style.background = n.bgCard; } : undefined}>
                          <div className="flex items-center justify-between mb-4"><span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: dm ? n.neonGhost : "#eff6ff", color: dm ? n.neonSoft : "#60a5fa" }}>{app.cat}</span><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#22c55e" }} /><span className="text-[9px] font-medium" style={{ color: dm ? n.greenDim : "rgba(22,163,74,.6)" }}>Active</span></div></div>
                          <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug mb-1.5 transition-colors duration-200" style={{ color: dm ? n.textPrimary : "#0A3055" }}>{app.name}</h3>
                          <p className="text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ color: dm ? n.neonMuted : n.gold }}>{app.dept}</p>
                          <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: dm ? n.neonGhost : "#f3f4f6" }}><span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: dm ? n.textDim : "#d1d5db" }}>View details</span><div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: dm ? n.neonGhost : "#f3f4f6", color: dm ? n.textDim : "#d1d5db" }}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></div></div>
                        </div>
                      );
                    })}
                  </div>
                  {filteredApps.length === 0 && (<div className="text-center py-20"><p className="text-lg font-black tracking-tight mb-2" style={{ color: dm ? n.textPrimary : "#0A3055" }}>No apps found</p><p className="text-xs font-light mb-5" style={{ color: dm ? n.textDim : "#9ca3af" }}>Try adjusting your search or filter</p><button onClick={() => { setActiveFilter("All"); setSearchTerm(""); }} className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all" style={{ background: dm ? n.neon : "#0A3055", color: dm ? n.bg : "white" }}>Reset</button></div>)}
                </div>

                {selectedApp && (
                  <div ref={detailRef} className={`flex-grow min-w-0 rounded-2xl flex flex-col overflow-hidden ${panelClosing ? "detail-panel-out" : "detail-panel-in"}`} style={{ background: dm ? n.bgPanel : "#123765", border: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}`, boxShadow: dm ? `0 0 50px ${n.neonGhost}, 0 20px 60px rgba(0,0,0,.3)` : "0 20px 60px rgba(10,48,85,.25)" }}>
                    <div className="px-6 pt-6 pb-4 flex-shrink-0" style={{ borderBottom: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}` }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2"><span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg" style={{ background: dm ? n.neonFaint : "rgba(255,255,255,.15)", color: dm ? n.neon : "rgba(255,255,255,.8)" }}>{selectedApp.cat}</span><span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#4ade80", boxShadow: `0 0 6px ${dm ? n.greenDim : "rgba(74,222,128,.5)"}` }} /><span className="text-[9px] font-semibold" style={{ color: dm ? n.green : "#4ade80" }}>Active</span></span></div>
                        <button onClick={handleClosePanel} className="close-btn w-8 h-8 flex items-center justify-center rounded-xl transition-all" style={{ background: dm ? n.neonFaint : "rgba(255,255,255,.1)", color: dm ? n.textMuted : "rgba(255,255,255,.5)" }}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </div>
                      <h2 className="text-xl font-black tracking-tight leading-tight" style={{ color: dm ? n.textPrimary : "white" }}>{selectedApp.name}</h2>
                    </div>
                    <div className="flex-grow hide-scrollbar p-6">{renderPanelContent(selectedApp)}</div>
                    <div className="flex-shrink-0 px-6 pb-6 pt-3" style={{ borderTop: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}` }}>
                      <LaunchButton url={selectedApp.url} />
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE */}
              <div className="md:hidden h-full overflow-y-auto pb-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                  {filteredApps.map((app) => (
                    <div key={app.id} onClick={() => handleSelectApp(app)} className={`app-card ${dm ? "app-card-dark" : "app-card-light"} card-pop cursor-pointer rounded-2xl border p-5`} style={{ borderColor: selectedApp?.id === app.id ? (dm ? n.borderActive : "rgba(10,48,85,.2)") : (dm ? n.neonGhost : "#e5e7eb"), background: selectedApp?.id === app.id ? (dm ? `${n.neon}08` : "rgba(10,48,85,.02)") : (dm ? n.bgCard : "white") }}>
                      <div className="flex items-center justify-between mb-3"><span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded" style={{ background: dm ? n.neonGhost : "#eff6ff", color: dm ? n.neonSoft : "#60a5fa" }}>{app.cat}</span><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#22c55e" }} /></div>
                      <h3 className="text-sm font-bold tracking-tight mb-1" style={{ color: dm ? n.textPrimary : "#0A3055" }}>{app.name}</h3>
                      <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: dm ? n.neonMuted : n.gold }}>{app.dept}</p>
                    </div>
                  ))}
                </div>
                {filteredApps.length === 0 && (<div className="text-center py-20"><p className="text-lg font-black tracking-tight mb-2" style={{ color: dm ? n.textPrimary : "#0A3055" }}>No apps found</p><p className="text-xs font-light mb-5" style={{ color: dm ? n.textDim : "#9ca3af" }}>Try adjusting your search or filter</p><button onClick={() => { setActiveFilter("All"); setSearchTerm(""); }} className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all" style={{ background: dm ? n.neon : "#0A3055", color: dm ? n.bg : "white" }}>Reset</button></div>)}

                {selectedApp && (
                  <div className={`fixed inset-0 z-[70] flex flex-col ${panelClosing ? "mobile-panel-out" : "mobile-panel-in"}`} style={{ background: dm ? n.bgPanel : "#123765" }}>
                    <div className="px-5 pt-5 pb-3 flex-shrink-0" style={{ borderBottom: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}` }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2"><span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg" style={{ background: dm ? n.neonFaint : "rgba(255,255,255,.15)", color: dm ? n.neon : "rgba(255,255,255,.8)" }}>{selectedApp.cat}</span><span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: dm ? n.green : "#4ade80" }} /><span className="text-[9px] font-semibold" style={{ color: dm ? n.green : "#4ade80" }}>Active</span></span></div>
                        <button onClick={handleClosePanel} className="w-8 h-8 flex items-center justify-center rounded-xl transition-all" style={{ background: dm ? n.neonFaint : "rgba(255,255,255,.1)", color: dm ? n.textMuted : "rgba(255,255,255,.5)" }}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                      </div>
                      <h2 className="text-xl font-black tracking-tight leading-tight mb-3" style={{ color: dm ? n.textPrimary : "white" }}>{selectedApp.name}</h2>
                      <div className="flex gap-0">{["info", "about"].map(tab => (<button key={tab} onClick={() => setMobileTab(tab)} className="flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest text-center transition-all" style={{ color: mobileTab === tab ? (dm ? n.neon : "white") : (dm ? n.textDim : "rgba(255,255,255,.3)"), borderBottom: mobileTab === tab ? `2px solid ${dm ? n.neon : "white"}` : "2px solid transparent" }}>{tab === "info" ? "Details" : "About"}</button>))}</div>
                    </div>
                    <div className="flex-grow hide-scrollbar p-5">{renderPanelContent(selectedApp, mobileTab)}</div>
                    <div className="flex-shrink-0 px-5 pb-5 pt-2" style={{ borderTop: `1px solid ${dm ? n.borderPanel : "rgba(255,255,255,.1)"}` }}>
                      <div className="mt-2"><LaunchButton url={selectedApp.url} /></div>
                      <p className="text-center text-[8px] font-medium mt-2 truncate" style={{ color: dm ? n.textDim : "rgba(255,255,255,.2)" }}>{selectedApp.url}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;