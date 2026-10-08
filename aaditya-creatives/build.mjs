import { mkdir, rm, writeFile } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
await mkdir(out, { recursive: true });

const nav = [
  ['Home', '/'], ['About Me', '/about/'], ['Services', '/services/'],
  ['Projects', '/projects/'], ['Blog', '/blog/'], ['Contact', '/contact/']
];
const servicesData = [
  {id:'ai-marketing',slug:'ai-powered-digital-marketing',n:'01',tag:'AI-POWERED MARKETING',name:'AI-Powered Digital Marketing',short:'Use practical AI tools and a clear marketing strategy to understand your audience, improve your marketing, and work more efficiently.',intro:'Marketing can take a lot of time, especially when you are running a business without a dedicated marketing team. AI-powered digital marketing can help make research, planning, content creation, and everyday marketing tasks more efficient.',what:'AI-powered digital marketing combines useful AI tools with practical marketing strategy. AI can support the work, but every recommendation should still be based on your business, audience, goals, and available resources.',problems:['You do not have a clear marketing plan.','Marketing tasks take too much time.','You are unsure which AI tools are useful.','Your content and marketing activities are inconsistent.','You have information but find it difficult to turn it into action.'],help:'I first look at your business, customers, current marketing, and challenges. I then identify where AI and digital marketing tools may help you research, plan, create, organize, and improve your marketing work.',includes:['Review of your current marketing','Audience and competitor research','Marketing plan recommendations','AI tool recommendations','Content planning support','Practical AI-assisted workflows','Campaign and channel recommendations'],closing:'The goal is to give your business a clearer marketing direction and help you use AI in a practical, manageable way.',icon:'spark'},
  {id:'meta-ads',slug:'meta-ads',n:'02',tag:'META ADS',name:'Meta Ads',short:'Reach potential customers through focused Facebook and Instagram advertising built around your audience, offer, and business goals.',intro:'Running Facebook and Instagram ads without a clear audience, offer, or campaign objective can quickly waste your advertising budget.',what:'Meta Ads allow businesses to reach potential customers across Facebook and Instagram. Campaigns can be created for awareness, website visits, messages, leads, and other business objectives.',problems:['Your business is not reaching enough potential customers.','You are unsure which audience to target.','Previous advertisements did not have a clear objective.','Your ad message or offer is not getting attention.','You do not know which parts of a campaign need improvement.'],help:'A structured Meta Ads approach connects your campaign goal, target audience, message, creative content, and destination. This gives the campaign a clearer purpose and makes its performance easier to understand.',includes:['Campaign objective planning','Audience research','Offer and message development','Ad copy recommendations','Creative direction','Campaign structure','Landing-page recommendations','Performance review and improvement suggestions'],closing:'Every campaign should be based on the business goal, available budget, and the customers you want to reach.',icon:'target'},
  {id:'content-marketing',slug:'content-marketing',n:'03',tag:'CONTENT MARKETING',name:'Content Marketing',short:'Plan and create useful content that communicates your value, builds trust, and keeps your business visible to potential customers.',intro:'Posting content without a plan can consume time without helping potential customers understand your business.',what:'Content marketing means creating useful information that answers customer questions, explains your services, and helps people understand why your business may be right for them.',problems:['You do not know what to post.','Your content is inconsistent.','Your message is unclear.','People see your business but do not understand its value.','Your content is not connected to a business goal.'],help:'A clear content plan gives your business useful topics, consistent messages, suitable formats, and a regular publishing direction. It helps every piece of content serve a purpose.',includes:['Content topic research','Content pillars','Content calendar planning','Post and article ideas','Caption and message development','Website content recommendations','AI-assisted content workflows','Calls to action'],closing:'Useful and consistent content can help your business remain visible, communicate clearly, and build trust over time.',icon:'content'},
  {id:'email-marketing',slug:'email-marketing',n:'04',tag:'EMAIL MARKETING',name:'Email Marketing',short:'Connect with leads and customers through helpful emails that support relationships, follow-ups, promotions, and repeat business.',intro:'Potential customers may visit your website or show interest without being ready to make a decision immediately. Without follow-up, they can easily forget your business.',what:'Email marketing helps businesses communicate directly with leads and customers through welcome emails, updates, helpful information, promotions, and follow-up messages.',problems:['Leads are not receiving regular follow-ups.','Customers do not hear from your business after their first interaction.','Promotions and updates are shared inconsistently.','Your business depends too much on social media to reach its audience.','You do not have a clear email communication plan.'],help:'An email strategy helps you organize what to send, who should receive it, and what action each email should encourage.',includes:['Email campaign planning','Welcome email sequences','Newsletter planning','Promotional emails','Lead follow-up emails','Audience grouping','Email copy','Clear calls to action'],closing:'Email marketing can help your business stay connected with interested people and continue the conversation after their first visit.',icon:'mail'},
  {id:'websites-landing-pages',slug:'websites-landing-pages',n:'05',tag:'WEBSITES &amp; LANDING PAGES',name:'Websites &amp; Landing Pages',short:'Present your business clearly with responsive websites and focused landing pages designed to guide visitors toward taking action.',intro:'A confusing, outdated, or poorly structured website can make potential customers leave before they understand what your business offers.',what:'A business website explains who you are, what you offer, and how visitors can contact you. A landing page focuses on one offer or campaign and guides visitors toward one clear action.',problems:['Visitors do not understand what your business offers.','Your website is difficult to use on mobile devices.','Important information is hard to find.','Your pages do not contain clear calls to action.','Advertising traffic is being sent to an unfocused page.','Visitors are not becoming enquiries.'],help:'A clear page structure, simple message, responsive layout, and focused call to action can help visitors find the information they need and decide what to do next.',includes:['Website structure planning','Landing-page planning','Content hierarchy','Responsive page design','Calls to action','Contact and lead forms','Conversion-focused sections','Basic SEO structure','Analytics and tracking preparation'],closing:'The goal is to create a clear online experience that presents your business professionally and guides visitors toward a useful next step.',icon:'window'},
  {id:'seo',slug:'seo',n:'06',tag:'SEO',name:'SEO',pageName:'Search Engine Optimization',short:'Improve your website’s visibility in search results through clearer content, stronger page structure, and practical search optimization.',intro:'A website cannot support your business if potential customers struggle to find it or search engines cannot clearly understand its pages.',what:'SEO improves the structure, content, and relevance of a website so search engines can better understand it and people can more easily discover useful pages.',problems:['Your website receives little search traffic.','Page titles and descriptions are unclear.','Website content does not match what customers search for.','Important services do not have focused pages.','The website structure is difficult to understand.','Useful content is missing.'],help:'SEO starts by understanding what potential customers search for and then improving the website’s pages, content, headings, links, and technical basics.',includes:['Keyword and topic research','Page-title recommendations','Meta-description recommendations','Heading and content structure','On-page SEO','Internal linking','Service-page recommendations','Blog topic planning','Basic technical review'],closing:'SEO is a long-term process that can improve how clearly your website communicates with both people and search engines. Specific rankings cannot be guaranteed.',icon:'search'},
  {id:'lead-generation',slug:'lead-generation',n:'07',tag:'LEAD GENERATION',name:'Lead Generation',short:'Create a clearer process for attracting potential customers, capturing their interest, and turning that interest into business enquiries.',intro:'Website visits, advertisements, and social media attention have limited value if interested people have no clear way to contact your business.',what:'Lead generation is the process of attracting potential customers, giving them a reason to show interest, and capturing the information needed for follow-up.',problems:['Your website receives visitors but few enquiries.','Potential customers do not know what action to take.','Your forms are too long or confusing.','Your business does not have a clear offer.','Leads are not followed up consistently.','Marketing channels are not connected to a lead process.'],help:'A lead-generation plan connects your audience, offer, traffic source, landing page, form, call to action, and follow-up process.',includes:['Ideal lead definition','Offer planning','Lead-capture forms','Landing-page recommendations','Campaign recommendations','Calls to action','Follow-up planning','Basic conversion tracking recommendations'],closing:'The purpose is to create a clearer journey from initial interest to a real business enquiry.',icon:'users'}
];

