import { useEffect, useRef } from "react";
import "./styles/Achievements.css";

const achievements = [
  {
    icon: "🏆",
    title: "Smart India Hackathon Finalist",
    description:
      "Reached the finals of India's largest hackathon with an AI-powered drone surveillance system for border security.",
    year: "2025",
    category: "Award",
  },
  {
    icon: "📄",
    title: "Published Research — IEEE",
    description:
      "Published a paper on autonomous drone detection using deep learning and computer vision at an IEEE conference.",
    year: "2025",
    category: "Publication",
  },
  {
    icon: "🥇",
    title: "Dean's List — Academic Excellence",
    description:
      "Recognized on the Dean's List for outstanding academic performance across multiple semesters.",
    year: "2024",
    category: "Award",
  },
  {
    icon: "🧠",
    title: "Google AI Essentials Certification",
    description:
      "Completed Google's AI Essentials program covering machine learning fundamentals and responsible AI practices.",
    year: "2024",
    category: "Award",
  },
  {
    icon: "📄",
    title: "Audio-Based Drone Detection Study",
    description:
      "Co-authored a study on audio-based UAV detection leveraging YAMNet transfer learning for real-time classification.",
    year: "2025",
    category: "Publication",
  },
  {
    icon: "🏅",
    title: "Best Project Award — University",
    description:
      "Awarded Best Project for building an end-to-end AI pipeline for medical image analysis during capstone.",
    year: "2024",
    category: "Award",
  },
];

const Achievements = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Desktop: convert vertical wheel → horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      // Only hijack scroll when there's room to scroll horizontally
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const atStart = track.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = track.scrollLeft >= maxScroll - 1 && e.deltaY > 0;

      // Let page scroll normally if we've hit the edge
      if (atStart || atEnd) return;

      e.preventDefault();
      track.scrollBy({ left: e.deltaY * 2, behavior: "smooth" });
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    return () => track.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="achievements-section" id="achievements">
      <div className="achievements-container section-container">
        <h2>
          Achievements <span>&</span>
          <br /> Publications
        </h2>

        <div className="achievements-scroll-hint">
          <span>Scroll to explore</span>
          <div className="achievements-scroll-line"></div>
        </div>

        <div className="achievements-track" ref={trackRef}>
          {achievements.map((item, index) => (
            <div className="achievements-card" key={index}>
              <div className="achievements-card-content">
                <div className="achievements-card-header">
                  <span className="achievements-icon">{item.icon}</span>
                  <span className="achievements-year">{item.year}</span>
                </div>
                <span className="achievements-category">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
