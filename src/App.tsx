import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Audience } from "./components/sections/Audience";
import { Curriculum } from "./components/sections/Curriculum";
import { FAQ } from "./components/sections/FAQ";
import { Features } from "./components/sections/Features";
import { FinalCta } from "./components/sections/FinalCta";
import { Hero } from "./components/sections/Hero";
import { Instructor } from "./components/sections/Instructor";
import { ProblemSolution } from "./components/sections/ProblemSolution";
import { Transformation } from "./components/sections/Transformation";
import { TrustMarquee } from "./components/sections/TrustMarquee";
import { HowItWorks, Waitlist } from "./components/sections/Waitlist";
import { ScrollProgress } from "./components/ui/ScrollProgress";

export default function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <ProblemSolution />
        <Audience />
        <Transformation />
        <Features />
        <Curriculum />
        <Instructor />
        <Waitlist />
        <HowItWorks />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
