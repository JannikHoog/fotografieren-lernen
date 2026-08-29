/* ============================================================
   Lerninhalte – alle Lektionen, Quizze und Foto-Missionen
   Blocktypen: text | cards | table | callout | sim
   ============================================================ */
(function () {

const L = [];

/* ---------------------------------------------------------- 1 */
L.push({
  id: "licht", emoji: "△", tint: "sun", minutes: 5,
  title: "Das Licht-Dreieck",
  sub: "Warum es nur drei Regler gibt – und wie sie zusammenhängen.",
  cover: "tall",
  blocks: [
    { type: "text", html: `
      <p>Eine Kamera macht im Grunde nur eine einzige Sache: Sie sammelt Licht.
      Wie viel Licht auf dem Sensor landet, bestimmst du mit <b>genau drei Reglern</b>:</p>
      <p>Und jeder dieser Regler hat neben der Helligkeit noch eine <mark>Nebenwirkung</mark> –
      genau darin liegt die ganze Kunst. Der AUTO-Modus wählt die Helligkeit für dich,
      aber die Nebenwirkungen wählt er auch. Und die will man selbst in der Hand haben.</p>` },
    { type: "cards", items: [
      { k: "🔘", b: "Blende (f/…)", p: "Wie weit die Linse aufgeht. Nebenwirkung: <b>Schärfentiefe</b> – wie viel vom Bild scharf ist." },
      { k: "⏱️", b: "Belichtungszeit", p: "Wie lange das Licht hereindarf. Nebenwirkung: <b>Bewegung</b> – eingefroren oder verwischt." },
      { k: "🌙", b: "ISO", p: "Wie stark das Signal verstärkt wird. Nebenwirkung: <b>Rauschen</b> – Körnigkeit im Bild." }
    ]},
    { type: "text", html: `
      <h3>Alles wird in „Stufen“ gemessen</h3>
      <p>Eine <b>Blendenstufe</b> (auch: Stop, EV) bedeutet immer: doppelt so viel oder halb so viel Licht.
      Das Schöne daran: Die drei Regler sprechen dieselbe Sprache. Nimmst du irgendwo eine Stufe weg,
      kannst du sie woanders wieder draufpacken – und die Helligkeit bleibt gleich.</p>
      <ul>
        <li>Zeit von <code>1/250</code> auf <code>1/125</code> → eine Stufe <b>heller</b></li>
        <li>Blende von <code>f/2.8</code> auf <code>f/4</code> → eine Stufe <b>dunkler</b></li>
        <li>ISO von <code>400</code> auf <code>800</code> → eine Stufe <b>heller</b></li>
      </ul>
      <p>Genau das probierst du gleich unten aus: Die Nadel in der Mitte zeigt dir, ob die Helligkeit stimmt.</p>` },
    { type: "sim", sim: {
      id: "sim-licht", scene: "garden", focus: "all", aperture: 5.6, shutter: 1/250, iso: 400,
      tasks: [
        { text: "Bring die Nadel genau in die Mitte (perfekt belichtet).", hint: "Schiebe irgendeinen Regler, bis „Perfekt ✓“ erscheint.",
          check: v => Math.abs(v.stops) <= 0.45 },
        { text: "Bleib perfekt belichtet – aber mit Blende f/2.8.", hint: "Wenn du die Blende öffnest, musst du woanders Licht wegnehmen.",
          check: v => v.N === 2.8 && Math.abs(v.stops) <= 0.45 },
        { text: "Perfekt belichtet mit ISO 160 – dem saubersten Wert deiner Kamera.", hint: "Weniger ISO = weniger Licht. Gleich woanders wieder holen.",
          check: v => v.iso === 160 && Math.abs(v.stops) <= 0.45 }
      ]}},
    { type: "callout", kind: "tip", title: "Merksatz", html:
      `<p>Licht ist wie Wasser in einem Eimer: Die Blende ist der Hahn (wie weit auf), die Zeit ist die Dauer
      (wie lange offen), ISO ist die Empfindlichkeit des Eimers. Du willst den Eimer immer gleich voll –
      nur der Weg dahin verändert das Bild.</p>` },
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Deine Kamera ist dafür gebaut: Oben sitzt das <b>Zeitenrad</b>, am Objektiv der <b>Blendenring</b>,
      und ISO legst du dir am besten auf eine Funktionstaste oder ins <b>Q-Menü</b>.
      Du musst nie durch Menüs wühlen – alles ist ein Handgriff.</p>` }
  ],
  quiz: [
    { q: "Was passiert mit der Helligkeit, wenn du von 1/125 auf 1/250 wechselst?",
      o: ["Das Bild wird eine Stufe heller", "Das Bild wird eine Stufe dunkler", "Nichts, nur die Schärfe ändert sich"],
      c: 1, why: "1/250 ist die halbe Zeit – also halb so viel Licht, eine Stufe dunkler." },
    { q: "Welche Nebenwirkung hat die Blende?",
      o: ["Bildrauschen", "Bewegungsunschärfe", "Schärfentiefe"],
      c: 2, why: "Die Blende entscheidet, wie viel vom Bild von vorn nach hinten scharf ist." },
    { q: "Du machst ISO von 800 auf 200. Wie gleichst du das aus?",
      o: ["Zeit zwei Stufen länger (z. B. 1/250 → 1/60)", "Zeit zwei Stufen kürzer", "Gar nicht, ISO ändert die Helligkeit nicht"],
      c: 0, why: "ISO 800 → 200 sind zwei Stufen weniger Licht. Also brauchst du zwei Stufen mehr Zeit." }
  ]
});

/* ---------------------------------------------------------- 2 */
L.push({
  id: "blende", emoji: "🔘", tint: "coral", minutes: 7, badge: "blende",
  title: "Die Blende",
  sub: "Der Regler für cremige Hintergründe – und für knackscharfe Landschaften.",
  blocks: [
    { type: "text", html: `
      <p>Die Blende ist eine kleine Lamellen-Öffnung im Objektiv. Sie kann sich weit öffnen (viel Licht)
      oder klein zusammenziehen (wenig Licht). Angegeben wird sie als <code>f/2</code>, <code>f/5.6</code>, <code>f/16</code>…</p>
      <p>Und jetzt der Teil, über den alle stolpern: <mark>Kleine Zahl = große Öffnung.</mark>
      <code>f/1.4</code> ist sperrangelweit offen, <code>f/16</code> ist ein Nadelöhr. Das liegt daran, dass
      f/2 eigentlich ein Bruch ist – „ein Halb“ ist eben größer als „ein Sechzehntel“.</p>
      <h3>Die Nebenwirkung: Schärfentiefe</h3>
      <p>Je weiter die Blende offen ist, desto <b>dünner</b> ist die Schicht, die scharf abgebildet wird.
      Bei f/1.4 sind die Augen scharf und die Ohren schon leicht weich. Bei f/11 ist von der Blume bis
      zum Berg alles knackig.</p>` },
    { type: "cards", items: [
      { k: "😍", b: "f/1.4 – f/2.8", p: "Offenblende. Für Porträts, Details, Freistellen. Hintergrund schmilzt zu Farbflecken (Bokeh)." },
      { k: "👌", b: "f/4 – f/8", p: "Der Alltagsbereich. Genug Schärfe, noch schöne Trennung. f/8 ist oft der schärfste Punkt eines Objektivs." },
      { k: "🏔️", b: "f/11 – f/16", p: "Landschaft, Architektur, Gruppenfotos. Alles scharf – kostet aber viel Licht." }
    ]},
    { type: "callout", kind: "warn", title: "Achtung, Falle", html:
      `<p>Noch weiter zu (f/22) macht das Bild nicht schärfer, sondern durch <b>Beugung</b> sogar wieder
      leicht matschig. Über f/16 geht man nur, wenn man wirklich muss.</p>` },
    { type: "text", html: `
      <h3>Probier's aus</h3>
      <p>Schieb unten die Blende von f/22 nach f/1.4 und beobachte die Lichter im Hintergrund.
      Achte darauf, wie du dabei die Helligkeit nachkorrigieren musst.</p>` },
    { type: "sim", sim: {
      id: "sim-blende", scene: "garden", focus: "aperture", aperture: 11, shutter: 1/250, iso: 400,
      tasks: [
        { text: "Mach den Hintergrund so cremig wie möglich – und halte die Belichtung korrekt.",
          hint: "Blende weit auf (f/1.4), dann Zeit und ISO nachziehen.",
          check: v => v.N <= 2 && Math.abs(v.stops) <= 0.5 },
        { text: "Jetzt das Gegenteil: alles scharf bis nach hinten, korrekt belichtet.",
          hint: "f/11 oder kleiner – und dafür mehr Zeit oder mehr ISO.",
          check: v => v.N >= 11 && Math.abs(v.stops) <= 0.5 }
      ]}},
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Beim <b>XF 18-55 f/2.8-4</b> drehst du die Blende direkt am Ring am Objektiv – ohne Beschriftung,
      der Wert erscheint im Sucher. Beim <b>XC 15-45</b> gibt es keinen Blendenring: Dort stellst du die
      Blende mit dem <b>hinteren Wahlrad</b> ein.</p>
      <p>Wichtig: Steht der Blendenring auf <b>A</b>, wählt die Kamera die Blende selbst. Zum Üben:
      Ring von A wegdrehen, dann hast du die Kontrolle.</p>` },
    { type: "callout", kind: "tip", title: "Drei Tricks für mehr Unschärfe", html:
      `<ul style="margin:0;padding-left:1.1em">
        <li>Blende weiter öffnen (kleine f-Zahl)</li>
        <li><b>Näher ans Motiv</b> gehen – wirkt oft stärker als die Blende</li>
        <li>Den <b>Abstand zum Hintergrund vergrößern</b> und länger zoomen (55 mm statt 18 mm)</li>
      </ul>` }
  ],
  quiz: [
    { q: "Welche Blende gibt den unschärfsten Hintergrund?",
      o: ["f/16", "f/8", "f/2"], c: 2, why: "Kleine Zahl = große Öffnung = wenig Schärfentiefe." },
    { q: "Du fotografierst eine Landschaft und willst vorn und hinten scharf. Was wählst du?",
      o: ["f/1.4", "f/2.8", "f/11"], c: 2, why: "f/8–f/11 bringt Tiefenschärfe von vorn bis hinten." },
    { q: "Von f/4 auf f/2.8 – was passiert mit dem Licht?",
      o: ["Doppelt so viel Licht", "Halb so viel Licht", "Gleich viel Licht"], c: 0,
      why: "Jeder Schritt in der Reihe 1.4 / 2 / 2.8 / 4 / 5.6 / 8 / 11 / 16 ist genau eine Stufe." },
    { q: "Was passiert bei f/22 zusätzlich?",
      o: ["Das Bild wird durch Beugung wieder etwas weicher", "Die Farben werden kräftiger", "Der Autofokus wird schneller"],
      c: 0, why: "Sehr kleine Öffnungen beugen das Licht – die maximale Schärfe sinkt wieder." }
  ]
});

/* ---------------------------------------------------------- 3 */
L.push({
  id: "zeit", emoji: "⏱️", tint: "sky", minutes: 7, badge: "zeit",
  title: "Die Belichtungszeit",
  sub: "Bewegung einfrieren oder zu Malerei verwischen.",
  blocks: [
    { type: "text", html: `
      <p>Die Belichtungszeit ist die Dauer, die der Verschluss offen bleibt: <code>1/1000</code> Sekunde
      (extrem kurz) bis zu mehreren Sekunden. Sie ist der intuitivste der drei Regler –
      und der, mit dem man die meisten Bilder rettet oder ruiniert.</p>
      <h3>Zwei Arten von Unschärfe</h3>
      <p>Wichtig: Es gibt <b>Motiv</b>bewegung (das Kind rennt) und <b>Kamera</b>bewegung (deine Hände zittern).
      Beide bekämpfst du mit kurzer Zeit – aber die Grenzen sind unterschiedlich.</p>` },
    { type: "table", head: ["Situation", "Zeit", "Ergebnis"], rows: [
      ["Sport, spritzendes Wasser", "1/1000 s", "gestochen eingefroren"],
      ["Rennende Kinder, Hunde", "1/500 s", "scharf"],
      ["Menschen, die gehen", "1/250 s", "scharf"],
      ["Porträt, ruhige Szene", "1/125 s", "sicher aus der Hand"],
      ["Untergrenze Freihand", "1/60 s", "Verwacklungsgefahr"],
      ["Fließendes Wasser", "1/4 – 2 s", "seidig weich – <b>Stativ nötig</b>"],
      ["Lichtspuren, Sterne", "10 – 30 s", "Malerei – Stativ Pflicht"]
    ]},
    { type: "callout", kind: "tip", title: "Die Freihand-Faustregel", html:
      `<p>Nimm den Kehrwert deiner Brennweite: Bei <b>55 mm</b> also mindestens <code>1/55</code>, sicherheitshalber
      <code>1/125</code>. Weil dein Sensor kleiner ist als Kleinbild (APS-C, Faktor 1,5), rechnest du am besten
      mit dem 1,5-fachen: 55 mm → wie 83 mm → mindestens <code>1/100</code>.</p>` },
    { type: "text", html: `
      <h3>Probier's aus</h3>
      <p>Das Fahrrad fährt immer gleich schnell. Nur deine Zeit entscheidet, ob du es einfrierst oder
      zu einem Streifen ziehst. Schalte auch mal das Stativ aus und geh unter 1/60 – dann siehst du das Zittern.</p>` },
    { type: "sim", sim: {
      id: "sim-zeit", scene: "action", focus: "shutter", aperture: 16, shutter: 1/30, iso: 160,
      scenePicker: true,
      tasks: [
        { text: "Frier das Fahrrad komplett ein – bei korrekter Belichtung.",
          hint: "1/1000 oder kürzer. Das kostet Licht: Blende auf oder ISO hoch.",
          check: v => v.moving && v.t <= 1/1000 && Math.abs(v.stops) <= 0.5 },
        { text: "Wechsle zur Wasserfall-Szene und zieh das Wasser seidig weich.",
          hint: "Szene 💧 wählen, Zeit 1/4 s oder länger, Stativ an, dann abdunkeln (f/16, ISO 160).",
          check: v => v.water && v.t >= 1/4 && Math.abs(v.stops) <= 0.6 },
        { text: "Fotografiere ohne Stativ, ohne Verwacklungswarnung.",
          hint: "Stativ-Haken raus und Zeit auf 1/60 oder kürzer.",
          check: v => !v.tripod && v.t <= 1/60 && Math.abs(v.stops) <= 0.6 }
      ]}},
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Das <b>Zeitenrad</b> oben rechts stellt volle Stufen ein (1/125, 1/250 …). Steht es auf <b>A</b>,
      wählt die Kamera die Zeit. Zwischenwerte (1/160 usw.) bekommst du mit dem <b>hinteren Wahlrad</b>,
      wenn das Zeitenrad auf einer Zahl steht.</p>
      <p>Für ganz lange Belichtungen gibt es <b>T</b> (Zeit übers Rad bis 15 min) und <b>B</b> (so lange
      du den Auslöser hältst). Hat dein Objektiv <b>OIS</b> (Bildstabilisator), darfst du 2–3 Stufen länger
      aus der Hand belichten – gegen <i>Motiv</i>bewegung hilft er aber nicht.</p>` }
  ],
  quiz: [
    { q: "Deine Nichte rennt durchs Bild. Welche Zeit?",
      o: ["1/30 s", "1/500 s", "2 s"], c: 1, why: "Rennende Menschen brauchen etwa 1/500 s, um scharf zu werden." },
    { q: "Du willst seidiges Wasser an einem Bach. Was brauchst du unbedingt?",
      o: ["Ein Stativ", "Hohen ISO-Wert", "Offene Blende"], c: 0,
      why: "Bei ¼ Sekunde und länger verwackelt jede Hand. Stativ oder feste Auflage." },
    { q: "Du fotografierst mit 55 mm aus der Hand. Ab welcher Zeit wird es kritisch?",
      o: ["Ab 1/500 s", "Ab etwa 1/60 s", "Ab 1/4000 s"], c: 1,
      why: "Faustregel Kehrwert der (umgerechneten) Brennweite – bei 55 mm an APS-C also rund 1/100, spätestens ab 1/60 wird's wacklig." },
    { q: "Der Bildstabilisator (OIS) hilft gegen …",
      o: ["Zitternde Hände", "Rennende Motive", "Bildrauschen"], c: 0,
      why: "OIS gleicht deine Bewegung aus – ein rennendes Motiv verwischt trotzdem." }
  ]
});

/* ---------------------------------------------------------- 4 */
L.push({
  id: "iso", emoji: "🌙", tint: "plum", minutes: 6, badge: "iso",
  title: "ISO",
  sub: "Der Notfall-Verstärker: Wie viel Rauschen ist okay?",
  blocks: [
    { type: "text", html: `
      <p>ISO ist der einzige der drei Regler, der <b>kein echtes Licht</b> hinzufügt. Er verstärkt nur das
      Signal, das schon da ist – wie der Lautstärkeregler an einem Radio. Und wie beim Radio verstärkt er
      dabei auch das Rauschen mit.</p>
      <h3>Die Reihenfolge, die Profis benutzen</h3>
      <ol>
        <li>Zuerst: <b>Blende</b> – wie viel Schärfentiefe brauche ich?</li>
        <li>Dann: <b>Zeit</b> – wie schnell ist mein Motiv, wackle ich?</li>
        <li>Zum Schluss: <b>ISO</b> so hoch wie nötig, so niedrig wie möglich.</li>
      </ol>
      <p>ISO ist also nicht „schlecht“ – ein leicht rauschendes, scharfes Bild ist tausendmal besser
      als ein sauberes, verwackeltes.</p>` },
    { type: "cards", items: [
      { k: "✨", b: "ISO 160 – 400", p: "Draußen bei Tageslicht. Maximale Qualität, feinste Details." },
      { k: "🙂", b: "ISO 800 – 1600", p: "Innenräume, Schatten, bewölkt. Sieht bei deiner Kamera noch top aus." },
      { k: "🌃", b: "ISO 3200 – 6400", p: "Abends, Konzert, Kerzenlicht. Sichtbares Korn – oft charmant, wie Analogfilm." },
      { k: "🆘", b: "ISO 12800+", p: "Nur wenn es sein muss. Details verschwimmen, Farben blassen aus." }
    ]},
    { type: "callout", kind: "zen", title: "Gute Nachricht", html:
      `<p>Der 26-MP-X-Trans-Sensor deiner X-T30 II ist bei hohen ISO-Werten richtig gut, und Fujis Korn sieht
      angenehm filmisch aus – nicht digital-matschig. Bis ISO 3200 kannst du praktisch bedenkenlos gehen.
      Die Basis-Empfindlichkeit ist <b>ISO 160</b>, dort ist die Qualität am höchsten.</p>` },
    { type: "text", html: `<h3>Probier's aus</h3><p>Nachtszene: Schieb ISO hoch und runter und schau, was mit Korn und Farben passiert.</p>` },
    { type: "sim", sim: {
      id: "sim-iso", scene: "night", focus: "iso", aperture: 2.8, shutter: 1/60, iso: 800,
      tasks: [
        { text: "Belichte die Nachtszene korrekt – ohne Stativ und ohne Verwacklungswarnung.",
          hint: "Zeit maximal 1/60, Blende weit auf, ISO so weit hoch wie nötig.",
          check: v => v.scene === "night" && !v.tripod && v.t <= 1/60 && Math.abs(v.stops) <= 0.5 },
        { text: "Jetzt mit Stativ: gleiche Helligkeit, aber ISO 400 oder niedriger.",
          hint: "Stativ anhaken, dann kannst du die Zeit lang machen und ISO runterziehen.",
          check: v => v.scene === "night" && v.tripod && v.iso <= 400 && Math.abs(v.stops) <= 0.5 }
      ]}},
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Die X-T30 II hat kein eigenes ISO-Rad. Am schnellsten geht's über die <b>Q-Taste</b> (Schnellmenü)
      oder du legst ISO auf eine <b>Fn-Taste</b> bzw. eine Richtung des Steuerkreuzes.</p>
      <p>Sehr praktisch: <b>Auto-ISO</b> mit eigenen Grenzen. Im Menü kannst du drei Auto-ISO-Profile anlegen,
      z. B. „Maximum ISO 3200, Mindestverschlusszeit 1/125“. Dann regelt die Kamera ISO selbst, aber nur
      innerhalb deiner Regeln – ideal, wenn du dich auf Blende und Zeit konzentrieren willst.</p>` }
  ],
  quiz: [
    { q: "Was macht ISO physikalisch?",
      o: ["Es lässt mehr Licht in die Kamera", "Es verstärkt das vorhandene Signal", "Es verlängert die Belichtungszeit"],
      c: 1, why: "Deshalb kommt auch das Rauschen mit hoch – es wird mitverstärkt." },
    { q: "Was ist besser: ein leicht rauschendes scharfes Bild oder ein sauberes verwackeltes?",
      o: ["Das rauschende scharfe", "Das saubere verwackelte", "Beide sind unbrauchbar"],
      c: 0, why: "Rauschen kann man mögen oder rausrechnen. Verwacklung ist endgültig." },
    { q: "Welcher ISO-Wert liefert an deiner Kamera die beste Qualität?",
      o: ["ISO 160", "ISO 800", "ISO 6400"], c: 0, why: "ISO 160 ist die Basis-Empfindlichkeit der X-T30 II." },
    { q: "Du bist mit Stativ nachts unterwegs. Wie stellst du ISO ein?",
      o: ["So hoch wie möglich", "So niedrig wie möglich, dafür lange Zeit", "Egal, Stativ gleicht Rauschen aus"],
      c: 1, why: "Mit Stativ darf die Zeit lang sein – also ISO runter für ein sauberes Bild." }
  ]
});

/* ---------------------------------------------------------- 5 */
L.push({
  id: "balance", emoji: "⚖️", tint: "sage", minutes: 6, badge: "dreieck",
  title: "Belichtung ausbalancieren",
  sub: "Die Waage im Sucher lesen – und bewusst schummeln.",
  blocks: [
    { type: "text", html: `
      <p>Im Sucher deiner Kamera siehst du eine kleine Skala von −3 über 0 bis +3. Das ist der
      <b>Belichtungsmesser</b>. Er sagt: „So wie du eingestellt hast, wird das Bild zu hell / zu dunkel / genau richtig.“</p>
      <h3>Gleiche Helligkeit, völlig anderes Bild</h3>
      <p>Diese drei Einstellungen ergeben exakt dieselbe Helligkeit – aber drei komplett verschiedene Fotos:</p>` },
    { type: "table", head: ["Einstellung", "Wirkung"], rows: [
      ["f/2 · 1/1000 · ISO 200", "Hintergrund cremig, Bewegung eingefroren, sauber"],
      ["f/4 · 1/250 · ISO 200", "Alltagseinstellung, ausgewogen"],
      ["f/8 · 1/60 · ISO 200", "Alles scharf, Bewegung verwischt leicht"]
    ]},
    { type: "callout", kind: "tip", title: "Die Kamera liegt oft falsch", html:
      `<p>Der Belichtungsmesser zielt auf „mittleres Grau“. Bei viel <b>Schnee</b> oder hellem Sand macht er
      das Bild zu dunkel, bei einem <b>dunklen Hintergrund</b> zu hell. Dann korrigierst du bewusst:
      Schnee <b>+1</b>, dunkle Szene <b>−1</b>. Das nennt sich <b>Belichtungskorrektur</b>.</p>` },
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Rechts oben sitzt das <b>Belichtungskorrektur-Rad</b> (−3 bis +3). Ein Klick = 1/3 Stufe.
      Auf Position <b>C</b> kannst du mit dem Frontrad sogar bis ±5 gehen.</p>
      <p>Riesenvorteil deiner Kamera: Der Sucher zeigt dir <b>live</b>, wie hell das Bild wird
      (WYSIWYG). Du musst dem Balken gar nicht blind vertrauen – du siehst das Ergebnis vorher.
      Nutze zusätzlich das <b>Histogramm</b> (im Sucher einblendbar): Klebt der Berg rechts an der Wand,
      sind Lichter ausgebrannt – das ist der einzige Fehler, den man nicht mehr reparieren kann.</p>` },
    { type: "text", html: `<h3>Trainiere dein Auge</h3><p>Drei Aufgaben – jedes Mal dasselbe Ziel, ein anderer Weg dorthin.</p>` },
    { type: "sim", sim: {
      id: "sim-balance", scene: "garden", focus: "all", aperture: 8, shutter: 1/250, iso: 1600,
      scenePicker: true,
      tasks: [
        { text: "Korrekt belichtet mit f/2 – dem „Porträt-Look“.",
          hint: "Offene Blende bedeutet viel Licht: Zeit kürzer und ISO runter.",
          check: v => v.N <= 2 && Math.abs(v.stops) <= 0.4 },
        { text: "Korrekt belichtet mit f/8 und ISO 160 – der „Landschafts-Look“.",
          hint: "Wenig Licht durch Blende und ISO – also längere Zeit.",
          check: v => v.N >= 8 && v.iso <= 160 && Math.abs(v.stops) <= 0.4 },
        { text: "Absichtlich eine Stufe überbelichten (etwa +1 EV) – wie bei Schnee.",
          hint: "Die Nadel soll rechts bei +1 stehen.",
          check: v => v.stops >= 0.8 && v.stops <= 1.3 }
      ]}}
  ],
  quiz: [
    { q: "Du fotografierst im Schnee und alles wird grau. Was tust du?",
      o: ["Belichtungskorrektur auf +1", "Belichtungskorrektur auf −1", "ISO erhöhen"],
      c: 0, why: "Die Kamera denkt, Weiß sei Grau. Du musst ihr sagen: heller." },
    { q: "f/4 · 1/250 · ISO 400 ist korrekt. Welche Kombination ist gleich hell?",
      o: ["f/2.8 · 1/500 · ISO 400", "f/2.8 · 1/250 · ISO 400", "f/5.6 · 1/500 · ISO 400"],
      c: 0, why: "Eine Stufe mehr durch die Blende, eine Stufe weniger durch die Zeit – es gleicht sich aus." },
    { q: "Was kann man in der Nachbearbeitung NICHT mehr retten?",
      o: ["Leicht zu dunkle Bilder", "Komplett ausgebrannte weiße Flächen", "Etwas Rauschen"],
      c: 1, why: "Wo keine Information mehr ist, kann keine zurückgeholt werden. Deshalb: Lichter im Blick behalten." }
  ]
});

