// nav.js — MyAcademy 네비게이션 중앙 관리
// 페이지 추가 시 pages 배열에 항목 추가만 하면 됨. 기존 HTML 수정 불필요.

var NAV_DATA = {
  xp: { level: 4, percent: 50 },

  // flat 배열 = 페이지 순서. pages[i-1]=prev, pages[i+1]=next (선형, 순환 아님)
  pages: [
    { id: "index", file: "index.html", title: "\uD648", icon: "\uD83C\uDFE0", group: null },

    // ── Phase 1 ──
    {
      id: "p1_01",
      file: "p1_01_\uBCA1\uD130\uC758_\uC774\uC911_\uC815\uCCB4\uC131.html",
      title: "\uBCA1\uD130\uC758 \uC774\uC911 \uC815\uCCB4\uC131",
      badge: "lesson",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      card: {
        num: "01",
        cardTitle: "\uBCA1\uD130\uC640 \uB0B4\uC801\xB7\uC678\uC801\uC758 \uAE30\uD558\uD559",
        desc: "\uC810 vs \uBC29\uD5A5, \uB0B4\uC801 = \uD22C\uC601, \uC678\uC801 = \uBC95\uC120, \uAE30\uC800 = \uC88C\uD45C\uC758 \uC790(ruler), \uB3D9\uCC28 \uC88C\uD45C.",
        tags: ["\uBCA1\uD130", "\uB0B4\uC801", "\uC678\uC801", "\uAE30\uC800", "\uB3D9\uCC28\uC88C\uD45C"],
      },
      subLabel: "\uD83D\uDCD0 \uBCA1\uD130\uC758 \uC774\uC911 \uC815\uCCB4\uC131",
    },
    {
      id: "p1_02",
      file: "p1_02_\uB0B4\uC801\uC758_\uAE30\uD558\uD559.html",
      title: "\uB0B4\uC801\uC758 \uAE30\uD558\uD559",
      badge: "lesson",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      subLabel: "\uD83D\uDCD0 \uB0B4\uC801\uC758 \uAE30\uD558\uD559",
    },
    {
      id: "p1_03",
      file: "p1_03_\uC678\uC801\uC758_\uAE30\uD558\uD559.html",
      title: "\uC678\uC801\uC758 \uAE30\uD558\uD559",
      badge: "lesson",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      subLabel: "\uD83D\uDCD0 \uC678\uC801\uC758 \uAE30\uD558\uD559",
    },
    {
      id: "p1_04",
      file: "p1_04_\uAE30\uC800\uC640_\uC88C\uD45C\uACC4.html",
      title: "\uAE30\uC800\uC640 \uC88C\uD45C\uACC4",
      badge: "lesson",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      subLabel: "\uD83D\uDCD0 \uAE30\uC800\uC640 \uC88C\uD45C\uACC4",
    },
    {
      id: "p1_05",
      file: "p1_05_\uB3D9\uCC28\uC88C\uD45C.html",
      title: "\uB3D9\uCC28 \uC88C\uD45C \uC644\uC804 \uC774\uD574",
      badge: "supplement",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      subLabel: "\uD83D\uDCD6 \uB3D9\uCC28\uC88C\uD45C",
    },
    {
      id: "p1_06",
      file: "p1_06_\uCCB4\uD06C\uD3EC\uC778\uD2B8.html",
      title: "\uCCB4\uD06C\uD3EC\uC778\uD2B8",
      badge: "checkpoint",
      group: "Phase 1 \u2014 \uBCA1\uD130\xB7\uB0B4\uC801\xB7\uC678\uC801",
      subLabel: "\u2705 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
    },

    // ── Phase 2 ──
    {
      id: "p2_01",
      file: "p2_01_\uD589\uB82C\uC740_\uC120\uD615\uBCC0\uD658.html",
      title: "\uD589\uB82C = \uC120\uD615 \uBCC0\uD658",
      badge: "lesson",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      card: {
        num: "02",
        cardTitle: "\uD589\uB82C = \uC120\uD615 \uBCC0\uD658",
        desc: "\uD589\uB82C\uC758 \uC5F4 = \uBCC0\uD658\uB41C \uAE30\uC800. \uACA9\uC790 \uBCC0\uD658 \uC2DC\uAC01\uD654, \uC2A4\uCF00\uC77C\xB7\uD68C\uC804\xB7\uBC18\uC0AC\xB7\uC804\uB2E8, det = \uB113\uC774 \uBCC0\uD654\uC728.",
        tags: ["\uC120\uD615\uBCC0\uD658", "\uD589\uB82C\uACF1", "\uC5ED\uD589\uB82C", "\uD589\uB82C\uC2DD"],
      },
      subLabel: "\uD83D\uDCD0 \uD589\uB82C = \uC120\uD615 \uBCC0\uD658",
    },
    {
      id: "p2_02",
      file: "p2_02_\uADF9\uC88C\uD45C_\uC0BC\uAC01\uD568\uC218_\uBCF5\uC18C\uD68C\uC804.html",
      title: "\uADF9\uC88C\uD45C\xB7\uC0BC\uAC01\uD568\uC218\xB7\uBCF5\uC18C\uD68C\uC804",
      badge: "supplement",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      subLabel: "\uD83D\uDCD6 \uADF9\uC88C\uD45C\xB7\uC0BC\uAC01\uD568\uC218\xB7\uBCF5\uC18C\uD68C\uC804",
    },
    {
      id: "p2_03",
      file: "p2_03_\uAE30\uBCF8\uBCC0\uD658_\uAC24\uB7EC\uB9AC.html",
      title: "\uAE30\uBCF8 \uBCC0\uD658 \uAC24\uB7EC\uB9AC",
      badge: "lesson",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      subLabel: "\uD83D\uDCD0 \uAE30\uBCF8 \uBCC0\uD658 \uAC24\uB7EC\uB9AC",
    },
    {
      id: "p2_04",
      file: "p2_04_\uD569\uC131\uC740_\uACF1\uC148.html",
      title: "\uD569\uC131 = \uACF1\uC148",
      badge: "lesson",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      subLabel: "\uD83D\uDCD0 \uD569\uC131 = \uACF1\uC148",
    },
    {
      id: "p2_05",
      file: "p2_05_\uC5ED\uD589\uB82C\uACFC_\uD589\uB82C\uC2DD.html",
      title: "\uC5ED\uD589\uB82C & \uD589\uB82C\uC2DD",
      badge: "lesson",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      subLabel: "\uD83D\uDCD0 \uC5ED\uD589\uB82C & \uD589\uB82C\uC2DD",
    },
    {
      id: "p2_06",
      file: "p2_06_\uCCB4\uD06C\uD3EC\uC778\uD2B8.html",
      title: "\uCCB4\uD06C\uD3EC\uC778\uD2B8",
      badge: "checkpoint",
      group: "Phase 2 \u2014 \uD589\uB82C = \uBCC0\uD658",
      subLabel: "\u2705 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
    },

    // ── Phase 3 ──
    {
      id: "p3_01",
      file: "p3_01_\uC544\uD540\uBCC0\uD658\uACFC_4x4\uD589\uB82C.html",
      title: "\uC544\uD540 \uBCC0\uD658 & 4\u00D74",
      badge: "lesson",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      card: {
        num: "03",
        cardTitle: "\uB3D9\uCC28 \uC88C\uD45C\uC640 \uADF8\uB798\uD53D\uC2A4 \uD30C\uC774\uD504\uB77C\uC778",
        desc: "\uC774\uB3D9\uC744 \uD589\uB82C\uB85C, 4\u00D74 \uC544\uD540 \uBCC0\uD658, MVP \uCCB4\uC778, \uC6D0\uADFC \uD22C\uC601, \uBC95\uC120 \uBCC0\uD658.",
        tags: ["\uC544\uD540\uBCC0\uD658", "MVP", "\uC6D0\uADFC\uD22C\uC601", "\uBC95\uC120\uBCC0\uD658"],
      },
      subLabel: "\uD83D\uDCD0 \uC544\uD540 \uBCC0\uD658 & 4\u00D74",
    },
    {
      id: "p3_02",
      file: "p3_02_Model\uBCC0\uD658.html",
      title: "Model \uBCC0\uD658",
      badge: "lesson",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      subLabel: "\uD83D\uDCD0 Model \uBCC0\uD658",
    },
    {
      id: "p3_03",
      file: "p3_03_View\uBCC0\uD658\uACFC_LookAt.html",
      title: "View \uBCC0\uD658 & LookAt",
      badge: "lesson",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      subLabel: "\uD83D\uDCD0 View \uBCC0\uD658 & LookAt",
    },
    {
      id: "p3_04",
      file: "p3_04_\uC6D0\uADFC\uD22C\uC601.html",
      title: "\uC6D0\uADFC \uD22C\uC601",
      badge: "lesson",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      subLabel: "\uD83D\uDCD0 \uC6D0\uADFC \uD22C\uC601",
    },
    {
      id: "p3_05",
      file: "p3_05_\uBC95\uC120\uBCA1\uD130\uC758_\uBCC0\uD658.html",
      title: "\uBC95\uC120 \uBCA1\uD130 \uBCC0\uD658",
      badge: "lesson",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      subLabel: "\uD83D\uDCD0 \uBC95\uC120 \uBCA1\uD130 \uBCC0\uD658",
    },
    {
      id: "p3_06",
      file: "p3_06_\uCCB4\uD06C\uD3EC\uC778\uD2B8.html",
      title: "\uCCB4\uD06C\uD3EC\uC778\uD2B8",
      badge: "checkpoint",
      group: "Phase 3 \u2014 \uB3D9\uCC28\uC88C\uD45C\xB7\uD30C\uC774\uD504\uB77C\uC778",
      subLabel: "\u2705 \uCCB4\uD06C\uD3EC\uC778\uD2B8",
    },
  ],
};

