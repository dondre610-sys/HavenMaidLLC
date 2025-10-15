\
// HavenMaids LLC — One‑page Website (React + Tailwind)
// Uses Tailwind via CDN in index.html for simplicity on GitHub Pages

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

/******************* UI PRIMITIVES *******************/
const cn = (...c) => c.filter(Boolean).join(" ");
const Button = ({ className = "", children, variant, size, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border shadow-sm transition active:scale-[.99]",
      variant === "outline"
        ? "bg-white border-purple-200 text-purple-800 hover:bg-purple-50"
        : variant === "secondary"
        ? "bg-white text-purple-700 border-white/10 hover:bg-purple-50"
        : "bg-gradient-to-r from-[#7B3FB3] to-[#C850C0] text-white border-transparent hover:from-[#6B33A0] hover:to-[#B240AE]",
      size === "lg" ? "px-5 py-3 text-base" : "",
      "rounded-2xl",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
/******************* INLINE ICONS *******************/
const Icon = ({ children, size = 20, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0", className)}>
    {children}
  </svg>
);
const SparklesIcon = (p) => (
  <Icon {...p}><path d="M12 3l1.6 3.8L18 8l-4.4 1.2L12 13l-1.6-3.8L6 8l4.4-1.2L12 3z"/><path d="M5 16l.9 2.1L8 19l-2.1.6L5 22l-.9-2.4L2 19l2.1-.9L5 16z"/></Icon>
);
const BroomIcon = (p) => (<Icon {...p}><path d="M3 21c5-2 9-6 12-12"/><rect x="12" y="5" width="9" height="3" rx="1"/><path d="M15 8v3M18 8v3M21 8v3"/></Icon>);
const GutterIcon = (p) => (<Icon {...p}><path d="M3 6h18v4c0 3-3 6-6 6H9c-3 0-6-3-6-6V6z"/><path d="M8 20c1 .5 2 .5 3 0m2 0c1 .5 2 .5 3 0"/></Icon>);
const FloorIcon = (p) => (<Icon {...p}><rect x="3" y="6" width="18" height="12" rx="1"/><path d="M9 6v12M15 6v12M3 12h18"/></Icon>);
const TrashIcon = (p) => (<Icon {...p}><path d="M4 7h16"/><path d="M9 7V5h6v2"/><rect x="6" y="7" width="12" height="13" rx="2"/><path d="M10 11v6M14 11v6"/></Icon>);
const PaintIcon = (p) => (<Icon {...p}><rect x="3" y="4" width="14" height="8" rx="2"/><path d="M17 8h3"/><rect x="8" y="14" width="5" height="6" rx="1"/></Icon>);
const PressureIcon = (p) => (<Icon {...p}><path d="M3 15h8l3-6h4"/><circle cx="18" cy="9" r="1"/><path d="M18 9c2 0 3 1 3 3"/></Icon>);

/******************* LOGO: URL OR FALLBACK *******************/
function useLogoSrc(logoUrlProp) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    const envSrc = typeof window !== "undefined" && window.__HAVENMAIDS_LOGO_URL ? window.__HAVENMAIDS_LOGO_URL : null;
    setSrc(logoUrlProp || envSrc || null);
  }, [logoUrlProp]);
  return [src, setSrc];
}
const FallbackMonogram = ({ size = 40, className = "" }) => (
  <div
    className={cn(
      "inline-grid place-items-center rounded-2xl overflow-hidden",
      "bg-gradient-to-br from-[#7B3FB3] to-[#C850C0] text-white",
      "shadow-sm border border-purple-200",
      className
    )}
    style={{ width: size, height: size }}
  >
    <span className="font-extrabold" style={{ letterSpacing: 0.5 }}>HM</span>
  </div>
);
const LogoMark = ({ size = 40, className = "", logoUrl }) => {
  const [src, setSrc] = useLogoSrc(logoUrl);
  if (!src) return <FallbackMonogram size={size} className={className} />;
  return (
    <div className={cn("relative inline-grid place-items-center rounded-2xl bg-white/90 border border-purple-200 shadow-sm overflow-hidden", className)} style={{ width: size, height: size }}>
      <img
        src={src}
        alt="HavenMaids logo"
        className="h-full w-full object-contain"
        style={{ filter: "saturate(1.08) contrast(1.06) brightness(1.03)" }}
        onError={() => setSrc(null)}
      />
    </div>
  );
};
const LogoShowcase = ({ logoUrl }) => {
  const [src, setSrc] = useLogoSrc(logoUrl);
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-[#C850C0]/30 via-[#7B3FB3]/20 to-transparent blur-2xl" aria-hidden />
      <div className="relative rounded-[28px] bg-white border border-purple-200 shadow-xl overflow-hidden">
        <div className="bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,rgba(243,235,249,1)_45%,rgba(236,225,247,1)_100%)]">
          {src ? (
            <img
              src={src}
              alt="HavenMaids professional logo"
              className="w-full h-full max-w-[22rem] mx-auto p-4 object-contain"
              style={{ filter: "saturate(1.05) contrast(1.05)" }}
              onError={() => setSrc(null)}
            />
          ) : (
            <div className="w-full max-w-[22rem] mx-auto p-10">
              <FallbackMonogram size={160} className="rounded-[28px] w-full h-[10rem] grid place-items-center" />
            </div>
          )}
        </div>
        <div className="border-t border-purple-100 bg-purple-50/60 px-4 py-2 text-center text-xs text-purple-600">HavenMaids LLC • Residential & Commercial Cleaning</div>
      </div>
    </div>
  );
};

