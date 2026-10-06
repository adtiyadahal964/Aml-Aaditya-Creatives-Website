import { mkdir, rm, writeFile } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
await mkdir(out, { recursive: true });

const nav = [
  ['Home', '/'], ['About Me', '/about/'], ['Services', '/services/'],
  ['Projects', '/projects/'], ['Blog', '/blog/'], ['Contact', '/contact/']
];
const serviceNavigation = [
  ['AI-Powered Digital Marketing', '/services/#ai-marketing'],
  ['Meta Ads', '/services/#meta-ads'],
  ['Content Marketing', '/services/#content-marketing'],
  ['Email Marketing', '/services/#email-marketing'],
  ['Websites &amp; Landing Pages', '/services/#websites-landing-pages'],
  ['SEO', '/services/#seo'],
  ['Lead Generation', '/services/#lead-generation']
];
const footerServices = [
  ['AI-Powered Digital Marketing', 'ai-marketing'],
  ['Meta Ads', 'meta-ads'],
  ['Content Marketing', 'content-marketing'],
  ['Email Marketing', 'email-marketing'],
  ['Websites &amp; Landing Pages', 'websites-landing-pages'],
  ['SEO', 'seo'],
  ['Lead Generation', 'lead-generation']
];
const socialPlatforms = ['LinkedIn', 'Instagram', 'Facebook', 'YouTube', 'WhatsApp'];

function header(active) {
  return `<header class="site-header"><div class="shell header-inner">
    <a class="brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([label,href])=>label === 'Services' ? `<div class="nav-dropdown" data-nav-dropdown><button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-controls="services-dropdown" aria-haspopup="true"${active===href?' aria-current="page"':''}><span class="nav-label">${label}</span><svg class="dropdown-arrow" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div id="services-dropdown" class="nav-dropdown-menu">${serviceNavigation.map(([name,url])=>`<a href="${url}"><span class="nav-label">${name}</span></a>`).join('')}</div></div>` : `<a href="${href}"${active===href?' aria-current="page"':''}><span class="nav-label">${label}</span></a>`).join('')}<a class="nav-cta" href="/consultation/"${active==='/consultation/'?' aria-current="page"':''}>Book a Free Consultation</a></nav>
    <div class="header-controls"><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to light theme" aria-pressed="false"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.6 8.6 1 0 0 20.2 15.4Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span class="sr-only">Switch to light theme</span></button><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button></div>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-top"><div class="footer-intro"><a class="brand footer-brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a><p><strong>AI • Digital Marketing • Growth</strong><br>Helping small and medium businesses use AI and digital marketing to build better marketing systems and create opportunities for growth.</p><a class="footer-consultation" href="/consultation/">Book a Free Consultation</a></div><div class="footer-links"><div class="footer-column"><h2>Navigate</h2><ul><li><a href="/">Home</a></li><li><a href="/about/">About Me</a></li><li><a href="/services/">Services</a></li><li><a href="/projects/">Projects</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul></div><div class="footer-column"><h2>Services</h2><ul>${footerServices.map(([name,id])=>`<li><a href="/services/#${id}">${name}</a></li>`).join('')}</ul></div><div class="footer-column"><h2>Connect/Follow</h2><ul>${socialPlatforms.map(name=>`<li><span class="social-pending">${name}</span></li>`).join('')}</ul><p class="social-note">Profile links coming soon.</p></div></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Aaditya Creatives. All rights reserved.</span><div><a href="/privacy/">Privacy placeholder</a><a href="/terms/">Terms placeholder</a></div></div></footer>`;
}

function cta(text='Ready to Build a Clearer Marketing Plan?', detail='Book a free consultation to discuss your business, marketing challenges, and growth opportunities. You’ll receive a customized Digital Marketing Plan with practical actions you can start implementing immediately.', button='Book a Free Consultation', note='Free • No obligation • Tailored to your business') {
  return `<section class="cta-band"><div class="shell cta-inner"><div><span class="eyebrow light">FREE CONSULTATION</span><h2>${text}</h2><p>${detail}</p><p class="cta-note">${note}</p></div><a class="button button-light" href="/consultation/">${button}</a></div></section>`;
}