const serviceNavigation = servicesData.map(service => [service.name, `/services/${service.slug}/`]);
const footerServices = servicesData.map(service => [service.name, `/services/${service.slug}/`]);
const socialLinks = [
  {name:'LinkedIn',url:'https://www.linkedin.com/in/aaditya-dahal',label:'Visit Aaditya on LinkedIn',icon:'linkedin'},
  {name:'Facebook',url:'https://www.facebook.com/aditya.dahal.984',label:'Visit Aaditya on Facebook',icon:'facebook'},
  {name:'Instagram',url:'https://www.instagram.com/adityadahal0330/',label:'Visit Aaditya on Instagram',icon:'instagram'},
  {name:'WhatsApp',url:'https://wa.me/9779846701009',label:'Contact Aaditya on WhatsApp',icon:'whatsapp'}
];

function icon(name) {
  const icons = {
    spark:'<path d="M12 2l1.5 5.2L19 9l-5.5 1.8L12 16l-1.5-5.2L5 9l5.5-1.8L12 2Z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3m10 7h-3M12 22v-3M2 12h3"/>',
    content:'<path d="M6 3h9l3 3v15H6V3Z"/><path d="M15 3v4h4M9 11h6M9 15h6M9 19h4"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    window:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5M8 11h6M11 8v6"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    linkedin:'<path d="M6 9v10M6 5.5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 10v9"/>',
    facebook:'<path d="M14 8h4V3h-4a5 5 0 0 0-5 5v3H6v5h3v5h5v-5h4l1-5h-5V8a1 1 0 0 1 1-1"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    whatsapp:'<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.4 2.7 1.8 4.2 4.8 5l1-1.2 2 .9c-.3 1.5-1.4 2.3-2.8 2.2-3.7-.3-6.5-3-7-6.6-.2-1.3.6-2.4 2-2.8l1 2-1 1Z"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name] || icons.spark}</svg>`;
}

function socialGroup(className='social-icons') {
  return `<div class="${className}">${socialLinks.map(item=>`<a href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}" title="${item.name}">${icon(item.icon)}<span class="sr-only">${item.label}</span></a>`).join('')}</div>`;
}

