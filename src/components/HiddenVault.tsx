import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const HiddenVault = () => {
  return (
    <section className="border-b border-border py-20">
      <div className="container">
        <h2 className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Portfolio & CV
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-lg border border-border bg-card/50 backdrop-blur-xl p-12 text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <Lock className="w-8 h-8 text-muted-foreground animate-pulse" />
            <p className="font-mono-display text-sm uppercase tracking-[0.2em] text-foreground">
              Encrypted Data / Access Denied
            </p>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              Portfolio and CV are currently under internal review. Check back soon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HiddenVault;
