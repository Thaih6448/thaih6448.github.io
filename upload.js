(function () {
  const pickBtn = document.getElementById("pickBtn");
  const fileInput = document.getElementById("fileInput");
  const statusEl = document.getElementById("status");
  const countEl = document.getElementById("uploadCount");

  const COUNT_KEY = "bw_upload_count";

  function getCount() {
    return parseInt(localStorage.getItem(COUNT_KEY) || "0", 10);
  }

  function renderCount(n) {
    countEl.textContent = n > 0 ? "Your uploads: " + n : "";
  }

  // Show whatever this device has already uploaded, right away.
  renderCount(getCount());

  pickBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", async function () {
    const files = Array.from(fileInput.files || []);
    if (files.length === 0) return;

    if (
      !CLOUDINARY_CLOUD_NAME ||
      CLOUDINARY_CLOUD_NAME === "YOUR_CLOUD_NAME" ||
      !CLOUDINARY_UPLOAD_PRESET ||
      CLOUDINARY_UPLOAD_PRESET === "YOUR_UPLOAD_PRESET"
    ) {
      statusEl.textContent = "This site isn't fully set up yet — config.js still needs real Cloudinary values.";
      statusEl.className = "status err";
      return;
    }

    let uploaded = 0;
    let failed = 0;
    let tooLarge = 0;
    const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > maxBytes) {
        tooLarge++;
        continue;
      }

      statusEl.textContent = "Uploading photo " + (i + 1) + " of " + files.length + " …";
      statusEl.className = "status";

      try {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        form.append("tags", CLOUDINARY_TAG);

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/" + CLOUDINARY_CLOUD_NAME + "/image/upload",
          { method: "POST", body: form }
        );

        if (!res.ok) throw new Error("Upload failed");
        uploaded++;
      } catch (err) {
        failed++;
      }
    }

    if (uploaded > 0) {
      const newTotal = getCount() + uploaded;
      localStorage.setItem(COUNT_KEY, String(newTotal));
      renderCount(newTotal);
    }

    if (failed === 0 && tooLarge === 0) {
      statusEl.textContent = "";
    } else {
      const parts = [];
      if (tooLarge > 0) {
        parts.push(
          tooLarge + " photo" + (tooLarge === 1 ? " was" : "s were") +
          " too large (over " + MAX_FILE_SIZE_MB + "MB) and " +
          (tooLarge === 1 ? "wasn't" : "weren't") + " added."
        );
      }
      if (failed > 0) {
        parts.push(
          failed + " photo" + (failed === 1 ? "" : "s") + " didn't make it — try again for those."
        );
      }
      statusEl.textContent = parts.join(" ");
      statusEl.className = "status err";
    }

    // Reset so selecting the same file again still fires a change event.
    fileInput.value = "";
  });
})();