function header(active) {
  return `<header class="site-header"><div class="shell header-inner">
    <a class="brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a>
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([label,href])=>label === 'Services' ? `<div class="nav-dropdown" data-nav-dropdown><button class="nav-dropdown-trigger" type="button" aria-expanded="false" aria-controls="services-dropdown" aria-haspopup="true"${active.startsWith('/services/')?' aria-current="page"':''}><span class="nav-label">${label}</span><svg class="dropdown-arrow" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div id="services-dropdown" class="nav-dropdown-menu">${serviceNavigation.map(([name,url])=>`<a href="${url}"${active===url?' aria-current="page"':''}><span class="nav-label">${name}</span></a>`).join('')}</div></div>` : `<a href="${href}"${active===href?' aria-current="page"':''}><span class="nav-label">${label}</span></a>`).join('')}<a class="nav-cta header-consultation-cta" href="/consultation/"${active==='/consultation/'?' aria-current="page"':''}>Book a Free Consultation</a></nav>
    <div class="header-controls"><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to light theme" aria-pressed="false"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.6 8.6 1 0 0 20.2 15.4Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span class="sr-only">Switch to light theme</span></button><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button></div>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-top"><div class="footer-intro"><a class="brand footer-brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a><p><strong>AI • Digital Marketing • Growth</strong><br>Helping small and medium businesses use AI and digital marketing to build better marketing systems and create opportunities for growth.</p><a class="footer-consultation" href="/consultation/">Book a Free Consultation</a></div><div class="footer-links"><div class="footer-column"><h2>Navigate</h2><ul><li><a href="/">Home</a></li><li><a href="/about/">About Me</a></li><li><a href="/services/">Services</a></li><li><a href="/projects/">Projects</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul></div><div class="footer-column"><h2>Services</h2><ul>${footerServices.map(([name,url])=>`<li><a href="${url}">${name}</a></li>`).join('')}</ul></div><div class="footer-column footer-social"><h2>Connect/Follow</h2>${socialGroup()}</div></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Aaditya Creatives. All rights reserved.</span><div><a href="/privacy/">Privacy placeholder</a><a href="/terms/">Terms placeholder</a></div></div></footer>`;
}

function cta(text='Ready to Build a Clearer Marketing Plan?', detail='Book a free consultation to discuss your business, marketing challenges, and growth opportunities. You’ll receive a customized Digital Marketing Plan with practical actions you can start implementing immediately.', button='Book a Free Consultation', note='Free • No obligation • Tailored to your business') {
  return `<section class="cta-band"><div class="shell cta-inner"><div><span class="eyebrow light">FREE CONSULTATION</span><h2>${text}</h2><p>${detail}</p><p class="cta-note">${note}</p></div><a class="button button-light" href="/consultation/">${button}</a></div></section>`;
}

