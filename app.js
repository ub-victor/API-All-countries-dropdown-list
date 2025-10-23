const countrySelect = document.getElementById("countries");

// Fetch all countries (use v2 API — more stable for local use)
fetch("https://restcountries.com/v2/all")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    // Sort alphabetically
    data.sort((a, b) => a.name.localeCompare(b.name));

    // Add each country as an option with flag emoji
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name;

      // Create flag emoji using country alpha2Code (ISO code)
      const flagEmoji = country.alpha2Code
        ? country.alpha2Code
            .toUpperCase()
            .replace(/./g, char =>
              String.fromCodePoint(127397 + char.charCodeAt())
            )
        : "";

      option.textContent = `${flagEmoji}  ${country.name}`;
      countrySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching countries:", error);
    const option = document.createElement("option");
    option.textContent = "Failed to load countries";
    countrySelect.appendChild(option);
  });
