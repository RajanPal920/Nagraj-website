import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ProductGrid } from '../components/ProductGrid';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Locations } from '../components/Locations';
import { ContactBand } from '../components/ContactBand';

export function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <ProductGrid />
      <WhyChooseUs />
      <Locations />
      <ContactBand />
    </main>
  );
}
