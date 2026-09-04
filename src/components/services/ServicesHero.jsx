import SectionTag from "../ui/SectionTag";
import { useTextReveal } from "../animations/useTextReveal";
import { useTranslate } from "../../context/LanguageContext";
import { strings } from "../../i18n/strings";

export default function ServicesHero() {
  const titleRef = useTextReveal({ scrollTriggered: false });
  const t = useTranslate();

  return (
    <section className="px-6 pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <SectionTag>{t(strings.nav.services)}</SectionTag>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          {/* Título dos tonos */}
          <h1
            ref={titleRef}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95]"
          >
            <span className="text-muted">{t(strings.services.heroTitleLine1)}</span>
            <br />
            <span className="text-ink">{t(strings.services.heroTitleLine2)}</span>
          </h1>

          {/* Descripción */}
          <p className="text-muted text-base md:text-lg leading-relaxed max-w-md lg:ml-auto">
            {t(strings.services.heroDescription)}
          </p>
        </div>
      </div>
    </section>
  );
}
