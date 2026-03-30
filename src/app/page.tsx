import Hero from "@/components/Hero";
import GamingZone from "@/components/GamingZone";
import FeaturedGames from "@/components/FeaturedGames";
import PricingSnippet from "@/components/PricingSnippet";
import IntroScreen from "@/components/IntroScreen";

export default function Home() {
  return (
    <>
      <IntroScreen />
      <main className="min-h-screen bg-gaming-bg flex flex-col">
        <Hero />
        <GamingZone />
        <FeaturedGames />
        <PricingSnippet />
      </main>
    </>
  );
}