function page({title,description,active='/',body}) {
  return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#070A0F"><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><title>${title}</title><script>try{const savedTheme=localStorage.getItem('aaditya-theme');if(savedTheme==='light'){document.documentElement.dataset.theme='light';document.querySelector('meta[name="theme-color"]').content='#FEF2A0'}}catch{}</script><link rel="icon" type="image/png" href="/aaditya-logo.png"><link rel="stylesheet" href="/style.css"><script src="/site.js" defer></script></head><body>${header(active)}<main id="main">${body}</main>${footer()}</body></html>`
    .replace(/class="([^"]*)" href="\/consultation\/"/g, 'class="$1 consultation-action" href="/consultation/"')
    .replaceAll('href="/consultation/"', 'href="/consultation/" data-conversion="consultation-intent"')
    .replaceAll('class="button button-primary" href="#booking"', 'class="button button-primary consultation-action" href="#booking"')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*consultation-action[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="consultation-action-label">$2</span>$3')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*\bbutton\b[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="button-label">$2</span>$3');
}

const featuredServices = [
  {id:'ai-marketing',n:'01',tag:'AI-POWERED MARKETING',name:'AI-Powered Digital Marketing',headline:'Work smarter, not just harder.',problem:'Use AI thoughtfully to research audiences, create content, analyze data, and improve repetitive workflows.'},
  {id:'meta-ads',n:'02',tag:'META ADS',name:'Meta Ads',headline:'Reach the people most likely to become your customers.',problem:'Build a focused Facebook and Instagram advertising approach around your audience, offer, and goals.'},
  {id:'content-marketing',n:'03',tag:'CONTENT MARKETING',name:'Content Marketing',headline:'Create content that has a purpose.',problem:'Develop useful content that attracts attention, builds trust, and supports the customer journey.'},
  {id:'email-marketing',n:'04',tag:'EMAIL MARKETING',name:'Email Marketing',headline:'Stay connected with people who already showed interest.',problem:'Use email to nurture leads, communicate with customers, and support repeat business.'},
  {id:'websites-landing-pages',n:'05',tag:'WEBSITES &amp; LANDING PAGES',name:'Websites &amp; Landing Pages',headline:'Present your business clearly and guide visitors toward action.',problem:'Professional websites and focused landing pages designed to present your business clearly, build trust, and guide visitors toward taking action.'},
  {id:'seo',n:'06',tag:'SEO',name:'SEO',headline:'Help people find and understand your website.',problem:'Improve page structure, useful content, and on-page basics to support organic discovery.'},
  {id:'lead-generation',n:'07',tag:'LEAD GENERATION',name:'Lead Generation',headline:'Make it easier for interested visitors to take the next step.',problem:'Review calls to action, landing pages, and follow-up opportunities across your marketing.'}
];

