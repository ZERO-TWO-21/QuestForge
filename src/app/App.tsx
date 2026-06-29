import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, Zap, Target, Trophy, Gift, Medal, Star, Users,
  UsersRound, BarChart3, FileText, Bot, Bell, Settings, HelpCircle,
  User, LogOut, Search, Building2, MessageSquare, Calendar,
  Sun, Moon, Menu, X, ChevronRight, ChevronDown, ChevronUp,
  TrendingUp, TrendingDown, Flame, Crown, Shield, Sword,
  Plus, Filter, MoreHorizontal, Edit2, Trash2, Eye, Download,
  ArrowRight, Check, Lock, Unlock, Send, Sparkles, RefreshCw,
  Globe, Smartphone, CreditCard, Key, AlertTriangle, Info,
  Heart, Bookmark, Share2, ExternalLink, CheckCircle2, XCircle,
  Clock, Award, Activity, PieChart, Map, Layers, Sliders,
  ToggleLeft, ToggleRight, ChevronLeft, Hash, AtSign
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart as RechartsPie,
  Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  FunnelChart, Funnel, LabelList
} from "recharts";

// ─── Types ─────────────────────────────────────────────────────────────────

type Page =
  | "landing" | "login" | "register" | "forgot-password" | "reset-password" | "2fa"
  | "dashboard" | "strategy-builder" | "challenges" | "quests" | "rewards"
  | "achievements" | "leaderboards" | "analytics" | "users" | "teams"
  | "reports" | "ai-assistant" | "notifications" | "settings" | "help" | "profile";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const engagementData = [
  { month: "Jan", users: 4200, xp: 128000, challenges: 340 },
  { month: "Feb", users: 5800, xp: 176000, challenges: 460 },
  { month: "Mar", users: 7200, xp: 224000, challenges: 580 },
  { month: "Apr", users: 6900, xp: 198000, challenges: 510 },
  { month: "May", users: 9100, xp: 312000, challenges: 720 },
  { month: "Jun", users: 11400, xp: 418000, challenges: 890 },
];

const xpDistribution = [
  { name: "Challenges", value: 38, fill: "#3b82f6" },
  { name: "Quests", value: 24, fill: "#8b5cf6" },
  { name: "Social", value: 18, fill: "#22c55e" },
  { name: "Streaks", value: 12, fill: "#f59e0b" },
  { name: "Bonus", value: 8, fill: "#ef4444" },
];

const radarData = [
  { subject: "Engagement", A: 92, B: 68 },
  { subject: "Retention", A: 86, B: 72 },
  { subject: "Completion", A: 78, B: 65 },
  { subject: "Social", A: 88, B: 58 },
  { subject: "Streaks", A: 74, B: 80 },
  { subject: "Revenue", A: 95, B: 71 },
];

const retentionData = [
  { day: "D1", rate: 94 }, { day: "D3", rate: 82 }, { day: "D7", rate: 74 },
  { day: "D14", rate: 61 }, { day: "D30", rate: 48 }, { day: "D60", rate: 38 },
  { day: "D90", rate: 31 },
];

const funnelData = [
  { value: 12400, name: "Registered", fill: "#3b82f6" },
  { value: 9800, name: "Onboarded", fill: "#6366f1" },
  { value: 7200, name: "Active", fill: "#8b5cf6" },
  { value: 4600, name: "Engaged", fill: "#a855f7" },
  { value: 2100, name: "Champions", fill: "#22c55e" },
];

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", team: "Apex Squad", xp: 142800, streak: 47, weekly: 8240, monthly: 28900, badges: 23, avatar: "SC" },
  { rank: 2, name: "Marcus Rivera", team: "Thunder Force", xp: 138500, streak: 32, weekly: 7810, monthly: 27400, badges: 19, avatar: "MR" },
  { rank: 3, name: "Priya Sharma", team: "Nexus Team", xp: 131200, streak: 28, weekly: 7340, monthly: 25100, badges: 21, avatar: "PS" },
  { rank: 4, name: "James Okafor", team: "Apex Squad", xp: 124600, streak: 19, weekly: 6920, monthly: 23800, badges: 17, avatar: "JO" },
  { rank: 5, name: "Elena Volkov", team: "Ghost Protocol", xp: 118300, streak: 41, weekly: 6480, monthly: 22100, badges: 15, avatar: "EV" },
  { rank: 6, name: "Kai Nakamura", team: "Thunder Force", xp: 112100, streak: 15, weekly: 6010, monthly: 20400, badges: 14, avatar: "KN" },
  { rank: 7, name: "Aisha Patel", team: "Nexus Team", xp: 106800, streak: 23, weekly: 5720, monthly: 19200, badges: 16, avatar: "AP" },
];

const challengeCards = [
  { id: 1, title: "30-Day Streak Master", xp: 2500, difficulty: "Hard", deadline: "Jul 15", participants: 342, progress: 68, status: "Active", category: "Streak" },
  { id: 2, title: "Team Collaboration Cup", xp: 4000, difficulty: "Epic", deadline: "Jul 22", participants: 128, progress: 34, status: "Active", category: "Social" },
  { id: 3, title: "Knowledge Quest Alpha", xp: 1200, difficulty: "Medium", deadline: "Jul 18", participants: 891, progress: 87, status: "Review", category: "Learning" },
  { id: 4, title: "Speed Run Challenge", xp: 800, difficulty: "Easy", deadline: "Jul 10", participants: 1204, progress: 100, status: "Completed", category: "Performance" },
  { id: 5, title: "Innovation Sprint", xp: 3200, difficulty: "Hard", deadline: "Aug 1", participants: 67, progress: 12, status: "Pending", category: "Creative" },
  { id: 6, title: "Code Golf Tournament", xp: 1800, difficulty: "Medium", deadline: "Jul 28", participants: 234, progress: 0, status: "Draft", category: "Technical" },
];

const achievementData = [
  { id: 1, name: "First Blood", desc: "Complete your first challenge", icon: "⚔️", xpReq: 0, rarity: "Common", unlocked: true, unlockPct: 89 },
  { id: 2, name: "Streak Seeker", desc: "Maintain a 7-day streak", icon: "🔥", xpReq: 500, rarity: "Uncommon", unlocked: true, unlockPct: 62 },
  { id: 3, name: "Team Player", desc: "Join and contribute to 3 teams", icon: "🤝", xpReq: 1000, rarity: "Rare", unlocked: true, unlockPct: 34 },
  { id: 4, name: "XP Titan", desc: "Earn 50,000 total XP", icon: "⚡", xpReq: 5000, rarity: "Epic", unlocked: false, unlockPct: 18 },
  { id: 5, name: "Legend Status", desc: "Reach the top 1% globally", icon: "👑", xpReq: 100000, rarity: "Legendary", unlocked: false, unlockPct: 2 },
  { id: 6, name: "Speed Demon", desc: "Complete 10 challenges in 24h", icon: "⚡", xpReq: 2000, rarity: "Epic", unlocked: false, unlockPct: 7 },
];

const rewardsData = [
  { id: 1, name: "Amazon Gift Card $25", category: "Gift Cards", xpCost: 8000, img: "💳", available: 42, popular: true, favorited: false },
  { id: 2, name: "Premium Subscription 3mo", category: "Premium", xpCost: 15000, img: "⭐", available: 100, popular: true, favorited: true },
  { id: 3, name: "Branded Hoodie", category: "Merchandise", xpCost: 25000, img: "👕", available: 18, popular: false, favorited: false },
  { id: 4, name: "Udemy Course Bundle", category: "Learning", xpCost: 12000, img: "📚", available: 50, popular: true, favorited: false },
  { id: 5, name: "20% Off Coupon", category: "Coupons", xpCost: 3000, img: "🎫", available: 200, popular: false, favorited: true },
  { id: 6, name: "Exclusive NFT Badge", category: "Digital", xpCost: 50000, img: "🎨", available: 5, popular: false, favorited: false },
];

const notificationsData = [
  { id: 1, type: "xp", title: "XP Earned!", desc: "You earned 450 XP for completing 'Daily Hustle'", time: "2m ago", read: false },
  { id: 2, type: "badge", title: "Badge Unlocked!", desc: "'Streak Seeker' badge added to your collection", time: "1h ago", read: false },
  { id: 3, type: "challenge", title: "Challenge Completed", desc: "Knowledge Quest Alpha — 87% success rate", time: "3h ago", read: false },
  { id: 4, type: "team", title: "Team Invite", desc: "Thunder Force invited you to join their squad", time: "5h ago", read: true },
  { id: 5, type: "ai", title: "AI Suggestion", desc: "Try 'Innovation Sprint' to boost your engagement score", time: "1d ago", read: true },
  { id: 6, type: "reward", title: "Reward Redeemed", desc: "Amazon Gift Card $25 is being processed", time: "2d ago", read: true },
  { id: 7, type: "system", title: "System Update", desc: "New leaderboard scoring algorithm deployed", time: "3d ago", read: true },
];

