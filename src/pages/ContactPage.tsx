import { Header } from '../components/Header';
import { ContactBand } from '../components/ContactBand';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Spacer for fixed header */}
      <div className="h-20 bg-brand-green" />
      <Header />
      <main className="flex-1">
        <ContactBand />
      </main>
      <Footer />
    </div>
  );
}
