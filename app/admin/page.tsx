"use client";

import { useEffect, useState, useMemo } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  subscribeToLeads,
  updateLeadStatus,
  deleteLead,
  isFirebaseConfigured,
  Lead,
} from "../lib/firebase";
import {
  Shield,
  Search,
  SlidersHorizontal,
  Mail,
  Phone,
  Building,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  PhoneCall,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Calendar,
  Layers,
} from "lucide-react";

// Pure helper function for formatting date
function formatTime(dateVal: string | null | undefined): string {
  if (!dateVal) return "Recently";
  try {
    const d = new Date(dateVal);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Recently";
  }
}

export default function AdminDashboardPage() {
  // Authentication state initialized from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("phyteam_admin_auth") === "true";
    }
    return false;
  });
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Data state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const firebaseConnected = isFirebaseConfigured();

  // Filter & Search state
  const [activeTab, setActiveTab] = useState<
    "all" | "new" | "call_booking" | "contact_form" | "in_progress" | "closed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Subscribe to real-time leads
  useEffect(() => {
    if (!isAuthenticated) return;

    const unsubscribe = subscribeToLeads((fetchedLeads) => {
      setLeads(fetchedLeads);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    const targetEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
    const targetPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
    const fallbackPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "";

    const isEmailValid = targetEmail ? adminEmail.trim().toLowerCase() === targetEmail.toLowerCase() : false;
    const isPassValid = targetPass ? adminPassword === targetPass : false;
    const isPasscodeValid = fallbackPasscode ? adminPassword === fallbackPasscode : false;

    // 1. Attempt Firebase Auth directly
    let firebaseLoggedIn = false;
    if (auth && isFirebaseConfigured()) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, adminEmail.trim(), adminPassword);
        if (userCred.user) {
          firebaseLoggedIn = true;
          localStorage.setItem("phyteam_admin_uid", userCred.user.uid);
        }
      } catch {
        // Fallback gracefully to verified credentials if Firebase Auth provider is pending
      }
    }

    // 2. Allow entry if Firebase Auth succeeded OR credentials match project admin
    if (firebaseLoggedIn || (isEmailValid && isPassValid) || isPasscodeValid) {
      setIsAuthenticated(true);
      localStorage.setItem("phyteam_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid email or password. Please try again.");
    }
    setAuthLoading(false);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("phyteam_admin_auth");
    setAdminPassword("");
  };

  // Status update handler
  const handleStatusChange = async (leadId: string, newStatus: Lead["status"]) => {
    setUpdatingId(leadId);
    await updateLeadStatus(leadId, newStatus);
    setUpdatingId(null);
  };

  // Delete handler
  const handleDelete = async (leadId: string, clientName: string) => {
    if (confirm(`Are you sure you want to permanently delete lead from "${clientName}"?`)) {
      setUpdatingId(leadId);
      await deleteLead(leadId);
      if (expandedLeadId === leadId) setExpandedLeadId(null);
      setUpdatingId(null);
    }
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === "new").length;
    const calls = leads.filter((l) => l.type === "call_booking").length;
    const inProgress = leads.filter((l) => l.status === "in_progress").length;
    const closed = leads.filter((l) => l.status === "closed").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;

    return { total, newLeads, calls, inProgress, closed, contacted };
  }, [leads]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      call_booking: leads.filter((l) => l.type === "call_booking").length,
      contact_form: leads.filter((l) => l.type === "contact_form").length,
      in_progress: leads.filter((l) => l.status === "in_progress").length,
      closed: leads.filter((l) => l.status === "closed").length,
    };
  }, [leads]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Tab filter
      if (activeTab === "new" && lead.status !== "new") return false;
      if (activeTab === "call_booking" && lead.type !== "call_booking") return false;
      if (activeTab === "contact_form" && lead.type !== "contact_form") return false;
      if (activeTab === "in_progress" && lead.status !== "in_progress") return false;
      if (activeTab === "closed" && lead.status !== "closed") return false;

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = lead.name.toLowerCase().includes(query);
        const matchEmail = lead.email.toLowerCase().includes(query);
        const matchPhone = (lead.phone || "").toLowerCase().includes(query);
        const matchCompany = (lead.company || "").toLowerCase().includes(query);
        const matchService = (lead.service || "").toLowerCase().includes(query);
        const matchId = lead.id.toLowerCase().includes(query);

        return (
          matchName ||
          matchEmail ||
          matchPhone ||
          matchCompany ||
          matchService ||
          matchId
        );
      }

      return true;
    });
  }, [leads, activeTab, searchQuery]);

  // Avatar colors
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
      "bg-blue-500/20 text-blue-400 border-blue-500/40",
      "bg-purple-500/20 text-purple-400 border-purple-500/40",
      "bg-amber-500/20 text-amber-400 border-amber-500/40",
      "bg-pink-500/20 text-pink-400 border-pink-500/40",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    return colors[hash % colors.length];
  };

  // Status styling
  const renderStatusBadge = (status: Lead["status"]) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            New Inquiry
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            In Progress
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Contacted
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Closed / Won
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-700/30 text-gray-400 border border-gray-600/30">
            Pending
          </span>
        );
    }
  };

  // If not authenticated, show sleek dark login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070d18] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-[#0c1626]/90 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Phyteam Admin Desk
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Lead Management & Customer Relations Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="Enter admin email"
                required
                className="w-full px-4 py-3 bg-[#070f1d] border border-gray-700 focus:border-cyan-400 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all duration-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 bg-[#070f1d] border border-gray-700 focus:border-cyan-400 rounded-xl text-white placeholder-gray-600 focus:outline-none transition-all duration-300 text-sm"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 cursor-pointer text-sm mt-2 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In as Super Admin</span>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070d18] text-[#e2e8f0] flex">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-64 bg-[#08101e] border-r border-[#15233c] flex flex-col flex-shrink-0 min-h-screen">
        {/* Brand / Logo */}
        <div className="p-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-wide">
              Admin
            </div>
            <div className="text-xs text-cyan-400 font-medium">Phyteam Media</div>
          </div>
        </div>

        {/* Super Admin User Profile Card */}
        <div className="px-6 py-3">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0d182b] border border-[#1b2d4b]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-inner">
              A
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate">
                Super Admin
              </div>
              <span className="inline-block px-1.5 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 rounded border border-purple-400/30 truncate max-w-[130px]">
                {adminEmail || "Verified Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 space-y-1.5">
          {/* Active Item: Leads / Payment Desk style */}
          <button
            onClick={() => setActiveTab("all")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0f1d35] border border-cyan-500/30 text-white font-medium text-sm shadow-lg shadow-cyan-500/10 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>Overview & Leads</span>
            </div>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={() => setActiveTab("contact_form")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "contact_form"
                ? "bg-[#0f1d35] border border-cyan-500/30 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Contact Inquiries</span>
            </div>
            <span className="text-xs bg-[#13233e] text-blue-300 px-2 py-0.5 rounded-full font-semibold">
              {tabCounts.contact_form}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("call_booking")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "call_booking"
                ? "bg-[#0f1d35] border border-cyan-500/30 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-purple-400" />
              <span>Booked Calls</span>
            </div>
            <span className="text-xs bg-[#13233e] text-purple-300 px-2 py-0.5 rounded-full font-semibold">
              {tabCounts.call_booking}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("new")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition cursor-pointer ${
              activeTab === "new"
                ? "bg-[#0f1d35] border border-cyan-500/30 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Active Appeals</span>
            </div>
            <span className="text-xs bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold">
              {tabCounts.new}
            </span>
          </button>
        </nav>

        {/* Sync Status Badge & Sign Out */}
        <div className="p-4 border-t border-[#15233c] space-y-3">
          <div className="flex items-center justify-between text-xs px-2 text-gray-400">
            <span className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  firebaseConnected ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                }`}
              />
              {firebaseConnected ? "Cloud Firestore Live" : "Local Storage Mode"}
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-[#15233c]">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Lead & Inquiry Management
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Real-time feed of all client consultations and inbound inquiries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0f1d35] hover:bg-[#162a4c] border border-cyan-500/20 text-cyan-300 text-xs font-semibold transition"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* ================= TOP METRIC CARDS (Exact match to screenshot) ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: Total Leads */}
            <div className="relative bg-gradient-to-br from-[#0c1628] to-[#091120] border border-[#172744] rounded-2xl p-5 overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  TOTAL LEADS
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.total}
              </div>
              <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>All inbound client interactions</span>
              </div>
            </div>

            {/* Card 2: New Inquiries */}
            <div className="relative bg-gradient-to-br from-[#0c1628] to-[#091120] border border-[#172744] rounded-2xl p-5 overflow-hidden group hover:border-red-500/40 transition-all duration-300 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  NEW / UNREAD
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] animate-pulse" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.newLeads}
              </div>
              <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-400" />
                <span>Pending initial response</span>
              </div>
            </div>

            {/* Card 3: Call Bookings */}
            <div className="relative bg-gradient-to-br from-[#0c1628] to-[#091120] border border-[#172744] rounded-2xl p-5 overflow-hidden group hover:border-purple-500/40 transition-all duration-300 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  CALL BOOKINGS
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.calls}
              </div>
              <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                <PhoneCall className="w-3 h-3 text-purple-400" />
                <span>Scheduled consultations</span>
              </div>
            </div>

            {/* Card 4: Contacted / Closed */}
            <div className="relative bg-gradient-to-br from-[#0c1628] to-[#091120] border border-[#172744] rounded-2xl p-5 overflow-hidden group hover:border-emerald-500/40 transition-all duration-300 shadow-lg shadow-black/40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  RESOLVED / CLOSED
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight">
                {metrics.closed + metrics.contacted}
              </div>
              <div className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Engaged & converted clients</span>
              </div>
            </div>
          </div>

          {/* ================= FILTER PILL TABS BAR ================= */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#162744] text-white border border-cyan-400/50 shadow-md shadow-cyan-500/20"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              All ({tabCounts.all})
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "new"
                  ? "bg-red-500/20 text-red-300 border border-red-500/50 shadow-md shadow-red-500/20"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Active Appeals ({tabCounts.new})
            </button>

            <button
              onClick={() => setActiveTab("call_booking")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "call_booking"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md shadow-purple-500/20"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              Payment / Call Requested ({tabCounts.call_booking})
            </button>

            <button
              onClick={() => setActiveTab("contact_form")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "contact_form"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              Contact Inquiries ({tabCounts.contact_form})
            </button>

            <button
              onClick={() => setActiveTab("in_progress")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "in_progress"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              In Progress ({tabCounts.in_progress})
            </button>

            <button
              onClick={() => setActiveTab("closed")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "closed"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                  : "bg-[#0b1424] text-gray-400 hover:text-white border border-[#172744]"
              }`}
            >
              Completed ({tabCounts.closed})
            </button>
          </div>

          {/* ================= SEARCH & ACTION CONTROLS ================= */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, email, company, service..."
                className="w-full pl-11 pr-4 py-3 bg-[#0c1628] border border-[#172744] focus:border-cyan-400/60 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white bg-white/5 px-2 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 300);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-[#0c1628] hover:bg-[#122038] border border-[#172744] rounded-xl text-gray-300 text-sm font-medium transition cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span>Filters</span>
            </button>
          </div>

          {/* ================= DATA GRID / TABLE ================= */}
          <div className="bg-[#0b1424] border border-[#172744] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#172744] text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-[#080f1d]">
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  className="rounded bg-[#0e192c] border-gray-700 text-cyan-500 focus:ring-0 cursor-pointer"
                  disabled
                />
              </div>
              <div className="col-span-3">CLIENT / LEAD ↑↓</div>
              <div className="col-span-3">SERVICE / SCOPE ↑↓</div>
              <div className="col-span-2">TYPE ↑↓</div>
              <div className="col-span-2">STATUS ↑↓</div>
              <div className="col-span-1 text-right">UPDATED ↓</div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="py-20 text-center text-gray-400 space-y-3">
                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                <p className="text-sm">Fetching real-time records...</p>
              </div>
            ) : filteredLeads.length === 0 ? (
              /* Empty State */
              <div className="py-24 text-center text-gray-400 space-y-4">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-500">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No leads found</h3>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                    {searchQuery
                      ? "No records matched your search criteria. Try a different query."
                      : "No inquiries currently match the selected filter category."}
                  </p>
                </div>
              </div>
            ) : (
              /* Rows */
              <div className="divide-y divide-[#15233c]/80">
                {filteredLeads.map((lead) => {
                  const isExpanded = expandedLeadId === lead.id;
                  const avatarColor = getAvatarColor(lead.name);

                  return (
                    <div
                      key={lead.id}
                      className={`transition-colors ${
                        isExpanded ? "bg-[#0e1a2f]" : "hover:bg-[#0d1729]"
                      }`}
                    >
                      {/* Row Bar */}
                      <div
                        onClick={() =>
                          setExpandedLeadId(isExpanded ? null : lead.id)
                        }
                        className="grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer select-none"
                      >
                        {/* Checkbox */}
                        <div className="col-span-1 flex items-center">
                          <input
                            type="checkbox"
                            checked={isExpanded}
                            onChange={() => {}}
                            className="rounded bg-[#0e192c] border-gray-700 text-cyan-500 focus:ring-0 pointer-events-none"
                          />
                        </div>

                        {/* Client Info */}
                        <div className="col-span-3 flex items-center gap-3 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border flex-shrink-0 ${avatarColor}`}
                          >
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white truncate group-hover:text-cyan-400 transition">
                              {lead.name}
                            </div>
                            <div className="text-[11px] text-gray-500 truncate font-mono">
                              ID: {lead.id.slice(0, 8)}
                            </div>
                          </div>
                        </div>

                        {/* Service */}
                        <div className="col-span-3">
                          <div className="text-xs font-semibold text-gray-200">
                            {lead.service || "Website Development"}
                          </div>
                          {lead.company && (
                            <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3 text-gray-500" />
                              <span className="truncate">{lead.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Type */}
                        <div className="col-span-2">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                              lead.type === "call_booking"
                                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                : "bg-blue-500/15 text-blue-300 border border-blue-500/30"
                            }`}
                          >
                            {lead.type === "call_booking"
                              ? "📞 Booked Call"
                              : "💬 Contact Form"}
                          </span>
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          {renderStatusBadge(lead.status)}
                        </div>

                        {/* Time & Expand indicator */}
                        <div className="col-span-1 flex items-center justify-end gap-2 text-right">
                          <div className="text-right">
                            <span className="text-xs text-gray-300 font-medium block">
                              {formatTime(lead.createdAt as string)}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-cyan-400" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* ================= INLINE EXPANSION DETAILS (Exact match to screenshot) ================= */}
                      {isExpanded && (
                        <div className="px-8 py-6 bg-[#07101f] border-t border-[#1a2d4d] space-y-6 animate-fadeIn">
                          {/* Profile Header Block */}
                          <div>
                            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-4">
                              <span className="text-base">👤</span>
                              <span>CLIENT PROFILE & CONTACT DETAILS</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-[#0c1628] p-5 rounded-xl border border-[#172744]">
                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  FULL NAME
                                </div>
                                <div className="text-sm font-semibold text-white mt-1">
                                  {lead.name}
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  RECORD ID
                                </div>
                                <div className="text-xs font-mono text-cyan-400 mt-1">
                                  {lead.id}
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  EMAIL
                                </div>
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-sm font-semibold text-blue-400 hover:underline mt-1 flex items-center gap-1.5 truncate"
                                >
                                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                                  <span className="truncate">{lead.email}</span>
                                </a>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  MOBILE / PHONE
                                </div>
                                {lead.phone ? (
                                  <a
                                    href={`tel:${lead.phone}`}
                                    className="text-sm font-semibold text-emerald-400 hover:underline mt-1 flex items-center gap-1.5 truncate"
                                  >
                                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                                    <span>{lead.phone}</span>
                                  </a>
                                ) : (
                                  <div className="text-xs text-gray-500 mt-1">
                                    Not provided
                                  </div>
                                )}
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  ORGANIZATION / COMPANY
                                </div>
                                <div className="text-sm text-gray-300 mt-1">
                                  {lead.company || "Individual Client"}
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  SERVICE CATEGORY
                                </div>
                                <div className="text-sm text-cyan-300 font-medium mt-1">
                                  {lead.service || "General Inquiry"}
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  SUBMISSION DATE
                                </div>
                                <div className="text-xs text-gray-300 mt-1 flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                  <span>
                                    {lead.createdAt
                                      ? new Date(
                                          lead.createdAt as string
                                        ).toLocaleString()
                                      : "Recent"}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <div className="text-[10px] uppercase font-bold text-gray-500">
                                  INQUIRY CHANNEL
                                </div>
                                <div className="text-xs font-semibold text-purple-300 mt-1">
                                  {lead.type === "call_booking"
                                    ? "Direct Consultation Scheduler"
                                    : "Contact Us Message Form"}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Message Body */}
                          <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                              MESSAGE & PROJECT SCOPE
                            </div>
                            <div className="p-4 rounded-xl bg-[#091120] border border-[#172744] text-sm text-gray-200 leading-relaxed font-sans">
                              {lead.message ? (
                                lead.message
                              ) : (
                                <span className="text-gray-500 italic">
                                  No additional written note provided. Client requested a direct phone call discussion.
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Actions & Status Changer (Matches screenshot bottom panel) */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#172744]/80">
                            {/* Status Changer Pills */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 font-semibold mr-1">
                                Set Status:
                              </span>
                              <button
                                disabled={updatingId === lead.id}
                                onClick={() => handleStatusChange(lead.id, "new")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                  lead.status === "new"
                                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400"
                                    : "bg-white/5 text-gray-400 border-gray-700 hover:text-white"
                                }`}
                              >
                                New
                              </button>
                              <button
                                disabled={updatingId === lead.id}
                                onClick={() =>
                                  handleStatusChange(lead.id, "contacted")
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                  lead.status === "contacted"
                                    ? "bg-blue-500/20 text-blue-300 border-blue-400"
                                    : "bg-white/5 text-gray-400 border-gray-700 hover:text-white"
                                }`}
                              >
                                Contacted
                              </button>
                              <button
                                disabled={updatingId === lead.id}
                                onClick={() =>
                                  handleStatusChange(lead.id, "in_progress")
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                  lead.status === "in_progress"
                                    ? "bg-amber-500/20 text-amber-300 border-amber-400"
                                    : "bg-white/5 text-gray-400 border-gray-700 hover:text-white"
                                }`}
                              >
                                In Progress
                              </button>
                              <button
                                disabled={updatingId === lead.id}
                                onClick={() =>
                                  handleStatusChange(lead.id, "closed")
                                }
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                  lead.status === "closed"
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                                    : "bg-white/5 text-gray-400 border-gray-700 hover:text-white"
                                }`}
                              >
                                Closed / Won
                              </button>
                            </div>

                            {/* Direct Action Buttons */}
                            <div className="flex items-center gap-3">
                              <a
                                href={`mailto:${lead.email}?subject=Regarding your inquiry at Phyteam`}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-bold transition shadow-md shadow-cyan-500/20 cursor-pointer"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Email Client</span>
                              </a>

                              {lead.phone && (
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md shadow-emerald-600/20 cursor-pointer"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                  <span>Call Client</span>
                                </a>
                              )}

                              <button
                                disabled={updatingId === lead.id}
                                onClick={() => handleDelete(lead.id, lead.name)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold transition cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
