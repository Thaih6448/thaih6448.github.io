(function () {
  const KEY = "bw_wedding_unlocked";
  const lock = document.getElementById("lock");
  if (!lock) return;

  if (localStorage.getItem(KEY) === "true") {
    lock.style.display = "none";
    return;
  }

  const input = document.getElementById("lockInput");
  const btn = document.getElementById("lockBtn");
  const err = document.getElementById("lockError");

  function tryUnlock() {
    if (!ACCESS_CODE || ACCESS_CODE === "REPLACE_ME") {
      err.textContent = "This site isn't fully set up yet — config.js needs a real access code.";
      return;
    }
    const entered = (input.value || "").trim().toLowerCase();
    if (entered.length > 0 && entered === ACCESS_CODE.trim().toLowerCase()) {
      localStorage.setItem(KEY, "true");
      lock.style.display = "none";
    } else {
      err.textContent = "That code doesn't match — check the card and try again.";
      input.focus();
      input.select();
    }
  }

  btn.addEventListener("click", tryUnlock);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") tryUnlock();
  });

  // Bring up the keyboard right away on most phones.
  input.focus();
})();
