# 📷 Lichtfängerin – spielerisch fotografieren lernen

Eine kleine Web-App, die die Kunst des Fotografierens **ohne AUTO-Modus** beibringt –
mit Fokus auf Blende, Belichtungszeit und ISO. Gebaut für eine **Fujifilm X-T30 II**.

Kein Build, kein Server, keine Anmeldung: reines HTML/CSS/JavaScript.
Der Fortschritt liegt ausschließlich im Browser (`localStorage`).

## Was drin ist

- **10 Lektionen** – Licht-Dreieck, Blende, Zeit, ISO, Belichtung ausbalancieren,
  P/A/S/M an der X-T30 II, Fokus, Farbe & Filmsimulationen, Bildgestaltung, Spickzettel
- **Belichtungs-Simulator** – vier Szenen (Garten, Bewegung, Nacht, Wasserfall).
  Die Regler rechnen mit echten Belichtungswerten (EV) und zeigen live:
  Schärfentiefe & Bokeh, Bewegungsunschärfe, Verwacklung, Bildrauschen, Über-/Unterbelichtung
- **Aufgaben im Simulator**, Quiz pro Lektion, **Foto-Missionen** für draußen
- **Gamification** – XP, sieben Level, zwölf Abzeichen, Tages-Streak,
  Konfetti und GIF-Belohnungen

## Lokal ansehen

Einfach `index.html` im Browser öffnen. Oder mit kleinem Server:

```bash
npx http-server -p 8080
# http://localhost:8080
```

## Kostenlos veröffentlichen (GitHub Pages)

Der Workflow `.github/workflows/pages.yml` veröffentlicht bei jedem Push auf den
Standard-Branch und richtet GitHub Pages beim ersten Lauf selbst ein.

**Voraussetzung:** GitHub Pages ist für private Repositories nur in bezahlten
Plänen verfügbar. Für die kostenlose `github.io`-Adresse muss das Repository
**öffentlich** sein (Settings → General → Danger Zone → Change visibility).

Danach liegt die App unter `https://<benutzername>.github.io/fotografieren-lernen/`.

Veröffentlicht wird nur die App selbst (`index.html`, `css/`, `js/`, `assets/`) –
der Ordner `docs/` mit dem Kamera-Handbuch bleibt außen vor.

Genauso gut funktionieren Netlify, Vercel oder Cloudflare Pages – überall gilt:
statische Seite, kein Build-Befehl, Ausgabeverzeichnis ist das Repo-Wurzelverzeichnis.

Auf dem Handy lässt sich die Seite über „Zum Home-Bildschirm hinzufügen“ wie eine
App ablegen (`manifest.webmanifest` ist dabei).

## Eigene GIFs einsetzen

Die Belohnungs-GIFs stehen in [`js/gifs.js`](js/gifs.js). Dort einfach eigene
Links eintragen (auf giphy.com ein GIF suchen → Rechtsklick → „Bildadresse kopieren“).
Lädt ein GIF nicht, zeigt die App automatisch einen animierten Emoji-Sticker –
die Belohnung fällt also nie aus.

## Aufbau

```
index.html                Grundgerüst
css/style.css             gesamtes Design
js/state.js               Fortschritt, XP, Level, Abzeichen (localStorage)
js/sim.js                 Belichtungs-Simulator (EV-Rechnung + visuelle Effekte)
js/lessons.js             alle Lerninhalte, Quizfragen und Missionen
js/reward.js              Konfetti, GIF-Overlay, Toasts
js/gifs.js                austauschbare GIF-Listen und Lobsprüche
js/app.js                 Router und Ansichten
```

### Inhalte ändern

Alle Texte stehen in `js/lessons.js`. Eine Lektion ist ein Objekt mit Bausteinen
(`text`, `cards`, `table`, `callout`, `sim`), einem Quiz und optional einem Abzeichen –
neue Lektionen einfach ans Array anhängen.
