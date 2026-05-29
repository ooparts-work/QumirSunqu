import { motion } from 'framer-motion';
import logo from '../../assets/qumir-logo.png';
import clientData from '../../data/client.json';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

export default function HeroSection() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6"
      style={{ minHeight: '88svh', backgroundColor: '#FFFFFF' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center gap-5 max-w-xl"
      >
        <img
          src={logo}
          alt={clientData.name}
          style={{ width: '220px', maxWidth: '60vw' }}
          draggable={false}
        />

        <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
          Corazón verde en Quechua
        </span>

        <div className="flex items-center gap-3 w-full max-w-xs">
          <div className="flex-1 h-px" style={{ backgroundColor: '#D8EDD8' }} />
          <span style={{ color: 'var(--color-brand-accent)', fontSize: '14px' }}>🌿</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#D8EDD8' }} />
        </div>

        <p
          className="font-light leading-relaxed tracking-wide"
          style={{ ...SERIF, fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#4A6155', fontStyle: 'italic' }}
        >
          {clientData.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          <motion.button
            whileHover={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
            onClick={() => scrollTo('tienda')}
            className="px-8 py-3 text-[11px] tracking-[0.25em] uppercase font-bold"
            style={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
          >
            Explorar tienda
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'var(--color-brand-black)', color: '#FFFFFF' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
            onClick={() => scrollTo('talleres')}
            className="px-8 py-3 text-[11px] tracking-[0.25em] uppercase font-bold"
            style={{ border: '2px solid var(--color-brand-black)', color: 'var(--color-brand-black)', backgroundColor: 'transparent' }}
          >
            Ver talleres
          </motion.button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
          {clientData.address && (
            <span className="text-[10px] tracking-widest uppercase" style={{ color: '#9A9A9A' }}>
              📍 {clientData.address}
            </span>
          )}
          {clientData.hours && (
            <span className="text-[10px] tracking-widest uppercase" style={{ color: '#9A9A9A' }}>
              🕐 {clientData.hours}
            </span>
          )}
          {clientData.instagram && (
            <a
              href={`https://instagram.com/${clientData.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-widest uppercase"
              style={{ color: '#9A9A9A', textDecoration: 'none' }}
            >
              📸 @{clientData.instagram}
            </a>
          )}
          {clientData.email && (
            <a
              href={`mailto:${clientData.email}`}
              className="text-[10px] tracking-widest"
              style={{ color: '#9A9A9A', textDecoration: 'none' }}
            >
              ✉️ {clientData.email}
            </a>
          )}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ backgroundColor: '#D8EDD8' }} />
    </section>
  );
}
