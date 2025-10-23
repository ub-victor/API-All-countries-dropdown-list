const countrySelect = document.getElementById("countries");

fetch("https://restcountries.com/v3.1/all")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format");
    }

    // Sort alphabetically
    const sortedCountries = data.sort((a, b) => 
      a.name.common.localeCompare(b.name.common)
    );

    // Populate dropdown
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