function page({title,description,active='/',body}) {
  return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#070A0F"><meta name="description" content="${description}"><meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><title>${title}</title><script>try{const savedTheme=localStorage.getItem('aaditya-theme');if(savedTheme==='light'){document.documentElement.dataset.theme='light';document.querySelector('meta[name="theme-color"]').content='#FEF2A0'}}catch{}</script><link rel="icon" type="image/png" href="/aaditya-logo.png"><link rel="stylesheet" href="/style.css"><script src="/site.js" defer></script></head><body${active==='/consultation/'?' class="consultation-page"':''}>${header(active)}<main id="main">${body}</main>${footer()}</body></html>`
    .replace(/class="([^"]*)" href="\/consultation\/"/g, 'class="$1 consultation-action" href="/consultation/"')
    .replaceAll('href="/consultation/"', 'href="/consultation/" data-conversion="consultation-intent"')
    .replaceAll('class="button button-primary" href="#booking"', 'class="button button-primary consultation-action" href="#booking"')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*consultation-action[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="consultation-action-label">$2</span>$3')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*\bbutton\b[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="button-label">$2</span>$3');
}

function serviceCards() {
  return servicesData.map(service=>`<article id="${service.id}" class="service-card"><span class="service-icon">${icon(service.icon)}</span><span class="service-index">${service.n} / ${service.tag}</span><h3>${service.name}</h3><p>${service.short}</p><a class="card-link" href="/services/${service.slug}/" aria-label="Learn more about ${service.name}">Learn More <span aria-hidden="true">↗</span></a></article>`).join('');
}

const otherServiceDescriptions = {
  'ai-powered-digital-marketing':'Use practical AI tools and a clear strategy to improve your marketing and work more efficiently.',
  'meta-ads':'Reach potential customers through focused Facebook and Instagram advertising.',
  'content-marketing':'Create useful content that communicates your value and builds trust with your audience.',
  'email-marketing':'Stay connected with leads and customers through helpful, focused email communication.',
  'websites-landing-pages':'Present your business clearly and guide visitors toward taking meaningful action.',
  'seo':'Improve how clearly search engines and potential customers understand your website.',
  'lead-generation':'Create a clearer process for turning audience interest into business enquiries.'
};

function otherServiceCards(selectedSlug) {
  return servicesData.filter(service=>service.slug !== selectedSlug).map(service=>`<article class="service-card other-service-card"><span class="service-icon">${icon(service.icon)}</span><span class="service-index">${service.n} / ${service.tag}</span><h3>${service.name}</h3><p>${otherServiceDescriptions[service.slug]}</p><a class="card-link" href="/services/${service.slug}/" aria-label="Learn more about ${service.name}">Learn More <span aria-hidden="true">↗</span></a></article>`).join('');
}

const home = page({
  title:'AI & Digital Marketing for Business Growth | Aaditya Creatives',
  description:'I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.',
  body:`<section class="hero"><div class="shell hero-grid"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span> AI-POWERED DIGITAL MARKETING FOR GROWING BUSINESSES</span><h1>Grow Your Business with <em>Smarter Digital Marketing</em></h1><p class="hero-lead">I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.</p><div class="hero-actions"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a><a class="button button-secondary" href="/services/">Explore My Services</a></div><p class="hero-note">Get a customized Digital Marketing Plan with practical steps you can start implementing immediately.</p></div><figure class="hero-photo"><img src="/hero-portrait.png" width="1024" height="1536" alt="Portrait of Aaditya against a warm golden background" fetchpriority="high" decoding="async"><figcaption>Aaditya Creatives · AI · Digital Marketing · Growth</figcaption></figure></div></section>
  <section class="section intro-section"><div class="shell intro-grid"><div><span class="eyebrow">COMMON CHALLENGES</span><h2 class="display-title">Is your marketing taking time without producing <em>enough results?</em></h2><p class="section-lead">Without a clear plan, marketing can become confusing, expensive, and difficult to manage.</p></div><ul class="challenge-list"><li>Not receiving enough leads or enquiries</li><li>Spending money without knowing what is working</li><li>Posting content without a clear strategy</li><li>Unsure which marketing channels to use</li><li>Interested in AI but unsure how to apply it</li><li>Managing marketing without an internal marketing team</li></ul></div></section>
  <section class="section tint-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">A CLEARER WAY FORWARD</span><h2 class="display-title">AI-powered digital marketing can help you <em>move forward.</em></h2></div><p class="section-head-note">AI supports the work. Your business goals shape the plan.</p></div><p class="solution-copy">AI-powered digital marketing can help you understand your audience, improve your content, choose better marketing channels, and work more efficiently. I start by understanding your business and then identify practical marketing actions based on your goals.</p><div class="solution-steps"><article><span>01</span><h3>Understand Your Business</h3><p>Discuss your business, audience, goals, challenges, and current marketing.</p></article><article><span>02</span><h3>Find the Right Opportunities</h3><p>Identify useful marketing channels, AI tools, and practical improvements.</p></article><article><span>03</span><h3>Create Your Marketing Plan</h3><p>Get a customized plan with clear actions your business can start implementing.</p></article></div></div></section>
  <section class="section services-preview"><div class="shell"><div class="section-head"><div><span class="eyebrow">SERVICES</span><h2 class="display-title">Practical support for your <em>business goals.</em></h2></div><a class="underlined-link" href="/services/">Explore Services</a></div><div class="service-grid">${serviceCards()}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></div></div></section>
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
  <section class="section"><div class="shell"><div class="section-head"><div><span class="eyebrow">EXPLORE MY SERVICES</span><h2 class="display-title">Support built around <em>your goals.</em></h2></div></div><div class="service-grid service-directory">${serviceCards()}</div></div></section>
  ${cta()}`
});

