import SEO from './components/layout/SEO.jsx';
import Navbar from './components/layout/Navbar.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import AboutSection from './components/sections/AboutSection.jsx';
import WorkshopsSection from './components/sections/WorkshopsSection.jsx';
import PopularSection from './components/sections/PopularSection.jsx';
import MenuSection from './components/sections/MenuSection.jsx';
import CartDrawer from './components/ui/CartDrawer.jsx';
import ProductModal from './components/ui/ProductModal.jsx';
import clientData from './data/client.json';

// ── V2: nuevas secciones del mapeo-web ───────────────────────────────────────
// Para volver a la versión anterior: comenta las 3 líneas de import y el bloque
// marcado con "V2" en el <main> de abajo. Nada más cambia.
import TrustSection from './components/sections/TrustSection.jsx';
import TestimonialsSection from './components/sections/TestimonialsSection.jsx';
import CTASection from './components/sections/CTASection.jsx';
// ─────────────────────────────────────────────────────────────────────────────

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF', color: 'var(--color-brand-black)', overflowX: 'clip' }}>
      <SEO />
      <Navbar />
      <CartDrawer />
      <ProductModal />
      <main>
        <HeroSection />

        {/* ── V2 START ── */}
        <TrustSection />
        {/* ── V2 END ── */}

        <AboutSection />
        <WorkshopsSection />
        <PopularSection />
        <MenuSection />

        {/* ── V2 START ── */}
        <TestimonialsSection />
        <CTASection />
        {/* ── V2 END ── */}

      </main>
      <footer
        className="flex flex-col items-center justify-center gap-2 py-10"
        style={{ backgroundColor: 'var(--color-brand-black)' }}
      >
        <span
          className="font-light tracking-widest"
          style={{ ...SERIF, fontSize: '1.4rem', color: '#FFFFFF', letterSpacing: '0.1em' }}
        >
          {clientData.name}
        </span>
        <span className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'var(--color-brand-accent)', ...SERIF, fontStyle: 'italic' }}>
          Corazón verde en Quechua
        </span>
        {clientData.instagram && (
          <a
            href={`https://instagram.com/${clientData.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] tracking-[0.25em] uppercase"
            style={{ color: 'var(--color-brand-muted)', fontStyle: 'italic', ...SERIF, textDecoration: 'none' }}
          >
            @{clientData.instagram}
          </a>
        )}
        {clientData.email && (
          <a
            href={`mailto:${clientData.email}`}
            className="text-[9px] tracking-[0.25em]"
            style={{ color: 'var(--color-brand-muted)', textDecoration: 'none' }}
          >
            {clientData.email}
          </a>
        )}
        <div className="flex items-center gap-3 mt-3">
          <div className="h-px w-10" style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-accent) 40%, transparent)' }} />
          <span className="text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
            © {new Date().getFullYear()} · {clientData.address}
          </span>
          <div className="h-px w-10" style={{ backgroundColor: 'color-mix(in srgb, var(--color-brand-accent) 40%, transparent)' }} />
        </div>
      </footer>
    </div>
  );
}
