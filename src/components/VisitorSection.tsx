import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Monitor, MapPin, Globe, Users } from "lucide-react";

interface Visitor {
  id: string;
  ip_address: string;
  device_name: string;
  location: string;
  visited_at: string;
}

const censorIP = (ip: string) => {
  if (!ip || ip === "Unknown") return "•••.•••.•••.•••";
  const parts = ip.split(".");
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.***.***`;
  }
  return ip.slice(0, Math.ceil(ip.length / 2)) + "•".repeat(ip.length - Math.ceil(ip.length / 2));
};

const getDeviceName = () => {
  const ua = navigator.userAgent;
  if (/iPhone/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  if (/Android/.test(ua)) {
    const match = ua.match(/Android.*;\s*(.*?)\s*Build/);
    return match ? match[1] : "Android Device";
  }
  if (/Macintosh/.test(ua)) return "MacOS";
  if (/Windows/.test(ua)) return "Windows PC";
  if (/Linux/.test(ua)) return "Linux PC";
  return "Unknown Device";
};

const VisitorSection = () => {
  const [viewCount, setViewCount] = useState(2058);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      const [counterRes, visitorsRes] = await Promise.all([
        supabase.from("view_counter").select("count").limit(1).single(),
        supabase.from("visitors").select("*").order("visited_at", { ascending: false }).limit(10),
      ]);

      if (counterRes.data) setViewCount(counterRes.data.count);
      if (visitorsRes.data) setVisitors(visitorsRes.data as Visitor[]);
    };

    fetchData();

    // Subscribe to real-time changes
    const counterChannel = supabase
      .channel("view_counter_changes")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "view_counter" }, (payload) => {
        setViewCount((payload.new as any).count);
      })
      .subscribe();

    const visitorsChannel = supabase
      .channel("visitors_changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "visitors" }, (payload) => {
        setVisitors((prev) => [(payload.new as Visitor), ...prev].slice(0, 10));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(counterChannel);
      supabase.removeChannel(visitorsChannel);
    };
  }, []);

  useEffect(() => {
    if (hasTracked) return;

    const trackVisit = async () => {
      // Check if already tracked this session
      if (sessionStorage.getItem("visited")) return;

      const device_name = getDeviceName();
      let ip_address = "Unknown";
      let location = "Unknown";

      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        ip_address = data.ip || "Unknown";
        location = [data.city, data.region, data.country_name].filter(Boolean).join(", ") || "Unknown";
      } catch {
        // Fallback if API fails
      }

      try {
        await supabase.functions.invoke("track-visitor", {
          body: { ip_address, device_name, location },
        });
        sessionStorage.setItem("visited", "true");
        setHasTracked(true);
      } catch {
        // Silent fail
      }
    };

    trackVisit();
  }, [hasTracked]);

  const timeAgo = (date: string) => {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <section className="py-20 border-b border-border">
      <div className="container">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Welcome
          </h2>
          <div className="border border-border rounded-lg p-6 bg-card">
            <p className="font-body text-foreground text-base mb-2">
              👋 Selamat datang di portofolio saya!
            </p>
            <p className="font-body text-muted-foreground text-sm">
              Terima kasih telah mengunjungi website ini. Setiap kunjungan Anda tercatat secara real-time.
            </p>
          </div>
        </motion.div>

        {/* View Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="border border-border rounded-lg p-6 bg-card flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-mono-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Total Views
              </p>
              <p className="font-mono-display text-3xl text-foreground tabular-nums">
                {viewCount.toLocaleString()}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono-display text-[10px] uppercase text-accent">Live</span>
            </div>
          </div>
        </motion.div>

        {/* Visitor History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-mono-display text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Riwayat Kunjungan Terbaru
            </h3>
          </div>

          <div className="space-y-2">
            {visitors.length === 0 && (
              <p className="font-body text-sm text-muted-foreground py-4">Belum ada data kunjungan.</p>
            )}
            {visitors.map((visitor, index) => (
              <motion.div
                key={visitor.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border border-border rounded-lg px-4 py-3 bg-card/50 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-mono-display text-xs text-foreground truncate">
                    {censorIP(visitor.ip_address)}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <Monitor className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-mono-display text-xs text-muted-foreground truncate">
                    {visitor.device_name}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-destructive shrink-0" />
                  <span className="font-mono-display text-xs text-muted-foreground truncate">
                    {visitor.location}
                  </span>
                </div>
                <span className="font-mono-display text-[10px] text-muted-foreground/60 sm:ml-auto shrink-0">
                  {timeAgo(visitor.visited_at)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisitorSection;