/* ---------------------------------------------------------- 6 */
L.push({
  id: "modi", emoji: "🎛️", tint: "coral", minutes: 6, badge: "raeder",
  title: "P, A, S, M an deiner X-T30 II",
  sub: "Fuji hat kein Moduswahlrad – und das ist genial.",
  blocks: [
    { type: "text", html: `
      <p>Andere Kameras haben ein Rad mit P/A/S/M. Fujifilm nicht. Bei dir ergibt sich der Modus aus der
      <b>Kombination</b> von Zeitenrad und Blendenring. Klingt erst komisch, ist aber schneller:
      Du siehst mit einem Blick, was du der Kamera überlässt.</p>` },
    { type: "table", head: ["Zeitenrad", "Blende", "= Modus", "Wofür"], rows: [
      ["A", "A", "<b>P</b> – Programm", "Schnappschuss, Kamera entscheidet beides"],
      ["A", "du wählst", "<b>A</b> – Blendenpriorität", "<b>Der Alltagsmodus.</b> Du bestimmst die Unschärfe"],
      ["du wählst", "A", "<b>S</b> – Zeitpriorität", "Sport, Kinder, Wasser – du bestimmst die Bewegung"],
      ["du wählst", "du wählst", "<b>M</b> – Manuell", "Volle Kontrolle: Studio, Nacht, gleichbleibendes Licht"]
    ]},
    { type: "callout", kind: "tip", title: "Womit du anfangen solltest", html:
      `<p><b>Blendenpriorität (A)</b> mit Auto-ISO. Du drehst nur am Blendenring und entscheidest über die
      Unschärfe – die Kamera kümmert sich um den Rest. Das ist der Modus, in dem viele Profis 80 % ihrer
      Bilder machen. Danach: <b>S</b>, sobald sich etwas bewegt. <b>M</b> erst, wenn dich A und S ausbremsen.</p>` },
    { type: "callout", kind: "warn", title: "Der AUTO-Hebel", html:
      `<p>Auf der Oberseite sitzt der kleine <b>Auto-Hebel</b>. Steht er auf AUTO, ignoriert die Kamera alle
      deine Räder und macht ihr eigenes Ding. Schieb ihn weg von AUTO – das ist buchstäblich dein erster
      Schritt raus aus dem Automatikmodus. 🎉</p>` },
    { type: "cards", items: [
      { k: "🎯", b: "Q-Taste", p: "Schnellmenü mit 16 Kacheln: ISO, Weißabgleich, Filmsimulation, AF-Modus. Halte Q gedrückt, um es dir umzubauen." },
      { k: "🔘", b: "Fn-Tasten", p: "Halte eine Taste lange gedrückt, um ihr eine Funktion zuzuweisen – z. B. ISO oder Fokusmodus." },
      { k: "👀", b: "Sucher-Ansicht", p: "Mit DISP/BACK schaltest du zwischen Infos, Histogramm und cleanem Bild um." }
    ]}
  ],
  quiz: [
    { q: "Zeitenrad auf A, Blendenring auf f/2.8 – in welchem Modus bist du?",
      o: ["Programm (P)", "Blendenpriorität (A)", "Manuell (M)"], c: 1,
      why: "Du gibst die Blende vor, die Kamera sucht die passende Zeit." },
    { q: "Welcher Modus eignet sich am besten für ein Fußballspiel?",
      o: ["Zeitpriorität (S)", "Blendenpriorität (A)", "Programm (P)"], c: 0,
      why: "Du legst 1/1000 s fest, die Kamera regelt die Blende dazu." },
    { q: "Was macht der AUTO-Hebel oben auf der Kamera?",
      o: ["Er schaltet den Autofokus ein", "Er überschreibt alle deine Rad-Einstellungen", "Er startet die Selbstauslöser-Funktion"],
      c: 1, why: "Solange er auf AUTO steht, haben deine Räder keine Wirkung." }
  ]
});

