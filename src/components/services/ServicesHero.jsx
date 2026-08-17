import SectionTag from "../ui/SectionTag";
import { useTextReveal } from "../animations/useTextReveal";

export default function ServicesHero() {
  const titleRef = useTextReveal({ scrollTriggered: false });

  return (
    <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <SectionTag>Servicios</SectionTag>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Título dos tonos */}
          <h1
            ref={titleRef}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95]"
          >
            <span className="text-muted">MI DISEÑO Y</span>
            <br />
            <span className="text-ink">SERVICIOS.</span>
          </h1>

          {/* Descripción */}
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
            Combino diseño, desarrollo y estrategia para crear soluciones
            digitales que generan resultados reales y experiencias que
            conectan con las personas.
          </p>
        </div>
      </div>
    </section>
  );
}
