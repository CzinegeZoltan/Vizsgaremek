function missingName() {
    var nameInput = document.getElementById('name');
    var name = nameInput.value;
    var missingName = document.getElementById('missingName');

    var nameRegex = /^(?=.*[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ ])[A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ ]{4,}$/;

    if (nameRegex.test(name)) {
        missingName.textContent = '';
        return true;
    } else {
        missingName.textContent = 'Adj meg egy nevet! Kötelező 1db kis és nagy betű és 4 karakter hosszú kell legyen legalább!';
        event.preventDefault();
    }
}



function validateEmail() {
    var emailInput = document.getElementById('email');
    var email = emailInput.value;
    var invalidEmail = document.getElementById('invalidEmail');

    // Az egyszerűség kedvéért itt csak egy egyszerű e-mail validációt használunk
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
        invalidEmail.textContent = '';
        return true;
    } else {
        invalidEmail.textContent = 'Hibás email cím!';
        event.preventDefault();
    }
}



function validatePassword() {
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var password = passwordInput.value;
    var confirmPassword = confirmPasswordInput.value;
    var passwordMismatch = document.getElementById('passwordMismatch');
    var passwordMismatch1 = document.getElementById('passwordMismatch1');

    // Az egyszerűség kedvéért itt csak egy egyszerű jelszó validációt használunk
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!-.])[A-Za-z\d!-.]{4,}$/;

    if (passwordRegex.test(password)) {
        // Jelszó validáció rendben
        passwordMismatch.textContent = '';
        passwordMismatch1.textContent = '';

        // Ellenőrizzük a két jelszó egyezőségét
        if (password === confirmPassword) {
            // A két jelszó egyezik
            passwordMismatch.textContent = '';
            return true;
        } else {
            // A két jelszó nem egyezik
            passwordMismatch.textContent = 'A két jelszó nem egyezik meg!';
        }
    } else {
        // Érvénytelen jelszó
        passwordMismatch1.textContent = 'Érvénytelen jelszó! Szükséges karakterek: 1db kis és nagy betű(ékezetes betű nem elfogadott!), 1db szám és 1db speciális karakter(!-.)';
    }
}