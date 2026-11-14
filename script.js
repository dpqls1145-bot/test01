(function () {
  var PROFILE = window.PROFILE || {};
  var WORKS = window.WORKS || [];
  var $ = function (id) { return document.getElementById(id); };

  // ----- 프로필 -----
  document.title = (PROFILE.name ? PROFILE.name + " · " : "") + (PROFILE.title || "포트폴리오");
  $("brand").textContent = PROFILE.name || "";
  $("title").textContent = PROFILE.title || "";
  $("intro").textContent = PROFILE.intro || "";
  (PROFILE.links || []).forEach(function (l) {
    var a = document.createElement("a");
    a.href = l.url; a.textContent = l.label;
    if (/^https?:/.test(l.url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    $("links").appendChild(a);
  });

  // ----- 테마 -----
  var root = document.documentElement;
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
  $("themeToggle").addEventListener("click", function () {
    var cur = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ----- 갤러리 -----
  var current = "전체";
  var visible = [];
  var ratios = [4 / 5, 1, 3 / 4, 5 / 4, 4 / 3, 9 / 16];

  function placeholderStyle(w, i) {
    var h = w.hue != null ? w.hue : (i * 57) % 360;
    return "background: linear-gradient(135deg, hsl(" + h + " 70% 52%), hsl(" + ((h + 50) % 360) + " 70% 38%));";
  }

  function mediaEl(w, i, big) {
    if (w.src && w.type === "video") {
      var v = document.createElement("video");
      v.src = w.src; v.preload = "metadata"; v.muted = !big; v.playsInline = true;
      if (w.poster) v.poster = w.poster;
      if (big) v.controls = true;
      return v;
    }
    if (w.src) {
      var img = document.createElement("img");
      img.src = w.src; img.alt = w.title; img.loading = "lazy";
      return img;
    }
    var d = document.createElement("div");
    d.className = "placeholder";
    d.setAttribute("style", placeholderStyle(w, i) + (big ? "" : "aspect-ratio:" + ratios[i % ratios.length] + ";"));
    // 카드에는 SAMPLE 배지가 따로 있으므로 글자는 상세 화면(big)에서만 표시
    d.textContent = big ? (w.sample ? "SAMPLE" : w.title) : (w.sample ? "" : w.title);
    return d;
  }

  function renderFilters() {
    var cats = ["전체"];
    WORKS.forEach(function (w) { if (cats.indexOf(w.category) < 0) cats.push(w.category); });
    var box = $("filters"); box.innerHTML = "";
    cats.forEach(function (c) {
      var b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", c === current ? "true" : "false");
      b.textContent = c;
      b.addEventListener("click", function () { current = c; renderFilters(); renderGrid(); });
      box.appendChild(b);
    });
  }

  function renderGrid() {
    var grid = $("grid"); grid.innerHTML = "";
    visible = WORKS.filter(function (w) { return current === "전체" || w.category === current; });
    $("empty").hidden = visible.length > 0;
    visible.forEach(function (w, i) {
      var card = document.createElement("button");
      card.className = "card"; card.type = "button";
      card.setAttribute("aria-label", w.title + " 자세히 보기");
      var thumb = document.createElement("div"); thumb.className = "thumb";
      thumb.appendChild(mediaEl(w, i, false));
      if (w.sample) { var s = document.createElement("span"); s.className = "badge"; s.textContent = "SAMPLE"; thumb.appendChild(s); }
      if (w.type === "video") { var p = document.createElement("span"); p.className = "play"; p.textContent = "▶"; thumb.appendChild(p); }
      var info = document.createElement("div"); info.className = "card-info";
      var h = document.createElement("h3"); h.textContent = w.title;
      var sp = document.createElement("span"); sp.textContent = w.category + (w.year ? " · " + w.year : "");
      info.appendChild(h); info.appendChild(sp);
      card.appendChild(thumb); card.appendChild(info);
      card.addEventListener("click", function () { openLightbox(i); });
      grid.appendChild(card);
    });
  }

  // ----- 라이트박스 -----
  var idx = 0, lastFocus = null;
  function openLightbox(i) {
    lastFocus = document.activeElement;
    idx = i; showLightbox();
    $("lightbox").hidden = false;
    document.body.style.overflow = "hidden";
    $("lbClose").focus();
  }
  function closeLightbox() {
    $("lightbox").hidden = true;
    $("lbMedia").innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function showLightbox() {
    var w = visible[idx];
    var m = $("lbMedia"); m.innerHTML = "";
    m.appendChild(mediaEl(w, idx, true));
    $("lbTitle").textContent = w.title;
    $("lbDesc").textContent = w.description || "";
    var meta = $("lbMeta"); meta.innerHTML = "";
    [["분류", w.category], ["도구", w.tool], ["연도", w.year], ["프롬프트", w.prompt]].forEach(function (r) {
      if (!r[1]) return;
      var dt = document.createElement("dt"); dt.textContent = r[0];
      var dd = document.createElement("dd"); dd.textContent = r[1];
      meta.appendChild(dt); meta.appendChild(dd);
    });
  }
  function step(d) { idx = (idx + d + visible.length) % visible.length; showLightbox(); }

  $("lbClose").addEventListener("click", closeLightbox);
  $("lbPrev").addEventListener("click", function () { step(-1); });
  $("lbNext").addEventListener("click", function () { step(1); });
  $("lightbox").addEventListener("click", function (e) { if (e.target === this) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if ($("lightbox").hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  renderFilters();
  renderGrid();
})();
