# WhatsApp Unban Launcher (Static Site)

A single‑page static app you can deploy to **Vercel**. It lets users:
- Type their phone number
- Pick an **Unban V1–V14** template
- Open **Gmail compose** to `support@support.whatsapp.com` with the subject and body pre‑filled
- Copy the message or use a `mailto:` fallback

## Deploy on Vercel (no config needed)
1. Upload these files to a Git repo (or drag‑and‑drop in Vercel).
2. In Vercel, **New Project → Other (static)** → Deploy.
3. Done. Every push redeploys automatically.

### Local preview
Just open `index.html` in your browser.

### Customize
- Update the default subject in `index.html` (the Subject input has a default value).
- Edit or add templates in `script.js` (see the `TEMPLATES` constant).

### Notes
- We never store input; everything runs in the user’s browser.
- The **Open Gmail & Send** button uses a Gmail web compose URL. If the visitor isn’t signed in to Gmail, they can use the **Use Mail App** link, which triggers their OS mail client.
