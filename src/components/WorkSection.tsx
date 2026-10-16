"use client";
import { useEffect, useRef } from "react";
import initialize from "./sections/work-motion";
export default function WorkSection() {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => { if (root.current) return initialize(root.current); }, []);
 return <div ref={root} className="section-work">{"\n    "}<section className="work-work-section" aria-labelledby="work-title">
{"\n      "}
<div className="work-container">
{"\n        "}
<header className="work-work-heading">
{"\n          "}
<div className="work-section-tag work-reveal">
<span className="work-tag-symbol" aria-hidden="true">

</span>
{"Creative directions"}
</div>
{"\n          "}
<h2 id="work-title" className="work-section-title">
{"Design concepts &"}
<br  />
{"digital experiences"}
</h2>
{"\n          "}
<p >
{"At Wazemtech, creativity and technical expertise come together to shape memorable brands and digital experiences."}
</p>
{"\n        "}
</header>
{"\n        "}
<div className="work-projects">
{"\n          "}
<div className="work-project-row work-first-row">
{"\n            "}
<a className="work-project work-project-large work-reveal" href="/sections/stodio-our-work/xenitho.png" aria-label="View Brand Concept, Brand Strategy">
{"\n              "}
<div className="work-project-image">
<img src="/sections/stodio-our-work/xenitho.png" width="1440" height="808" alt="Brand Concept campaign portrait framed by golden yellow fabric" fetchPriority="high" />
</div>
{"\n              "}
<div className="work-project-info">
<h2 >
{"Brand Concept"}
</h2>
<span >
{"Brand Strategy"}
</span>
</div>
{"\n            "}
</a>
{"\n            "}
<a className="work-project work-project-small work-reveal" href="/sections/stodio-our-work/aethelgard.png" aria-label="View Web Design Concept, Web Design">
{"\n              "}
<div className="work-project-image">
<img src="/sections/stodio-our-work/aethelgard.png" width="1440" height="808" alt="Web Design Concept portrait with flowing sheer red fabric" />
</div>
{"\n              "}
<div className="work-project-info">
<h2 >
{"Web Design Concept"}
</h2>
<span >
{"Web Design"}
</span>
</div>
{"\n            "}
</a>
{"\n          "}
</div>
{"\n          "}
<div className="work-project-row work-middle-row">
{"\n            "}
<a className="work-project work-project-large work-reveal" href="/sections/stodio-our-work/kryonix.png" aria-label="View Interface Concept, Product Interface UI">
{"\n              "}
<div className="work-project-image">
<img src="/sections/stodio-our-work/kryonix.png" width="1440" height="808" alt="Interface Concept creative portrait against a blue sky with red fabric" loading="lazy" />
</div>
{"\n              "}
<div className="work-project-info">
<h2 >
{"Interface Concept"}
</h2>
<span >
{"Product Interface (UI)"}
</span>
</div>
{"\n            "}
</a>
{"\n          "}
</div>
{"\n          "}
<div className="work-project-row work-last-row">
{"\n            "}
<a className="work-project work-project-large work-reveal" href="/sections/stodio-our-work/luminaura.png" aria-label="View Visual Direction, Visual Storytelling">
{"\n              "}
<div className="work-project-image">
<img src="/sections/stodio-our-work/luminaura.png" width="1440" height="808" alt="Visual Direction portrait surrounded by coral and lilac fabric" loading="lazy" />
</div>
{"\n              "}
<div className="work-project-info">
<h2 >
{"Visual Direction"}
</h2>
<span >
{"Visual Storytelling"}
</span>
</div>
{"\n            "}
</a>
{"\n            "}
<a className="work-project work-project-small work-reveal" href="/sections/stodio-our-work/vyntage.png" aria-label="View Campaign Concept, Creative Campaign">
{"\n              "}
<div className="work-project-image">
<img src="/sections/stodio-our-work/vyntage.png" width="1440" height="808" alt="Campaign Concept editorial portrait between deep red textiles" loading="lazy" />
</div>
{"\n              "}
<div className="work-project-info">
<h2 >
{"Campaign Concept"}
</h2>
<span >
{"Creative Campaign"}
</span>
</div>
{"\n            "}
</a>
{"\n          "}
</div>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n      "}
<a className="work-all-cases" href="#work-title">
<span className="work-link-arrow" aria-hidden="true">
{"→"}
</span>
<span >
{"View Concepts"}
</span>
<sup >
{"(05)"}
</sup>
</a>
{"\n    "}
</section>{"\n  "}</div>;
}
