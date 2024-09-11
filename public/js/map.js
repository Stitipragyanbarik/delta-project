
   document.addEventListener('DOMContentLoaded', () => {
  const mapTilerApiKey = 'nnGIZTjbt9LP46mWLajI';
 
  
  const map = new maplibregl.Map({
      container: 'map', // container ID
      style:`https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`, // style URL
      center: [77.2090, 28.6139], // Example coordinates [lng, lat]
      zoom: 10 // Example zoom level
  });
});
