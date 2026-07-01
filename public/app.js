const translations = {
  en: {
    food_title: "WHERE to Eat & Buy Groceries",
    food_sub: "Food delivery, restaurants & grocery stores in Finland",
    travel_title: "WHEN to Start the Journey",
    travel_sub: "Public transport, cabs & car rental across Finland",
    shopping_title: "WHAT to Buy & Wear",
    shop_sub: "Fashion, shopping malls & secondhand across Finland",
    find_restaurants: "🔍 Find nearby restaurants",
    reserve_table: "Reserve a table",
    train_travel: "Train travel",
    local_malls: "Local shopping malls",
    loading_transit: "Looking up nearby stops…",
    no_stops: "No transit stops found nearby.",
    live_label: "Live nearby stops",
    sec_delivery: "Food delivery",
    sec_grocery: "Grocery stores",
    sec_restaurant: "Restaurants",
    sec_public: "Public transport",
    sec_cab: "Cab services",
    sec_rental: "Car rental",
    sec_fashion: "Online fashion",
    sec_malls: "Local shopping malls",
    sec_secondhand: "Secondhand & vintage",
    vibe_label: "Outfit tip",
    vibe_default: "Pack an extra layer — it's Finland!",
    home_title: "Where, When & What —<br><em>all of Finland, one place.</em>",
    home_sub: "Your everyday guide to eating, getting around, and shopping anywhere in Finland.",
    word_where: "WHERE",
    word_when: "WHEN",
    word_what: "WHAT",
    circle_food_title: "Eating & Groceries",
    circle_food_sub: "Delivery, restaurants & grocery stores",
    circle_travel_title: "Journey Planner",
    circle_travel_sub: "Public transport, cabs & car rental",
    circle_shop_title: "Clothes & Accessories",
    circle_shop_sub: "Fashion, malls & secondhand",
    footer_made: "Made with ♥ for everyone in Finland",
    back_btn: "← Back",
    error_loading: "Error loading stops.",
    live_unavailable: "Live stops unavailable."
  },
  fi: {
    food_title: "MISSÄ syödä ja ostaa ruokaa",
    food_sub: "Ruoan toimitus, ravintolat ja ruokakaupat Suomessa",
    travel_title: "MILLOIN aloittaa matka",
    travel_sub: "Julkinen liikenne, taksit ja autonvuokraus ympäri Suomea",
    shopping_title: "MITÄ ostaa ja pukea",
    shop_sub: "Muoti, kauppakeskukset ja kirpputorit ympäri Suomea",
    find_restaurants: "🔍 Etsi lähistön ravintoloita",
    reserve_table: "Varaa pöytä",
    train_travel: "Junamatkat",
    local_malls: "Paikalliset kauppakeskukset",
    loading_transit: "Etsitään lähistön pysäkkejä…",
    no_stops: "Lähistöltä ei löytynyt pysäkkejä.",
    live_label: "Lähipysäkit reaaliajassa",
    sec_delivery: "Ruoan toimitus",
    sec_grocery: "Ruokakaupat",
    sec_restaurant: "Ravintolat",
    sec_public: "Julkinen liikenne",
    sec_cab: "Taksipalvelut",
    sec_rental: "Autonvuokraus",
    sec_fashion: "Verkkomuoti",
    sec_malls: "Paikalliset kauppakeskukset",
    sec_secondhand: "Kirpputorit ja vintage",
    vibe_label: "Asustevinkki",
    vibe_default: "Ota ylimääräinen kerros — Suomi on Suomi!",
    home_title: "Missä, milloin ja mitä —<br><em>koko Suomi yhdessä paikassa.</em>",
    home_sub: "Arjen oppaasi syömiseen, liikkumiseen ja ostoksiin missä tahansa Suomessa.",
    word_where: "MISSÄ",
    word_when: "MILLOIN",
    word_what: "MITÄ",
    circle_food_title: "Ruoka ja ruokakaupat",
    circle_food_sub: "Toimitus, ravintolat ja ruokakaupat",
    circle_travel_title: "Reittiopas",
    circle_travel_sub: "Julkinen liikenne, taksit ja autonvuokraus",
    circle_shop_title: "Vaatteet ja asusteet",
    circle_shop_sub: "Muoti, kauppakeskukset ja kirpputorit",
    footer_made: "Tehty rakkaudella kaikille Suomessa",
    back_btn: "← Takaisin",
    error_loading: "Pysäkkien lataaminen epäonnistui.",
    live_unavailable: "Lähipysäkit eivät ole saatavilla."
  }
};

const regionalData = {
  helsinki: {
    sGroup: "https://www.s-kaupat.fi/myymalat?q=helsinki",
    kGroup: "https://www.k-ruoka.fi/kaupat?city=helsinki",
    transit: "https://www.hsl.fi/en",
    transitLabel: "🚌 HSL — Journey Planner",
    lat: 60.1699, lon: 24.9384,
    malls: [
      { name: "Mall of Tripla", url: "https://malloftripla.fi" },
      { name: "Kamppi", url: "https://www.kamppi.fi" },
      { name: "Jumbo", url: "https://www.jumbo.fi" }
    ]
  },
  tampere: {
    sGroup: "https://www.s-kaupat.fi/myymalat?q=tampere",
    kGroup: "https://www.k-ruoka.fi/kaupat?city=tampere",
    transit: "https://reittiopas.tampere.fi/en",
    transitLabel: "🚌 Nysse — Journey Planner",
    lat: 61.4978, lon: 23.7610,
    malls: [
      { name: "Koskikeskus", url: "https://www.koskikeskus.fi" },
      { name: "Ideapark Lempäälä", url: "https://lempaala.ideapark.fi" }
    ]
  },
  turku: {
    sGroup: "https://www.s-kaupat.fi/myymalat?q=turku",
    kGroup: "https://www.k-ruoka.fi/kaupat?city=turku",
    transit: "https://reittiopas.foli.fi",
    transitLabel: "🚌 Föli — Journey Planner",
    lat: 60.4518, lon: 22.2666,
    malls: [
      { name: "Hansakortteli", url: "https://hansakortteli.fi" },
      { name: "Mylly (Raisio)", url: "https://www.kauppakeskusmylly.fi" }
    ]
  }
};

