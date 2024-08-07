document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('movie');

    const movies = {
        1: {
            title: 'Deadpool & Wolverine', // Plain text title for URL parameter
            styledTitle: '<span class="title-part-red">Deadpool</span> & <span class="title-part-yellow">Wolverine</span>',
            description: "Wolverine is recovering from his injuries when he meets the loudmouth, Deadpool. They team up to defeat a common enemy.",
            poster: "Pics/DW-2.png",
            cinema: "Showing at Cinema 1: The best cinema experience.",
            timings: ["12:00 PM", "6:00 PM", "10:00 PM"]
        },
        2: {
            title:'Kalki 2898 AD',
            styledtitle: '<span class=title-part-2>Kalki 2898 AD</span>',
            description: "When the world is taken over by darkness. A force will rise.",
            poster: "Pics/kalki2.jpg",
            cinema: "Showing at Audi 2: The ultimate movie experience.",
            timings: ["12:00 PM", "6:00 PM", "10:00 PM"]
        },
        3: {
            title:'Despicable ME 4',
            styledTitle: '<span class=title-part-3>Despicable ME 4</span>',
            description: "Gru welcomes a new member to the family, Gru Jr., who's intent on tormenting his dad. However, their peaceful existence crashes when criminal mastermind Maxime Le Mal escapes from prison and vows revenge against Gru.",
            poster: "Pics/DM4(2).jpg",
            cinema: "Showing at Audi 3: Enjoy the show.",
            timings: ["12:00 PM", "6:00 PM", "10:00 PM"]
        }
    };

    const movie = movies[movieId];
    const timings = movie ? movie.timings : [];

    if (movie) {
        const movieTitleElement = document.getElementById("movie-title");
        movieTitleElement.innerHTML = movie.styledTitle; // Render styled title

        document.getElementById("movie-description").textContent = movie.description;
        document.getElementById("movie-poster").src = movie.poster;
        document.getElementById("cinema-details").textContent = movie.cinema;

        const timingsList = document.getElementById("show-timings");
        timingsList.innerHTML = '';
        timings.forEach(timing => {
            const li = document.createElement("li");
            li.textContent = timing;
            li.style.cursor = 'pointer';
            li.addEventListener('click', function() {
                window.location.href = `seats.html?title=${encodeURIComponent(movie.title)}&time=${encodeURIComponent(timing)}`;
            });
            timingsList.appendChild(li);
        });
    }
}); 