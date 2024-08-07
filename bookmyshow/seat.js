document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const movieTitle = params.get('title');
    const showTime = params.get('time');

    const styledTitles = {
        'Deadpool & Wolverine': '<span class="title-part-red">Deadpool</span> & <span class="title-part-yellow">Wolverine</span>',
        'Kalki 2898 AD': '<span class="title-part-2">Kalki 2898 AD</span>',
        'Despicable ME 4': '<span class="title-part-3">Despicable ME 4</span>'
    };

    const styledTitle = styledTitles[movieTitle] || movieTitle;

    document.getElementById("movie-title").innerHTML = styledTitle;
    document.getElementById("movie-time").textContent = showTime;

    const seatContainer = document.getElementById("seats-container");
    const rows = 5;
    const cols = 15;
    const selectedSeats = new Set();

    // Initialize seats
    for (let i = 1; i <= rows * cols; i++) {
        const seat = document.createElement("div");
        seat.className = 'seat';
        seat.dataset.seatId = i;
        seat.addEventListener('click', function() {
            if (!seat.classList.contains('booked')) {
                seat.classList.toggle('selected');
                if (seat.classList.contains('selected')) {
                    selectedSeats.add(seat.dataset.seatId);
                } else {
                    selectedSeats.delete(seat.dataset.seatId);
                }
            }
        });
        seatContainer.appendChild(seat);
    }

    // Retrieve and block already booked seats
    const seatsRef = db.collection('movies').doc(movieTitle).collection('shows').doc(showTime);
    seatsRef.get().then(doc => {
        if (doc.exists) {
            const bookedSeats = doc.data().seats || [];
            bookedSeats.forEach(seatId => {
                const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
                if (seatElement) {
                    seatElement.classList.add('booked');
                }
            });
        }
    }).catch(error => {
        console.error("Error retrieving booked seats:", error);
    });

    // Book seats
    const bookNowButton = document.getElementById("book-now");
    bookNowButton.addEventListener('click', function() {
        if (selectedSeats.size > 0) {
            seatsRef.set({
                seats: firebase.firestore.FieldValue.arrayUnion(...Array.from(selectedSeats))
            }, { merge: true }).then(() => {
                alert(`Seats booked successfully: ${Array.from(selectedSeats).join(', ')}`);
                selectedSeats.forEach(seatId => {
                    const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
                    if (seatElement) {
                        seatElement.classList.add('booked');
                        seatElement.classList.remove('selected');
                    }
                });
                selectedSeats.clear();
            }).catch(error => {
                console.error("Error booking seats:", error);
                alert("Failed to book seats. Please try again.");
            });
        } else {
            alert("No seats selected. Please select at least one seat.");
        }
    });
});