const home = page({
  title:'AI & Digital Marketing for Business Growth | Aaditya Creatives',
  description:'I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.',
  body:`<section class="hero"><div class="shell hero-grid"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span> AI-POWERED DIGITAL MARKETING FOR GROWING BUSINESSES</span><h1>Grow Your Business with <em>Smarter Digital Marketing</em></h1><p class="hero-lead">I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.</p><div class="hero-actions"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a><a class="button button-secondary" href="/services/">Explore My Services</a></div><p class="hero-note">Get a customized Digital Marketing Plan with practical steps you can start implementing immediately.</p></div><figure class="hero-photo"><img src="/hero-portrait.png" width="1024" height="1536" alt="Portrait of Aaditya against a warm golden background" fetchpriority="high" decoding="async"><figcaption>Aaditya Creatives · AI · Digital Marketing · Growth</figcaption></figure></div></section>
  <section class="section intro-section"><div class="shell intro-grid"><div><span class="eyebrow">COMMON CHALLENGES</span><h2 class="display-title">Is your marketing taking time without producing <em>enough results?</em></h2><p class="section-lead">Without a clear plan, marketing can become confusing, expensive, and difficult to manage.</p></div><ul class="challenge-list"><li>Not receiving enough leads or enquiries</li><li>Spending money without knowing what is working</li><li>Posting content without a clear strategy</li><li>Unsure which marketing channels to use</li><li>Interested in AI but unsure how to apply it</li><li>Managing marketing without an internal marketing team</li></ul></div></section>
  <section class="section tint-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">A CLEARER WAY FORWARD</span><h2 class="display-title">AI-powered digital marketing can help you <em>move forward.</em></h2></div><p class="section-head-note">AI supports the work. Your business goals shape the plan.</p></div><p class="solution-copy">AI-powered digital marketing can help you understand your audience, improve your content, choose better marketing channels, and work more efficiently. I start by understanding your business and then identify practical marketing actions based on your goals.</p><div class="solution-steps"><article><span>01</span><h3>Understand Your Business</h3><p>Discuss your business, audience, goals, challenges, and current marketing.</p></article><article><span>02</span><h3>Find the Right Opportunities</h3><p>Identify useful marketing channels, AI tools, and practical improvements.</p></article><article><span>03</span><h3>Create Your Marketing Plan</h3><p>Get a customized plan with clear actions your business can start implementing.</p></article></div></div></section>
  <section class="section services-preview"><div class="shell"><div class="section-head"><div><span class="eyebrow">SERVICES</span><h2 class="display-title">Practical support for your <em>business goals.</em></h2></div><a class="underlined-link" href="/services/">Explore Services</a></div><div class="service-grid">${featuredServices.map(s=>`<article class="service-card"><span class="service-index">${s.n} / ${s.tag}</span><h3>${s.name}</h3><p>${s.headline} ${s.problem}</p><a class="card-link" href="/services/#${s.id}">Learn More ↗</a></article>`).join('')}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></div></div></section>
  <section class="section process-section"><div class="shell process-grid"><div><span class="eyebrow">HOW IT WORKS</span><h2 class="display-title">A practical process, built around <em>your business.</em></h2><a class="button button-primary process-cta" href="/consultation/">Book a Free Consultation</a></div><div class="steps"><div class="step"><span>01</span><div><h3>Understand Your Business</h3><p>First, I learn about your business, audience, goals, and current marketing.</p></div></div><div class="step"><span>02</span><div><h3>Find the Right Opportunities</h3><p>I identify useful marketing channels, AI tools, and practical improvements.</p></div></div><div class="step"><span>03</span><div><h3>Create Your Marketing Plan</h3><p>You get practical recommendations and a clear action plan that you can start implementing.</p></div></div></div></div></section>
  <section class="section portfolio-preview"><div class="shell portfolio-row"><div><span class="eyebrow">PROJECTS</span><h2 class="display-title">Practical work, <em>clearly labeled.</em></h2><p>Explore practice, academic, personal, and demonstration work as it becomes ready to share. No client results or projects are invented.</p><a class="underlined-link" href="/projects/">View Projects</a></div><div class="project-placeholder"><div class="placeholder-top"><span>PROJECT LIBRARY</span><span>IN PROGRESS</span></div><div class="placeholder-lines"><span></span><span></span><span></span></div><div class="placeholder-bottom"><strong>Practice · Academic · Personal · Demo</strong><span>Project examples will be added when they are ready to share.</span></div></div></div></section>
  <section class="section tint-section"><div class="shell skills-grid"><div><span class="eyebrow">SKILLS &amp; LEARNING</span><h2 class="display-title">Building practical skills in <em>digital marketing.</em></h2><p class="section-lead">I’m developing my skills through practical projects, learning, experimentation, and real-world application.</p></div><div class="skill-list"><span>AI for marketing workflows</span><span>Meta Ads</span><span>Content marketing</span><span>Email marketing</span><span>Websites &amp; landing pages</span><span>SEO fundamentals</span><span>Lead generation</span></div></div></section>
  <section class="section"><div class="shell faq-wrap"><div><span class="eyebrow">FAQ</span><h2 class="display-title">A few helpful <em>answers.</em></h2></div><div class="faq-list"><details><summary>What happens during a free consultation?</summary><p>We discuss your business, audience, current marketing, goals, and challenges. I’ll identify practical opportunities and outline a customized Digital Marketing Plan.</p></details><details><summary>Who is the consultation for?</summary><p>It is for small and medium-sized businesses looking for practical ways to improve their online presence, attract potential customers, or generate leads.</p></details><details><summary>Do I need to be using AI already?</summary><p>No. We can discuss where AI may help your marketing and which tasks are better handled with a straightforward approach.</p></details><details><summary>Will I receive a plan I can use?</summary><p>The consultation is focused on practical recommendations and clear next steps tailored to your business.</p></details></div></div></section>
  ${cta()}`
});

function innerHero(kicker, heading, lead, extra='', className='') {
  return `<section class="inner-hero ${className}"><div class="shell inner-hero-grid"><div><span class="eyebrow"><span class="eyebrow-line"></span> ${kicker}</span><h1>${heading}</h1><p>${lead}</p></div>${extra}</div></section>`;
}

