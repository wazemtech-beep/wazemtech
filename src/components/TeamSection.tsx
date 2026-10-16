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
<article className="team-team-card" tabIndex={0} aria-label="Waseem Akram, Brand strategy">
{"\n            "}
<div className="team-card-backdrop">
<img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
</div>
{"\n            "}
<img className="team-portrait" src="/sections/vivid-theory-our-team/markus.png" width="800" height="1062" alt="Waseem Akram" fetchPriority="high" />
{"\n            "}
<div className="team-portrait-blur" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</div>
{"\n            "}
<div className="team-member-details">
<h2 >
{"Waseem Akram"}
</h2>
<p className="team-role">
<span className="team-scramble" data-text="Brand strategy" aria-label="Brand strategy">
{"Brand strategy"}
</span>
</p>
</div>
{"\n          "}
</article>
{"\n          "}
<article className="team-team-card" tabIndex={0} aria-label="Waliha Idrees, Digital experiences">
{"\n            "}
<div className="team-card-backdrop">
<img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
</div>
{"\n            "}
<img className="team-portrait" src="/sections/vivid-theory-our-team/elena.png" width="800" height="1062" alt="Waliha Idrees" />
{"\n            "}
<div className="team-portrait-blur" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</div>
{"\n            "}
<div className="team-member-details">
<h2 >
{"Waliha Idrees"}
</h2>
<p className="team-role">
<span className="team-scramble" data-text="Digital experiences" aria-label="Digital experiences">
{"Digital experiences"}
</span>
</p>
</div>
{"\n          "}
</article>
{"\n          "}
<article className="team-team-card" tabIndex={0} aria-label="Fahad Hussain, Custom software">
{"\n            "}
<div className="team-card-backdrop">
<img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
</div>
{"\n            "}
<img className="team-portrait" src="/sections/vivid-theory-our-team/david.png" width="800" height="1062" alt="Fahad Hussain" />
{"\n            "}
<div className="team-portrait-blur" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</div>
{"\n            "}
<div className="team-member-details">
<h2 >
{"Fahad Hussain"}
</h2>
<p className="team-role">
<span className="team-scramble" data-text="Custom software" aria-label="Custom software">
{"Custom software"}
</span>
</p>
</div>
{"\n          "}
</article>
{"\n          "}
<article className="team-team-card" tabIndex={0} aria-label="Muhammad Fasih, Intelligent solutions">
{"\n            "}
<div className="team-card-backdrop">
<img src="/sections/vivid-theory-our-team/backdrop.jpg" width="1200" height="1593" alt="" />
</div>
{"\n            "}
<img className="team-portrait" src="/sections/vivid-theory-our-team/david.png" width="800" height="1062" alt="Muhammad Fasih" />
{"\n            "}
<div className="team-portrait-blur" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</div>
{"\n            "}
<div className="team-member-details">
<h2 >
{"Muhammad Fasih"}
</h2>
<p className="team-role">
<span className="team-scramble" data-text="Intelligent solutions" aria-label="Intelligent solutions">
{"Intelligent solutions"}
</span>
</p>
</div>
{"\n          "}
</article>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n    "}
</section>{"\n  "}</div>;
}
