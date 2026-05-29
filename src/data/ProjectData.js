export const ProjectList = [
  {
    id: 1,
    title: "eManager (Expense Tracker)",
    shortDesc: "A Progressive Web App (PWA) for smart expense tracking with receipt scanning.",
    problem: "Users struggle to manually track daily expenses and need a smart, offline-capable solution that can automatically extract data from receipts and provide actionable financial insights.",
    solution: "Architected a full-stack Next.js PWA powered by Supabase. Integrated Tesseract.js for AI-driven receipt scanning (OCR) and built interactive financial dashboards using Recharts.",
    achievements: [
      "Implemented offline-first capabilities and push notifications via next-pwa",
      "Integrated OCR receipt scanning to automatically extract expense data",
      "Built secure authentication and real-time database syncing with Supabase",
      "Engineered comprehensive data export systems (PDF, Excel, CSV)"
    ],
    tech_stack: ["Next.js", "Supabase", "React Query", "Tesseract.js", "Tailwind CSS"],
    github_url: "https://github.com/RajShukla1",
    demo_url: "https://rajshukla-emanager.vercel.app",
  },
  {
    id: 2,
    title: "Salon Website Template",
    shortDesc: "A conversion-focused business website template for local service businesses.",
    problem: "Local service businesses often lack an affordable, modern, and mobile-friendly digital presence that directly connects with their customers.",
    solution: "Engineered a reusable, highly responsive website template tailored for local businesses, featuring direct WhatsApp integration to drive instant bookings.",
    achievements: [
      "Built a mobile-first, highly responsive modern UI",
      "Integrated direct WhatsApp messaging to improve conversion rates",
      "Designed a reusable component architecture for easy re-deployment",
      "Optimized for fast loading and excellent Lighthouse performance"
    ],
    tech_stack: ["React", "Tailwind CSS", "Framer Motion"],
    github_url: "https://github.com/RajShukla1",
    demo_url: "https://rajshukla-salon.vercel.app",
  },
  {
    id: 3,
    title: "YouTube Clone",
    shortDesc: "A video platform interface replicating core YouTube functionalities.",
    problem: "Building a complex video-centric interface requires efficient handling of media, responsive video grids, and seamless user interaction without performance degradation.",
    solution: "Developed a realistic front-end replica of YouTube, focusing on responsive design principles, video platform concepts, and a clean user interface.",
    achievements: [
      "Implemented seamless user authentication",
      "Structured a robust frontend architecture for media consumption",
      "Built responsive, dynamic video grids mirroring professional platforms",
      "Enhanced user interactions and navigation flow"
    ],
    tech_stack: ["React", "JavaScript", "CSS"],
    github_url: "https://github.com/RajShukla1",
    demo_url: "https://raj-youtube.vercel.app",
  }
];