const about = page({
  title:'About Aaditya | Aaditya Creatives',
  description:"I'm building my career around the intersection of AI, digital marketing, and business growth.",
  active:'/about/',
  body:`${innerHero('ABOUT ME', 'AI, digital marketing, and <em>business growth.</em>', "I'm building my career around the intersection of AI, digital marketing, and business growth.", '<figure class="about-hero-photo"><img src="/about-portrait.png" width="1114" height="1412" alt="Portrait of Aaditya against a teal background" fetchpriority="high" decoding="async"><figcaption>Understand the business → Find the opportunity → Build the strategy → Take action.</figcaption></figure>', 'about-image-hero')}
  <section class="section"><div class="shell story-grid"><div><span class="eyebrow">MY PURPOSE</span><h2 class="display-title">Marketing should have a <em>clear purpose.</em></h2></div><div class="rich-copy"><p>I believe digital marketing shouldn't be about simply posting more content or spending more money on ads. It should have a clear purpose — reaching the right people, building trust, generating leads, and helping businesses grow.</p><p>My goal is to help small and medium business owners understand where their marketing can improve and use AI and digital tools to create a more effective marketing system.</p><p>I'm continuously developing my skills through practical projects, learning, experimentation, and real-world application.</p></div></div></section>
  <section class="section tint-section"><div class="shell intro-grid"><div><span class="eyebrow">MY APPROACH</span><h2 class="display-title">Understand the business. <em>Take action.</em></h2></div><div class="intro-copy"><p class="flow-line">Understand the business → Find the opportunity → Build the strategy → Take action.</p><p>I focus on simple, practical marketing rather than complicated strategies that are difficult to use.</p><a class="underlined-link" href="/consultation/">Book a Free Consultation</a></div></div></section>
  ${cta()}`
});

const services = page({
  title:'AI & Digital Marketing Services | Aaditya Creatives',
  description:'AI-powered digital marketing, Meta Ads, content marketing, email marketing, websites and landing pages, SEO, and lead generation for growing businesses.',
  active:'/services/',
  body:`${innerHero('SERVICES', 'Every business <em>is different.</em>', "That's why I don't believe in using the same marketing approach for everyone.", '<div class="hero-aside"><span class="aside-label">THE APPROACH</span><p>I combine AI tools, digital marketing strategies, and practical execution to help businesses improve their online presence and move closer to their growth goals.</p></div>')}
  <section class="section"><div class="shell"><div class="section-head"><div><span class="eyebrow">EXPLORE MY SERVICES</span><h2 class="display-title">Support built around <em>your goals.</em></h2></div></div><div class="featured-services">${featuredServices.map(s=>`<article id="${s.id}" class="featured-service"><div class="service-meta"><span>${s.n}</span><span>${s.tag}</span></div><div><h3>${s.name}</h3><p class="service-problem">${s.headline}</p><p>${s.problem}</p></div><div><span class="mini-label">NEXT STEP</span><p>Discuss the goals and scope of this service for your business.</p><a class="underlined-link" href="/consultation/">Book a Free Consultation</a></div></article>`).join('')}</div></div></section>
  ${cta()}`
});

const projects = page({
  title:'Projects | Aaditya Creatives',
  description:'Selected projects, experiments, and marketing work that demonstrate the application of AI and digital marketing concepts.',
  active:'/projects/',
  body:`${innerHero('PROJECTS', 'Projects, experiments, and <em>marketing work.</em>', "Here you'll find selected projects, experiments, and marketing work that demonstrate how I apply AI and digital marketing concepts to real business situations.")}
  <section class="section"><div class="shell"><div class="portfolio-status"><div><span class="eyebrow">PORTFOLIO IN PROGRESS</span><h2>Examples will be added as they are ready to share.</h2><p>Project cards will distinguish personal, practice, academic, demo, and client work. No client results are presented without real supporting work.</p></div><span class="status-pill">NO PROJECTS PUBLISHED YET</span></div><div class="case-grid"><div><span class="eyebrow">EXAMPLE PROJECT CARD</span><h2 class="display-title">Project <em>Name</em></h2><p class="section-lead">Short description of the problem, strategy, tools used, and outcome.</p></div><div><span class="eyebrow">PROJECT LABELS</span><div class="skill-list"><span>Personal Project</span><span>Practice Project</span><span>Academic Project</span><span>Demo Project</span><span>Client Project</span></div></div></div><p class="blog-footnote">As I gain real client experience, this section can evolve into detailed case studies with genuine results.</p></div></section>
  ${cta()}`
});

