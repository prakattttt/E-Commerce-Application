import AboutHero from "../features/about/components/AboutHero";
import AboutStats from "../features/about/components/AboutStats";
import AboutStory from "../features/about/components/AboutStory";
import AboutValues from "../features/about/components/AboutValues";
import AboutTeam from "../features/about/components/AboutTeam";
import AboutCTA from "../features/about/components/AboutCTA";

const About = () => {
  return (
    <main className="bg-background pt-20">
      <div className="mx-auto px-4 sm:px-6 max-w-7xl">
        <AboutHero />
        <AboutStats />
        <AboutStory />
        <AboutValues />
        <AboutTeam />
        <AboutCTA />
      </div>
    </main>
  );
};

export default About;
