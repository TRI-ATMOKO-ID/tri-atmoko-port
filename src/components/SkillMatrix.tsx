import { motion } from "framer-motion";

const skills = [
  { name: "Python", level: 1.0 },
  { name: "HTML", level: 1.0 },
  { name: "Javascript", level: 0.9 },
  { name: "ReactJS", level: 0.8 },
  { name: "CSS", level: 0.8 },
  { name: "C++", level: 0.75 },
  { name: "Laravel", level: 0.68 },
  { name: "C#", level: 0.5 },
];

const SkillItem = ({ name, level, index }: { name: string; level: number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="flex justify-between items-end py-3 border-b border-border/50 font-mono-display"
  >
    <span className="text-muted-foreground uppercase text-xs tracking-[0.2em]">{name}</span>
    <div className="flex items-baseline gap-2">
      <span className={`text-xl font-medium tabular-nums ${
        level >= 1.0 ? "text-accent" : "text-foreground"
      }`}>
        {level.toFixed(2)}
      </span>
      <span className="text-[10px] text-muted-foreground/50">Lvl</span>
    </div>
  </motion.div>
);

const SkillMatrix = () => {
  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <h2 className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Skill Matrix — Technical Audit
        </h2>
        <div className="max-w-lg">
          {skills.map((skill, i) => (
            <SkillItem key={skill.name} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