const plannedArticles = [
  {title:'How AI Can Make Your Digital Marketing Smarter',excerpt:"AI isn't here to replace marketing strategy. It's a tool that can help you research faster, understand your audience, create better content, and improve your marketing workflow."},
  {title:'Why Your Facebook Ads May Not Be Getting Results',excerpt:"Spending more money isn't always the answer. Learn how audience, offer, creative, targeting, and landing pages work together to influence your ad performance."},
  {title:'What Should Your Business Post on Social Media?',excerpt:'If you\'re constantly asking, "What should I post today?", you may need a content strategy instead of more content ideas. Learn how to create content around your customers\' problems, questions, and buying journey.'},
  {title:'Why Email Marketing Still Matters for Small Businesses',excerpt:'Social media can help you reach people, but email gives you a direct way to communicate with people who already know your business. Discover simple ways to use email to nurture leads and stay connected with customers.'},
  {title:'Is Your Website Helping You Get Customers?',excerpt:"A beautiful website isn't enough if visitors don't understand what you offer or what they should do next. Learn the key elements every business website needs to turn visitors into potential customers."},
  {title:'Why Your Business Needs a Digital Marketing Strategy',excerpt:"Being active on multiple platforms doesn't automatically mean you're doing digital marketing effectively. Learn why having a clear strategy can help you focus your time, budget, and effort on the activities that matter most."}
];
const blog = page({
  title:'Blog | Aaditya Creatives',
  description:'Simple insights about AI, digital marketing, and business growth to help business owners make better marketing decisions.',
  active:'/blog/',
  body:`${innerHero('BLOG', 'Simple insights for <em>better marketing decisions.</em>', 'Simple insights about AI, digital marketing, and business growth — created to help business owners make better marketing decisions.')}
  <section class="section"><div class="shell"><div class="portfolio-status"><div><span class="eyebrow">UPCOMING ARTICLES</span><h2>Articles are in development.</h2><p>The summaries below preview planned articles. Full articles will be linked here when published.</p></div><span class="status-pill">COMING SOON</span></div><div class="topic-grid">${plannedArticles.map((article,i)=>`<article class="topic-card"><span>UPCOMING ARTICLE / ${String(i+1).padStart(2,'0')}</span><h3>${article.title}</h3><p>${article.excerpt}</p><small>Read Article → Coming soon</small></article>`).join('')}</div></div></section>
  ${cta('Reading about marketing is a good start.', 'Understanding how it applies to your specific business is even more valuable. Book a free consultation and get a customized digital marketing plan based on your business, goals, and current situation.')}`
});

const inquiryForm = (kind) => `<form class="inquiry-form" data-copy-form="${kind}" novalidate>
  <p class="required-help">Fields marked <span aria-hidden="true">*</span> are required.</p>
  <div class="field-row">
    <label><span class="field-title">Name <b aria-hidden="true">*</b></span><input name="name" type="text" autocomplete="name" required minlength="2"></label>
    <label><span class="field-title">Email <b aria-hidden="true">*</b></span><input name="email" type="email" autocomplete="email" required></label>
  </div>
  <label><span class="field-title">Subject or enquiry type <b aria-hidden="true">*</b></span><select name="subject" required><option value="">Choose an enquiry type</option><option>General question</option><option>Project enquiry</option><option>Partnership idea</option><option>Other</option></select></label>
  <label><span class="field-title">Message <b aria-hidden="true">*</b></span><textarea name="message" rows="6" required minlength="10" placeholder="How can I help?"></textarea></label>
  <button class="button button-primary" type="submit">Send Message</button>
  <p class="form-note">This form prepares a copyable message on your device. It does not send or store your details.</p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  <div class="prepared-message" hidden><label>Copy your prepared message<textarea readonly rows="8"></textarea></label><button class="button button-outline" type="button" data-copy-button>Copy message</button><p class="copy-status" data-copy-status role="status" aria-live="polite"></p></div>
</form>`;

