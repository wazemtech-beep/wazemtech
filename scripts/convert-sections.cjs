const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('next/dist/compiled/node-html-parser');
const postcss = require('postcss');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const app = path.resolve(__dirname, '..');
const sections = [
  ['stodio-our-work', 'WorkSection', 'work'],
  ['alta-what-we-do', 'ServicesSection', 'services'],
  ['vivid-theory-our-team', 'TeamSection', 'team'],
  ['mira-the-process', 'ProcessSection', 'process'],
];
const names = { class:'className', tabindex:'tabIndex', fetchpriority:'fetchPriority', playsinline:'playsInline', viewbox:'viewBox' };
const voids = new Set(['img','br','hr','input','source']);
function jsx(node, slug, scope) {
  if (node.nodeType === 3) return `{${JSON.stringify(node.text)}}`;
  if (!node.tagName) return '';
  let tag = node.tagName.toLowerCase();
  if (tag === 'h1') { node.setAttribute('class', `${node.getAttribute('class') || ''} section-title`.trim()); tag = 'h2'; }
  const attrs = Object.entries(node.attributes).map(([key,value]) => {
    if (key === 'src' || key === 'poster') value = value.replace(/^assets\//, `/sections/${slug}/`);
    if (key === 'class') value = value.split(/\s+/).map(c=>`${scope}-${c}`).join(' ');
    key = names[key] || key;
    if (['muted','loop','controls','playsInline'].includes(key)) return key;
    if (key === 'tabIndex') return `${key}={${Number(value)}}`;
    return `${key}=${JSON.stringify(value)}`;
  }).join(' ');
  return `<${tag} ${attrs}${voids.has(tag) ? ' />' : `>\n${node.childNodes.map(n=>jsx(n,slug,scope)).join('\n')}\n</${tag}>`}`;
}
for (const [slug, component, scope] of sections) {
  const source = path.join(app, '..', 'html section', slug);
  const dest = path.join(app, 'public', 'sections', slug);
  fs.mkdirSync(dest,{recursive:true});
  fs.cpSync(path.join(source,'assets'),dest,{recursive:true});
  const dom = parse(fs.readFileSync(path.join(source,'index.html'),'utf8'));
  dom.querySelectorAll('.image-stack').forEach(stack => {
    const images = stack.querySelectorAll('img').map(img=>`<span class="stack-card">${img.outerHTML}</span>`).join('');
    stack.set_content(`<span class="card-scene">${images}</span>`);
  });
  const markup = dom.querySelector('main').childNodes.map(n=>jsx(n,slug,scope)).join('') + (dom.querySelector('dialog') ? jsx(dom.querySelector('dialog'),slug,scope) : '');
  fs.writeFileSync(path.join(app,'src/components',`${component}.tsx`),`"use client";\nimport { useEffect, useRef } from "react";\nimport initialize from "./sections/${scope}-motion";\nexport default function ${component}() {\n const root = useRef<HTMLDivElement>(null);\n useEffect(() => { if (root.current) return initialize(root.current); }, []);\n return <div ref={root} className="section-${scope}">${markup}</div>;\n}\n`);
  let css = postcss.parse(fs.readFileSync(path.join(source,'style.css'),'utf8'));
  const classes = new Set(['section-title']);
  css.walkRules(rule=>{for(const match of rule.selector.matchAll(/\.([a-zA-Z][\w-]*)/g))classes.add(match[1]);});
  css.walkDecls(d=>{d.value=d.value.replace(/assets\//g,`/sections/${slug}/`);if(d.prop==='letter-spacing')d.value='0';});
  css.walkRules(rule=>{
    if(rule.parent.type==='atrule' && /keyframes/.test(rule.parent.name))return;
    rule.selectors=rule.selectors.map(sel=>{
      sel=sel.replace(/\bh1\b/g,'.section-title').replace(/\.js-ready\s+/g,'.js-ready ');
      sel=sel.replace(/\.([a-zA-Z][\w-]*)/g,(_,c)=>`.${scope}-${c}`);
      if(sel===':root'||sel==='body')return `.section-${scope}`;
      if(sel===`body.${scope}-reel-modal-open`)return sel;
      if(sel.startsWith(`.${scope}-js-ready `))return `.section-${scope}${sel}`;
      return `.section-${scope} ${sel}`;
    });
  });
  fs.writeFileSync(path.join(app,'src/app',`${scope}.css`),css.toString());
  let js = fs.readFileSync(path.join(source,'script.js'),'utf8');
  js=js.replace(/^\(\(\) => \{/, '').replace(/\}\)\(\);\s*$/, '');
  js=js.replaceAll('document.querySelector','root.querySelector').replaceAll('document.documentElement.classList','root.classList');
  if (scope === 'services') js=js.replace(/    const scene = document.createElement\('span'\);[\s\S]*?    stack.append\(scene\);/, '');
  js=js.replace('if (!context) return;', 'if (!context) return () => scope.dispose();');
  const ast=parser.parse(js,{allowReturnOutsideFunction:true});
  traverse(ast,{StringLiteral(p){
    p.node.value=p.node.value.replace(/\.([a-zA-Z][\w-]*)/g,(match,c)=>classes.has(c)?`.${scope}-${c}`:match);
    if(classes.has(p.node.value))p.node.value=`${scope}-${p.node.value}`;
  },CallExpression(p){
    const c=p.node.callee;
    if(t.isMemberExpression(c)&&t.isIdentifier(c.property,{name:'addEventListener'}))p.replaceWith(t.callExpression(t.identifier('listen'),[c.object,...p.node.arguments]));
    else if(t.isIdentifier(c,{name:'addEventListener'}))p.replaceWith(t.callExpression(t.identifier('listen'),[t.identifier('window'),...p.node.arguments]));
  }});
  fs.mkdirSync(path.join(app,'src/components/sections'),{recursive:true});
  fs.writeFileSync(path.join(app,'src/components/sections',`${scope}-motion.js`),`import { motionScope } from "./motion-scope";\nexport default function initialize(root) {\n const scope = motionScope();\n const { listen, requestAnimationFrame, cancelAnimationFrame, IntersectionObserver, ResizeObserver } = scope;\n ${generate(ast).code}\n return () => { scope.dispose(); ${scope==='services' ? `root.querySelectorAll('.services-divider-wave').forEach(el=>el.remove());` : ''} ${scope==='process' ? `dialog.close(); popupVideo.pause(); video.pause(); document.body.classList.remove('process-reel-modal-open');` : ''} };\n}\n`);
}
