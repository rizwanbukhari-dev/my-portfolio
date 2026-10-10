/**
 * Portfolio Configuration & User Information
 * Syed Rizwan Bukhari - Computer Science & Engineering Student
 * Easily update contact information, URLs, and social profiles here.
 */

const PORTFOLIO_CONFIG = {
  personal: {
    fullName: "Syed Rizwan Bukhari",
    preferredName: "Rizwan Bukhari",
    role: "Computer Science & Engineering Student",
    subRole: "Aspiring Software Developer & Cybersecurity Enthusiast",
    tagline: "Building my skills through programming, web development, Linux, cybersecurity and practical projects.",
    location: "Budgam, Jammu & Kashmir, India",
    college: "Government Polytechnic College Ganderbal",
    collegeSemester: "Currently studying in 5th Semester",
    school: "HS Chewdara (Class 10th)",
    careerGoal: "I am interested in software development, web development, cybersecurity and ethical hacking. My long-term goal is to become a skilled software/cybersecurity professional while continuing my higher education."
  },
  
  contact: {
    phonePlaceholder: "+91 6005320065",
    phoneRaw: "+916005320065",
    emailPlaceholder: "syedrizwanbukhari18@gmail.com",
    emailRaw: "syedrizwanbukhari18@gmail.com",
    whatsappNumber: "916005320065",
    locationText: "Budgam, Jammu & Kashmir, India"
  },

  socials: {
    linkedin: {
      name: "LinkedIn",
      username: "Rizwan Bukhari-dev",
      url: "https://www.linkedin.com/in/rizwan-bukhari-dev"
    },
    github: {
      name: "GitHub",
      username: "rizwanbukhari-dev",
      url: "https://github.com/rizwanbukhari-dev"
    },
    instagram: {
      name: "Instagram",
      username: "rizwanbukhari.dev",
      url: "https://www.instagram.com/rizwanbukhari.dev/"
    }
  },

  skills: {
    programming: [
      { name: "C", level: "Working Knowledge", icon: "code" },
      { name: "Python", level: "Learning", icon: "terminal" },
      { name: "Java", level: "Learning", icon: "coffee" },
      { name: "HTML", level: "Intermediate", icon: "layout" },
      { name: "CSS", level: "Intermediate", icon: "palette" },
      { name: "JavaScript", level: "Intermediate", icon: "zap" }
    ],
    database: [
      { name: "DBMS", level: "Working Knowledge", icon: "database" },
      { name: "SQL", level: "Working Knowledge", icon: "table" }
    ],
    operatingSystems: [
      { name: "Windows", level: "Intermediate", icon: "monitor" },
      { name: "Linux", level: "Working Knowledge", icon: "cpu" },
      { name: "UNIX basics", level: "Learning", icon: "command" }
    ],
    other: [
      { name: "Git", level: "Working Knowledge", icon: "git-branch" },
      { name: "GitHub", level: "Working Knowledge", icon: "github" },
      { name: "VS Code", level: "Intermediate", icon: "edit-3" },
      { name: "Web Development", level: "Intermediate", icon: "globe" },
      { name: "PDF / Document Processing", level: "Working Knowledge", icon: "file-text" },
      { name: "Basic Cybersecurity Concepts", level: "Learning", icon: "shield" },
      { name: "Linux Command Line", level: "Working Knowledge", icon: "terminal" }
    ]
  },

  currentlyLearning: [
    { title: "Python", desc: "Core syntax, data structures, automation scripts, and problem solving", tag: "Active Focus" },
    { title: "Linux", desc: "Command-line navigation, system administration fundamentals, shell utilities", tag: "Daily Driver" },
    { title: "Web Development", desc: "Modern responsive web applications, component structure, clean DOM logic", tag: "Building Projects" },
    { title: "JavaScript", desc: "Modern ES6+, DOM manipulation, asynchronous programming, APIs", tag: "Strengthening" },
    { title: "Git & GitHub", desc: "Version control workflows, commit etiquette, repository collaboration", tag: "Essential Tool" },
    { title: "Cybersecurity", desc: "Security architecture, network defense principles, threat modeling", tag: "Core Interest" },
    { title: "Ethical Hacking Fundamentals", desc: "Reconnaissance basics, network scanning, vulnerability assessment concepts", tag: "Exploring" },
    { title: "Database Management", desc: "Relational database modeling, queries, indexing, integrity constraints", tag: "Coursework & Labs" },
    { title: "Software Development", desc: "Software lifecycle, modular architecture, algorithmic problem solving", tag: "Career Target" }
  ],

  projects: [
    {
      id: "pdfshub",
      title: "PDFs Hub",
      category: "Web Application / Document Processing",
      status: "Coming Soon",
      statusBadge: "Active Development",
      summary: "A web-based PDF and document utility platform designed to provide useful tools for working with PDFs, documents and images. The platform is intended to be useful for students, professionals and CSC/shop users.",
      image: "assets/images/project-pdfshub.jpg",
      features: [
        "Merge PDF",
        "PDF conversion",
        "PDF compression",
        "Document conversion",
        "Image compression",
        "PDF utilities",
        "Document utilities",
        "Multiple file-processing tools"
      ],
      details: "PDFs Hub is engineered to eliminate repetitive document headaches for academic students, office clerks, and digital service center (CSC) operators. Built with a clean interface and client-side processing capabilities for speed and data privacy.",
      demoUrl: "",
      githubUrl: "https://github.com/rizwanbukhari-dev"
    },
    {
      id: "kcf-analytics",
      title: "KCF Social Media Analytics Dashboard",
      category: "Analytics & Data Visualization",
      status: "In Development",
      statusBadge: "Project Prototype",
      summary: "A dashboard designed to analyze social media performance data from platforms such as Instagram and Facebook. It focuses on reach, engagement, top-performing posts, posting times, categories and content recommendations.",
      image: "assets/images/project-kcf-analytics.jpg",
      features: [
        "Instagram/Facebook selection",
        "Date-range analysis",
        "Reach analysis",
        "Engagement analysis",
        "Top-performing posts",
        "Best posting time",
        "Best posting day",
        "Category analysis",
        "Platform comparison",
        "Content recommendations"
      ],
      details: "Built to empower creators and organizations to optimize their social media strategy. The dashboard visualizes engagement metrics, highlights high-converting content formats, and identifies peak follower activity hours.",
      demoUrl: "",
      githubUrl: "https://github.com/rizwanbukhari-dev"
    },
    {
      id: "portfolio",
      title: "Personal Developer Portfolio",
      category: "Frontend & Responsive Web Design",
      status: "Live Project",
      statusBadge: "Completed",
      summary: "My personal portfolio website showcasing my education, technical skills, projects, learning journey and contact information.",
      image: "assets/images/avatar.jpg",
      features: [
        "Fully responsive layout (Desktop, Tablet, Mobile)",
        "Dark & Light mode switcher",
        "Real-time GitHub API integration",
        "Interactive Terminal preview",
        "Validated contact form & quick config",
        "Printable / Viewable CV modal",
        "Modern CSS design system with micro-interactions"
      ],
      details: "Designed and implemented from the ground up using semantic HTML5, modern vanilla CSS, and vanilla JavaScript without heavy external frameworks.",
      demoUrl: "#home",
      githubUrl: "https://github.com/rizwanbukhari-dev"
    }
  ],

  services: [
    {
      title: "Basic Web Development",
      desc: "Creating responsive, clean landing pages and web interfaces using modern HTML5, CSS3, and JavaScript.",
      icon: "layout"
    },
    {
      title: "Website Development",
      desc: "Structuring multi-section portfolio, educational, and informational websites with accessible navigation.",
      icon: "globe"
    },
    {
      title: "PDF / Document Utility Applications",
      desc: "Developing tools and workflows for file conversions, PDF processing, compression, and document utilities.",
      icon: "file-text"
    },
    {
      title: "Python Programming",
      desc: "Writing modular Python scripts for data manipulation, automation, logic execution, and academic problems.",
      icon: "terminal"
    },
    {
      title: "Basic Database Applications",
      desc: "Designing relational database schemas, writing structured SQL queries, and managing tabular data.",
      icon: "database"
    },
    {
      title: "Linux-based Tasks",
      desc: "Handling command-line operations, shell scripts, environment configuration, and Linux administration basics.",
      icon: "cpu"
    },
    {
      title: "Dashboard Development",
      desc: "Designing intuitive metrics dashboards, analytical card grids, and interactive data visualization views.",
      icon: "bar-chart-2"
    },
    {
      title: "Basic Automation",
      desc: "Automating repetitive daily tasks, file organization, and batch scripts using Python and shell utilities.",
      icon: "zap"
    },
    {
      title: "Student / Academic Projects",
      desc: "Assisting with computer science coursework implementations, engineering lab assignments, and project demos.",
      icon: "book-open"
    }
  ],

  achievements: [
    {
      title: "Academic Progress in CSE Diploma",
      desc: "Successfully progressing through 5th Semester in Computer Science & Engineering at Government Polytechnic College Ganderbal.",
      icon: "award"
    },
    {
      title: "Building Practical Technology Projects",
      desc: "Conceived and actively engineering utility tools like PDFs Hub and KCF Social Media Analytics Dashboard to solve real-world problems.",
      icon: "folder"
    },
    {
      title: "Skill Development in Core Technologies",
      desc: "Consistently developing practical competencies in programming languages, Linux environments, database design, and web development.",
      icon: "code"
    },
    {
      title: "Exploring Cybersecurity Fundamentals",
      desc: "Deepening theoretical and practical understanding of network security, ethical hacking fundamentals, and secure system practices.",
      icon: "shield"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
