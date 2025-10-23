const countrySelect = document.getElementById("countries");

fetch("https://restcountries.com/v2/all")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    data.sort((a, b) => a.name.localeCompare(b.name));
    data.forEach(country => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      countrySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching countries:", error);
    const option = document.createElement("option");
    option.textContent = "Failed to load countries";
    countrySelect.appendChild(option);
  });
