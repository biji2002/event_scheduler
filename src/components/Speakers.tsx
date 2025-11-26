import "./Speakers.css";

import bg from "../assets/speakers-bg.png";
import left from "../assets/speaker_left.png";
import right from "../assets/speaker_right.png";
import shape1 from "../assets/speakers-shape1.png";
import shape2 from "../assets/speakers-shape2.png";

export default function Speakers() {
  return (
    <section
      className="speakers"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h2 className="speaker-title">Top Influencers</h2>

      <div className="speaker-wrapper">
        <img src={left} className="speaker-img" alt="left" />
        <img src={right} className="speaker-img" alt="right" />
      </div>

      <img src={shape1} className="shape1" alt="" />
      <img src={shape2} className="shape2" alt="" />
    </section>
  );
}
