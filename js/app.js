/* ============================================================
   App: Router, Ansichten, Quiz-Engine
   ============================================================ */
(function () {
  const view = document.getElementById("view");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const byId = id => LESSONS.find(l => l.id === id);

  /* ---------- Kopfzeile ---------- */
  function paintHeader() {
    const lvl = State.level();
    document.getElementById("xpLevel").textContent = "Level " + lvl.num;
    document.getElementById("xpPoints").textContent = State.xp + " XP";
    document.getElementById("xpRing").style.setProperty("--p", Math.round(State.levelProgress() * 100) + "%");
  }
  document.addEventListener("state:change", paintHeader);

  /* ---------- Abzeichen prüfen ---------- */
  function checkBadges(silent) {
    const done = LESSONS.filter(l => State.lesson(l.id).done);
    const wins = [];
    const g = id => { const b = State.grantBadge(id); if (b) wins.push(b); };

    if (done.length >= 1) g("start");
    done.forEach(l => { if (l.badge) g(l.badge); });
    if (State.solvedCount() >= 10) g("tueftler");
    if (State.get().quizRight >= 25) g("perfekt");
    if (State.missionCount() >= 5) g("draussen");
    if (done.length === LESSONS.length) g("komplett");

    if (!silent) wins.forEach((b, i) => setTimeout(() =>
      Reward.toast(`Abzeichen: ${b.icon} ${b.name}`, "🏅"), 400 + i * 900));
    return wins;
  }

  function awardXp(n) {
    if (State.addXp(n)) {
      setTimeout(() => Reward.celebrate("level", null,
        "Du bist jetzt " + State.level().name + ". " + State.xp + " XP gesammelt."), 700);
    }
  }

  /* ---------- Bausteine rendern ---------- */
  function renderBlock(b, idx) {
    switch (b.type) {
      case "text":
        return `<div class="block prose">${b.html}</div>`;
      case "cards":
        return `<div class="block grid-2">${b.items.map(i =>
          `<div class="minicard"><span class="k">${i.k}</span><b>${i.b}</b><p>${i.p}</p></div>`).join("")}</div>`;
      case "table":
        return `<div class="block table-scroll"><table class="pretty"><thead><tr>${
          b.head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${
          b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      case "callout":
        return `<div class="block callout ${b.kind}"><h4>${b.title}</h4>${b.html}</div>`;
      case "sim":
        return `<div class="block" data-sim-slot="${idx}"></div>`;
      default: return "";
    }
  }

  function mountSims(lesson) {
    lesson.blocks.forEach((b, i) => {
      if (b.type !== "sim") return;
      const slot = view.querySelector(`[data-sim-slot="${i}"]`);
      if (slot) Sim.create(slot, b.sim);
    });
  }

  /* ---------- Startseite ---------- */
  function viewHome() {
    const s = State.get();
    const doneCount = LESSONS.filter(l => State.lesson(l.id).done).length;
    const next = LESSONS.find(l => !State.lesson(l.id).done) || LESSONS[0];
    const hallo = s.name ? `Hallo ${esc(s.name)}!` : "Raus aus dem AUTO-Modus.";

    view.innerHTML = `
      <section class="hero">
        <p class="eyebrow">Fotografieren lernen · Fujifilm X-T30 II</p>
        <h1>${hallo}</h1>
        <p>Blende, Zeit und ISO sind keine Geheimwissenschaft – sondern drei Regler, die du in ein paar
        Nachmittagen im Gefühl hast. Hier lernst du sie spielerisch, mit einem Simulator, in dem du
        sofort siehst, was passiert.</p>
        ${!s.name ? `
        <form class="name-form" id="nameForm">
          <input type="text" id="nameInput" placeholder="Wie heißt du?" maxlength="24" aria-label="Dein Name">
          <button class="btn btn-coral" type="submit">Los geht's</button>
        </form>` : `
        <div class="hero-actions">
          <a class="btn btn-coral" href="#/lektion/${next.id}">${doneCount ? "Weiterlernen" : "Erste Lektion starten"} →</a>
          <a class="btn" href="#/uebung">🎛️ Frei üben</a>
        </div>`}
        <div class="progress-strip">
          <span class="pill">📚 ${doneCount}/${LESSONS.length} Lektionen</span>
          <span class="pill">⭐ ${State.xp} XP · ${State.level().name}</span>
          <span class="pill">🔥 ${State.streak} ${State.streak === 1 ? "Tag" : "Tage"} in Folge</span>
          <span class="pill">🏅 ${State.badgeCount()}/${State.BADGES.length} Abzeichen</span>
        </div>
      </section>

      <div class="section-head"><h2>Deine Lektionen</h2><p>In dieser Reihenfolge ergibt es am meisten Sinn</p></div>
      <div class="grid-cards">
        ${LESSONS.map((l, i) => {
          const st = State.lesson(l.id);
          const quizTotal = l.quiz ? l.quiz.length : 0;
          const pct = st.done ? 100 : (quizTotal && st.quizBest ? Math.round(st.quizBest / quizTotal * 100) : 0);
          return `
          <a class="card tint-${l.tint}" href="#/lektion/${l.id}">
            ${st.done ? `<span class="done-badge">✓</span>` : ""}
            <div class="card-cover ${l.cover || (i % 3 === 0 ? "tall" : "")}">${l.emoji}</div>
            <div class="card-body">
              <h3>${l.title}</h3>
              <p>${l.sub}</p>
              <div class="card-meta">
                <span class="tag">${i + 1}. Lektion</span>
                <span>⏱ ${l.minutes} Min</span>
                ${quizTotal ? `<span>· ${quizTotal} Fragen</span>` : ""}
              </div>
            </div>
            <div class="card-progress"><i style="width:${pct}%"></i></div>
          </a>`;
        }).join("")}
      </div>`;

    const f = document.getElementById("nameForm");
    if (f) f.addEventListener("submit", e => {
      e.preventDefault();
      const v = document.getElementById("nameInput").value.trim();
      if (v) { State.setName(v); Reward.toast(`Schön, dass du da bist, ${v}!`, "👋"); }
      viewHome();
    });
  }

  /* ---------- Lektion ---------- */
  function viewLesson(id) {
    const l = byId(id);
    if (!l) return viewHome();
    const idx = LESSONS.indexOf(l);
    const nextL = LESSONS[idx + 1];

    view.innerHTML = `
      <a class="crumb" href="#/">← Alle Lektionen</a>
      <section class="lesson-hero tint-${l.tint}">
        <span class="big-emoji">${l.emoji}</span>
        <h1>${l.title}</h1>
        <p>${l.sub}</p>
      </section>
      ${l.blocks.map(renderBlock).join("")}
      ${l.quiz && l.quiz.length ? `
        <div class="section-head"><h2>Mini-Check</h2><p>${l.quiz.length} Fragen · 10 XP pro Treffer</p></div>
        <div class="block" id="quizHost"></div>` : ""}
      <div class="block spread" id="lessonFoot">
        ${nextL ? `<a class="btn" href="#/lektion/${nextL.id}">Nächste Lektion: ${nextL.title} →</a>` : `<a class="btn" href="#/erfolge">🏆 Deine Erfolge</a>`}
        <a class="btn btn-ghost" href="#/missionen">🎯 Foto-Missionen</a>
      </div>`;

    mountSims(l);
    if (l.quiz && l.quiz.length) mountQuiz(l);
  }

  /* ---------- Quiz ---------- */
  function mountQuiz(lesson) {
    const host = document.getElementById("quizHost");
    const qs = lesson.quiz;
    let i = 0, right = 0, answered = false;

    function draw() {
      const q = qs[i];
      host.innerHTML = `
        <div class="quiz">
          <span class="qcount">Frage ${i + 1} von ${qs.length}</span>
          <h3>${q.q}</h3>
          <div class="opts">
            ${q.o.map((o, k) => `<button class="opt" data-k="${k}">
               <span class="letter">${"ABCD"[k]}</span><span>${o}</span></button>`).join("")}
          </div>
          <div id="explainSlot"></div>
          <div class="quiz-foot">
            <div class="dots">${qs.map((_, k) =>
              `<i class="${k === i ? "on" : k < i ? "done" : ""}"></i>`).join("")}</div>
            <button class="btn btn-primary" id="qNext" style="display:none">
              ${i === qs.length - 1 ? "Auswerten" : "Weiter"} →</button>
          </div>
        </div>`;

      host.querySelectorAll(".opt").forEach(btn => btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const k = +btn.dataset.k;
        const ok = k === q.c;
        host.querySelectorAll(".opt").forEach((b, bi) => {
          b.disabled = true;
          if (bi === q.c) b.classList.add("right");
          else if (bi === k) b.classList.add("wrong");
        });
        document.getElementById("explainSlot").innerHTML =
          `<div class="explain">${ok ? "✅ " : "💡 "}${q.why}</div>`;
        document.getElementById("qNext").style.display = "";
        if (ok) {
          right++;
          State.countQuizRight(1);
          awardXp(10);
          Reward.confetti(26);
          Reward.toast("Richtig! +10 XP", "✨");
        }
      }));

      document.getElementById("qNext").addEventListener("click", () => {
        if (i < qs.length - 1) { i++; answered = false; draw(); host.scrollIntoView({ behavior: "smooth", block: "start" }); }
        else finish();
      });
    }

    function finish() {
      State.setQuizBest(lesson.id, right, qs.length);
      const fresh = State.completeLesson(lesson.id);
      if (fresh) awardXp(50);
      const wins = checkBadges(true);
      const perfect = right === qs.length;

      host.innerHTML = `
        <div class="quiz" style="text-align:center">
          <div style="font-size:3.2rem;line-height:1">${perfect ? "🏆" : right >= qs.length / 2 ? "🎉" : "🌱"}</div>
          <h3>${right} von ${qs.length} richtig</h3>
          <p style="color:var(--ink-soft)">${
            perfect ? "Fehlerfrei! Das sitzt." :
            right >= qs.length / 2 ? "Gut gemacht – der Rest kommt beim Fotografieren von allein." :
            "Kein Problem: Lies nochmal drüber und probier's gleich nochmal."}</p>
          <div class="quiz-foot" style="justify-content:center">
            <button class="btn" id="qAgain">Nochmal versuchen</button>
          </div>
        </div>`;
      document.getElementById("qAgain").addEventListener("click", () => { i = 0; right = 0; answered = false; draw(); });

      Reward.celebrate("gross", perfect ? "Perfekt! 🏆" : null,
        `„${lesson.title}“ abgeschlossen – ${right}/${qs.length} richtig.`);
      wins.forEach((b, n) => setTimeout(() => Reward.toast(`Abzeichen: ${b.icon} ${b.name}`, "🏅"), 1400 + n * 900));
    }

    draw();
  }

  /* ---------- Freies Üben ---------- */
  function viewPractice() {
    view.innerHTML = `
      <section class="hero">
        <p class="eyebrow">Spielwiese</p>
        <h1>Frei üben</h1>
        <p>Vier Szenen, drei Regler, keine Regeln. Wechsle die Szene, dreh an allem und schau,
        was passiert. Die Aufgaben unten sind kleine Herausforderungen – jede bringt 25 XP.</p>
      </section>
      <div class="block" id="freeSim"></div>
      <div class="block callout tip"><h4>Tipp</h4><p>Achte auf die Waage unter dem Bild: Solange sie
      grün ist und „Perfekt ✓“ zeigt, stimmt die Helligkeit. Alles darüber ist deine künstlerische Entscheidung.</p></div>`;

    Sim.create(document.getElementById("freeSim"), {
      id: "sim-frei", scene: "garden", focus: "all", aperture: 5.6, shutter: 1/500, iso: 400, scenePicker: true,
      tasks: [
        { text: "Erzeuge maximales Bokeh: f/1.4 bei korrekter Belichtung.", hint: "Zeit runter, ISO runter.",
          check: v => v.N === 1.4 && Math.abs(v.stops) <= 0.5 },
        { text: "Ein Bild ohne jedes Rauschen: ISO 160, korrekt belichtet.", hint: "Geht in jeder Szene – notfalls mit Stativ.",
          check: v => v.iso === 160 && Math.abs(v.stops) <= 0.5 },
        { text: "Langzeitbelichtung: 1 Sekunde oder länger, korrekt belichtet, mit Stativ.",
          hint: "Am besten in der Nacht- oder Wasserfall-Szene.",
          check: v => v.t >= 1 && v.tripod && Math.abs(v.stops) <= 0.6 },
        { text: "Sport-Einstellung: 1/2000 s, korrekt belichtet.", hint: "Viel Licht nötig: Blende weit auf und ISO hoch.",
          check: v => v.t <= 1/2000 && Math.abs(v.stops) <= 0.6 }
      ],
      onSolve: () => checkBadges()
    });
  }

  /* ---------- Missionen ---------- */
  function viewMissions() {
    const done = State.missionCount();
    view.innerHTML = `
      <section class="hero">
        <p class="eyebrow">Für draußen</p>
        <h1>Foto-Missionen</h1>
        <p>Wissen wird erst zu Können, wenn du auf den Auslöser drückst. Hak ab, was du geschafft hast –
        jede Mission bringt 30 XP.</p>
        <div class="progress-strip"><span class="pill">✅ ${done}/${MISSIONS.length} erledigt</span></div>
      </section>
      <div class="masonry">
        ${MISSIONS.map(m => `
          <div class="mission ${State.isMission(m.id) ? "done" : ""}" data-m="${m.id}" role="button" tabindex="0">
            <span class="box">${State.isMission(m.id) ? "✓" : ""}</span>
            <span><b>${m.icon} ${m.t}</b><p>${m.p}</p></span>
          </div>`).join("")}
      </div>`;

    const toggle = elm => {
      const id = elm.dataset.m;
      const nowDone = State.toggleMission(id);
      elm.classList.toggle("done", nowDone);
      elm.querySelector(".box").textContent = nowDone ? "✓" : "";
      if (nowDone) {
        awardXp(30);
        Reward.confetti(40);
        Reward.toast("Mission erledigt! +30 XP", "🎯");
        checkBadges();
      }
    };
    view.querySelectorAll(".mission").forEach(m => {
      m.addEventListener("click", () => toggle(m));
      m.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(m); } });
    });
  }

  /* ---------- Erfolge ---------- */
  function viewAchievements() {
    const lvl = State.level();
    const pct = Math.round(State.levelProgress() * 100);
    const doneCount = LESSONS.filter(l => State.lesson(l.id).done).length;

    view.innerHTML = `
      <section class="levelbar">
        <span class="qcount" style="font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:700">Level ${lvl.num}</span>
        <div class="lvl-name">${lvl.name}</div>
        <div class="track"><i style="width:${pct}%"></i></div>
        <div class="spread" style="font-size:.85rem;color:var(--muted)">
          <span>${State.xp} XP</span>
          <span>${lvl.next !== null ? (lvl.next - State.xp) + " XP bis Level " + (lvl.num + 1) : "Höchste Stufe erreicht 👑"}</span>
        </div>
      </section>

      <div class="progress-strip" style="margin-top:0">
        <span class="pill">📚 ${doneCount}/${LESSONS.length} Lektionen</span>
        <span class="pill">🧪 ${State.solvedCount()} Simulator-Aufgaben</span>
        <span class="pill">🎯 ${State.missionCount()}/${MISSIONS.length} Missionen</span>
        <span class="pill">💯 ${State.get().quizRight} Quizfragen richtig</span>
        <span class="pill">🔥 ${State.streak} Tage Streak</span>
      </div>

      <div class="section-head"><h2>Abzeichen</h2><p>${State.badgeCount()} von ${State.BADGES.length}</p></div>
      <div class="badges">
        ${State.BADGES.map(b => `
          <div class="badge ${State.hasBadge(b.id) ? "got" : ""}">
            <span class="ico">${b.icon}</span>
            <b>${b.name}</b>
            <small>${State.hasBadge(b.id) ? "Freigeschaltet ✓" : b.hint}</small>
          </div>`).join("")}
      </div>

      <div class="section-head"><h2>Einstellungen</h2></div>
      <div class="block callout warn">
        <h4>Neu anfangen</h4>
        <p>Löscht deinen gesamten Fortschritt in diesem Browser – Lektionen, XP und Abzeichen.</p>
        <button class="btn btn-sm" id="resetBtn">Fortschritt zurücksetzen</button>
      </div>`;

    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Wirklich alles zurücksetzen? Das kann nicht rückgängig gemacht werden.")) {
        State.reset(); location.hash = "#/"; viewAchievements(); Reward.toast("Alles auf Anfang.", "🧹");
      }
    });
  }

  /* ---------- Router ---------- */
  function route() {
    const h = (location.hash || "#/").slice(1);
    const parts = h.split("/").filter(Boolean);

    if (parts[0] === "lektion" && parts[1]) viewLesson(parts[1]);
    else if (parts[0] === "uebung") viewPractice();
    else if (parts[0] === "missionen") viewMissions();
    else if (parts[0] === "erfolge") viewAchievements();
    else viewHome();

    const base = "/" + (parts[0] === "lektion" ? "" : (parts[0] || ""));
    document.querySelectorAll(".mainnav a").forEach(a =>
      a.classList.toggle("active", a.dataset.route === base));

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    view.focus({ preventScroll: true });
  }

  window.addEventListener("hashchange", route);

  /* ---------- Start ---------- */
  const streak = State.touchDay();
  paintHeader();
  route();
  checkBadges(true);
  if (streak > 1) setTimeout(() => Reward.toast(`${streak} Tage in Folge! Weiter so.`, "🔥"), 900);
})();
