export interface EducationItem {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
  score: string;
  location: string;
  highlights: string[];
}

export const education: EducationItem[] = [
  {
    institution: "Kalasalingam Academy of Research and Education",
    degree: "Bachelor of Technology",
    specialization: "Computer Science and Engineering (AI & ML)",
    duration: "Aug 2024 - Present",
    score: "Current CGPA: 9.37 / 10",
    location: "Krishnankoil, Tamil Nadu, India",
    highlights: [
      "Specializing in Artificial Intelligence and Machine Learning core methodologies.",
      "Active Web Development Team Member at OWASP Student Chapter, optimizing secure apps.",
      "Gaining hands-on experience in full-stack web applications and multi-agent AI platforms.",
    ],
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Intermediate Education (Class 11 & 12)",
    specialization: "MPC Stream (Mathematics, Physics, Chemistry)",
    duration: "2022 - 2024",
    score: "Score: 975 / 1000 (~97.5%)",
    location: "Andhra Pradesh, India",
    highlights: [
      "Achieved a highly competitive board examination score of 975 out of 1000.",
      "Built rigorous foundations in advanced algebra, calculus, physics mechanics, and physical chemistry.",
    ],
  },
];
