/**
 * Portfolio Configuration & User Information
 * Syed Rizwan Bukhari - Computer Engineering Student & Aspiring Developer
 * Budgam, Jammu and Kashmir, India
 */

const PORTFOLIO_CONFIG = {
  personal: {
    fullName: "Syed Rizwan Bukhari",
    preferredName: "Rizwan Bukhari",
    headline: "Computer Engineering Student & Aspiring Developer",
    educationBrief: "Diploma in Computer Engineering (5th Semester)",
    college: "Government Polytechnic College Ganderbal",
    collegeSemester: "Currently in 5th Semester",
    school: "HS Chewdara (Class 10th Completed)",
    location: "Budgam, Jammu and Kashmir, India",
    portfolioUrl: "https://rizwanbukhari-1.vercel.app/",
    resumeUrl: "assets/docs/Syed-Rizwan-Bukhari-Resume.pdf",
    primaryInterests: ["Web Development", "Python", "Linux"],
    bio: "I am a Computer Engineering diploma student currently in my 5th semester at Government Polytechnic College Ganderbal, based in Budgam, Jammu & Kashmir. I focus on building practical web applications, mastering Linux environments, writing clean Python scripts, and exploring cybersecurity fundamentals through hands-on practice.",
    longTermGoal: "My goal is to continue strengthening my engineering foundations, build reliable software tools that solve everyday user challenges, and grow into a skilled software and cybersecurity professional while pursuing higher education."
  },

  contact: {
    email: "syedrizwanbukhari18@gmail.com",
    location: "Budgam, Jammu and Kashmir, India",
    phonePlaceholder: "+91 6005320065", // Existing contact reference from project files
    whatsappRaw: "916005320065"
  },

  socials: {
    github: {
      name: "GitHub",
      username: "rizwanbukhari-dev",
      url: "https://github.com/rizwanbukhari-dev"
    },
    instagram: {
      name: "Instagram",
      username: "rizwanbukhari.dev",
      url: "https://www.instagram.com/rizwanbukhari.dev/"
    },
    linkedin: {
      name: "LinkedIn",
      username: "Add Your LinkedIn Profile",
      url: "https://www.linkedin.com/",
      isPlaceholder: true,
      note: "Editable placeholder — replace with your personal LinkedIn profile URL once verified."
    }
  },

  skills: [
    {
      category: "Web Development",
      description: "Building responsive, accessible, and standards-compliant browser interfaces.",
      items: [
        { name: "HTML5", level: "Proficient", badge: "Semantic Markup" },
        { name: "CSS3", level: "Proficient", badge: "Responsive & Flex/Grid" },
        { name: "JavaScript", level: "Working Knowledge", badge: "DOM & ES6+" }
      ]
    },
    {
      category: "Programming",
      description: "Core algorithmic logic, problem solving, and script development.",
      items: [
        { name: "Python", level: "Active Focus", badge: "Core & Automation" },
        { name: "C", level: "Working Knowledge", badge: "Procedural & Systems" }
      ]
    },
    {
      category: "Tools & Platforms",
      description: "Development tools, version management, and deployment pipelines.",
      items: [
        { name: "Git", level: "Working Knowledge", badge: "Version Control" },
        { name: "GitHub", level: "Working Knowledge", badge: "Collaboration & Repos" },
        { name: "VS Code", level: "Comfortable", badge: "Primary Editor" },
        { name: "Vercel", level: "Practical Use", badge: "Web Deployment" }
      ]
    },
    {
      category: "Linux & Cybersecurity",
      description: "Operating system workflows and security fundamentals (Active Learning).",
      items: [
        { name: "Linux CLI", level: "Working Knowledge", badge: "Shell & Bash Basics" },
        { name: "Cybersecurity Fundamentals", level: "Learning / Beginner", badge: "Security Principles" }
      ]
    }
  ],

  projects: [
    {
      id: "pdfkit",
      title: "PDFKit",
      tagline: "Web-Based PDF & Document Utility",
      description: "A lightweight, web-based utility application designed to solve common document management tasks for students, educators, and CSC operators. Features implemented include merging multiple PDFs into a single file, page splitting, compression, and image-to-PDF conversion with client-side processing.",
      technologies: ["HTML5", "CSS3", "JavaScript", "PDF-lib", "Vercel"],
      image: "assets/images/project-pdfshub.jpg",
      status: "Live Application",
      statusClass: "status-live",
      liveUrl: "https://pdfkit-1.vercel.app/",
      githubUrl: "https://github.com/rizwanbukhari-dev/pdfkit.1",
      highlights: [
        "Client-side PDF merging and page extraction",
        "Image to PDF document packaging",
        "Clean, distraction-free utility interface",
        "Live deployment on Vercel"
      ]
    },
    {
      id: "riznex",
      title: "Riznex",
      tagline: "Clean & Professional Experience",
      description: "A web project focused on a clean, professional experience and useful features. Built with modern React, TypeScript, and Vite, delivering an intuitive interface with workflow pipelines, real-time observability telemetry, and modular architecture.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      image: "assets/images/project-riznex.jpg",
      status: "Live Application",
      statusClass: "status-live",
      liveUrl: "https://riznex.vercel.app/",
      githubUrl: "https://github.com/rizwanbukhari-dev/Riznex",
      highlights: [
        "Clean, professional modern user experience",
        "Interactive workflow pipelines and execution telemetry",
        "Modular architecture engineered with TypeScript and Vite",
        "Dark-mode first interface with responsive layout"
      ]
    },
    {
      id: "rizkey",
      title: "RizKey",
      tagline: "Find your rhythm. Master your keys.",
      description: "A typing practice web application designed to help users improve typing speed, accuracy, and consistency. Built with React and TypeScript, featuring real-time WPM calculation, an interactive virtual keyboard, and targeted error practice drills.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "Web Audio API"],
      image: "assets/images/project-rizkey.jpg",
      status: "Live Application",
      statusClass: "status-live",
      liveUrl: "https://rizkey-1.vercel.app/",
      githubUrl: "https://github.com/rizwanbukhari-dev/RizKey",
      highlights: [
        "Real-time WPM, raw speed, and accuracy calculations",
        "Interactive virtual QWERTY keyboard with finger placement zones",
        "Targeted practice drills and weak-key error tracking",
        "Responsive, modern typing interface built with React & Vite"
      ]
    }
  ],

  education: [
    {
      degree: "Diploma in Computer Engineering",
      institution: "Government Polytechnic College Ganderbal",
      location: "Ganderbal, Jammu and Kashmir",
      status: "Currently in 5th Semester",
      statusType: "current",
      description: "Enrolled in a comprehensive 3-year engineering diploma curriculum. Coursework and practical laboratory subjects include Relational Database Management Systems (DBMS), Operating Systems and Linux, Computer Networks, Data Structures, and Programming in C/Python."
    },
    {
      degree: "Class 10th (Secondary Schooling)",
      institution: "HS Chewdara",
      location: "Jammu and Kashmir",
      status: "Completed",
      statusType: "completed",
      description: "Completed secondary school curriculum with foundational focus on Mathematics and General Sciences, building the analytical groundwork for technical engineering studies."
    }
  ],

  learningJourney: [
    {
      phase: "01",
      title: "Programming Fundamentals & Procedural Logic",
      description: "Started coding with the C programming language to understand foundational procedural programming, variables, control structures, pointers, memory concepts, and algorithmic problem solving."
    },
    {
      phase: "02",
      title: "Computer Engineering Diploma Studies",
      description: "Admitted to Government Polytechnic College Ganderbal. Currently progressing through the 5th semester, studying Operating Systems, Relational DBMS & SQL, Data Structures, and Computer Networking."
    },
    {
      phase: "03",
      title: "Practical Web Development",
      description: "Mastered semantic HTML5, modern CSS layouts (Flexbox & Grid), and JavaScript DOM manipulation to build usable, responsive web applications like PDFKit and personal utility tools."
    },
    {
      phase: "04",
      title: "Linux Command Line & Daily Workflow",
      description: "Adopted Linux as a primary development environment. Learning bash navigation, file permissions, command-line utilities, process management, and shell automation scripts."
    },
    {
      phase: "05",
      title: "Python & Automation Scripting",
      description: "Actively studying Python syntax, data structures, automation routines, and modular programming to solve engineering coursework challenges and write practical utility scripts."
    },
    {
      phase: "06",
      title: "Cybersecurity Exploration",
      description: "Developing a grounded understanding of computer security fundamentals, network defense protocols, and core security concepts in safe laboratory environments."
    }
  ]
};

// Export to window for global browser usage
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