/* ---------------------------------------------------------- 7 */
L.push({
  id: "fokus", emoji: "🎯", tint: "sky", minutes: 5,
  title: "Schärfe & Fokus",
  sub: "Die Augen müssen sitzen. Alles andere darf weich sein.",
  blocks: [
    { type: "text", html: `
      <p>Ein Bild wirkt „professionell“, wenn die <b>richtige Stelle</b> scharf ist – meistens das nächste Auge.
      Dafür musst du der Kamera sagen, wohin sie schauen soll, statt sie raten zu lassen.</p>
      <h3>Die drei Fokus-Modi</h3>` },
    { type: "cards", items: [
      { k: "S", b: "AF-S – Einzel", p: "Für alles, was stillhält. Kamera fokussiert einmal und hält." },
      { k: "C", b: "AF-C – kontinuierlich", p: "Für Bewegung. Kamera zieht die Schärfe mit, solange du halb drückst." },
      { k: "M", b: "MF – manuell", p: "Für Makro, Nacht, Stillleben. Mit Fokus-Peaking siehst du farbig, was scharf ist." }
    ]},
    { type: "callout", kind: "fuji", title: "An deiner X-T30 II", html:
      `<p>Vorne links sitzt der <b>Fokus-Wahlhebel</b> mit S / C / M. Mit dem <b>Joystick</b> schiebst du das
      Messfeld dorthin, wo es hin soll – viel präziser als „fokussieren und schwenken“.</p>
      <p>Im Menü <b>AF/MF → Gesichts-/Augenerkennung</b> einschalten: Die X-T30 II findet Augen zuverlässig.
      Für Menschen ist das die halbe Miete. Für Details eher <b>Einzelfeld</b> plus Joystick.</p>` },
    { type: "callout", kind: "tip", title: "Wenn's nicht scharf wird", html:
      `<ul style="margin:0;padding-left:1.1em">
        <li>Zu wenig Kontrast? Ziel eine Kante an, nicht eine glatte Fläche.</li>
        <li>Zu dunkel? Autofokus braucht Licht – manuell mit Peaking hilft.</li>
        <li>Zu nah? Jedes Objektiv hat eine Naheinstellgrenze. Einen Schritt zurück.</li>
        <li>Bei f/1.4 ist die Schärfezone millimeterdünn – kleines Vorbeugen und die Nase ist scharf statt der Augen.</li>
      </ul>` }
  ],
  quiz: [
    { q: "Dein Motiv läuft auf dich zu. Welcher Fokusmodus?",
      o: ["AF-S", "AF-C", "MF"], c: 1, why: "AF-C zieht die Schärfe kontinuierlich nach." },
    { q: "Was ist bei Porträts die wichtigste scharfe Stelle?",
      o: ["Die Nase", "Das nächstgelegene Auge", "Die Haare"], c: 1,
      why: "Unser Blick sucht immer zuerst die Augen." },
    { q: "Wofür ist Fokus-Peaking gut?",
      o: ["Es zeigt farbig, welche Kanten scharf sind", "Es macht das Bild schärfer", "Es misst die Belichtung"],
      c: 0, why: "Eine Hilfe fürs manuelle Fokussieren." }
  ]
});

