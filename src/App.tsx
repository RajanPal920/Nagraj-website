import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Locations } from './components/Locations';
import { ContactBand } from './components/ContactBand';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <ProductGrid />
        <WhyChooseUs />
        <Locations />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}

export default App;
