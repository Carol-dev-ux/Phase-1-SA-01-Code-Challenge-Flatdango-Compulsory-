document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display the first movie's details
    fetchMovieDetails(1);

    // Fetch and display the list of all movies
    fetchAllMovies();

    // Event listener for Buy Ticket button
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('buy-ticket')) {
            buyTicket(event.target.dataset.movieId);
        }
    });
});

function fetchMovieDetails(movieId) {
    fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(movie => displayMovieDetails(movie))
        .catch(error => console.error('Error fetching movie details:', error));
}

function fetchAllMovies() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => displayMovieList(movies))
        .catch(error => console.error('Error fetching movie list:', error));
}

function displayMovieDetails(movie) {
    // Display movie details 
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title} Poster">
        <h2>${movie.title}</h2>
        <p>Runtime: ${movie.runtime} mins</p>
        <p>Showtime: ${movie.showtime}</p>
        <p>Available Tickets: <span id="available-tickets">${movie.capacity - movie.tickets_sold}</span></p>
        <button class="buy-ticket" data-movie-id="${movie.id}">Buy Ticket</button>
    `;
}

function displayMovieList(movies) {
    // Display the list of movies 
    const movieList = document.getElementById('films');
    movies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.classList.add('film', 'item');
        movieList.appendChild(li);
    });
}

function buyTicket(movieId) {
    // Decreasing available tickets 
    const availableTicketsElement = document.getElementById('available-tickets');
    const availableTickets = parseInt(availableTicketsElement.textContent, 10);

    if (availableTickets > 0) {
        availableTicketsElement.textContent = availableTickets - 1;
    } else {
        alert('Sorry, this showing is sold out.');
    }
}