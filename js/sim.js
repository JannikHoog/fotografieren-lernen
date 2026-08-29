/* ============================================================
   Belichtungs-Simulator
   ------------------------------------------------------------
   Rechnet echte Belichtungswerte (EV) und übersetzt sie in
   sichtbare Effekte: Hintergrund-Unschärfe (Blende),
   Bewegungsunschärfe & Verwacklung (Zeit), Bildrauschen (ISO)
   sowie Helligkeit (Über-/Unterbelichtung).
   ============================================================ */
(function () {

  const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
  const SHUTTERS  = [1/4000,1/2000,1/1000,1/500,1/250,1/125,1/60,1/30,1/15,1/8,1/4,1/2,1,2,4,8,15,30];
  const ISOS      = [160, 200, 400, 800, 1600, 3200, 6400, 12800];

  const SCENES = {
    garden: {
      label: "🌷 Garten", ev: 12, subject: "🌷", leaves: true,
      sky: "linear-gradient(#8CC6EA 0%, #CFE5EF 56%, #F0DDBA 100%)",
      ground: "linear-gradient(#7FA468, #4E6F45)", hills: ["#88AE7E", "#A3BF95"],
      bokehColors: ["#FFE9A8", "#FFD1B0", "#FFF3D6", "#F8C8A0"],
      caption: "Tulpe vorn, Lichterkette hinten – wie cremig darf der Hintergrund werden?"
    },
    action: {
      label: "🚴 Bewegung", ev: 13, subject: "🌳", mover: "🚴", leaves: false,
      sky: "linear-gradient(#84C2EA 0%, #C8E3F2 58%, #E5D9BF 100%)",
      ground: "linear-gradient(#9A9488, #6E695F)", hills: ["#93AE86", "#AFC2A2"],
      bokehColors: ["#FFE7A6", "#C9E4FF", "#FFD3AE"],
      caption: "Das Rad fährt gleich schnell – nur deine Zeit entscheidet, ob es scharf wird."
    },
    night: {
      label: "🌃 Nacht", ev: 4, subject: "🧍", leaves: false,
      sky: "linear-gradient(#0C1428 0%, #1B2743 55%, #332C46 100%)",
      ground: "linear-gradient(#1E1F33, #101119)", hills: ["#232C48", "#2C3554"],
      bokehColors: ["#FFD98A", "#FFB35C", "#9FD4FF", "#FF9E9E"],
      caption: "Wenig Licht: Jetzt musst du zwischen Rauschen, Unschärfe und Dunkelheit wählen."
    },
    water: {
      label: "💧 Wasserfall", ev: 8, subject: "🪨", water: true, leaves: true,
      sky: "linear-gradient(#7FA9B1 0%, #A9C6C2 58%, #C2CDAE 100%)",
      ground: "linear-gradient(#5D7A59, #3A5134)", hills: ["#557552", "#688A61"],
      bokehColors: ["#E9F6EE", "#D9EDE4"],
      caption: "Langsame Zeit = seidiges Wasser. Aber Achtung: Es wird schnell zu hell."
    }
  };

  const fmtShutter = t => t >= 1 ? (t + "s") : ("1/" + Math.round(1 / t));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  let uid = 0;

  /** Über-/Unterbelichtung in Blendenstufen (+ = zu hell) */
  function stopsOver(N, t, iso, sceneEv) {
    const evSet = Math.log2((N * N) / t) - Math.log2(iso / 100);
    return sceneEv - evSet;
  }

  const NOISE_URL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

  function create(host, opts) {
    const o = Object.assign({
      id: "sim", scene: "garden", focus: "all",
      aperture: 5.6, shutter: 1/250, iso: 400,
      tripod: false, scenePicker: false, tasks: [], onSolve: null
    }, opts || {});

    const key = "sim" + (++uid);
    let sceneId = o.scene;
    let ai = APERTURES.indexOf(o.aperture); if (ai < 0) ai = 4;
    let si = SHUTTERS.indexOf(o.shutter);  if (si < 0) si = 4;
    let ii = ISOS.indexOf(o.iso);          if (ii < 0) ii = 2;
    let tripod = o.tripod;
    let interacted = false;   // Aufgaben zählen erst, wenn wirklich gedreht wurde

    host.innerHTML = `
    <div class="sim" id="${key}">
      <svg class="svg-defs" aria-hidden="true"><defs>
        <filter id="${key}-mh" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="0 0"/></filter>
        <filter id="${key}-mv" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="0 0"/></filter>
      </defs></svg>

      <div class="sim-stage">
        <div class="scene" data-scene>
         <div class="expo" data-expo>
          <div class="layer" data-far>
            <div class="sky" style="position:absolute;inset:0"></div>
            <div class="sun-orb" data-sun></div>
          </div>
          <div class="layer bokeh" data-bokeh></div>
          <div class="layer" data-mid>
            <div class="hill"></div><div class="hill h2"></div>
            <div class="ground" data-ground></div>
          </div>
          <div class="water" data-water hidden><i style="animation:flow 1.6s linear infinite"></i><i style="animation:flow 1.6s linear infinite .55s"></i><i style="animation:flow 1.6s linear infinite 1.1s"></i></div>
          <span class="subject" data-subject>🌷</span>
          <span class="mover" data-mover hidden>🚴</span>
          <span class="fg-leaf" data-leaf hidden>🍃</span>
         </div>
          <div class="noise" data-noise></div>
          <div class="clip-warn" data-clip></div>
          <div class="vignette"></div>
        </div>
        <div class="sim-hud">
          <span class="hud-chip" data-readout></span>
          <span class="hud-chip warnchip" data-warn hidden></span>
        </div>
        <div class="sim-caption" data-caption></div>
      </div>

      <div class="meter" data-meter>
        <span style="font-size:.8rem;font-weight:700;color:var(--muted)">−3</span>
        <div class="meter-scale">
          <div class="ticks"><span></span><span></span><span></span><span class="mid"></span><span></span><span></span><span></span></div>
          <div class="meter-needle" data-needle></div>
        </div>
        <span style="font-size:.8rem;font-weight:700;color:var(--muted)">+3</span>
        <span class="meter-label" data-mlabel></span>
      </div>

      <div class="sim-controls">
        <label class="ctrl" data-c="aperture">
          <span class="ctrl-head"><b>Blende</b><span class="val" data-va></span></span>
          <input type="range" min="0" max="${APERTURES.length - 1}" step="1" value="${ai}" data-ra aria-label="Blende">
        </label>
        <label class="ctrl" data-c="shutter">
          <span class="ctrl-head"><b>Zeit</b><span class="val" data-vs></span></span>
          <input type="range" min="0" max="${SHUTTERS.length - 1}" step="1" value="${si}" data-rs aria-label="Belichtungszeit">
        </label>
        <label class="ctrl" data-c="iso">
          <span class="ctrl-head"><b>ISO</b><span class="val" data-vi></span></span>
          <input type="range" min="0" max="${ISOS.length - 1}" step="1" value="${ii}" data-ri aria-label="ISO">
        </label>
        <div class="sim-extra">
          <label class="switch"><input type="checkbox" data-tripod ${tripod ? "checked" : ""}> Stativ benutzen</label>
          ${o.scenePicker ? `<div class="scene-picker" data-picker>${Object.keys(SCENES).map(s =>
            `<button type="button" data-s="${s}" class="${s === sceneId ? "on" : ""}">${SCENES[s].label}</button>`).join("")}</div>` : ""}
        </div>
      </div>

      ${o.tasks.length ? `<div class="tasks"><h4>Aufgaben</h4><div data-tasks></div></div>` : ""}
    </div>`;

    const root = host.querySelector(".sim");
    const q = s => root.querySelector(s);
    const el = {
      scene: q("[data-scene]"), expo: q("[data-expo]"), far: q("[data-far]"), mid: q("[data-mid]"), bokeh: q("[data-bokeh]"),
      subject: q("[data-subject]"), mover: q("[data-mover]"), leaf: q("[data-leaf]"),
      noise: q("[data-noise]"), clip: q("[data-clip]"), water: q("[data-water]"),
      sun: q("[data-sun]"), ground: q("[data-ground]"), sky: q(".sky"),
      readout: q("[data-readout]"), warn: q("[data-warn]"), caption: q("[data-caption]"),
      meter: q("[data-meter]"), needle: q("[data-needle]"), mlabel: q("[data-mlabel]"),
      va: q("[data-va]"), vs: q("[data-vs]"), vi: q("[data-vi]"),
      ra: q("[data-ra]"), rs: q("[data-rs]"), ri: q("[data-ri]"),
      tasks: q("[data-tasks]"),
      mh: root.querySelector("#" + key + "-mh feGaussianBlur"),
      mv: root.querySelector("#" + key + "-mv feGaussianBlur")
    };
    el.noise.style.backgroundImage = NOISE_URL;

    // gewählten Regler hervorheben
    if (o.focus !== "all") {
      const c = root.querySelector(`[data-c="${o.focus}"]`);
      if (c) c.classList.add("focus");
    }

    function buildScene() {
      const s = SCENES[sceneId];
      el.sky.style.background = s.sky;
      el.ground.style.background = s.ground;
      const hills = s.hills || ["#9DBE93", "#B3CBA4"];
      root.querySelectorAll(".hill").forEach((h, i) => { h.style.background = hills[i] || hills[0]; });
      el.sun.style.display = sceneId === "night" ? "none" : "block";
      el.subject.textContent = s.subject;
      el.caption.textContent = s.caption;
      el.leaf.hidden = !s.leaves;
      el.water.hidden = !s.water;
      el.mover.hidden = !s.mover;
      if (s.mover) {
        el.mover.textContent = s.mover;
        el.mover.style.animation = "cross 2.8s linear infinite";
      } else el.mover.style.animation = "none";

      el.bokeh.innerHTML = "";
      const n = sceneId === "night" ? 13 : 9;
      for (let i = 0; i < n; i++) {
        const b = document.createElement("i");
        const c = s.bokehColors[i % s.bokehColors.length];
        b.style.left = (3 + Math.random() * 88) + "%";
        b.style.top = (8 + (sceneId === "night" ? Math.random() * 52 : Math.random() * 40)) + "%";
        b.style.background = `radial-gradient(circle at 42% 38%, #fff, ${c} 38%, ${c} 66%, rgba(255,255,255,.25) 74%, transparent 78%)`;
        b.dataset.scale = (0.55 + Math.random() * 0.85).toFixed(2);
        b.style.animation = `twinkle ${2 + Math.random() * 2.4}s ease-in-out ${Math.random()}s infinite`;
        el.bokeh.appendChild(b);
      }
    }

    function values() {
      const N = APERTURES[+el.ra.value], t = SHUTTERS[+el.rs.value], iso = ISOS[+el.ri.value];
      const s = SCENES[sceneId];
      return {
        N, t, iso, tripod, scene: sceneId, sceneEv: s.ev,
        stops: stopsOver(N, t, iso, s.ev),
        moving: !!s.mover, water: !!s.water
      };
    }

    function render() {
      const v = values();
      const s = SCENES[sceneId];

      // --- Blende → Hintergrund-Unschärfe & Bokeh-Größe ---
      // Offene Blende: Hintergrund weich, Lichtpunkte werden zu großen Kreisen.
      const bgBlur = clamp(30 / Math.pow(v.N, 1.1), 0.3, 20);
      el.far.style.filter = `blur(${(bgBlur * 0.75).toFixed(2)}px)`;
      el.mid.style.filter = `blur(${bgBlur.toFixed(2)}px)`;
      el.bokeh.style.filter = `blur(${(bgBlur * 0.3 + 0.6).toFixed(2)}px)`;
      const dotSize = clamp(9 + 92 / v.N, 11, 78);
      el.bokeh.querySelectorAll("i").forEach(b => {
        const sc = +b.dataset.scale;
        b.style.width = (dotSize * sc).toFixed(1) + "px";
        b.style.height = (dotSize * sc).toFixed(1) + "px";
        b.style.opacity = clamp(0.45 + bgBlur / 30, .45, .95);
      });
      el.leaf.style.filter = `blur(${(bgBlur * 1.4 + 1).toFixed(2)}px)`;

      // --- Zeit → Bewegungsunschärfe + Verwacklung ---
      const moveBlur = clamp(v.t * 150, 0, 70);
      el.mh.setAttribute("stdDeviation", moveBlur.toFixed(2) + " 0");
      if (v.moving) {
        el.mover.style.filter = `url(#${key}-mh)`;
        el.mover.style.opacity = clamp(1 - moveBlur / 90, .18, 1);
      }
      if (v.water) {
        const wBlur = clamp(v.t * 260, 0, 26);
        el.mv.setAttribute("stdDeviation", "0 " + wBlur.toFixed(2));
        el.water.style.filter = `url(#${key}-mv)`;
      }
      const shakeStops = Math.log2(v.t / (1 / 60));
      const shake = (!tripod && shakeStops > 0) ? clamp(shakeStops * 1.15, 0, 7) : 0;

      // --- ISO → Rauschen ---
      const isoStops = Math.log2(v.iso / 160);
      const grain = clamp(isoStops / 6.3, 0, 1);
      el.noise.style.opacity = (grain * 0.75).toFixed(3);
      el.noise.style.backgroundSize = (110 + grain * 90) + "px";

      // --- Belichtung → Helligkeit ---
      const b = clamp(Math.pow(2, v.stops * 0.45), 0.25, 2.0);
      const sat = clamp(1.06 - Math.max(0, v.stops - 0.8) * 0.18 - grain * 0.25, .25, 1.06);
      const con = clamp(1 - grain * 0.18 - Math.max(0, -v.stops - 1) * 0.05, .7, 1.05);
      el.expo.style.filter = `brightness(${b.toFixed(3)}) saturate(${sat.toFixed(2)}) contrast(${con.toFixed(2)}) blur(${shake.toFixed(2)}px)`;
      el.clip.style.opacity = clamp((v.stops - 2.2) / 4, 0, .30).toFixed(2);

      // --- Anzeige ---
      el.va.textContent = "f/" + v.N;
      el.vs.textContent = fmtShutter(v.t);
      el.vi.textContent = v.iso;
      el.readout.textContent = `f/${v.N} · ${fmtShutter(v.t)} · ISO ${v.iso}`;

      const off = clamp(v.stops, -3.4, 3.4);
      el.needle.style.left = (50 + off * 14.7) + "%";
      const okExp = Math.abs(v.stops) <= 0.45;
      el.meter.classList.toggle("ok", okExp);
      el.mlabel.textContent = okExp ? "Perfekt ✓" : (v.stops > 0 ? "+" : "−") + Math.abs(v.stops).toFixed(1) + " EV";

      let warn = "";
      if (v.stops > 2) warn = "☀️ Stark überbelichtet";
      else if (v.stops < -2) warn = "🌑 Viel zu dunkel";
      else if (shake > 2.2) warn = "🫨 Verwacklungsgefahr";
      else if (grain > .78) warn = "🌾 Sehr viel Rauschen";
      el.warn.hidden = !warn;
      el.warn.textContent = warn;

      checkTasks(v);
    }

    // ---- Aufgaben ----
    function taskKey(i) { return o.id + ":" + i; }
    function drawTasks() {
      if (!el.tasks) return;
      el.tasks.innerHTML = o.tasks.map((t, i) => `
        <div class="task ${State.isSolved(taskKey(i)) ? "solved" : ""}" data-t="${i}">
          <span class="box">${State.isSolved(taskKey(i)) ? "✓" : ""}</span>
          <span class="task-txt">${t.text}${t.hint ? `<small>${t.hint}</small>` : ""}</span>
        </div>`).join("");
    }
    function checkTasks(v) {
      if (!el.tasks || !interacted) return;
      o.tasks.forEach((t, i) => {
        if (State.isSolved(taskKey(i))) return;
        let ok = false;
        try { ok = !!t.check(v); } catch (e) { ok = false; }
        if (!ok) return;
        State.solve(taskKey(i));
        drawTasks();
        State.addXp(25);
        Reward.celebrate("klein", null, t.text);
        if (State.solvedCount() >= 10) {
          const bg = State.grantBadge("tueftler");
          if (bg) Reward.toast(`Abzeichen freigeschaltet: ${bg.icon} ${bg.name}`, "🏅");
        }
        if (typeof o.onSolve === "function") o.onSolve(i);
      });
    }

    // ---- Events ----
    [el.ra, el.rs, el.ri].forEach(r => r.addEventListener("input", () => { interacted = true; render(); }));
    root.querySelector("[data-tripod]").addEventListener("change", e => { interacted = true; tripod = e.target.checked; render(); });
    const picker = root.querySelector("[data-picker]");
    if (picker) picker.addEventListener("click", e => {
      const btn = e.target.closest("button[data-s]"); if (!btn) return;
      interacted = true;
      sceneId = btn.dataset.s;
      picker.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === btn));
      buildScene(); render();
    });

    buildScene(); drawTasks(); render();
    return { render, values, root };
  }

  window.Sim = { create, APERTURES, SHUTTERS, ISOS, SCENES, fmtShutter, stopsOver };
})();
