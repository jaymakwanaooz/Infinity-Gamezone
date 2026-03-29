import Hero from "@/components/Hero";
import GamingZone from "@/components/GamingZone";
import FeaturedGames from "@/components/FeaturedGames";
import PricingSnippet from "@/components/PricingSnippet";

export default function Home() {
  return (
    <main className="min-h-screen bg-gaming-bg flex flex-col">
      <Hero />
      <GamingZone />
      <FeaturedGames />
      <PricingSnippet />
    </main>
  );
}
