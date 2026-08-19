import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  ChevronDown,
  Droplet,
  HeartPulse,
  LayoutGrid,
  MapPin,
  Navigation,
  Plus,
  Radar,
  Shield,
  Siren,
  Truck,
  Users,
} from "lucide-react";
import { Bar, Card, CardTitle, Drawer, Tag } from "@/components/rakhsetu/primitives";
import { Sparkline } from "@/components/rakhsetu/Sparkline";
import { Intro } from "@/components/rakhsetu/Intro";
import {
  AnalyticsPanel,
  DonorList,
  EmergencyForm,
  InventoryList,
  SecurityPanel,
  SmartMatch,
  TrackingDetail,
} from "@/components/rakhsetu/drawers";
import {
  activeStage,
  activity,
  alerts,
  bloodStock,
  demandTrend,
  timeline,
  type PanelKey,
} from "@/components/rakhsetu/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "rakhsetu" },
      {
        name: "description",
        content:
          "Rakhsetu coordinates real-time emergency blood requests: smart donor matching, live tracking, inventory and demand analytics in one command center.",
      },
      { property: "og:title", content: "Rakhsetu — Emergency Command Center" },
      {
        property: "og:description",
        content:
          "Real-time emergency blood coordination: smart matching, live delivery tracking and inventory intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const navItems: { key: PanelKey; label: string; icon: typeof LayoutGrid }[] = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "emergency", label: "Emergency Request", icon: Siren },
  { key: "match", label: "Smart Match", icon: Radar },
  { key: "tracking", label: "Tracking", icon: Navigation },
  { key: "inventory", label: "Inventory", icon: Droplet },
  { key: "donors", label: "Donors", icon: Users },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "security", label: "Security", icon: Shield },
];

const drawerMeta: Record<Exclude<PanelKey, "overview">, { title: string; subtitle: string }> = {
  emergency: { title: "Raise Emergency Request", subtitle: "Broadcast to verified banks and donors nearby" },
  match: { title: "Smart Match", subtitle: "Ranked by distance, freshness and reliability" },
  tracking: { title: "Live Tracking", subtitle: "Request #RK-2481 · courier RK-07" },
  inventory: { title: "Inventory", subtitle: "Live availability across 4 partner banks" },
  donors: { title: "Donor Network", subtitle: "Verified donors within 8 km" },
  analytics: { title: "Analytics", subtitle: "Network performance, last 12 weeks" },
  security: { title: "Security & Trust", subtitle: "Consent-first data handling" },
};