/******************* DATA *******************/
const services = [
  { icon: SparklesIcon, title: "Deep Cleaning", description: "Top-to-bottom detail: kitchens, baths, baseboards, vents, and high-touch surfaces." },
  { icon: BroomIcon, title: "Maid Services", description: "Recurring weekly, bi-weekly, or monthly maintenance cleans." },
  { icon: GutterIcon, title: "Gutter Cleaning", description: "Remove debris and restore flow to protect roof and foundation." },
  { icon: FloorIcon, title: "Floor Waxing", description: "Strip, seal, and high-gloss finishes for resilient floors." },
  { icon: TrashIcon, title: "Junk Removal", description: "Fast haul-away for garage, move-out, renovation, and office cleanouts." },
  { icon: PaintIcon, title: "Painting", description: "Interior/exterior touch-ups and refreshes with durable finishes." },
  { icon: PressureIcon, title: "Pressure Washing", description: "Driveways, siding, and patios restored to like-new curb appeal." },
];

/******************* PAGE *******************/
export default function HavenMaidsSite({ logoUrl }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const resolvedLogoUrl = useMemo(() => logoUrl || (typeof window !== "undefined" ? window.__HAVENMAIDS_LOGO_URL : null) || null, [logoUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E7D5F7]/60 via-white to-[#E7D5F7]/40 text-[#1E1E1E]">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-purple-200">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold text-[#1E1E1E]">
            <LogoMark size={40} logoUrl={resolvedLogoUrl} />
            <span>HavenMaids LLC</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="hover:text-[#C850C0]">Services</a>
            <a href="#about" className="hover:text-[#C850C0]">About</a>
            <a href="#contact" className="hover:text-[#C850C0]">Contact</a>
          </nav>
          <a href="#contact" className="hidden sm:block"><Button className="rounded-2xl">Get a Quote</Button></a>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#7B3FB3]">Premium Cleaning & Property Care</h1>
            <p className="mt-5 text-lg text-[#1E1E1E]/80 max-w-xl">HavenMaids LLC delivers professional deep cleaning, maid services, gutter cleaning, floor waxing, junk removal, painting, and pressure washing for residential and commercial clients.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact"><Button size="lg" className="rounded-2xl"><SparklesIcon size={18}/> Request Free Estimate</Button></a>
              <a href="#services"><Button size="lg" variant="outline" className="rounded-2xl"><BroomIcon size={18}/> View Services</Button></a>
            </div>
          </div>
          <div>
            <div className="flex justify-center"><LogoShowcase logoUrl={resolvedLogoUrl} /></div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#7B3FB3]">Comprehensive Services</h2>
            <p className="mt-3 text-[#1E1E1E]/80 max-w-2xl mx-auto">Flexible one‑time projects and reliable recurring schedules tailored to your property’s needs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="border rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 grid place-items-center rounded-xl bg-[#E7D5F7] text-[#7B3FB3]">
                    <s.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1E1E1E]">{s.title}</h3>
                    <p className="text-sm text-[#1E1E1E]/70 mt-1">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-[#E7D5F7]/30">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border bg-white p-5 text-center"><p className="text-2xl font-bold text-[#7B3FB3]">98%</p><p className="text-sm text-[#1E1E1E]/70">Customer satisfaction</p></div>
          <div className="rounded-2xl border bg-white p-5 text-center"><p className="text-2xl font-bold text-[#7B3FB3]">24–48h</p><p className="text-sm text-[#1E1E1E]/70">Typical scheduling window</p></div>
          <div className="rounded-2xl border bg-white p-5 text-center"><p className="text-2xl font-bold text-[#7B3FB3]">Bonded</p><p className="text-sm text-[#1E1E1E]/70">Insured & background‑checked</p></div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-[#E7D5F7]/40">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-[#7B3FB3]">Request a Free Quote</h2>
            <p className="mt-3 text-[#1E1E1E]/80">Tell us about your property and preferred timing. We’ll respond with a tailored estimate.</p>
          </div>
          {/* demo-only submission */}
          {submitted ? (
            <div className="text-center py-10"><p className="text-lg font-semibold text-[#7B3FB3]">Thank you! We received your request and will reach out soon.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 bg-white rounded-3xl p-8 shadow">
              <input className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50" name="name" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} required />
              <input className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50" type="email" name="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} required />
              <input className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50" name="phone" placeholder="Phone" value={form.phone} onChange={e=>setForm(f=>({...f, phone:e.target.value}))} />
              <textarea className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-vertical" name="message" placeholder="Tell us what you need cleaned..." rows={4} value={form.message} onChange={e=>setForm(f=>({...f, message:e.target.value}))} />
              <Button type="submit" className="rounded-2xl"><SparklesIcon size={18}/> Submit</Button>
            </form>
          )}
        </div>
      </section>

      <footer className="border-t bg-white py-10 text-center text-[#1E1E1E]/70">
        <div className="mx-auto mb-3">
          {/* navbar mark reused here */}
          <LogoMark size={48} logoUrl={resolvedLogoUrl} />
        </div>
        <p>© {new Date().getFullYear()} HavenMaids LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
