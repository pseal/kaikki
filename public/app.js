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
    sec_delivery: "Food delivery",
    sec_grocery: "Grocery stores",
    sec_restaurant: "Restaurants",
    sec_public: "Public transport",
    sec_cab: "Cab services",
    sec_rental: "Car rental",
    sec_fashion: "Online fashion",
    sec_malls: "Nearby shopping malls",
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
    live_unavailable: "Live stops unavailable.",
    no_stops: "No transit stops found nearby.",
    live_label: "Live nearby stops",
    loading_transit: "Looking up nearby stops…",
    locating: "📍 Locating you…",
    location_error: "Could not get your location.",
    geo_prompt: "📍 Tap to use your location",
    malls_prompt: "🔍 Find shopping centres nearby",
    sgroup_prompt: "🏪 Find S-kaupat nearby",
    kgroup_prompt: "🥬 Find K-Ruoka nearby"
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
    sec_delivery: "Ruoan toimitus",
    sec_grocery: "Ruokakaupat",
    sec_restaurant: "Ravintolat",
    sec_public: "Julkinen liikenne",
    sec_cab: "Taksipalvelut",
    sec_rental: "Autonvuokraus",
    sec_fashion: "Verkkomuoti",
    sec_malls: "Läheiset kauppakeskukset",
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
    live_unavailable: "Lähipysäkit eivät ole saatavilla.",
    no_stops: "Lähistöltä ei löytynyt pysäkkejä.",
    live_label: "Lähipysäkit reaaliajassa",
    loading_transit: "Etsitään lähistön pysäkkejä…",
    locating: "📍 Paikannnetaan…",
    location_error: "Sijaintia ei saatu.",
    geo_prompt: "📍 Käytä sijaintiasi",
    malls_prompt: "🔍 Etsi kauppakeskuksia lähistöltä",
    sgroup_prompt: "🏪 Etsi S-kaupat lähistöltä",
    kgroup_prompt: "🥬 Etsi K-Ruoka lähistöltä"
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
let userLat = null;
let userLon = null;

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  initLangToggle();

  // Auto-request location on section pages where it's needed
  const onSectionPage = !!document.getElementById("stops-list") ||
                        !!document.getElementById("malls-container") ||
                        !!document.getElementById("link-sgroup");
  if (onSectionPage) {
    requestLocation();
  }
});

/* ── LANGUAGE ── */
function initLangToggle() {
  const btn = document.getElementById("langToggle");
  if (!btn) return;
  btn.textContent = currentLang === "en" ? "FI" : "EN";
  btn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fi" : "en";
    localStorage.setItem("kaikki_lang", currentLang);
    applyLanguage(currentLang);
    btn.textContent = currentLang === "en" ? "FI" : "EN";
    // Refresh location-based text if we have coords
    if (userLat !== null) applyLocationLinks(userLat, userLon);
  });
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const value = translations[lang][key];
    if (!value) return;
    el.innerHTML = value.includes("<") ? value : "";
    if (!value.includes("<")) el.textContent = value;
  });
}

/* ── GEOLOCATION ── */
function requestLocation() {
  const geoBtn = document.getElementById("geoBtn");

  // Show a subtle locating state on the geo button
  if (geoBtn) geoBtn.textContent = "⏳";

  if (!navigator.geolocation) {
    if (geoBtn) geoBtn.textContent = "📍";
    applyFallbackLinks();
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat = pos.coords.latitude;
      userLon = pos.coords.longitude;
      if (geoBtn) geoBtn.textContent = "📍";
      applyLocationLinks(userLat, userLon);
      fetchLiveTransit(userLat, userLon);
    },
    () => {
      if (geoBtn) geoBtn.textContent = "📍";
      applyFallbackLinks();
    },
    { timeout: 8000, maximumAge: 60000 }
  );

  // Manual tap on geo button re-requests
  if (geoBtn) {
    geoBtn.addEventListener("click", () => {
      geoBtn.textContent = "⏳";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          userLat = pos.coords.latitude;
          userLon = pos.coords.longitude;
          geoBtn.textContent = "📍";
          applyLocationLinks(userLat, userLon);
          fetchLiveTransit(userLat, userLon);
        },
        () => { geoBtn.textContent = "📍"; },
        { timeout: 8000 }
      );
    });
  }
}

/* ── LOCATION-AWARE LINKS ── */
function applyLocationLinks(lat, lon) {
  // Restaurants — Google Maps near coords
  const restaurantLink = document.getElementById("link-restaurants");
  if (restaurantLink) {
    restaurantLink.href = `https://www.google.com/maps/search/restaurants/@${lat},${lon},14z`;
  }

  // S-kaupat — their store locator with GPS coords
  const sLink = document.getElementById("link-sgroup");
  if (sLink) {
    sLink.href = `https://www.s-kaupat.fi/myymalat?lat=${lat}&lng=${lon}`;
    sLink.querySelector("span:first-child").textContent = "🏪 S-kaupat — stores near me";
  }

  // K-Ruoka — map-based store finder
  const kLink = document.getElementById("link-kgroup");
  if (kLink) {
    kLink.href = `https://www.k-ruoka.fi/kaupat?lat=${lat}&lng=${lon}`;
    kLink.querySelector("span:first-child").textContent = "🥬 K-Ruoka — stores near me";
  }

  // Journey planner — matka.fi works everywhere in Finland
  const transitLink = document.getElementById("link-transit");
  if (transitLink) transitLink.href = "https://opas.matka.fi";

  // Malls — Google Maps search near coords
  const mallsContainer = document.getElementById("malls-container");
  if (mallsContainer) {
    mallsContainer.innerHTML = "";
    const a = document.createElement("a");
    a.href = `https://www.google.com/maps/search/shopping+centre/@${lat},${lon},13z`;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "btn btn-primary-green";
    a.innerHTML = `<span>🛍️ ${translations[currentLang].malls_prompt}</span><span class="arr">↗</span>`;
    mallsContainer.appendChild(a);
  }
}

function applyFallbackLinks() {
  // No GPS — use generic nationwide links
  const sLink = document.getElementById("link-sgroup");
  if (sLink) sLink.href = "https://www.s-kaupat.fi/myymalat";

  const kLink = document.getElementById("link-kgroup");
  if (kLink) kLink.href = "https://www.k-ruoka.fi/kaupat";

  const transitLink = document.getElementById("link-transit");
  if (transitLink) transitLink.href = "https://opas.matka.fi";

  const mallsContainer = document.getElementById("malls-container");
  if (mallsContainer) {
    mallsContainer.innerHTML = "";
    const a = document.createElement("a");
    a.href = "https://www.google.com/maps/search/shopping+centre+near+me";
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "btn btn-primary-green";
    a.innerHTML = `<span>🛍️ ${translations[currentLang].malls_prompt}</span><span class="arr">↗</span>`;
    mallsContainer.appendChild(a);
  }
}

/* ── LIVE TRANSIT ── */
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
      if (!displayed.has(stop.name) && displayed.size < 5) {
        displayed.add(stop.name);
        const li = document.createElement("li");
        const emoji = stop.vehicleType === 0 ? "🚋" : stop.vehicleType === 1 ? "🚇" : "🚌";
        li.textContent = `${emoji} ${stop.name}${stop.code ? ` (${stop.code})` : ""} — ${edge.node.distance}m`;
        listEl.appendChild(li);
      }
    });

  } catch {
    if (loadingEl) loadingEl.style.display = "none";
    listEl.innerHTML = `<li style="color:#555;font-style:italic;">${translations[currentLang].live_unavailable}</li>`;
  }
}
