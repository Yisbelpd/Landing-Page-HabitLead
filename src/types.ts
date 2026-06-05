export interface Pillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarInitials: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface LeadershipArea {
  id: string;
  title: string;
  emoji: string;
  description: string;
  recommendedHealthyHabit: {
    title: string;
    description: string;
    duration: string;
  };
  recommendedLeadershipHabit: {
    title: string;
    description: string;
    actionBlock: string;
  };
}
