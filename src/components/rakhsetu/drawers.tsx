import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Droplet,
  Fingerprint,
  KeyRound,
  Lock,
  MapPin,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { Bar, Tag } from "./primitives";
import { Sparkline } from "./Sparkline";
import {
  activeStage,
  demandTrend,
  donors,
  fulfilTrend,
  inventoryRows,
  matches,
  timeline,
} from "./data";

const field =
  "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/60";
const labelCls = "mb-1.5 block text-[11px] font-medium tracking-wide text-muted-foreground";

export function EmergencyForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <label className={labelCls} htmlFor="patient">
          Patient / Case ID
        </label>
        <input id="patient" className={field} defaultValue="RK-2489" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls} htmlFor="group">
            Blood group
          </label>
          <select id="group" className={field} defaultValue="O−">
            {["O−", "O+", "A+", "A−", "B+", "AB−"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="units">
            Units
          </label>
          <input id="units" type="number" min={1} defaultValue={2} className={field} />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="hospital">
          Hospital
        </label>
        <input id="hospital" className={field} defaultValue="Meera Memorial Hospital" />
      </div>
      <div>
        <label className={labelCls}>Urgency</label>
        <div className="flex gap-2">
          {["Routine", "Urgent", "Critical"].map((u, i) => (
            <label
              key={u}
              className="flex-1 cursor-pointer rounded-xl border border-border bg-secondary/30 px-3 py-2 text-center text-xs transition-colors has-[:checked]:border-primary/60 has-[:checked]:bg-primary/12 has-[:checked]:text-primary"
            >
              <input type="radio" name="urgency" defaultChecked={i === 2} className="sr-only" />
              {u}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="notes">
          Clinical note
        </label>
        <textarea
          id="notes"
          rows={3}
          className={field}
          defaultValue="Post-operative bleeding, transfusion required within the hour."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-[var(--rose-deep)] to-[var(--rose)] px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_18px_40px_-18px_var(--rose)]"
      >
        Broadcast Emergency Request
      </button>
    </form>
  );
}

export function SmartMatch() {
  return (
    <div className="space-y-3">
      {matches.map((m) => (
        <div
          key={m.name}
          className="glass glow-hover rounded-2xl p-4"
          style={m.best ? { borderColor: "color-mix(in oklab, var(--rose) 40%, transparent)" } : undefined}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium">{m.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.meta}</p>
            </div>
            {m.best ? (
              <Tag tone="rose">
                <Sparkles size={12} /> Best Match
              </Tag>
            ) : null}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Bar value={m.score} />
            <span className="w-10 shrink-0 text-right text-xs text-primary">{m.score}%</span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock size={12} /> Reachable in {m.eta}
          </p>
        </div>
      ))}
    </div>
  );
}

export function TrackingDetail() {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground">Request #RK-2481 · O− · 2 units</p>
        <p className="mt-2 text-2xl font-semibold text-gradient-rose">ETA 11:19</p>
        <p className="mt-1 text-xs text-muted-foreground">Courier RK-07 · 4.1 km remaining</p>
      </div>
      <ol className="relative space-y-6 pl-6">
        <span className="absolute top-2 bottom-2 left-[5px] w-px bg-border" />
        {timeline.map((s, i) => {
          const done = i < activeStage;
          const live = i === activeStage;
          return (
            <li key={s.label} className="relative">
              <span
                className={`absolute top-1.5 -left-[19px] h-2.5 w-2.5 rounded-full ${
                  live ? "bg-primary pulse-ring" : done ? "bg-primary/70" : "bg-muted"
                }`}
              />
              <p className={`text-sm ${live ? "text-primary" : done ? "" : "text-muted-foreground"}`}>
                {s.label}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.time}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function InventoryList() {
  return (
    <div className="space-y-4">
      {inventoryRows.map((r) => {
        const pct = Math.round((r.units / r.capacity) * 100);
        return (
          <div key={r.group} className="glass rounded-2xl px-4 py-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Droplet size={14} className="text-primary" />
                {r.group}
              </span>
              <span className="text-xs text-muted-foreground">
                {r.units}/{r.capacity} units
              </span>
            </div>
            <div className="mt-3">
              <Bar value={pct} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DonorList() {
  return (
    <div className="space-y-3">
      {donors.map((d) => (
        <div key={d.name} className="glass glow-hover rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                {d.group}
              </span>
              <div>
                <p className="text-sm font-medium">{d.name}</p>
                <p className="text-[11px] text-muted-foreground">Last donation {d.last}</p>
              </div>
            </div>
            <Tag tone={d.status === "On cooldown" ? "muted" : "rose"}>{d.status}</Tag>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[11px] text-muted-foreground">Reliability</span>
            <Bar value={d.score} />
            <span className="w-8 text-right text-xs text-primary">{d.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsPanel() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Requests raised</p>
          <span className="flex items-center gap-1 text-xs text-primary">
            <TrendingUp size={13} /> +18%
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Last 12 weeks</p>
        <div className="mt-3">
          <Sparkline data={demandTrend} />
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Fulfilment rate</p>
          <span className="flex items-center gap-1 text-xs text-primary">94.2%</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Median response 11 min</p>
        <div className="mt-3">
          <Sparkline data={fulfilTrend} stroke="var(--rose-soft)" />
        </div>
      </div>
    </div>
  );
}

export function SecurityPanel() {
  const items = [
    {
      icon: <BadgeCheck size={16} />,
      title: "Donor verification",
      detail: "Aadhaar-linked identity + OTP confirmation on every pledge.",
      tag: "Active",
    },
    {
      icon: <Lock size={16} />,
      title: "Encrypted records",
      detail: "AES-256 at rest, TLS 1.3 in transit across all hospital nodes.",
      tag: "Enforced",
    },
    {
      icon: <KeyRound size={16} />,
      title: "Role-based access",
      detail: "Coordinator, hospital, and bank scopes with audit trails.",
      tag: "4 roles",
    },
    {
      icon: <Fingerprint size={16} />,
      title: "Consent ledger",
      detail: "Every donor share is time-bound and revocable in one tap.",
      tag: "Logged",
    },
  ];
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <div key={i.title} className="glass rounded-2xl p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-primary">{i.icon}</span>
              <div>
                <p className="text-sm font-medium">{i.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.detail}</p>
              </div>
            </div>
            <Tag tone="rose">{i.tag}</Tag>
          </div>
        </div>
      ))}
      <div className="flex flex-wrap gap-2 pt-1">
        {["HIPAA aligned", "ISO 27001", "Zero data resale", "Consent-first"].map((b) => (
          <Tag key={b}>
            <CheckCircle2 size={12} /> {b}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export function MiniLocation() {
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <MapPin size={12} /> Pune Metropolitan Network
    </p>
  );
}

export function VerifiedNote() {
  return (
    <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
      <UserCheck size={12} /> Verified coordinator session
    </p>
  );
}
