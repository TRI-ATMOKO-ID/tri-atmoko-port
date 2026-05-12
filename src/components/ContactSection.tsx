import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <footer className="py-20">
      <div className="container">
        <h2 className="font-mono-display text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12">
          Contact
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.a
            href="mailto:ekosetiawan30169@gmail.com"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hover-outline flex items-center gap-3 border border-border px-6 py-4 rounded-lg font-mono-display text-sm text-foreground transition-colors hover:border-primary/50"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground text-xs">ekosetiawan30169@gmail.com</span>
          </motion.a>

          <motion.a
            href="https://wa.me/62895404773962"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hover-outline flex items-center gap-3 border border-border px-6 py-4 rounded-lg font-mono-display text-sm text-foreground transition-colors hover:border-accent/50"
          >
            <MessageCircle className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground text-xs">+62 895 4047 73962</span>
          </motion.a>
        </div>

        <p className="font-mono-display text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] mt-16">
          © 2026 Tri Atmoko — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default ContactSection;
