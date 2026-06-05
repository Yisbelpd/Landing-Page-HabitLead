import { Pillar, FAQ, Testimonial, LeadershipArea } from "./types";

export const PILLARS_DATA: Pillar[] = [
  {
    id: "pillar-1",
    title: "Registro Diario Flexible",
    description: "Monitoriza tus hábitos saludables primordiales (sueño, meditación, hidratación, movimiento) en una interfaz limpia, veloz y sin notificaciones intrusivas.",
    iconName: "Compass"
  },
  {
    id: "pillar-2",
    title: "Acompañamiento Humano",
    description: "Accede de forma opcional a planes de acompañamiento personalizados guiados por expertos en bienestar, nutrición y rendimiento sostenible.",
    iconName: "Sparkles"
  },
  {
    id: "pillar-3",
    title: "Liderazgo Integral",
    description: "Conecta tu nivel de vitalidad física e interior con tu impacto directivo. El autocuidado consciente es el motor de tu toma de decisiones.",
    iconName: "ShieldCheck"
  },
  {
    id: "pillar-4",
    title: "Progreso Estratégico",
    description: "Métricas honestas enfocadas en medir tu constancia y tu nivel de energía vital en lugar de rachas numéricas vacías que generan ansiedad.",
    iconName: "Heart"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    quote: "Poder llevar un registro diario de mis hábitos de hidratación y descanso con esta estética limpia me ha dado una enorme claridad mental. El plan de acompañamiento opcional estructuró mis metas de bienestar a un nivel superior.",
    author: "Carmen Ruiz",
    role: "Directora de Operaciones y Miembro de HabitLead",
    avatarInitials: "CR"
  },
  {
    id: "test-2",
    quote: "Buscaba una app que me permitiera registrar rutinas esenciales de forma intuitiva. El acompañamiento guiado con coaches reales me ayudó a superar mis bloqueos de constancia y a consolidar mi liderazgo integral.",
    author: "Daniel Santos",
    role: "Co-fundador en WaveTech Studio",
    avatarInitials: "DS"
  },
  {
    id: "test-3",
    quote: "Llevar mi diario de bienestar es sumamente placentero aquí. Saber que puedo recurrir a sesiones de soporte experto y planes de acompañamiento cuando afronto alta exigencia en mi día a día profesional me brinda gran tranquilidad.",
    author: "Sofía Tejera",
    role: "VP de Cultura y Talento",
    avatarInitials: "ST"
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    id: "faq-1",
    question: "¿Cómo funciona el registro de hábitos diario?",
    answer: "HabitLead ofrece un lienzo visual extremadamente minimalista donde puedes registrar con un solo toque tus hábitos físicos y mentales clave. Sin anuncios, sin distracciones de redes sociales y adaptado para que completes tu diario en menos de un minuto al día."
  },
  {
    id: "faq-2",
    question: "¿En qué consisten los planes de acompañamiento opcionales?",
    answer: "Si deseas un nivel superior de rendición de cuentas, estructura o personalización, puedes contratar nuestros planes de acompañamiento. En ellos, un especialista asignado se conecta contigo semanalmente, analiza tus datos de registro y diseña micro-rituales optimizados para tu contexto personal e integral."
  },
  {
    id: "faq-3",
    question: "Si decido no acceder al acompañamiento, ¿puedo usar la app?",
    answer: "¡Por supuesto! El núcleo principal de registro individual diario de HabitLead es y seguirá siendo totalmente funcional de forma independiente. El acompañamiento es un servicio prémium opcional de soporte humano que activas únicamente si determinas que necesitas guía especializada."
  },
  {
    id: "faq-4",
    question: "¿Qué es el enfoque del Liderazgo Integral?",
    answer: "Es la convicción científica de que para liderar tus propias decisiones con asertividad y claridad mental, debes estar óptimamente regulado en tu biología. Al registrar hábitos saludables de forma individual, regulas tu sistema nervioso, mejorando tu capacidad de enfoque, paciencia y gestión de tu energía diaria."
  }
];

export const LEADERSHIP_AREAS: LeadershipArea[] = [
  {
    id: "foco",
    title: "Enfoque y Visión",
    emoji: "🎯",
    description: "Elimina el ruido informativo diario para concentrar tu atención en las pocas decisiones de verdadero impacto estratégico.",
    recommendedHealthyHabit: {
      title: "Mañana Analógica",
      description: "Lleva registro diario de evitar mirar pantallas o leer notificaciones los primeros 20 minutos tras despertar para proteger tu atención profunda.",
      duration: "20 minutos"
    },
    recommendedLeadershipHabit: {
      title: "Acompañamiento Opcional de Enfoque",
      description: "Recibe feedback de un mentor para priorizar y blindar adecuadamente bloques de pensamiento profundo y desconexión laboral programada.",
      actionBlock: "Sesión Semanal Online"
    }
  },
  {
    id: "energia",
    title: "Vitalidad y Resiliencia",
    emoji: "⚡",
    description: "Lidera con energía positiva constante. Sincroniza tu cuerpo y sistema nervioso para reaccionar desde la templanza.",
    recommendedHealthyHabit: {
      title: "Movimiento y Desconexión",
      description: "Registra diariamente al menos una caminata al aire libre de baja intensidad cardiovascular o estiramiento corporal consciente.",
      duration: "15 minutos"
    },
    recommendedLeadershipHabit: {
      title: "Acompañamiento en Bio-Rendimiento",
      description: "Plan de ajuste opcional con un nutricionista asignado para sincronizar tus comidas e hidratación con tus picos de demanda ejecutiva.",
      actionBlock: "Soporte de Coach asignado"
    }
  },
  {
    id: "empatia",
    title: "Asertividad y Relaciones",
    emoji: "🤝",
    description: "Construye relaciones auténticas y establece límites saludables gracias a una comunicación impecable.",
    recommendedHealthyHabit: {
      title: "Respiración Coherente",
      description: "Registra tus ejercicios de respiración diafragmática profunda antes de interacciones interpersonales que anticipes con tensión.",
      duration: "3 minutos"
    },
    recommendedLeadershipHabit: {
      title: "Acompañamiento en Soft-Skills",
      description: "Mentoría uno a uno para integrar asertividad empática y comunicación no violenta de forma individual y segura.",
      actionBlock: "Sesiones quincenales"
    }
  },
  {
    id: "resiliencia",
    title: "Claridad Emocional",
    emoji: "🌱",
    description: "Gestiona de forma óptima el agobio y los frentes imprevistos mediante rituales de cierre que faciliten un descanso real.",
    recommendedHealthyHabit: {
      title: "Registro de Descarga Mental",
      description: "Dedica un espacio al final del día para anotar preocupaciones o tareas pendientes antes de desconectar para ir a dormir.",
      duration: "10 minutos"
    },
    recommendedLeadershipHabit: {
      title: "Clínicas de Liderazgo Consciente",
      description: "Dinámicas mensuales de acompañamiento grupal para resolver retos de burnout, estrés crónico y gestión emocional.",
      actionBlock: "Acceso ilimitado"
    }
  }
];
