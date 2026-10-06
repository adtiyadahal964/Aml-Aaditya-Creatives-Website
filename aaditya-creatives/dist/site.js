const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const mobileNav = window.matchMedia('(max-width: 950px)');
const ui = {
  open: 'Open navigation', close: 'Close navigation',
  notProvided: 'Not provided',
  loading: 'Preparing your message…',
  consultationLoading: 'Booking Your Consultation…',
  invalid: 'Please review the highlighted fields and complete the required information.',
  ready: 'Your message is ready to copy. Nothing has been sent or booked yet.',
  consultationReady: 'Thank you! Your consultation request is ready to copy. Nothing has been submitted yet.',
  error: 'Your message could not be prepared. Please review the form and try again.',
  consultationError: 'Something went wrong. Please try again or contact me directly.',
  copied: 'Copied. Nothing has been sent or booked.',
  select: 'Select and copy the highlighted text. Nothing has been sent or booked.'
};

// Country calling-code data derived from intl-tel-input 29.5.3 (MIT license).
const countryCallingCodes = [["af","93"],["ax","358"],["al","355"],["dz","213"],["as","1"],["ad","376"],["ao","244"],["ai","1"],["ag","1"],["ar","54"],["am","374"],["aw","297"],["ac","247"],["au","61"],["at","43"],["az","994"],["bs","1"],["bh","973"],["bd","880"],["bb","1"],["by","375"],["be","32"],["bz","501"],["bj","229"],["bm","1"],["bt","975"],["bo","591"],["ba","387"],["bw","267"],["br","55"],["io","246"],["vg","1"],["bn","673"],["bg","359"],["bf","226"],["bi","257"],["kh","855"],["cm","237"],["ca","1"],["cv","238"],["bq","599"],["ky","1"],["cf","236"],["td","235"],["cl","56"],["cn","86"],["cx","61"],["cc","61"],["co","57"],["km","269"],["cg","242"],["cd","243"],["ck","682"],["cr","506"],["ci","225"],["hr","385"],["cu","53"],["cw","599"],["cy","357"],["cz","420"],["dk","45"],["dj","253"],["dm","1"],["do","1"],["ec","593"],["eg","20"],["sv","503"],["gq","240"],["er","291"],["ee","372"],["sz","268"],["et","251"],["fk","500"],["fo","298"],["fj","679"],["fi","358"],["fr","33"],["gf","594"],["pf","689"],["ga","241"],["gm","220"],["ge","995"],["de","49"],["gh","233"],["gi","350"],["gr","30"],["gl","299"],["gd","1"],["gp","590"],["gu","1"],["gt","502"],["gg","44"],["gn","224"],["gw","245"],["gy","592"],["ht","509"],["hn","504"],["hk","852"],["hu","36"],["is","354"],["in","91"],["id","62"],["ir","98"],["iq","964"],["ie","353"],["im","44"],["il","972"],["it","39"],["jm","1"],["jp","81"],["je","44"],["jo","962"],["kz","7"],["ke","254"],["ki","686"],["xk","383"],["kw","965"],["kg","996"],["la","856"],["lv","371"],["lb","961"],["ls","266"],["lr","231"],["ly","218"],["li","423"],["lt","370"],["lu","352"],["mo","853"],["mg","261"],["mw","265"],["my","60"],["mv","960"],["ml","223"],["mt","356"],["mh","692"],["mq","596"],["mr","222"],["mu","230"],["yt","262"],["mx","52"],["fm","691"],["md","373"],["mc","377"],["mn","976"],["me","382"],["ms","1"],["ma","212"],["mz","258"],["mm","95"],["na","264"],["nr","674"],["np","977"],["nl","31"],["nc","687"],["nz","64"],["ni","505"],["ne","227"],["ng","234"],["nu","683"],["nf","672"],["kp","850"],["mk","389"],["mp","1"],["no","47"],["om","968"],["pk","92"],["pw","680"],["ps","970"],["pa","507"],["pg","675"],["py","595"],["pe","51"],["ph","63"],["pl","48"],["pt","351"],["pr","1"],["qa","974"],["re","262"],["ro","40"],["ru","7"],["rw","250"],["ws","685"],["sm","378"],["st","239"],["sa","966"],["sn","221"],["rs","381"],["sc","248"],["sl","232"],["sg","65"],["sx","1"],["sk","421"],["si","386"],["sb","677"],["so","252"],["za","27"],["kr","82"],["ss","211"],["es","34"],["lk","94"],["bl","590"],["sh","290"],["kn","1"],["lc","1"],["mf","590"],["pm","508"],["vc","1"],["sd","249"],["sr","597"],["sj","47"],["se","46"],["ch","41"],["sy","963"],["tw","886"],["tj","992"],["tz","255"],["th","66"],["tl","670"],["tg","228"],["tk","690"],["to","676"],["tt","1"],["tn","216"],["tr","90"],["tm","993"],["tc","1"],["tv","688"],["vi","1"],["ug","256"],["ua","380"],["ae","971"],["gb","44"],["us","1"],["uy","598"],["uz","998"],["vu","678"],["va","39"],["ve","58"],["vn","84"],["wf","681"],["eh","212"],["ye","967"],["zm","260"],["zw","263"]];
const initialiseCountryPicker = (picker) => {
  const trigger = picker.querySelector('[data-selected-country]')?.closest('button');
  const selectedLabel = picker.querySelector('[data-selected-country]');
  const popover = picker.querySelector('[data-country-popover]');
  const search = picker.querySelector('.country-search');
  const list = picker.querySelector('[data-country-list]');
  const status = picker.querySelector('[data-country-status]');
  const hidden = picker.querySelector('[data-country-code]');
  const phoneStep = picker.closest('[data-phone-step]');
  if (!trigger || !selectedLabel || !popover || !search || !list || !status || !hidden) return;
  const displayNames = typeof Intl.DisplayNames === 'function' ? new Intl.DisplayNames(['en'], { type: 'region' }) : null;
  const countries = countryCallingCodes.map(([iso2, dialCode]) => ({
    iso2,
    dialCode,
    name: displayNames?.of(iso2.toUpperCase()) || iso2.toUpperCase()
  })).sort((a, b) => a.name.localeCompare(b.name));
  let filtered = countries;
  let selectedIso2 = '';
  const options = () => [...list.querySelectorAll('[role="option"]')];
  const render = (query = '') => {
    const term = query.trim().toLocaleLowerCase();
    const digits = term.replace(/\D/g, '');
    filtered = countries.filter((country) => country.name.toLocaleLowerCase().includes(term) || country.iso2.includes(term) || (digits && country.dialCode.startsWith(digits)));
    list.replaceChildren();
    const clearOption = document.createElement('li');
    clearOption.role = 'option';
    clearOption.tabIndex = -1;
    clearOption.dataset.iso2 = '';
    clearOption.setAttribute('aria-selected', String(!selectedIso2));
    clearOption.textContent = 'Select code';
    list.append(clearOption);
    filtered.forEach((country) => {
      const option = document.createElement('li');
      option.role = 'option';
      option.tabIndex = -1;
      option.dataset.iso2 = country.iso2;
      option.dataset.dialCode = country.dialCode;
      option.setAttribute('aria-selected', String(country.iso2 === selectedIso2));
      option.textContent = `${country.name} (+${country.dialCode})`;
      list.append(option);
    });
    status.textContent = filtered.length === 1 ? '1 country found.' : `${filtered.length} countries found.`;
  };
  const close = (restoreFocus = false) => {
    popover.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  };
  const open = () => {
    popover.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    search.value = '';
    render();
    requestAnimationFrame(() => search.focus());
  };
  const choose = (option) => {
    selectedIso2 = option.dataset.iso2 || '';
    const country = countries.find((item) => item.iso2 === selectedIso2);
    hidden.value = country?.dialCode || '';
    selectedLabel.textContent = country ? `${country.name} (+${country.dialCode})` : 'Select code';
    trigger.setAttribute('aria-label', country ? `Country calling code: ${country.name}, plus ${country.dialCode} selected` : 'Select country calling code');
    phoneStep?.toggleAttribute('data-phone-touched', Boolean(country));
    status.textContent = country ? `${country.name}, plus ${country.dialCode}, selected.` : 'Country calling code cleared.';
    hidden.dispatchEvent(new Event('input', { bubbles: true }));
    render(search.value);
    close(true);
  };
  const moveFocus = (direction) => {
    const items = options();
    const current = items.indexOf(document.activeElement);
    const next = current < 0 ? (direction > 0 ? 0 : items.length - 1) : (current + direction + items.length) % items.length;
    items[next]?.focus();
  };
  trigger.addEventListener('click', () => popover.hidden ? open() : close(true));
  search.addEventListener('input', () => render(search.value));
  search.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveFocus(event.key === 'ArrowDown' ? 1 : -1);
    }
  });
  list.addEventListener('click', (event) => {
    const option = event.target.closest('[role="option"]');
    if (option) choose(option);
  });
  picker.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !popover.hidden) {
      event.preventDefault();
      close(true);
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && event.target.matches('[role="option"]')) {
      event.preventDefault();
      moveFocus(event.key === 'ArrowDown' ? 1 : -1);
    } else if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[role="option"]')) {
      event.preventDefault();
      choose(event.target);
    } else if (event.key === 'Home' && event.target.matches('[role="option"]')) {
      event.preventDefault();
      options()[0]?.focus();
    } else if (event.key === 'End' && event.target.matches('[role="option"]')) {
      event.preventDefault();
      options().at(-1)?.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!popover.hidden && !picker.contains(event.target)) close();
  });
  render();
};
document.querySelectorAll('[data-country-picker]').forEach(initialiseCountryPicker);
if (location.pathname === '/services/') {
  const legacyTarget = {
    '#google-ads': '/services/',
    '#digital-marketing': '/services/#ai-marketing',
    '#website-design': '/services/#websites-landing-pages'
  }[location.hash];
  if (legacyTarget) location.replace(legacyTarget);
}

