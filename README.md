# Princia Vadlea – Portfolio Website

Professional portfolio website for Princia Vadlea, Senior Software Quality Assurance Tester & QA Consultant.

## Tech Stack

- **HTML5** – Semantic, accessible markup
- **CSS3** – Custom properties, Grid, Flexbox, responsive design
- **Vanilla JavaScript** – Smooth scroll, animations, form handling

## Folder Structure

```
├── index.html          # Main single-page site
├── css/
│   └── styles.css      # Design system & responsive styles
├── js/
│   └── main.js         # Navigation, animations, form logic
├── images/             # Image assets
└── resume/
    └── Princia_Vadlea_Resume.pdf
```

## Running Locally

Open `index.html` in your browser, or use a local server:

```bash
npx -y serve .
```

Then visit `http://localhost:3000`.

## Deployment

### GitHub Pages
1. Push code to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch** → select `main` / `root`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

### Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the project folder, or connect your GitHub repo
3. Site deploys automatically on push

### Vercel
```bash
npm i -g vercel
vercel --prod
```

## Customization

- **Resume**: Replace `resume/Princia_Vadlea_Resume.pdf` with your actual resume
- **Content**: Edit text directly in `index.html`
- **Colors**: Modify CSS custom properties in `:root` inside `css/styles.css`
- **Email**: Contact form uses `mailto:` – update the email in `js/main.js` if needed
