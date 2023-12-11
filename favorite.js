
// Get elements by id
const favouriteList = document.getElementById('fevList');
let list = JSON.parse(localStorage.getItem('favlistarr')) || [];

// Fetch the updated list
function fetching(list) {
  list.forEach((heroid) => {
    loadhero(heroid);
  });
}

// Load hero data
async function loadhero(heroid) {
  const URL = `https://www.superheroapi.com/api.php/3580926752143021/${heroid.trim()}`;
  const res = await fetch(URL);
  const data = await res.json();
  if (data) {
    heroslist(data);
  }
}

// Display hero data
function heroslist(hero) {
  const herosdata = document.createElement('div');
  herosdata.innerHTML = `
    <div id="outerbox">
      <div id="innerbox">
        <img src="${hero.image.url}" id="favlistimg">
      </div>
      <h5>${hero.name}</h5>
      <button class="btn btn-primary" id="remove" type="submit" onclick="remove(this.value)" value=${hero.id}>Remove</button>
    </div>
  `;
  favouriteList.appendChild(herosdata);
}

// Remove item from the list
function remove(value) {
  list = list.filter((heroid) => heroid !== value);
  localStorage.setItem('favlistarr', JSON.stringify(list));
  favouriteList.innerHTML = '';
  fetching(list);
}

fetching(list);
