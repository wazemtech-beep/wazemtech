"use client";
import { useEffect, useRef } from "react";
import initialize from "./sections/process-motion";
export default function ProcessSection() {
 const root = useRef<HTMLDivElement>(null);
 useEffect(() => { if (root.current) return initialize(root.current); }, []);
 return <div ref={root} className="section-process">{"\n  "}<section className="process-process" aria-labelledby="process-title">
{"\n    "}
<header className="process-process-header">
{"\n      "}
<p className="process-section-label">
<span >
{"(06)"}
</span>
{" THE PROCESS"}
</p>
{"\n      "}
<div className="process-intro">
{"\n        "}
<h2 id="process-title" className="process-reveal process-section-title">
{"HOW WE CARRY EVERY PROJECT FROM BRIEF TO "}
<span >
{"LAUNCH"}
</span>
{" DAY."}
</h2>
{"\n        "}
<div className="process-description">
{"\n          "}
<p className="process-statement process-reveal">
{"NOTHING FALLS THROUGH THE CRACKS, BECAUSE THERE ARE NO CRACKS. ONE TEAM, ONE PLAN, ONE ROOM."}
</p>
{"\n          "}
<p className="process-small-copy">
{"You get one point of contact and one shared timeline. Updates arrive before you think to ask for them."}
</p>
{"\n        "}
</div>
{"\n      "}
</div>
{"\n    "}
</header>
{"\n    "}
<div className="process-process-track">
{"\n      "}
<div className="process-panels" aria-label="Project process">
{"\n        "}
<article className="process-panel process-is-active" tabIndex={0} aria-label="Discovery phase">
{"\n          "}
<img src="/sections/mira-the-process/discovery.jpg" alt="Writing a project brief in a notebook" />
{"\n          "}
<div className="process-panel-top">
<span >
<b >
{"P."}
</b>
{"(01)"}
</span>
<span className="process-dots" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</span>
</div>
{"\n          "}
<div className="process-panel-copy">
<h2 >
{"DISCOVERY."}
</h2>
<p >
{"One call, one sharp brief. Your goals, your audience, and what's in the way."}
</p>
</div>
{"\n        "}
</article>
{"\n        "}
<article className="process-panel" tabIndex={0} aria-label="Strategy phase">
{"\n          "}
<img src="/sections/mira-the-process/strategy.jpg" alt="Creative team discussing strategy in the studio" />
{"\n          "}
<div className="process-panel-top">
<span >
<b >
{"P."}
</b>
{"(02)"}
</span>
<span className="process-dots" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</span>
</div>
{"\n          "}
<div className="process-panel-copy">
<h2 >
{"STRATEGY."}
</h2>
<p >
{"One creative direction, argued for and agreed - before a single pixel moves."}
</p>
</div>
{"\n        "}
</article>
{"\n        "}
<article className="process-panel" tabIndex={0} aria-label="Design phase">
{"\n          "}
<img src="/sections/mira-the-process/design.jpg" alt="Designer working at a desktop workstation" />
{"\n          "}
<div className="process-panel-top">
<span >
<b >
{"P."}
</b>
{"(03)"}
</span>
<span className="process-dots" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</span>
</div>
{"\n          "}
<div className="process-panel-copy">
<h2 >
{"DESIGN."}
</h2>
<p >
{"We design and develop your digital experience, refining it together at every stage."}
</p>
</div>
{"\n        "}
</article>
{"\n        "}
<article className="process-panel" tabIndex={0} aria-label="Launch phase">
{"\n          "}
<img src="/sections/mira-the-process/launch.webp" alt="A finished website displayed on a phone" />
{"\n          "}
<div className="process-panel-top">
<span >
<b >
{"P."}
</b>
{"(04)"}
</span>
<span className="process-dots" aria-hidden="true">
<i >

</i>
<i >

</i>
<i >

</i>
<i >

</i>
</span>
</div>
{"\n          "}
<div className="process-panel-copy">
<h2 >
{"LAUNCH."}
</h2>
<p >
{"We test, launch, and hand over your project with a clear plan for what comes next."}
</p>
</div>
{"\n        "}
</article>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n    "}
<div className="process-reel-track" id="video">
{"\n      "}
<div className="process-reel-stage">
{"\n        "}
<div className="process-reel-surface">
{"\n          "}
<video className="process-reel-video" src="/sections/mira-the-process/reel.mp4" poster="/sections/mira-the-process/reel-poster.jpg" muted loop playsInline preload="metadata" aria-label="Studio reel preview">

</video>
{"\n          "}
<div className="process-reel-shade">

</div>
{"\n        "}
</div>
{"\n          "}
<div className="process-reel-overlay">
{"\n            "}
<div className="process-reel-left">
<p >
{"STUDIO REEL"}
</p>
<span >
{"PLAY"}
</span>
</div>
{"\n            "}
<button className="process-reel-play" type="button" aria-label="Play reel" title="Play reel">
<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
<path d="m9 5 11 7-11 7V5Z">

</path>
</svg>
</button>
{"\n            "}
<div className="process-reel-right">
<span >
{"REEL"}
</span>
<p >
{"WAZEMTECH"}
</p>
</div>
{"\n          "}
</div>
{"\n      "}
</div>
{"\n    "}
</div>
{"\n  "}
</section>{"\n"}<dialog className="process-reel-dialog" data-lenis-prevent aria-label="Studio reel preview player">
{"\n  "}
<button className="process-reel-close" type="button" aria-label="Close reel" title="Close reel">
<span aria-hidden="true">
{"×"}
</span>
</button>
{"\n  "}
<video className="process-popup-video" src="/sections/mira-the-process/reel.mp4" poster="/sections/mira-the-process/reel-poster.jpg" controls playsInline preload="metadata" aria-label="Studio reel preview playback">

</video>
{"\n"}
</dialog></div>;
}