const dropdowns = [...document.querySelectorAll('[data-nav-dropdown]')];
document.querySelectorAll('.nav-dropdown-menu a').forEach((link) => {
  const destination = new URL(link.href, location.href);
  if (destination.pathname === location.pathname && destination.hash && destination.hash === location.hash) {
    link.setAttribute('aria-current', 'page');
  }
});
const closeDropdown = (dropdown, restoreFocus = false) => {
  const trigger = dropdown?.querySelector('.nav-dropdown-trigger');
  const menu = dropdown?.querySelector('.nav-dropdown-menu');
  if (!dropdown || !trigger) return;
  dropdown.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  if (menu) {
    menu.inert = true;
    menu.setAttribute('aria-hidden', 'true');
  }
  if (restoreFocus) {
    dropdown.dataset.suppressFocusOpen = 'true';
    trigger.focus();
    setTimeout(() => delete dropdown.dataset.suppressFocusOpen, 0);
  }
};
const closeAllDropdowns = (except = null) => dropdowns.forEach((dropdown) => {
  if (dropdown !== except) closeDropdown(dropdown);
});
const openDropdown = (dropdown) => {
  const trigger = dropdown?.querySelector('.nav-dropdown-trigger');
  const menu = dropdown?.querySelector('.nav-dropdown-menu');
  if (!dropdown || !trigger) return;
  closeAllDropdowns(dropdown);
  dropdown.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  if (menu) {
    menu.inert = false;
    menu.setAttribute('aria-hidden', 'false');
  }
};

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector('.nav-dropdown-trigger');
  closeDropdown(dropdown);
  trigger?.addEventListener('click', () => {
    const shouldOpen = trigger.getAttribute('aria-expanded') !== 'true';
    shouldOpen ? openDropdown(dropdown) : closeDropdown(dropdown);
  });
  dropdown.addEventListener('pointerenter', (event) => {
    if (!mobileNav.matches && event.pointerType !== 'touch') openDropdown(dropdown);
  });
  dropdown.addEventListener('pointerleave', (event) => {
    if (!mobileNav.matches && event.pointerType !== 'touch') closeDropdown(dropdown);
  });
  dropdown.addEventListener('focusin', () => {
    if (!mobileNav.matches && dropdown.dataset.suppressFocusOpen !== 'true') openDropdown(dropdown);
  });
  dropdown.addEventListener('focusout', () => {
    queueMicrotask(() => {
      if (!mobileNav.matches && !dropdown.contains(document.activeElement)) closeDropdown(dropdown);
    });
  });
});

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? ui.open : ui.close);
    nav.classList.toggle('is-open', !open);
    document.body.classList.toggle('menu-open', !open);
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      closeAllDropdowns();
      if (mobileNav.matches) closeMenu();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDropdownElement = document.querySelector('[data-nav-dropdown].is-open');
    if (openDropdownElement) closeDropdown(openDropdownElement, true);
    else if (mobileNav.matches) closeMenu(true);
  });
  function closeMenu(restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', ui.open);
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    closeAllDropdowns();
    if (restoreFocus) menuButton.focus();
  }
}

