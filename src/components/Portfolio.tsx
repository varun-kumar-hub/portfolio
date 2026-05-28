import React from 'react';

interface PortfolioProps {
  visible: boolean;
}

/**
 * Placeholder portfolio page with futuristic dark theme.
 * Will be replaced with real content later.
 */
const Portfolio: React.FC<PortfolioProps> = ({ visible }) => {
  return (
    <div
      className="portfolio-root"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1), transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Hero Section */}
      <section className="portfolio-hero" id="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO MY WORLD</p>
          <h1 className="hero-title">
            <span className="hero-name">YOUR NAME</span>
            <span className="hero-role">Developer · Creator · Innovator</span>
          </h1>
          <div className="hero-line" />
          <p className="hero-description">
            Building the future through code, design, and relentless curiosity.
            Crafting digital experiences that push boundaries.
          </p>
        </div>
        <div className="scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* About Section */}
      <section className="portfolio-section" id="about">
        <div className="section-container">
          <h2 className="section-title">
            <span className="section-number">01</span>
            ABOUT
          </h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                A passionate developer and creator who thrives at the intersection of technology and design.
                With a deep love for building innovative solutions, I transform complex ideas into elegant,
                user-centric experiences.
              </p>
              <p>
                My journey through the cosmos of technology has equipped me with a diverse skill set
                and an unwavering commitment to excellence.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Lines of Code</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="portfolio-section" id="projects">
        <div className="section-container">
          <h2 className="section-title">
            <span className="section-number">02</span>
            PROJECTS
          </h2>
          <div className="projects-grid">
            {[
              { title: 'Project Alpha', desc: 'A revolutionary web application built with cutting-edge technologies', tags: ['React', 'TypeScript', 'Node.js'] },
              { title: 'Project Beta', desc: 'An AI-powered platform that transforms how people interact with data', tags: ['Python', 'TensorFlow', 'API'] },
              { title: 'Project Gamma', desc: 'A real-time collaboration tool for distributed teams worldwide', tags: ['WebSocket', 'React', 'AWS'] },
              { title: 'Project Delta', desc: 'A mobile-first e-commerce experience with seamless UX', tags: ['React Native', 'GraphQL', 'Stripe'] },
            ].map((project, i) => (
              <div className="project-card" key={i}>
                <div className="project-card-inner">
                  <div className="project-number">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, j) => (
                      <span className="project-tag" key={j}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="portfolio-section" id="skills">
        <div className="section-container">
          <h2 className="section-title">
            <span className="section-number">03</span>
            SKILLS
          </h2>
          <div className="skills-grid">
            {[
              { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Three.js', 'CSS/SASS'] },
              { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis'] },
              { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'CI/CD'] },
              { category: 'Concepts', items: ['System Design', 'API Design', 'Performance', 'Security', 'AI/ML'] },
            ].map((group, i) => (
              <div className="skill-group" key={i}>
                <h3 className="skill-category">{group.category}</h3>
                <ul className="skill-list">
                  {group.items.map((item, j) => (
                    <li className="skill-item" key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="portfolio-section portfolio-contact" id="contact">
        <div className="section-container">
          <h2 className="section-title">
            <span className="section-number">04</span>
            CONTACT
          </h2>
          <div className="contact-content">
            <p className="contact-text">
              Ready to build something extraordinary together?
            </p>
            <a href="mailto:hello@example.com" className="contact-button" id="contact-btn">
              GET IN TOUCH
            </a>
            <div className="contact-links">
              <a href="#" className="contact-link">GitHub</a>
              <a href="#" className="contact-link">LinkedIn</a>
              <a href="#" className="contact-link">Twitter</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© 2026 Your Name. Built with passion and code.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
