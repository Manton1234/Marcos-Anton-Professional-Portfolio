const iconSvg = {
  github: `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.57.1.78-.25.78-.55v-2.1c-3.17.69-3.84-1.36-3.84-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.53-.29-5.2-1.27-5.2-5.64 0-1.25.45-2.26 1.18-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.8 10.8 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.81 1.18 3.06 0 4.38-2.67 5.35-5.21 5.63.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.79.55A11.3 11.3 0 0 0 12 .7Z"/>
    </svg>`,
  linkedin: `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.04H3.53V8.98H7.1v11.47ZM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"/>
    </svg>`,
  email: `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
      <path d="m3 7 9 6 9-6"></path>
    </svg>`,
};

function iconLink(kind, href, label) {
  return `<a class="icon-link ${kind}" href="${href}" aria-label="${label}" title="${label}">${iconSvg[kind]}<span class="sr-only">${label}</span></a>`;
}

function enhanceBrand() {
  const brand = document.querySelector(".brand");
  if (!brand || brand.querySelector("img")) return;
  brand.innerHTML = `<img src="digital-marketing-portfolio/assets/argtech-logo.png" alt="" aria-hidden="true"><span>Arg Tech | Marcos Anton</span>`;
}

function addHeaderIcons() {
  const topbar = document.querySelector(".topbar");
  if (!topbar || topbar.querySelector(".social-icons")) return;

  const icons = document.createElement("div");
  icons.className = "social-icons";
  icons.innerHTML = [
    iconLink("github", "https://github.com/Manton1234", "GitHub"),
    iconLink("linkedin", "https://www.linkedin.com/", "LinkedIn"),
    iconLink("email", "mailto:manton@cpp.edu", "Email"),
  ].join("");
  topbar.appendChild(icons);
}