const consultationForm = () => `<form class="inquiry-form consultation-form" data-copy-form="consultation" novalidate>
  <p class="required-help">Fields marked <span aria-hidden="true">*</span> are required.</p>
  <p class="progress-status" data-progress-status role="status" aria-live="polite">0 required fields complete.</p>
  <div class="consultation-fields" data-consultation-fields>
  <span class="progress-rail" aria-hidden="true"><span></span></span>
  <div class="field-row">
    <div class="form-field"><label for="consultation-full-name"><span class="field-title">Full Name <b aria-hidden="true">*</b></span></label><input id="consultation-full-name" name="full_name" type="text" autocomplete="name" required minlength="2" placeholder="Enter your full name" aria-describedby="consultation-full-name-error"><span class="field-error" id="consultation-full-name-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-business"><span class="field-title">Business / Company Name <b aria-hidden="true">*</b></span></label><input id="consultation-business" name="business_name" type="text" autocomplete="organization" required minlength="2" placeholder="Enter your business or company name" aria-describedby="consultation-business-error"><span class="field-error" id="consultation-business-error" aria-live="polite"></span></div>
  </div>
  <div class="field-row">
    <div class="form-field"><label for="consultation-email"><span class="field-title">Email Address <b aria-hidden="true">*</b></span></label><input id="consultation-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" aria-describedby="consultation-email-error"><span class="field-error" id="consultation-email-error" aria-live="polite"></span></div>
    <div class="form-field phone-field" data-phone-step><label id="consultation-phone-label" for="consultation-phone"><span class="field-title">Phone / WhatsApp Number <span class="optional-indicator">Optional</span></span></label><div class="phone-composite"><div class="country-code-picker" data-country-picker><button class="country-code-trigger" id="consultation-country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="consultation-country-popover" aria-describedby="consultation-phone-help consultation-phone-error"><span data-selected-country>Select code</span><svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div class="country-code-popover" id="consultation-country-popover" data-country-popover hidden><label class="sr-only" for="consultation-country-search">Search countries or calling codes</label><input class="country-search" id="consultation-country-search" type="search" inputmode="search" autocomplete="off" placeholder="Search country or code" aria-controls="consultation-country-list"><div class="country-search-status sr-only" data-country-status role="status" aria-live="polite"></div><ul class="country-code-list" id="consultation-country-list" role="listbox" aria-label="International calling codes" data-country-list></ul></div><input name="phone_country_code" type="hidden" data-country-code></div><input id="consultation-phone" name="phone_whatsapp" type="tel" autocomplete="tel-national" inputmode="tel" data-progress-field placeholder="Enter your phone or WhatsApp number" aria-describedby="consultation-phone-help consultation-phone-error"></div><span class="field-help" id="consultation-phone-help">Optional — select a calling code if you enter a number.</span><span class="field-error" id="consultation-phone-error" aria-live="polite"></span></div>
  </div>
  <div class="form-field"><label for="consultation-website"><span class="field-title">Website / Social Media</span></label><input id="consultation-website" name="website_social" type="text" inputmode="url" placeholder="Website or social media profile link" aria-describedby="consultation-website-help"><span class="field-help" id="consultation-website-help">Optional — enter a website or social media address.</span></div>
  <div class="form-field"><label for="consultation-challenge"><span class="field-title">What is your biggest marketing challenge right now? <b aria-hidden="true">*</b></span></label><select id="consultation-challenge" name="marketing_challenge" required aria-describedby="consultation-challenge-error"><option value="">Select your biggest challenge</option><option>Getting more customers</option><option>Generating leads</option><option>Improving Meta Ads</option><option>Content &amp; social media</option><option>Email marketing</option><option>Website / landing page</option><option>Using AI in my marketing</option><option>Other</option></select><span class="field-error" id="consultation-challenge-error" aria-live="polite"></span></div>
  <div class="form-field conditional-field" data-other-challenge hidden><label for="consultation-other-challenge"><span class="field-title">Please describe your marketing challenge <b aria-hidden="true">*</b></span></label><input id="consultation-other-challenge" name="other_challenge" type="text" disabled placeholder="Describe your marketing challenge" aria-describedby="consultation-other-challenge-error"><span class="field-error" id="consultation-other-challenge-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-goal"><span class="field-title">What is your main goal? <b aria-hidden="true">*</b></span></label><textarea id="consultation-goal" name="main_goal" rows="5" required minlength="10" placeholder="Describe what you would like to achieve through marketing" aria-describedby="consultation-goal-error"></textarea><span class="field-error" id="consultation-goal-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-additional"><span class="field-title">Anything else you'd like me to know?</span></label><textarea id="consultation-additional" name="additional_info" rows="4" placeholder="Share any additional details that may help me prepare for our consultation"></textarea></div>
  <div class="field-row">
    <div class="form-field"><label for="consultation-date"><span class="field-title">Preferred consultation date</span></label><input id="consultation-date" name="preferred_date" type="date" aria-describedby="consultation-date-error"><span class="field-error" id="consultation-date-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-time"><span class="field-title">Preferred consultation time</span></label><select id="consultation-time" name="preferred_time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>I'm flexible</option></select><span class="field-help" data-consultation-timezone>Time zone: your local time</span></div>
  </div>
  </div>
  <button class="button button-primary consultation-action" type="submit">Book My Free Consultation</button>
  <p class="form-note privacy-note">Your information will only be used to contact you about your consultation request.</p>
  <p class="form-note">This form prepares a copyable request on your device. It does not send or store your details.</p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  <div class="prepared-message" hidden><label>Copy your consultation request<textarea readonly rows="10"></textarea></label><button class="button button-outline" type="button" data-copy-button>Copy request</button><p class="copy-status" data-copy-status role="status" aria-live="polite"></p></div>
</form>`;

