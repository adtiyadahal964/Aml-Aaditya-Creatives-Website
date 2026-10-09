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
    <div class="header-controls"><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to light theme" aria-pressed="false"><svg class="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.6 8.6 1 0 0 20.2 15.4Z"/></svg><svg class="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><span class="sr-only">Switch to light theme</span></button><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav"><span></span><span></span><span></span></button></div>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="shell footer-top"><div class="footer-intro"><a class="brand footer-brand" href="/" aria-label="Aaditya Creatives home"><img class="brand-logo" src="/aaditya-logo.png" width="1635" height="577" alt="Aaditya Creatives logo"></a><p><strong>AI • Digital Marketing • Growth</strong><br>Helping small and medium businesses use AI and digital marketing to build better marketing systems and create opportunities for growth.</p><a class="footer-consultation" href="/consultation/">Book a Free Consultation</a></div><div class="footer-links"><div class="footer-column"><h2>Navigate</h2><ul><li><a href="/">Home</a></li><li><a href="/about/">About Me</a></li><li><a href="/services/">Services</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact/">Contact</a></li></ul></div><div class="footer-column"><h2>Services</h2><ul>${footerServices.map(([name,url])=>`<li><a href="${url}">${name}</a></li>`).join('')}</ul></div><div class="footer-column footer-social"><h2>Connect/Follow</h2>${socialGroup()}</div></div></div><div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Aaditya Creatives. All rights reserved.</span><div><a href="/privacy/">Privacy placeholder</a><a href="/terms/">Terms placeholder</a></div></div></footer>`;
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
  'ai-powered-digital-marketing':['Smarter marketing planning','Practical AI-supported workflows'],
  'paid-advertising':['Focused paid advertising campaigns','Audience and campaign planning'],
  'content-marketing':['Useful content for your audience','Clear and consistent messaging'],
  'email-marketing-and-lead-generation':['Lead capture and email follow-ups','Clearer customer communication'],
  'websites-landing-pages':['Responsive business websites','Pages designed around clear actions'],
  'seo':['Clearer search visibility','Better content and page structure']
};

function serviceOverviewCard(service, extraClass='') {
  const bullets = serviceCardBullets[service.slug];
  return `<article${extraClass ? '' : ` id="${service.id}"`} class="service-overview-card service-overview-card--${service.slug}${extraClass ? ` ${extraClass}` : ''}"><div class="service-overview-top"><span class="service-index">SERVICE ${service.n}</span><span class="service-icon">${icon(service.icon)}</span></div><h3>${service.name}</h3><ul>${bullets.map(item=>`<li>${item}</li>`).join('')}</ul><a class="service-overview-arrow" href="/services/${service.slug}/" aria-label="Learn more about ${service.name}"><span class="sr-only">Learn more about ${service.name}</span><span aria-hidden="true">↗</span></a></article>`;
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

const home = page({
  title:'AI & Digital Marketing for Business Growth | Aaditya Creatives',
  description:'I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.',
  body:`<section class="hero"><div class="shell hero-grid"><div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span> AI-POWERED DIGITAL MARKETING FOR GROWING BUSINESSES</span><h1>Grow Your Business with <em>Smarter Digital Marketing</em></h1><p class="hero-lead">I help small and medium-sized businesses use AI and digital marketing to improve their online presence, attract potential customers, and build a clearer path for growth.</p><div class="hero-actions"><a class="button button-primary" href="/consultation/">Book a Free Consultation</a><a class="button button-secondary" href="/services/">Explore My Services</a></div><p class="hero-note">Get a customized Digital Marketing Plan with practical steps you can start implementing immediately.</p></div><figure class="hero-photo"><img src="/hero-portrait.png" width="1024" height="1536" alt="Portrait of Aaditya against a warm golden background" fetchpriority="high" decoding="async"><figcaption>Aaditya Creatives · AI · Digital Marketing · Growth</figcaption></figure></div></section>
  <section class="section intro-section"><div class="shell intro-grid"><div><span class="eyebrow">COMMON CHALLENGES</span><h2 class="display-title">Is your marketing taking time without producing <em>enough results?</em></h2><p class="section-lead">Without a clear plan, marketing can become confusing, expensive, and difficult to manage.</p></div><ul class="challenge-list"><li>Not receiving enough leads or enquiries</li><li>Spending money without knowing what is working</li><li>Posting content without a clear strategy</li><li>Unsure which marketing channels to use</li><li>Interested in AI but unsure how to apply it</li><li>Managing marketing without an internal marketing team</li></ul></div></section>
  <section class="section tint-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">A CLEARER WAY FORWARD</span><h2 class="display-title">AI-powered digital marketing can help you <em>move forward.</em></h2></div><p class="section-head-note">AI supports the work. Your business goals shape the plan.</p></div><p class="solution-copy">AI-powered digital marketing can help you understand your audience, improve your content, choose better marketing channels, and work more efficiently. I start by understanding your business and then identify practical marketing actions based on your goals.</p><div class="solution-steps"><article><span>01</span><h3>Understand Your Business</h3><p>Discuss your business, audience, goals, challenges, and current marketing.</p></article><article><span>02</span><h3>Find the Right Opportunities</h3><p>Identify useful marketing channels, AI tools, and practical improvements.</p></article><article><span>03</span><h3>Create Your Marketing Plan</h3><p>Get a customized plan with clear actions your business can start implementing.</p></article></div></div></section>
  <section class="section services-preview"><div class="shell"><div class="homepage-services-head"><span class="eyebrow">SERVICES</span><h2 class="display-title">Practical Digital Marketing Services<br> Built Around Your <em>Business Goals</em></h2><p class="section-lead">Explore practical services designed to improve your online presence, reach potential customers, and create a clearer marketing direction.</p><a class="underlined-link" href="/services/">Explore All Services</a></div><div class="service-showcase-list">${homeServiceShowcases()}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book My Free Consultation</a></div></div></section>
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
  body:`${innerHero('ABOUT ME', 'AI, digital marketing, and <em>business growth.</em>', "I'm building my career around the intersection of AI, digital marketing, and business growth.", '<figure class="about-hero-photo"><img src="/about-portrait.png" width="1114" height="1412" alt="Portrait of Aaditya against a teal background" fetchpriority="high" decoding="async"><figcaption>Understand the business → Find the opportunity → Build the strategy → Take action.</figcaption></figure>', 'about-image-hero')}
  <section class="section"><div class="shell story-grid"><div><span class="eyebrow">MY PURPOSE</span><h2 class="display-title">Marketing should have a <em>clear purpose.</em></h2></div><div class="rich-copy"><p>I believe digital marketing shouldn't be about simply posting more content or spending more money on ads. It should have a clear purpose — reaching the right people, building trust, generating leads, and helping businesses grow.</p><p>My goal is to help small and medium business owners understand where their marketing can improve and use AI and digital tools to create a more effective marketing system.</p><p>I'm continuously developing my skills through practical projects, learning, experimentation, and real-world application.</p></div></div></section>
  <section class="section tint-section"><div class="shell intro-grid"><div><span class="eyebrow">MY APPROACH</span><h2 class="display-title">Understand the business. <em>Take action.</em></h2></div><div class="intro-copy"><p class="flow-line">Understand the business → Find the opportunity → Build the strategy → Take action.</p><p>I focus on simple, practical marketing rather than complicated strategies that are difficult to use.</p><a class="underlined-link" href="/consultation/">Book a Free Consultation</a></div></div></section>
  ${cta()}`
});