function upgradeIconPlaceholders() {
  document.querySelectorAll("[data-icon]").forEach((link) => {
    const kind = link.dataset.icon;
    if (!iconSvg[kind]) return;
    const label = link.getAttribute("aria-label") || link.textContent.trim() || kind;
    link.classList.add("icon-link", kind);
    link.innerHTML = `${iconSvg[kind]}<span class="sr-only">${label}</span>`;
  });
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll(".card, .metric, .chart, table, .handshake, .presentation-shell, .embedded-deck, .sales-model, .model-result, .proof-frame, .premium-panel, .expertise-card, .rubric-item, .hero-portrait");
  targets.forEach((el) => el.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  targets.forEach((el) => observer.observe(el));
}

function setupSlideDecks() {
  const decks = document.querySelectorAll("[data-slide-deck]");
  if (!decks.length) return;

  decks.forEach((deck) => {
    const image = deck.querySelector("[data-deck-image]");
    const status = deck.querySelector("[data-deck-status]");
    const previous = deck.querySelector("[data-deck-prev]");
    const next = deck.querySelector("[data-deck-next]");
    const thumbnails = deck.querySelector("[data-deck-thumbnails]");
    const totalSlides = Number(deck.dataset.totalSlides || 0);

    if (!image || !totalSlides) return;

    let currentSlide = 1;
    let thumbnailButtons = [];

    const slidePath = (slideNumber) => `argtech-slides/slide-${String(slideNumber).padStart(2, "0")}.png`;

    const setActiveThumbnail = () => {
      thumbnailButtons.forEach((button) => {
        const isActive = Number(button.dataset.slideIndex) === currentSlide;
        button.setAttribute("aria-current", String(isActive));
      });
    };

    const showSlide = (slideNumber) => {
      currentSlide = ((slideNumber - 1 + totalSlides) % totalSlides) + 1;
      deck.classList.add("is-changing");
      image.src = slidePath(currentSlide);
      image.alt = `Arg Tech digital marketing presentation slide ${currentSlide}`;
      if (status) status.textContent = `Slide ${currentSlide} of ${totalSlides}`;
      setActiveThumbnail();
      window.setTimeout(() => deck.classList.remove("is-changing"), 180);
    };

    if (thumbnails) {
      const fragment = document.createDocumentFragment();

      for (let slide = 1; slide <= totalSlides; slide += 1) {
        const button = document.createElement("button");
        button.className = "deck-thumb";
        button.type = "button";
        button.dataset.slideIndex = String(slide);
        button.setAttribute("aria-label", `Go to slide ${slide}`);
        button.innerHTML = `<img src="${slidePath(slide)}" alt=""><span>${slide}</span>`;
        fragment.appendChild(button);
      }

      thumbnails.appendChild(fragment);
      thumbnailButtons = Array.from(thumbnails.querySelectorAll("[data-slide-index]"));
      thumbnails.addEventListener("click", (event) => {
        const button = event.target.closest("[data-slide-index]");
        if (button) showSlide(Number(button.dataset.slideIndex));
      });
    }

    previous?.addEventListener("click", () => showSlide(currentSlide - 1));
    next?.addEventListener("click", () => showSlide(currentSlide + 1));
    showSlide(1);
  });
}

function setupSalesModel() {
  const model = document.querySelector("[data-sales-model]");
  if (!model) return;

  const presets = {
    suv: {
      label: "SUV",
      purchaseCost: 14500,
      reconditioning: 2200,
      marketingSpend: 475,
      fees: 750,
      margin: 22,
      demand: "Strong family and commuter demand",
    },
    truck: {
      label: "Truck",
      purchaseCost: 18000,
      reconditioning: 2800,
      marketingSpend: 550,
      fees: 850,
      margin: 24,
      demand: "High utility demand and stronger gross profit",
    },
    sedan: {
      label: "Sedan",
      purchaseCost: 8500,
      reconditioning: 1600,
      marketingSpend: 325,
      fees: 650,
      margin: 18,
      demand: "Affordable entry point with faster buyer conversations",
    },
    hybrid: {
      label: "Hybrid",
      purchaseCost: 12500,
      reconditioning: 1700,
      marketingSpend: 400,
      fees: 700,
      margin: 20,
      demand: "Fuel-efficiency angle for search and marketplace copy",
    },
    luxury: {
      label: "Luxury",
      purchaseCost: 27000,
      reconditioning: 3600,
      marketingSpend: 850,
      fees: 1000,
      margin: 26,
      demand: "Higher ticket price, more proof needed before closing",
    },
  };

  const segmentSelect = model.querySelector("[data-model-segment]");
  const rangeControls = Object.fromEntries(
    Array.from(model.querySelectorAll("[data-model-control]")).map((input) => [input.dataset.modelControl, input]),
  );
  const numberControls = Object.fromEntries(
    Array.from(model.querySelectorAll("[data-model-number]")).map((input) => [input.dataset.modelNumber, input]),
  );
  const results = Object.fromEntries(
    Array.from(model.querySelectorAll("[data-model-result]")).map((output) => [output.dataset.modelResult, output]),
  );
  const summary = model.querySelector("[data-model-summary]");
  const bars = model.querySelector("[data-model-bars]");

  const currency = new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  });

  const roundToNearest = (value, nearest = 100) => Math.ceil(value / nearest) * nearest;

  const readNumber = (name) => Number(rangeControls[name]?.value || numberControls[name]?.value || 0);

  const clampToInput = (input, value) => {
    const min = Number(input.min || Number.NEGATIVE_INFINITY);
    const max = Number(input.max || Number.POSITIVE_INFINITY);
    return Math.min(Math.max(Number(value) || min, min), max);
  };

  const setControl = (name, value) => {
    const range = rangeControls[name];
    const number = numberControls[name];
    if (range) range.value = String(clampToInput(range, value));
    if (number) number.value = String(clampToInput(number, value));
  };

  const calculate = (values) => {
    const totalInvestment = values.purchaseCost + values.reconditioning + values.marketingSpend + values.fees;
    const desiredProfit = totalInvestment * (values.margin / 100);
    const salePrice = roundToNearest(totalInvestment + desiredProfit);
    const listPrice = roundToNearest(salePrice * 1.025);
    const grossProfit = salePrice - totalInvestment;
    const roi = totalInvestment ? (grossProfit / totalInvestment) * 100 : 0;

    return {
      breakEven: totalInvestment,
      grossProfit,
      listPrice,
      roi,
      salePrice,
      totalInvestment,
    };
  };

  const scenarioValues = (key) => {
    const preset = presets[key];
    return {
      fees: preset.fees,
      margin: preset.margin,
      marketingSpend: preset.marketingSpend,
      purchaseCost: preset.purchaseCost,
      reconditioning: preset.reconditioning,
    };
  };

  const currentValues = () => ({
    fees: readNumber("fees"),
    margin: readNumber("margin"),
    marketingSpend: readNumber("marketingSpend"),
    purchaseCost: readNumber("purchaseCost"),
    reconditioning: readNumber("reconditioning"),
  });

  const updateOutputs = () => {
    const segmentKey = segmentSelect?.value || "suv";
    const preset = presets[segmentKey] || presets.suv;
    const values = currentValues();
    const calculated = calculate(values);

    if (results.listPrice) results.listPrice.textContent = currency.format(calculated.listPrice);
    if (results.salePrice) results.salePrice.textContent = currency.format(calculated.salePrice);
    if (results.totalInvestment) results.totalInvestment.textContent = currency.format(calculated.totalInvestment);
    if (results.grossProfit) results.grossProfit.textContent = currency.format(calculated.grossProfit);
    if (results.roi) results.roi.textContent = `${calculated.roi.toFixed(1)}%`;
    if (results.breakEven) results.breakEven.textContent = currency.format(calculated.breakEven);

    if (summary) {
      summary.textContent = `${preset.label} model: buy at ${currency.format(values.purchaseCost)}, invest ${currency.format(values.reconditioning + values.marketingSpend + values.fees)}, target ${values.margin}% profit, list near ${currency.format(calculated.listPrice)}, and aim to close around ${currency.format(calculated.salePrice)}. ${preset.demand}.`;
    }

    model.querySelectorAll("[data-scenario-key]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.scenarioKey === segmentKey));
    });
  };

  const loadPreset = (key) => {
    const preset = presets[key];
    if (!preset) return;
    if (segmentSelect) segmentSelect.value = key;
    setControl("purchaseCost", preset.purchaseCost);
    setControl("reconditioning", preset.reconditioning);
    setControl("marketingSpend", preset.marketingSpend);
    setControl("fees", preset.fees);
    setControl("margin", preset.margin);
    updateOutputs();
  };

  const renderBars = () => {
    if (!bars) return;
    const scenarioData = Object.entries(presets).map(([key, preset]) => {
      const calculated = calculate(scenarioValues(key));
      return { key, preset, calculated };
    });
    const maxListPrice = Math.max(...scenarioData.map((scenario) => scenario.calculated.listPrice));

    bars.innerHTML = scenarioData.map(({ key, preset, calculated }) => {
      const width = Math.max(18, (calculated.listPrice / maxListPrice) * 100);
      return `
        <button class="scenario-bar" type="button" data-scenario-key="${key}" aria-pressed="false">
          <span class="scenario-bar-top"><strong>${preset.label}</strong><strong>${currency.format(calculated.listPrice)}</strong></span>
          <span class="scenario-track"><span class="scenario-fill" style="--bar-width: ${width}%"></span></span>
          <span class="scenario-bar-meta"><span>Profit ${currency.format(calculated.grossProfit)}</span><span>ROI ${calculated.roi.toFixed(1)}%</span></span>
        </button>
      `;
    }).join("");
  };

  Object.entries(rangeControls).forEach(([name, input]) => {
    input.addEventListener("input", () => {
      if (numberControls[name]) numberControls[name].value = input.value;
      updateOutputs();
    });
  });

  Object.entries(numberControls).forEach(([name, input]) => {
    input.addEventListener("input", () => {
      const value = clampToInput(input, input.value);
      if (rangeControls[name]) rangeControls[name].value = String(value);
      updateOutputs();
    });
  });

  segmentSelect?.addEventListener("change", () => loadPreset(segmentSelect.value));
  bars?.addEventListener("click", (event) => {
    const scenario = event.target.closest("[data-scenario-key]");
    if (scenario) loadPreset(scenario.dataset.scenarioKey);
  });

  renderBars();
  loadPreset(segmentSelect?.value || "suv");
}

function setupModal() {
  const modals = document.querySelectorAll("[data-modal]");
  if (!modals.length) return;

  const open = (modal) => {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector("[data-modal-close]")?.focus();
  };

  const close = (modal) => {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal-target]");
    if (opener) {
      event.preventDefault();
      const modal = document.getElementById(opener.dataset.modalTarget);
      if (modal) open(modal);
      return;
    }

    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      event.preventDefault();
      const modal = closer.closest("[data-modal]");
      if (modal) close(modal);
      return;
    }

    if (event.target.matches("[data-modal]")) {
      close(event.target);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    modals.forEach((modal) => {
      if (modal.getAttribute("aria-hidden") === "false") close(modal);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("has-js");
  enhanceBrand();
  addHeaderIcons();
  upgradeIconPlaceholders();
  setupRevealAnimations();
  setupSlideDecks();
  setupSalesModel();
  setupModal();
});
