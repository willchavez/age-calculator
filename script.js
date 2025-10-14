(function () {
  const form = document.getElementById("age-form");
  const input = document.getElementById("start-date");
  const errorEl = document.getElementById("date-error");
  const results = document.getElementById("results");
  const yearsEl = document.getElementById("years");
  const monthsEl = document.getElementById("months");
  const daysEl = document.getElementById("days");

  // Theme toggle setup
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const THEME_KEY = "agecalc:theme";

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.textContent = "🌙 Dark";
        themeToggle.title = "Toggle dark mode";
      }
    } else {
      root.removeAttribute("data-theme");
      if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", "false");
        themeToggle.textContent = "☀️ Light";
        themeToggle.title = "Toggle light mode";
      }
    }
  }

  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    // fallback to system preference
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function toggleTheme() {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    if (next === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // initialize theme
  applyTheme(getInitialTheme());
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

  // Set max attribute to today's date to prevent future selection
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;
  input.setAttribute("max", todayStr);

  function parseDate(value) {
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d);
    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d)
      return null;
    return dt;
  }

  function validateDate(value) {
    if (!value) return "Please choose a date.";
    const start = parseDate(value);
    if (!start) return "Invalid date.";
    const startISO = value;
    if (startISO > todayStr) return "Date cannot be in the future.";
    return "";
  }

  function calculateAge(from, to) {
    // Calculates the difference between two dates in years, months, days
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0); // last day of prev month
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }
    return { years, months, days };
  }

  function showError(message) {
    errorEl.textContent = message;
    if (message) {
      results.hidden = true;
      input.setAttribute("aria-invalid", "true");
    } else {
      input.removeAttribute("aria-invalid");
    }
  }

  function showResults(diff) {
    yearsEl.textContent = String(diff.years);
    monthsEl.textContent = String(diff.months);
    daysEl.textContent = String(diff.days);
    results.hidden = false;
  }

  input.addEventListener("input", function () {
    const msg = validateDate(input.value);
    showError(msg);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = validateDate(input.value);
    if (msg) {
      showError(msg);
      return;
    }
    const start = parseDate(input.value);
    const diff = calculateAge(start, today);
    showError("");
    showResults(diff);
  });
})();