/* ---------------------------------------------------------- 8 */
L.push({
  id: "farbe", emoji: "🎞️", tint: "sun", minutes: 6, badge: "farbe",
  title: "Farbe & Filmsimulationen",
  sub: "Der Fuji-Zauber: Bilder, die direkt aus der Kamera schön sind.",
  blocks: [
    { type: "text", html: `
      <p>Licht hat eine Farbe: Kerzenlicht ist orange, Schatten sind blau, Neonlicht grünlich.
      Der <b>Weißabgleich</b> sagt der Kamera, was in dieser Szene „weiß“ sein soll – und richtet alle
      anderen Farben danach aus.</p>
      <p>AWB (automatisch) trifft es fast immer. Spannend wird es, wenn du bewusst danebenliegst:
      Ein zu „warm“ eingestellter Sonnenuntergang wird noch goldener.</p>` },
    { type: "table", head: ["Weißabgleich", "Wirkung"], rows: [
      ["AWB", "Kamera entscheidet – meistens richtig"],
      ["☀️ Tageslicht (5500 K)", "Neutral, gut für konstante Farben in Serien"],
      ["☁️ Bewölkt (6500 K)", "Wärmer – lässt graue Tage freundlich aussehen"],
      ["💡 Kunstlicht (3200 K)", "Kühlt orange Zimmerbeleuchtung raus"],
      ["🌅 Schatten (7500 K)", "Sehr warm – schöner Sonnenuntergangs-Trick"]
    ]},
    { type: "text", html: `
      <h3>Filmsimulationen – dein größter Vorteil</h3>
      <p>Fujifilm hat Jahrzehnte Filme gebaut und diese Looks in die Kamera gepackt. Sie wirken auf das
      JPEG direkt in der Kamera – du brauchst also gar keine Bearbeitung am Rechner.</p>` },
    { type: "cards", items: [
      { k: "🟢", b: "PROVIA / Standard", p: "Der Allrounder. Natürlich, leicht kräftig." },
      { k: "🔴", b: "Velvia", p: "Knallige Farben, viel Kontrast. Landschaft, Herbstlaub, Sonnenuntergänge." },
      { k: "🌸", b: "ASTIA", p: "Weiche Kontraste, freundliche Hauttöne. Porträts." },
      { k: "🎬", b: "Classic Chrome", p: "Zurückhaltend, dokumentarisch, leicht entsättigt. Street & Alltag." },
      { k: "📽️", b: "Classic Neg", p: "Der Analog-Look mit kräftigen, eigenwilligen Farben. Sehr beliebt." },
      { k: "🎥", b: "ETERNA", p: "Flach und filmisch, gedämpfte Farben. Video und ruhige Stimmungen." },
      { k: "⚫", b: "ACROS", p: "Das beste Schwarzweiß der Kamera – wunderbares Korn." }
    ]},
    { type: "callout", kind: "fuji", title: "Tipp für Experimente", html:
      `<p>Stelle die Bildqualität auf <b>FINE + RAW</b>. Dann hast du das fertige, schöne JPEG mit deiner
      Filmsimulation <i>und</i> die RAW-Datei als Sicherheitsnetz. Aus dem RAW kannst du in der Kamera
      selbst („RAW-Konvertierung“ im Wiedergabemenü) beliebig viele Varianten mit anderen Simulationen
      entwickeln – ganz ohne Computer.</p>` },
    { type: "callout", kind: "zen", title: "Bracketing zum Spielen", html:
      `<p>Im Antriebsmodus gibt es <b>Filmsimulations-Bracketing</b>: Ein Auslösen, drei JPEGs mit drei
      verschiedenen Looks. Perfekt, um deinen Lieblingsfilm zu finden.</p>` }
  ],
  quiz: [
    { q: "Du willst einen Sonnenuntergang noch goldener. Welcher Weißabgleich?",
      o: ["Kunstlicht (3200 K)", "Schatten (7500 K)", "AWB"], c: 1,
      why: "Ein hoher Kelvin-Wert macht das Bild wärmer – der Klassiker für Sonnenuntergänge." },
    { q: "Welche Filmsimulation passt am besten zu weichen Porträts?",
      o: ["Velvia", "ASTIA", "ACROS"], c: 1, why: "ASTIA ist auf angenehme Hauttöne und weiche Kontraste ausgelegt." },
    { q: "Warum lohnt sich FINE + RAW?",
      o: ["Der Autofokus wird schneller", "Du hast den schönen Look und ein Sicherheitsnetz", "Die Bilder werden kleiner"],
      c: 1, why: "Das JPEG ist sofort schön, das RAW rettet dich bei schwieriger Belichtung." }
  ]
});

