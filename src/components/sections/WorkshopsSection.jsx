import { motion } from 'framer-motion';
import clientData from '../../data/client.json';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

const WORKSHOPS = [
  { emoji: '🌿', name: 'Doctora Plantita', desc: 'Cuidado integral de plantas de interior, suculentas y huerto.' },
  { emoji: '🌱', name: 'Kokedamas', desc: 'Arte japonés de plantas en bolas de musgo. Te llevas tu creación.' },
  { emoji: '🐟', name: 'Terrarios', desc: 'Mini jardines en frascos y peceras de vidrio. Para niños y adultos.' },
  { emoji: '🪲', name: 'Plantas Carnívoras', desc: 'Conoce y adopta una Venus atrapamoscas. Fascinante y educativo.' },
  { emoji: '🥬', name: 'Huerto en Casa', desc: 'Siembra, cultiva y cosecha tus propias hortalizas paso a paso.' },
  { emoji: '🎨', name: 'Pinta tu Maceta', desc: 'Creatividad + naturaleza. Decora tu maceta y llévate una planta.' },
  { emoji: '🌾', name: 'Mister Grass', desc: 'Muñeco de nylon que germina. Observa crecer la vida en casa.' },
  { emoji: '📸', name: 'Cianotipia', desc: 'Arte fotográfico con plantas y luz solar. Técnica única y mágica.' },
  { emoji: '🌸', name: 'Perfumes Naturales', desc: 'Crea tu propio perfume con plantas aromáticas. 100% natural.' },
  { emoji: '🧼', name: 'Jabones con Plantas', desc: 'Jabones de glicerina con hierbas y esencias naturales.' },
  { emoji: '🦋', name: 'Mariposario Escolar', desc: 'Programa de 4 meses para criar y liberar mariposas nativas.' },
  { emoji: '🖼️', name: 'Cuadros Vivos', desc: 'Marcos de madera con suculentas vivas. Obra de arte que crece.' },
];

export default function WorkshopsSection() {
  const waUrl = `https://wa.me/${clientData.whatsapp}?text=${encodeURIComponent(
    '¡Hola, Qumir Sunqu! 👋\n\nMe interesa conocer más sobre sus talleres y programas para mi empresa / colegio / comunidad.\n\n¿Podemos coordinar? ¡Gracias! 🌿'
  )}`;

  return (
    <section id="talleres" style={{ backgroundColor: 'var(--color-brand-cream)' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">

        <div className="flex flex-col items-center gap-2 mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
            nuestros servicios
          </span>
          <h2 className="font-normal text-center" style={{ ...SERIF, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--color-brand-black)' }}>
            Talleres Verdes
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="h-px w-12" style={{ backgroundColor: '#C8D8C8' }} />
            <span style={{ color: 'var(--color-brand-accent)', fontSize: '12px' }}>🌿</span>
            <div className="h-px w-12" style={{ backgroundColor: '#C8D8C8' }} />
          </div>
          <p className="text-sm text-center mt-2 max-w-lg leading-relaxed" style={{ color: '#4A6155' }}>
            Más de 7 años llevando educación ambiental vivencial a escuelas, comunidades y empresas.
            Cada taller es una experiencia única donde los participantes aprenden haciendo.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
          {WORKSHOPS.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col gap-2 p-4 bg-white"
              style={{ border: '1px solid #D8EDD8' }}
            >
              <span className="text-2xl">{w.emoji}</span>
              <span className="font-bold text-xs leading-tight" style={{ color: 'var(--color-brand-black)' }}>
                {w.name}
              </span>
              <p className="text-[11px] leading-relaxed" style={{ color: '#4A6155' }}>{w.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Corporate CTA */}
        <div
          className="flex flex-col items-center gap-4 p-8 text-center"
          style={{ backgroundColor: 'var(--color-brand-black)' }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent)' }}>
            programas corporativos
          </span>
          <h3 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#FFFFFF' }}>
            ¿Buscas un programa para tu empresa o colegio?
          </h3>
          <p className="text-sm max-w-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Diseñamos talleres y programas de educación ambiental a medida, alineados con los ODS,
            para empresas, municipalidades, colegios y ONGs.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 font-black text-xs tracking-widest uppercase transition-opacity hover:opacity-85"
            style={{ backgroundColor: 'var(--color-brand-accent)', color: '#FFFFFF' }}
          >
            💬 Solicitar información
          </a>
        </div>

      </div>
    </section>
  );
}
