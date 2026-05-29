import { motion } from 'framer-motion';

const SERIF = { fontFamily: '"Cormorant Garamond", serif' };

const STATS = [
  { value: '7+', label: 'Años de experiencia' },
  { value: '2000+', label: 'Estudiantes impactados' },
  { value: '20+', label: 'Biohuertos escolares' },
  { value: '10+', label: 'Empresas con programas' },
];

const ACHIEVEMENTS = [
  '🏆 Líder por el Cambio Climático 2024 · Municipalidad de Lima',
  '🌟 Finalista Protagonistas del Cambio 2025',
  '🌍 Seleccionada en "Lima, Mujeres por el Clima"',
  '🤝 Colaboración con OIM y organismos internacionales',
];

export default function AboutSection() {
  return (
    <section id="nosotros" style={{ backgroundColor: '#FFFFFF' }}>

      {/* Stats bar */}
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ backgroundColor: 'var(--color-brand-black)' }}
      >
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <span
              className="font-black leading-none"
              style={{ ...SERIF, fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--color-brand-accent)' }}
            >
              {s.value}
            </span>
            <span className="text-[11px] tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-14">

        {/* Who we are */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
            quiénes somos
          </span>
          <h2 className="font-normal leading-tight" style={{ ...SERIF, fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: 'var(--color-brand-black)' }}>
            Sembramos conciencia ambiental
          </h2>
          <p className="leading-relaxed text-base" style={{ color: '#4A6155' }}>
            Somos <strong>Qumir Sunqu</strong> —<em>Corazón verde en Quechua</em>— un emprendimiento de educación
            ambiental y botánica que transforma la manera de aprender sobre sostenibilidad. Trabajamos con niños,
            jóvenes, comunidades y empresas para sembrar conciencia ambiental a través de experiencias vivenciales
            y participativas.
          </p>
          <p className="leading-relaxed text-base" style={{ color: '#4A6155' }}>
            Creemos que la educación ambiental no es un lujo, es una necesidad. Por eso llevamos talleres, biohuertos
            y programas de sostenibilidad a escuelas, municipalidades, ONGs y empresas privadas.
          </p>
        </motion.div>

        {/* Yolanda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-4 p-6"
          style={{ backgroundColor: 'var(--color-brand-cream)', borderLeft: '4px solid var(--color-brand-accent)' }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-brand-accent-deep)' }}>
            fundadora
          </span>
          <h3 className="font-normal" style={{ ...SERIF, fontSize: '1.8rem', color: 'var(--color-brand-black)' }}>
            Yolanda Loayza
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: '#4A6155' }}>
            Agrónoma (UNALM) en proceso · CEO y fundadora de Qumir Sunqu · Microinfluencer ambiental
            <strong> @yolacorazonverde</strong> (casi 5k corazones verdes) · Diplomada en Desarrollo Sostenible y
            Responsabilidad Social · Especialista en crianza de lepidópteros.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            {ACHIEVEMENTS.map((a) => (
              <p key={a} className="text-sm" style={{ color: 'var(--color-brand-black)' }}>{a}</p>
            ))}
          </div>
        </motion.div>

        {/* Mission / Vision / Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            {
              label: 'Propósito',
              icon: '🌱',
              text: 'Educar con emoción para formar corazones verdes que protejan la biodiversidad y construyan comunidades sostenibles.',
            },
            {
              label: 'Misión',
              icon: '🎯',
              text: 'Formar agentes de cambio mediante talleres educativos, biohuertos y programas sostenibles, integrando ciencia, juego e innovación.',
            },
            {
              label: 'Visión',
              icon: '🌍',
              text: 'Ser referente en educación ambiental sostenible en Latinoamérica, conectando escuelas, comunidades y empresas.',
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-3 p-5" style={{ border: '1px solid var(--color-brand-cream)' }}>
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: 'var(--color-brand-accent-deep)' }}>
                {item.label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: '#4A6155' }}>{item.text}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