/* ---------------------------------------------------------- 9 */
L.push({
  id: "gestaltung", emoji: "🖼️", tint: "sage", minutes: 6, badge: "auge",
  title: "Bildgestaltung",
  sub: "Technik ist die halbe Miete. Der Rest ist: wohin schaut das Auge?",
  blocks: [
    { type: "text", html: `
      <p>Du kannst alles technisch perfekt einstellen und trotzdem ein langweiliges Bild machen.
      Gestaltung ist die Frage: <b>Was lasse ich weg?</b></p>` },
    { type: "cards", items: [
      { k: "⊞", b: "Drittelregel", p: "Teile das Bild gedanklich in 3×3. Setz dein Motiv auf eine Linie oder einen Schnittpunkt statt mittig." },
      { k: "↗️", b: "Führende Linien", p: "Wege, Zäune, Geländer ziehen den Blick ins Bild – such sie bewusst." },
      { k: "🖼️", b: "Rahmen im Rahmen", p: "Ein Türbogen, Äste, ein Fenster. Gibt Tiefe und Fokus." },
      { k: "🧹", b: "Aufräumen", p: "Ein Schritt zur Seite und der Laternenmast wächst nicht mehr aus dem Kopf." },
      { k: "🫧", b: "Negativer Raum", p: "Viel Leere um ein kleines Motiv wirkt ruhig und edel." },
      { k: "🦵", b: "Perspektive", p: "Geh in die Hocke oder steig auf eine Bank. Augenhöhe ist selten die spannendste Höhe." }
    ]},
    { type: "callout", kind: "tip", title: "Licht schlägt alles", html:
      `<p>Die <b>goldene Stunde</b> (erste Stunde nach Sonnenaufgang, letzte vor Sonnenuntergang) macht fast
      jedes Motiv schön: weiches, warmes, seitliches Licht. Mittagssonne ist hart und macht schwarze
      Augenhöhlen – dann lieber in den Schatten gehen. Und: <b>Gegenlicht</b> mit Blende f/2 gibt diesen
      leuchtenden Rand um Haare.</p>` },
    { type: "callout", kind: "fuji", title: "Hilfslinien einschalten", html:
      `<p>Menü → Einrichtung → Bildschirmeinstellungen → <b>Rahmenhilfe</b>: Dort kannst du das 3×3-Gitter
      einblenden. Es ist der beste Trainingspartner für dein Auge – nach ein paar Wochen brauchst du es nicht mehr.</p>` }
  ],
  quiz: [
    { q: "Was besagt die Drittelregel?",
      o: ["Motive gehören in die Bildmitte", "Motive wirken auf den Drittel-Linien spannender", "Man soll ein Drittel des Bildes leer lassen"],
      c: 1, why: "Der Schnittpunkt der Drittel-Linien ist ein sehr angenehmer Platz fürs Hauptmotiv." },
    { q: "Wann ist das Licht draußen am schmeichelhaftesten?",
      o: ["Mittags bei voller Sonne", "Zur goldenen Stunde", "Bei Neonbeleuchtung"], c: 1,
      why: "Tief stehendes, warmes Licht ist weich und modelliert schön." },
    { q: "Was hilft am meisten gegen unruhige Bilder?",
      o: ["Höherer ISO-Wert", "Weglassen und aufräumen", "Mehr Zoom"], c: 1,
      why: "Ein Schritt zur Seite ersetzt oft eine Stunde Bearbeitung." }
  ]
});

