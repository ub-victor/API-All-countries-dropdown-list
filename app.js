document.addEventListener('DOMContentLoaded', () => {
  const selectDrop = document.querySelector('#countries');

  fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(res => res.json())
    .then(data => {
      // Sort by the common name
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      let output = '<option value="">Select your country</option>';
      data.forEach(country => {
        output += `<option value="${country.name.common}">${country.name.common}</option>`;
      });

      selectDrop.innerHTML = output;
    })
    .catch(err => {
      console.error('Error fetching countries:', err);
    });
});
