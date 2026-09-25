(function () {
  const pickBtn = document.getElementById("pickBtn");
  const fileInput = document.getElementById("fileInput");
  const statusEl = document.getElementById("status");
  const thumbsEl = document.getElementById("thumbs");

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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Show an instant local preview so guests get feedback right away.
      const previewUrl = URL.createObjectURL(file);
      const img = document.createElement("img");
      img.src = previewUrl;
      thumbsEl.appendChild(img);

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

    if (failed === 0) {
      statusEl.textContent = "Thank you! " + uploaded + " photo" + (uploaded === 1 ? "" : "s") + " added. 💛";
      statusEl.className = "status ok";
    } else if (uploaded === 0) {
      statusEl.textContent = "That didn't go through — please check your connection and try again.";
      statusEl.className = "status err";
    } else {
      statusEl.textContent = uploaded + " photo" + (uploaded === 1 ? "" : "s") + " added, " + failed + " didn't make it. Try again for those.";
      statusEl.className = "status err";
    }

    // Reset so selecting the same file again still fires a change event.
    fileInput.value = "";
  });
})();
