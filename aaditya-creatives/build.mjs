import { mkdir, rm, writeFile } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
await mkdir(out, { recursive: true });

const nav = [
  ['Home', '/'], ['About Me', '/about/'], ['Services', '/services/'],
  ['Blog', '/blog/'], ['Contact', '/contact/']
];
const servicesData = [
  {id:'ai-marketing',slug:'ai-powered-digital-marketing',n:'01',tag:'AI-POWERED MARKETING',name:'AI-Powered Digital Marketing',short:'Use practical AI tools and a clear marketing strategy to understand your audience, improve your marketing, and work more efficiently.',intro:'Marketing can take a lot of time, especially when you are running a business without a dedicated marketing team. AI-powered digital marketing can help make research, planning, content creation, and everyday marketing tasks more efficient.',what:'AI-powered digital marketing combines useful AI tools with practical marketing strategy. AI can support the work, but every recommendation should still be based on your business, audience, goals, and available resources.',problems:['You do not have a clear marketing plan.','Marketing tasks take too much time.','You are unsure which AI tools are useful.','Your content and marketing activities are inconsistent.','You have information but find it difficult to turn it into action.'],help:'I first look at your business, customers, current marketing, and challenges. I then identify where AI and digital marketing tools may help you research, plan, create, organize, and improve your marketing work.',includes:['Review of your current marketing','Audience and competitor research','Marketing plan recommendations','AI tool recommendations','Content planning support','Practical AI-assisted workflows','Campaign and channel recommendations'],closing:'The goal is to give your business a clearer marketing direction and help you use AI in a practical, manageable way.',icon:'spark'},
  {id:'paid-advertising',slug:'paid-advertising',n:'02',tag:'PAID ADVERTISING',name:'Paid Advertising',short:'Reach potential customers through focused paid advertising campaigns built around your audience, offer, budget, and business goals.',intro:'Paid advertising helps businesses reach potential customers by placing focused advertisements on suitable online platforms. This service focuses on matching the campaign goal, audience, message, creative content, and budget.',what:'Paid advertising connects a clear campaign objective with the people you want to reach, the message they see, and the page or action that follows. Suitable campaigns may include Facebook and Instagram advertising.',problems:['You are not reaching enough potential customers.','Your audience targeting is unclear.','Advertising does not have a clear objective.','Campaign messages are weak or unfocused.','Campaign performance is difficult to understand.'],help:'A structured paid advertising approach connects the campaign goal, target audience, offer, message, creative content, budget, and destination. This gives each campaign a clearer purpose and makes performance easier to review.',includes:['Campaign objective planning','Audience research','Offer and message development','Advertising copy','Creative direction','Campaign structure','Landing-page recommendations','Performance review'],closing:'Every paid campaign should be based on your business goal, available budget, and the customers you want to reach.',icon:'target'},
  {id:'content-marketing',slug:'content-marketing',n:'03',tag:'CONTENT MARKETING',name:'Content Marketing',short:'Plan and create useful content that communicates your value, builds trust, and keeps your business visible to potential customers.',intro:'Posting content without a plan can consume time without helping potential customers understand your business.',what:'Content marketing means creating useful information that answers customer questions, explains your services, and helps people understand why your business may be right for them.',problems:['You do not know what to post.','Your content is inconsistent.','Your message is unclear.','People see your business but do not understand its value.','Your content is not connected to a business goal.'],help:'A clear content plan gives your business useful topics, consistent messages, suitable formats, and a regular publishing direction. It helps every piece of content serve a purpose.',includes:['Content topic research','Content pillars','Content calendar planning','Post and article ideas','Caption and message development','Website content recommendations','AI-assisted content workflows','Calls to action'],closing:'Useful and consistent content can help your business remain visible, communicate clearly, and build trust over time.',icon:'content'},
  {id:'email-marketing-and-lead-generation',slug:'email-marketing-and-lead-generation',n:'04',tag:'EMAIL MARKETING AND LEAD GENERATION',name:'Email Marketing and Lead Generation',short:'Create a clearer process for capturing interest, collecting enquiries, and following up through useful email communication.',intro:'Generating interest is only the beginning. Businesses also need a clear way to collect enquiries, communicate with potential customers, and follow up with people who are not ready to make an immediate decision.',what:'Email marketing and lead generation connect the process of attracting potential customers, capturing their information, and continuing the conversation through useful and focused email communication.',problems:['Website visitors are not becoming enquiries.','Potential customers have no clear next step.','Leads are not followed up consistently.','Email communication is irregular.','Forms are too long or confusing.','The business depends too much on social media.'],help:'A connected approach brings together the offer, lead-capture journey, forms, landing pages, calls to action, and email follow-up so interested people have a clear next step and useful communication after they enquire.',includes:['Lead offer planning','Lead-capture forms','Landing-page recommendations','Welcome emails','Lead follow-up sequences','Newsletter planning','Email campaign copy','Calls to action','Basic conversion tracking recommendations'],closing:'The goal is to create a clearer journey from initial interest to a business enquiry and maintain useful communication without guaranteeing a specific number of leads, sales, or email results.',icon:'mail-funnel'},
  {id:'websites-landing-pages',slug:'websites-landing-pages',n:'05',tag:'WEBSITES &amp; LANDING PAGES',name:'Websites &amp; Landing Pages',short:'Present your business clearly with responsive websites and focused landing pages designed to guide visitors toward taking action.',intro:'A confusing, outdated, or poorly structured website can make potential customers leave before they understand what your business offers.',what:'A business website explains who you are, what you offer, and how visitors can contact you. A landing page focuses on one offer or campaign and guides visitors toward one clear action.',problems:['Visitors do not understand what your business offers.','Your website is difficult to use on mobile devices.','Important information is hard to find.','Your pages do not contain clear calls to action.','Advertising traffic is being sent to an unfocused page.','Visitors are not becoming enquiries.'],help:'A clear page structure, simple message, responsive layout, and focused call to action can help visitors find the information they need and decide what to do next.',includes:['Website structure planning','Landing-page planning','Content hierarchy','Responsive page design','Calls to action','Contact and lead forms','Conversion-focused sections','Basic SEO structure','Analytics and tracking preparation'],closing:'The goal is to create a clear online experience that presents your business professionally and guides visitors toward a useful next step.',icon:'window'},
  {id:'seo',slug:'seo',n:'06',tag:'SEO',name:'SEO',pageName:'Search Engine Optimization',short:'Improve your website’s visibility in search results through clearer content, stronger page structure, and practical search optimization.',intro:'A website cannot support your business if potential customers struggle to find it or search engines cannot clearly understand its pages.',what:'SEO improves the structure, content, and relevance of a website so search engines can better understand it and people can more easily discover useful pages.',problems:['Your website receives little search traffic.','Page titles and descriptions are unclear.','Website content does not match what customers search for.','Important services do not have focused pages.','The website structure is difficult to understand.','Useful content is missing.'],help:'SEO starts by understanding what potential customers search for and then improving the website’s pages, content, headings, links, and technical basics.',includes:['Keyword and topic research','Page-title recommendations','Meta-description recommendations','Heading and content structure','On-page SEO','Internal linking','Service-page recommendations','Blog topic planning','Basic technical review'],closing:'SEO is a long-term process that can improve how clearly your website communicates with both people and search engines. Specific rankings cannot be guaranteed.',icon:'search'}
];

const serviceSummaryCopy = {
  'ai-powered-digital-marketing': {
    intro:'Use practical AI tools with a clear marketing strategy to improve planning, understand your audience, and make everyday marketing work more efficient.',
    what:'AI-powered digital marketing combines practical marketing methods with useful AI tools for research, planning, content development, audience understanding, and repetitive tasks.',
    help:'It can help organize ideas, speed up research, improve content planning, and identify practical opportunities based on your business and customers.',
    purpose:'The purpose is to help your business use AI responsibly while building a clearer and more manageable marketing direction.'
  },
  'paid-advertising': {
    intro:'Reach potential customers through focused paid campaigns built around your audience, offer, campaign goal, and available budget.',
    what:'Paid advertising places focused advertisements in front of selected online audiences, including suitable campaigns on Facebook and Instagram.',
    help:'It can help your business reach relevant people, promote an offer, generate interest, and understand which audiences and messages respond more effectively.',
    purpose:'The purpose is to create advertising campaigns with a clear objective, audience, message, creative direction, and next step.'
  },
  'content-marketing': {
    intro:'Create useful content that explains your value, answers customer questions, and keeps your business visible to the right audience.',
    what:'Content marketing involves planning and creating useful social content, articles, website copy, and educational information for your audience.',
    help:'It can improve communication, answer customer questions, build familiarity, and give potential customers a reason to continue engaging with your business.',
    purpose:'The purpose is to create consistent content that supports a clear marketing and business goal.'
  },
  'email-marketing-and-lead-generation': {
    intro:'Capture interest, communicate with potential customers, and follow up through clear lead-generation and email-marketing activities.',
    what:'Lead generation captures interest from potential customers, while email marketing continues the conversation through welcome messages, follow-ups, newsletters, and campaigns.',
    help:'It can help turn website or campaign interest into enquiries and keep your business connected with people who are not ready to act immediately.',
    purpose:'The purpose is to connect lead capture and follow-up so interested people receive a clear next step and useful communication.'
  },
  'websites-landing-pages': {
    intro:'Present your business clearly through responsive websites and focused landing pages designed around a meaningful visitor action.',
    what:'A business website explains who you are and what you offer. A landing page focuses on one service, campaign, offer, or conversion goal.',
    help:'It can help visitors understand your business, find important information, trust your presentation, and take a clear next step.',
    purpose:'The purpose is to create a professional online experience that communicates clearly and supports enquiries or consultation bookings.'
  },
  'seo': {
    intro:'Improve how clearly search engines and potential customers understand the content, structure, and purpose of your website.',
    what:'SEO improves website content, headings, metadata, internal links, and technical basics so search engines can understand the site more effectively.',
    help:'It can make important pages easier to discover and connect website content with the topics potential customers search for.',
    purpose:'The purpose is to create a stronger foundation for long-term search visibility without promising specific rankings or traffic.'
  }
};

