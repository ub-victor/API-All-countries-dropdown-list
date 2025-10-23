# API-All-countries-dropdown-list

A small web component / example project that fetches a list of countries from a public API and renders a searchable dropdown of all countries (name, ISO code, optional flag). Intended as a lightweight reference to integrate a countries dropdown into web apps.

## Features
- Fetches country data from a public REST API (no backend required)
- Populates a select (or custom dropdown) with country names and ISO codes
- Optional flags and search/filtering example
- Minimal, framework-agnostic example (vanilla JS + HTML)

## Tech
- HTML, CSS, JavaScript (vanilla)
- Public API: https://restcountries.com (v3)

## Quick start
1. Clone the repo:
    git clone <repo-url>
2. Open the example:
    - Option A: Open `index.html` in a browser
    - Option B: Serve locally (recommended):
      npm install -g serve
      serve .

## Example usage (vanilla JS)
Include this snippet in an HTML page to fetch countries and populate a select:

```html
<select id="country-select">
  <option value="">Select a country...</option>
</select>

<script>
async function loadCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  // Map to name + cca2, sort by name
  const countries = data
     .map(c => ({ name: c.name.common, code: c.cca2, flag: c.flags?.svg }))
     .sort((a, b) => a.name.localeCompare(b.name));

  const select = document.getElementById('country-select');
  countries.forEach(c => {
     const opt = document.createElement('option');
     opt.value = c.code || c.name;
     opt.textContent = `${c.name} ${c.code ? `(${c.code})` : ''}`;
     select.appendChild(opt);
  });
}

loadCountries().catch(err => console.error('Failed to load countries:', err));
</script>
```

## Searchable dropdown (minimal)
Use a simple input to filter options:

```html
<input id="country-filter" placeholder="Search countries..." />
<select id="country-select" size="8"></select>

<script>
const filterInput = document.getElementById('country-filter');
const select = document.getElementById('country-select');
let countries = [];

filterInput.addEventListener('input', () => {
  const q = filterInput.value.toLowerCase();
  select.innerHTML = '';
  countries
     .filter(c => c.name.toLowerCase().includes(q))
     .forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.code || c.name;
        opt.textContent = `${c.name} ${c.code ? `(${c.code})` : ''}`;
        select.appendChild(opt);
     });
});

async function init() {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  countries = data.map(c => ({ name: c.name.common, code: c.cca2 })).sort((a,b)=>a.name.localeCompare(b.name));
  // initial render
  filterInput.dispatchEvent(new Event('input'));
}
init();
</script>
```

## API notes
- Endpoint: https://restcountries.com/v3.1/all
- Typical fields: name.common, cca2 (ISO 3166-1 alpha-2), flags.svg
- No API key required for basic usage; check the API provider for rate limits and terms

## Customization ideas
- Show country flags inside dropdown using custom HTML
- Load by region or language (use other REST Countries endpoints)
- Replace select with an accessible autocomplete component

## Contributing
- Open an issue or PR for improvements
- Keep examples framework-agnostic or add framework-specific examples (React, Vue, Svelte)

## License
MIT — feel free to reuse and adapt.