const services = page({
  title:'AI & Digital Marketing Services | Aaditya Creatives',
  description:'AI-powered digital marketing, paid advertising, content marketing, email marketing and lead generation, websites and landing pages, and SEO for growing businesses.',
  active:'/services/',
  body:`${innerHero('SERVICES', 'Services Designed Around <em>Your Business Goals</em>', 'Explore practical digital marketing services that can help your business communicate clearly, reach potential customers, and create a stronger marketing direction.')}
  <section class="section services-directory-section"><div class="shell"><div class="service-overview-head"><span class="eyebrow">EXPLORE ALL SERVICES</span><h2 class="display-title">Six practical ways to support your <em>marketing direction.</em></h2><p class="section-lead">Choose a service to learn what it covers, which marketing problems it may address, and how it could support your business.</p></div><div class="service-overview-grid">${serviceCards()}</div><div class="section-cta"><a class="button button-primary" href="/consultation/">Book My Free Consultation</a></div></div></section>
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
    body:`${innerHero(`SERVICE ${service.n}`, heading, summary.intro, mediaFrame(serviceMedia[service.slug],{className:'service-hero-media',eager:true}), 'service-detail-hero', '<a class="button button-primary" href="/consultation/">Book My Free Consultation</a>')}
    <section class="section"><div class="shell service-detail-grid"><div class="service-detail-main"><article><span class="eyebrow">WHAT THE SERVICE IS</span><h2>Clear support built around your business</h2><p>${summary.what}</p><p>${extra.detailWhat}</p></article><article><span class="eyebrow">HOW IT MAY HELP</span><h2>A practical way forward</h2><p>${summary.help}</p><p>${extra.detailHelp}</p></article><article><span class="eyebrow">THE PURPOSE</span><h2>Focused on useful next steps</h2><p>${summary.purpose}</p></article></div><aside class="service-detail-side"><section><span class="mini-label">COMMON MARKETING PROBLEMS</span><ul class="benefit-list">${service.problems.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">THIS SERVICE MAY INCLUDE</span><ul class="benefit-list">${service.includes.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">WHO IT IS SUITABLE FOR</span><ul class="benefit-list">${extra.suitable.map(item=>`<li>${item}</li>`).join('')}</ul></section><section><span class="mini-label">PRACTICAL BENEFITS</span><ul class="benefit-list">${extra.benefits.map(item=>`<li>${item}</li>`).join('')}</ul></section></aside></div></section>
    <section class="section tint-section"><div class="shell faq-wrap"><div><span class="eyebrow">FREQUENTLY ASKED QUESTIONS</span><h2 class="display-title">Helpful details before <em>we begin.</em></h2></div><div class="faq-list">${extra.faqs.map(([question,answer])=>`<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}</div></div></section>
    <section class="section other-services-section"><div class="shell"><div class="section-head"><div><span class="eyebrow">MORE WAYS I CAN HELP</span><h2 class="display-title">Explore More Services</h2><p class="section-lead">Discover other practical services that may support your business goals.</p></div></div><div class="other-services-grid">${otherServiceCards(service.slug)}</div></div></section>
    ${cta('Let’s Find the Right Approach for Your Business','Book a free consultation to discuss your current marketing, business goals, and practical next steps.','Book My Free Consultation','Free • No obligation • Tailored to your business')}`
  });
}

const servicePages = servicesData.map(service => [
  `services/${service.slug}`,
  serviceDetailPage(service)
]);

const plannedArticles = [
  {title:'How AI Can Make Your Digital Marketing Smarter',excerpt:"AI isn't here to replace marketing strategy. It's a tool that can help you research faster, understand your audience, create better content, and improve your marketing workflow."},
  {title:'Why Your Facebook Ads May Not Be Getting Results',excerpt:"Spending more money isn't always the answer. Learn how audience, offer, creative, targeting, and landing pages work together to influence your ad performance."},
  {title:'What Should Your Business Post on Social Media?',excerpt:'If you\'re constantly asking, "What should I post today?", you may need a content strategy instead of more content ideas. Learn how to create content around your customers\' problems, questions, and buying journey.'},
  {title:'Why Email Marketing and Lead Generation Matter for Small Businesses',excerpt:'Social media can help you reach people, while lead capture and email give you a direct way to continue the conversation. Discover practical ways to collect enquiries, nurture leads, and stay connected with customers.'},
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

const formSubmitEndpoint = 'https://formsubmit.co/ajax/adtiyadahal964@gmail.com';
const productionOrigin = 'https://aadityadahal1.com.np';
const formSubmitFields = (subject, sourcePath) => `<input type="hidden" name="_subject" value="${subject}"><input type="hidden" name="_template" value="table"><input type="hidden" name="_url" value="${productionOrigin}${sourcePath}" data-source-url><input type="hidden" name="source_page" value="${productionOrigin}${sourcePath}"><input type="hidden" name="submission_date_time" value="" data-submission-time><input type="text" name="_honey" tabindex="-1" autocomplete="off" class="form-honeypot" aria-hidden="true">`;

const inquiryForm = (kind) => `<form class="inquiry-form" data-submit-form="${kind}" action="${formSubmitEndpoint}" method="POST" novalidate>
  ${formSubmitFields('New Contact Message — Aaditya Creatives','/contact/')}
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
  </div>
  <section class="form-success" data-form-success hidden tabindex="-1" role="status" aria-live="polite"><p data-success-message></p><button class="button button-secondary" type="button" data-form-reset>Send Another Enquiry</button></section>
</form>`;

const consultationForm = () => `<form class="inquiry-form consultation-form" data-submit-form="consultation" action="${formSubmitEndpoint}" method="POST" novalidate>
  ${formSubmitFields('New Free Consultation Request — Aaditya Creatives','/consultation/')}
  <input type="hidden" name="timezone" value="">
  <input type="hidden" name="phone_with_country_code" value="">
  <div data-form-content>
  <p class="required-help">Fields marked <span aria-hidden="true">*</span> are required.</p>
  <p class="progress-status" data-progress-status role="status" aria-live="polite">0 required fields complete.</p>
  <div class="consultation-fields" data-consultation-fields>
  <span class="progress-rail" aria-hidden="true"><span></span></span>
  <div class="field-row">
    <div class="form-field"><label for="consultation-full-name"><span class="field-title">Full Name <b aria-hidden="true">*</b></span></label><input id="consultation-full-name" name="full_name" type="text" autocomplete="name" required minlength="2" placeholder="Enter your full name" aria-describedby="consultation-full-name-error"><span class="field-error" id="consultation-full-name-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-business"><span class="field-title">Business / Company Name <span class="optional-indicator">Optional</span></span></label><input id="consultation-business" name="business_name" type="text" autocomplete="organization" minlength="2" placeholder="Enter your business or company name" aria-describedby="consultation-business-error"><span class="field-error" id="consultation-business-error" aria-live="polite"></span></div>
  </div>
  <div class="field-row">
    <div class="form-field"><label for="consultation-email"><span class="field-title">Email Address <b aria-hidden="true">*</b></span></label><input id="consultation-email" name="email" type="email" autocomplete="email" required placeholder="you@example.com" aria-describedby="consultation-email-error"><span class="field-error" id="consultation-email-error" aria-live="polite"></span></div>
    <div class="form-field phone-field" data-phone-step><label id="consultation-phone-label" for="consultation-phone"><span class="field-title">Phone / WhatsApp Number <span class="optional-indicator">Optional</span></span></label><div class="phone-composite"><div class="country-code-picker" data-country-picker><button class="country-code-trigger" id="consultation-country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="consultation-country-popover" aria-describedby="consultation-phone-help consultation-phone-error"><span data-selected-country>Nepal (+977)</span><svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5"/></svg></button><div class="country-code-popover" id="consultation-country-popover" data-country-popover hidden><label class="sr-only" for="consultation-country-search">Search countries or calling codes</label><input class="country-search" id="consultation-country-search" name="country_code_search" form="country-code-search-interface" type="search" inputmode="search" autocomplete="off" placeholder="Search country or code" aria-controls="consultation-country-list"><div class="country-search-status sr-only" data-country-status role="status" aria-live="polite"></div><ul class="country-code-list" id="consultation-country-list" role="listbox" aria-label="International calling codes" data-country-list></ul></div><input name="phone_country_code" type="hidden" value="977" data-country-code></div><input id="consultation-phone" name="phone_number" type="tel" autocomplete="tel-national" inputmode="tel" data-progress-field placeholder="Enter your phone or WhatsApp number" aria-describedby="consultation-phone-help consultation-phone-error"></div><span class="field-help" id="consultation-phone-help">Optional — Nepal (+977) is selected by default.</span><span class="field-error" id="consultation-phone-error" aria-live="polite"></span></div>
  </div>
  <div class="form-field"><label for="consultation-website"><span class="field-title">Website / Social Media</span></label><input id="consultation-website" name="website_social" type="text" inputmode="url" placeholder="Website or social media profile link" aria-describedby="consultation-website-help"><span class="field-help" id="consultation-website-help">Optional — enter a website or social media address.</span></div>
  <div class="form-field"><label for="consultation-business-description"><span class="field-title">What does your business do? <span class="optional-indicator">Optional</span></span></label><textarea id="consultation-business-description" name="business_description" rows="4" minlength="10" placeholder="Briefly describe your products, services, and customers" aria-describedby="consultation-business-description-error"></textarea><span class="field-error" id="consultation-business-description-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-challenge"><span class="field-title">What is your biggest marketing challenge right now? <span class="optional-indicator">Optional</span></span></label><select id="consultation-challenge" name="marketing_challenge" aria-describedby="consultation-challenge-error"><option value="">Select your biggest challenge</option><option>Getting more customers</option><option>Email Marketing and Lead Generation</option><option>Improving Paid Advertising</option><option>Content &amp; social media</option><option>Website / landing page</option><option>Using AI in my marketing</option><option>Other</option></select><span class="field-error" id="consultation-challenge-error" aria-live="polite"></span></div>
  <div class="form-field conditional-field" data-other-challenge hidden><label for="consultation-other-challenge"><span class="field-title">Please describe your marketing challenge <span class="optional-indicator">Optional</span></span></label><input id="consultation-other-challenge" name="other_challenge" type="text" disabled placeholder="Describe your marketing challenge" aria-describedby="consultation-other-challenge-error"><span class="field-error" id="consultation-other-challenge-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-goal"><span class="field-title">What is your main goal? <span class="optional-indicator">Optional</span></span></label><textarea id="consultation-goal" name="main_goal" rows="5" minlength="10" placeholder="Describe what you would like to achieve through marketing" aria-describedby="consultation-goal-error"></textarea><span class="field-error" id="consultation-goal-error" aria-live="polite"></span></div>
  <div class="form-field"><label for="consultation-tried"><span class="field-title">What have you tried so far?</span></label><textarea id="consultation-tried" name="previous_marketing_attempts" rows="4" placeholder="Share any marketing activities, tools, or approaches you have already tried"></textarea></div>
  <div class="form-field"><label for="consultation-additional"><span class="field-title">Anything else you'd like me to know? <span class="optional-indicator">Optional</span></span></label><textarea id="consultation-additional" name="additional_information" rows="4" placeholder="Share any additional details that may help me prepare for our consultation"></textarea></div>
  <div class="field-row">
    <div class="form-field"><label for="consultation-date"><span class="field-title">Preferred consultation date</span></label><input id="consultation-date" name="preferred_date" type="date" aria-describedby="consultation-date-error"><span class="field-error" id="consultation-date-error" aria-live="polite"></span></div>
    <div class="form-field"><label for="consultation-time"><span class="field-title">Preferred consultation time</span></label><select id="consultation-time" name="preferred_time"><option value="">Choose a time</option><option>Morning</option><option>Afternoon</option><option>Evening</option><option>I'm flexible</option></select><span class="field-help" data-consultation-timezone>Time zone: your local time</span></div>
  </div>
  </div>
  <button class="button button-primary consultation-action" type="submit"><span class="consultation-action-label">Book My Free Consultation</span></button>
  <p class="form-note privacy-note">Your information will only be used to respond to your enquiry or consultation request. <a href="/privacy/">Read the Privacy Policy.</a></p>
  <p class="form-status" data-form-status role="status" aria-live="polite"></p>
  </div>
  <section class="form-success" data-form-success hidden tabindex="-1" role="status" aria-live="polite"><p data-success-message></p><button class="button button-secondary" type="button" data-form-reset>Send Another Enquiry</button></section>
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
  body:`${innerHero('FREE CONSULTATION', 'Get a Customized <em>Digital Marketing Plan.</em>', 'Book a free consultation to discuss your business, marketing challenges, and growth opportunities. You’ll receive clear, practical recommendations you can start implementing immediately.', mediaFrame(consultationMedia,{className:'consultation-hero-media',eager:true,caption:'A practical conversation focused on your business, marketing challenges, and next steps.'}), 'consultation-image-hero', '<div class="consultation-hero-action"><span class="aside-label">FREE · NO OBLIGATION</span><p>A focused conversation about your business and the next steps that make sense for you.</p><a class="button button-primary" href="#booking">Book a Free Consultation</a></div>')}
  <section class="section"><div class="shell consultation-grid"><div><span class="eyebrow">WHAT HAPPENS DURING THE CONSULTATION</span><h2 class="display-title">A focused conversation with <em>clear next steps.</em></h2><p class="section-lead">The discussion is shaped around your business, audience, current marketing, and practical opportunities.</p></div><ul class="benefit-list"><li>Discuss the business and its goals</li><li>Understand the target customers</li><li>Review the current marketing situation</li><li>Identify problems and opportunities</li><li>Explore practical uses of AI and digital marketing</li><li>Outline clear next steps</li></ul></div></section>
  <section class="section tint-section"><div class="shell consultation-grid"><div><span class="eyebrow">WHO IS THIS CONSULTATION FOR?</span><h2 class="display-title">Practical support for businesses seeking <em>clearer direction.</em></h2></div><ul class="benefit-list"><li>Small and medium-sized business owners</li><li>Entrepreneurs</li><li>Businesses that need more leads or enquiries</li><li>Businesses without an internal marketing team</li><li>Business owners who want to use AI in their marketing</li><li>Businesses that need a clearer marketing direction</li></ul></div></section>
  <section class="section"><div class="shell"><div class="section-head"><div><span class="eyebrow">HOW IT WORKS</span><h2 class="display-title">Three simple <em>steps.</em></h2></div></div><div class="solution-steps consultation-process"><article><span>01</span><h3>Book Your Call</h3><p>Choose a suitable time and provide a few details about your business.</p></article><article><span>02</span><h3>Discuss Your Marketing</h3><p>Talk about your goals, challenges, audience, and current marketing.</p></article><article><span>03</span><h3>Get Your Customized Plan</h3><p>Receive practical marketing actions you can begin implementing.</p></article></div></div></section>
  <section class="section tint-section" id="booking"><div class="shell booking-grid"><div><span class="eyebrow">BOOK A FREE CONSULTATION</span><h2 class="display-title">A plan tailored to <em>your business.</em></h2><p>Free • No obligation • Tailored to your business</p><p>Provide the essential details and your preferred timing. Your request will be emailed directly so I can respond and prepare for the consultation.</p></div><div class="form-card consultation-card"><span class="mini-label">CONSULTATION REQUEST</span><h3>Book a Free Consultation</h3><p>Tell me about your business, your biggest marketing challenge, and what you want to achieve. I’ll use these details to prepare for a focused, practical consultation.</p>${consultationForm()}</div></div></section>`
});

function legalPlaceholder(type, details) {
  return page({title:`${type} Placeholder | Aaditya Creatives`,description:`Aaditya Creatives ${type.toLowerCase()} page placeholder. Final information will be reviewed before publication.`,body:`${innerHero(`${type.toUpperCase()} / PLACEHOLDER`, `${type} information is <em>being prepared.</em>`, `${details} This page is a clearly marked placeholder and is not a finalized legal document.`)}<section class="section"><div class="shell legal-box"><span class="eyebrow">TO BE COMPLETED</span><h2>Information that needs final review</h2><p>The contact and consultation forms send the information entered by visitors through FormSubmit to Aaditya Creatives for the purpose of responding to enquiries and consultation requests. Aaditya still needs to confirm the relevant business details and approve the final legal wording.</p><a class="underlined-link" href="/contact/">Return to contact</a></div></section>`});
}
const privacy = legalPlaceholder('Privacy Policy','The final policy will explain what information the forms collect, how it is used to respond, and that FormSubmit processes submitted information for email delivery.');
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
  ['blog', blog], ['contact', contact], ['consultation', consultation], ['privacy', privacy], ['terms', terms],
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
  rm(new URL('projects/', out), {recursive:true, force:true}),
  rm(new URL('thank-you/', out), {recursive:true, force:true})
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