const aiMessages = [
  { role: "assistant", content: "Hi! I'm your AI Strategy Assistant. I can help you generate challenges, optimize XP distributions, predict engagement trends, and suggest winning gamification strategies. What would you like to explore today?" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "strategy-builder", label: "Strategy Builder", icon: Layers },
  { id: "challenges", label: "Challenges", icon: Sword },
  { id: "quests", label: "Quests", icon: Target },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "achievements", label: "Achievements", icon: Medal },
  { id: "leaderboards", label: "Leaderboards", icon: Trophy },
  { id: "users", label: "Users", icon: Users },
  { id: "teams", label: "Teams", icon: UsersRound },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "ai-assistant", label: "AI Assistant", icon: Bot },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help Center", icon: HelpCircle },
  { id: "profile", label: "Profile", icon: User },
];

// ─── Utility Components ─────────────────────────────────────────────────────

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode; variant?: "default" | "blue" | "violet" | "green" | "yellow" | "red" | "ghost"; className?: string }) {
  const variants = {
    default: "bg-white/10 text-white/80",
    blue: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    violet: "bg-violet-500/20 text-violet-400 border border-violet-500/30",
    green: "bg-green-500/20 text-green-400 border border-green-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    ghost: "bg-transparent border border-white/10 text-white/60",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

function KPICard({ title, value, delta, deltaDir, subtitle, gradient }: { title: string; value: string; delta: string; deltaDir: "up" | "down"; subtitle: string; gradient: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-card p-6 group hover:border-white/15 transition-all duration-300">
      <div className={cn("absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity", gradient)} />
      <div className="relative">
        <p className="text-sm text-white/50 font-medium mb-2">{title}</p>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <div className="flex items-center gap-2">
          {deltaDir === "up" ? (
            <span className="flex items-center gap-1 text-green-400 text-xs font-medium">
              <TrendingUp size={12} />{delta}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-400 text-xs font-medium">
              <TrendingDown size={12} />{delta}
            </span>
          )}
          <span className="text-white/30 text-xs">{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

function Btn({ children, variant = "primary", size = "md", onClick, className = "", disabled = false }: {
  children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger" | "outline"; size?: "sm" | "md" | "lg"; onClick?: () => void; className?: string; disabled?: boolean;
}) {
  const base = "inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-400/35 active:scale-[0.98]",
    secondary: "bg-violet-500 hover:bg-violet-400 text-white shadow-lg shadow-violet-500/25 active:scale-[0.98]",
    ghost: "hover:bg-white/8 text-white/70 hover:text-white",
    danger: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30",
    outline: "border border-white/15 hover:border-white/30 text-white/80 hover:text-white hover:bg-white/5",
  };
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/8 bg-card backdrop-blur-sm", className)}>
      {children}
    </div>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────

function LandingPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<"monthly" | "yearly">("yearly");

  const features = [
    { icon: "🎯", title: "Smart Challenge Engine", desc: "AI-powered challenge generation that adapts to your team's skill levels and engagement patterns in real time." },
    { icon: "⚡", title: "Dynamic XP System", desc: "Customizable experience point rules with anti-gaming safeguards, streak multipliers, and bonus event triggers." },
    { icon: "🏆", title: "Live Leaderboards", desc: "Real-time global and team-based rankings with weekly resets, historical tracking, and anonymous modes." },
    { icon: "🎁", title: "Rewards Marketplace", desc: "Built-in storefront supporting gift cards, merchandise, coupons, and custom digital rewards." },
    { icon: "🤖", title: "AI Strategy Assistant", desc: "GPT-4 powered advisor that predicts engagement drops, recommends interventions, and auto-generates strategies." },
    { icon: "📊", title: "Advanced Analytics", desc: "Cohort analysis, funnel visualization, retention heatmaps, and executive-ready PDF reports." },
  ];

  const testimonials = [
    { name: "Jordan Lee", role: "Head of People, Stripe", text: "QuestForge transformed our onboarding. Completion rates jumped from 48% to 91% in the first month.", avatar: "JL", stars: 5 },
    { name: "Maya Patel", role: "VP Engineering, Linear", text: "The AI Assistant alone is worth the subscription. It surfaced engagement patterns we hadn't noticed in years.", avatar: "MP", stars: 5 },
    { name: "Alex Torres", role: "L&D Director, Atlassian", text: "Best-in-class gamification platform. The Rewards Marketplace is genuinely exciting for our team.", avatar: "AT", stars: 5 },
  ];

  const faqs = [
    { q: "How quickly can we get started?", a: "You can have your first gamification strategy live within 24 hours. Our onboarding wizard guides you through mission setup, XP configuration, and your first challenge launch." },
    { q: "Does it integrate with our existing tools?", a: "Yes — we offer 120+ native integrations including Slack, JIRA, GitHub, Salesforce, HubSpot, Workday, and all major LMS platforms via REST API." },
    { q: "How is XP abuse prevented?", a: "Our anti-gaming engine uses behavioral ML models to detect and penalize pattern exploitation, velocity abuse, and bot activity in real time." },
    { q: "Can we white-label the platform?", a: "Enterprise plans include full white-labeling, custom domains, branded mobile apps, and SSO integration with your identity provider." },
    { q: "What's the pricing model?", a: "We charge per monthly active user (MAU), not total seats. Unused users never cost you anything. Volume discounts apply at 500+ MAU." },
  ];

  const plans = [
    { name: "Starter", price: activePlan === "monthly" ? 49 : 39, period: "/mo", users: "Up to 100 MAU", features: ["5 active challenges", "Basic analytics", "3 reward types", "Email support", "Community forum"], highlight: false, badge: null },
    { name: "Growth", price: activePlan === "monthly" ? 149 : 119, period: "/mo", users: "Up to 1,000 MAU", features: ["Unlimited challenges", "Advanced analytics", "Full rewards marketplace", "AI Assistant (basic)", "Priority support", "Slack integration"], highlight: true, badge: "Most Popular" },
    { name: "Enterprise", price: null, period: null, users: "Unlimited MAU", features: ["Everything in Growth", "AI Assistant (full)", "White-labeling", "Custom integrations", "SSO & SAML", "Dedicated CSM", "SLA 99.99%"], highlight: false, badge: "Best Value" },
  ];

  return (
    <div className="min-h-screen bg-[#07080f] text-white font-[Inter,sans-serif]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/6 backdrop-blur-xl bg-[#07080f]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">QuestForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Customers</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Btn variant="ghost" size="sm" onClick={() => onNavigate("login")}>Sign in</Btn>
            <Btn variant="primary" size="sm" onClick={() => onNavigate("register")}>Start free <ArrowRight size={14} /></Btn>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-violet-600/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-blue-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative">
          <Badge variant="blue" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles size={12} className="mr-1" /> Now with GPT-4 AI Strategy Assistant
          </Badge>
          <h1 className="text-6xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            Turn work into
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent"> an epic adventure</span>
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            QuestForge is the enterprise gamification platform that drives measurable engagement, retention, and performance through intelligent challenges, real rewards, and AI-powered strategy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Btn variant="primary" size="lg" onClick={() => onNavigate("register")}>
              Start for free — no credit card <ArrowRight size={16} />
            </Btn>
            <Btn variant="outline" size="lg" onClick={() => onNavigate("dashboard")}>
              <Eye size={16} /> View live demo
            </Btn>
          </div>
          {/* Hero preview card */}
          <div className="relative mx-auto max-w-4xl">
            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
              <div className="bg-[#0d0e1a] p-4 border-b border-white/8 flex items-center gap-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" /></div>
                <div className="flex-1 text-center text-xs text-white/30">app.questforge.io/dashboard</div>
              </div>
              <div className="bg-[#0d0e1a] p-6 grid grid-cols-3 gap-4">
                {[
                  { label: "Active Users", value: "11,428", delta: "+23%", color: "blue" },
                  { label: "XP Earned Today", value: "4.2M", delta: "+8%", color: "violet" },
                  { label: "Challenge Rate", value: "87.3%", delta: "+12%", color: "green" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="text-xs text-white/40 mb-1">{kpi.label}</p>
                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                    <span className="text-xs text-green-400">{kpi.delta} this week</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-8 border-y border-white/6">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-white/30 text-sm mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/20 font-bold text-lg">
            {["Stripe", "Linear", "Notion", "Atlassian", "Figma", "Vercel", "GitHub"].map(c => (
              <span key={c} className="hover:text-white/50 transition-colors cursor-pointer">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to drive engagement</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">A complete gamification stack — from challenge creation to reward fulfillment to AI-powered strategy optimization.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <GlassCard key={i} className="p-6 hover:border-white/15 transition-all duration-300 group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What our customers say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <GlassCard key={i} className="p-6 hover:border-white/15 transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => <Star key={j} size={14} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Simple, transparent pricing</h2>
          <p className="text-white/50 text-center mb-8">Pay only for active users. Scale freely.</p>
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
              <button onClick={() => setActivePlan("monthly")} className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all", activePlan === "monthly" ? "bg-white/10 text-white" : "text-white/40")}>Monthly</button>
              <button onClick={() => setActivePlan("yearly")} className={cn("px-5 py-2 rounded-lg text-sm font-medium transition-all", activePlan === "yearly" ? "bg-white/10 text-white" : "text-white/40")}>Yearly <span className="text-green-400 ml-1">-20%</span></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.name} className={cn("rounded-2xl border p-6 relative transition-all duration-300", plan.highlight ? "border-blue-500/50 bg-gradient-to-b from-blue-600/10 to-violet-600/5 shadow-xl shadow-blue-500/10" : "border-white/8 bg-card hover:border-white/15")}>
                {plan.badge && <div className={cn("absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold", plan.highlight ? "bg-blue-500 text-white" : "bg-violet-500 text-white")}>{plan.badge}</div>}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-white/40 mb-4">{plan.users}</p>
                <div className="mb-6">
                  {plan.price ? (
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black">${plan.price}</span>
                      <span className="text-white/40 mb-1">{plan.period}</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white/60">Custom pricing</div>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                      <CheckCircle2 size={14} className="text-green-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Btn variant={plan.highlight ? "primary" : "outline"} size="md" className="w-full justify-center" onClick={() => onNavigate("register")}>
                  {plan.price ? "Get started" : "Contact sales"}
                </Btn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <GlassCard key={i} className="overflow-hidden hover:border-white/15 transition-all">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="font-medium">{faq.q}</span>
                  {activeFaq === i ? <ChevronUp size={16} className="text-white/40" /> : <ChevronDown size={16} className="text-white/40" />}
                </button>
                {activeFaq === i && <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/6 pt-4">{faq.a}</div>}
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-b from-blue-600/15 to-violet-600/10 p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to level up your team?</h2>
            <p className="text-white/50 mb-8">Join 2,400+ companies using QuestForge to drive engagement and performance.</p>
            <Btn variant="primary" size="lg" onClick={() => onNavigate("register")}>
              Start free — 14 day trial <ArrowRight size={16} />
            </Btn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <Zap size={16} className="text-white" />
                </div>
                <span className="font-bold">QuestForge</span>
              </div>
              <p className="text-white/30 text-sm">The enterprise gamification platform.</p>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { heading: "Resources", links: ["Docs", "API Reference", "Status", "Community"] },
              { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">{col.heading}</p>
                <ul className="space-y-2">
                  {col.links.map(l => <li key={l}><a href="#" className="text-sm text-white/40 hover:text-white transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/6">
            <p className="text-white/30 text-sm">© 2026 QuestForge, Inc. All rights reserved.</p>
            <p className="text-white/20 text-sm">Trusted by 2,400+ organizations worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Auth Pages ─────────────────────────────────────────────────────────────

function AuthPage({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const [show2fa, setShow2fa] = useState(false);
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);

  const handleLogin = () => { setShow2fa(true); };
  const handle2fa = () => { onNavigate("dashboard"); };

  if (show2fa || page === "2fa") {
    return (
      <div className="min-h-screen bg-[#07080f] flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center mx-auto mb-4">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Two-factor auth</h1>
            <p className="text-white/50 text-sm">Enter the 6-digit code from your authenticator app.</p>
          </div>
          <GlassCard className="p-6">
            <div className="flex gap-2 justify-center mb-6">
              {otpCode.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newCode = [...otpCode];
                    newCode[i] = e.target.value;
                    setOtpCode(newCode);
                  }}
                  className="w-11 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              ))}
            </div>
            <Btn variant="primary" size="lg" className="w-full justify-center" onClick={handle2fa}>
              <Check size={16} /> Verify & Sign in
            </Btn>
          </GlassCard>
          <p className="text-center text-sm text-white/30 mt-4">
            <button className="text-blue-400 hover:text-blue-300" onClick={() => onNavigate("login")}>← Back to login</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080f] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center gap-2 justify-center mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">QuestForge</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {page === "login" ? "Welcome back" : page === "register" ? "Create your account" : page === "forgot-password" ? "Reset your password" : "Set new password"}
          </h1>
          <p className="text-white/50 text-sm">
            {page === "login" ? "Sign in to your account" : page === "register" ? "Start your 14-day free trial" : "We'll send you a reset link"}
          </p>
        </div>
        <GlassCard className="p-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {page === "register" && (
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Full name</label>
                <input className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="Sarah Chen" />
              </div>
            )}
            {page !== "reset-password" && (
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="you@company.com" />
              </div>
            )}
            {(page === "login" || page === "register" || page === "reset-password") && (
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm text-white/60">{page === "reset-password" ? "New password" : "Password"}</label>
                  {page === "login" && <button className="text-xs text-blue-400 hover:text-blue-300" onClick={() => onNavigate("forgot-password")}>Forgot?</button>}
                </div>
                <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="••••••••••" />
              </div>
            )}
            {page === "reset-password" && (
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Confirm password</label>
                <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-colors text-sm" placeholder="••••••••••" />
              </div>
            )}
            <Btn variant="primary" size="lg" className="w-full justify-center" onClick={page === "login" ? handleLogin : () => onNavigate("dashboard")}>
              {page === "login" ? "Sign in" : page === "register" ? "Create account" : page === "forgot-password" ? "Send reset link" : "Update password"}
            </Btn>
          </form>
          {(page === "login" || page === "register") && (
            <>
              <div className="relative my-5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div><div className="relative text-center"><span className="text-white/30 text-xs bg-card px-3">or continue with</span></div></div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all">
                  <Globe size={16} /> Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-2.5 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all">
                  <Hash size={16} /> GitHub
                </button>
              </div>
            </>
          )}
        </GlassCard>
        <p className="text-center text-sm text-white/30 mt-4">
          {page === "login" ? <>Don&apos;t have an account? <button className="text-blue-400 hover:text-blue-300" onClick={() => onNavigate("register")}>Sign up</button></> :
           page === "register" ? <>Already have an account? <button className="text-blue-400 hover:text-blue-300" onClick={() => onNavigate("login")}>Sign in</button></> :
           <button className="text-blue-400 hover:text-blue-300" onClick={() => onNavigate("login")}>← Back to login</button>}
        </p>
      </div>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────

function Sidebar({ currentPage, onNavigate, collapsed, onToggle }: { currentPage: Page; onNavigate: (p: Page) => void; collapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={cn("fixed left-0 top-0 h-screen bg-[#0a0b16] border-r border-white/6 flex flex-col z-40 transition-all duration-300", collapsed ? "w-16" : "w-60")}>
      <div className="p-4 flex items-center gap-3 border-b border-white/6 h-16">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shrink-0">
          <Zap size={15} className="text-white" />
        </div>
        {!collapsed && <span className="font-bold text-sm">QuestForge</span>}
        <button onClick={onToggle} className="ml-auto text-white/30 hover:text-white transition-colors">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Page)}
              title={collapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 relative",
                active ? "text-white bg-blue-500/15" : "text-white/40 hover:text-white/80 hover:bg-white/4"
              )}
            >
              {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-r" />}
              <Icon size={16} className={active ? "text-blue-400" : ""} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.id === "notifications" && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/6">
        <button
          onClick={() => onNavigate("landing")}
          className="w-full flex items-center gap-3 px-1 py-2 text-sm text-white/30 hover:text-red-400 transition-colors"
        >
          <LogOut size={15} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ─── Top Navbar ─────────────────────────────────────────────────────────────

function Topnav({ onNavigate, onAiOpen }: { onNavigate: (p: Page) => void; onAiOpen: () => void }) {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <header className="h-16 border-b border-white/6 flex items-center px-6 gap-4 bg-[#07080f]/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="flex-1 max-w-sm">
        <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-white/30 text-sm">
          <Search size={14} />
          <span>Search anything...</span>
          <kbd className="ml-auto text-xs bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-sm cursor-pointer hover:border-white/15 transition-colors">
        <Building2 size={14} className="text-white/40" />
        <span className="text-white/60">Acme Corp</span>
        <ChevronDown size={12} className="text-white/30" />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button onClick={() => onNavigate("notifications")} className="relative p-2.5 rounded-xl hover:bg-white/6 text-white/50 hover:text-white transition-all">
          <MessageSquare size={17} />
        </button>
        <button onClick={() => onNavigate("notifications")} className="relative p-2.5 rounded-xl hover:bg-white/6 text-white/50 hover:text-white transition-all">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <button className="p-2.5 rounded-xl hover:bg-white/6 text-white/50 hover:text-white transition-all">
          <Calendar size={17} />
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-xl hover:bg-white/6 text-white/50 hover:text-white transition-all">
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button onClick={onAiOpen} className="p-2.5 rounded-xl hover:bg-blue-500/15 text-blue-400 hover:text-blue-300 transition-all">
          <Bot size={17} />
        </button>
        <button onClick={() => onNavigate("profile")} className="ml-1 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-sm font-bold text-white">
          SC
        </button>
      </div>
    </header>
  );
}

// ─── Dashboard Page ─────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Good morning, Sarah 👋</h1>
          <p className="text-white/40 text-sm mt-1">Monday, June 29, 2026 · 11,428 active users right now</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" size="sm"><RefreshCw size={14} /> Refresh</Btn>
          <Btn variant="primary" size="sm"><Plus size={14} /> New Challenge</Btn>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard title="Active Users" value="11,428" delta="+23%" deltaDir="up" subtitle="vs last week" gradient="bg-gradient-to-br from-blue-600 to-blue-400" />
        <KPICard title="XP Earned" value="4.2M" delta="+18%" deltaDir="up" subtitle="today" gradient="bg-gradient-to-br from-violet-600 to-violet-400" />
        <KPICard title="Engagement Score" value="87.3%" delta="+5.2%" deltaDir="up" subtitle="7-day avg" gradient="bg-gradient-to-br from-green-600 to-green-400" />
        <KPICard title="Rewards Claimed" value="2,841" delta="+31%" deltaDir="up" subtitle="this month" gradient="bg-gradient-to-br from-yellow-600 to-yellow-400" />
        <KPICard title="Challenge Rate" value="78.6%" delta="-2.1%" deltaDir="down" subtitle="completion" gradient="bg-gradient-to-br from-orange-600 to-orange-400" />
        <KPICard title="Retention D30" value="48.2%" delta="+8.4%" deltaDir="up" subtitle="cohort" gradient="bg-gradient-to-br from-pink-600 to-pink-400" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="col-span-2 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">User Growth & XP Earned</h3>
            <div className="flex gap-2">
              {["1W", "1M", "3M", "1Y"].map(r => <button key={r} className="text-xs px-2.5 py-1 rounded-lg text-white/40 hover:text-white hover:bg-white/6 transition-all">{r}</button>)}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="violet-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#blue-grad)" />
              <Area type="monotone" dataKey="challenges" stroke="#8b5cf6" strokeWidth={2} fill="url(#violet-grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">XP Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RechartsPie>
              <Pie data={xpDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {xpDistribution.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {xpDistribution.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                  <span className="text-white/50">{d.name}</span>
                </div>
                <span className="font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">Retention Curve</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={retentionData}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} formatter={(v) => [`${v}%`]} />
              <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: "#22c55e", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }} />
              <Radar dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Radar dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">Monthly Challenges</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={engagementData} barSize={20}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="challenges" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
            <Btn variant="ghost" size="sm">View all</Btn>
          </div>
          <div className="space-y-3">
            {[
              { event: "Sarah Chen completed '30-Day Streak Master'", time: "2m ago", color: "green", icon: "🏆" },
              { event: "Thunder Force surpassed Apex Squad on leaderboard", time: "18m ago", color: "yellow", icon: "⚡" },
              { event: "New badge unlocked: 'Speed Demon' — 34 users", time: "1h ago", color: "blue", icon: "🥇" },
              { event: "Innovation Sprint challenge launched", time: "3h ago", color: "violet", icon: "🚀" },
              { event: "1,240 rewards redeemed this week", time: "5h ago", color: "orange", icon: "🎁" },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <div className="text-lg mt-0.5">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/70">{a.event}</p>
                  <p className="text-xs text-white/30">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Top performers */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Performers</h3>
            <Btn variant="ghost" size="sm">Leaderboard</Btn>
          </div>
          <div className="space-y-3">
            {leaderboardData.slice(0, 5).map((user) => (
              <div key={user.rank} className="flex items-center gap-3">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  user.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                  user.rank === 2 ? "bg-slate-400/20 text-slate-400" :
                  user.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                  "bg-white/5 text-white/40"
                )}>
                  {user.rank === 1 ? "👑" : user.rank}
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-white/30">{user.team}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-blue-400">{user.xp.toLocaleString()} XP</p>
                  <div className="flex items-center gap-1 justify-end">
                    <Flame size={10} className="text-orange-400" />
                    <span className="text-xs text-white/30">{user.streak}d</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Strategy Builder ────────────────────────────────────────────────────────

function StrategyBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { id: "mission", label: "Mission", icon: "🎯", desc: "Define the core purpose and overarching goal", color: "blue" },
    { id: "goal", label: "Goal", icon: "📌", desc: "Set measurable outcomes with KPIs", color: "violet" },
    { id: "task", label: "Task", icon: "✅", desc: "Break goals into actionable micro-tasks", color: "green" },
    { id: "challenge", label: "Challenge", icon: "⚔️", desc: "Design engaging challenges with XP rewards", color: "yellow" },
    { id: "reward", label: "Reward", icon: "🎁", desc: "Configure reward types and XP costs", color: "orange" },
    { id: "achievement", label: "Achievement", icon: "🏅", desc: "Set milestone-based achievement triggers", color: "pink" },
    { id: "badge", label: "Badge", icon: "🎖️", desc: "Design rarity-tiered badge criteria", color: "red" },
    { id: "leaderboard", label: "Leaderboard", icon: "🏆", desc: "Configure ranking algorithms and resets", color: "cyan" },
    { id: "feedback", label: "Feedback", icon: "💬", desc: "Define notification triggers and messages", color: "teal" },
  ];

  const colorMap: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    green: "from-green-500/20 to-green-500/5 border-green-500/30",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
    pink: "from-pink-500/20 to-pink-500/5 border-pink-500/30",
    red: "from-red-500/20 to-red-500/5 border-red-500/30",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    teal: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Strategy Builder</h1>
          <p className="text-white/40 text-sm mt-1">Drag and connect workflow nodes to build your gamification strategy</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" size="sm"><Eye size={14} /> Preview</Btn>
          <Btn variant="primary" size="sm"><Zap size={14} /> Deploy Strategy</Btn>
        </div>
      </div>

      {/* Progress breadcrumb */}
      <GlassCard className="p-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveStep(i)}
                className={cn("flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all", activeStep === i ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : i < activeStep ? "text-white/60 bg-white/5" : "text-white/25")}
              >
                <span>{step.icon}</span>
                <span>{step.label}</span>
                {i < activeStep && <CheckCircle2 size={12} className="text-green-400" />}
              </button>
              {i < steps.length - 1 && <ArrowRight size={14} className="text-white/20" />}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Workflow canvas + config panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas */}
        <div className="lg:col-span-2">
          <GlassCard className="p-4 min-h-[500px]">
            <div className="text-xs text-white/30 mb-4 font-medium uppercase tracking-wider">Workflow Canvas</div>
            <div className="grid grid-cols-3 gap-4">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    "relative p-4 rounded-2xl border bg-gradient-to-b text-left transition-all duration-200 hover:scale-105 hover:shadow-lg",
                    colorMap[step.color],
                    activeStep === i ? "ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10" : ""
                  )}
                >
                  {i < activeStep && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 size={14} className="text-green-400" />
                    </div>
                  )}
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <p className="text-sm font-semibold mb-1">{step.label}</p>
                  <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                </button>
              ))}
            </div>
            {/* Connection lines hint */}
            <div className="mt-4 flex items-center gap-2 text-xs text-white/20">
              <div className="w-4 h-px bg-blue-500/40" />
              <span>Nodes are connected sequentially — click to configure each step</span>
            </div>
          </GlassCard>
        </div>

        {/* Config panel */}
        <GlassCard className="p-5">
          <div className="text-xs text-white/30 mb-4 font-medium uppercase tracking-wider">Configure: {steps[activeStep].label}</div>
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="text-4xl mb-3">{steps[activeStep].icon}</div>
              <p className="text-sm text-white/50 leading-relaxed">{steps[activeStep].desc}</p>
            </div>
            {activeStep === 0 && (
              <>
                <div><label className="text-xs text-white/40 block mb-1">Mission Statement</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500 resize-none" rows={3} placeholder="Drive engagement and performance through meaningful gamification..." /></div>
                <div><label className="text-xs text-white/40 block mb-1">Target Audience</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-blue-500"><option>All employees</option><option>Sales team</option><option>Engineering</option></select></div>
                <div><label className="text-xs text-white/40 block mb-1">Timeline</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" placeholder="Q3 2026 — 3 months" /></div>
              </>
            )}
            {activeStep === 3 && (
              <>
                <div><label className="text-xs text-white/40 block mb-1">XP Value</label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" defaultValue={1500} /></div>
                <div><label className="text-xs text-white/40 block mb-1">Difficulty</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white/70 focus:outline-none focus:border-blue-500"><option>Easy</option><option>Medium</option><option>Hard</option><option>Epic</option></select></div>
                <div><label className="text-xs text-white/40 block mb-1">Duration</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500" placeholder="7 days" /></div>
              </>
            )}
            <div className="flex gap-2 pt-2">
              <Btn variant="outline" size="sm" className="flex-1 justify-center" onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0}>← Prev</Btn>
              <Btn variant="primary" size="sm" className="flex-1 justify-center" onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))} disabled={activeStep === steps.length - 1}>Next →</Btn>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Challenges (Kanban) ─────────────────────────────────────────────────────

function Challenges() {
  const columns = ["Draft", "Pending", "Active", "Review", "Completed", "Archived"];
  const difficultyColor: Record<string, string> = {
    Easy: "green", Medium: "yellow", Hard: "blue", Epic: "violet"
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Challenge Management</h1>
          <p className="text-white/40 text-sm mt-1">Manage your challenges across all lifecycle stages</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" size="sm"><Filter size={14} /> Filter</Btn>
          <Btn variant="primary" size="sm"><Plus size={14} /> New Challenge</Btn>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const cards = challengeCards.filter(c => c.status === col);
          return (
            <div key={col} className="shrink-0 w-72">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white/70">{col}</span>
                  <span className="text-xs bg-white/8 text-white/40 rounded-full px-2 py-0.5">{cards.length}</span>
                </div>
                <button className="text-white/30 hover:text-white transition-colors"><Plus size={14} /></button>
              </div>
              <div className="space-y-3">
                {cards.map((card) => (
                  <GlassCard key={card.id} className="p-4 hover:border-white/15 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={difficultyColor[card.difficulty] as "default" | "blue" | "violet" | "green" | "yellow" | "red" | "ghost"}>{card.difficulty}</Badge>
                      <button className="text-white/20 hover:text-white/60 opacity-0 group-hover:opacity-100 transition-all"><MoreHorizontal size={14} /></button>
                    </div>
                    <h4 className="text-sm font-semibold mb-1 leading-snug">{card.title}</h4>
                    <Badge variant="ghost" className="text-xs mb-3">{card.category}</Badge>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-white/40">
                        <span className="flex items-center gap-1"><Zap size={10} className="text-yellow-400" />{card.xp.toLocaleString()} XP</span>
                        <span className="flex items-center gap-1"><Users size={10} />{card.participants}</span>
                        <span className="flex items-center gap-1"><Clock size={10} />{card.deadline}</span>
                      </div>
                      {card.progress > 0 && (
                        <div>
                          <div className="flex justify-between text-xs text-white/30 mb-1">
                            <span>Progress</span><span>{card.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                            <div className={cn("h-full rounded-full transition-all", card.progress === 100 ? "bg-green-500" : "bg-blue-500")} style={{ width: `${card.progress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                ))}
                {cards.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-white/6 p-6 text-center text-white/20 text-sm">
                    Drop challenge here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Rewards Marketplace ─────────────────────────────────────────────────────

function Rewards() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set([2, 5]));
  const [category, setCategory] = useState("All");
  const categories = ["All", "Gift Cards", "Premium", "Merchandise", "Learning", "Coupons", "Digital"];

  const toggleFav = (id: number) => {
    setFavorites(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  const filtered = category === "All" ? rewardsData : rewardsData.filter(r => r.category === category);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rewards Marketplace</h1>
          <p className="text-white/40 text-sm mt-1">Your XP balance: <span className="text-yellow-400 font-semibold">28,400 XP</span></p>
        </div>
        <Btn variant="primary" size="sm"><Plus size={14} /> Add Reward</Btn>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", category === c ? "bg-blue-500 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20")}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((reward) => (
          <GlassCard key={reward.id} className="overflow-hidden hover:border-white/15 transition-all group">
            <div className="relative h-36 bg-gradient-to-br from-white/5 to-white/2 flex items-center justify-center">
              <div className="text-5xl">{reward.img}</div>
              {reward.popular && (
                <div className="absolute top-3 left-3 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg">🔥 Popular</div>
              )}
              <button onClick={() => toggleFav(reward.id)} className="absolute top-3 right-3 p-2 rounded-xl bg-black/30 hover:bg-black/50 transition-all">
                <Heart size={14} className={favorites.has(reward.id) ? "fill-red-400 text-red-400" : "text-white/40"} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm leading-snug">{reward.name}</h4>
                  <Badge variant="ghost" className="mt-1">{reward.category}</Badge>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 font-bold">
                    <Zap size={12} />
                    <span className="text-sm">{reward.xpCost.toLocaleString()} XP</span>
                  </div>
                  <p className="text-xs text-white/30 mt-0.5">{reward.available} available</p>
                </div>
                <Btn variant={reward.xpCost <= 28400 ? "primary" : "ghost"} size="sm" disabled={reward.xpCost > 28400}>
                  {reward.xpCost <= 28400 ? "Redeem" : "Need more XP"}
                </Btn>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  const rarityGradient: Record<string, string> = {
    Common: "from-gray-600/20 to-gray-600/5 border-gray-600/30",
    Uncommon: "from-green-600/20 to-green-600/5 border-green-500/30",
    Rare: "from-blue-600/20 to-blue-600/5 border-blue-500/30",
    Epic: "from-violet-600/20 to-violet-600/5 border-violet-500/30",
    Legendary: "from-yellow-600/20 to-yellow-600/5 border-yellow-500/30",
  };
  const rarityLabel: Record<string, "default" | "green" | "blue" | "violet" | "yellow"> = {
    Common: "default", Uncommon: "green", Rare: "blue", Epic: "violet", Legendary: "yellow"
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Achievement Center</h1>
          <p className="text-white/40 text-sm mt-1">3 of 6 achievements unlocked · 450 XP collected from badges</p>
        </div>
        <div className="flex gap-3">
          {["All", "Unlocked", "Locked"].map(f => (
            <button key={f} className="text-sm px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all">{f}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievementData.map((ach) => (
          <div key={ach.id} className={cn("relative rounded-2xl border bg-gradient-to-b p-5 transition-all hover:scale-[1.02] duration-300", rarityGradient[ach.rarity], !ach.unlocked && "opacity-60")}>
            {ach.rarity === "Legendary" && ach.unlocked && (
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl pointer-events-none" />
            )}
            <div className="flex items-start justify-between mb-4">
              <div className={cn("text-4xl", !ach.unlocked && "grayscale filter")}>{ach.icon}</div>
              <div className="text-right">
                <Badge variant={rarityLabel[ach.rarity] as "default" | "blue" | "violet" | "green" | "yellow" | "red" | "ghost"}>{ach.rarity}</Badge>
                <div className="flex items-center justify-end gap-1 mt-2">
                  {ach.unlocked ? <Unlock size={12} className="text-green-400" /> : <Lock size={12} className="text-white/30" />}
                  <span className={cn("text-xs font-medium", ach.unlocked ? "text-green-400" : "text-white/30")}>{ach.unlocked ? "Unlocked" : "Locked"}</span>
                </div>
              </div>
            </div>
            <h4 className="font-bold mb-1">{ach.name}</h4>
            <p className="text-sm text-white/50 mb-4">{ach.desc}</p>
            {ach.xpReq > 0 && (
              <div className="flex items-center gap-2 text-xs text-white/40 mb-3">
                <Zap size={10} className="text-yellow-400" />
                <span>{ach.xpReq.toLocaleString()} XP required</span>
              </div>
            )}
            <div>
              <div className="flex justify-between text-xs text-white/30 mb-1">
                <span>Unlocked by</span><span>{ach.unlockPct}% of users</span>
              </div>
              <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full", ach.unlocked ? "bg-green-500" : "bg-white/20")} style={{ width: `${ach.unlockPct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

function Leaderboard() {
  const [tab, setTab] = useState<"global" | "team" | "weekly">("global");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leaderboards</h1>
          <p className="text-white/40 text-sm mt-1">Resets in 4d 12h · Season 7</p>
        </div>
        <Btn variant="outline" size="sm"><Download size={14} /> Export</Btn>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit border border-white/8">
        {(["global", "team", "weekly"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all", tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70")}>{t}</button>
        ))}
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-6 py-6">
        {[leaderboardData[1], leaderboardData[0], leaderboardData[2]].map((user, i) => {
          const isFirst = i === 1;
          return (
            <div key={user.rank} className={cn("flex flex-col items-center gap-2 transition-all", isFirst ? "mb-0" : "mb-0")}>
              <div className={cn("font-bold text-3xl", isFirst ? "text-yellow-400" : i === 0 ? "text-slate-400" : "text-orange-400")}>
                {isFirst ? "👑" : user.rank === 2 ? "🥈" : "🥉"}
              </div>
              <div className={cn("rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-blue-500 to-violet-500", isFirst ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm")}>{user.avatar}</div>
              <div className="text-center">
                <p className={cn("font-semibold", isFirst ? "text-base" : "text-sm")}>{user.name.split(" ")[0]}</p>
                <p className="text-xs text-yellow-400 font-bold">{(user.xp / 1000).toFixed(1)}K XP</p>
              </div>
              <div className={cn("rounded-t-xl w-20 flex items-center justify-center font-bold text-xs", isFirst ? "h-20 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400" : i === 0 ? "h-14 bg-slate-500/20 border border-slate-500/30 text-slate-400" : "h-10 bg-orange-500/20 border border-orange-500/30 text-orange-400")}>
                #{user.rank}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/6">
              <tr>
                {["Rank", "Player", "Team", "XP", "Streak", "Weekly", "Monthly", "Badges"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {leaderboardData.map((user) => (
                <tr key={user.rank} className={cn("transition-colors hover:bg-white/3", user.rank <= 3 && "bg-gradient-to-r from-yellow-500/3 to-transparent")}>
                  <td className="px-4 py-4">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      user.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                      user.rank === 2 ? "bg-slate-400/20 text-slate-400" :
                      user.rank === 3 ? "bg-orange-500/20 text-orange-400" :
                      "text-white/40"
                    )}>
                      {user.rank <= 3 ? ["👑","🥈","🥉"][user.rank-1] : user.rank}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white">{user.avatar}</div>
                      <span className="font-medium text-sm">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white/50">{user.team}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-blue-400">{user.xp.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-orange-400">
                      <Flame size={13} />{user.streak}d
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-green-400 font-medium">+{user.weekly.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-white/60">{user.monthly.toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-violet-400">
                      <Award size={13} />{user.badges}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Analytics ───────────────────────────────────────────────────────────────

function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-white/40 text-sm mt-1">Jun 1 – Jun 29, 2026 · Compared to May 2026</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="outline" size="sm"><Filter size={14} /> Date range</Btn>
          <Btn variant="outline" size="sm"><Download size={14} /> Export PDF</Btn>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "11,428", delta: "+23%", up: true },
          { label: "Avg Session", value: "18.4m", delta: "+6%", up: true },
          { label: "XP Velocity", value: "4.2M/d", delta: "+18%", up: true },
          { label: "Churn Rate", value: "2.3%", delta: "-0.8%", up: false },
        ].map(s => (
          <GlassCard key={s.label} className="p-4">
            <p className="text-xs text-white/40 mb-2">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <span className={cn("text-xs font-medium flex items-center gap-1 mt-1", s.up ? "text-green-400" : "text-red-400")}>
              {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{s.delta}
            </span>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} fill="url(#ug)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">Engagement Funnel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <FunnelChart>
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="#fff" stroke="none" dataKey="name" style={{ fontSize: 12, opacity: 0.6 }} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">XP Earned vs Challenges</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={engagementData}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
              <Bar dataKey="challenges" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="p-5">
          <h3 className="font-semibold mb-5">Team Performance Radar</h3>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }} />
              <Radar dataKey="A" name="This Month" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              <Radar dataKey="B" name="Last Month" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 4" />
              <Legend wrapperStyle={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#111224", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }} />
            </RadarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      {/* Heatmap simulation */}
      <GlassCard className="p-5">
        <h3 className="font-semibold mb-5">Activity Heatmap — June 2026</h3>
        <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(30, 1fr)" }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const intensity = Math.random();
            const color = intensity > 0.8 ? "#3b82f6" : intensity > 0.6 ? "#1d4ed8" : intensity > 0.4 ? "#1e3a8a" : intensity > 0.2 ? "#1e3a8a50" : "#ffffff08";
            return <div key={i} className="h-4 rounded-sm transition-all hover:scale-125" style={{ background: color }} title={`Day ${i + 1}: ${Math.round(intensity * 100)}% activity`} />;
          })}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-white/30">
          <span>Less</span>
          {["#ffffff08", "#1e3a8a50", "#1e3a8a", "#1d4ed8", "#3b82f6"].map(c => <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />)}
          <span>More</span>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

function AIAssistant() {
  const [messages, setMessages] = useState(aiMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Generate a 30-day retention challenge",
    "Optimize my XP distribution for better engagement",
    "Predict engagement drop risk for next week",
    "Suggest top rewards for my audience",
  ];

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Generate a 30-day retention challenge": "Here's a high-impact 30-day retention challenge:\n\n**🔥 The Loyalty Legend Challenge**\n- Duration: 30 days\n- XP Reward: 5,000 XP + exclusive 'Loyalty' badge\n- Mechanic: Log in and complete 1 task daily for 30 consecutive days\n- Streak multiplier: Days 7/14/21/30 give 2x XP\n- Team bonus: Squads where all members hit Day 30 get +2,000 XP each\n\nPredicted impact: +34% D30 retention based on your current cohort behavior.",
        default: "Great question! Based on your current engagement data and user behavior patterns, here's my analysis:\n\nYour platform shows strong D1 retention (94%) but drops significantly at D14 (61%). This gap suggests your initial challenge difficulty curve may be too steep. I recommend:\n\n1. **Soft landing challenges** for users in days 7-14\n2. **Team challenge mechanics** to add social accountability\n3. **Streak rescue notifications** at 23h mark\n\nWould you like me to generate specific challenge templates for any of these?"
      };
      setMessages(prev => [...prev, { role: "assistant", content: responses[text] || responses.default }]);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="p-6 h-full flex flex-col gap-5" style={{ height: "calc(100vh - 64px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI Strategy Assistant</h1>
            <div className="flex items-center gap-1.5 text-xs text-green-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              GPT-4 powered · Online
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge variant="blue">Challenge Generator</Badge>
          <Badge variant="violet">XP Optimizer</Badge>
          <Badge variant="green">Engagement Predictor</Badge>
        </div>
      </div>

      {/* Messages */}
      <GlassCard className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0", msg.role === "assistant" ? "bg-gradient-to-br from-blue-500 to-violet-500" : "bg-white/10")}>
              {msg.role === "assistant" ? <Bot size={15} className="text-white" /> : "SC"}
            </div>
            <div className={cn("max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed", msg.role === "assistant" ? "bg-white/5 border border-white/8 text-white/80" : "bg-blue-500 text-white")}>
              <pre className="whitespace-pre-wrap font-[inherit]">{msg.content}</pre>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Bot size={15} className="text-white" />
            </div>
            <div className="bg-white/5 border border-white/8 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(j => <div key={j} className="w-2 h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </GlassCard>

      {/* Suggestions */}
      <div className="flex gap-2 flex-wrap">
        {suggestions.map(s => (
          <button key={s} onClick={() => send(s)} className="text-xs px-3 py-2 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/8 transition-all bg-white/3">
            <Sparkles size={11} className="inline mr-1" />{s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask me to generate challenges, optimize XP, predict trends..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <Btn variant="primary" size="md" onClick={() => send(input)} disabled={!input.trim() || loading}>
          <Send size={15} />
        </Btn>
      </div>
    </div>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────

function Notifications() {
  const [notifs, setNotifs] = useState(notificationsData);

  const iconMap: Record<string, { icon: string; color: string }> = {
    xp: { icon: "⚡", color: "text-yellow-400" },
    badge: { icon: "🥇", color: "text-blue-400" },
    challenge: { icon: "🎯", color: "text-green-400" },
    reward: { icon: "🎁", color: "text-violet-400" },
    team: { icon: "👥", color: "text-orange-400" },
    ai: { icon: "🤖", color: "text-pink-400" },
    system: { icon: "⚙️", color: "text-white/50" },
  };

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-white/40 text-sm mt-1">{notifs.filter(n => !n.read).length} unread</p>
        </div>
        <div className="flex gap-3">
          <Btn variant="ghost" size="sm" onClick={markAllRead}><CheckCircle2 size={14} /> Mark all read</Btn>
          <Btn variant="outline" size="sm"><Settings size={14} /> Preferences</Btn>
        </div>
      </div>

      <div className="max-w-2xl space-y-2">
        {notifs.map((n) => {
          const meta = iconMap[n.type];
          return (
            <GlassCard key={n.id} className={cn("p-4 hover:border-white/15 transition-all cursor-pointer", !n.read && "border-blue-500/20 bg-blue-500/3")}>
              <div className="flex items-start gap-4">
                <div className={cn("text-xl mt-0.5 w-8 text-center", meta.color)}>{meta.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("text-sm font-semibold", !n.read ? "text-white" : "text-white/60")}>{n.title}</p>
                    <span className="text-xs text-white/30 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-sm text-white/40 mt-0.5">{n.desc}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-2" />}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const tabs = [
    { id: "general", label: "General" }, { id: "appearance", label: "Appearance" },
    { id: "xp-rules", label: "XP Rules" }, { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" }, { id: "api", label: "API & Integrations" },
    { id: "billing", label: "Billing" }, { id: "roles", label: "Roles & Permissions" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="w-48 shrink-0">
          <nav className="space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={cn("w-full text-left px-3 py-2 rounded-xl text-sm transition-all", activeTab === t.id ? "bg-blue-500/15 text-blue-400" : "text-white/40 hover:text-white hover:bg-white/5")}>{t.label}</button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-xl">
          {activeTab === "general" && (
            <GlassCard className="p-6 space-y-5">
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              {[
                { label: "Organization Name", val: "Acme Corporation" },
                { label: "Platform URL", val: "acme.questforge.io" },
                { label: "Default Timezone", val: "UTC-8 (PST)" },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-sm text-white/50 block mb-1.5">{f.label}</label>
                  <input defaultValue={f.val} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              ))}
              <div className="flex justify-end pt-2">
                <Btn variant="primary" size="sm"><Check size={14} /> Save changes</Btn>
              </div>
            </GlassCard>
          )}
          {activeTab === "xp-rules" && (
            <GlassCard className="p-6 space-y-5">
              <h2 className="text-lg font-semibold mb-4">XP Configuration</h2>
              {[
                { label: "Base XP per challenge", val: "1000" },
                { label: "Streak multiplier (7 days)", val: "1.5x" },
                { label: "Team bonus multiplier", val: "1.2x" },
                { label: "Daily XP cap", val: "5000" },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between">
                  <label className="text-sm text-white/70">{f.label}</label>
                  <input defaultValue={f.val} className="w-32 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white text-center focus:outline-none focus:border-blue-500 transition-colors" />
                </div>
              ))}
              <div className="pt-2 border-t border-white/6">
                {["Anti-gaming ML detection", "Velocity abuse protection", "Bot activity filters"].map(t => (
                  <div key={t} className="flex items-center justify-between py-3">
                    <span className="text-sm text-white/70">{t}</span>
                    <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
          {activeTab === "security" && (
            <GlassCard className="p-6 space-y-5">
              <h2 className="text-lg font-semibold mb-4">Security</h2>
              {["Two-factor authentication", "Session timeout (30 min)", "IP allowlist", "Audit log retention (90 days)"].map(s => (
                <div key={s} className="flex items-center justify-between py-2.5 border-b border-white/6">
                  <div>
                    <p className="text-sm font-medium">{s}</p>
                  </div>
                  <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Btn variant="danger" size="sm"><AlertTriangle size={14} /> Reset all sessions</Btn>
              </div>
            </GlassCard>
          )}
          {activeTab === "billing" && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-6">Billing & Plan</h2>
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/8 p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-blue-400">Growth Plan</p>
                    <p className="text-sm text-white/50">Up to 1,000 MAU · $119/month</p>
                  </div>
                  <Badge variant="blue">Active</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Next billing date", val: "July 29, 2026" },
                  { label: "Current MAU", val: "842 / 1,000" },
                  { label: "Payment method", val: "Visa •••• 4242" },
                ].map(r => (
                  <div key={r.label} className="flex items-center justify-between py-2 border-b border-white/6">
                    <span className="text-sm text-white/50">{r.label}</span>
                    <span className="text-sm font-medium">{r.val}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Btn variant="outline" size="sm"><CreditCard size={14} /> Update payment</Btn>
                <Btn variant="primary" size="sm"><ArrowRight size={14} /> Upgrade plan</Btn>
              </div>
            </GlassCard>
          )}
          {!["general", "xp-rules", "security", "billing"].includes(activeTab) && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-semibold mb-4">{tabs.find(t => t.id === activeTab)?.label}</h2>
              <div className="text-white/30 text-sm py-8 text-center">
                <Settings size={32} className="mx-auto mb-3 opacity-30" />
                Configuration options for this section coming soon
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function Profile() {
  const skills = [
    { name: "Challenge Design", level: 87 },
    { name: "Team Leadership", level: 74 },
    { name: "XP Optimization", level: 91 },
    { name: "Data Analysis", level: 68 },
    { name: "Reward Strategy", level: 82 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <GlassCard className="p-6">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-2xl font-bold text-white">SC</div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#07080f] flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold">Sarah Chen</h2>
            <p className="text-white/40 text-sm mb-1">@sarah.chen</p>
            <p className="text-blue-400 text-sm font-medium">Head of Gamification · Acme Corp</p>

            <div className="mt-4 flex items-center justify-center gap-3 text-sm">
              <Badge variant="yellow"><Crown size={10} className="mr-1" />Level 42</Badge>
              <Badge variant="violet"><Flame size={10} className="mr-1" />47d streak</Badge>
            </div>

            {/* XP Progress ring */}
            <div className="mt-6 relative w-28 h-28 mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.73)}`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold">73%</span>
                <span className="text-xs text-white/40">to Lv 43</span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-yellow-400">142,800 XP</p>
              <p className="text-xs text-white/30">Total XP Earned</p>
            </div>

            <div className="mt-5 flex gap-2 justify-center flex-wrap">
              {["⚔️", "🔥", "🤝", "🏆", "⭐"].map((b, i) => (
                <div key={i} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:scale-110 transition-transform cursor-pointer" title="Achievement badge">{b}</div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Skills + Activity */}
        <div className="lg:col-span-2 space-y-5">
          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4">Skill Levels</h3>
            <div className="space-y-4">
              {skills.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/70">{s.name}</span>
                    <span className="font-medium text-white">{s.level}%</span>
                  </div>
                  <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-700" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h3 className="font-semibold mb-4">Activity Timeline</h3>
            <div className="space-y-4">
              {[
                { time: "2h ago", event: "Completed 30-Day Streak Master challenge", icon: "🏆", xp: "+2,500 XP" },
                { time: "1d ago", event: "Unlocked 'Streak Seeker' badge", icon: "🥇", xp: "+200 XP" },
                { time: "2d ago", event: "Reached top 3 on global leaderboard", icon: "⚡", xp: "+500 XP" },
                { time: "5d ago", event: "Joined 'Nexus Team' and earned team bonus", icon: "🤝", xp: "+800 XP" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 relative">
                  {i < 3 && <div className="absolute left-4 top-7 bottom-0 w-px bg-white/5" />}
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-sm shrink-0 relative z-10">{a.icon}</div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm text-white/70">{a.event}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/30">{a.time}</span>
                      <span className="text-xs text-green-400 font-medium">{a.xp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// ─── Users Page ───────────────────────────────────────────────────────────────

function UsersPage() {
  const users = [
    { name: "Sarah Chen", email: "sarah@acme.com", role: "Admin", xp: 142800, status: "Active", joined: "Jan 2025", avatar: "SC" },
    { name: "Marcus Rivera", email: "marcus@acme.com", role: "Manager", xp: 138500, status: "Active", joined: "Feb 2025", avatar: "MR" },
    { name: "Priya Sharma", email: "priya@acme.com", role: "Member", xp: 131200, status: "Active", joined: "Mar 2025", avatar: "PS" },
    { name: "James Okafor", email: "james@acme.com", role: "Member", xp: 124600, status: "Inactive", joined: "Apr 2025", avatar: "JO" },
    { name: "Elena Volkov", email: "elena@acme.com", role: "Member", xp: 118300, status: "Active", joined: "Jan 2025", avatar: "EV" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex gap-3">
          <Btn variant="outline" size="sm"><Download size={14} /> Export</Btn>
          <Btn variant="primary" size="sm"><Plus size={14} /> Invite User</Btn>
        </div>
      </div>
      <GlassCard>
        <div className="p-4 border-b border-white/6 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-white/30 text-sm flex-1 max-w-xs">
            <Search size={13} />
            <input className="bg-transparent outline-none placeholder-white/20 text-white text-sm w-full" placeholder="Search users..." />
          </div>
          <Btn variant="ghost" size="sm"><Filter size={14} /> Filter</Btn>
        </div>
        <table className="w-full">
          <thead className="border-b border-white/6">
            <tr>{["User", "Email", "Role", "XP", "Status", "Joined", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/4">
            {users.map(u => (
              <tr key={u.name} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-xs font-bold">{u.avatar}</div>
                    <span className="text-sm font-medium">{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-white/40">{u.email}</td>
                <td className="px-4 py-4"><Badge variant={u.role === "Admin" ? "blue" : u.role === "Manager" ? "violet" : "ghost"}>{u.role}</Badge></td>
                <td className="px-4 py-4 text-sm font-semibold text-blue-400">{u.xp.toLocaleString()}</td>
                <td className="px-4 py-4"><Badge variant={u.status === "Active" ? "green" : "ghost"}>{u.status}</Badge></td>
                <td className="px-4 py-4 text-sm text-white/40">{u.joined}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-white/8 text-white/30 hover:text-white transition-all"><Edit2 size={13} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── Teams Page ───────────────────────────────────────────────────────────────

function Teams() {
  const teams = [
    { name: "Apex Squad", members: 12, xp: 1248000, rank: 1, streak: 22, color: "from-yellow-500 to-orange-500" },
    { name: "Thunder Force", members: 9, xp: 1142000, rank: 2, streak: 18, color: "from-blue-500 to-cyan-500" },
    { name: "Nexus Team", members: 14, xp: 1098000, rank: 3, streak: 31, color: "from-violet-500 to-pink-500" },
    { name: "Ghost Protocol", members: 7, xp: 892000, rank: 4, streak: 9, color: "from-gray-600 to-gray-700" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <Btn variant="primary" size="sm"><Plus size={14} /> Create Team</Btn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {teams.map(t => (
          <GlassCard key={t.name} className="p-5 hover:border-white/15 transition-all">
            <div className="flex items-center gap-4 mb-5">
              <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-lg font-bold text-white", t.color)}>
                {t.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{t.name}</h3>
                  <Badge variant={t.rank === 1 ? "yellow" : t.rank === 2 ? "ghost" : "ghost"}>#{t.rank}</Badge>
                </div>
                <p className="text-sm text-white/40">{t.members} members</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/3 rounded-xl p-3">
                <p className="text-xs text-white/30 mb-1">Total XP</p>
                <p className="text-sm font-bold text-blue-400">{(t.xp / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-white/3 rounded-xl p-3">
                <p className="text-xs text-white/30 mb-1">Streak</p>
                <p className="text-sm font-bold text-orange-400"><Flame size={11} className="inline" />{t.streak}d</p>
              </div>
              <div className="bg-white/3 rounded-xl p-3">
                <p className="text-xs text-white/30 mb-1">Members</p>
                <p className="text-sm font-bold">{t.members}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Btn variant="ghost" size="sm" className="flex-1 justify-center"><Eye size={13} /> View</Btn>
              <Btn variant="outline" size="sm" className="flex-1 justify-center"><UserIcon size={13} /> Join</Btn>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function UserIcon({ size }: { size: number }) {
  return <User size={size} />;
}

// ─── Reports Page ─────────────────────────────────────────────────────────────

function Reports() {
  const reports = [
    { name: "Monthly Engagement Report", date: "Jun 29, 2026", size: "2.4 MB", type: "PDF" },
    { name: "XP Distribution Analysis", date: "Jun 22, 2026", size: "1.8 MB", type: "PDF" },
    { name: "Challenge Performance Q2", date: "Jun 15, 2026", size: "3.1 MB", type: "XLSX" },
    { name: "Retention Cohort Report", date: "Jun 1, 2026", size: "4.2 MB", type: "PDF" },
    { name: "Team Leaderboard Export", date: "May 30, 2026", size: "0.9 MB", type: "CSV" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Reports</h1>
        <Btn variant="primary" size="sm"><Plus size={14} /> Generate Report</Btn>
      </div>
      <GlassCard>
        <div className="divide-y divide-white/6">
          {reports.map(r => (
            <div key={r.name} className="flex items-center justify-between p-4 hover:bg-white/3 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                  <FileText size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-white/30">{r.date} · {r.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={r.type === "PDF" ? "red" : r.type === "XLSX" ? "green" : "ghost"}>{r.type}</Badge>
                <button className="p-2 rounded-xl hover:bg-white/8 text-white/40 hover:text-white transition-all"><Download size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Help Center ──────────────────────────────────────────────────────────────

function Help() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
          <HelpCircle size={28} className="text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold mb-3">How can we help?</h1>
        <div className="max-w-md mx-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
          <Search size={16} className="text-white/30" />
          <input className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none" placeholder="Search the help center..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[
          { icon: "🚀", title: "Getting Started", articles: 12, color: "blue" },
          { icon: "⚡", title: "XP & Challenges", articles: 28, color: "violet" },
          { icon: "🏆", title: "Leaderboards", articles: 15, color: "yellow" },
          { icon: "🎁", title: "Rewards", articles: 21, color: "green" },
          { icon: "🤖", title: "AI Assistant", articles: 9, color: "pink" },
          { icon: "⚙️", title: "Settings & API", articles: 34, color: "orange" },
        ].map(c => (
          <GlassCard key={c.title} className="p-5 hover:border-white/15 transition-all cursor-pointer group">
            <div className="text-3xl mb-3">{c.icon}</div>
            <h3 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors">{c.title}</h3>
            <p className="text-sm text-white/40">{c.articles} articles</p>
          </GlassCard>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-5">
          <h3 className="font-semibold mb-4">Popular Articles</h3>
          <div className="space-y-3">
            {["How to create your first challenge", "Understanding XP multipliers and streak bonuses", "Setting up team leaderboards", "Integrating with Slack for notifications", "Exporting analytics reports"].map(a => (
              <div key={a} className="flex items-center justify-between py-2 border-b border-white/6 last:border-0 cursor-pointer group">
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">{a}</span>
                <ExternalLink size={13} className="text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

// ─── Quests Page (simplified) ─────────────────────────────────────────────────

function Quests() {
  const quests = [
    { title: "The XP Ascent", steps: 5, completed: 3, xp: 8000, deadline: "Jul 31", difficulty: "Epic", icon: "🗺️" },
    { title: "Social Butterfly", steps: 4, completed: 4, xp: 3500, deadline: "Done", difficulty: "Medium", icon: "🦋" },
    { title: "Challenge Collector", steps: 10, completed: 7, xp: 12000, deadline: "Aug 15", difficulty: "Hard", icon: "⚔️" },
    { title: "Learning Odyssey", steps: 8, completed: 2, xp: 9500, deadline: "Sep 1", difficulty: "Hard", icon: "📚" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quests</h1>
        <Btn variant="primary" size="sm"><Plus size={14} /> New Quest</Btn>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quests.map(q => (
          <GlassCard key={q.title} className="p-5 hover:border-white/15 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-3xl">{q.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{q.title}</h3>
                  <Badge variant={q.difficulty === "Epic" ? "violet" : q.difficulty === "Hard" ? "blue" : "green"}>{q.difficulty}</Badge>
                </div>
                <p className="text-sm text-white/40 mt-0.5">{q.steps} steps · Deadline: {q.deadline}</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-xs text-white/30 mb-1.5">
                <span>{q.completed}/{q.steps} steps completed</span>
                <span>{Math.round((q.completed / q.steps) * 100)}%</span>
              </div>
              <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all", q.completed === q.steps && "from-green-500 to-green-400")} style={{ width: `${(q.completed / q.steps) * 100}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                <Zap size={13} />{q.xp.toLocaleString()} XP
              </div>
              <Btn variant={q.completed === q.steps ? "ghost" : "primary"} size="sm">
                {q.completed === q.steps ? "Claim Reward 🎁" : "Continue →"}
              </Btn>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── Floating AI Widget ──────────────────────────────────────────────────────

function FloatingAI({ open, onClose, onNavigate }: { open: boolean; onClose: () => void; onNavigate: (p: Page) => void }) {
  if (!open) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-80 rounded-2xl border border-white/10 bg-[#111224] shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-gradient-to-r from-blue-600/20 to-violet-600/20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <Bot size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold">AI Assistant</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors"><X size={15} /></button>
        </div>
        <div className="p-4">
          <p className="text-sm text-white/60 mb-3">Hi Sarah! Quick suggestions for today:</p>
          {["🎯 Launch Innovation Sprint now", "📊 Review D14 drop — urgent", "⚡ Boost XP cap for weekend"].map(s => (
            <button key={s} onClick={() => { onClose(); onNavigate("ai-assistant"); }} className="w-full text-left text-xs px-3 py-2 rounded-xl bg-white/4 border border-white/6 text-white/60 hover:text-white hover:border-blue-500/30 transition-all mb-2">
              {s}
            </button>
          ))}
          <Btn variant="primary" size="sm" className="w-full justify-center mt-1" onClick={() => { onClose(); onNavigate("ai-assistant"); }}>
            Open full assistant <ArrowRight size={13} />
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ───────────────────────────────────────────────────────────────

function AppShell({ currentPage, onNavigate }: { currentPage: Page; onNavigate: (p: Page) => void }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const sidebarW = sidebarCollapsed ? 64 : 240;

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard": return <Dashboard />;
      case "strategy-builder": return <StrategyBuilder />;
      case "challenges": return <Challenges />;
      case "quests": return <Quests />;
      case "rewards": return <Rewards />;
      case "achievements": return <Achievements />;
      case "leaderboards": return <Leaderboard />;
      case "analytics": return <Analytics />;
      case "users": return <UsersPage />;
      case "teams": return <Teams />;
      case "reports": return <Reports />;
      case "ai-assistant": return <AIAssistant />;
      case "notifications": return <Notifications />;
      case "settings": return <SettingsPage />;
      case "help": return <Help />;
      case "profile": return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07080f] font-[Inter,sans-serif]">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className="transition-all duration-300" style={{ marginLeft: `${sidebarW}px` }}>
        <Topnav onNavigate={onNavigate} onAiOpen={() => setAiOpen(true)} />
        <main className="overflow-auto" style={{ minHeight: "calc(100vh - 64px)" }}>
          {renderPage()}
        </main>
      </div>
      <FloatingAI open={aiOpen} onClose={() => setAiOpen(false)} onNavigate={onNavigate} />
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (p: Page) => setPage(p);

  const isAuth = !["landing", "login", "register", "forgot-password", "reset-password", "2fa"].includes(page);

  useEffect(() => {
    document.documentElement.style.fontFamily = "Inter, sans-serif";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  if (page === "landing") return <LandingPage onNavigate={navigate} />;
  if (!isAuth) return <AuthPage page={page} onNavigate={navigate} />;
  return <AppShell currentPage={page} onNavigate={navigate} />;
}