const contact = page({
  title:'Contact Aaditya | Aaditya Creatives',
  description:'Contact Aaditya with a general question, project enquiry, or partnership idea.',
  active:'/contact/',
  body:`${innerHero('CONTACT', 'Contact <em>Aaditya.</em>', "Have a general question, project enquiry, or partnership idea? Send me a message and I’ll get back to you.")}
  <section class="section"><div class="shell contact-grid"><div><span class="eyebrow">GENERAL ENQUIRIES</span><h2 class="display-title">Let’s start a <em>conversation.</em></h2><p class="section-lead">Use this page for general questions, project enquiries, and partnership ideas. The form is intentionally short and separate from the consultation request.</p><a class="button button-primary" href="#message">Send Message</a><div class="contact-placeholder"><strong>Direct contact details coming soon</strong><p>A verified email address and social profile links have not been provided yet. The form prepares a message you can copy.</p></div></div><div class="form-card" id="message"><span class="mini-label">CONTACT AADITYA</span><h3>Send a general message</h3><p>Share your question or enquiry and include the details needed for a useful reply.</p>${inquiryForm('contact')}</div></div></section>
  <section class="section tint-section"><div class="shell consultation-invite"><div><span class="eyebrow">MARKETING SUPPORT</span><h2 class="display-title">Looking for a <em>Marketing Plan?</em></h2><p>Book a free consultation to discuss your business, current marketing, and possible next steps.</p></div><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></div></section>`
});

const consultation = page({
  title:'Book a Free Consultation | Aaditya Creatives',
  description:'Book a free consultation and receive a customized digital marketing plan with practical recommendations for your business.',
  active:'/consultation/',
  body:`${innerHero('FREE CONSULTATION', 'Get a Customized <em>Digital Marketing Plan.</em>', 'Book a free consultation to discuss your business, marketing challenges, and growth opportunities. You’ll receive clear, practical recommendations you can start implementing immediately.', '<div class="hero-aside consultation-aside"><span class="aside-label">FREE · NO OBLIGATION</span><p>A focused conversation about your business and the next steps that make sense for you.</p><a class="button button-primary" href="#booking">Book a Free Consultation</a></div>')}
  <section class="section"><div class="shell consultation-grid"><div><span class="eyebrow">WHAT HAPPENS DURING THE CONSULTATION</span><h2 class="display-title">A focused conversation with <em>clear next steps.</em></h2><p class="section-lead">The discussion is shaped around your business, audience, current marketing, and practical opportunities.</p></div><ul class="benefit-list"><li>Discuss the business and its goals</li><li>Understand the target customers</li><li>Review the current marketing situation</li><li>Identify problems and opportunities</li><li>Explore practical uses of AI and digital marketing</li><li>Outline clear next steps</li></ul></div></section>
  <section class="section tint-section"><div class="shell consultation-grid"><div><span class="eyebrow">WHO IS THIS CONSULTATION FOR?</span><h2 class="display-title">Practical support for businesses seeking <em>clearer direction.</em></h2></div><ul class="benefit-list"><li>Small and medium-sized business owners</li><li>Entrepreneurs</li><li>Businesses that need more leads or enquiries</li><li>Businesses without an internal marketing team</li><li>Business owners who want to use AI in their marketing</li><li>Businesses that need a clearer marketing direction</li></ul></div></section>
  <section class="section"><div class="shell"><div class="section-head"><div><span class="eyebrow">HOW IT WORKS</span><h2 class="display-title">Three simple <em>steps.</em></h2></div></div><div class="solution-steps consultation-process"><article><span>01</span><h3>Book Your Call</h3><p>Choose a suitable time and provide a few details about your business.</p></article><article><span>02</span><h3>Discuss Your Marketing</h3><p>Talk about your goals, challenges, audience, and current marketing.</p></article><article><span>03</span><h3>Get Your Customized Plan</h3><p>Receive practical marketing actions you can begin implementing.</p></article></div></div></section>
  <section class="section tint-section" id="booking"><div class="shell booking-grid"><div><span class="eyebrow">BOOK A FREE CONSULTATION</span><h2 class="display-title">A plan tailored to <em>your business.</em></h2><p>Free • No obligation • Tailored to your business</p><p>Provide the essential details and your preferred timing. The form prepares a copyable request on your device and does not submit a booking or send your information.</p></div><div class="form-card consultation-card"><span class="mini-label">CONSULTATION REQUEST</span><h3>Book a Free Consultation</h3><p>Tell me about your business, your biggest marketing challenge, and what you want to achieve. I’ll use these details to prepare for a focused, practical consultation.</p>${consultationForm()}</div></div></section>`
});

