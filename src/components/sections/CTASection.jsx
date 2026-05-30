import { motion } from 'framer-motion';
import clientData from '../../data/client.json';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

const CONTACT_TYPES = [
  { label: 'Empresa', emoji: '🏢', msg: 'Hola, soy de una empresa y me interesa un programa de educación ambiental / taller corporativo para nuestro equipo.' },
  { label: 'Colegio', emoji: '🎓', msg: 'Hola, represento a un colegio y nos interesa implementar talleres ambientales / un biohuerto escolar.' },
  { label: 'Municipalidad', emoji: '🏛️', msg: 'Hola, soy de una municipalidad y me interesa coordinar talleres ambientales para la comunidad.' },
  { label: 'Particular', emoji: '🌿', msg: 'Hola! Quisiera información sobre sus talleres y productos. ¿Cuándo tienen disponibilidad?' },
];

export default function CTASection() {
  const buildWa = (msg) =>
    `https://wa.me/${clientData.whatsapp}?text=${encodeURIComponent(msg + '\n\n¡Muchas gracias! 🌿')}`;

  return (
    <section className="px-4 py-16" style={{ backgroundColor: 'var(--color-brand-cream)' }}>
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
            trabajemos juntos
          </span>
          <h2 className="font-normal" style={{ ...SERIF, fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--color-brand-black)' }}>
            Sembremos juntos un futuro sostenible
          </h2>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: '#4A6155' }}>
            Diseñamos experiencias a medida para empresas, colegios, municipalidades y comunidades.
            Cuéntanos tu proyecto y lo hacemos realidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
          {CONTACT_TYPES.map((c, i) => (
            <motion.a
              key={c.label}
              href={buildWa(c.msg)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-2 p-5 text-center"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-brand-accent)',
                textDecoration: 'none',
              }}
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: 'var(--color-brand-black)' }}>
                {c.label}
              </span>
            </motion.a>
          ))}
        </div>

        <p className="text-xs" style={{ color: '#4A6155' }}>
          Selecciona tu perfil y te redirigiremos a WhatsApp con un mensaje listo para enviar.
        </p>

      </div>
    </section>
  );
}