function Dashboard() {
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState<PanelKey>("overview");
  const [panel, setPanel] = useState<Exclude<PanelKey, "overview"> | null>(null);
  const closeIntro = useCallback(() => setIntro(false), []);

  const open = (key: Exclude<PanelKey, "overview">) => {
    setActive(key);
    setPanel(key);
  };
  const close = () => {
    setPanel(null);
    setActive("overview");
  };

  return (
    <>
      {intro ? <Intro onDone={closeIntro} /> : null}

      <div className="flex min-h-screen bg-[#09090B]">
        {/* Sidebar */}
        <nav className="sticky top-0 hidden h-screen w-[76px] shrink-0 flex-col items-center gap-1 border-r border-border bg-[#0b0b0e]/80 py-6 lg:flex xl:w-[212px] xl:items-stretch xl:px-4">
          <div className="mb-8 flex items-center gap-2.5 xl:px-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/60 bg-[#171019] text-primary">
              <HeartPulse size={20} strokeWidth={1.7} />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight lowercase xl:block">rakhsetu.</span>
          </div>
          {navItems.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => (key === "overview" ? close() : open(key))}
                title={label}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 xl:justify-start ${
                  isActive
                    ? "bg-primary/12 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--rose)_25%,transparent)]"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="hidden truncate xl:block">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-[#09090B]/85 px-5 py-4 backdrop-blur-xl sm:px-8">
            <button className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
              <MapPin size={14} className="text-primary" />
              Pune · Zone West
              <ChevronDown size={13} />
            </button>
            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="relative rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-primary pulse-ring" />
              </button>
              <div className="flex items-center gap-2.5 rounded-full border border-border py-1 pr-4 pl-1">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[var(--rose-deep)] to-[var(--rose)] text-xs font-semibold text-primary-foreground">
                  NS
                </span>
                <span className="hidden text-xs sm:block">Dr. Nikita Shah</span>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1240px] px-5 py-10 sm:px-8 sm:py-12">
            {/* Heading */}
            <div className="fade-up flex flex-wrap items-end justify-between gap-6">
              <div>
                <Tag tone="rose">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-ring" /> Live network · 4 banks
                </Tag>
                <h1 className="mt-4 text-3xl font-semibold sm:text-[2.6rem] sm:leading-tight">
                  Emergency <span className="text-gradient-rose">Command Center</span>
                </h1>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  One active critical request. Matching, transport and inventory in a single view.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => open("emergency")}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--rose-deep)] to-[var(--rose)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-20px_var(--rose)]"
                >
                  <Plus size={16} /> Raise Emergency Request
                </button>
                <button
                  onClick={() => open("tracking")}
                  className="flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45"
                >
                  <Navigation size={16} /> Track Request
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {/* Active emergency */}
              <Card className="lg:col-span-2" onClick={() => open("tracking")} delay={40}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-lg font-semibold text-primary pulse-ring">
                      O−
                    </span>
                    <div>
                      <p className="text-base font-semibold">Active Emergency · #RK-2481</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        2 units · Meera Memorial Hospital · raised 10:42
                      </p>
                    </div>
                  </div>
                  <Tag tone="critical">
                    <AlertTriangle size={12} /> Critical
                  </Tag>
                </div>

                <div className="mt-9 mb-2">
                  <div className="relative flex justify-between">
                    <span className="absolute top-[5px] right-0 left-0 h-px bg-border" />
                    <span
                      className="absolute top-[5px] left-0 h-px bg-gradient-to-r from-[var(--rose-deep)] to-[var(--rose)] transition-all duration-700"
                      style={{ width: `${(activeStage / (timeline.length - 1)) * 100}%` }}
                    />
                    {timeline.map((s, i) => {
                      const done = i < activeStage;
                      const live = i === activeStage;
                      return (
                        <div key={s.label} className="relative z-10 flex flex-1 flex-col items-center gap-2.5">
                          <span
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${
                              live ? "bg-primary pulse-ring" : done ? "bg-primary/80" : "bg-muted"
                            }`}
                          />
                          <span
                            className={`text-center text-[10px] sm:text-[11px] ${
                              live ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {s.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground/70">{s.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              {/* Nearby availability */}
              <Card onClick={() => open("inventory")} delay={90}>
                <CardTitle icon={<Droplet size={15} />} title="Nearby Availability" hint="2.4 km radius" />
                <div className="space-y-4">
                  {bloodStock.map((b) => (
                    <div key={b.group}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="font-medium">{b.group}</span>
                        <span
                          className={
                            b.level === "critical" ? "text-destructive" : "text-muted-foreground"
                          }
                        >
                          {b.units} units
                        </span>
                      </div>
                      <Bar value={(b.units / b.capacity) * 100} />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Map-inspired tracking */}
              <Card className="lg:col-span-2" onClick={() => open("tracking")} delay={140}>
                <CardTitle icon={<Truck size={15} />} title="Live Transport" hint="Courier RK-07" />
                <div className="relative h-[190px] overflow-hidden rounded-xl border border-border bg-[radial-gradient(circle_at_20%_20%,color-mix(in_oklab,var(--rose)_10%,transparent),transparent_60%)]">
                  <div
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--rose) 1px, transparent 1px), linear-gradient(90deg, var(--rose) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 190" fill="none">
                    <path
                      d="M60 140 C 140 130, 150 70, 240 62 S 330 55, 344 52"
                      stroke="var(--rose)"
                      strokeWidth="2"
                      className="route-dash"
                      strokeLinecap="round"
                    />
                    <circle cx="60" cy="140" r="6" fill="var(--rose-deep)" />
                    <circle cx="60" cy="140" r="11" fill="none" stroke="var(--rose-deep)" strokeOpacity="0.5" />
                    <circle cx="240" cy="62" r="4.5" fill="var(--rose-soft)" />
                    <circle cx="344" cy="52" r="6" fill="var(--rose)" />
                    <circle cx="344" cy="52" r="12" fill="none" stroke="var(--rose)" strokeOpacity="0.45" />
                  </svg>
                  <span className="absolute bottom-8 left-6 text-[11px] text-muted-foreground">
                    Sanjeevani Central Bank
                  </span>
                  <span className="absolute top-14 right-6 text-[11px] text-muted-foreground">
                    Meera Memorial Hospital
                  </span>
                  <span className="absolute right-6 bottom-4 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] text-primary">
                    ETA 11:19 · 14 min
                  </span>
                </div>
              </Card>

              {/* Low stock alerts */}
              <Card onClick={() => open("inventory")} delay={190}>
                <CardTitle icon={<AlertTriangle size={15} />} title="Low Stock Alerts" hint="2 active" />
                <div className="space-y-3">
                  {alerts.map((a) => (
                    <div
                      key={a.title}
                      className="rounded-xl border border-destructive/25 bg-destructive/8 px-4 py-3"
                    >
                      <p className="text-xs font-medium text-destructive">{a.title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{a.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Demand trend */}
              <Card onClick={() => open("analytics")} delay={240}>
                <CardTitle icon={<BarChart3 size={15} />} title="Demand Trend" hint="12 weeks" />
                <p className="text-2xl font-semibold text-gradient-rose">+18%</p>
                <p className="mt-1 text-[11px] text-muted-foreground">O− requests vs. previous quarter</p>
                <div className="mt-4">
                  <Sparkline data={demandTrend} />
                </div>
              </Card>

              {/* Recent activity */}
              <Card className="lg:col-span-2" onClick={() => open("match")} delay={290}>
                <CardTitle icon={<Activity size={15} />} title="Recent Activity" hint="Live feed" />
                <ul className="space-y-3.5">
                  {activity.map((a) => (
                    <li key={a.text} className="flex items-center justify-between gap-4 text-xs">
                      <span className="flex items-center gap-3 text-muted-foreground">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span className="text-foreground/90">{a.text}</span>
                      </span>
                      <span className="shrink-0 text-muted-foreground/70">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </main>
        </div>
      </div>

      <Drawer
        open={panel !== null}
        title={panel ? drawerMeta[panel].title : ""}
        subtitle={panel ? drawerMeta[panel].subtitle : undefined}
        onClose={close}
      >
        {panel === "emergency" && <EmergencyForm onSubmit={() => open("match")} />}
        {panel === "match" && <SmartMatch />}
        {panel === "tracking" && <TrackingDetail />}
        {panel === "inventory" && <InventoryList />}
        {panel === "donors" && <DonorList />}
        {panel === "analytics" && <AnalyticsPanel />}
        {panel === "security" && <SecurityPanel />}
      </Drawer>
    </>
  );
}
