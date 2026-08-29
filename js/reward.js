/* ============================================================
   Belohnungen: Konfetti, Sticker-/GIF-Overlay, Toasts
   ============================================================ */
(function () {
  const COLORS = ["#E2674B", "#DF9A2E", "#6E8F72", "#5B87B5", "#8A6A9E", "#F2C4B4"];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Zieht der Reihe nach aus einem gemischten Beutel, statt blind zu würfeln.
     So kommt nichts zweimal hintereinander und alles kommt mal dran. */
  const bags = {};
  function draw(key, list) {
    if (!list || !list.length) return null;
    let bag = bags[key];
    if (!bag || !bag.items.length || bag.size !== list.length) {
      const items = list.slice();
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      if (bag && bag.last === items[items.length - 1] && items.length > 1) {
        [items[items.length - 1], items[0]] = [items[0], items[items.length - 1]];
      }
      bag = bags[key] = { items, size: list.length, last: bag && bag.last };
    }
    const v = bag.items.pop();
    bag.last = v;
    return v;
  }

  function confetti(amount) {
    if (reduce) return;
    const layer = document.getElementById("confetti");
    const n = amount || 70;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      const dur = 1.9 + Math.random() * 1.6;
      p.style.left = Math.random() * 100 + "vw";
      p.style.top = -20 - Math.random() * 120 + "px";
      p.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.style.setProperty("--dx", (Math.random() * 220 - 110) + "px");
      p.style.setProperty("--rot", (Math.random() * 1080 - 540) + "deg");
      p.style.animation = `fall ${dur}s cubic-bezier(.25,.6,.5,1) ${Math.random() * .35}s forwards`;
      if (Math.random() > .6) p.style.borderRadius = "50%";
      layer.appendChild(p);
      setTimeout(() => p.remove(), (dur + .5) * 1000);
    }
  }

  /** kurze Meldung; icon ist ein Name aus der Icon-Bibliothek */
  function toast(msg, icon) {
    const wrap = document.getElementById("toasts");
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `${Icon.ui(icon || "funke")}<span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 2600);
  }

  /* Läuft schon eine Feier, wird die nächste angehängt statt überschrieben. */
  const queue = [];
  function celebrate(kind, title, text) {
    if (!document.getElementById("reward").hidden) {
      if (queue.length < 3) queue.push([kind, title, text]);
      return;
    }
    show(kind, title, text);
  }

  function show(kind, title, text) {
    const k = kind || "klein";
    const lob = draw("lob-" + k, window.LOB[k] || window.LOB.klein);
    const box = document.getElementById("reward");
    const media = document.getElementById("rewardMedia");
    document.getElementById("rewardTitle").textContent = title || lob[0];
    document.getElementById("rewardText").textContent = text || lob[1];

    media.innerHTML = "";
    const fallback = () => {
      media.innerHTML = Icon.sticker(draw("st-" + k, window.STICKER[k] || window.STICKER.klein));
    };

    // Eigene GIFs zuerst – sie sind ja bewusst ausgewählt worden
    const own = (window.State && State.gifs()) || [];
    const list = own.concat((window.GIFS && window.GIFS[k]) || []);
    const url = draw("gif-" + k + "-" + list.length, list);

    if (url) {
      const img = new Image();
      img.alt = "";
      img.onerror = fallback;
      img.src = url;
      media.appendChild(img);
      // Hängt das GIF, nach 2,5 s auf den Sticker wechseln
      setTimeout(() => { if (!img.isConnected) return; if (!img.complete || !img.naturalWidth) fallback(); }, 2500);
    } else fallback();

    box.hidden = false;
    confetti(k === "klein" ? 55 : 130);
    document.getElementById("rewardClose").focus({ preventScroll: true });
  }

  function closeReward() {
    document.getElementById("reward").hidden = true;
    if (queue.length) setTimeout(() => { const n = queue.shift(); show(n[0], n[1], n[2]); }, 380);
  }

  document.addEventListener("click", e => {
    if (e.target.id === "rewardClose" || e.target.id === "reward") closeReward();
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeReward(); });

  window.Reward = { confetti, toast, celebrate, close: closeReward, draw };
})();
