import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center border-b border-border">
      <div className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Systems & Interfaces
          </p>
          <h1 className="font-mono-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] mb-8">
            Tri<br />Atmoko
          </h1>
          <div className="max-w-xl">
            <p className="font-mono-display text-sm uppercase tracking-[0.15em] text-primary mb-4">
              Full-Stack Developer
            </p>
            <p className="font-body text-muted-foreground text-base">
              Full-stack developer focused on building robust backends and high-fidelity frontends. 
              Engineering end-to-end systems with precision and purpose.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
