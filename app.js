const mymap = L.map("mapid").setView([51.505, -0.09], 13);
const myIcon = L.icon({
  iconUrl: "./images/icon-location.svg",

  iconSize: [46, 56],
  iconAnchor: [23, 56],
});
const marker = L.marker([51.505, -0.09], { icon: myIcon }).addTo(mymap);
const input = document.querySelector("#ipAddressSearch");
const button = document.querySelector("#ipAddressSearchBtn");
const info = document.querySelectorAll(".info");
const form = document.querySelector(".inputForm");
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 17,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZ2FicmllbC1qYXIiLCJhIjoiY2tyMjYyNWR0MXQ5MzJucGxzdTRnNzBnbCJ9.xSe5RSV-Tpy-U8bO7OxyTg",
  }
).addTo(mymap);

const apiString =
  "https://geo.ipify.org/api/v1?apiKey=at_SAl5MpkP1hwsb1Q259V6RcTZirBx1&ipAddress=customAddress";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateIpAddress(input.value)) {
    ipAdressLocation();
  } else {
    alert("Please input valid IP Adress");
  }
});

const ipAdressLocation = async () => {
  try {
    // url search params!!!
    const newApiString = apiString.replace("customAddress", input.value);
    const res = await axios.get(newApiString);
    mymap.setView([res.data.location.lat, res.data.location.lng], 13);
    marker.setLatLng([res.data.location.lat, res.data.location.lng]);
    ipAddress.innerText = res.data.ip;
    locationText.innerText = `${res.data.location.city}, ${res.data.location.country} ${res.data.location.postalCode}`;
    timezone.innerText = `UTC ${res.data.location.timezone}`;
    isp.innerText = res.data.isp;
  } catch (e) {
    console.log("Invalid ip Address.", e);
  }
};

const validateIpAddress = (ipaddress) =>
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    ipaddress
  );
