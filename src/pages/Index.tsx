import HeroSection from "@/components/HeroSection";
import VisitorSection from "@/components/VisitorSection";
import EducationSection from "@/components/EducationSection";
import SkillMatrix from "@/components/SkillMatrix";
import HiddenVault from "@/components/HiddenVault";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <VisitorSection />
      <EducationSection />
      <SkillMatrix />
      <HiddenVault />
      <ContactSection />
    </div>
  );
};

export default Index;
