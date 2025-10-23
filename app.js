// Get the <select> element
const countrySelect = document.getElementById("countries");

// Fetch the list of all countries from the REST Countries API
fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    // Sort countries alphabetically by name
    const sortedCountries = data.sort((a, b) => 
      a.name.common.localeCompare(b.name.common)
    );

    // Create and append each country as an <option>
    sortedCountries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      countrySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching countries:", error);
    const option = document.createElement("option");
    option.textContent = "Failed to load countries";
    countrySelect.appendChild(option);
  });
