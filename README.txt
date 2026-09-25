BRENDA & WAYNE — WEDDING PHOTO UPLOAD SITE
Setup guide (about 10 minutes total, no coding required)

This site works like a Google Form for photos: guests can submit
theirs, but nobody — including other guests — can browse or download
what's been uploaded through the site. The only way to see the full
collection is by logging into your own Cloudinary account, which
only the two of you have access to. There's no public gallery page
at all, by design, so there's nothing for anyone to find or scrape.

────────────────────────────────────
STEP 1 — Create a free Cloudinary account
────────────────────────────────────
1. Go to https://cloudinary.com and sign up (free plan).
2. Once logged in, your Dashboard shows a "Cloud name" near the top —
   copy it down. It's a short string like "dabc123xy".

────────────────────────────────────
STEP 2 — Create an unsigned upload preset
────────────────────────────────────
This is what lets guests upload straight from the browser with no
login, no app, no account.

1. In Cloudinary, go to Settings (gear icon) → Upload.
2. Scroll to "Upload presets" and click "Add upload preset."
3. Set "Signing Mode" to UNSIGNED.
4. (Optional but recommended) Under "Folder," type something like
   brenda-wayne-wedding so uploads are tidy in your media library.
5. Save. Copy the preset name it gives you (e.g. "abcdef12").

You do NOT need to touch Cloudinary's Security settings or
"Resource list" for this version — there's no public listing feature
to enable.

────────────────────────────────────
STEP 3 — Fill in config.js
────────────────────────────────────
Open the file called config.js in a plain text editor and replace:

  YOUR_CLOUD_NAME      → the Cloud name from Step 1
  YOUR_UPLOAD_PRESET   → the preset name from Step 2
  REPLACE_ME           → a short code of your choosing, e.g. "BW2026"
                          (this is the ACCESS_CODE line)

Print this code beneath your QR code. Guests type it in once per
device — after that, their phone remembers them for the rest of the
event. Note this is a light deterrent against randoms and search
engines, not a lock against a determined snoop — anyone who reads
the page's source code could find it. Since there's no public
gallery for that code to protect access to, the worst case if
someone bypasses it is that they can submit a photo — nobody can
use it to view anyone else's photos.

Save the file. That's the only file you need to edit.

────────────────────────────────────
STEP 4 — Put the site online
────────────────────────────────────
Pick whichever feels easier:

  OPTION A — Netlify Drop (fastest, no account needed)
  1. Go to https://app.netlify.com/drop
  2. Drag this whole folder onto the page.
  3. It gives you a live web address in about 30 seconds — that's
     the link for your QR code.

  OPTION B — GitHub Pages
  1. Create a new repository on GitHub and upload all the files
     in this folder. (Note: a free GitHub account requires the repo
     to be public for Pages to work — see the note below for what
     that does and doesn't expose.)
  2. Go to the repo's Settings → Pages, set the source to your
     main branch, and save.
  3. GitHub gives you a live web address after a minute or two.

────────────────────────────────────
STEP 5 — Make your QR code
────────────────────────────────────
Take the live web address from Step 4 and paste it into any free QR
code generator (e.g. qr-code-generator.com or the QR option built
into Google Chrome's address bar — click the share icon). Print it,
with the access code beneath it, on a sign or card for the reception.

────────────────────────────────────
STEP 6 — Viewing and downloading photos
────────────────────────────────────
Log into cloudinary.com with your account. Under Media Library, open
the folder you set up in Step 2 (or search by the tag
"brenda-wayne-wedding"). Every guest photo will be there, and you
can download individually or in bulk from there. This view requires
your Cloudinary login — it's not reachable from the website guests
use.

────────────────────────────────────
A note on what's actually exposed
────────────────────────────────────
The site's cloud name, upload preset name, and access code are all
visible to anyone who views the live page's source code — that's
true of any site built this way and isn't something a private
GitHub repo changes, since the live site itself has to be public for
guests to use it. What that exposure lets someone do, worst case, is
submit their own uploads (same as any guest can) or spam junk
uploads to your account. It does NOT let anyone view, list, or
download other people's photos, because there's no listing feature
turned on anywhere in this setup. If you'd ever want real, enforced
protection against upload spam too (not just viewing), the next step
up is running the code-check on a small server-side function instead
of in the browser — ask if you want that added later.