function legalPlaceholder(type, details) {
  return page({title:`${type} Placeholder | Aaditya Creatives`,description:`Aaditya Creatives ${type.toLowerCase()} page placeholder. Final information will be added and reviewed before the site is used to collect inquiries.`,body:`${innerHero(`${type.toUpperCase()} / PLACEHOLDER`, `${type} information is <em>being prepared.</em>`, `${details} This page is a clearly marked placeholder and is not a finalized legal document.`)}<section class="section"><div class="shell legal-box"><span class="eyebrow">TO BE COMPLETED</span><h2>Before the site starts collecting information</h2><p>Aaditya needs to provide the relevant business and contact details, confirm the tools in use, and review appropriate legal wording. The inquiry form currently prepares a message locally and does not transmit it.</p><a class="underlined-link" href="/contact/">Return to contact</a></div></section>`});
}
const privacy = legalPlaceholder('Privacy Policy','The policy will explain what information the site collects, how it is used, and which services process it once those tools are configured.');
const terms = legalPlaceholder('Terms','The terms will describe how the website and any future services are offered once Aaditya confirms the relevant business details.');

async function writeRoute(route, html) {
  const englishDirectory = route ? new URL(`${route}/`, out) : out;
  await mkdir(englishDirectory, {recursive:true});
  await writeFile(new URL('index.html', englishDirectory), html);
}

function redirectPage(destination) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${destination}"><title>Page moved | Aaditya Creatives</title><script>location.replace(${JSON.stringify(destination)}+location.search)</script></head><body><p>This page has moved. <a href="${destination}">Continue to the updated page</a>.</p></body></html>`;
}

async function writeRedirect(route, destination) {
  const directory = new URL(`${route}/`, out);
  await mkdir(directory, {recursive:true});
  await writeFile(new URL('index.html', directory), redirectPage(destination));
}
const routes = [
  ['', home], ['about', about], ['services', services], ['projects', projects],
  ['blog', blog], ['contact', contact], ['consultation', consultation], ['privacy', privacy], ['terms', terms]
];
await Promise.all([
  rm(new URL('ne/', out), {recursive:true, force:true}),
  rm(new URL('services/google-ads/', out), {recursive:true, force:true}),
  rm(new URL('services/digital-marketing/', out), {recursive:true, force:true}),
  rm(new URL('services/website-design/', out), {recursive:true, force:true})
]);
await Promise.all(routes.map(([route, html]) => writeRoute(route, html)));
await writeFile(new URL('_redirects', out), [
  '/ne/* /:splat 301',
  '/services/google-ads/* /services/ 301',
  '/services/digital-marketing/* /services/#ai-marketing 301',
  '/services/website-design/* /services/#websites-landing-pages 301'
].join('\n'));
await Promise.all([
  ...routes.map(([route]) => writeRedirect(`ne/${route}`, route ? `/${route}/` : '/')),
  writeRedirect('services/google-ads', '/services/'),
  writeRedirect('services/digital-marketing', '/services/#ai-marketing'),
  writeRedirect('services/website-design', '/services/#websites-landing-pages')
]);
console.log('Built 9 English pages and legacy redirects');
