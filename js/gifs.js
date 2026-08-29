/* ============================================================
   GIF-Belohnungen
   ------------------------------------------------------------
   Hier kannst du jederzeit eigene Lieblings-GIFs eintragen:
   auf giphy.com ein GIF suchen -> Rechtsklick -> "Bildadresse
   kopieren" (endet auf .gif) -> unten in die passende Liste.
   Lädt ein GIF nicht (offline, Link tot), zeigt die App
   automatisch einen animierten Emoji-Sticker als Ersatz.
   ============================================================ */
window.GIFS = {
  // Kleiner Erfolg: Quizfrage richtig, Aufgabe im Simulator gelöst
  klein: [
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
    "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif"
  ],
  // Großer Erfolg: Lektion abgeschlossen, Badge freigeschaltet
  gross: [
    "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://media.giphy.com/media/xUOxf48tR1FGXK8FSU/giphy.gif"
  ],
  // Level-Up
  level: [
    "https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",
    "https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif"
  ]
};

/* Ersatz-Sticker (funktionieren immer, auch ohne Internet) */
window.STICKER = {
  klein: ["✨","🎯","👏","🌟","🔥","💫"],
  gross: ["🎉","🥳","🏆","🚀","🌈"],
  level: ["👑","🦄","💥","🎆"]
};

/* Lobsprüche – bewusst albern */
window.LOB = {
  klein: [
    ["Sitzt!", "Genau so. Weiter im Text."],
    ["Volltreffer 🎯", "Dein Kopf denkt schon in Blendenstufen."],
    ["Yes!", "Das war kein Zufall, das war Können."],
    ["Scharf!", "Im doppelten Sinne."],
    ["Perfekt belichtet", "Die Nadel steht wie eine Eins."]
  ],
  gross: [
    ["Lektion geschafft! 🎉", "Ein Stück weiter raus aus dem AUTO-Modus."],
    ["Kapitel abgehakt", "Deine Kamera zittert schon vor Respekt."],
    ["Du Naturtalent", "Das war richtig stark."]
  ],
  level: [
    ["LEVEL UP! 👑", "Du bist jetzt eine Stufe heller."],
    ["Aufgestiegen!", "Das Licht gehorcht dir langsam."]
  ]
};
