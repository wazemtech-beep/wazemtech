const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../src/components');
const edits = {
 'TeamSection.tsx': [['Creative Direction','Waseem Akram'],['Web & UI Design','Waliha Idrees'],['Development','Fahad Hussain'],['AI & Automation','Muhammad Fasih'],['The expertise','The team'],['OUR EXPERTISE','OUR TEAM'],['Our expertise','Our team'],['/sections/vivid-theory-our-team/chloe.png','/sections/vivid-theory-our-team/david.png']],
 'GrowthSection.tsx': [['Custom AI solutions built around your business needs.','25+ demo projects across branding, websites and software.'],['Custom AI solutions','Project experience'],['>\n                AI\n','>\n                25+\n'],['Connected workflows','Demo client portfolio'],['<strong>Connected</strong> workflows','<strong>15+</strong> demo clients'],['Build','4'],['From idea to working software.','Creative and technical team members.'],['Empowering teams with intelligent tools that turn complex data into actionable business outcomes daily.','Illustrative portfolio figures while our verified client results are being prepared.']],
 'ProcessSection.tsx': [['12:33 MINS','STUDIO REEL'],['(2012-26&#169;)','WAZEMTECH'],['(2012-26©)','WAZEMTECH'],['Mira Studio reel','Studio reel preview']],
};
for(const [file,pairs] of Object.entries(edits)){
 const dest=path.join(root,file);let text=fs.readFileSync(dest,'utf8');
 for(const [a,b] of pairs)text=text.replaceAll(a,b);
 fs.writeFileSync(dest,text);
}