/* ---------------------------------------------------------- 10 */
L.push({
  id: "rezepte", emoji: "🍰", tint: "plum", minutes: 4,
  title: "Spickzettel",
  sub: "Startwerte für typische Situationen – zum Nachmachen.",
  blocks: [
    { type: "text", html: `<p>Kein Gesetz, nur ein Startpunkt. Stell das ein, schau aufs Bild, korrigiere.
      Am besten speicherst du dir diese Seite als Lesezeichen aufs Handy.</p>` },
    { type: "table", head: ["Situation", "Modus", "Blende", "Zeit", "ISO"], rows: [
      ["Porträt draußen", "A", "f/2 – f/2.8", "Kamera", "160–400"],
      ["Gruppenfoto", "A", "f/5.6 – f/8", "Kamera", "160–400"],
      ["Landschaft", "A", "f/8 – f/11", "Kamera", "160"],
      ["Street / Alltag", "A", "f/5.6", "Kamera", "Auto bis 3200"],
      ["Kinder & Tiere", "S", "Kamera", "1/500", "Auto bis 3200"],
      ["Sport", "S", "Kamera", "1/1000", "Auto bis 6400"],
      ["Essen / Details", "A", "f/2.8 – f/4", "Kamera", "160–800"],
      ["Innenraum abends", "A", "f/2", "min. 1/60", "1600–6400"],
      ["Seidiges Wasser", "M", "f/16", "1/4 – 2 s", "160 (Stativ)"],
      ["Nacht / Stadt", "M", "f/8", "5 – 20 s", "160 (Stativ)"],
      ["Feuerwerk", "M", "f/11", "2 – 4 s", "160 (Stativ)"]
    ]},
    { type: "callout", kind: "zen", title: "Das Wichtigste zum Schluss", html:
      `<p>Technik ist nur da, damit sie dir nicht im Weg steht. Die besten Fotos entstehen nicht,
      weil jemand f/2.8 eingestellt hat, sondern weil jemand <b>hingeschaut</b> hat.
      Deine Einstellungen sollen so selbstverständlich werden wie Schalten beim Autofahren.
      Und dahin kommst du nur, indem du <b>viel fotografierst</b>. 📷</p>` },
    { type: "sim", sim: {
      id: "sim-final", scene: "garden", focus: "all", aperture: 5.6, shutter: 1/125, iso: 400, scenePicker: true,
      tasks: [
        { text: "Meisterprüfung: Porträt-Look – f/2 oder offener, korrekt belichtet, ISO 400 oder weniger.",
          hint: "Offene Blende, kurze Zeit, niedriger ISO.",
          check: v => v.N <= 2 && v.iso <= 400 && Math.abs(v.stops) <= 0.4 },
        { text: "Meisterprüfung: Nacht-Szene mit Stativ, ISO 160, korrekt belichtet.",
          hint: "Szene 🌃 wählen, Stativ an, Zeit lang machen.",
          check: v => v.scene === "night" && v.tripod && v.iso === 160 && Math.abs(v.stops) <= 0.5 }
      ]}}
  ],
  quiz: [
    { q: "Startwerte für ein Porträt bei Tageslicht?",
      o: ["f/2, Modus A", "f/16, Modus M", "f/8, 2 Sekunden"], c: 0,
      why: "Offene Blende trennt das Gesicht vom Hintergrund." },
    { q: "Was brauchst du für Feuerwerk oder Nachtaufnahmen zwingend?",
      o: ["ISO 12800", "Ein Stativ", "Blitz"], c: 1,
      why: "Mehrere Sekunden Belichtung gehen nur mit fester Auflage." }
  ]
});

