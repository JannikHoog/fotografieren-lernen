/* ============================================================
   Fortschritt: XP, Level, Badges, gelöste Aufgaben, Missionen
   Alles liegt im localStorage – nichts verlässt den Browser.
   ============================================================ */
(function () {
  const KEY = "lichtfaengerin.v1";

  const LEVELS = [
    { min: 0,    name: "Knipserin" },
    { min: 120,  name: "Lichtsucherin" },
    { min: 300,  name: "Blenden-Bändigerin" },
    { min: 550,  name: "Zeit-Jägerin" },
    { min: 850,  name: "ISO-Flüsterin" },
    { min: 1200, name: "Lichtfängerin" },
    { min: 1650, name: "Meisterin des Lichts" }
  ];

  const BADGES = [
    { id: "start",     icon: "spross",      name: "Erste Schritte",     hint: "Schließe deine erste Lektion ab." },
    { id: "blende",    icon: "blende",      name: "Blenden-Bändigerin", hint: "Meistere die Lektion über die Blende." },
    { id: "zeit",      icon: "zeit",        name: "Zeit-Jägerin",       hint: "Meistere die Lektion über die Belichtungszeit." },
    { id: "iso",       icon: "iso",         name: "Nachteule",          hint: "Meistere die Lektion über ISO." },
    { id: "dreieck",   icon: "waage",       name: "Dreiecks-Denkerin",  hint: "Bring die Belichtung ins Gleichgewicht." },
    { id: "raeder",    icon: "raeder",      name: "Rad-Beherrscherin",  hint: "Verstehe P, A, S und M an deiner X-T30 II." },
    { id: "farbe",     icon: "farbe",       name: "Farbfühlerin",       hint: "Weißabgleich & Filmsimulationen gemeistert." },
    { id: "auge",      icon: "gestaltung",  name: "Gutes Auge",         hint: "Bildgestaltung abgeschlossen." },
    { id: "tueftler",  icon: "tueftler",    name: "Tüftlerin",          hint: "Löse 10 Aufgaben im Simulator." },
    { id: "perfekt",   icon: "hundert",     name: "Quiz-Queen",         hint: "Beantworte 25 Quizfragen richtig." },
    { id: "draussen",  icon: "kamera",      name: "Rausgeher-Diplom",   hint: "Hake 5 Foto-Missionen ab." },
    { id: "komplett",  icon: "erfolge",     name: "Alles gelernt",      hint: "Schließe alle Lektionen ab." }
  ];

  const DEFAULT = {
    name: "",
    xp: 0,
    lessons: {},        // id -> { done:true, quizBest:n }
    solved: {},         // "simId:taskIdx" -> true
    quizRight: 0,
    missions: {},       // id -> true
    paidMissions: {},   // id -> true (XP dafür schon vergeben)
    paidQuiz: {},       // "lektion:frage" -> true (XP dafür schon vergeben)
    badges: {},         // id -> timestamp
    ownGifs: [],        // selbst eingetragene GIF-Adressen
    lastVisit: null,
    streak: 0,
    seenIntro: false
  };

  let data = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? Object.assign({}, DEFAULT, JSON.parse(raw)) : Object.assign({}, DEFAULT);
    } catch (e) {
      return Object.assign({}, DEFAULT);
    }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("state:change"));
  }

  function levelOf(xp) {
    let i = 0;
    for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k].min) i = k;
    return { index: i, num: i + 1, name: LEVELS[i].name, min: LEVELS[i].min, next: LEVELS[i + 1] ? LEVELS[i + 1].min : null };
  }

  const State = {
    LEVELS, BADGES,
    get: () => data,
    get name() { return data.name; },
    setName(n) { data.name = (n || "").trim().slice(0, 24); save(); },

    get xp() { return data.xp; },
    level() { return levelOf(data.xp); },
    levelProgress() {
      const l = levelOf(data.xp);
      if (l.next === null) return 1;
      return Math.min(1, (data.xp - l.min) / (l.next - l.min));
    },

    /** XP vergeben; gibt true zurück, wenn ein Level-Up passiert ist */
    addXp(n) {
      const before = levelOf(data.xp).index;
      data.xp += n;
      const after = levelOf(data.xp).index;
      save();
      return after > before;
    },

    lesson(id) { return data.lessons[id] || { done: false, quizBest: 0 }; },
    completeLesson(id) {
      const wasDone = !!(data.lessons[id] && data.lessons[id].done);
      data.lessons[id] = Object.assign({}, data.lessons[id], { done: true });
      save();
      return !wasDone;
    },
    setQuizBest(id, correct, total) {
      const l = data.lessons[id] || {};
      if (!l.quizBest || correct > l.quizBest) l.quizBest = correct;
      l.quizTotal = total;
      data.lessons[id] = l;
      save();
    },
    countQuizRight(n) { data.quizRight += n; save(); },

    isSolved(key) { return !!data.solved[key]; },
    solve(key) {
      if (data.solved[key]) return false;
      data.solved[key] = true; save(); return true;
    },
    solvedCount() { return Object.keys(data.solved).length; },

    isMission(id) { return !!data.missions[id]; },
    toggleMission(id) {
      if (data.missions[id]) delete data.missions[id]; else data.missions[id] = Date.now();
      save();
      return !!data.missions[id];
    },
    /** XP gibt es pro Mission nur einmal – auch nach Ab- und wieder Anhaken */
    claimMission(id) {
      if (data.paidMissions[id]) return false;
      data.paidMissions[id] = true; save(); return true;
    },
    /** dito pro Quizfrage: eine richtige Antwort zählt nur beim ersten Mal */
    claimQuiz(lessonId, index) {
      const k = lessonId + ":" + index;
      if (data.paidQuiz[k]) return false;
      data.paidQuiz[k] = true; save(); return true;
    },
    missionCount() { return Object.keys(data.missions).length; },

    /* --- eigene GIFs --- */
    gifs() { return (data.ownGifs || []).slice(); },
    addGif(url) {
      url = String(url || "").trim();
      if (!/^https?:\/\/\S+$/i.test(url)) return "Das sieht nicht nach einer Adresse aus (sie muss mit http beginnen).";
      if (!data.ownGifs) data.ownGifs = [];
      if (data.ownGifs.includes(url)) return "Das GIF ist schon in der Liste.";
      if (data.ownGifs.length >= 40) return "Mehr als 40 eigene GIFs gehen nicht.";
      data.ownGifs.push(url); save(); return null;
    },
    removeGif(url) {
      data.ownGifs = (data.ownGifs || []).filter(g => g !== url); save();
    },

    hasBadge(id) { return !!data.badges[id]; },
    grantBadge(id) {
      if (data.badges[id]) return null;
      data.badges[id] = Date.now(); save();
      return BADGES.find(b => b.id === id) || null;
    },
    badgeCount() { return Object.keys(data.badges).length; },

    /** Tages-Streak beim Start aktualisieren */
    touchDay() {
      const today = new Date().toISOString().slice(0, 10);
      if (data.lastVisit === today) return data.streak;
      const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      data.streak = data.lastVisit === y ? (data.streak || 0) + 1 : 1;
      data.lastVisit = today; save();
      return data.streak;
    },
    get streak() { return data.streak || 0; },
    get seenIntro() { return data.seenIntro; },
    markIntroSeen() { data.seenIntro = true; save(); },

    reset() { data = Object.assign({}, DEFAULT); save(); }
  };

  window.State = State;
})();
