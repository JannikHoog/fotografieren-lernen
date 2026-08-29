/* ============================================================
   Belohnungen: GIFs und Lobsprüche
   ------------------------------------------------------------
   Eigene GIFs kannst du auf zwei Wegen ergänzen:
   1. direkt in der App unter „Erfolge → Eigene GIFs“ (bleibt im Browser)
   2. hier fest eintragen: auf giphy.com oder tenor.com ein GIF suchen,
      Rechtsklick → „Bildadresse kopieren“ (endet auf .gif) → in die Liste.

   Wichtig: Lädt ein GIF nicht (Link tot, offline, Werbeblocker), zeigt
   die App automatisch einen animierten SVG-Sticker. Die Belohnung fällt
   also nie aus – schlimmstenfalls siehst du seltener echte GIFs.
   ============================================================ */
window.GIFS = {
  // Kleiner Erfolg: Quizfrage richtig, Aufgabe im Simulator gelöst
  klein: [
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/111ebonMs90YLu/giphy.gif",
    "https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif",
    "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
    "https://media.giphy.com/media/l4pTdcVZQjPGnaKfe/giphy.gif",
    "https://media.giphy.com/media/xT0GqH01ZyKwd3aT3G/giphy.gif",
    "https://media.giphy.com/media/3ohzdRoOp1FUYbtGDe/giphy.gif",
    "https://media.giphy.com/media/l3q2Z6S6n38zjPswo/giphy.gif",
    "https://media.giphy.com/media/26FPCXdkvDbKBbgOI/giphy.gif",
    "https://media.giphy.com/media/l0HlKghz8IvrQ8TQs/giphy.gif"
  ],
  // Großer Erfolg: Lektion abgeschlossen
  gross: [
    "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
    "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    "https://media.giphy.com/media/xUOxf48tR1FGXK8FSU/giphy.gif",
    "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    "https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif",
    "https://media.giphy.com/media/l0ExdMHUDKteztyfe/giphy.gif",
    "https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif",
    "https://media.giphy.com/media/3oz8xLd9DJq2l2VFtu/giphy.gif",
    "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif",
    "https://media.giphy.com/media/xUPGcguWZHRC2HyBRS/giphy.gif"
  ],
  // Level-Up
  level: [
    "https://media.giphy.com/media/ely3apij36BJhoZ234/giphy.gif",
    "https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif",
    "https://media.giphy.com/media/3o6fJb4LTvfnXFtOJi/giphy.gif",
    "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
    "https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif",
    "https://media.giphy.com/media/3oEjI4sFlp73fvEYgw/giphy.gif"
  ]
};

/* Animierte SVG-Sticker (aus js/icons.js) je Anlass */
window.STICKER = {
  klein: ["stern", "daumen", "konfetti", "herz", "kamera"],
  gross: ["konfetti", "pokal", "rakete", "medaille", "stern"],
  level: ["pokal", "rakete", "medaille", "konfetti"]
};

/* Lobsprüche – bewusst albern */
window.LOB = {
  klein: [
    ["Sitzt!", "Genau so. Weiter im Text."],
    ["Volltreffer", "Dein Kopf denkt schon in Blendenstufen."],
    ["Yes!", "Das war kein Zufall, das war Können."],
    ["Scharf!", "Im doppelten Sinne."],
    ["Perfekt belichtet", "Die Nadel steht wie eine Eins."],
    ["Chapeau", "Da war jemand aufmerksam."],
    ["Zack, richtig", "Das ging ja fix."],
    ["Sauber", "Kein Rauschen, kein Wackeln, kein Fehler."],
    ["Das saß", "Weiter so, du bist auf der Spur."],
    ["Treffer", "Deine Kamera nickt anerkennend."]
  ],
  gross: [
    ["Lektion geschafft!", "Ein Stück weiter raus aus dem AUTO-Modus."],
    ["Kapitel abgehakt", "Deine Kamera zittert schon vor Respekt."],
    ["Du Naturtalent", "Das war richtig stark."],
    ["Abgeschlossen!", "Und jetzt: raus und ausprobieren."],
    ["Wow", "Das hat gesessen, von vorne bis hinten."],
    ["Fertig!", "Dieses Wissen nimmt dir keiner mehr weg."]
  ],
  level: [
    ["LEVEL UP!", "Du bist jetzt eine Stufe heller."],
    ["Aufgestiegen!", "Das Licht gehorcht dir langsam."],
    ["Neue Stufe", "Es wird ernst – und richtig gut."],
    ["Beförderung!", "Von wegen Knipserin."]
  ]
};
