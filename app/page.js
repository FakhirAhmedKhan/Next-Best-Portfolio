import HeaderSection from "./Header/Header";
import HomeSection from "./Home/home";
import Education from "./Education/Edu";
import SkillsSection from "./Skills/page";
import ProjectSection from "./Projects/pages";
import Footer from "./Footer/page";

export default function App() {
  return (
    <>
      <HeaderSection />
      <HomeSection />
      <Education />
      <SkillsSection />
      <ProjectSection />
      <Footer />
    </>
  );
}
