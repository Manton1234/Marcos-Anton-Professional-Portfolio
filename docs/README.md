# Digital Marketing Portfolio Website

This is a Quarto portfolio website scaffold for a final digital marketing project. It follows the professor's portfolio anatomy from the symposium PDF and includes a professional home page, marketing analytics project gallery, strategic marketing page, dashboard, Revealjs presentation, Google Analytics readiness, SEO basics, resume page, linked PDF resume, and GitHub Pages publishing workflow.

## Customize First

Already personalized:

- `Marcos Anton`
- `manton@cpp.edu`
- `https://github.com/Manton1234`
- Cal Poly Pomona graduation in Summer 2026
- Marcos Anton resume PDF and DOCX links

Replace these remaining items before publishing:

- Project metrics if you have class, internship, or client data
- A real GA4 measurement ID only after creating a real Google Analytics property

## Render Locally

Install Quarto from https://quarto.org, then run:

```bash
quarto render
```

Preview while editing:

```bash
quarto preview
```

The rendered website is written to the `docs/` folder.

## Publish on GitHub

Option A, matching the symposium slides:

```bash
quarto publish gh-pages
```

Option B, using the included GitHub Actions workflow:

1. Create a new GitHub repository.
2. Push this folder to the repository.
3. In GitHub, go to Settings > Pages.
4. Set the source to GitHub Actions.
5. Push to the `main` branch and wait for the workflow to finish.

## Assignment Checklist

- Professional design and tone
- Clear target audience for employers and recruiters
- Home page with profile, education, skills, objective, and achievements
- Home page headshot plus concise elevator pitch
- Marketing Analytics auto-gallery with five deep-dive case studies
- Strategic Marketing page with brand positioning and embedded proof
- Dashboard page with campaign metrics and visualization logic
- Revealjs presentation integrated into the website
- Resume page with linked PDF resume
- Google Analytics measurement plan with event and UTM standards
- SEO-friendly page titles, descriptions, navigation, robots file, and sitemap