function serviceDetailPage(service) {
  const heading = service.pageName || service.name;
  return page({
    title:`${heading} | Aaditya Creatives`,
    description:service.short,
    active:`/services/${service.slug}/`,
    body:`${innerHero('SERVICE', heading, service.intro, `<div class="hero-aside service-detail-aside"><span class="service-icon">${icon(service.icon)}</span><span class="aside-label">PRACTICAL MARKETING SUPPORT</span><p>${service.closing}</p></div>`, 'service-detail-hero')}
    <section class="section"><div class="shell service-detail-grid"><div class="service-detail-main"><article><span class="eyebrow">WHAT THE SERVICE IS</span><h2>Clear support built around your business</h2><p>${service.what}</p></article><article><span class="eyebrow">HOW IT CAN HELP</span><h2>A practical way forward</h2><p>${service.help}</p></article><article><span class="eyebrow">THE PURPOSE</span><h2>Focused on useful next steps</h2><p>${service.closing}</p></article></div><aside class="service-detail-side"><section><span class="mini-label">COMMON MARKETING PROBLEMS</span><ul class="benefit-list">${service.problems.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">THIS SERVICE MAY INCLUDE</span><ul class="benefit-list">${service.includes.map(item=>`<li>${item}</li>`).join('')}</ul></section></aside></div></section>
    <section class="section tint-section other-services-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">MORE WAYS I CAN HELP</span><h2 class="display-title">Explore Other Services</h2><p class="section-lead">Discover other practical marketing services that may support your business goals.</p></div></div><div class="service-grid other-services-grid">${otherServiceCards(service.slug)}</div></div></section>
    ${cta('Let’s Find the Right Approach for Your Business','Book a free consultation to discuss your current marketing, business goals, and practical next steps.','Book My Free Consultation','Free • No obligation • Tailored to your business')}`
  });
}

const servicePages = servicesData.map(service => [
  `services/${service.slug}`,
  serviceDetailPage(service)
]);

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
  <section class="section"><div class="shell contact-grid"><div><span class="eyebrow">GENERAL ENQUIRIES</span><h2 class="display-title">Let’s start a <em>conversation.</em></h2><p class="section-lead">Use this page for general questions, project enquiries, and partnership ideas. The form is intentionally short and separate from the consultation request.</p><a class="button button-primary" href="#message">Send Message</a><div class="contact-social"><strong>Connect with Aaditya</strong>${socialGroup('social-icons contact-social-icons')}</div></div><div class="form-card" id="message"><span class="mini-label">CONTACT AADITYA</span><h3>Send a general message</h3><p>Share your question or enquiry and include the details needed for a useful reply.</p>${inquiryForm('contact')}</div></div></section>
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
  ['blog', blog], ['contact', contact], ['consultation', consultation], ['privacy', privacy], ['terms', terms],
  ...servicePages
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
  writeRedirect('ne', '/'),
  writeRedirect('services/google-ads', '/services/'),
  writeRedirect('services/digital-marketing', '/services/#ai-marketing'),
  writeRedirect('services/website-design', '/services/#websites-landing-pages')
]);
console.log(`Built ${routes.length} English pages and legacy redirects`);
