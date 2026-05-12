import { motion } from "framer-motion";

const educationData = [
  { school: "SD N 12 Bungaraya", status: "Completed", year: "—" },
  { school: "SMP N 1 Bungaraya", status: "Completed", year: "—" },
  { school: "SMA N 1 Bungaraya", status: "Completed", year: "—" },
  { school: "STAI Sulthan Syarif Hasyim Siak", status: "In Progress", year: "Present" },
];

const EducationSection = () => {
  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <h2 className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Education Timeline
        </h2>
        <div className="relative ml-4">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

          {educationData.map((item, index) => (
            <motion.div
              key={item.school}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 pb-10 last:pb-0"
            >
              {/* Node */}
              <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 ${
                item.status === "In Progress"
                  ? "border-primary bg-primary/30 animate-pulse"
                  : "border-accent bg-accent/30"
              }`} />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <h3 className="font-mono-display text-sm text-foreground">{item.school}</h3>
                <span className={`font-mono-display text-[10px] uppercase tracking-[0.2em] ${
                  item.status === "In Progress" ? "text-primary" : "text-muted-foreground"
                }`}>
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
