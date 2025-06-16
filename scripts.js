const API_KEY = "58765c04fe038d73593baffdc58ea6a4";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function cargarPeliculas() {
  try{
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=1`);
    const data = await res.json();
    mostrarPeliculas(data.results)
  } catch (error){
    console.error("Error al cargar peliculas: ", error)
  }
}

function mostrarPeliculas(peliculas){
  const contenedor = document.getElementById("peliculas");
  contenedor.innerHTML = "";

  peliculas.forEach(pelicula => {
    const div = document.createElement("div");
    div.classList.add("pelicula")
    div.innerHTML = `
      <img src="${IMG_BASE_URL + pelicula.poster_path}" alt="${pelicula.title}">
      <h3>${pelicula.title}</h3>
      <p>⭐ ${pelicula.vote_average}</p>
    `;
    contenedor.appendChild(div);
  });
}

if (window.location.pathname.includes('cartelera.html')) {
  cargarPeliculas();
}

// Slider Home !

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('sliderCartelera');

  document.querySelector('.previaSlider').addEventListener('wheel', function (e) {
    e.preventDefault();
    this.scrollLeft += e.deltaY;
  });

  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`)
    .then(res => res.json())
    .then(data => {
      const peliculas = data.results.slice(0, 10); // carga 10 para que haya scroll visible
      peliculas.forEach(p => {
        const div = document.createElement('div');
        div.classList.add('slide');
        div.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w342${p.poster_path}" alt="${p.title}">
          <div class="info">
            <h3>${p.title}</h3>
          </div>
        `;
        slider.appendChild(div);
      });
    })
    .catch(err => console.error('Error al cargar películas:', err));
});

