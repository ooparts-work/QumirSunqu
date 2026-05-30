import { motion } from 'framer-motion';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

// ── Actualizar con testimonios reales ──────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'El taller de kokedamas fue una experiencia increíble para nuestros colaboradores. Volvimos a conectar con la naturaleza de una manera que no esperábamos.',
    author: 'Coordinadora de RSE',
    org: 'Empresa privada · Lima',
    emoji: '🏢',
  },
  {
    quote: 'Qumir Sunqu transformó la manera en que nuestros vecinos se relacionan con las plantas. Yolanda transmite una pasión genuina que contagia a todos.',
    author: 'Responsable de Programas',
    org: 'Municipalidad de Miraflores',
    emoji: '🏛️',
  },
  {
    quote: 'Los niños llegaron escépticos y salieron con una planta en la mano y ganas de cuidar el planeta. El programa de biohuerto cambió nuestra comunidad escolar.',
    author: 'Directora Académica',
    org: 'Colegio · Lima Sur',
    emoji: '🎓',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-4 py-14" style={{ backgroundColor: 'var(--color-brand-black)' }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent)' }}>
            testimonios
          </span>
          <h2 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#FFFFFF' }}>
            Lo que dicen quienes nos eligieron
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-4 p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderLeft: '3px solid var(--color-brand-accent)' }}
            >
              <span className="text-2xl">{t.emoji}</span>
              <p
                className="font-light leading-relaxed"
                style={{ ...SERIF, fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}
              >
                "{t.quote}"
              </p>
              <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <p className="text-xs font-bold" style={{ color: 'var(--color-brand-accent)' }}>{t.author}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{t.org}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
