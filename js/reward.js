/* ============================================================
   Belohnungen: Konfetti, GIF-Overlay, Toasts
   ============================================================ */
(function () {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const COLORS = ["#E2674B", "#DF9A2E", "#6E8F72", "#5B87B5", "#8A6A9E", "#F2C4B4"];
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function confetti(amount) {
    if (reduce) return;
    const layer = document.getElementById("confetti");
    const n = amount || 70;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      const dur = 1.9 + Math.random() * 1.6;
      p.style.left = Math.random() * 100 + "vw";
      p.style.top = -20 - Math.random() * 120 + "px";
      p.style.background = pick(COLORS);
      p.style.setProperty("--dx", (Math.random() * 220 - 110) + "px");
      p.style.setProperty("--rot", (Math.random() * 1080 - 540) + "deg");
      p.style.animation = `fall ${dur}s cubic-bezier(.25,.6,.5,1) ${Math.random() * .35}s forwards`;
      if (Math.random() > .6) p.style.borderRadius = "50%";
      layer.appendChild(p);
      setTimeout(() => p.remove(), (dur + .5) * 1000);
    }
  }

  function toast(msg, icon) {
    const wrap = document.getElementById("toasts");
    const t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = `<span>${icon || "✨"}</span><span>${msg}</span>`;
    wrap.appendChild(t);
    setTimeout(() => { t.classList.add("out"); setTimeout(() => t.remove(), 320); }, 2600);
  }

  /** Großes Overlay mit GIF (oder Sticker als Fallback).
      Läuft schon eine Feier, wird die nächste angehängt statt überschrieben. */
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
    const lob = pick(window.LOB[k] || window.LOB.klein);
    const box = document.getElementById("reward");
    const media = document.getElementById("rewardMedia");
    document.getElementById("rewardTitle").textContent = title || lob[0];
    document.getElementById("rewardText").textContent = text || lob[1];

    media.innerHTML = "";
    const sticker = () => {
      media.innerHTML = `<span class="sticker">${pick(window.STICKER[k] || window.STICKER.klein)}</span>`;
    };
    const list = (window.GIFS && window.GIFS[k]) || [];
    if (list.length) {
      const img = new Image();
      img.alt = "";
      img.onerror = sticker;
      img.src = pick(list);
      media.appendChild(img);
      // Falls das GIF hängt: nach 2,5 s auf den Sticker wechseln
      setTimeout(() => { if (!img.complete || !img.naturalWidth) sticker(); }, 2500);
    } else sticker();

    box.hidden = false;
    confetti(k === "klein" ? 55 : 130);
    const btn = document.getElementById("rewardClose");
    btn.focus({ preventScroll: true });
  }

  function closeReward() {
    document.getElementById("reward").hidden = true;
    if (queue.length) setTimeout(() => { const n = queue.shift(); show(n[0], n[1], n[2]); }, 380);
  }

  document.addEventListener("click", e => {
    if (e.target.id === "rewardClose" || e.target.id === "reward") closeReward();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeReward();
  });

  window.Reward = { confetti, toast, celebrate, close: closeReward };
})();
