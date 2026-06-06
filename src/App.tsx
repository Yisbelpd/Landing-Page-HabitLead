import { useState, useEffect, FormEvent } from "react";
import { 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Menu, 
  X, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  CheckCircle2, 
  Zap, 
  HelpCircle,
  Clock,
  TrendingUp,
  ShieldAlert,
  Award,
  Check
} from "lucide-react";
import { PILLARS_DATA, TESTIMONIALS_DATA, FAQS_DATA } from "./data";
import DynamicPlanner from "./components/DynamicPlanner";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  // Registration Form state
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [userRole, setUserRole] = useState("Director / Manager");

  // Connection App state
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const [connectingState, setConnectingState] = useState<"idle" | "connecting" | "success">("idle");
  const [connectionEmail, setConnectionEmail] = useState("");

  // Premium Tier simulated state
  const [selectedPlan, setSelectedPlan] = useState<"free" | "premium">("premium");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from locale state on mount (just to keep track)
  useEffect(() => {
    const saved = localStorage.getItem("habitlead_beta_registered");
    if (saved) {
      setIsRegistered(true);
      setRegisteredEmail(saved);
    }
  }, []);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsRegistered(true);
    setRegisteredEmail(email);
    localStorage.setItem("habitlead_beta_registered", email);
    triggerToast("¡Bienvenido/a! Hemos reservado tu lugar exclusivo en la Beta.");
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // Helper component to render proper lucide icons
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Compass":
        return <Compass className={className} id="icon-compass" />;
      case "Sparkles":
        return <Sparkles className={className} id="icon-sparkles" />;
      case "ShieldCheck":
        return <ShieldCheck className={className} id="icon-shield" />;
      case "Heart":
        return <Heart className={className} id="icon-heart" />;
      default:
        return <Compass className={className} id="icon-default" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-malva-light selection:text-malva-dark relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-stone-100 text-xs sm:text-sm px-4 py-3 rounded-xl shadow-lg border border-stone-800 flex items-center gap-2 max-w-sm animate-bounce">
          <Sparkles className="h-4 w-4 text-malva shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Elegant minimalist Navigation */}
      <nav id="navbar" className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-100/80 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <span className="h-8 w-8 rounded-lg bg-malva flex items-center justify-center text-white font-display font-medium text-lg shadow-sm group-hover:bg-malva-dark transition-colors duration-300">
              H
            </span>
            <span className="font-display font-bold text-lg md:text-xl text-brand-dark tracking-tight">
              Habit<span className="text-malva font-medium">Lead</span>
            </span>
          </a>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <a href="#metodo" className="hover:text-brand-dark transition-colors">Metodología</a>
            <a href="#pilares" className="hover:text-brand-dark transition-colors">Pilares</a>
            <a href="#simulador" className="hover:text-brand-dark transition-colors">Generador de Plan</a>
            <a href="#tarifas" className="hover:text-brand-dark transition-colors">Planes</a>
            <a href="#faq" className="hover:text-brand-dark transition-colors">Dudas</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#beta" 
              className="text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-brand-dark transition-colors px-3 py-2"
            >
              Iniciar Sesión
            </a>
            <a 
              href="#beta" 
              className="bg-malva text-white text-xs font-semibold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-malva-dark transition-all duration-300 shadow-sm shadow-malva/10 cursor-pointer"
            >
              Unirte a la Beta
            </a>
          </div>

          {/* Mobile menu trigger button */}
          <button 
            type="button"
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-600 hover:text-brand-dark focus:outline-none p-1.5"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div id="mobile-menu-panel" className="absolute top-full left-0 w-full bg-white border-b border-stone-200 py-6 px-6 space-y-4 md:hidden shadow-lg animate-fadeIn">
            <div className="flex flex-col gap-3 font-display font-medium text-sm text-stone-600">
              <a 
                href="#metodo" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-dark py-1.5 transition-colors"
              >
                Metodología
              </a>
              <a 
                href="#pilares" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-dark py-1.5 transition-colors"
              >
                Pilares
              </a>
              <a 
                href="#simulador" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-dark py-1.5 transition-colors"
              >
                Generador de Plan
              </a>
              <a 
                href="#tarifas" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-dark py-1.5 transition-colors"
              >
                Planes
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-dark py-1.5 transition-colors"
              >
                Dudas
              </a>
            </div>
            
            <div className="h-px bg-stone-100 my-4"></div>

            <div className="flex flex-col gap-2.5">
              <a 
                href="#beta" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center border border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs py-2.5 rounded-lg hover:bg-stone-50"
              >
                Iniciar Sesión
              </a>
              <a 
                href="#beta" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-malva text-white font-semibold uppercase tracking-wider text-xs py-2.5 rounded-lg hover:bg-malva-dark"
              >
                Unirse a la Beta
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header id="hero" className="relative pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-36 bg-gradient-to-b from-stone-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-1.5 bg-malva-light hover:bg-malva/20 text-malva-dark rounded-full px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase transition-colors duration-300">
            <Sparkles className="h-3 w-3 shrink-0" />
            <span>BIENESTAR + PRODUCTIVIDAD CONSCIENTE</span>
          </div>

          {/* Big Editorial Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight text-brand-dark leading-[1.08] max-w-4xl mx-auto mb-6">
            Lleva el registro de tus <br className="hidden sm:inline" /> hábitos saludables diariamente y eleva tu <span className="text-malva font-medium italic underline decoration-stone-200 decoration-wavy underline-offset-8">liderazgo integral</span>.
          </h1>

          {/* Strategic Short Subtitle */}
          <p className="text-stone-500 font-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Haz un seguimiento limpio de tus metas de bienestar físico o descanso, con la flexibilidad de acceder a <strong>planes de acompañamiento especializado</strong>.
          </p>

          {/* Conversions CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
            <a 
              href="#beta" 
              className="w-full sm:w-auto bg-brand-dark hover:bg-stone-800 text-white font-semibold uppercase tracking-wider text-xs px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
            >
              Unirte Gratis
            </a>
            <a 
              href="#simulador" 
              className="w-full sm:w-auto bg-malva-light hover:bg-malva/25 text-malva-dark font-semibold uppercase tracking-wider text-xs px-8 py-4 rounded-full transition-all duration-300 text-center"
            >
              Simular mi Plan
            </a>
          </div>

          {/* Trust indicators & Social Proof */}
          <div className="pt-6 border-t border-stone-100/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-left">
            <div className="flex -space-x-2.5">
              <span className="w-8 h-8 rounded-full border-2 border-white bg-stone-300 text-[10px] flex items-center justify-center font-bold text-stone-700">A</span>
              <span className="w-8 h-8 rounded-full border-2 border-white bg-malva text-[10px] flex items-center justify-center font-bold text-white">M</span>
              <span className="w-8 h-8 rounded-full border-2 border-white bg-stone-800 text-[10px] flex items-center justify-center font-bold text-white">J</span>
              <span className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 text-[10px] flex items-center justify-center font-bold text-stone-500">L</span>
            </div>
            <div className="text-xs text-stone-500">
              <div className="flex items-center gap-1.5 text-stone-800 font-semibold mb-0.5">
                <div className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>4.9 / 5 estrellas</span>
              </div>
              <p>Recomendado por directivos de tecnología y startups sostenibles.</p>
            </div>
          </div>

        </div>

        {/* Minimal mockup display / Hero visualizer decoration */}
        <div className="max-w-5xl mx-auto px-6 sm:px-8 mt-12 md:mt-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-28 bottom-0"></div>
          <div className="bg-stone-50/50 rounded-2xl p-3 border border-stone-200/60 shadow-lg inline-block w-full overflow-hidden">
            <div className="bg-white rounded-xl border border-stone-100 px-4 py-8 shadow-inner flex flex-col sm:flex-row items-center justify-around gap-6">
              
              {/* Dynamic Metric 1 */}
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                  Tu energía diaria
                </span>
                <div className="flex items-baseline justify-center sm:justify-start gap-1">
                  <span className="text-2xl font-bold font-display text-brand-dark">94%</span>
                  <span className="text-emerald-600 text-xs font-semibold">+18% vs mes anterior</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Presión reducida tras el ritual analógico.</p>
              </div>

              {/* Minimal Divider */}
              <div className="hidden sm:block h-10 w-px bg-stone-200"></div>

              {/* Dynamic Metric 2 */}
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                  Tiempo estratégico
                </span>
                <div className="flex items-baseline justify-center sm:justify-start gap-1">
                  <span className="text-2xl font-bold font-display text-brand-dark">4.5h</span>
                  <span className="text-emerald-600 text-xs font-semibold">Semanal preservado</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Sincronizado de forma limpia en tu agenda.</p>
              </div>

              {/* Minimal Divider */}
              <div className="hidden sm:block h-10 w-px bg-stone-200"></div>

              {/* Dynamic Metric 3 */}
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-1">
                  Enfoque Personal
                </span>
                <div className="flex items-baseline justify-center sm:justify-start gap-1">
                  <span className="text-2xl font-bold font-display text-brand-dark">Claridad</span>
                  <span className="text-malva text-xs font-semibold">Mente en Calma</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Establecido por el hábito de respiración consciente.</p>
              </div>

            </div>
          </div>
        </div>

      </header>

      {/* SECCIÓN "CÓMO FUNCIONA" / LA SIMBIOSIS DE HÁBITOS */}
      <section id="metodo" className="py-20 md:py-28 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-malva bg-malva-light px-3 py-1 rounded-full">
                La Metodología
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark">
                El poder de la <span className="text-malva font-medium">Simbiosis</span>: Tu salud lidera.
              </h2>
              <p className="text-stone-500 font-sans text-sm sm:text-base leading-relaxed">
                A diferencia de los gestores tradicionales de hábitos que aíslan las facetas de tu vida, HabitLead actúa bajo un principio de interconexión científica: **tus hábitos de salud son el combustible directo de tu comportamiento ejecutivo**.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-malva/10 text-malva flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-brand-dark">Menor reactividad amigdalina</h4>
                    <p className="text-xs text-stone-400">Pausas conscientes que calman la respuesta de huida, permitiendo feedback constructivo y asertivo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-malva/10 text-malva flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-brand-dark">Enfoque libre de fatiga</h4>
                    <p className="text-xs text-stone-400">Micro-intervalos de desconexión corporal que oxigenan tu lóbulo frontal para proyectos estratégicos complejos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-malva/10 text-malva flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-brand-dark">Confianza multiplicada</h4>
                    <p className="text-xs text-stone-400">El ritual de autorregulación optimiza tu descanso y eleva la claridad de tus decisiones individuales ante la incertidumbre.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aesthetic diagram representation of the symbiotic loop */}
            <div className="lg:col-span-6 bg-stone-50 rounded-3xl border border-stone-100 p-6 md:p-8 space-y-6">
              <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-stone-400 mb-2">
                Ciclo de Impacto HabitLead
              </h3>

              {/* Loop Step 1 */}
              <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex items-start gap-4">
                <span className="text-2xl mt-1">🧠</span>
                <div>
                  <span className="text-[9px] uppercase font-mono text-malva font-bold">FASE 1: INTEGRIDAD CORPORAL</span>
                  <h4 className="font-display font-semibold text-sm text-stone-800">10 Minutos de Meditación Matutina</h4>
                  <p className="text-xs text-stone-500">Regula tu pulso y disminuye la hormona del estrés antes de abrir tu primer correo de trabajo.</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center -my-3">
                <div className="h-8 w-0.5 bg-dashed bg-stone-300"></div>
              </div>

              {/* Loop Step 2 */}
              <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex items-start gap-4">
                <span className="text-2xl mt-1">🎯</span>
                <div>
                  <span className="text-[9px] uppercase font-mono text-stone-600 font-bold">FASE 2: ALTA CONCENTRACIÓN</span>
                  <h4 className="font-display font-semibold text-sm text-stone-800">Bloqueo Estratégico de Agenda (45m)</h4>
                  <p className="text-xs text-stone-500">Gracias al silencio inicial, procesas tus retos tácticos con nitidez absoluta y máxima velocidad mental.</p>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center -my-3">
                <div className="h-8 w-0.5 bg-dashed bg-stone-300"></div>
              </div>

              {/* Loop Step 3 */}
              <div className="bg-white rounded-2xl border border-stone-200/60 p-4 shadow-sm flex items-start gap-4">
                <span className="text-2xl mt-1">💎</span>
                <div>
                  <span className="text-[9px] uppercase font-mono text-emerald-600 font-bold">FASE 3: LIDERAZGO PERSONAL</span>
                  <h4 className="font-display font-semibold text-sm text-stone-800">Límites Claros y Asertividad</h4>
                  <p className="text-xs text-stone-500">Dado que estás óptimamente regulado/a, decides mejor y actúas con total coherencia y sosiego.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECCIÓN "PILARES" */}
      <section id="pilares" className="py-20 md:py-28 bg-[#FAF9FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-malva mb-2 block">
              Eje de Transformación
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark mb-4">
              Pilares diseñados para líderes de hoy
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              Consolida rutinas saludables sin añadir rigidez ni culpas a tu agenda. Descubre el enfoque humanizado y científico de HabitLead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PILLARS_DATA.map((pillar) => (
              <div 
                key={pillar.id}
                id={`pillar-card-${pillar.id}`}
                className="bg-white rounded-2xl border border-stone-200/60 p-6 md:p-8 space-y-5 shadow-sm hover:shadow-md hover:border-malva/20 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="h-11 w-11 rounded-lg bg-malva/10 text-malva group-hover:bg-malva group-hover:text-white flex items-center justify-center transition-colors duration-300">
                  {renderIcon(pillar.iconName, "h-5 w-5")}
                </div>
                <h3 className="font-display font-semibold text-stone-800 text-base md:text-lg group-hover:text-brand-dark leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          {/* Sutil connection button */}
          <div className="mt-16 text-center animate-fadeIn">
            <button
              onClick={() => {
                setConnectionModalOpen(true);
                if (registeredEmail) {
                  setConnectingState("connecting");
                  setTimeout(() => {
                    setConnectingState("success");
                    triggerToast("Conectado con éxito a tu panel individual de HabitLead");
                  }, 1500);
                } else {
                  setConnectingState("idle");
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3 bg-white border border-stone-200 hover:border-malva/40 text-stone-600 hover:text-brand-dark rounded-full text-xs uppercase tracking-widest font-sans font-light transition-all duration-300 hover:shadow-sm cursor-pointer"
            >
              <Compass className="h-3.5 w-3.5 text-malva" />
              <span>Conectar a la app HabitLead</span>
              <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-malva" />
            </button>
          </div>

        </div>
      </section>

      {/* DYNAMIC PLAN SIMULATOR */}
      <section id="simulador" className="py-20 md:py-28 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <DynamicPlanner />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonios" className="py-20 md:py-28 bg-[#FAF9FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-malva mb-2 block">
              Comunidad Consciente
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark mb-4">
              La perspectiva de otros líderes
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              Profesionales e innovadores de todos los sectores que han integrado HabitLead para equilibrar su rendimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((test) => (
              <div 
                key={test.id}
                id={`test-card-${test.id}`}
                className="bg-white rounded-2xl border border-stone-100 p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div>
                  {/* Testimonial Quote */}
                  <div className="flex text-amber-500 gap-1 mb-4">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed italic">
                    "{test.quote}"
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="h-10 w-10 rounded-full bg-malva/10 font-bold uppercase tracking-wider text-xs text-valma flex items-center justify-center text-malva shrink-0">
                    {test.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-brand-dark leading-none">
                      {test.author}
                    </h4>
                    <span className="text-[10px] sm:text-xs text-stone-400 focus:outline-none">
                      {test.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section id="tarifas" className="py-20 md:py-28 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-malva mb-2 block">
              Inversión Transparente
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark mb-4">
              Un plan diseñado para cada etapa
            </h2>
            <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
              Toma el timón de tus rutinas con absoluta transparencia. Sin costes imprevistos ni renovaciones engorrosas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Plan Free */}
            <div 
              onClick={() => setSelectedPlan("free")}
              className={`bg-white rounded-3xl border p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative ${
                selectedPlan === "free"
                  ? "border-stone-400 ring-2 ring-stone-900/5 shadow-md scale-[1.01]"
                  : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-400 block mb-2">
                  Plan Esencial
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl sm:text-4xl font-bold font-display text-brand-dark">$0</span>
                  <span className="text-xs text-stone-400 font-mono">/ para siempre</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-6">
                  Perfecto para profesionales autónomos que desean experimentar de forma introductoria con sus dos primeros rituales consolidados.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-600 mb-8 border-t border-stone-100 pt-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Límite de 2 hábitos simultáneos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Constructor de planes integrado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Sincronización manual de recordatorios</span>
                  </li>
                  <li className="text-stone-400 line-through flex items-center gap-2">
                    <span>Acceso completo a biblioteca Premium</span>
                  </li>
                </ul>
              </div>

              <a
                href="#beta"
                className={`w-full text-center py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedPlan === "free"
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Comenzar gratis
              </a>
            </div>

            {/* Plan Premium */}
            <div 
              onClick={() => setSelectedPlan("premium")}
              className={`bg-white rounded-3xl border p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative ${
                selectedPlan === "premium"
                  ? "border-malva ring-2 ring-malva/10 shadow-lg scale-[1.01]"
                  : "border-stone-200 hover:border-stone-300 text-stone-600"
              }`}
            >
              {/* Most Popular Label Badge */}
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-malva text-white text-[9px] font-bold uppercase tracking-widest rounded-full px-3 py-1">
                RECOMENDADO
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-malva block mb-2">
                  Liderazgo Premium
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl sm:text-4xl font-bold font-display text-brand-dark">$9</span>
                  <span className="text-xs text-stone-400 font-mono">/ mes (pago anual)</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-6">
                  Para profesionales y creadores independientes enfocados en consolidar su rutina HabitLead a nivel profundo con métricas integrales avanzadas.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-600 mb-8 border-t border-stone-100 pt-6">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-medium text-stone-800">Hábitos e integraciones ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Biblioteca completa de microhábitos de salud</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Feedback de consistencia flexible (no rígido)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-malva font-semibold">Sincronización nativa (Calendar/Outlook)</span>
                  </li>
                </ul>
              </div>

              <a
                href="#beta"
                className={`w-full text-center py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedPlan === "premium"
                    ? "bg-malva text-white hover:bg-malva-dark"
                    : "bg-stone-105 text-stone-700 hover:bg-stone-200"
                }`}
              >
                Suscribirse ahora
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* CONVERSION TERMINAL "LISTA DE PRIORIDAD" (CTA FINAL) */}
      <section id="beta" className="py-20 md:py-28 bg-[#FAF9FA]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          
          <div className="bg-white rounded-3xl border border-stone-100 p-8 md:p-14 shadow-sm space-y-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-malva bg-malva-light px-3 py-1 rounded-full inline-block">
              Acceso Anticipado Limitado
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark max-w-lg mx-auto">
              Comienza a construir tu liderazgo integral
            </h2>
            <p className="text-stone-500 font-sans text-xs sm:text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Únete a la beta hoy mismo para iniciar tu diario inteligente de hábitos diarios con un solo toque y accede de forma opcional a planes de acompañamiento con consultores presenciales o remotos en el momento que consideres necesario.
            </p>

            <AnimatePresence mode="wait">
              {!isRegistered ? (
                <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <label htmlFor="beta-email-input" className="sr-only">Correo Electrónico</label>
                      <input
                        type="email"
                        id="beta-email-input"
                        required
                        placeholder="Ingresa tu correo profesional (ej. ana@empresa.com)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 text-xs sm:text-sm border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-malva transition-colors focus:ring-1 focus:ring-malva"
                      />
                    </div>
                    <button
                      type="submit"
                      id="submit-register-btn"
                      className="bg-brand-dark hover:bg-stone-800 text-white font-semibold uppercase tracking-wider text-[11px] px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                      Reservar Mi Lugar
                    </button>
                  </div>

                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] text-stone-400 flex items-center gap-1.5 ">
                      🔒 Datos encriptados localmente en navegador • Cancelas cuando quieras
                    </span>
                  </div>
                </form>
              ) : (
                <div id="success-register" className="max-w-md mx-auto bg-emerald-50/80 border border-emerald-100/70 rounded-2xl p-6 text-center space-y-3 font-sans">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">
                    ¡Plaza reservada con éxito!
                  </h4>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Hemos enviado tu enlace prioritario al correo <strong>{registeredEmail}</strong>. Eres el miembro número <strong className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">#149</strong> en la lista selecta de HabitLead.
                  </p>
                  <button
                    onClick={() => {
                      setIsRegistered(false);
                      setEmail("");
                    }}
                    className="text-[10px] text-stone-400 underline hover:text-stone-500 cursor-pointer block mx-auto pt-1"
                  >
                    Registrar otro correo
                  </button>
                </div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 md:py-28 bg-white max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-malva mb-2 block">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark">
            Despeja tus dudas sobre HabitLead
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS_DATA.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id}
                className="border-b border-stone-200/80 py-4 font-sans text-left"
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center focus:outline-none text-stone-800 hover:text-brand-dark font-medium text-sm sm:text-base cursor-pointer py-1"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-stone-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isOpen && (
                  <div className="pt-2 pb-1 pr-6 text-xs sm:text-sm text-stone-500 leading-relaxed w-full">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sutil connection button after FAQ */}
        <div className="mt-16 text-center border-t border-stone-100/70 pt-10 animate-fadeIn">
          <p className="text-stone-400 text-xs font-light mb-4">¿Listo para conectar tu diario individual de hábitos?</p>
          <button
            onClick={() => {
              setConnectionModalOpen(true);
              if (registeredEmail) {
                setConnectingState("connecting");
                setTimeout(() => {
                  setConnectingState("success");
                  triggerToast("Conectado con éxito a tu panel individual de HabitLead");
                }, 1500);
              } else {
                setConnectingState("idle");
              }
            }}
            className="inline-flex items-center gap-2.5 px-8 py-3 bg-white border border-stone-200 hover:border-malva/40 text-stone-600 hover:text-brand-dark rounded-full text-xs uppercase tracking-widest font-sans font-light transition-all duration-300 hover:shadow-sm cursor-pointer"
          >
            <Compass className="h-3.5 w-3.5 text-malva" />
            <span>Conectar a la app HabitLead</span>
            <ArrowRight className="h-3.5 w-3.5 text-stone-300 group-hover:text-malva" />
          </button>
        </div>
      </section>

      {/* METRIC HIGHLIGHT / TRUST BAR */}
      <section className="bg-stone-50 border-t border-b border-stone-100 py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-2xl md:text-3xl font-bold font-display text-brand-dark block">2,410</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Líderes activos</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold font-display text-brand-dark block">98.4%</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Tasa de retención de agenda</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold font-display text-brand-dark block">12k+</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Micro-bloques optimizados</span>
          </div>
          <div>
            <span className="text-2xl md:text-3xl font-bold font-display text-brand-dark block">40% Less</span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">Desgaste o burnout auto-reportado</span>
          </div>
        </div>
      </section>

      {/* SPACIOUS MINIMALIST FOOTER */}
      <footer className="bg-white pt-16 pb-12 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start gap-10">
          
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="h-8 w-8 rounded-lg bg-malva flex items-center justify-center text-white font-display font-medium text-lg">
                H
              </span>
              <span className="font-display font-bold text-lg text-brand-dark tracking-tight">
                Habit<span className="text-malva font-medium">Lead</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Fusión simbiótica de bienestar consciente y maestría corporativa. Creamos tecnología humana y libre de fricciones invasivas.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">Producto</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-500">
                <li><a href="#metodo" className="hover:text-malva transition-colors">Características</a></li>
                <li><a href="#simulador" className="hover:text-malva transition-colors">Simulador</a></li>
                <li><a href="#tarifas" className="hover:text-malva transition-colors">Planes de Acceso</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">Compañía</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-500">
                <li><a href="#" className="hover:text-malva transition-colors">Nosotros</a></li>
                <li><a href="#" className="hover:text-malva transition-colors">Metodología</a></li>
                <li><a href="#" className="hover:text-malva transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">Legal</h5>
              <ul className="space-y-2 text-xs sm:text-sm text-stone-500">
                <li><a href="#" className="hover:text-malva transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-malva transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-malva transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Clean copyright section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8 mt-12 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} HabitLead. Todos los derechos reservados. Hecho con simplicidad y propósito.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-600 transition-colors">Twitter</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-600 transition-colors">LinkedIn</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-600 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* CONNECTION TO THE APP MODAL */}
      <AnimatePresence>
        {connectionModalOpen && (
          <div className="fixed inset-0 bg-stone-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-stone-200/80 p-6 md:p-8 w-full max-w-md shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setConnectionModalOpen(false)}
                className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Content */}
              {connectingState === "idle" && (
                <div className="space-y-6 text-center pt-2">
                  <div className="h-12 w-12 bg-malva/10 text-malva rounded-full flex items-center justify-center mx-auto">
                    <Compass className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold tracking-tight text-brand-dark">
                      Accede a la app HabitLead
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                      Conecta tus datos de progreso local o sincroniza tu diario de bienestar individual con nuestro panel seguro.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!connectionEmail) return;
                      setConnectingState("connecting");
                      // Sincroniza
                      setTimeout(() => {
                        setConnectingState("success");
                        setRegisteredEmail(connectionEmail);
                        setIsRegistered(true);
                        localStorage.setItem("habitlead_beta_registered", connectionEmail);
                        triggerToast("¡Sincronización de hábitos exitosa!");
                      }, 2000);
                    }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label htmlFor="modal-email" className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold mb-1.5 block">
                        Ingresa tu correo individual
                      </label>
                      <input
                        type="email"
                        id="modal-email"
                        required
                        placeholder="ejemplo@correo.com"
                        value={connectionEmail}
                        onChange={(e) => setConnectionEmail(e.target.value)}
                        className="w-full bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 text-xs sm:text-sm border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-malva transition-colors focus:ring-1 focus:ring-malva"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-dark hover:bg-stone-900 text-white font-semibold uppercase tracking-wider text-[11px] py-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Establecer Conexión</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    
                    <p className="text-[10px] text-stone-400 text-center">
                      🔒 Encriptación RSA-2048 • Tus hábitos son puramente personales.
                    </p>
                  </form>
                </div>
              )}

              {connectingState === "connecting" && (
                <div className="py-10 text-center space-y-6">
                  <div className="relative h-14 w-14 mx-auto flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full border-2 border-stone-100"></span>
                    <span className="absolute inset-0 rounded-full border-2 border-t-malva animate-spin"></span>
                    <Compass className="h-5 w-5 text-malva animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-sm font-semibold text-brand-dark">
                      Sincronizando con el servidor HabitLead...
                    </h3>
                    <p className="text-stone-400 text-[11px] font-mono">
                      Cargando túnel individual e histórico del diario
                    </p>
                  </div>
                </div>
              )}

              {connectingState === "success" && (
                <div className="space-y-6 pt-2">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-5 w-5" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-display text-lg font-bold text-stone-800">
                      ¡App Conectada!
                    </h3>
                    <p className="text-stone-400 text-xs font-mono">
                      Usuario: <span className="text-stone-600 font-sans font-medium">{connectionEmail || registeredEmail || "usuario@habitlead.com"}</span>
                    </p>
                  </div>

                  {/* MINI INTERACTIVE HABIT TRACKER PANEL / WORKSPACE */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-200/50 p-4 space-y-3.5">
                    <div className="flex justify-between items-center pb-2 border-b border-stone-200/40">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-semibold">Tus Hábitos del Día</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono px-2 py-0.5 rounded">En línea</span>
                    </div>

                    <div className="space-y-2.5">
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-stone-100 hover:border-stone-200/80 transition-all cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-stone-300 text-malva focus:ring-malva" />
                        <span className="text-xs text-stone-700 font-light">Dormir 7.5h+ (Descanso Profundo)</span>
                      </label>
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-stone-100 hover:border-stone-200/80 transition-all cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-stone-300 text-malva focus:ring-malva" />
                        <span className="text-xs text-stone-700 font-light">10 min Meditación de Claridad</span>
                      </label>
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-stone-100 hover:border-stone-200/80 transition-all cursor-pointer">
                        <input type="checkbox" className="rounded border-stone-300 text-malva focus:ring-malva" />
                        <span className="text-xs text-stone-500 font-light">20 min Mañana Analógica (Cero pantallas)</span>
                      </label>
                      <label className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-stone-100 hover:border-stone-200/80 transition-all cursor-pointer">
                        <input type="checkbox" className="rounded border-stone-300 text-malva focus:ring-malva" />
                        <span className="text-xs text-stone-500 font-light">Respiración Coherente (3m ante tensión)</span>
                      </label>
                    </div>

                    <div className="text-center font-mono pt-1">
                      <p className="text-[10px] text-stone-400">Constancia actual: <span className="text-malva font-semibold">86% esta semana</span></p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setConnectionModalOpen(false)}
                      className="flex-1 bg-stone-150 hover:bg-stone-200 text-stone-700 font-semibold uppercase tracking-wider text-[10px] py-3 rounded-xl transition-all cursor-pointer text-center"
                    >
                      Ir al Panel Completo
                    </button>
                    <button
                      onClick={() => {
                        setConnectionEmail("");
                        setConnectingState("idle");
                        setRegisteredEmail("");
                        setIsRegistered(false);
                        localStorage.removeItem("habitlead_beta_registered");
                        triggerToast("Sesión cerrada");
                      }}
                      className="px-4 border border-stone-200 hover:bg-stone-50 text-stone-400 hover:text-stone-600 rounded-xl transition-colors cursor-pointer text-xs"
                      title="Cerrar sesión"
                    >
                      Desconectar
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
