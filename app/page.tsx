import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AgeGate } from "@/components/ui/AgeGate";
import { Navigation } from "@/components/navigation/Navigation";
import { HeroScene } from "@/components/hero/HeroScene";
import { ProductScene } from "@/components/product/ProductScene";
import { CloudSelector } from "@/components/categories/CloudSelector";
import { FlavorExperience } from "@/components/flavors/FlavorExperience";
import { ProductStory } from "@/components/product/ProductStory";
import { LifestyleExperience } from "@/components/lifestyle/LifestyleExperience";
import { LocalHub } from "@/components/location/LocalHub";
import { ProductCollection } from "@/components/collection/ProductCollection";
import { FinalCTA } from "@/components/scenes/FinalCTA";
import { Footer } from "@/components/footer/Footer";
import { availableHeroVideo } from "@/lib/server/heroVideo";

export default function Home() {
  const heroVideo = availableHeroVideo();
  return (
    <SmoothScroll>
      <AgeGate />
      <Navigation />
      <main id="main">
        {/* Section 01: Hero Resort Film & Vapor Transition */}
        <HeroScene video={heroVideo} />
        {/* Section 02: More Than A Device */}
        <ProductScene />
        {/* Section 03: Product Worlds (Disposables, Pods, Mods) */}
        <CloudSelector />
        {/* Section 04: Interactive Flavor Experience */}
        <FlavorExperience />
        {/* Section 05: Interactive Product Story (8 Pinned Scroll States) */}
        <ProductStory />
        {/* Section 06: Adult Resort Lifestyle Experience */}
        <LifestyleExperience />
        {/* Section 07: Local Experience (Pueblo, Colorado) */}
        <LocalHub />
        {/* Section 08: Editorial Product Collection */}
        <ProductCollection />
        {/* Section 09: Final Cinematic Scene */}
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