const stopsQuery = `
  query GetStops($lat: Float!, $lon: Float!) {
    stopsByRadius(lat: $lat, lon: $lon, radius: 800) {
      edges {
        node {
          stop { name code vehicleType }
          distance
        }
      }
    }
  }
`;

let currentLang = localStorage.getItem("kaikki_lang") || "en";
let currentCity = localStorage.getItem("kaikki_city") || "helsinki";

document.addEventListener("DOMContentLoaded", () => {
  // Validate stored city is still a known key, reset if not
  if (!regionalData[currentCity]) {
    currentCity = "helsinki";
    localStorage.setItem("kaikki_city", currentCity);
  }
  initElements();
  applyLanguage(currentLang);
  document.getElementById("langToggle").textContent = currentLang === "en" ? "FI" : "EN";
  updateRegionalContent(currentCity);
});

function initElements() {
  const citySelect = document.getElementById("citySelect");
  const langToggle = document.getElementById("langToggle");
  const geoBtn = document.getElementById("geoBtn");

  citySelect.value = currentCity;

  citySelect.addEventListener("change", (e) => {
    currentCity = e.target.value;
    localStorage.setItem("kaikki_city", currentCity);
    updateRegionalContent(currentCity);
  });

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fi" : "en";
    localStorage.setItem("kaikki_lang", currentLang);
    applyLanguage(currentLang);
    langToggle.textContent = currentLang === "en" ? "FI" : "EN";
  });

  geoBtn.addEventListener("click", () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      let detectedCity = "helsinki";
      if (latitude > 61.2) detectedCity = "tampere";
      else if (longitude < 23.0) detectedCity = "turku";

      currentCity = detectedCity;
      citySelect.value = currentCity;
      localStorage.setItem("kaikki_city", currentCity);
      updateRegionalContent(currentCity, latitude, longitude);
    });
  });
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang][key];
    if (!value) return;
    if (value.includes("<")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
}

function updateRegionalContent(cityKey, customLat = null, customLon = null) {
  const data = regionalData[cityKey];
  if (!data) return;

  const sLink = document.getElementById("link-sgroup");
  const kLink = document.getElementById("link-kgroup");
  const transitLink = document.getElementById("link-transit");
  const transitLabel = document.getElementById("transit-label");
  const mallsContainer = document.getElementById("malls-container");

  if (sLink) sLink.href = data.sGroup;
  if (kLink) kLink.href = data.kGroup;
  if (transitLink) transitLink.href = data.transit;
  if (transitLabel) transitLabel.textContent = data.transitLabel;

  if (mallsContainer) {
    mallsContainer.innerHTML = "";
    data.malls.forEach(mall => {
      const a = document.createElement("a");
      a.href = mall.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "btn";
      a.innerHTML = `<span>${mall.name}</span><span class="arr">↗</span>`;
      mallsContainer.appendChild(a);
    });
  }

  // Fire transit fetch independently — only relevant on travel.html
  if (document.getElementById("stops-list")) {
    const lat = customLat || data.lat;
    const lon = customLon || data.lon;
    fetchLiveTransit(lat, lon).catch(() => {
      const listEl = document.getElementById("stops-list");
      const loadingEl = document.getElementById("stops-loading");
      if (loadingEl) loadingEl.style.display = "none";
      if (listEl) listEl.innerHTML = `<li style="color:#555;font-style:italic;">${translations[currentLang].live_unavailable}</li>`;
    });
  }
}

async function fetchLiveTransit(lat, lon) {
  const listEl = document.getElementById("stops-list");
  const loadingEl = document.getElementById("stops-loading");
  if (!listEl) return;

  if (loadingEl) loadingEl.style.display = "block";
  listEl.innerHTML = "";

  try {
    const res = await fetch("/api/transit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: stopsQuery, variables: { lat, lon } })
    });

    const body = await res.json();
    if (loadingEl) loadingEl.style.display = "none";

    const edges = body?.data?.stopsByRadius?.edges || [];
    if (edges.length === 0) {
      listEl.innerHTML = `<li>${translations[currentLang].no_stops}</li>`;
      return;
    }

    const displayed = new Set();
    edges.forEach(edge => {
      const stop = edge.node.stop;
      if (!displayed.has(stop.name) && displayed.size < 4) {
        displayed.add(stop.name);
        const li = document.createElement("li");
        const emoji = stop.vehicleType === 0 ? "🚋" : stop.vehicleType === 1 ? "🚇" : "🚌";
        li.textContent = `${emoji} ${stop.name}${stop.code ? ` (${stop.code})` : ""} — ${edge.node.distance}m`;
        listEl.appendChild(li);
      }
    });

  } catch {
    if (loadingEl) loadingEl.style.display = "none";
    listEl.innerHTML = `<li style="color:#c94830;">${translations[currentLang].error_loading}</li>`;
  }
}
