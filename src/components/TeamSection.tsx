"use client";
import { useEffect, useRef } from "react";
import initialize from "./sections/team-motion";
export default function TeamSection() {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => { if (root.current) return initialize(root.current); }, []);
 return <div ref={root} className="section-team">{"\n    "}<section className="team-team" aria-labelledby="team-title">
{"\n      "}
<div className="team-team-inner">
{"\n        "}
<header className="team-team-heading">
{"\n          "}
<p className="team-eyebrow">
<span className="team-scramble" data-text="OUR TEAM" aria-label="Our team">
{"OUR TEAM"}
</span>
</p>
{"\n          "}
<h2 id="team-title" className="team-section-title">
{"The team"}
<br  />
{"behind Wazemtech"}
</h2>
{"\n        "}
</header>
{"\n        "}
<div className="team-team-grid">
{"\n          "}
          <article className="team-team-card" tabIndex={0} aria-label="Waseem Akram, Web Developer">
            <div className="team-card-backdrop">
              <img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
            </div>
            <img className="team-portrait" src="/sections/vivid-theory-our-team/markus.png" width="800" height="1062" alt="Waseem Akram" fetchPriority="high" />
            <div className="team-portrait-blur" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div className="team-member-details">
              <h2>Waseem Akram</h2>
              <p className="team-role">
                <span className="team-scramble" data-text="Web Developer" aria-label="Web Developer">
                  {"Web Developer"}
                </span>
              </p>
            </div>
          </article>

          <article className="team-team-card" tabIndex={0} aria-label="Waliha Idrees, Graphic Designer">
            <div className="team-card-backdrop">
              <img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
            </div>
            <img className="team-portrait" src="/sections/vivid-theory-our-team/elena.png" width="800" height="1062" alt="Waliha Idrees" />
            <div className="team-portrait-blur" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div className="team-member-details">
              <h2>Waliha Idrees</h2>
              <p className="team-role">
                <span className="team-scramble" data-text="Graphic Designer" aria-label="Graphic Designer">
                  {"Graphic Designer"}
                </span>
              </p>
            </div>
          </article>

          <article className="team-team-card" tabIndex={0} aria-label="Fahad Hussain, SEO Specialist">
            <div className="team-card-backdrop">
              <img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
            </div>
            <img className="team-portrait" src="/sections/vivid-theory-our-team/david.png" width="800" height="1062" alt="Fahad Hussain" />
            <div className="team-portrait-blur" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div className="team-member-details">
              <h2>Fahad Hussain</h2>
              <p className="team-role">
                <span className="team-scramble" data-text="SEO Specialist" aria-label="SEO Specialist">
                  {"SEO Specialist"}
                </span>
              </p>
            </div>
          </article>

          <article className="team-team-card" tabIndex={0} aria-label="Muhammad Fasih, Automation Architect">
            <div className="team-card-backdrop">
              <img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
            </div>
            <img className="team-portrait" src="/sections/vivid-theory-our-team/david.png" width="800" height="1062" alt="Muhammad Fasih" />
            <div className="team-portrait-blur" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div className="team-member-details">
              <h2>Muhammad Fasih</h2>
              <p className="team-role">
                <span className="team-scramble" data-text="Automation Architect" aria-label="Automation Architect">
                  {"Automation Architect"}
                </span>
              </p>
            </div>
          </article>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n    "}
</section>{"\n  "}</div>;
}
