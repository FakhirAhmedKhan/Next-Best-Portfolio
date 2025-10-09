
import HeaderSection from "./Header/Header";
import HomeSection from "./Home/home";
import Education from "./Education/Edu";
import SkillsSection from "./Skills/page";
import ProjectSection from "./Projects/pages";
import Footer from "./Footer/footer";

export default function App() {
  return (
    <>
      <HeaderSection />
      <HomeSection />
      <Education  />
      <SkillsSection />
      <ProjectSection />
      <Footer />
    </>
  );
}

// import Link from "next/link";

// export default function HeaderSection() {
//   return (
//     <nav className="flex gap-6 p-4">
//       <Link href="/home">Home</Link>
//       <Link href="/education">Education</Link>
//       <Link href="/skills">Skills</Link>
//       <Link href="/projects">Projects</Link>
//     </nav>
//   );
// }