const serviceDetailExtras = {
  'ai-powered-digital-marketing': {
    detailWhat:'This service begins with the marketing work your business already does. The aim is to identify where AI can save time or make a task clearer without replacing business judgment. That may include organizing research, shaping a content brief, comparing ideas, documenting a repeatable workflow, or preparing a first draft for human review.',
    detailHelp:'A practical setup gives each tool a defined role and keeps the final decisions with you. Recommendations consider the information you can provide, the time available, the people responsible for the work, and the channels that matter to your audience.',
    process:['Review your goals, audience, current channels, and recurring marketing tasks.','Identify useful AI-supported opportunities and the information each workflow needs.','Create a manageable plan, test the process, and document clear review steps.'],
    suitable:['Owners managing marketing without a large internal team','Businesses with useful ideas but an inconsistent process','Teams that want to explore AI with clear human review'],
    benefits:['A clearer weekly marketing workflow','More organized research and planning','Practical guidance on where AI is useful and where careful human judgment is required'],
    faqs:[['Do I need experience with AI tools?','No. The recommendations can start with simple tools and workflows that match your current confidence and resources.'],['Will AI create all of my marketing?','No. AI can support selected tasks, while your knowledge, review, brand voice, and business decisions remain central.'],['Can the approach work with my existing tools?','Where practical, the plan can build around tools you already use so the workflow remains manageable.']]
  },
  'paid-advertising': {
    detailWhat:'Paid advertising connects a defined audience with a focused message and a useful destination. Before a campaign is prepared, the business goal, offer, budget, platform, creative requirements, and next visitor action should be clear. Facebook and Instagram may be suitable when their audience and formats match the campaign.',
    detailHelp:'Planning the campaign as one connected journey makes it easier to review. The advertisement, landing page, contact method, and follow-up should support the same promise. Results are monitored as evidence for future decisions rather than treated as a guarantee.',
    process:['Clarify the campaign objective, offer, audience, budget, and measurement plan.','Prepare the campaign structure, messages, creative direction, and destination page.','Launch carefully, review available data, and make measured adjustments.'],
    suitable:['Businesses with a clear offer and realistic test budget','Campaigns that need focused reach on suitable social platforms','Owners who want a structured approach to creative, audience, and follow-up'],
    benefits:['A campaign with a defined purpose and audience','Clearer alignment between advertisement and destination page','A practical review process for learning from campaign data'],
    faqs:[['Do you guarantee leads or sales?','No. Advertising performance depends on many factors, including the offer, audience, budget, competition, creative work, website, and follow-up.'],['Is Google Ads included?','Google Ads is not automatically presented as part of this service. Platform recommendations depend on the business and campaign.'],['How much budget do I need?','The suitable budget depends on the audience, platform, campaign period, and learning goal. It should be agreed before launch.']]
  },
  'content-marketing': {
    detailWhat:'Content marketing turns customer questions, business knowledge, and useful ideas into material people can understand. The work may include social posts, articles, educational resources, service-page copy, or email content. Each format should support a purpose rather than filling a publishing schedule.',
    detailHelp:'A content system can reduce the pressure to invent a new topic every day. Clear themes, audience questions, suitable formats, and calls to action create a repeatable direction while leaving room for timely ideas and business updates.',
    process:['Review your audience, offers, existing content, and common customer questions.','Define useful content themes, formats, messages, and a realistic publishing rhythm.','Create or refine content, review audience response, and improve future planning.'],
    suitable:['Businesses that struggle to decide what to publish','Brands whose value is difficult to explain quickly','Owners who want content connected to a clear marketing purpose'],
    benefits:['A more consistent and useful content direction','Clearer messages across marketing channels','A reusable bank of topics based on real customer needs'],
    faqs:[['Which content formats can be included?','The plan may include social content, articles, web copy, email content, or educational material when those formats suit your audience.'],['How often should I publish?','A realistic and consistent rhythm is usually more useful than a demanding schedule that cannot be maintained.'],['Can AI support content creation?','AI may assist research and drafting, but facts, tone, claims, and final quality should always be reviewed.']]
  },
  'email-marketing-and-lead-generation': {
    detailWhat:'Lead generation creates a clear opportunity for an interested person to enquire or share their details. Email marketing supports the next part of the journey with welcome messages, useful follow-ups, newsletters, or focused campaigns. The offer, form, permission, message, and next step need to work together.',
    detailHelp:'A connected journey can reduce missed enquiries and unclear follow-up. The process should collect only useful information, explain what the person will receive, and provide communication that respects their choice and remains relevant to their interest.',
    process:['Map the current enquiry journey and identify where interested visitors lose direction.','Plan the offer, form, confirmation, email sequence, and practical follow-up responsibility.','Prepare the content, test the journey, and review engagement without making outcome guarantees.'],
    suitable:['Businesses receiving interest but following up inconsistently','Websites that need a clearer enquiry or lead-capture route','Owners who want to communicate beyond social media'],
    benefits:['A clearer path from interest to enquiry','More consistent and useful follow-up','Better alignment between forms, landing pages, and email messages'],
    faqs:[['Do you guarantee a number of leads?','No. Lead volume and quality depend on the offer, audience, traffic, competition, page experience, and follow-up.'],['What emails might be included?','Depending on the goal, the work may include a welcome email, a short follow-up sequence, a newsletter plan, or campaign messages.'],['Will the forms collect unnecessary information?','The recommended form should request only the information needed for the next useful step.']]
  },
  'websites-landing-pages': {
    detailWhat:'A business website presents the main information people need across several connected pages. A landing page is narrower and supports one campaign, service, offer, or action. Both should use clear content hierarchy, responsive layouts, accessible controls, and an obvious route to contact or enquire.',
    detailHelp:'Good page planning reduces confusion before visual styling begins. The structure should answer the visitor’s main questions in a sensible order, explain the offer accurately, and make the next action easy to find on mobile and desktop.',
    process:['Clarify the audience, page goal, required content, and visitor action.','Plan the structure, write or organize the content, and create the responsive interface.','Test key pages and forms, review accessibility and performance, and prepare the site for launch.'],
    suitable:['Businesses that need a clear professional online presence','Campaigns that require a focused landing page','Existing sites that are difficult to understand or use on mobile'],
    benefits:['Clearer presentation of services and business information','Responsive pages with focused calls to action','A stronger base for content, advertising, analytics, and future improvements'],
    faqs:[['What is the difference between a website and a landing page?','A website covers the broader business across connected pages. A landing page concentrates on one offer or campaign action.'],['Will the design work on mobile devices?','Responsive behavior is planned and checked so important content and controls remain usable on common screen sizes.'],['Does a new website guarantee enquiries?','No. A website supports communication and conversion, while outcomes also depend on traffic, offer, trust, competition, and follow-up.']]
  },
  'seo': {
    detailWhat:'Search engine optimization improves how a website is organized and explained. The work may cover page topics, titles, descriptions, headings, internal links, content quality, mobile usability, and basic technical signals. The strongest priorities depend on the site, audience, and search context.',
    detailHelp:'SEO can make useful pages clearer to both people and search engines. Research helps connect customer language with page content, while careful structure makes important information easier to navigate. Progress usually requires ongoing review rather than a one-time adjustment.',
    process:['Review the website, important services, audience questions, and current search information.','Prioritize page topics, content, metadata, internal links, and practical technical fixes.','Implement or document improvements and review changes over time using available evidence.'],
    suitable:['Businesses with useful services that are difficult to find online','Websites with unclear page topics or duplicated content','Owners building a long-term foundation for search visibility'],
    benefits:['Clearer service pages and website structure','Content aligned with relevant customer questions','A prioritized foundation for ongoing search improvement'],
    faqs:[['Can you guarantee a first-page ranking?','No. Rankings depend on many changing factors outside any provider’s control, so specific positions cannot be guaranteed.'],['How quickly does SEO work?','Timelines vary by the website, competition, search demand, technical condition, and the work completed. SEO is generally a long-term process.'],['Does SEO include technical work?','The service can include a basic technical review and prioritized recommendations. The implementation scope depends on the website and access available.']]
  }
};

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
    'mail-funnel':'<rect x="3" y="4" width="18" height="12" rx="2"/><path d="m4 6 8 6 8-6M7 18h10l-4 3v1h-2v-1l-4-3Z"/>',
    window:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    search:'<circle cx="10" cy="10" r="6"/><path d="m14.5 14.5 5 5M15 9l2-2 2 2 3-3M22 6v4h-4"/>',
    users:'<path d="M4 4h16l-6 7v6l-4 3v-9L4 4Z"/><path d="M8 7h8"/>',
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
    <nav id="site-nav" class="site-nav" aria-label="Main navigation">${nav.map(([label,href])=>label === 'Services' ? `<div class="nav-dropdown" data-nav-dropdown><a class="nav-dropdown-link" href="/services/"${active.startsWith('/services/')?' aria-current="page"':''}><span class="nav-label">${label}</span></a><button class="nav-dropdown-trigger" type="button" aria-label="Toggle services menu" aria-expanded="false" aria-controls="services-dropdown" aria-haspopup="true"><svg class="dropdown-arrow" viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div id="services-dropdown" class="nav-dropdown-menu">${serviceNavigation.map(([name,url])=>`<a href="${url}"${active===url?' aria-current="page"':''}><span class="nav-label">${name}</span></a>`).join('')}</div></div>` : `<a href="${href}"${active===href?' aria-current="page"':''}><span class="nav-label">${label}</span></a>`).join('')}<a class="nav-cta header-consultation-cta" href="/consultation/"${active==='/consultation/'?' aria-current="page"':''}>Book a Free Consultation</a></nav>
    <div class="header-controls"><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark theme" aria-pressed="false"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.6 8.6 1 0 0 20.2 15.4Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span class="sr-only">Switch to dark theme</span></button><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button></div>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-top"><div class="footer-intro"><a class="brand footer-brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a><p><strong>AI • Digital Marketing • Growth</strong><br>Helping small and medium businesses use AI and digital marketing to build better marketing systems and create opportunities for growth.</p><a class="footer-consultation" href="/consultation/">Book a Free Consultation</a></div><div class="footer-links"><div class="footer-column"><h2>Navigate</h2><ul><li><a href="/">Home</a></li><li><a href="/about/">About Me</a></li><li><a href="/services/">Services</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul></div><div class="footer-column"><h2>Services</h2><ul>${footerServices.map(([name,url])=>`<li><a href="${url}">${name}</a></li>`).join('')}</ul></div><div class="footer-column footer-social"><h2>Connect/Follow</h2>${socialGroup()}</div></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Aaditya Creatives. All rights reserved.</span><div><a href="/privacy/">Privacy placeholder</a><a href="/terms/">Terms placeholder</a></div></div></footer>`;
}

function cta(text='Ready to Build a Clearer Marketing Plan?', detail='Book a free consultation to discuss your business, marketing challenges, and growth opportunities. You’ll receive a customized Digital Marketing Plan with practical actions you can start implementing immediately.', button='Book a Free Consultation', note='Free • No obligation • Tailored to your business') {
  return `<section class="cta-band"><div class="shell cta-inner"><div><span class="eyebrow light">FREE CONSULTATION</span><h2>${text}</h2><p>${detail}</p><p class="cta-note">${note}</p></div><a class="button button-light" href="/consultation/">${button}</a></div></section>`;
}

function page({title,description,active='/',body,canonical='',ogImage='',ogType='website',headExtra='',bodyClassExtra=''}) {
  const bodyClass = active === '/' ? 'page-home' : active === '/about/' ? 'page-about' : active === '/services/' ? 'page-services' : active.startsWith('/services/') ? 'page-service-detail' : active === '/blog/' ? 'page-blog' : active === '/contact/' ? 'page-contact' : active === '/consultation/' ? 'page-consultation consultation-page' : 'page-standard';
  const canonicalMarkup = canonical ? `<link rel="canonical" href="${canonical}">` : '';
  const imageMarkup = ogImage ? `<meta property="og:image" content="${ogImage}"><meta name="twitter:card" content="summary_large_image">` : '';
  return `<!doctype html><html lang="en" data-theme="dark"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#101211"><meta name="description" content="${description}"><meta property="og:type" content="${ogType}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}">${imageMarkup}${canonicalMarkup}${headExtra}<title>${title}</title><script>try{const savedTheme=localStorage.getItem('aaditya-theme-v2');const theme=savedTheme==='dark'||savedTheme==='light'?savedTheme:savedTheme==='mixed'?'light':'dark';document.documentElement.dataset.theme=theme;document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#101211':'#F7F9FC'}catch{document.documentElement.dataset.theme='dark'}</script><link rel="icon" type="image/png" href="/aaditya-logo.png"><link rel="stylesheet" href="/style.css?v=20261028-blog-article1"><script src="/site.js" defer></script></head><body class="${bodyClass}${bodyClassExtra ? ` ${bodyClassExtra}` : ''}">${header(active)}<main id="main">${body}</main>${footer()}</body></html>`
    .replace(/class="([^"]*)" href="\/consultation\/"/g, 'class="$1 consultation-action" href="/consultation/"')
    .replaceAll('href="/consultation/"', 'href="/consultation/" data-conversion="consultation-intent"')
    .replaceAll('class="button button-primary" href="#booking"', 'class="button button-primary consultation-action" href="#booking"')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*consultation-action[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="consultation-action-label">$2</span>$3')
    .replace(/(<(?:a|button)\b[^>]*class="[^"]*\bbutton\b[^"]*"[^>]*>)([^<]+)(<\/(?:a|button)>)/g, '$1<span class="button-label">$2</span>$3')
    .replaceAll('/style.css?v=20261028-blog-article1', '/style.css?v=20261028-strategy-article1');
}

const serviceMedia = {
  'ai-powered-digital-marketing':{base:'ai-marketing',width:1024,height:1536,widths:[480,800,1024],alt:'AI-powered digital marketing workspace showing automation, analytics and content planning.',fit:'contain',position:'center'},
  'paid-advertising':{base:'paid-advertising',width:333,height:500,widths:[240,333],alt:'Paid advertising concept with a digital advertisement and megaphone.',fit:'contain',position:'center'},
  'content-marketing':{base:'content-marketing',width:1024,height:1536,widths:[480,800,1024],alt:'Marketing team collaborating on content strategy and planning.',fit:'contain',position:'center'},
  'email-marketing-and-lead-generation':{base:'email-lead-generation',width:736,height:1104,widths:[360,640,736],alt:'Email notifications displayed above a laptop keyboard.',fit:'cover',position:'center'},
  'websites-landing-pages':{base:'websites-landing-pages',width:736,height:400,widths:[360,640,736],alt:'Website design concept displayed on a laptop.',fit:'contain',position:'center'},
  'seo':{placeholder:true,alt:'SEO image placeholder; a clean licensed image is needed.'}
};

const consultationMedia = {base:'consultation',width:736,height:1104,widths:[360,640,736],alt:'Business professionals discussing goals during a consultation.',fit:'cover',position:'center'};

