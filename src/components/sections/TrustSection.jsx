import { motion } from 'framer-motion';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

const GROUPS = [
  {
    label: 'Municipalidades',
    emoji: '🏛️',
    items: ['Municipalidad de Lima', 'Municipalidad de Miraflores', 'Municipalidad de San Isidro'],
  },
  {
    label: 'Empresas',
    emoji: '🏢',
    items: ['CBI', 'Impala', 'Multitop'],
  },
  {
    label: 'Malls & Centros',
    emoji: '🛍️',
    items: ['Jockey Plaza', 'Plaza San Miguel', 'Boulevard de Asia'],
  },
  {
    label: 'Colegios',
    emoji: '🎓',
    items: ['Colegio Reyna del Mundo', 'Aldea Infantil Westfalia'],
  },
  {
    label: 'Cooperación Internacional',
    emoji: '🌍',
    items: ['OIM – Org. Internacional para las Migraciones', 'Korea Food for the Hungry International'],
  },
];

export default function TrustSection() {
  return (
    <section className="px-4 py-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
            confiaron en nosotros
          </span>
          <h2 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: 'var(--color-brand-black)' }}>
            Instituciones y marcas que nos eligieron
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col gap-3 p-4"
              style={{ backgroundColor: 'var(--color-brand-cream)', borderTop: '3px solid var(--color-brand-accent)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{group.emoji}</span>
                <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: 'var(--color-brand-accent-deep)' }}>
                  {group.label}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {group.items.map((item) => (
                  <li key={item} className="text-xs leading-snug" style={{ color: 'var(--color-brand-black)' }}>
                    · {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