/* ---------------------------------------------------------- Missionen */
const MISSIONS = [
  { id: "m1",  icon: "🔓", t: "Schieb den AUTO-Hebel weg von AUTO", p: "Und lass ihn dort. Das ist der Anfang von allem." },
  { id: "m2",  icon: "🌸", t: "Ein Foto mit komplett unscharfem Hintergrund", p: "Offenblende, nah rangehen, Hintergrund weit weg." },
  { id: "m3",  icon: "🏔️", t: "Ein Foto, auf dem von vorn bis hinten alles scharf ist", p: "f/8 bis f/11, Fokus etwa ins erste Drittel." },
  { id: "m4",  icon: "💦", t: "Etwas Bewegtes einfrieren", p: "1/1000 s: springender Hund, Wasserhahn, ein Sprung." },
  { id: "m5",  icon: "🌊", t: "Etwas absichtlich verwischen", p: "1/4 s oder länger, Kamera irgendwo auflegen." },
  { id: "m6",  icon: "🌃", t: "Ein Foto nach Sonnenuntergang ohne Blitz", p: "ISO hoch, Blende auf, ruhig atmen." },
  { id: "m7",  icon: "🎞️", t: "Dasselbe Motiv in drei Filmsimulationen", p: "Provia, Classic Chrome, Acros – welche magst du?" },
  { id: "m8",  icon: "⊞",  t: "Ein Foto nach der Drittelregel", p: "Gitter einblenden, Motiv auf einen Schnittpunkt." },
  { id: "m9",  icon: "🦵", t: "Ein Foto aus ungewöhnlicher Perspektive", p: "Vom Boden aus oder von oben herab." },
  { id: "m10", icon: "🌇", t: "Ein Foto in der goldenen Stunde", p: "Eine Stunde vor Sonnenuntergang. Wecker stellen!" },
  { id: "m11", icon: "🎛️", t: "Einen ganzen Spaziergang nur in Modus M", p: "Anstrengend, aber danach sitzt es." },
  { id: "m12", icon: "💝", t: "Verschenke einen Abzug", p: "Ein gedrucktes Bild an jemanden, den du magst." }
];

window.LESSONS = L;
window.MISSIONS = MISSIONS;
})();