function mediaFrame(media, {className='',card=false,eager=false,caption=''}={}) {
  const classes = `media-frame ${className}${card ? ' service-card-media' : ''}`;
  if (media.placeholder) {
    return `<figure class="${classes} media-placeholder" data-reveal-media role="img" aria-label="${media.alt}"><span class="service-icon">${icon('search')}</span><strong>SEO image placeholder</strong><small>Clean licensed image needed</small></figure>`;
  }
  const srcset = media.widths.map(width=>`/images/services/${media.base}-${width}.webp ${width}w`).join(', ');
  const sizes = card ? '(max-width:600px) calc(100vw - 5rem), (max-width:850px) 45vw, 29vw' : '(max-width:950px) calc(100vw - 2rem), 45vw';
  return `<figure class="${classes} media-fit-${media.fit}" data-reveal-media style="--media-position:${media.position}"><picture><source type="image/webp" srcset="${srcset}" sizes="${sizes}"><img src="/images/services/${media.base}-fallback.jpg" width="${media.width}" height="${media.height}" alt="${media.alt}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;
}

const serviceCardBullets = {
  'ai-powered-digital-marketing':['Audience and competitor research','Repeatable AI-supported workflows'],
  'paid-advertising':['Campaign objective and audience planning','Ad message and landing-page alignment'],
  'content-marketing':['Content themes and publishing direction','Social, article, and website copy planning'],
  'email-marketing-and-lead-generation':['Lead-capture journey and forms','Welcome and follow-up email sequences'],
  'websites-landing-pages':['Responsive content hierarchy','Landing pages with one clear action'],
  'seo':['Keyword and on-page review','Headings, metadata, and internal links']
};

function serviceOverviewCard(service, extraClass='') {
  const bullets = serviceCardBullets[service.slug];
  return `<article${extraClass ? '' : ` id="${service.id}"`} class="service-overview-card service-overview-card--${service.slug}${extraClass ? ` ${extraClass}` : ''}"><div class="service-overview-top"><span class="service-index">SERVICE ${service.n}</span><span class="service-icon">${icon(service.icon)}</span></div><h3>${service.name}</h3><p class="service-card-summary">${service.short}</p><ul>${bullets.map(item=>`<li>${item}</li>`).join('')}</ul><a class="service-overview-arrow" href="/services/${service.slug}/" aria-label="Learn more about ${service.name}"><span class="sr-only">Learn more about ${service.name}</span><span aria-hidden="true">↗</span></a></article>`;
}

function serviceCards() {
  return servicesData.map(service=>serviceOverviewCard(service)).join('');
}

function homeServiceAccordion(service) {
  const copy = serviceSummaryCopy[service.slug];
  const items = [['What the Service Is',copy.what],['How It Can Help',copy.help],['Purpose of This Service',copy.purpose]];
  return `<div class="service-accordion">${items.map(([label,content],index)=>{const id=`home-${service.slug}-accordion-${index+1}`;return `<div class="service-accordion-item"><h4><button class="service-accordion-trigger" type="button" aria-expanded="false" aria-controls="${id}"><span>${label}</span><span class="service-accordion-icon" aria-hidden="true">+</span></button></h4><div class="service-accordion-panel" id="${id}" aria-hidden="true"><div><p>${content}</p></div></div></div>`;}).join('')}</div>`;
}

function homeServiceShowcase(service) {
  const copy = serviceSummaryCopy[service.slug];
  return `<article id="home-${service.id}" class="service-showcase service-showcase--${service.slug}"><div class="service-showcase-top"><div class="service-showcase-meta"><span class="service-index">SERVICE ${service.n}</span><span class="service-icon">${icon(service.icon)}</span></div><h3>${service.name}</h3><p>${copy.intro}</p></div>${mediaFrame(serviceMedia[service.slug],{className:'service-showcase-media'})}<div class="service-showcase-bottom">${homeServiceAccordion(service)}<a class="service-learn-more" href="/services/${service.slug}/" aria-label="Learn more about ${service.name}"><span>Learn More</span><span aria-hidden="true">↗</span></a></div></article>`;
}

function homeServiceShowcases() {
  return servicesData.map(service=>homeServiceShowcase(service)).join('');
}

function otherServiceCards(selectedSlug) {
  return servicesData.filter(service=>service.slug !== selectedSlug).map(service=>serviceOverviewCard(service, 'explore-service-card')).join('');
}

function heroSupportStrip() {
  const highlights = [
    ['spark','AI-Powered Digital Marketing','Plan smarter with practical AI support.','/services/ai-powered-digital-marketing/'],
    ['target','Paid Advertising','Reach relevant audiences with focused campaigns.','/services/paid-advertising/'],
    ['window','Websites & Landing Pages','Guide visitors toward one clear next step.','/services/websites-landing-pages/']
  ];
  return `<section class="hero-support" aria-label="Featured services"><div class="shell hero-support-grid">${highlights.map(([iconName,title,copy,url])=>`<a class="hero-support-item" href="${url}"><span class="hero-support-icon" aria-hidden="true">${icon(iconName)}</span><span><strong>${title}</strong><small>${copy}</small></span><span class="hero-support-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></section>`;
}

const home = page({
  title:'AI & Digital Marketing for Business Growth | Aaditya Creatives',
  description:'I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.',
  body:`<section class="hero"><div class="shell hero-grid"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span> AI-POWERED DIGITAL MARKETING</span><h1>Smarter Marketing.<br><em>Clearer Paths to Growth.</em></h1><p class="hero-lead">Practical digital marketing and AI-powered solutions for growing businesses.</p><div class="hero-actions"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a><a class="button button-secondary" href="/services/">Explore My Services</a></div></div><figure class="hero-photo hero-photo-themed" role="img" aria-label="Aaditya seated at his workspace beside the message Let’s Build Something Great Together"></figure></div></section>
  ${heroSupportStrip()}
  <section class="section intro-section"><div class="shell intro-grid"><div><span class="eyebrow">COMMON CHALLENGES</span><h2 class="display-title">Is your marketing taking time without producing <em>enough results?</em></h2><p class="section-lead">Without a clear plan, marketing can become confusing, expensive, and difficult to manage.</p></div><ul class="challenge-list"><li>Not receiving enough leads or enquiries</li><li>Spending money without knowing what is working</li><li>Posting content without a clear strategy</li><li>Unsure which marketing channels to use</li><li>Interested in AI but unsure how to apply it</li><li>Managing marketing without an internal marketing team</li></ul></div></section>
  <section class="section tint-section homepage-process"><div class="shell"><div class="section-head"><div><span class="eyebrow">A CLEARER WAY FORWARD</span><h2 class="display-title">AI-powered digital marketing can help you <em>move forward.</em></h2></div><p class="section-head-note">AI supports the work. Your business goals shape the plan.</p></div><p class="solution-copy">AI-powered digital marketing can help you understand your audience, improve your content, choose better marketing channels, and work more efficiently. I start by understanding your business and then identify practical marketing actions based on your goals.</p><div class="solution-steps homepage-process-cards"><article><div class="process-card-top"><span class="process-card-icon">${icon('users')}</span><span class="process-card-number">01</span></div><h3>Understand Your Business</h3><p>Learn about your goals, audience, current marketing, and the challenges affecting growth.</p></article><article><div class="process-card-top"><span class="process-card-icon">${icon('search')}</span><span class="process-card-number">02</span></div><h3>Find the Right Opportunities</h3><p>Identify practical marketing channels, content ideas, and AI opportunities that fit your business.</p></article><article><div class="process-card-top"><span class="process-card-icon">${icon('content')}</span><span class="process-card-number">03</span></div><h3>Create Your Marketing Plan</h3><p>Receive clear next steps you can begin applying to improve your marketing direction.</p></article></div></div></section>
  <section class="section services-preview"><div class="shell"><div class="homepage-services-head"><span class="eyebrow">SERVICES</span><h2 class="display-title">Practical Digital Marketing Services<br> Built Around Your <em>Business Goals</em></h2><p class="section-lead">Explore practical services designed to improve your online presence, reach potential customers, and create a clearer marketing direction.</p><a class="underlined-link" href="/services/">Explore All Services</a></div><div class="service-showcase-list">${homeServiceShowcases()}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></div></div></section>
  <section class="section process-section"><div class="shell process-grid"><div><span class="eyebrow">HOW IT WORKS</span><h2 class="display-title">A practical process, built around <em>your business.</em></h2><a class="button button-primary process-cta" href="/consultation/">Book a Free Consultation</a></div><div class="steps"><div class="step"><span>01</span><div><h3>Understand Your Business</h3><p>First, I learn about your business, audience, goals, and current marketing.</p></div></div><div class="step"><span>02</span><div><h3>Find the Right Opportunities</h3><p>I identify useful marketing channels, AI tools, and practical improvements.</p></div></div><div class="step"><span>03</span><div><h3>Create Your Marketing Plan</h3><p>You get practical recommendations and a clear action plan that you can start implementing.</p></div></div></div></div></section>
  <section class="section"><div class="shell faq-wrap"><div><span class="eyebrow">FAQ</span><h2 class="display-title">A few helpful <em>answers.</em></h2></div><div class="faq-list"><details><summary>What happens during a free consultation?</summary><p>We discuss your business, audience, current marketing, goals, and challenges. I’ll identify practical opportunities and outline a customized Digital Marketing Plan.</p></details><details><summary>Who is the consultation for?</summary><p>It is for small and medium-sized businesses looking for practical ways to improve their online presence, attract potential customers, or generate leads.</p></details><details><summary>Do I need to be using AI already?</summary><p>No. We can discuss where AI may help your marketing and which tasks are better handled with a straightforward approach.</p></details><details><summary>Will I receive a plan I can use?</summary><p>The consultation is focused on practical recommendations and clear next steps tailored to your business.</p></details></div></div></section>
  ${cta()}`
});

function innerHero(kicker, heading, lead, extra='', className='', textExtra='') {
  return `<section class="inner-hero ${className}"><div class="shell inner-hero-grid"><div><span class="eyebrow"><span class="eyebrow-line"></span> ${kicker}</span><h1>${heading}</h1><p>${lead}</p>${textExtra}</div>${extra}</div></section>`;
}

const about = page({
  title:'About Aaditya | Aaditya Creatives',
  description:"I'm building my career around the intersection of AI, digital marketing, and business growth.",
  active:'/about/',
  body:`${innerHero('ABOUT ME', 'AI, digital marketing, and <em>business growth.</em>', "I'm building my career around the intersection of AI, digital marketing, and business growth.", '<figure class="about-hero-photo"><img src="/about-portrait.png" width="1114" height="1412" alt="Portrait of Aaditya against a teal background" fetchpriority="high" decoding="async"></figure>', 'about-image-hero')}
  <section class="section"><div class="shell story-grid"><div><span class="eyebrow">MY PURPOSE</span><h2 class="display-title">Marketing should have a <em>clear purpose.</em></h2></div><div class="rich-copy"><p>I believe digital marketing shouldn't be about simply posting more content or spending more money on ads. It should have a clear purpose — reaching the right people, building trust, generating leads, and helping businesses grow.</p><p>My goal is to help small and medium business owners understand where their marketing can improve and use AI and digital tools to create a more effective marketing system.</p><p>I'm continuously developing my skills through practical projects, learning, experimentation, and real-world application.</p></div></div></section>
  <section class="section about-principles-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">HOW I WORK</span><h2 class="display-title">Practical thinking, <em>clearly explained.</em></h2></div><p class="section-head-note">My work is developing through independent practice, careful research, experimentation, and applied learning.</p></div><div class="about-principles"><article><span>01</span><h3>Business context first</h3><p>Recommendations begin with the business, audience, available resources, and the problem that needs attention.</p></article><article><span>02</span><h3>Useful AI, with human review</h3><p>AI can support research and workflows, while facts, decisions, brand voice, and final quality remain carefully reviewed.</p></article><article><span>03</span><h3>Clear and honest guidance</h3><p>The focus is on practical next steps and realistic expectations without invented credentials or guaranteed results.</p></article></div></div></section>
  <section class="section tint-section"><div class="shell intro-grid"><div><span class="eyebrow">MY APPROACH</span><h2 class="display-title">Understand the business. <em>Take action.</em></h2></div><div class="intro-copy"><p class="flow-line">Understand the business → Find the opportunity → Build the strategy → Take action.</p><p>I focus on simple, practical marketing rather than complicated strategies that are difficult to use.</p><a class="underlined-link" href="/consultation/">Book a Free Consultation</a></div></div></section>
  ${cta()}`
});

const services = page({
  title:'AI & Digital Marketing Services | Aaditya Creatives',
  description:'AI-powered digital marketing, paid advertising, content marketing, email marketing and lead generation, websites and landing pages, and SEO for growing businesses.',
  active:'/services/',
  body:`${innerHero('SERVICES', 'Services Designed Around <em>Your Business Goals</em>', 'Explore practical digital marketing services that can help your business communicate clearly, reach potential customers, and create a stronger marketing direction.')}
  <section class="section services-directory-section"><div class="shell"><div class="service-overview-head"><span class="eyebrow">EXPLORE ALL SERVICES</span><h2 class="display-title">Six practical ways to support your <em>marketing direction.</em></h2><p class="section-lead">Choose a service to learn what it covers, which marketing problems it may address, and how it could support your business.</p></div><div class="service-overview-grid">${serviceCards()}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></div></div></section>
  ${cta()}`
});

function serviceDetailPage(service) {
  const heading = service.pageName || service.name;
  const summary = serviceSummaryCopy[service.slug];
  const extra = serviceDetailExtras[service.slug];
  return page({
    title:`${heading} | Aaditya Creatives`,
    description:service.short,
    active:`/services/${service.slug}/`,
    body:`${innerHero(`SERVICE ${service.n}`, heading, summary.intro, mediaFrame(serviceMedia[service.slug],{className:'service-hero-media',eager:true}), 'service-detail-hero', '<a class="button button-primary" href="/consultation/">Book a Free Consultation</a>')}
    <section class="section"><div class="shell service-detail-grid"><div class="service-detail-main"><article><span class="eyebrow">WHAT THE SERVICE IS</span><h2>${service.name}, in practical terms</h2><p>${summary.what}</p><p>${extra.detailWhat}</p></article><article><span class="eyebrow">HOW IT MAY HELP</span><h2>How this supports your marketing</h2><p>${summary.help}</p><p>${extra.detailHelp}</p></article><article><span class="eyebrow">THE PURPOSE</span><h2>A clearer, manageable next step</h2><p>${summary.purpose}</p></article></div><aside class="service-detail-side" aria-label="Service scope and practical details"><section><span class="mini-label">COMMON MARKETING PROBLEMS</span><ul class="benefit-list">${service.problems.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">POSSIBLE DELIVERABLES</span><ul class="benefit-list">${service.includes.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">WHO IT IS SUITABLE FOR</span><ul class="benefit-list">${extra.suitable.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">PRACTICAL BENEFITS</span><ul class="benefit-list">${extra.benefits.map(item=>`<li>${item}</li>`).join('')}</ul></section></aside></div></section>
    <section class="section tint-section"><div class="shell faq-wrap"><div><span class="eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2 class="display-title">Helpful details before <em>we begin.</em></h2></div><div class="faq-list">${extra.faqs.map(([question,answer])=>`<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></div></section>
    <section class="section other-services-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">MORE WAYS I CAN HELP</span><h2 class="display-title">Explore More Services</h2><p class="section-lead">Discover other practical services that may support your business goals.</p></div></div><div class="other-services-grid">${otherServiceCards(service.slug)}</div></div></section>
    ${cta('Let’s Find the Right Approach for Your Business','Book a free consultation to discuss your current marketing, business goals, and practical next steps.','Book a Free Consultation','Free • No obligation • Tailored to your business')}`
  });
}

const servicePages = servicesData.map(service => [
  `services/${service.slug}`,
  serviceDetailPage(service)
]);

const facebookAdsArticle = {
  slug:'why-facebook-ads-may-not-be-getting-results',
  title:'Why Your Facebook Ads May Not Be Getting Results',
  description:'A practical guide to diagnosing Facebook and Instagram ads that receive impressions or clicks but do not generate enough meaningful business results.',
  category:'PAID ADVERTISING',
  readingTime:'12 min read',
  image:'/images/blog/facebook-ads-not-getting-results-1440.webp',
  imageAlt:'A marketer reviewing Facebook Ads campaign performance on a laptop beside a handwritten campaign checklist.'
};

const aiMarketingArticle = {
  slug:'how-small-businesses-can-use-ai-in-digital-marketing',
  title:'How Small Businesses Can Use AI in Digital Marketing',
  description:'Six practical, responsible ways small businesses can use AI to support research, content, email, advertising, SEO, and marketing analysis.',
  category:'AI & DIGITAL MARKETING',
  readingTime:'10 min read',
  image:'/images/blog/ai-digital-marketing-small-business-1440.webp',
  imageAlt:'A small-business marketer using an AI marketing dashboard on a laptop beside a handwritten marketing plan.'
};

const strategyArticle = {
  slug:'simple-digital-marketing-strategy-small-business',
  title:'How to Create a Simple Digital Marketing Strategy for Your Small Business',
  description:'A practical seven-step guide to setting goals, understanding customers, choosing channels, planning a budget, and measuring small-business marketing.',
  category:'DIGITAL MARKETING STRATEGY',
  readingTime:'10 min read',
  image:'/images/blog/simple-digital-marketing-strategy-1440.webp',
  imageAlt:'A small-business owner planning a digital marketing strategy beside a laptop showing goals, audience, channels, content, and measurement.'
};

function blogThumbnail({className='',eager=false }={}) {
  return `<picture class="blog-thumbnail-picture ${className}"><source type="image/webp" srcset="/images/blog/facebook-ads-not-getting-results-640.webp 640w, /images/blog/facebook-ads-not-getting-results-960.webp 960w, /images/blog/facebook-ads-not-getting-results-1440.webp 1440w" sizes="(max-width:700px) calc(100vw - 2rem), (max-width:1000px) 90vw, 1200px"><img src="/images/blog/facebook-ads-not-getting-results-fallback.jpg" width="1440" height="810" alt="${facebookAdsArticle.imageAlt}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>`;
}

function aiMarketingThumbnail({className='',eager=false }={}) {
  return `<picture class="blog-thumbnail-picture ${className}"><source type="image/webp" srcset="/images/blog/ai-digital-marketing-small-business-640.webp 640w, /images/blog/ai-digital-marketing-small-business-960.webp 960w, /images/blog/ai-digital-marketing-small-business-1440.webp 1440w" sizes="(max-width:700px) calc(100vw - 2rem), (max-width:1000px) 90vw, 1200px"><img src="/images/blog/ai-digital-marketing-small-business-fallback.jpg" width="1440" height="810" alt="${aiMarketingArticle.imageAlt}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>`;
}

function strategyThumbnail({className='',eager=false }={}) {
  return `<picture class="blog-thumbnail-picture ${className}"><source type="image/webp" srcset="/images/blog/simple-digital-marketing-strategy-640.webp 640w, /images/blog/simple-digital-marketing-strategy-960.webp 960w, /images/blog/simple-digital-marketing-strategy-1440.webp 1440w" sizes="(max-width:700px) calc(100vw - 2rem), (max-width:1000px) 90vw, 1200px"><img src="/images/blog/simple-digital-marketing-strategy-fallback.jpg" width="1440" height="810" alt="${strategyArticle.imageAlt}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></picture>`;
}

const blog = page({
  title:'Blog | Aaditya Creatives',
  description:'Simple insights about AI, digital marketing, and business growth to help business owners make better marketing decisions.',
  active:'/blog/',
  body:`${innerHero('BLOG', 'Simple insights for <em>better marketing decisions.</em>', 'Simple insights about AI, digital marketing, and business growth — created to help business owners make better marketing decisions.')}
  <section class="section"><div class="shell"><div class="blog-published-head"><div><span class="eyebrow">LATEST ARTICLES</span><h2>Practical guidance for better marketing decisions.</h2></div><p>Set a clear direction, use practical AI responsibly, follow the customer journey, and make decisions from useful evidence.</p></div><div class="published-article-list"><article class="topic-card topic-card-published">${strategyThumbnail()}<div class="topic-card-body"><span>${strategyArticle.category} · ${strategyArticle.readingTime}</span><h3>${strategyArticle.title}</h3><p>${strategyArticle.description}</p><a class="blog-read-link" href="/blog/${strategyArticle.slug}/" aria-label="Read ${strategyArticle.title}">Read Article <span aria-hidden="true">↗</span></a></div></article><article class="topic-card topic-card-published">${aiMarketingThumbnail()}<div class="topic-card-body"><span>${aiMarketingArticle.category} · ${aiMarketingArticle.readingTime}</span><h3>${aiMarketingArticle.title}</h3><p>${aiMarketingArticle.description}</p><a class="blog-read-link" href="/blog/${aiMarketingArticle.slug}/" aria-label="Read ${aiMarketingArticle.title}">Read Article <span aria-hidden="true">↗</span></a></div></article><article class="topic-card topic-card-published">${blogThumbnail()}<div class="topic-card-body"><span>${facebookAdsArticle.category} · ${facebookAdsArticle.readingTime}</span><h3>${facebookAdsArticle.title}</h3><p>${facebookAdsArticle.description}</p><a class="blog-read-link" href="/blog/${facebookAdsArticle.slug}/" aria-label="Read ${facebookAdsArticle.title}">Read Article <span aria-hidden="true">↗</span></a></div></article></div></div></section>
  ${cta('Reading about marketing is a good start.', 'Understanding how it applies to your specific business is even more valuable. Book a free consultation and get a customized digital marketing plan based on your business, goals, and current situation.')}`
});

const facebookAdsStructuredData = JSON.stringify({
  '@context':'https://schema.org',
  '@type':'BlogPosting',
  headline:facebookAdsArticle.title,
  description:facebookAdsArticle.description,
  image:`https://aadityadahal1.com.np${facebookAdsArticle.image}`,
  author:{'@type':'Person',name:'Aaditya Dahal'},
  publisher:{'@type':'Organization',name:'Aaditya Creatives'},
  mainEntityOfPage:`https://aadityadahal1.com.np/blog/${facebookAdsArticle.slug}/`
}).replaceAll('<','\\u003c');

const facebookAdsArticlePage = page({
  title:`${facebookAdsArticle.title} | Aaditya Creatives`,
  description:facebookAdsArticle.description,
  active:'/blog/',
  canonical:`https://aadityadahal1.com.np/blog/${facebookAdsArticle.slug}/`,
  ogImage:`https://aadityadahal1.com.np${facebookAdsArticle.image}`,
  ogType:'article',
  headExtra:`<meta name="keywords" content="Facebook Ads, Meta Ads, paid advertising, ad performance, lead generation, campaign audit"><script type="application/ld+json">${facebookAdsStructuredData}</script>`,
  bodyClassExtra:'page-blog-article',
  body:`<article class="blog-article"><header class="article-hero"><div class="shell article-hero-grid"><div class="article-hero-copy"><a class="article-back" href="/blog/">← Back to Blog</a><span class="eyebrow">${facebookAdsArticle.category}</span><h1>${facebookAdsArticle.title}</h1><p class="article-deck">A practical guide to finding where an advertising campaign is losing momentum—and deciding what to investigate before increasing the budget or rebuilding everything.</p><div class="article-meta"><span>By Aaditya Dahal</span><span>${facebookAdsArticle.readingTime}</span></div></div>${blogThumbnail({className:'article-hero-image',eager:true})}</div></header>
  <div class="shell article-layout"><aside class="article-toc" aria-label="Article contents"><strong>In this article</strong><ol><li><a href="#what-success-means">Define success</a></li><li><a href="#why-ads-underperform">Common problems</a></li><li><a href="#diagnose">Diagnose the journey</a></li><li><a href="#audit-checklist">Audit checklist</a></li><li><a href="#next-steps">Next steps</a></li></ol></aside><div class="article-content">
  <p class="article-intro">You launch a Facebook or Instagram campaign, watch the impressions and clicks arrive, and wait for enquiries or sales. A few days later, the advertising account shows activity—but the business results you expected are missing. It is tempting to increase the budget, change the audience, or replace the creative immediately.</p>
  <p>That reaction is understandable, but advertising performance rarely depends on one setting. The campaign objective, offer, audience, creative, landing page, tracking, budget, and follow-up process all form one customer journey. A weakness at any stage can reduce the value of the stages before it.</p>
  <p>This guide explains how those parts connect, which warning signs to look for, and how to investigate underperformance systematically. The examples are illustrations, not guaranteed explanations for every campaign.</p>

  <h2 id="what-success-means">What does a successful Facebook Ad campaign mean?</h2>
  <p>Success begins with the outcome the campaign is intended to support. Awareness, reach, engagement, website traffic, leads, and sales describe different stages of a customer journey. A campaign can perform well against one goal while contributing little to another.</p>
  <ul><li><strong>Awareness and reach</strong> focus on exposing an audience to the business or message.</li><li><strong>Engagement</strong> focuses on interactions such as reactions, comments, shares, messages, or video activity, depending on the setup.</li><li><strong>Traffic</strong> focuses on sending people to a destination such as a website or landing page.</li><li><strong>Leads</strong> focus on enquiries or information submitted through a form, message, or other lead action.</li><li><strong>Sales</strong> focus on purchase-related actions that can be measured and communicated back to the platform.</li></ul>
  <p>Meta advises advertisers to choose an objective that aligns with the business goal because its delivery system uses that choice to find people who are more likely to take the related action. Review the current <a href="https://www.facebook.com/business/ads/ad-objectives" target="_blank" rel="noopener noreferrer">Meta campaign objective guidance</a> when setting up or reassessing a campaign.</p>
  <p>If the goal is qualified enquiries, a low cost per click is not enough by itself. The useful measure is what happens after the click: landing-page visits, completed forms, lead quality, response time, appointments, and eventually the business outcomes that can be measured responsibly.</p>

  <h2 id="why-ads-underperform">Why your Facebook Ads may not be getting results</h2>
  <h3>1. The campaign objective does not match the desired outcome</h3>
  <p><strong>What the problem is:</strong> The campaign asks Meta to optimize for an action that is easier to produce but different from the result the business actually needs.</p><p><strong>Why it matters:</strong> Delivery is influenced by the selected objective and optimization event. A traffic campaign may find people likely to visit a page, but that does not automatically mean they are the people most likely to submit a form or purchase.</p><p><strong>Illustration:</strong> A local consultancy wants discovery calls but runs a campaign optimized mainly for link clicks. The account records inexpensive visits, yet few visitors complete the consultation form.</p><p><strong>Check:</strong> Compare the selected objective, conversion location, performance goal, and tracked event with the real business outcome.</p><p><strong>Action:</strong> Choose the closest appropriate objective and ensure the desired action can be measured reliably before drawing conclusions from cost-per-click data.</p>

  <h3>2. The offer or value proposition is unclear</h3>
  <p><strong>What the problem is:</strong> The advertisement describes the business but gives the audience no clear reason to act now.</p><p><strong>Why it matters:</strong> A well-targeted advertisement cannot compensate for an offer people do not understand, do not value, or do not trust.</p><p><strong>Illustration:</strong> A fitness studio promotes “quality personal training” without explaining who the sessions are for, what is included, or what the first step involves.</p><p><strong>Check:</strong> Ask whether a new visitor can quickly understand the audience, problem, value, conditions, and next step.</p><p><strong>Action:</strong> Rewrite the offer in customer language. Clarify what is available, who it may help, and what happens after the click without adding exaggerated promises.</p>

  <h3>3. The audience and message do not fit each other</h3>
  <p><strong>What the problem is:</strong> The audience may be too broad, too narrow, poorly defined, or presented with a message that does not match its situation.</p><p><strong>Why it matters:</strong> Relevance comes from the combination of audience, offer, and creative—not targeting controls alone.</p><p><strong>Illustration:</strong> A bookkeeping service uses the same technical message for new sole traders and established companies with finance teams, even though their concerns differ.</p><p><strong>Check:</strong> Review geography, customer stage, exclusions, existing-customer data, and whether the creative speaks to a recognizable problem.</p><p><strong>Action:</strong> Group audiences only when the same message and offer make sense for them. Avoid narrowing without evidence; a small audience can also limit delivery and learning.</p>

  <h3>4. The creative, headline, or copy does not earn attention</h3>
  <p><strong>What the problem is:</strong> The advertisement may look generic, communicate too much, hide the main benefit, or fail to make sense without additional context.</p><p><strong>Why it matters:</strong> The creative is the first part of the campaign most people experience. If it does not communicate relevance quickly, the rest of the journey receives fewer opportunities.</p><p><strong>Illustration:</strong> A restaurant uses a dark, text-heavy poster containing its full menu instead of a clear visual and one specific reason to visit.</p><p><strong>Check:</strong> View the advertisement on a phone. Is the main idea obvious? Does the first line support the visual? Is the branding recognizable without dominating the message?</p><p><strong>Action:</strong> Test meaningfully different concepts rather than tiny cosmetic changes. Keep the offer and evaluation method consistent so the comparison is useful.</p>

  <h3>5. The call to action is weak or mismatched</h3>
  <p><strong>What the problem is:</strong> The advertisement attracts attention but leaves the visitor unsure what to do next—or asks for a commitment that feels too large for their level of awareness.</p><p><strong>Why it matters:</strong> The call to action connects interest with the next step. It should match both the offer and the destination.</p><p><strong>Illustration:</strong> An unfamiliar software provider uses “Buy now” for a complex service that normally requires a demonstration and internal approval.</p><p><strong>Check:</strong> Confirm that the button, copy, landing-page heading, and form all describe the same action.</p><p><strong>Action:</strong> Use one clear next step, such as requesting information, booking a consultation, starting a trial, or purchasing—whichever fits the decision.</p>

  <h3>6. The landing page creates friction</h3>
  <p><strong>What the problem is:</strong> The page may load slowly, look different from the advertisement, hide essential information, use an unnecessarily long form, or work poorly on mobile.</p><p><strong>Why it matters:</strong> An ad click is only a transition. The landing page must continue the same promise and make the next step easy to understand.</p><p><strong>Illustration:</strong> A home-services ad promotes a free assessment, but the destination is a general homepage where visitors must search for the relevant service.</p><p><strong>Check:</strong> Test the complete journey on a mobile device. Compare link clicks with landing-page views, inspect loading speed, and check whether the offer and CTA remain consistent.</p><p><strong>Action:</strong> Send visitors to the most relevant page, remove avoidable form fields, add genuine trust information, and optimize the hero image and page speed. Google’s <a href="https://web.dev/articles/optimize-lcp" target="_blank" rel="noopener noreferrer">Largest Contentful Paint guidance</a> explains why the main content should load promptly.</p>

  <h3>7. Conversion tracking is incomplete or incorrect</h3>
  <p><strong>What the problem is:</strong> Important actions may not be recorded, may fire on the wrong page, or may be counted more than once.</p><p><strong>Why it matters:</strong> Incomplete data makes diagnosis difficult and can prevent the delivery system from receiving useful outcome signals.</p><p><strong>Illustration:</strong> A thank-you-page event fires whenever the page is refreshed, while phone calls and messaging enquiries are not recorded at all.</p><p><strong>Check:</strong> Test the journey yourself. Confirm that events fire only when intended, the domain and event setup are correct, and Ads Manager, analytics, and business records can be reconciled.</p><p><strong>Action:</strong> Review the <a href="https://www.facebook.com/business/tools/meta-pixel" target="_blank" rel="noopener noreferrer">Meta Pixel</a> and, where suitable, the <a href="https://www.facebook.com/business/m/conversions-api" target="_blank" rel="noopener noreferrer">Conversions API</a>. Tracking must also respect applicable privacy and consent requirements.</p>

  <h3>8. Budget, bidding, or delivery conditions limit useful data</h3>
  <p><strong>What the problem is:</strong> The campaign may have too little opportunity to reach and learn from relevant actions, or delivery may be constrained by audience size, schedule, bid controls, eligibility, or competition.</p><p><strong>Why it matters:</strong> A campaign cannot produce stable evidence if it rarely delivers or receives too few meaningful events.</p><p><strong>Illustration:</strong> A business divides a modest budget across many ad sets, audiences, and creatives. Each receives only a small amount of delivery, so comparisons remain uncertain.</p><p><strong>Check:</strong> Review delivery status, warnings, spend, reach, frequency, event volume, audience overlap, schedule, and how the budget is divided.</p><p><strong>Action:</strong> Simplify unnecessary fragmentation and align the setup with the available budget and volume. There is no universal minimum budget; the appropriate level depends on the market, objective, offer, and expected action cost.</p>

  <h3>9. Too many changes prevent useful evaluation</h3>
  <p><strong>What the problem is:</strong> Budgets, audiences, creative, and optimization settings are changed repeatedly before enough relevant evidence accumulates.</p><p><strong>Why it matters:</strong> When several variables change together, it becomes difficult to understand which change influenced the result. Significant edits may also affect delivery and learning.</p><p><strong>Illustration:</strong> A retailer replaces the creative, doubles the budget, changes the audience, and rewrites the landing page on the same day, then attributes the next result to one of those changes.</p><p><strong>Check:</strong> Review the account history and record what changed, when, and why.</p><p><strong>Action:</strong> Form a hypothesis, prioritize one or two changes, define the meaningful measure, and evaluate using enough relevant data for the business context. Avoid applying a fixed waiting period to every campaign.</p>

  <h3>10. Leads are not followed up effectively</h3>
  <p><strong>What the problem is:</strong> The advertising campaign generates enquiries, but response time, qualification, communication, or the sales process prevents them from progressing.</p><p><strong>Why it matters:</strong> Advertising can begin a conversation; it cannot replace the experience after the form is submitted.</p><p><strong>Illustration:</strong> A potential customer submits an enquiry on Monday but receives a generic reply several days later, after contacting another provider.</p><p><strong>Check:</strong> Measure response time, contact rate, qualified-lead rate, appointment attendance, reasons for rejection, and the outcome of follow-up attempts.</p><p><strong>Action:</strong> Agree on ownership, use a clear response process, acknowledge enquiries promptly, and feed lead-quality information back into campaign decisions.</p>

  <h2 id="diagnose">How to identify where your campaign is failing</h2>
  <p>Read campaign data as clues along a journey rather than isolated scores. Multiple issues may occur at the same time.</p>
  <div class="diagnostic-table" role="region" aria-label="Facebook Ads diagnostic clues" tabindex="0"><table><thead><tr><th>What you observe</th><th>What to investigate</th></tr></thead><tbody><tr><td>Few impressions or limited delivery</td><td>Campaign status, eligibility, audience size, schedule, budget, bid controls, placement availability, and delivery warnings.</td></tr><tr><td>Impressions but few clicks</td><td>Creative clarity, offer strength, headline, audience-message alignment, placement, and whether the CTA is understandable.</td></tr><tr><td>Clicks but fewer landing-page visits</td><td>Page speed, accidental clicks, tracking definitions, redirects, broken links, mobile compatibility, and the transition from ad to page.</td></tr><tr><td>Visitors but few enquiries or purchases</td><td>Offer continuity, page usability, form length, trust signals, price or conditions, tracking, and conversion friction.</td></tr><tr><td>Leads but few suitable opportunities</td><td>Audience, message, qualification questions, offer expectations, lead source, and how “qualified” is defined.</td></tr><tr><td>Suitable leads but few customers</td><td>Response speed, follow-up consistency, sales conversation, availability, pricing, customer fit, and offline outcomes.</td></tr></tbody></table></div>
  <p>For example, high click volume with low landing-page visits points to a different investigation than strong landing-page traffic with weak form completion. Start where the largest loss appears, but verify the surrounding data before assuming one metric proves the cause.</p>

  <h2 id="audit-checklist">Facebook Ads audit checklist</h2>
  <ul class="article-checklist"><li>The business outcome is written clearly.</li><li>The campaign objective and optimization event match that outcome as closely as practical.</li><li>The offer is understandable, relevant, and free from unsupported promises.</li><li>The audience and message make sense together.</li><li>The visual, headline, primary text, and CTA communicate one coherent idea.</li><li>The advertisement and landing page present the same offer and next step.</li><li>The landing page is usable and reasonably fast on mobile.</li><li>Pixel, server-side, form, call, or offline tracking is tested where applicable.</li><li>Success is evaluated using meaningful costs and outcomes, not impressions or clicks alone.</li><li>The budget and structure provide enough opportunity to collect useful evidence.</li><li>Changes are documented and based on a clear hypothesis.</li><li>Lead quality, response time, follow-up, and sales outcomes are reviewed with campaign data.</li></ul>

  <h2 id="next-steps">What should you do next?</h2>
  <ol class="article-steps"><li><strong>Define the business outcome.</strong> Decide whether the immediate goal is awareness, qualified enquiries, appointments, purchases, or another measurable step.</li><li><strong>Review the available campaign and conversion data.</strong> Include Ads Manager, website analytics, form records, calls, messages, and sales information where appropriate.</li><li><strong>Identify the weakest part of the journey.</strong> Look for the transition where the largest or most important loss occurs.</li><li><strong>Prioritize one or two evidence-based changes.</strong> Choose changes that address the suspected cause and can be evaluated clearly.</li><li><strong>Allow an appropriate evaluation period.</strong> Base it on the objective, event volume, buying cycle, budget, and amount of usable data—not a universal number of days.</li><li><strong>Compare meaningful results.</strong> Review lead quality, cost per meaningful action, and downstream outcomes before deciding what to keep or change next.</li></ol>
  <p>Do not increase spending simply because a campaign is underperforming. More budget may produce more of the same activity if the objective, offer, page, tracking, or follow-up remains weak.</p>

  <h2>Diagnose before you rebuild</h2>
  <p>Facebook and Instagram advertising performance is the result of connected decisions. The objective guides delivery. The offer and creative earn attention. The landing page continues the promise. Tracking provides evidence. Follow-up determines what happens to the opportunity.</p>
  <p>A campaign may need a new creative, a clearer offer, better tracking, a simpler landing page, a different objective, or a stronger follow-up process. The responsible way to find out is to examine the whole journey, identify the weakest point, and make focused changes instead of random edits.</p>
  <p>If you would like support reviewing the complete journey, learn more about the <a href="/services/paid-advertising/">Paid Advertising service</a> and the practical areas it may cover.</p>
  <aside class="article-cta"><span class="eyebrow">FREE CONSULTATION</span><h2>Not sure why your ads are not generating the results you expected?</h2><p>Book a free consultation to discuss your business goals, current marketing challenges, and practical next steps. The conversation can help you organize what to review without promising guaranteed leads, sales, or revenue.</p><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></aside>
  <div class="article-sources"><h2>Helpful official resources</h2><ul><li><a href="https://www.facebook.com/business/ads/ad-objectives" target="_blank" rel="noopener noreferrer">Meta: Campaign objectives</a></li><li><a href="https://www.facebook.com/business/tools/meta-pixel" target="_blank" rel="noopener noreferrer">Meta: Meta Pixel</a></li><li><a href="https://www.facebook.com/business/m/conversions-api" target="_blank" rel="noopener noreferrer">Meta: Conversions API</a></li><li><a href="https://web.dev/articles/optimize-lcp" target="_blank" rel="noopener noreferrer">web.dev: Optimize Largest Contentful Paint</a></li></ul></div>
  <a class="article-back article-back-bottom" href="/blog/">← Return to all articles</a>
  </div></div></article>`
});

const formEndpoint = '/api/submit-form';
const productionOrigin = 'https://aadityadahal1.com.np';
const formBackendFields = (sourcePath, formType) => `<input type="hidden" name="form_type" value="${formType}"><input type="hidden" name="submission_id" value=""><input type="hidden" name="source_page" value="${productionOrigin}${sourcePath}" data-source-url><input type="hidden" name="submission_date_time" value="" data-submission-time><input type="text" name="_honey" tabindex="-1" autocomplete="off" class="form-honeypot" aria-hidden="true">`;
const formFallback = (subject) => `<p class="form-fallback" data-form-fallback hidden>The form service is temporarily unavailable. Your information is still here. <a href="mailto:adtiyadahal964@gmail.com?subject=${encodeURIComponent(subject)}">Email Aaditya directly</a> or try again shortly.</p>`;

const inquiryForm = (kind) => `<form class="inquiry-form" data-submit-form="${kind}" data-ajax-action="${formEndpoint}" action="${formEndpoint}" method="POST" novalidate>
  ${formBackendFields('/contact/','contact')}
  <div data-form-content>
  <p class="required-help">Fields marked <span aria-hidden="true">*</span> are required.</p>
  <div class="field-row">
    <div class="form-field"><label for="contact-full-name"><span class="field-title">Full Name <b aria-hidden="true">*</b></span></label><input id="contact-full-name" name="full_name" type="text" autocomplete="name" required minlength="2" aria-describedby="contact-full-name-error"><span class="field-error" id="contact-full-name-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="contact-email"><span class="field-title">Email Address <b aria-hidden="true">*</b></span></label><input id="contact-email" name="email" type="email" autocomplete="email" required aria-describedby="contact-email-error"><span class="field-error" id="contact-email-error" aria-live="polite"></span></div>
  </div>
  <div class="form-field"><label for="contact-enquiry-type"><span class="field-title">Subject or Enquiry Type <b aria-hidden="true">*</b></span></label><select id="contact-enquiry-type" name="enquiry_type" required aria-describedby="contact-enquiry-type-error"><option value="">Choose an enquiry type</option><option>General question</option><option>Service enquiry</option><option>Partnership idea</option><option>Other</option></select><span class="field-error" id="contact-enquiry-type-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="contact-message"><span class="field-title">Message <b aria-hidden="true">*</b></span></label><textarea id="contact-message" name="message" rows="6" required minlength="10" placeholder="How can I help?" aria-describedby="contact-message-error"></textarea><span class="field-error" id="contact-message-error" aria-live="polite"></span></div>
  <button class="button button-primary" type="submit"><span class="button-label">Send Message</span></button>
  <p class="form-note privacy-note">Your information will only be used to respond to your enquiry or consultation request. <a href="/privacy/">Read the Privacy Policy.</a></p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  ${formFallback('New Contact Message — Aaditya Creatives')}
  </div>
  <section class="form-success" data-form-success hidden tabindex="-1" role="status" aria-live="polite"><p data-success-message></p><button class="button button-secondary" type="button" data-form-reset>Send Another Enquiry</button></section>
</form>`;

const consultationForm = () => `<form class="inquiry-form consultation-form" data-submit-form="consultation" data-ajax-action="${formEndpoint}" action="${formEndpoint}" method="POST" novalidate>
  ${formBackendFields('/consultation/','consultation')}
  <input type="hidden" name="timezone" value="">
  <input type="hidden" name="phone_with_country_code" value="">
  <div data-form-content>
  <p class="required-help">Fields marked <span aria-hidden="true">*</span> are required.</p>
  <p class="progress-status" data-progress-status role="status" aria-live="polite">0 required fields complete.</p>
  <div class="consultation-fields" data-consultation-fields>
  <span class="progress-rail" aria-hidden="true"><span></span></span>
  <div class="field-row">
    <div class="form-field"><label for="consultation-full-name"><span class="field-title">Full Name <b aria-hidden="true">*</b></span></label><input id="consultation-full-name" name="full_name" type="text" autocomplete="name" required minlength="2" placeholder="Enter your full name" aria-describedby="consultation-full-name-error"><span class="field-error" id="consultation-full-name-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-email"><span class="field-title">Email Address <b aria-hidden="true">*</b></span></label><input id="consultation-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" aria-describedby="consultation-email-error"><span class="field-error" id="consultation-email-error" aria-live="polite"></span></div>
  </div>
  <div class="field-row">
    <div class="form-field"><label for="consultation-business"><span class="field-title">Business Name <span class="optional-indicator">Optional</span></span></label><input id="consultation-business" name="business_name" type="text" autocomplete="organization" minlength="2" placeholder="Enter your business name" aria-describedby="consultation-business-error"><span class="field-error" id="consultation-business-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-website"><span class="field-title">Website or Social Media Link <span class="optional-indicator">Optional</span></span></label><input id="consultation-website" name="website_social" type="text" inputmode="url" placeholder="Website or social profile" aria-describedby="consultation-website-help"><span class="field-help" id="consultation-website-help">Optional — add a website or social media address.</span></div>
  </div>
  <div class="form-field phone-field" data-phone-step><label id="consultation-phone-label" for="consultation-phone"><span class="field-title">Phone / WhatsApp Number <span class="optional-indicator">Optional</span></span></label><div class="phone-composite"><div class="country-code-picker" data-country-picker><button class="country-code-trigger" id="consultation-country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="consultation-country-popover" aria-describedby="consultation-phone-help consultation-phone-error"><span data-selected-country>Nepal (+977)</span><svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div class="country-code-popover" id="consultation-country-popover" data-country-popover hidden><label class="sr-only" for="consultation-country-search">Search countries or calling codes</label><input class="country-search" id="consultation-country-search" name="country_code_search" form="country-code-search-interface" type="search" inputmode="search" autocomplete="off" placeholder="Search country or code" aria-controls="consultation-country-list"><div class="country-search-status sr-only" data-country-status role="status" aria-live="polite"></div><ul class="country-code-list" id="consultation-country-list" role="listbox" aria-label="International calling codes" data-country-list></ul></div><input name="phone_country_code" type="hidden" value="977" data-country-code></div><input id="consultation-phone" name="phone_number" type="tel" autocomplete="tel-national" inputmode="tel" data-progress-field placeholder="Enter your phone or WhatsApp number" aria-describedby="consultation-phone-help consultation-phone-error"></div><span class="field-help" id="consultation-phone-help">Optional — Nepal (+977) is selected by default.</span><span class="field-error" id="consultation-phone-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-challenge"><span class="field-title">Biggest Marketing Challenge <b aria-hidden="true">*</b></span></label><select id="consultation-challenge" name="marketing_challenge" required aria-describedby="consultation-challenge-error" aria-controls="consultation-other-challenge-field" aria-expanded="false"><option value="">Select your biggest challenge</option><option>Getting more customers</option><option>Generating leads</option><option>Improving paid advertising</option><option>Content and social media</option><option>Email marketing and lead generation</option><option>Website or landing page</option><option>SEO</option><option>Using AI in marketing</option><option>Other</option></select><span class="field-error" id="consultation-challenge-error" aria-live="polite"></span></div>
  <div class="form-field conditional-field" id="consultation-other-challenge-field" data-other-challenge hidden><label for="consultation-other-challenge"><span class="field-title">Please describe your marketing challenge <b aria-hidden="true">*</b></span></label><input id="consultation-other-challenge" name="other_challenge" type="text" disabled placeholder="Describe your marketing challenge" aria-describedby="consultation-other-challenge-error" aria-controls="consultation-other-challenge-error"><span class="field-error" id="consultation-other-challenge-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-goal"><span class="field-title">Main Business Goal <span class="optional-indicator">Optional</span></span></label><input id="consultation-goal" name="main_goal" type="text" placeholder="What would you like to improve or achieve?" aria-describedby="consultation-goal-error"><span class="field-error" id="consultation-goal-error" aria-live="polite"></span></div>
  <div class="field-row schedule-row">
    <div class="form-field"><label for="consultation-date"><span class="field-title">Preferred Consultation Date <span class="optional-indicator">Optional</span></span></label><input id="consultation-date" name="preferred_date" type="date" aria-describedby="consultation-date-error"><span class="field-error" id="consultation-date-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-time"><span class="field-title">Preferred Consultation Time <b aria-hidden="true">*</b></span></label><select id="consultation-time" name="preferred_time" required aria-describedby="consultation-time-help consultation-time-error"><option value="">Choose a suitable time</option><option>Morning — 9:00 AM to 12:00 PM</option><option>Afternoon — 12:00 PM to 4:00 PM</option><option>Evening — 4:00 PM to 7:00 PM</option><option>I'm flexible</option></select><span class="field-help" id="consultation-time-help" data-consultation-timezone>Time zone: your local time</span><span class="field-error" id="consultation-time-error" aria-live="polite"></span></div>
  </div>
  </div>
  <button class="button button-primary consultation-action" type="submit"><span class="consultation-action-label">Book a Free Consultation</span></button>
  <p class="form-note privacy-note">Your information will only be used to respond to your consultation request. <a href="/privacy/">Read the Privacy Policy.</a></p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  ${formFallback('New Free Consultation Request — Aaditya Creatives')}
  </div>
  <section class="form-success" data-form-success hidden tabindex="-1" role="status" aria-live="polite"><p data-success-message></p><button class="button button-secondary" type="button" data-form-reset>Send Another Enquiry</button></section>
</form>`;

const aiMarketingStructuredData = JSON.stringify({
  '@context':'https://schema.org',
  '@type':'BlogPosting',
  headline:aiMarketingArticle.title,
  description:aiMarketingArticle.description,
  image:`https://aadityadahal1.com.np${aiMarketingArticle.image}`,
  author:{'@type':'Person',name:'Aaditya Dahal'},
  publisher:{'@type':'Organization',name:'Aaditya Creatives'},
  mainEntityOfPage:`https://aadityadahal1.com.np/blog/${aiMarketingArticle.slug}/`
}).replaceAll('<','\\u003c');

const aiMarketingArticlePage = page({
  title:`${aiMarketingArticle.title} | Aaditya Creatives`,
  description:aiMarketingArticle.description,
  active:'/blog/',
  canonical:`https://aadityadahal1.com.np/blog/${aiMarketingArticle.slug}/`,
  ogImage:`https://aadityadahal1.com.np${aiMarketingArticle.image}`,
  ogType:'article',
  headExtra:`<meta name="keywords" content="AI in digital marketing for small businesses, AI marketing tools, social media planning, content creation, customer research"><script type="application/ld+json">${aiMarketingStructuredData}</script>`,
  bodyClassExtra:'page-blog-article',
  body:`<article class="blog-article"><header class="article-hero"><div class="shell article-hero-grid"><div class="article-hero-copy"><a class="article-back" href="/blog/">← Back to Blog</a><span class="eyebrow">${aiMarketingArticle.category}</span><h1>${aiMarketingArticle.title}</h1><p class="article-deck">A practical guide to using AI for research, planning, content, email, websites, and analysis—without replacing human judgment or exposing sensitive information.</p><div class="article-meta"><span>By Aaditya Dahal</span><span>${aiMarketingArticle.readingTime}</span></div></div>${aiMarketingThumbnail({className:'article-hero-image',eager:true})}</div></header>
  <div class="shell article-layout"><aside class="article-toc" aria-label="Article contents"><strong>In this article</strong><ol><li><a href="#what-ai-can-do">What AI can do</a></li><li><a href="#six-practical-uses">Six practical uses</a></li><li><a href="#choosing-tools">Choosing tools</a></li><li><a href="#seven-day-plan">7-day plan</a></li><li><a href="#mistakes">Mistakes to avoid</a></li><li><a href="#action-checklist">Action checklist</a></li></ol></aside><div class="article-content">
  <p class="article-intro">Small-business marketing often has to happen between customer work, administration, sales, and everyday operations. Researching an audience, planning content, writing emails, creating advertisements, and reviewing performance all require time that may not be available.</p>
  <p>AI can support parts of that workload. It can organize notes, suggest starting points, create first drafts, and help a business owner ask better questions about marketing data. It cannot automatically understand every customer, create a complete strategy, verify every fact, or guarantee sales.</p>
  <p>The most sensible approach is to give AI one clearly defined job, provide relevant non-sensitive context, review the output carefully, and measure whether the workflow improves quality or saves useful time. Current <a href="https://aws.amazon.com/smart-business/resources-for-smb/ai-in-marketing/" target="_blank" rel="noopener noreferrer">AWS guidance for small and medium businesses</a> similarly recommends starting with a small, measurable use case and expanding only when it is working.</p>

  <h2 id="what-ai-can-do">What can AI actually do in digital marketing?</h2>
  <p>Most widely available generative AI tools predict and produce text, images, summaries, or classifications from the instructions and information they receive. In marketing, that makes them useful assistants for brainstorming, organizing, drafting, adapting, and reviewing material.</p>
  <p>AI is generally strongest when the task has a clear input and output: turn interview notes into themes, suggest ten headline directions, organize a monthly content plan, or summarize a campaign report. Human judgment remains essential for strategy, factual accuracy, brand positioning, legal or platform requirements, customer empathy, approval, and final publication.</p>
  <p>Google’s <a href="https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" target="_blank" rel="noopener noreferrer">guidance on generative AI content</a> emphasizes accuracy, quality, relevance, and value. Producing large volumes of pages without adding value can conflict with its spam policies. AI assistance is not the problem; publishing weak, inaccurate, or unhelpful material is.</p>

  <h2 id="six-practical-uses">Six practical ways small businesses can use AI</h2>
  <p>You do not need all six. Choose the application connected to your most important current bottleneck and a result you can reasonably observe.</p>

  <h3>1. Customer and audience research</h3>
  <p><strong>The problem:</strong> Customer comments, enquiry notes, reviews, and sales conversations contain useful information, but a small team may not have time to organize it.</p>
  <p><strong>Practical workflow:</strong> Remove personal or confidential details, combine genuine feedback, and ask AI to group repeated questions, objections, desired outcomes, and language customers use. Treat the result as a set of hypotheses to verify through interviews, surveys, search data, or further conversations.</p>
  <p><strong>Hypothetical example:</strong> A local accounting firm summarizes anonymized enquiry notes and discovers that many prospects ask about bookkeeping deadlines and pricing clarity. It validates those themes before planning FAQs.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Group these anonymized customer questions into recurring themes. Quote the exact wording where useful, flag anything uncertain, and suggest five interview questions that could verify the patterns.”</blockquote>
  <p><strong>Verify:</strong> Check that every theme is supported by real evidence and that the input contains no sensitive information. <strong>Measure:</strong> Track whether the resulting interviews or content answer more genuine questions and reduce repeated enquiries.</p>

  <h3>2. Social media content planning</h3>
  <p><strong>The problem:</strong> Publishing becomes inconsistent when every post begins with a blank page.</p>
  <p><strong>Practical workflow:</strong> Give the tool a clear audience, offer, customer questions, brand voice, and publishing capacity. Ask it to organize themes into a realistic calendar, then add original experience, examples, photography, and final editing.</p>
  <p><strong>Hypothetical example:</strong> A café uses real customer questions about ingredients, ordering, and events to plan two useful posts each week rather than producing daily generic captions.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Create a four-week plan with two posts per week for [audience]. Use these verified customer questions. Include the purpose, format, key message, and CTA for each post. Do not invent claims or testimonials.”</blockquote>
  <p><strong>Verify:</strong> Confirm facts, tone, dates, prices, and ownership of media. <strong>Measure:</strong> Compare planning time, consistency, relevant replies, saves, enquiries, or website actions—not post volume alone.</p>

  <h3>3. Marketing copy and advertising ideas</h3>
  <p><strong>The problem:</strong> A business may know its offer but struggle to express it clearly or develop different creative directions.</p>
  <p><strong>Practical workflow:</strong> Supply a factual offer brief, audience problem, proof available, restrictions, and desired action. Use AI to brainstorm distinct angles, headlines, or first drafts. Select and rewrite the strongest options before checking the platform’s current requirements.</p>
  <p><strong>Hypothetical example:</strong> A tutoring business asks for headline directions focused separately on confidence, exam preparation, and parent communication, then chooses the angle best supported by its actual service.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Using only this approved offer information, draft five distinct headline and primary-text concepts for [audience]. Keep claims factual, explain the idea behind each concept, and use [action] as the CTA.”</blockquote>
  <p><strong>Verify:</strong> Review every claim, price, condition, targeting assumption, and platform rule. <strong>Measure:</strong> Test a small number of meaningfully different concepts against the same goal rather than assuming the first draft is effective.</p>

  <h3>4. Email marketing</h3>
  <p><strong>The problem:</strong> Welcome emails, newsletters, and follow-ups are valuable but easy to postpone.</p>
  <p><strong>Practical workflow:</strong> Define the reader, reason for the email, one useful message, and next action. Ask for a structured draft, then personalize it with genuine information and review consent, unsubscribe, privacy, and sender requirements applicable to your business.</p>
  <p><strong>Hypothetical example:</strong> A small workshop drafts a three-email welcome sequence explaining what subscribers will receive, a useful maintenance tip, and how to request help.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Draft a three-email welcome sequence for people who voluntarily joined [list]. Use this approved information, include one purpose and CTA per email, and mark where a real example or business detail is needed.”</blockquote>
  <p><strong>Verify:</strong> Do not paste customer records into a tool without understanding its data practices and having a lawful basis. <strong>Measure:</strong> Review delivery, unsubscribes, relevant clicks, replies, and completed actions alongside the time required to prepare the sequence.</p>

  <h3>5. Website and SEO content</h3>
  <p><strong>The problem:</strong> Useful website pages and articles require structure, clarity, and repeated editing.</p>
  <p><strong>Practical workflow:</strong> Start from genuine customer questions and your own verified knowledge. Use AI to organize an outline, identify missing explanations, improve readability, or draft titles and descriptions. Add original value and fact-check the final page.</p>
  <p><strong>Hypothetical example:</strong> A home-services business turns real pre-booking questions into an FAQ outline, then has a qualified person confirm the answers before publication.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Organize these verified customer questions into a helpful page outline. Identify gaps that require an expert answer. Do not invent facts, prices, guarantees, or local regulations.”</blockquote>
  <p><strong>Verify:</strong> Confirm expertise, accuracy, authorship, internal links, metadata, and whether the page genuinely helps the intended reader. Google’s <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">people-first content guidance</a> recommends useful original information rather than content created mainly to attract search traffic. <strong>Measure:</strong> Look at useful search queries, engaged visits, consultation paths, and whether customers find answers.</p>

  <h3>6. Marketing performance analysis</h3>
  <p><strong>The problem:</strong> Reports can contain many metrics without explaining what should be investigated next.</p>
  <p><strong>Practical workflow:</strong> Export only appropriate, non-sensitive summary data; define each metric and campaign goal; ask AI to describe patterns and questions—not to declare a final cause. Compare its observations with analytics, campaign setup, customer feedback, and business records.</p>
  <p><strong>Hypothetical example:</strong> An online retailer provides weekly totals for reach, visits, enquiries, and orders. AI notices that visits remained stable while completed checkouts declined, prompting a manual review of the checkout experience.</p>
  <blockquote class="article-prompt"><strong>Starting prompt:</strong> “Summarize the patterns in this anonymized weekly report. Separate observations from possible explanations, list missing information, and suggest five checks. Do not claim causation.”</blockquote>
  <p><strong>Verify:</strong> Confirm definitions, date ranges, tracking quality, external factors, and whether enough data exists. <strong>Measure:</strong> Judge whether the analysis produces faster, better-supported questions and decisions—not whether it generates a longer report.</p>

  <h2 id="choosing-tools">Practical tools and how to choose them</h2>
  <p>Tool categories may include general writing assistants, design assistants, email or CRM features, social scheduling tools, analytics assistants, and automation platforms. The best category is the one that fits a defined workflow; no single product is universally best.</p>
  <ul><li><strong>Cost:</strong> Compare the free plan, paid limits, usage caps, and the value of time saved.</li><li><strong>Ease of use:</strong> Prefer a tool the responsible person can use consistently without creating another complicated process.</li><li><strong>Integration:</strong> Start with safe AI features already available in tools you use before purchasing a new stack.</li><li><strong>Privacy:</strong> Review what data is collected, retained, used for training, shared, or controlled by administrators.</li><li><strong>Output quality:</strong> Test the tool on your actual task and check accuracy, tone, usefulness, and edit time.</li><li><strong>Business relevance:</strong> Define the result before subscribing. A tool that produces more content is not valuable if that content does not help customers or the team.</li></ul>
  <p>The New Zealand National Cyber Security Centre’s <a href="https://www.ncsc.govt.nz/protect-your-organisation/ai-guide-for-small-businesses/" target="_blank" rel="noopener noreferrer">AI guide for small businesses</a> highlights data leaks, privacy breaches, unreliable or manipulated outputs, and supply-chain risks. Review settings, terms, privacy policies, and internal rules before allowing business information into any AI service.</p>

  <h2 id="seven-day-plan">A simple 7-day getting-started plan</h2>
  <ol class="article-steps"><li><strong>Identify one bottleneck.</strong> Choose a recurring marketing task that consumes time and has a clear purpose.</li><li><strong>Gather safe inputs.</strong> Collect approved business information and anonymized customer evidence without sensitive data.</li><li><strong>Brainstorm and organize.</strong> Ask AI for options, themes, or a first structure—not a final answer.</li><li><strong>Review manually.</strong> Correct facts, add original expertise, improve the brand voice, and remove unsupported claims.</li><li><strong>Use one suitable output.</strong> Publish, send, or test only after the responsible person approves it.</li><li><strong>Review feedback.</strong> Record time spent, quality issues, customer response, and the most relevant performance measure.</li><li><strong>Decide what to do next.</strong> Improve, repeat, pause, or stop the workflow based on evidence.</li></ol>
  <p>Seven days is enough to test a small workflow, not to promise business growth. Some channels and buying decisions require longer evaluation periods.</p>

  <h2 id="mistakes">Common mistakes to avoid</h2>
  <ul><li>Publishing unchecked AI output or treating confident wording as proof.</li><li>Producing high volumes of generic content with little original value.</li><li>Sharing private customer, employee, financial, contractual, or strategic information without appropriate safeguards.</li><li>Treating AI-generated audience descriptions as verified customer research.</li><li>Automating every customer interaction and removing the option for human help.</li><li>Buying several tools before defining the actual business problem.</li><li>Measuring words, posts, or drafts instead of quality, time saved, enquiries, or another meaningful outcome.</li></ul>

  <h2 id="action-checklist">A practical action checklist</h2>
  <ul class="article-checklist"><li>Choose one real marketing bottleneck.</li><li>Define what a useful result would look like.</li><li>Use approved, relevant, non-sensitive information.</li><li>Ask AI for a draft, structure, or questions—not unquestioned truth.</li><li>Fact-check and edit every customer-facing output.</li><li>Keep final strategy and publication decisions with a responsible person.</li><li>Measure quality, useful time saved, and a relevant business signal.</li><li>Document what worked, what failed, and what should change.</li></ul>
  <p>AI is most useful when it supports a clear process. Start with one problem, one appropriate workflow, human review, and one way to evaluate the result. If that small test is useful and safe, you can expand gradually.</p>
  <p>For more context, explore the <a href="/services/ai-powered-digital-marketing/">AI-Powered Digital Marketing service</a> or read <a href="/blog/${facebookAdsArticle.slug}/">why Facebook Ads may not be getting results</a>.</p>

  <section class="article-cta"><span class="eyebrow">FREE CONSULTATION</span><h2>Not sure where AI could fit into your marketing?</h2><p>Book a free consultation to discuss your business goals, current challenges, and practical next steps—without assuming that every task needs AI.</p><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></section>
  <section class="article-sources"><h2>Further reading</h2><ul><li><a href="https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" target="_blank" rel="noopener noreferrer">Google Search: Guidance on generative AI content</a></li><li><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">Google Search: Creating helpful, reliable, people-first content</a></li><li><a href="https://www.ncsc.govt.nz/protect-your-organisation/ai-guide-for-small-businesses/" target="_blank" rel="noopener noreferrer">New Zealand NCSC: Artificial intelligence guide for small businesses</a></li><li><a href="https://aws.amazon.com/smart-business/resources-for-smb/ai-in-marketing/" target="_blank" rel="noopener noreferrer">AWS: AI marketing strategies for SMB growth and risk management</a></li></ul></section>
  <p class="article-back-bottom"><a href="/blog/">← Return to all articles</a></p>
  </div></div></article>`
});

const strategyStructuredData = JSON.stringify({
  '@context':'https://schema.org',
  '@type':'BlogPosting',
  headline:strategyArticle.title,
  description:strategyArticle.description,
  image:`https://aadityadahal1.com.np${strategyArticle.image}`,
  author:{'@type':'Person',name:'Aaditya Dahal'},
  publisher:{'@type':'Organization',name:'Aaditya Creatives'},
  mainEntityOfPage:`https://aadityadahal1.com.np/blog/${strategyArticle.slug}/`
}).replaceAll('<','\\u003c');

const strategyArticlePage = page({
  title:`${strategyArticle.title} | Aaditya Creatives`,
  description:strategyArticle.description,
  active:'/blog/',
  canonical:`https://aadityadahal1.com.np/blog/${strategyArticle.slug}/`,
  ogImage:`https://aadityadahal1.com.np${strategyArticle.image}`,
  ogType:'article',
  headExtra:`<meta name="keywords" content="digital marketing strategy for small businesses, marketing plan, target audience, digital marketing channels, marketing budget, marketing goals"><script type="application/ld+json">${strategyStructuredData}</script>`,
  bodyClassExtra:'page-blog-article',
  body:`<article class="blog-article"><header class="article-hero"><div class="shell article-hero-grid"><div class="article-hero-copy"><a class="article-back" href="/blog/">← Back to Blog</a><span class="eyebrow">${strategyArticle.category}</span><h1>${strategyArticle.title}</h1><p class="article-deck">A practical seven-step framework for deciding what to prioritize, how to use a limited budget, and how to learn from real customer and performance evidence.</p><div class="article-meta"><span>By Aaditya Dahal</span><span>${strategyArticle.readingTime}</span></div></div>${strategyThumbnail({className:'article-hero-image',eager:true})}</div></header>
  <div class="shell article-layout"><aside class="article-toc" aria-label="Article contents"><strong>In this article</strong><ol><li><a href="#what-strategy-means">What strategy means</a></li><li><a href="#seven-steps">Seven practical steps</a></li><li><a href="#common-mistakes">Mistakes to avoid</a></li><li><a href="#thirty-day-plan">30-day plan</a></li><li><a href="#strategy-checklist">Checklist</a></li></ol></aside><div class="article-content">
  <p class="article-intro">A small business can spend weeks posting on social media, updating its website, trying advertisements, and testing new tools without knowing whether those activities support the same goal. The problem is not always a lack of effort. It is often a lack of direction.</p>
  <p>A simple digital marketing strategy connects the business goal, customer, offer, message, channels, budget, activities, and measurement. It helps a business decide what deserves attention now—and what can wait.</p>
  <p>A strategy cannot guarantee leads, sales, rankings, or revenue. Markets, competitors, customer needs, pricing, execution, and timing all affect outcomes. Its value is that it gives the business a reason for each action and a way to learn from results.</p>

  <h2 id="what-strategy-means">What is a digital marketing strategy?</h2>
  <p>A strategy is not a list such as “post on Instagram, run ads, improve SEO, and send emails.” Those are possible activities. A strategy explains why certain activities were chosen, who they are intended to reach, what message they should communicate, what resources they require, and how progress will be judged.</p>
  <p>The U.S. Small Business Administration’s <a href="https://www.sba.gov/counseling/manage-your-business/" target="_blank" rel="noopener noreferrer">marketing-plan guidance</a> separates strategy from action: a business plan contains the central marketing strategy, while a marketing plan turns that strategy into actions. It recommends defining a target market, competitive advantage, sales process, goals, channels, budget, and measurement.</p>
  <p>A useful digital marketing strategy therefore answers seven questions:</p>
  <ol><li>What business result are we trying to support?</li><li>Which customers are most relevant?</li><li>What are we offering and why should they consider it?</li><li>Which channels fit their behaviour and our resources?</li><li>What will we do consistently?</li><li>What can we reasonably spend in money and time?</li><li>How will we know what to improve?</li></ol>

  <h2 id="seven-steps">Seven steps for a simple small-business strategy</h2>

  <h3>Step 1: Define one clear business goal</h3>
  <p>Begin with the result the business needs, not the platform you want to use. A goal should be specific enough to guide a decision and measurable enough to review.</p>
  <p>Examples include increasing relevant website enquiries, generating qualified consultation requests, improving online purchases, strengthening local awareness, or growing a permission-based email list. Define the timeframe, current baseline, intended change, and what qualifies as a meaningful result.</p>
  <p><strong>Hypothetical illustration:</strong> A local accounting firm changes “get more followers” to “increase suitable bookkeeping enquiries from local small businesses over the next three months.” That goal points toward local discovery, useful service information, a clear enquiry path, and qualified-enquiry tracking—not follower count alone.</p>
  <p>The goal should determine the metrics. If the objective is qualified enquiries, record suitable form submissions, calls, response time, appointment bookings, and eventual outcomes where attribution is reliable.</p>

  <h3>Step 2: Understand the target audience</h3>
  <p>Identify the people most likely to need and value the offer. Useful audience understanding includes their problem, location, buying situation, motivations, objections, decision criteria, information sources, and questions.</p>
  <p>A small business can begin without expensive research:</p>
  <ul><li>Review real enquiries, reviews, support questions, and sales notes.</li><li>Ask recent customers what prompted them to look for help and what nearly stopped them.</li><li>Record frequently asked questions and the words customers use.</li><li>Review website search queries, page behaviour, local-search activity, and campaign data where available.</li><li>Study competitors to understand market expectations—not to copy their message.</li></ul>
  <p>Start with a focused audience rather than “everyone.” The UK Government’s <a href="https://www.business.gov.uk/export-from-uk/learn/categories/prepare-sell-new-country/digital-marketing/how-to-create-a-digital-marketing-strategy/" target="_blank" rel="noopener noreferrer">digital marketing strategy guidance</a> recommends understanding the market, focusing on a specific audience, setting targets, and testing before expanding.</p>
  <p>Audience profiles created from assumptions or AI are hypotheses, not customer evidence. Verify them through actual conversations, behaviour, and results.</p>

  <h3>Step 3: Clarify the offer and marketing message</h3>
  <p>A useful message communicates what the business offers, who it is for, which problem it addresses, why it may be worth considering, and what the visitor should do next.</p>
  <p><strong>Unclear:</strong> “We provide innovative solutions to help your business succeed.”</p>
  <p><strong>Clearer hypothetical version:</strong> “Monthly bookkeeping support for local service businesses that need organized records and a clearer view of their finances. Request an introductory call to discuss your current process.”</p>
  <p>The clearer version identifies the service, audience, problem, and next step without promising a financial result. Support messages with genuine details such as process, scope, qualifications, policies, demonstrations, or accurately labelled examples.</p>

  <h3>Step 4: Choose the right digital marketing channels</h3>
  <p>Do not select a channel only because it is popular. Choose it because the audience uses it during the relevant part of the buying journey and the business can maintain it properly.</p>
  <ul><li><strong>Website and landing pages:</strong> Explain the offer, build credibility, answer questions, and make enquiries or purchases easier.</li><li><strong>SEO and local search:</strong> Help relevant people discover useful pages and accurate business information when they search. Google’s <a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer">SEO Starter Guide</a> explains that SEO helps search engines understand content and users decide whether to visit; it does not guarantee rankings.</li><li><strong>Social media and content:</strong> Answer questions, demonstrate knowledge, share useful updates, and remain visible where the audience already spends time.</li><li><strong>Paid advertising:</strong> Reach selected audiences and test offers when the objective, destination, tracking, creative, and budget are suitable.</li><li><strong>Email marketing:</strong> Continue permission-based communication with customers and people who have chosen to hear from the business.</li><li><strong>AI-assisted marketing:</strong> Support research, planning, drafting, and analysis while keeping facts, privacy, brand decisions, and publication under human review.</li></ul>
  <p>Begin with one or two priorities. A local emergency service may prioritize local search, accurate service pages, and call handling. A specialist consultant with a longer buying cycle may prioritize useful articles, LinkedIn, email follow-up, and consultation pages. The right mix depends on the customer, goal, resources, and ability to measure.</p>

  <h3>Step 5: Create a realistic content and campaign plan</h3>
  <p>Turn the strategy into a sustainable weekly rhythm. Content should help customers understand a problem, evaluate the offer, or take an appropriate next step.</p>
  <div class="diagnostic-table" role="region" aria-label="Illustrative one-week digital marketing plan" tabindex="0"><table><thead><tr><th>Day</th><th>Illustrative activity</th></tr></thead><tbody><tr><td>Monday</td><td>Review one customer question and improve the relevant website answer.</td></tr><tr><td>Tuesday</td><td>Publish one educational post using that question and link to useful information.</td></tr><tr><td>Wednesday</td><td>Share a clear service explanation or accurately labelled work example.</td></tr><tr><td>Thursday</td><td>Follow up with permission-based subscribers or recent enquiries where appropriate.</td></tr><tr><td>Friday</td><td>Review enquiries, engagement quality, website actions, and what customers asked next.</td></tr></tbody></table></div>
  <p>This is an illustration, not a required posting schedule. One useful weekly piece may be more sustainable than daily generic content. Use Google’s <a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">people-first content guidance</a>: create original, accurate information for an intended audience instead of producing content mainly for search traffic.</p>

  <h3>Step 6: Set a sensible budget and priorities</h3>
  <p>A marketing budget includes more than advertising spend. It may include website hosting and maintenance, design, photography, content creation, email or CRM tools, professional support, analytics, advertising, and the owner’s or team’s time.</p>
  <p>Separate three questions:</p>
  <ol><li>What does it cost to create and maintain the marketing assets?</li><li>What does it cost to distribute or promote them?</li><li>What happens operationally when an enquiry or sale arrives?</li></ol>
  <p>There is no responsible universal budget for every small business. A suitable amount depends on margins, cash flow, market competition, customer value, buying cycle, existing assets, risk tolerance, and measurement quality.</p>
  <p>Prioritize foundations before scale. If the offer is unclear, the website is difficult to use, or enquiries are not answered, increasing advertising may simply send more people into a weak journey. Establish a manageable test budget and decision rules: what will be tested, which metric matters, what evidence is needed, and what would cause the business to continue, revise, or stop.</p>

  <h3>Step 7: Measure results and improve</h3>
  <p>Match measurement to the goal. Possible metrics include relevant website visits, qualified enquiries, consultation bookings, conversion rate, cost per qualified lead, attributed sales, email sign-ups, meaningful email engagement, and appropriate local-search actions.</p>
  <p>Clicks, impressions, views, and followers can describe activity, but they are not automatically business outcomes. A small campaign with fewer but more suitable enquiries may be more useful than a large campaign producing low-quality traffic.</p>
  <p>Record a baseline before making changes. Review the customer journey from exposure to click, landing page, enquiry, response, qualification, and outcome. Identify where the most important loss occurs. Then change one or two relevant factors and document what happened. The UK guidance recommends benchmarks, testing, analytics, and varying one factor at a time when conducting an A/B test.</p>

  <h2 id="common-mistakes">Common digital marketing mistakes</h2>
  <ul><li><strong>Trying every platform:</strong> Choose channels connected to audience behaviour and available capacity.</li><li><strong>Posting without purpose:</strong> Give each piece a customer question, message, and appropriate next action.</li><li><strong>Targeting everyone:</strong> Start with a defined problem, location, or buying situation that can be tested.</li><li><strong>Using a confusing destination:</strong> Send visitors to the page that continues the same offer and CTA.</li><li><strong>Advertising without measurement:</strong> Confirm the goal, tracking, form, and follow-up process before increasing spend.</li><li><strong>Reacting to too little evidence:</strong> Define an evaluation approach that reflects volume, budget, and buying cycle.</li><li><strong>Ignoring enquiries:</strong> Assign responsibility and establish a clear response process.</li><li><strong>Copying competitors:</strong> Learn from market expectations but base the strategy on your customers and capabilities.</li><li><strong>Expecting immediate results:</strong> Separate short campaigns from longer-term trust, content, email, and search work.</li></ul>

  <h2 id="thirty-day-plan">A simple 30-day starter plan</h2>
  <div class="article-month-plan"><h3>Week 1: Direction and customer evidence</h3><p>Define one business goal, record a baseline, review the offer, collect genuine customer questions, and identify the most relevant audience.</p><h3>Week 2: Channels and foundations</h3><p>Select one or two priorities, review the website or landing page, confirm the CTA and tracking, and plan a small set of useful content.</p><h3>Week 3: Execute a focused activity</h3><p>Publish useful content, improve an important page, begin a permission-based email activity, or launch a controlled campaign only if the foundations are ready.</p><h3>Week 4: Review and prioritize</h3><p>Compare results with the baseline, review enquiry quality and customer feedback, locate the weakest step, and choose the next improvement.</p></div>
  <p>Thirty days creates a starting framework. It does not promise meaningful growth within one month; many customer decisions and channels require longer observation.</p>

  <h2 id="strategy-checklist">Digital marketing strategy checklist</h2>
  <ul class="article-checklist"><li>Define one clear business and marketing goal.</li><li>Record the current baseline and timeframe.</li><li>Use real customer questions and evidence.</li><li>Clarify the audience, offer, message, and next step.</li><li>Choose one or two suitable priority channels.</li><li>Create a sustainable activity plan.</li><li>Budget for creation, tools, distribution, and time.</li><li>Confirm tracking and enquiry follow-up.</li><li>Measure meaningful outcomes, not activity alone.</li><li>Test focused changes and document what you learn.</li></ul>
  <p>A useful strategy does not need to be complicated. It needs to connect a real customer need with a clear goal, a relevant offer, appropriate channels, consistent execution, and evidence-based improvement.</p>
  <p>Explore related guidance on <a href="/services/ai-powered-digital-marketing/">AI-Powered Digital Marketing</a>, <a href="/services/websites-landing-pages/">Websites &amp; Landing Pages</a>, and <a href="/services/seo/">SEO</a>. You can also read <a href="/blog/${aiMarketingArticle.slug}/">how small businesses can use AI in digital marketing</a> and <a href="/blog/${facebookAdsArticle.slug}/">why Facebook Ads may not be getting results</a>.</p>

  <section class="article-cta"><span class="eyebrow">FREE CONSULTATION</span><h2>Need help deciding where to focus your digital marketing?</h2><p>Book a free consultation to discuss your business goals, current challenges, and practical next steps.</p><a class="button button-primary" href="/consultation/">Book a Free Consultation</a></section>
  <section class="article-sources"><h2>Further reading</h2><ul><li><a href="https://www.sba.gov/counseling/manage-your-business/" target="_blank" rel="noopener noreferrer">U.S. Small Business Administration: Manage your business and make a marketing plan</a></li><li><a href="https://www.business.gov.uk/export-from-uk/learn/categories/prepare-sell-new-country/digital-marketing/how-to-create-a-digital-marketing-strategy/" target="_blank" rel="noopener noreferrer">UK Government: How to create a digital marketing strategy</a></li><li><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noopener noreferrer">Google Search: Creating helpful, reliable, people-first content</a></li><li><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noopener noreferrer">Google Search: SEO Starter Guide</a></li></ul></section>
  <p class="article-back-bottom"><a href="/blog/">← Return to all articles</a></p>
  </div></div></article>`
});

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
  body:`${innerHero('FREE CONSULTATION', 'Get a Clearer <em>Digital Marketing Plan</em>', 'Book a free consultation to discuss your business goals, identify marketing opportunities, and receive practical next steps you can start implementing.', mediaFrame(consultationMedia,{className:'consultation-hero-media',eager:true,caption:'A practical conversation focused on your business, marketing challenges, and next steps.'}), 'consultation-image-hero', '<div class="consultation-hero-action"><span class="aside-label">FREE · NO OBLIGATION</span><p>A focused conversation about your business and the next steps that make sense for you.</p><a class="button button-primary" href="#booking">Book a Free Consultation</a></div>')}
  <section class="section consultation-value"><div class="shell consultation-grid"><div><span class="eyebrow">A PRACTICAL CONVERSATION</span><h2 class="display-title">Clear direction for your <em>next marketing steps.</em></h2></div><p class="section-lead">You’ll have a practical conversation about your business, current marketing, and growth goals. Together, we’ll identify useful opportunities and outline clear next steps.</p></div></section>
  <section class="section tint-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">WHAT HAPPENS NEXT?</span><h2 class="display-title">Three simple <em>steps.</em></h2></div></div><div class="solution-steps consultation-process"><article><span>01</span><h3>Share Your Details</h3><p>Tell me about your business and the marketing challenge you are facing.</p></article><article><span>02</span><h3>Discuss Your Goals</h3><p>We’ll talk through your audience, current marketing, and business priorities.</p></article><article><span>03</span><h3>Receive Practical Next Steps</h3><p>You’ll leave with clear recommendations for moving forward.</p></article></div></div></section>
  <section class="section" id="booking"><div class="shell booking-grid"><div><span class="eyebrow">BOOK A FREE CONSULTATION</span><h2 class="display-title">Share the essentials. <em>Start with clarity.</em></h2><p>Free • No obligation • Tailored to your business</p><p>Complete the short form and choose a suitable consultation time. I’ll use your answers to prepare for a focused conversation.</p></div><div class="form-card consultation-card"><span class="mini-label">CONSULTATION REQUEST</span><h3>Book a Free Consultation</h3><p>Share a few useful details so we can focus the conversation on your priorities.</p>${consultationForm()}</div></div></section>`
});

const thankYou = page({
  title:'Thank You | Aaditya Creatives',
  description:'Your message has been received by Aaditya Creatives.',
  body:`${innerHero('MESSAGE RECEIVED', 'Thank you for <em>getting in touch.</em>', 'Your submission has been accepted. I’ll review the information you provided and respond using your contact details.')}
  <section class="section"><div class="shell consultation-invite"><div><span class="eyebrow">WHAT HAPPENS NEXT?</span><h2 class="display-title">Your message is now <em>ready for review.</em></h2><p>If you submitted a consultation request, I’ll review your business and marketing information before contacting you. For a general enquiry, I’ll reply using the email address you provided.</p></div><div class="section-actions"><a class="button button-primary" href="/">Return to Home</a><a class="underlined-link" href="/services/">Explore Services</a></div></div></section>`
});

function legalPlaceholder(type, details) {
  return page({title:`${type} Placeholder | Aaditya Creatives`,description:`Aaditya Creatives ${type.toLowerCase()} page placeholder. Final information will be reviewed before publication.`,body:`${innerHero(`${type.toUpperCase()} / PLACEHOLDER`, `${type} information is <em>being prepared.</em>`, `${details} This page is a clearly marked placeholder and is not a finalized legal document.`)}<section class="section"><div class="shell legal-box"><span class="eyebrow">TO BE COMPLETED</span><h2>Information that needs final review</h2><p>The contact and consultation forms send the information entered by visitors through a Vercel-hosted form endpoint and Resend to Aaditya Creatives for the purpose of responding to enquiries and consultation requests. Aaditya still needs to confirm the relevant business details and approve the final legal wording.</p><a class="underlined-link" href="/contact/">Return to contact</a></div></section>`});
}
const privacy = legalPlaceholder('Privacy Policy','The final policy will explain what information the forms collect, how it is used to respond, and that Vercel and Resend process submitted information for email delivery.');
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
  ['', home], ['about', about], ['services', services],
  ['blog', blog], [`blog/${strategyArticle.slug}`, strategyArticlePage], [`blog/${aiMarketingArticle.slug}`, aiMarketingArticlePage], [`blog/${facebookAdsArticle.slug}`, facebookAdsArticlePage], ['contact', contact], ['consultation', consultation], ['thank-you', thankYou], ['privacy', privacy], ['terms', terms],
  ...servicePages
];
await Promise.all([
  rm(new URL('ne/', out), {recursive:true, force:true}),
  rm(new URL('services/google-ads/', out), {recursive:true, force:true}),
  rm(new URL('services/digital-marketing/', out), {recursive:true, force:true}),
  rm(new URL('services/website-design/', out), {recursive:true, force:true}),
  rm(new URL('services/meta-ads/', out), {recursive:true, force:true}),
  rm(new URL('services/email-marketing/', out), {recursive:true, force:true}),
  rm(new URL('services/lead-generation/', out), {recursive:true, force:true}),
  rm(new URL('projects/', out), {recursive:true, force:true})
]);
await Promise.all(routes.map(([route, html]) => writeRoute(route, html)));
await writeFile(new URL('_redirects', out), [
  '/ne/* /:splat 301',
  '/services/google-ads/* /services/ 301',
  '/services/digital-marketing/* /services/#ai-marketing 301',
  '/services/website-design/* /services/#websites-landing-pages 301',
  '/services/meta-ads/* /services/paid-advertising/ 301',
  '/services/email-marketing/* /services/email-marketing-and-lead-generation/ 301',
  '/services/lead-generation/* /services/email-marketing-and-lead-generation/ 301',
  '/projects/* /services/ 301'
].join('\n'));
await Promise.all([
  writeRedirect('ne', '/'),
  writeRedirect('services/google-ads', '/services/'),
  writeRedirect('services/digital-marketing', '/services/#ai-marketing'),
  writeRedirect('services/website-design', '/services/#websites-landing-pages'),
  writeRedirect('services/meta-ads', '/services/paid-advertising/'),
  writeRedirect('services/email-marketing', '/services/email-marketing-and-lead-generation/'),
  writeRedirect('services/lead-generation', '/services/email-marketing-and-lead-generation/'),
  writeRedirect('projects', '/services/')
]);
console.log(`Built ${routes.length} English pages and legacy redirects`);