mobileNav.addEventListener('change', () => closeAllDropdowns());

const themeToggle = document.querySelector('[data-theme-toggle]');
if (themeToggle) {
  const root = document.documentElement;
  const meta = document.querySelector('meta[name="theme-color"]');
  const isLight = () => root.dataset.theme === 'light';
  const syncThemeControl = () => {
    const light = isLight();
    themeToggle.querySelector('.theme-moon path')?.setAttribute('d', 'M20.2 15.4A8.4 8.4 0 0 1 8.6 3.8 8.6 8.6 0 1 0 20.2 15.4Z');
    const label = light ? 'Switch to dark theme' : 'Switch to light theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('aria-pressed', String(light));
    themeToggle.querySelector('.sr-only')?.replaceChildren(document.createTextNode(label));
    if (meta) meta.content = light ? '#FEF2A0' : '#070A0F';
  };
  syncThemeControl();
  themeToggle.addEventListener('click', () => {
    root.dataset.theme = isLight() ? 'dark' : 'light';
    try { localStorage.setItem('aaditya-theme', root.dataset.theme); } catch {}
    syncThemeControl();
  });
}

document.querySelectorAll('[data-copy-form]').forEach((form) => {
  const isConsultation = form.dataset.copyForm === 'consultation';
  const prepared = form.querySelector('.prepared-message');
  const output = prepared?.querySelector('textarea');
  const formStatus = form.querySelector('[data-form-status]');
  const copyStatus = prepared?.querySelector('[data-copy-status]');
  const submitButton = form.querySelector('button[type="submit"]');
  const value = (data, key) => String(data.get(key) || '').trim() || ui.notProvided;
  const selected = (name) => {
    const option = form.elements[name]?.selectedOptions?.[0];
    return option?.value ? option.textContent.trim() : ui.notProvided;
  };
  const errorElement = (field) => {
    const errorId = field?.getAttribute('aria-describedby')?.split(/\s+/).find((id) => id.endsWith('-error'));
    return errorId ? document.getElementById(errorId) : null;
  };
  const setFieldError = (field, message = '') => {
    const target = errorElement(field);
    if (target) target.textContent = message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (field?.name === 'phone_whatsapp') {
      const countryTrigger = form.querySelector('.country-code-trigger');
      if (message) countryTrigger?.setAttribute('aria-invalid', 'true');
      else countryTrigger?.removeAttribute('aria-invalid');
    }
  };
  const challengeField = isConsultation ? form.elements.marketing_challenge : null;
  const otherChallengeWrap = isConsultation ? form.querySelector('[data-other-challenge]') : null;
  const otherChallengeField = isConsultation ? form.elements.other_challenge : null;
  const dateField = isConsultation ? form.elements.preferred_date : null;
  const timezoneLabel = isConsultation ? form.querySelector('[data-consultation-timezone]') : null;
  const progressContainer = isConsultation ? form.querySelector('[data-consultation-fields]') : null;
  const progressStatus = isConsultation ? form.querySelector('[data-progress-status]') : null;
  const phoneField = isConsultation ? form.elements.phone_whatsapp : null;
  const phoneCodeField = isConsultation ? form.elements.phone_country_code : null;
  const phoneStep = isConsultation ? form.querySelector('[data-phone-step]') : null;
  const phoneIsValid = () => {
    const number = phoneField?.value.trim() || '';
    const code = phoneCodeField?.value.trim() || '';
    if (!number && !code) return true;
    if (!number || !code || !/^[\d\s()[\].-]+$/.test(number)) return false;
    const nationalDigits = number.replace(/\D/g, '').replace(/^0+/, '');
    const combinedDigits = `${code}${nationalDigits}`;
    return nationalDigits.length >= 4 && combinedDigits.length >= 7 && combinedDigits.length <= 15;
  };
  const formattedPhone = () => {
    if (!phoneField?.value.trim() || !phoneCodeField?.value.trim() || !phoneIsValid()) return ui.notProvided;
    return `+${phoneCodeField.value.trim()}${phoneField.value.replace(/\D/g, '').replace(/^0+/, '')}`;
  };
  const localDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  };
  const updateOtherChallenge = () => {
    if (!otherChallengeWrap || !otherChallengeField || !challengeField) return;
    const show = challengeField.value === 'Other';
    otherChallengeWrap.hidden = !show;
    otherChallengeField.disabled = !show;
    otherChallengeField.required = show;
    if (!show) setFieldError(otherChallengeField);
  };
  const progressFieldIsValid = (field) => {
    const text = field.value.trim();
    if (field.name === 'phone_whatsapp') return phoneIsValid();
    if (!text) return !field.required;
    if (field.name === 'email') return !field.validity.typeMismatch;
    if (field.name === 'full_name' || field.name === 'business_name') return text.length >= 2;
    if (field.name === 'main_goal') return text.length >= 10;
    if (field.name === 'preferred_date') return text >= localDate();
    return field.checkValidity();
  };
  const updateProgress = () => {
    if (!progressContainer) return;
    const steps = [...progressContainer.querySelectorAll('.form-field')].filter((step) => !step.hidden);
    let requiredTotal = 0;
    let requiredComplete = 0;
    steps.forEach((step) => {
      const field = step.querySelector('[data-progress-field], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled])');
      if (!field) return;
      const hasValue = Boolean(field.value.trim());
      const valid = progressFieldIsValid(field);
      if (field.required) {
        requiredTotal += 1;
        if (valid && hasValue) requiredComplete += 1;
      }
      let state = 'incomplete';
      if (field.getAttribute('aria-invalid') === 'true') state = 'error';
      else if (step.contains(document.activeElement)) state = 'active';
      else if (hasValue && valid) state = 'complete';
      step.dataset.progressState = state;
    });
    const ratio = requiredTotal ? requiredComplete / requiredTotal : 0;
    progressContainer.style.setProperty('--progress-fill', String(ratio));
    if (progressStatus) {
      const suffix = ratio === 1 ? ' Form essentials are complete.' : '';
      progressStatus.textContent = `${requiredComplete} of ${requiredTotal} required fields complete.${suffix}`;
    }
  };
  if (dateField) dateField.min = localDate();
  if (timezoneLabel) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timezoneLabel.textContent = `Time zone: ${timezone || 'your local time'}`;
  }
  updateOtherChallenge();
  updateProgress();
  challengeField?.addEventListener('change', () => {
    updateOtherChallenge();
    updateProgress();
  });
  if (isConsultation) {
    form.addEventListener('focusin', updateProgress);
    form.addEventListener('focusout', () => requestAnimationFrame(updateProgress));
  }

  const validateConsultation = () => {
    const fields = [...form.querySelectorAll('input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled])')];
    let firstInvalid = null;
    fields.forEach((field) => {
      const text = field.value.trim();
      let message = '';
      if (field.required && !text) {
        message = {
          full_name: 'Enter your full name.',
          business_name: 'Enter your business or company name.',
          email: 'Enter your email address.',
          marketing_challenge: 'Select your biggest marketing challenge.',
          other_challenge: 'Describe your marketing challenge.',
          main_goal: 'Describe your main marketing goal.'
        }[field.name] || 'Complete this required field.';
      } else if (field.name === 'email' && field.validity.typeMismatch) {
        message = 'Enter a valid email address.';
      } else if (field.name === 'phone_whatsapp' && (text || phoneCodeField?.value || phoneStep?.hasAttribute('data-phone-touched')) && !phoneIsValid()) {
        message = 'Enter a valid phone number or leave this optional field empty.';
      } else if (field.name === 'full_name' && text.length < 2) {
        message = 'Enter your full name.';
      } else if (field.name === 'business_name' && text.length < 2) {
        message = 'Enter your business or company name.';
      } else if (field.name === 'main_goal' && text.length < 10) {
        message = 'Please share a little more about your main goal.';
      } else if (field.name === 'preferred_date' && text && text < localDate()) {
        message = 'Choose today or a future date.';
      }
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    updateProgress();
    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  };

  form.addEventListener('input', (event) => {
    if (prepared) prepared.hidden = true;
    if (formStatus) formStatus.textContent = '';
    if (copyStatus) copyStatus.textContent = '';
    if (isConsultation && event.target.matches('input, select, textarea')) {
      if (event.target === phoneField) phoneStep?.setAttribute('data-phone-touched', '');
      setFieldError(event.target);
      updateProgress();
    }
  });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitButton?.getAttribute('aria-busy') === 'true') return;
    if (isConsultation ? !validateConsultation() : !form.checkValidity()) {
      if (formStatus) formStatus.textContent = ui.invalid;
      if (!isConsultation) form.reportValidity();
      return;
    }
    if (!prepared || !output || !formStatus || !submitButton) return;
    const submitLabel = submitButton.querySelector('.consultation-action-label, .button-label');
    const originalButtonText = submitLabel?.textContent || submitButton.textContent;
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    if (submitLabel) submitLabel.textContent = isConsultation ? ui.consultationLoading : ui.loading;
    else submitButton.textContent = isConsultation ? ui.consultationLoading : ui.loading;
    formStatus.textContent = isConsultation ? ui.consultationLoading : ui.loading;
    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const data = new FormData(form);
      if (isConsultation) {
        output.value = [
          'Free consultation request', '',
          `Full name: ${value(data, 'full_name')}`,
          `Business / company: ${value(data, 'business_name')}`,
          `Email: ${value(data, 'email')}`,
          `Phone / WhatsApp: ${formattedPhone()}`,
          `Website / social media: ${value(data, 'website_social')}`,
          `Main marketing challenge: ${selected('marketing_challenge')}`,
          ...(data.get('marketing_challenge') === 'Other' ? [`Challenge details: ${value(data, 'other_challenge')}`] : []),
          '', 'Main goal:', value(data, 'main_goal'),
          '', 'Anything else:', value(data, 'additional_info'),
          `Preferred date: ${value(data, 'preferred_date')}`,
          `Preferred time: ${selected('preferred_time')}`,
          `Time zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone || ui.notProvided}`
        ].join('\n');
      } else {
        output.value = [
          'Website enquiry', '',
          `Name: ${value(data, 'name')}`,
          `Email: ${value(data, 'email')}`,
          `Subject: ${selected('subject')}`, '',
          'Message:', value(data, 'message')
        ].join('\n');
      }
      prepared.hidden = false;
      formStatus.textContent = isConsultation ? ui.consultationReady : ui.ready;
      output.focus();
      output.select();
    } catch {
      formStatus.textContent = isConsultation ? ui.consultationError : ui.error;
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      if (submitLabel) submitLabel.textContent = originalButtonText;
      else submitButton.textContent = originalButtonText;
    }
  });
  prepared?.querySelector('[data-copy-button]')?.addEventListener('click', async () => {
    if (!output || !copyStatus) return;
    try {
      await navigator.clipboard.writeText(output.value);
      copyStatus.textContent = ui.copied;
    } catch {
      output.focus();
      output.select();
      copyStatus.textContent = ui.select;
    }
  });
});

const consultationCard = document.querySelector('.consultation-card');
if (consultationCard) {
  if ('IntersectionObserver' in window) {
    const shimmerObserver = new IntersectionObserver(([entry]) => {
      consultationCard.classList.toggle('is-shimmering', entry.isIntersecting);
    }, { threshold: 0.12 });
    shimmerObserver.observe(consultationCard);
  } else {
    consultationCard.classList.add('is-shimmering');
  }
}