// ──────────────────────────────────────────
// IIFE — DOM 준비 후 즉시 실행
// ──────────────────────────────────────────
(function () {
  var pageId = typeof PAGE_ID !== "undefined" ? PAGE_ID : "index";
  var idx = NAV_DATA.pages.findIndex(function (p) { return p.id === pageId; });

  renderSidebar(idx);

  if (pageId !== "index") {
    renderPageNav(idx);
  }

  if (pageId === "index") {
    renderLessonGrid();
  }

  initSidebarToggle();
  initThemeToggle();

  // ── Sidebar ──
  function renderSidebar(currentIdx) {
    var sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    var html = "";
    var pages = NAV_DATA.pages;

    // Navigation 섹션
    var indexPage = pages[0];
    var indexActive = currentIdx === 0 ? ' class="active"' : "";
    html +=
      '<div class="sidebar-section">' +
      '<div class="sidebar-label">Navigation</div>' +
      '<ul class="sidebar-nav">' +
      '<li><a href="' + indexPage.file + '"' + indexActive + '>' +
      indexPage.icon + ' ' + indexPage.title + '</a></li>' +
      '</ul></div>';

    // Group별 섹션
    var groups = [];
    var groupMap = {};
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (!p.group) continue;
      if (!groupMap[p.group]) {
        groupMap[p.group] = [];
        groups.push(p.group);
      }
      groupMap[p.group].push(p);
    }

    for (var g = 0; g < groups.length; g++) {
      var groupName = groups[g];
      var items = groupMap[groupName];
      html +=
        '<div class="sidebar-section">' +
        '<div class="sidebar-label">' + groupName + '</div>' +
        '<ul class="sidebar-nav">';
      for (var j = 0; j < items.length; j++) {
        var item = items[j];
        var isActive = item.id === pageId ? ' class="active"' : "";
        var badgeText = "";
        if (item.badge === "lesson") badgeText = "LESSON";
        else if (item.badge === "checkpoint") badgeText = "CHECK";
        else if (item.badge === "supplement") badgeText = "SUPP";
        var badge = item.badge
          ? ' <span class="nav-badge ' + item.badge + '">' + badgeText + '</span>'
          : "";
        html +=
          '<li><a href="' + item.file + '"' + isActive + '>' +
          item.title + badge + '</a></li>';
      }
      html += '</ul></div>';
    }

    // "On this page" 섹션
    if (typeof ON_THIS_PAGE !== "undefined" && ON_THIS_PAGE.length > 0) {
      html +=
        '<div class="sidebar-section">' +
        '<div class="sidebar-label">On this page</div>' +
        '<ul class="sidebar-nav">';
      for (var k = 0; k < ON_THIS_PAGE.length; k++) {
        var anchor = ON_THIS_PAGE[k];
        html += '<li><a href="#' + anchor.id + '">' + anchor.label + '</a></li>';
      }
      html += '</ul></div>';
    }

    // XP 바
    var xp = NAV_DATA.xp;
    html +=
      '<div class="xp-bar-container">' +
      '<div class="xp-label">LEARNING PROGRESS \u2014 LV.' + xp.level + '</div>' +
      '<div class="xp-bar"><div class="xp-bar-fill" style="width: ' + xp.percent + '%"></div></div>' +
      '</div>';

    sidebar.innerHTML = html;
  }

  // ── Page Nav (prev/next, 선형) ──
  function renderPageNav(currentIdx) {
    var container = document.getElementById("page-nav");
    if (!container) return;

    var pages = NAV_DATA.pages;
    var hasPrev = currentIdx > 0;
    var hasNext = currentIdx < pages.length - 1;

    if (!hasPrev && !hasNext) return;

    var html = "";

    if (hasPrev) {
      var prev = pages[currentIdx - 1];
      html +=
        '<a href="' + prev.file + '">' +
        '<div class="nav-direction">\u2190 PREV</div>' +
        '<div class="nav-title">' + prev.title + '</div>' +
        '</a>';
    }

    if (hasNext) {
      var next = pages[currentIdx + 1];
      html +=
        '<a href="' + next.file + '" class="nav-next"' +
        (!hasPrev ? ' style="margin-left:auto"' : '') + '>' +
        '<div class="nav-direction">NEXT \u2192</div>' +
        '<div class="nav-title">' + next.title + '</div>' +
        '</a>';
    }

    container.innerHTML = html;
  }

  // ── Lesson Grid (index only) ──
  function renderLessonGrid() {
    var container = document.getElementById("lesson-grid");
    if (!container) return;

    var pages = NAV_DATA.pages;
    var groups = [];
    var groupMap = {};
    for (var i = 0; i < pages.length; i++) {
      var p = pages[i];
      if (!p.group) continue;
      if (!groupMap[p.group]) {
        groupMap[p.group] = [];
        groups.push(p.group);
      }
      groupMap[p.group].push(p);
    }

    var html = "";
    var delay = 1;
    for (var g = 0; g < groups.length; g++) {
      var groupName = groups[g];
      var items = groupMap[groupName];
      var cardOwner = null;
      for (var j = 0; j < items.length; j++) {
        if (items[j].card) { cardOwner = items[j]; break; }
      }
      if (!cardOwner) continue;
      var c = cardOwner.card;

      var tags = "";
      for (var t = 0; t < c.tags.length; t++) {
        tags += '<span class="lesson-tag">' + c.tags[t] + '</span>';
      }

      var subLinks = "";
      for (var s = 0; s < items.length; s++) {
        if (items[s].subLabel) {
          subLinks +=
            '<a href="' + items[s].file + '" class="lesson-sub-link">' +
            items[s].subLabel + '</a>';
        }
      }

      html +=
        '<div class="lesson-card fade-in fade-in-d' + delay + '">' +
        '<div class="lesson-num">' + c.num + '</div>' +
        '<div class="lesson-info">' +
        '<div class="lesson-title">' + c.cardTitle + '</div>' +
        '<div class="lesson-desc">' + c.desc + '</div>' +
        '<div class="lesson-tags">' + tags + '</div>' +
        '<div class="lesson-sub-links">' + subLinks + '</div>' +
        '</div></div>';
      delay++;
    }

    container.innerHTML = html;
  }

  // ── Sidebar Toggle (hamburger) ──
  function initSidebarToggle() {
    var hamburger = document.getElementById("hamburger");
    var sidebar = document.getElementById("sidebar");
    var overlay = document.getElementById("sidebarOverlay");
    if (!hamburger || !sidebar || !overlay) return;

    function toggle() {
      hamburger.classList.toggle("active");
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
    }

    hamburger.addEventListener("click", toggle);
    overlay.addEventListener("click", toggle);

    sidebar.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".sidebar-nav a") && window.innerWidth <= 900) {
        toggle();
      }
    });
  }

  // ── Theme Toggle ──
  function initThemeToggle() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;

    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light");
    }

    btn.addEventListener("click", function () {
      document.documentElement.classList.toggle("light");
      localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("light") ? "light" : "dark"
      );
    });
  }
})();
