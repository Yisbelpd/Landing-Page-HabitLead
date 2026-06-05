import { useState, useId, FormEvent } from "react";
import { LEADERSHIP_AREAS } from "../data";
import { LeadershipArea } from "../types";
import { Check, ArrowRight, Download, Mail, Sliders, Sparkles, Clock, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function DynamicPlanner() {
  const formNameId = useId();
  const [selectedAreaId, setSelectedAreaId] = useState<string>("foco");
  const [userName, setUserName] = useState<string>("");
  const [customDays, setCustomDays] = useState<number>(21);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isEmailed, setIsEmailed] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  const currentArea = LEADERSHIP_AREAS.find(a => a.id === selectedAreaId) || LEADERSHIP_AREAS[0];

  const handleAreaChange = (id: string) => {
    setSelectedAreaId(id);
    if (isGenerated) {
      // Allow seamless real-time adaptation
      setIsSaved(false);
      setIsEmailed(false);
    }
  };

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
    setIsSaved(false);
    setIsEmailed(false);
  };

  const saveToLocal = () => {
    setIsSaved(true);
    const planSummary = {
      user: userName || "Líder Consciente",
      area: currentArea.title,
      healthyHabit: currentArea.recommendedHealthyHabit.title,
      leadershipHabit: currentArea.recommendedLeadershipHabit.title,
      days: customDays,
      generatedAt: new Date().toLocaleDateString()
    };
    localStorage.setItem("habitlead_saved_plan", JSON.stringify(planSummary));
  };

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsEmailed(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs tracking-wider uppercase text-malva font-semibold mb-2 block">
          Simulador Científico
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-brand-dark mb-4">
          Consola de Hábitos y Acompañamiento
        </h3>
        <p className="text-stone-500 text-sm md:text-base">
          Selecciona tu área prioritaria de bienestar y simula cómo tu registro diario se potencia con soporte profesional mediante nuestros planes de acompañamiento opcional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Selector panel */}
        <div className="lg:col-span-5 space-y-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block">
            1. Área de Foco
          </label>
          <div className="grid grid-cols-2 gap-3">
            {LEADERSHIP_AREAS.map((area) => {
              const isActive = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  onClick={() => handleAreaChange(area.id)}
                  type="button"
                  id={`area-btn-${area.id}`}
                  className={`p-4 rounded-xl text-left border transition-all duration-300 ${
                    isActive
                      ? "border-malva bg-malva-light text-brand-dark ring-2 ring-malva/10"
                      : "border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200 text-stone-600"
                  }`}
                >
                  <span className="text-xl mb-2 block">{area.emoji}</span>
                  <p className="font-display font-medium text-xs md:text-sm tracking-tight leading-snug">
                    {area.title}
                  </p>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 pt-2">
            <div>
              <label htmlFor={formNameId} className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 block">
                2. Tu Nombre o Iniciales
              </label>
              <input
                type="text"
                id={formNameId}
                placeholder="Ej. Sofía Ruiz"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-stone-800 text-sm border border-stone-200/80 rounded-xl px-4 py-3 outline-none focus:border-malva transition-colors focus:ring-1 focus:ring-malva"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  3. Duración Inicial
                </label>
                <span className="text-xs font-mono font-medium text-malva bg-malva-light px-2 py-0.5 rounded-full">
                  {customDays} días
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                step="7"
                value={customDays}
                onChange={(e) => setCustomDays(Number(e.target.value))}
                className="w-full accent-malva cursor-pointer"
              />
              <span className="text-[10px] text-stone-400 block mt-1">
                La neurociencia estima que consolidar hábitos toma un promedio de 21 a 66 días.
              </span>
            </div>

            <button
              type="submit"
              id="generate-plan-btn"
              className="w-full bg-brand-dark hover:bg-stone-800 text-white font-medium text-sm rounded-xl py-3 px-4 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Sparkles className="h-4 w-4 text-malva-light" />
              <span>Generar Plan Personalizado</span>
            </button>
          </form>
        </div>

        {/* Results / Explanation panel */}
        <div className="lg:col-span-7 flex flex-col h-full bg-stone-50 rounded-2xl border border-stone-100 p-5 md:p-8 min-h-[420px]">
          <AnimatePresence mode="wait">
            {!isGenerated ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center text-center my-auto px-4 py-8"
              >
                <div className="h-14 w-14 rounded-full bg-malva-light flex items-center justify-center text-malva mb-5">
                  <Sliders className="h-6 w-6" />
                </div>
                <h4 className="font-display font-medium text-stone-700 text-lg mb-2">
                  Esperando tus parámetros...
                </h4>
                <p className="text-stone-400 text-xs sm:text-sm max-w-sm">
                  Personaliza los datos de la izquierda y haz clic en "Generar Plan" para ver tu fusión de hábitos de bienestar y liderazgo.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between space-y-6"
              >
                {/* Ritual Prescription Card Header */}
                <div className="border-b border-stone-200/80 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-malva font-semibold">
                        PLAN DE REGISTRO INTEGRAL
                      </span>
                      <h4 className="font-display text-xl font-semibold tracking-tight text-brand-dark">
                        {currentArea.title}
                      </h4>
                    </div>
                    <span className="text-2xl">{currentArea.emoji}</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-2 font-mono flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" /> Diseñado para: <span className="font-sans font-medium text-stone-700">{userName || "Usuario HabitLead"}</span> • Formato: Plan Individual de Bienestar
                  </p>
                </div>

                {/* Core Habits Symbiosis */}
                <div className="space-y-4 py-2">
                  <p className="text-xs text-stone-500 italic pb-1">
                    "{currentArea.description}"
                  </p>

                  {/* Habit A: Personal Well-being */}
                  <div className="bg-white rounded-xl border border-stone-200/70 p-4 space-y-2 hover:shadow-sm transition-all animate-fadeIn">
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-malva bg-malva-light px-2 py-0.5 rounded-full">
                        REGISTRO DE HÁBITO SALUDABLE DIARIO
                      </span>
                      <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {currentArea.recommendedHealthyHabit.duration}
                      </span>
                    </div>
                    <h5 className="font-semibold text-sm text-stone-800 font-display">
                      {currentArea.recommendedHealthyHabit.title}
                    </h5>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {currentArea.recommendedHealthyHabit.description}
                    </p>
                  </div>

                  {/* Symbiosis Bridge / Connection */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-px bg-stone-300 flex-1"></div>
                    <span className="text-[10px] font-mono tracking-wider text-stone-400 uppercase font-semibold">
                      sincronizado opcionalmente con
                    </span>
                    <div className="h-px bg-stone-300 flex-1"></div>
                  </div>

                  {/* Habit B: Leadership sprint */}
                  <div className="bg-white rounded-xl border border-stone-200/70 p-4 space-y-2 hover:shadow-sm transition-all animate-fadeIn">
                    <div className="flex items-center gap-2 justify-between">
                      <span className="text-[10px] font-mono tracking-wider font-semibold text-brand-dark bg-stone-100 px-2 py-0.5 rounded-full">
                        PROGRAMA DE ACOMPAÑAMIENTO RECOMENDADO
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {currentArea.recommendedLeadershipHabit.actionBlock}
                      </span>
                    </div>
                    <h5 className="font-semibold text-sm text-stone-800 font-display">
                      {currentArea.recommendedLeadershipHabit.title}
                    </h5>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {currentArea.recommendedLeadershipHabit.description}
                    </p>
                  </div>
                </div>

                {/* Micro-insights section */}
                <div className="bg-malva-light/40 border border-malva/10 rounded-xl p-3.5">
                  <p className="text-[11px] text-malva-dark leading-relaxed">
                    🌟 <strong>Por qué esta combinación funciona:</strong> Al establecer un límite matutino de desconexión corporal ({currentArea.recommendedHealthyHabit.duration}), liberas la capacidad de retención de memoria ejecutiva que tu lóbulo frontal necesita para tu sesión estratégica sin interferencias externas.
                  </p>
                </div>

                {/* Action panel */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={saveToLocal}
                    disabled={isSaved}
                    className={`flex-1 font-medium text-xs rounded-xl py-2.5 px-4 border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSaved
                        ? "bg-stone-200 border-stone-300 text-stone-500 cursor-default"
                        : "bg-white border-stone-200 hover:bg-stone-100 text-stone-700 hover:border-stone-300"
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Guardado en Navegador</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5 text-stone-500" />
                        <span>Guardar Receta Local</span>
                      </>
                    )}
                  </button>

                  <div className="flex-1 flex gap-2">
                    {!isEmailed ? (
                      <form onSubmit={handleSendEmail} className="flex w-full gap-2">
                        <label htmlFor="planner-email-input" className="sr-only">Correo Electrónico</label>
                        <input
                          type="email"
                          id="planner-email-input"
                          required
                          placeholder="Tu correo"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="flex-1 min-w-0 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-malva focus:border-malva outline-none"
                        />
                        <button
                          type="submit"
                          className="bg-malva hover:bg-malva-dark text-white rounded-xl py-1.5 px-3 text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Mail className="h-3 w-3" />
                          <span>Enviar</span>
                        </button>
                      </form>
                    ) : (
                      <div className="flex-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5">
                        <Check className="h-3.5 w-3.5" />
                        <span>¡Enviado! Revisa tu inbox</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
