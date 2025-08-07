const searchBtn = document.getElementById("searchBtn");
const queryInput = document.getElementById("query");
const moviesDiv = document.getElementById("movies");

searchBtn.addEventListener("click", async () => {
  const query = queryInput.value.trim();
  if (!query) return alert("Please enter a movie title");

  const apiKey = "YOUR_API_KEY"; // Replace this with your actual API key
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      moviesDiv.innerHTML = `<p>No results found for "${query}".</p>`;
      return;
    }

    renderMovies(data.Search);
  } catch (err) {
    console.error("Error fetching data:", err);
    moviesDiv.innerHTML = `<p>Error fetching movie data.</p>`;
  }
});

function renderMovies(movies) {
  moviesDiv.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p> `;

    moviesDiv.appendChild(card);
  });
}