// src/components/Hero.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroBg from "../assets/hero-bg.png"; // background image (you said YES)
import heroSideRight from "../assets/hero-side-right.png"; // you have this
// if you later add hero-side-left.png, import it and show it.

const Hero: React.FC = () => {
  return (
    <section
      className="hero-root"
      style={{ backgroundImage: `url(${heroBg})` }}
      aria-label="Hero"
    >
      <div className="container hero-inner">
        <div className="hero-left">
          
          <h1 className="hero-title">Tech Innovation<br/>Event 2025</h1>
          <p className="hero-desc">
            The biggest creators event of the year — unveiling breakthroughs and
            building meaningful connections.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="btn-primary hero-btn">
            
            </Link>
          </div>
        </div>

        <div className="hero-right" aria-hidden>
          <img src={heroSideRight} alt="Event preview" className="hero-main-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
