document.addEventListener('DOMContentLoaded', function () {
    var seats = document.querySelectorAll('.seat');

    seats.forEach(function (seat) {
        seat.addEventListener('click', function () {
            this.classList.toggle('selected');
            updateSelectedSeats();
        });
    });

    function updateSelectedSeats() {
        var selectedSeats = document.querySelectorAll('.seat.selected');
        var selectedSeatsText = Array.from(selectedSeats).map(function (seat) {
            return seat.getAttribute('data-seat');
        }).join(', ');

        document.getElementById('selected-seats').textContent = selectedSeatsText;
    }
});