"use client";
import { useEffect, useRef } from "react";
import initialize from "./sections/services-motion";
export default function ServicesSection() {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => { if (root.current) return initialize(root.current); }, []);
 return <div ref={root} className="section-services">{"\n    "}<section className="services-services" id="section-services" aria-labelledby="services-title">
{"\n      "}
<canvas className="services-atmosphere" aria-hidden="true">

</canvas>
{"\n      "}
<div className="services-services-inner">
{"\n        "}
<header className="services-section-heading">
{"\n          "}
<p className="services-eyebrow services-reveal">
<span aria-hidden="true">
{"//"}
</span>
{"What we do"}
</p>
{"\n          "}
<h2 id="services-title" className="services-section-title">
<span className="services-line-mask">
<span className="services-heading-line">
{"Our services"}
</span>
</span>
<span className="services-line-mask">
<span className="services-heading-line">
{"& your brand"}
</span>
</span>
</h2>
{"\n        "}
</header>
{"\n        "}
<div className="services-service-list">
{"\n          "}
<article className="services-service services-reveal">
{"\n            "}
<div className="services-service-main">
{"\n              "}
<span className="services-number">
{"01"}
</span>
{"\n              "}
<div className="services-image-column">
<button className="services-image-stack" aria-label="View next Brand identity image">
<span className="services-card-scene">
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/brand-1.jpg" alt="Brand identity concept photography" width="2688" height="1520" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/brand-2.jpg" alt="Studio brand identity campaign" width="2688" height="1520" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/brand-3.jpg" alt="Fashion packaging brand photography" width="2688" height="1520" />
</span>
</span>
</button>
</div>
{"\n              "}
<div className="services-service-copy">
<h2 >
{"Brand identity"}
</h2>
<p >
{"A clear visual identity that communicates your brand and connects with your audience."}
</p>
</div>
{"\n            "}
</div>
{"\n            "}
<div className="services-divider" aria-hidden="true">

</div>
{"\n          "}
</article>
{"\n          "}
<article className="services-service services-service-reverse services-reveal">
{"\n            "}
<div className="services-service-main">
{"\n              "}
<span className="services-number">
{"02"}
</span>
{"\n              "}
<div className="services-image-column">
<button className="services-image-stack" aria-label="View next Art direction and photography image">
<span className="services-card-scene">
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/art-1.jpg" alt="Art-directed studio portrait" width="663" height="702" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/art-2.jpg" alt="Editorial photography study" width="1179" height="1503" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/art-3.jpg" alt="Campaign and product photography" width="735" height="932" loading="lazy" />
</span>
</span>
</button>
</div>
{"\n              "}
<div className="services-service-copy">
<h2 >
{"Web design & development"}
</h2>
<p >
{"Responsive websites that combine thoughtful design with reliable development."}
</p>
</div>
{"\n            "}
</div>
{"\n            "}
<div className="services-divider" aria-hidden="true">

</div>
{"\n          "}
</article>
{"\n          "}
<article className="services-service services-reveal">
{"\n            "}
<div className="services-service-main">
{"\n              "}
<span className="services-number">
{"03"}
</span>
{"\n              "}
<div className="services-image-column">
<button className="services-image-stack" aria-label="View next Motion and film image">
<span className="services-card-scene">
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/motion-1.jpg" alt="Motion and film visual direction" width="800" height="1200" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/motion-2.jpg" alt="Brand film still" width="735" height="588" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/motion-3.jpg" alt="Motion production visual" width="736" height="480" loading="lazy" />
</span>
</span>
</button>
</div>
{"\n              "}
<div className="services-service-copy">
<h2 >
{"Interaction design"}
</h2>
<p >
{"Intuitive interfaces and purposeful motion that make digital experiences feel effortless."}
</p>
</div>
{"\n            "}
</div>
{"\n            "}
<div className="services-divider" aria-hidden="true">

</div>
{"\n          "}
</article>
{"\n          "}
<article className="services-service services-service-reverse services-reveal">
{"\n            "}
<div className="services-service-main">
{"\n              "}
<span className="services-number">
{"04"}
</span>
{"\n              "}
<div className="services-image-column">
<button className="services-image-stack" aria-label="View next Content systems image">
<span className="services-card-scene">
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/content-1.png" alt="Branded content system layouts" width="2804" height="1900" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/content-2.png" alt="Brand templates and toolkit" width="2750" height="1812" loading="lazy" />
</span>
<span className="services-stack-card">
<img src="/sections/alta-what-we-do/content-3.png" alt="Consistent visual content system" width="2792" height="1886" loading="lazy" />
</span>
</span>
</button>
</div>
{"\n              "}
<div className="services-service-copy">
<h2 >
{"AI & software solutions"}
</h2>
<p >
{"Intelligent tools and custom software built around your business workflows."}
</p>
</div>
{"\n            "}
</div>
{"\n            "}
<div className="services-divider" aria-hidden="true">

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
