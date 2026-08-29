/* ============================================================
   Icon-Bibliothek – alle Symbole der App als SVG
   ------------------------------------------------------------
   UI-Icons: 24×24, Strichzeichnung, übernehmen die Textfarbe.
   Szenen-Motive: farbige Illustrationen für den Simulator.
   Aufruf: Icon.ui("blende")  bzw.  Icon.art("tulpe")
   ============================================================ */
(function () {

  // Strichzeichnungen (24×24). Nur der Pfad-Inhalt, Rahmen kommt aus ui().
  const UI = {
    // --- Navigation ---
    lernen:    '<path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3zM21 5.5A1.5 1.5 0 0 0 19.5 4H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21z"/>',
    ueben:     '<path d="M4 7h7M15 7h5M4 17h4M12 17h8M4 12h11M19 12h1"/><circle cx="13" cy="7" r="2"/><circle cx="10" cy="17" r="2"/><circle cx="17" cy="12" r="2"/>',
    missionen: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    erfolge:   '<path d="M7 4h10v5a5 5 0 0 1-10 0zM7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.46M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.46M12 14v4M9 20h6"/>',

    // --- Lektionen ---
    dreieck:   '<path d="M12 5.2 19.8 18.6H4.2z"/><circle cx="12" cy="5.2" r="2.2" fill="currentColor" stroke="none"/><circle cx="19.8" cy="18.6" r="2.2" fill="currentColor" stroke="none"/><circle cx="4.2" cy="18.6" r="2.2" fill="currentColor" stroke="none"/>',
    blende:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4v8.6l7.4 4.3M12 12 4.6 16.3M12 12l7.4-4.3M12 12H3.4M12 12l-7.4 4.3" opacity=".9"/>',
    zeit:      '<circle cx="12" cy="13.4" r="7.6"/><path d="M12 9.6v3.8l2.6 1.6M9.4 3h5.2M12 3v2.4M18.8 6.6l1.5-1.5"/>',
    iso:       '<path d="M4 18.5a8 8 0 1 1 15.4-3.1A5 5 0 0 1 17 20"/><path d="M8.5 12.5h.01M12 15h.01M15 11h.01M10.5 16.5h.01M14 18h.01M7 15.5h.01" stroke-width="2.4"/>',
    waage:     '<path d="M12 4v16M7 20h10M4 9h16M6.5 9 4 15h5zM17.5 9 15 15h5z"/><circle cx="12" cy="4" r="1.4"/>',
    raeder:    '<circle cx="12" cy="12" r="8.2"/><path d="M12 4.6v3.1M12 16.3v3.1M4.6 12h3.1M16.3 12h3.1"/><circle cx="12" cy="12" r="3"/>',
    fokus:     '<path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15"/><circle cx="12" cy="12" r="3.2"/>',
    farbe:     '<rect x="3.2" y="5" width="17.6" height="14" rx="1.6"/><path d="M6.6 5v14M17.4 5v14M3.2 9.6h3.4M3.2 14.4h3.4M17.4 9.6h3.4M17.4 14.4h3.4"/>',
    gestaltung:'<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="1.8"/><path d="M9.1 4.6v14.8M14.9 4.6v14.8M3.4 9.5h17.2M3.4 14.5h17.2" opacity=".6"/>',
    spickzettel:'<path d="M5.5 3.5h10L19 7v13.5H5.5z"/><path d="M15 3.5V7h4M8.6 11h7M8.6 14.4h7M8.6 17.8h4.2"/>',

    // --- Abzeichen ---
    spross:    '<path d="M12 20.5v-7.2M12 13.3C12 9.8 9.4 7 5.9 7c0 3.5 2.6 6.3 6.1 6.3zM12 13.3c0-3.9 2.9-7 6.6-7 0 3.9-3 7-6.6 7z"/>',
    tueftler:  '<path d="M9.5 3.5h5M10.4 3.5v5.2L5.8 17a2.6 2.6 0 0 0 2.3 3.9h7.8a2.6 2.6 0 0 0 2.3-3.9l-4.6-8.3V3.5"/><path d="M7.7 14.4h8.6"/>',
    hundert:   '<circle cx="12" cy="12" r="8.6"/><path d="M8.6 9.4v5.2M15.4 9.4v5.2M12 12h.01" stroke-width="2.2"/>',
    kamera:    '<path d="M3.4 8.6h3.1l1.6-2.4h7.8l1.6 2.4h3.1v9.8a1.4 1.4 0 0 1-1.4 1.4H4.8a1.4 1.4 0 0 1-1.4-1.4z"/><circle cx="12" cy="13.4" r="3.5"/>',

    // --- Bildideen / Minikarten ---
    portrait:  '<circle cx="12" cy="8.4" r="3.8"/><path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"/>',
    landschaft:'<path d="M3 18.5h18M3 18.5 9 8.6l4.2 6.6M11.6 12.4 15.4 6.6l5.6 11.9"/><circle cx="7" cy="5.8" r="1.9"/>',
    alltag:    '<path d="M4 20.5V9.4l8-5.9 8 5.9v11.1z"/><path d="M9.6 20.5v-6h4.8v6"/>',
    sonne:     '<circle cx="12" cy="12" r="4.2"/><path d="M12 3.4v2.2M12 18.4v2.2M3.4 12h2.2M18.4 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"/>',
    wolke:     '<path d="M7.4 18.5h9.8a4 4 0 0 0 .5-8 5.4 5.4 0 0 0-10.4 1.2 3.4 3.4 0 0 0 .1 6.8z"/>',
    nacht:     '<path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.6 8.6 0 1 0 10.4 10.4z"/>',
    daemmerung:'<path d="M3.4 18.5h17.2M6 14.6a6 6 0 0 1 12 0M12 3.6v2.6M4.6 7.4 6.4 9.2M19.4 7.4 17.6 9.2"/>',
    gluehbirne:'<path d="M9.4 17.2a5.8 5.8 0 1 1 5.2 0v2.1H9.4zM10 21.2h4"/>',
    warnung:   '<path d="M12 4.4 21 19.6H3z"/><path d="M12 10v4M12 17h.01" stroke-width="2.2"/>',
    auge:      '<path d="M2.6 12S6.4 5.8 12 5.8 21.4 12 21.4 12 17.6 18.2 12 18.2 2.6 12 2.6 12z"/><circle cx="12" cy="12" r="2.9"/>',
    besen:     '<path d="M14.6 3.6 20.4 9.4M16.8 6.4l-8 8M4 20.4l4.6-1.2 6-6-3.4-3.4-6 6z"/>',
    leere:     '<circle cx="12" cy="12" r="3.4"/><path d="M4 4.6v2.8M4 4.6h2.8M20 4.6v2.8M20 4.6h-2.8M4 19.4v-2.8M4 19.4h2.8M20 19.4v-2.8M20 19.4h-2.8"/>',
    perspektive:'<path d="M3 20.4h18M7 20.4 12 5l5 15.4"/><path d="M9 14.6h6" opacity=".6"/>',
    linien:    '<path d="M4.4 19.6 19.6 4.4M19.6 4.4h-5.4M19.6 4.4v5.4"/><path d="M4.4 12.6 12 5M12 19.6l7.6-7.6" opacity=".45"/>',
    rahmen:    '<rect x="3.4" y="4.6" width="17.2" height="14.8" rx="1.8"/><rect x="7.6" y="8.4" width="8.8" height="7.2" rx="1"/>',
    tempo:     '<path d="M3 12h4.6M4.6 8.2h5.2M4.6 15.8h5.2"/><path d="M11.6 12a5.4 5.4 0 1 0 10.8 0 5.4 5.4 0 0 0-10.8 0z"/><path d="M17 9.4V12l1.8 1.2"/>',
    wasser:    '<path d="M12 3.4c3.2 4 5.6 6.9 5.6 9.8A5.6 5.6 0 0 1 6.4 13.2c0-2.9 2.4-5.8 5.6-9.8z"/>',
    schloss:   '<rect x="5" y="10.6" width="14" height="9.4" rx="1.8"/><path d="M8.4 10.6V7.8a3.6 3.6 0 0 1 7-1.2"/><path d="M12 14.4v2.2"/>',
    geschenk:  '<rect x="3.6" y="9.4" width="16.8" height="10.6" rx="1.4"/><path d="M3.6 13.4h16.8M12 9.4V20M12 9.4C10 9.4 7.4 8.6 7.4 6.6a2.2 2.2 0 0 1 4.6-.6zM12 9.4c2 0 4.6-.8 4.6-2.8a2.2 2.2 0 0 0-4.6-.6z"/>',
    herz:      '<path d="M12 20.2S3.8 15 3.8 9.6a4.6 4.6 0 0 1 8.2-2.8 4.6 4.6 0 0 1 8.2 2.8c0 5.4-8.2 10.6-8.2 10.6z"/>',
    flamme:    '<path d="M12 20.4a5.6 5.6 0 0 0 5.6-5.6c0-4.6-5.6-11.2-5.6-11.2S6.4 10.2 6.4 14.8A5.6 5.6 0 0 0 12 20.4z"/><path d="M12 20.4a2.4 2.4 0 0 0 2.4-2.4c0-1.9-2.4-4.6-2.4-4.6s-2.4 2.7-2.4 4.6a2.4 2.4 0 0 0 2.4 2.4z" opacity=".5"/>',
    funke:     '<path d="M12 3.4 13.9 9.6 20 11.5l-6.1 1.9L12 19.6l-1.9-6.2L4 11.5l6.1-1.9z"/><path d="M18.6 4.4v2.6M17.3 5.7h2.6" opacity=".7"/>',
    haken:     '<path d="M4.8 12.6 9.6 17.4 19.2 6.6"/>',
    stativ:    '<rect x="7" y="3.4" width="10" height="4.4" rx="1"/><path d="M12 7.8v4.6M12 12.4 5.6 20.6M12 12.4l6.4 8.2M12 12.4v8.2"/>',
    koerner:   '<path d="M6 7h.01M11 5.4h.01M16.4 7.6h.01M8.4 11.4h.01M13.6 10.4h.01M18.4 12.4h.01M6.4 15.6h.01M11.6 15h.01M16 17h.01M9 19h.01M14.4 19.4h.01M19 16.6h.01" stroke-width="2.6"/>',
    schwarzweiss:'<circle cx="12" cy="12" r="8.6"/><path d="M12 3.4v17.2" /><path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" stroke="none"/>',
    farbtupfer:'<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="none"/>',
    film:      '<rect x="3.2" y="6" width="17.6" height="12" rx="1.6"/><path d="M6.6 6v12M17.4 6v12M3.2 9.4h3.4M3.2 12h3.4M3.2 14.6h3.4M17.4 9.4h3.4M17.4 12h3.4M17.4 14.6h3.4"/>',
    kino:      '<path d="M3.4 8.4h17.2v10a1.4 1.4 0 0 1-1.4 1.4H4.8a1.4 1.4 0 0 1-1.4-1.4z"/><path d="m4.6 8.4 2.6-4 3.4 4M11 8.4l2.6-4 3.4 4"/>',
    hand:      '<path d="M9 12.6V6.4a1.6 1.6 0 0 1 3.2 0v5M12.2 11.4V5.4a1.6 1.6 0 0 1 3.2 0v6M15.4 12V7.6a1.6 1.6 0 0 1 3.2 0v7.6a5.6 5.6 0 0 1-5.6 5.6h-1.6a5.4 5.4 0 0 1-4.3-2.2L4.4 14a1.6 1.6 0 0 1 2.5-2z"/>',
    tuer:      '<path d="M6 20.4V4.6a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v15.8M4 20.4h16"/><circle cx="14.6" cy="12.4" r="1.1" fill="currentColor"/>',
    blume:     '<path d="M12 13.6V20.4M12 20.4c-2.6 0-4.4-1.2-5.2-3M12 20.4c2.6 0 4.4-1.2 5.2-3"/><path d="M12 3.6c1.9 0 3.2 1.6 3.2 3.6S13.9 11.4 12 13.6C10.1 11.4 8.8 9.2 8.8 7.2S10.1 3.6 12 3.6z"/><path d="M8.9 6.1C7.2 5.1 5.3 5.6 4.4 7.2s-.2 3.5 1.5 4.5c1.7 1 3.9 1.4 4.9 1.5M15.1 6.1c1.7-1 3.6-.5 4.5 1.1s.2 3.5-1.5 4.5c-1.7 1-3.9 1.4-4.9 1.5"/>',
    rad:       '<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.6v4M12 16.4v4M3.6 12h4M16.4 12h4"/>'
  };

  // Alias-Namen, damit Aufrufstellen sprechend bleiben
  const ALIAS = {
    ziel: "missionen", pokal: "erfolge", medaille: "erfolge", stern: "funke",
    dunkel: "nacht", ueberbelichtet: "sonne", verwackelt: "hand", rauschen: "koerner",
    sport: "tempo", bokeh: "blende"
  };


  /* ---------- Szenen-Motive: farbige Illustrationen ---------- */
  const ART = {
    tulpe: {
      vb: "0 0 62 104",
      svg: `<path d="M31 100V44" stroke="#4A7A46" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M31 70C22 70 12 64 8 53c11-3 20 2 23 12z" fill="#5C9455"/>
        <path d="M31 84c9 0 19-6 23-17-11-3-20 2-23 12z" fill="#6BA862"/>
        <path d="M31 6c6 4 12 12 12 22 0 12-6 20-12 24-6-4-12-12-12-24 0-10 6-18 12-22z" fill="#E8688C"/>
        <path d="M19 12c-5 4-8 11-8 18 0 10 6 17 12 22-4-8-6-17-6-24 0-6 1-11 2-16z" fill="#D14E75"/>
        <path d="M43 12c5 4 8 11 8 18 0 10-6 17-12 22 4-8 6-17 6-24 0-6-1-11-2-16z" fill="#F5869F"/>`
    },
    baum: {
      vb: "0 0 92 104",
      svg: `<path d="M46 102V56" stroke="#8A5F3C" stroke-width="9" stroke-linecap="round" fill="none"/>
        <path d="M46 74 32 60M46 66l14-14" stroke="#8A5F3C" stroke-width="6" stroke-linecap="round" fill="none"/>
        <circle cx="46" cy="34" r="26" fill="#5E9E4F"/>
        <circle cx="24" cy="46" r="19" fill="#6FB25C"/>
        <circle cx="68" cy="46" r="19" fill="#6FB25C"/>
        <circle cx="36" cy="24" r="15" fill="#7CC169" opacity=".85"/>`
    },
    radfahrer: {
      vb: "0 0 108 78",
      svg: `<circle cx="22" cy="58" r="16" fill="none" stroke="#33383F" stroke-width="4"/>
        <circle cx="86" cy="58" r="16" fill="none" stroke="#33383F" stroke-width="4"/>
        <path d="M22 58h20l14-22h18l12 22M42 58l14-22M56 36l-8 22" stroke="#E2674B" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M48 58h16" stroke="#33383F" stroke-width="3.4" stroke-linecap="round"/>
        <path d="M56 34 62 18h12" stroke="#33383F" stroke-width="3.4" stroke-linecap="round" fill="none"/>
        <path d="M60 30 74 18l10 6" stroke="#3E6EA8" stroke-width="8" stroke-linecap="round"
          stroke-linejoin="round" fill="none"/>
        <circle cx="78" cy="12" r="8" fill="#F0C08A"/>
        <path d="M70 10a8 8 0 0 1 16 0z" fill="#2F5F8C"/>`
    },
    person: {
      vb: "0 0 54 104",
      svg: `<circle cx="27" cy="15" r="12" fill="#F0C08A"/>
        <path d="M27 3c7 0 12 4 12 10 0 2-1 4-2 4-1-4-5-6-10-6s-9 2-10 6c-1 0-2-2-2-4 0-6 5-10 12-10z" fill="#4A3B33"/>
        <path d="M15 30h24a6 6 0 0 1 6 6v26a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V36a6 6 0 0 1 6-6z" fill="#C8563F"/>
        <path d="M19 66h6v34h-6zM29 66h6v34h-6z" fill="#3B4A63"/>
        <path d="M13 34h6l-3 24zM41 34h-6l3 24z" fill="#B04A35"/>`
    },
    fels: {
      vb: "0 0 96 66",
      svg: `<path d="M4 64 22 22l20 42z" fill="#8D8579"/>
        <path d="M30 64 52 10l30 54z" fill="#9E958A"/>
        <path d="M52 10 68 34l-16 8z" fill="#B3AA9D"/>
        <path d="M22 22l10 20-12 6z" fill="#A69D91"/>
        <path d="M0 64h96" stroke="#6E675C" stroke-width="3" stroke-linecap="round"/>`
    },
    blatt: {
      vb: "0 0 112 86",
      svg: `<path d="M6 80C6 40 40 8 104 6c2 46-32 74-98 74z" fill="#4F8046"/>
        <path d="M6 80C30 52 62 28 104 6" stroke="#8FBE7E" stroke-width="3.4" fill="none" stroke-linecap="round"/>
        <path d="M34 56c4-12 2-22-2-30M58 38c6-10 6-20 4-28M20 70c0-10-3-18-8-24" stroke="#8FBE7E"
          stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".8"/>`
    }
  };

  /** Farbige Illustration, füllt den Elternrahmen */
  function art(name) {
    const a = ART[name];
    if (!a) return "";
    return `<svg class="art" viewBox="${a.vb}" fill="none" aria-hidden="true" focusable="false"
      preserveAspectRatio="xMidYMax meet">${a.svg}</svg>`;
  }


  /* ---------- Belohnungs-Sticker: animierte SVGs, funktionieren immer ---------- */
  const STICKERS = {
    konfetti: `<g class="sk-burst">
        <circle cx="60" cy="52" r="17" fill="#E2674B"/><circle cx="60" cy="52" r="9" fill="#F6B69F"/>
        <g class="sk-bits">
          <rect x="56" y="8" width="9" height="13" rx="2.5" fill="#DF9A2E"/>
          <rect x="94" y="26" width="9" height="13" rx="2.5" fill="#6E8F72" transform="rotate(48 98 32)"/>
          <rect x="96" y="66" width="9" height="13" rx="2.5" fill="#5B87B5" transform="rotate(112 100 72)"/>
          <rect x="56" y="84" width="9" height="13" rx="2.5" fill="#8A6A9E"/>
          <rect x="17" y="66" width="9" height="13" rx="2.5" fill="#DF9A2E" transform="rotate(-112 21 72)"/>
          <rect x="19" y="26" width="9" height="13" rx="2.5" fill="#E2674B" transform="rotate(-48 23 32)"/>
        </g></g>`,
    stern: `<g class="sk-spin"><path d="M60 12 71 44l33 1-26 20 9 32-27-19-27 19 9-32-26-20 33-1z" fill="#DF9A2E"/></g>
        <g class="sk-twinkle"><path d="M22 22l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#F3D49B"/>
        <path d="M98 62l2.4 6.4 6.4 2.4-6.4 2.4-2.4 6.4-2.4-6.4-6.4-2.4 6.4-2.4z" fill="#F3D49B"/></g>`,
    pokal: `<g class="sk-bob"><path d="M40 16h40v22a20 20 0 0 1-40 0z" fill="#DF9A2E"/>
        <path d="M40 20H26v6a16 16 0 0 0 14 15.6M80 20h14v6a16 16 0 0 1-14 15.6" fill="none" stroke="#DF9A2E" stroke-width="6"/>
        <path d="M55 58h10v18H55zM42 82h36v10H42z" fill="#C98A22"/>
        <path class="sk-shine" d="M46 18h9l-9 26z" fill="#fff" opacity=".55"/></g>`,
    rakete: `<g class="sk-fly"><path d="M60 10c12 10 18 26 18 42l-8 12H50l-8-12c0-16 6-32 18-42z" fill="#E2674B"/>
        <circle cx="60" cy="40" r="8" fill="#FBF6F0"/>
        <path d="M42 46 28 66l14-4zM78 46l14 20-14-4z" fill="#C4523A"/>
        <g class="sk-flame"><path d="M50 66h20l-10 26z" fill="#DF9A2E"/><path d="M55 66h10l-5 16z" fill="#F3D49B"/></g></g>`,
    kamera: `<g class="sk-bob"><rect x="16" y="30" width="88" height="56" rx="9" fill="#4A423C"/>
        <path d="M44 30l6-10h20l6 10z" fill="#4A423C"/>
        <circle cx="60" cy="58" r="19" fill="#7E736B"/><circle cx="60" cy="58" r="11" fill="#2A2320"/>
        <circle cx="55" cy="53" r="4" fill="#fff" opacity=".65"/>
        <g class="sk-flash"><rect x="88" y="20" width="14" height="9" rx="3" fill="#DF9A2E"/>
        <path d="M95 8v7M108 14l-5 5M82 14l5 5" stroke="#DF9A2E" stroke-width="4" stroke-linecap="round"/></g></g>`,
    herz: `<g class="sk-beat"><path d="M60 92S16 66 16 40a22 22 0 0 1 44-9 22 22 0 0 1 44 9c0 26-44 52-44 52z" fill="#E2674B"/>
        <path d="M34 30a14 14 0 0 0-8 12" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/></g>`,
    daumen: `<g class="sk-wiggle"><path d="M30 46h16v46H30a5 5 0 0 1-5-5V51a5 5 0 0 1 5-5z" fill="#C4523A"/>
        <path d="M52 46 66 16a9 9 0 0 1 17 4l-3 22h18a9 9 0 0 1 8.8 11l-6 30a11 11 0 0 1-11 9H52z" fill="#E8895F"/></g>`,
    medaille: `<g class="sk-swing"><path d="M42 10 60 48 44 54 30 18z" fill="#5B87B5"/><path d="M78 10 60 48l16 6 14-36z" fill="#3E6EA8"/>
        <circle cx="60" cy="72" r="24" fill="#DF9A2E"/><circle cx="60" cy="72" r="16" fill="#F3D49B"/>
        <path d="M60 60l4 8h8l-6 6 2 9-8-5-8 5 2-9-6-6h8z" fill="#C98A22"/></g>`
  };

  /** Animierter Sticker als Ersatz (oder Ergänzung) zu einem GIF */
  function sticker(name) {
    const body = STICKERS[name];
    if (!body) return "";
    return `<svg class="sticker-svg" viewBox="0 0 120 100" fill="none"
      aria-hidden="true" focusable="false">${body}</svg>`;
  }

  function ui(name, extra) {
    const key = ALIAS[name] || name;
    const body = UI[key];
    if (!body) return "";
    return `<svg class="ico ${extra || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">${body}</svg>`;
  }

  window.Icon = { ui, art, sticker, stickerNames: () => Object.keys(STICKERS), artNames: () => Object.keys(ART), has: n => !!UI[ALIAS[n] || n], names: () => Object.keys(UI) };
})();
