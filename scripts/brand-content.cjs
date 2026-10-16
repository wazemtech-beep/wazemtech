const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..', 'src', 'components');
function replace(file, pairs) {
  const location = path.join(root, file);
  let text = fs.readFileSync(location, 'utf8');
  for (const [before, after] of pairs) text = text.replaceAll(before, after);
  fs.writeFileSync(location, text);
}
replace('TeamSection.tsx', [
 ['Markus Thorn','Creative Direction'], ['Elena Rostova','Web & UI Design'],
 ['David Alarie','Development'], ['Chloe Bennett','AI & Automation'],
 ['CEO and Founder','Brand strategy'],['CEO & Founder','Brand strategy'],
 ['Head of Design','Digital experiences'],['Strategy Lead','Custom software'],
 ['Senior UI/UX Designer','Intelligent solutions'],
 ['The experts','The expertise'],['behind the results','behind Wazemtech'],
 ['OUR TEAM','OUR EXPERTISE'],['Our team','Our expertise'],
]);
replace('WorkSection.tsx', [
 ['Selected work','Creative directions'],['Featured projects &','Design concepts &'],
 ['creative works','digital experiences'],
 ["We don't just build websites; we create digital experiences that resonate with users and drive long-term business growth.", 'At Wazemtech, creativity and technical expertise come together to shape memorable brands and digital experiences.'],
 ['Xenitho','Brand Concept'],['Aethelgard','Web Design Concept'],['Kryonix','Interface Concept'],['Luminaura','Visual Direction'],['Vyntage','Campaign Concept'],
 ['All Cases','View Concepts'],
 ['https://stodio.webflow.io/projects/xenitho','/sections/stodio-our-work/xenitho.png'],
 ['https://stodio.webflow.io/projects/aethelgard','/sections/stodio-our-work/aethelgard.png'],
 ['https://stodio.webflow.io/projects/kryonix','/sections/stodio-our-work/kryonix.png'],
 ['https://stodio.webflow.io/projects/luminaura','/sections/stodio-our-work/luminaura.png'],
 ['https://stodio.webflow.io/projects/vyntage','/sections/stodio-our-work/vyntage.png'],
 ['https://stodio.webflow.io/projects','#work-title'],
]);
replace('GrowthSection.tsx', [
 ['45 million dollars in revenue generated','Custom AI solutions'],
 ['$45M','AI'],['Revenue generated for our clients through AI-led optimizations.','Custom AI solutions built around your business needs.'],
 ['15,400 active agents','Connected workflows'],['15,400','Connected'],[' active agents',' workflows'],
 ['5x','Build'],['Faster speed to market.','From idea to working software.'],
 ['90 percent inference speed','Intelligent automation'],['90%','AI'],['Inference speed','Intelligent automation'],
 ['Real-time processing for enterprise-grade deployments.','Purpose-built tools for everyday business workflows.'],
 ['The custom LLM they built for us reduced our support tickets by','We bring creativity and technical expertise together to build'],
 ['80% while increasing user satisfaction.','digital experiences that communicate your brand.'],
 ['CTO, Cigna','Wazemtech'],['Cigna Healthcare','Wazemtech'],['/assets/cigna.png','/assets/logo.svg'],
 ['className="count"','className="capability-label"'],['className="ring-number count"','className="ring-number"'],
]);
