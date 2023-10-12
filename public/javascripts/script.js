var cityInp = document.querySelector("#cityinp");
var fuc;

cityInp.addEventListener("input", function () {
  var cityName = cityInp.value;

  function abcd() {
    clearTimeout(fuc);
    axios.get(`/getcitynames/${cityName}`).then(function ({data}) {
      document.querySelector("#selectcity").innerHTML = "";
      data.data.forEach(function (sj) {
        document.querySelector( "#selectcity" ).innerHTML += `<option value="${sj.city}">${sj.city}</option>`;
      });
    });
  }
  if (cityName.length % 3 === 0) {
    clearTimeout(fuc);
    abcd();
  } else {
    clearTimeout(fuc);
    fuc = setTimeout(abcd, 2000);
  }
});

document.querySelector("#selectcity").addEventListener('change', function(e){
  document.querySelector("#cityinp").value = e.target.value;
})