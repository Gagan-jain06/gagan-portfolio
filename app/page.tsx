"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen animated-bg bg-gradient-to-br from-black via-slate-900 to-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-5">
          <h1 className="text-xl font-bold">Gagan Jain</h1>
          <div className="aurora"></div>
          <div className="space-x-6">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="absolute inset-0 pointer-events-none">

</div>
      <motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="relative z-20 h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
>{/* Floating Particles */}
<div className="absolute inset-0 pointer-events-none">
  {[
    { top: "10%", left: "20%" },
    { top: "20%", left: "80%" },
    { top: "30%", left: "40%" },
    { top: "40%", left: "70%" },
    { top: "50%", left: "15%" },
    { top: "60%", left: "60%" },
    { top: "70%", left: "30%" },
    { top: "80%", left: "85%" },
    { top: "90%", left: "50%" },
    { top: "15%", left: "90%" },
  ].map((pos, i) => (
    <motion.div
      key={i}
      className="absolute w-3 h-3 bg-cyan-400 rounded-full opacity-30"
      style={{
        top: pos.top,
        left: pos.left,
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, 20, 0],
      }}
      transition={{
        duration: 10 + i,
        repeat: Infinity,
      }}
    />
  ))}
</div><motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{
    duration: 3,
    repeat: Infinity
  }}
>
  <Image
    src="/myphoto.jpg"
    alt="Gagan Jain"
    width={180}
    height={180}
    className="rounded-full"
  />
</motion.div>
        <motion.h1
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1 }}
  className="text-6xl font-bold"
>
  Gagan Jain
</motion.h1>

        <p className="text-2xl mt-4">
          Computer Science Engineering Student
        </p>

        <p className="text-gray-400 mt-4 max-w-2xl">
          Passionate about Software Development,
          Artificial Intelligence, Web Development,
          and building innovative digital products.
        </p>

       <a
  href="#projects"
  className="relative z-20 mt-8 bg-cyan-500 text-black px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
>
  View My Projects
</a>

<a
  href="/RESUME.pdf"
  target="_blank"
  className="relative z-20 mt-4 border border-white px-6 py-3 rounded-lg"
>
  Download Resume
</a>
      </motion.section>

      {/* About */}
      <section
        id="about"
        className="max-w-5xl mx-auto py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold mb-8">
          About Me
        </h2>

        <p className="text-lg text-gray-300 leading-8">
          I am a Computer Science Engineering student at SRM University with a strong interest in software development, artificial intelligence, web development, and emerging technologies. I enjoy learning new concepts, solving real-world problems, and building projects that enhance my technical skills and creativity.Through academic coursework, personal projects, and continuous learning, I aim to develop solutions that create meaningful impact. I believe in learning by building, which motivates me to work on practical projects and experiment with innovative ideas.
        </p>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="max-w-5xl mx-auto py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold mb-10">
          Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Python",
            "Java",
            "C++",
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "AI & Automation"
          ].map((skill) => (
            <div
              key={skill}
              className="bg-gray-900 p-4 rounded-lg text-center transition-all hover:scale-105 hover:bg-gray-800"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto py-20 px-4 md:px-8">
  <h2 className="text-4xl font-bold mb-8">
    Achievements
  </h2>

  <ul className="space-y-4">
    <li>🎓 Computer Science Engineering Student at SRM University</li>
    <li>💻 Building AI & Web Development Projects</li>
    <li>🚀 Learning Full Stack Development</li>
    <li>📚 Exploring Artificial Intelligence & Automation</li>
  </ul>
</section>
      {/* Projects */}
      <section
        id="projects"
        className="max-w-5xl mx-auto py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold mb-10">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <a
  href="/ai-study-assistant"
  className="block bg-gray-900 p-6 rounded-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
>
  <h3 className="text-2xl font-bold mb-3">
    AI Study Assistant
  </h3>

  <p className="text-gray-400">
    AI-powered chatbot helping students learn concepts.
  </p>

  <div className="mt-4">
    <span className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-bold">
      Live Demo →
    </span>
  </div>
</a>
          <div className="bg-gray-900 p-6 rounded-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Portfolio Website
            </h3>

            <p className="text-gray-400">
              Personal portfolio built using Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="max-w-5xl mx-auto py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold mb-10">
          Contact Me
        </h2>

        <div className="space-y-4 text-lg">
          <p>📧 gaganjain0609@gmail.com</p>

          <p>
            💼 LinkedIn:
            <a
              href="https://linkedin.com/in/gagan-jain-44479"
              target="_blank"
              className="text-blue-400 ml-2"
            >
              Gagan Jain
            </a>
          </p>

          <p>
            💻 GitHub:
            <a
              href="https://github.com/Gagan-jain06"
              target="_blank"
              className="text-blue-400 ml-2"
            >
              @Gagan-jain06
            </a>
          </p>
        </div>
      </section>
      <footer className="text-center py-10 border-t border-white/10">
  <p>© 2026 Gagan Jain</p>

  <p className="text-gray-500 mt-2">
    Built with Next.js, Tailwind CSS & Framer Motion
  </p>
</footer>
    </main>
  );
}