const popupButton = document.getElementById('popupButton');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');


popupButton.addEventListener('click', function() {
    popup.style.display = 'block';
});


closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});