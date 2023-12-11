
// Get elements by id
let search = document.getElementById("search");
const ul = document.getElementById("auto-complete");
const favarray = [];

// Fetch data
search.onkeyup = function () {
  var searchname = search.value;
  if (searchname !== "") {
    fetch(
      "https://superheroapi.com/api.php/3580926752143021/search/" +
        searchname.trim()
    )
      .then((response) => response.json())
      .then((data) => {
        ul.innerText = " ";
        for (var i of data.results) {
          var li = document.createElement("li");
          li.innerHTML = i.name;
          li.id = i.id;

          li.addEventListener("click", function () {
            var heroid = this.id;
            loadDetails(heroid);
            ul.innerText = " ";
          });

          li.style.display = "block";
          ul.appendChild(li);
        }
      })
      .catch((err) => console.log(err));
  }
};

// Display hero details
function loadDetails(heroid) {
  fetch(`https://superheroapi.com/api.php/3580926752143021/${heroid}`)
    .then((response) => response.json())
    .then((data) => {
      var details = document.getElementById("details");
      details.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

      var img = document.getElementById("img");
      img.src = data.image.url;

      var name = document.getElementById("name");
      name.innerHTML = data.name;

      var bio = document.getElementById("bio");
      bio.innerHTML = "Relatives: " + data.connections.relatives;

      var nature = document.getElementById("nature");
      nature.innerText = "Nature: " + data.biography.alignment;

      var base = document.getElementById("base");
      base.innerHTML = "Work: " + data.work.base;

      var occ = document.getElementById("occupation");
      occ.innerHTML = "Occupation: " + data.work.occupation;

      var powestat = document.getElementById("powerstats");
      powestat.innerHTML =
        "Intelligence: " +
        data.powerstats.intelligence +
        ", Combat: " +
        data.powerstats.combat +
        ", Power: " +
        data.powerstats.power +
        ", Speed: " +
        data.powerstats.speed +
        ", Strength: " +
        data.powerstats.strength;

      var favv = document.getElementById("favbtn");
      favv.style.display = "flex";
      favv.value = data.id;
    })
    .catch((error) => console.log(error));
}

// Push data to favarray into localstorage
function favpush(favid) {
  if (favarray.includes(favid)) {
    alert("Already Added to the Favourite List");
    return;
  }

  favarray.push(favid);
  console.log(favarray);
  localStorage.setItem("favlistarr", JSON.stringify(favarray));
}
