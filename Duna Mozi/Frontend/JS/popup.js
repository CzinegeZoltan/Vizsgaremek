const popupButton = document.getElementById('popupButton');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');


popupButton.addEventListener('click', function() {
    popup.style.display = 'block';
    document.body.style.overflow='hidden';
    popup.style.overflow='hidden';
});


closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
    document.body.style.overflow='auto';
});


window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow='auto';
    }
});