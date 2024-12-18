const switchToSignUpButton = document.getElementById('switch-to-signup');
const switchToSignInButton = document.getElementById('switch-to-signin'); 
const companyOverlay = document.querySelector('.company-overlay');
 

const signInForm = document.querySelector('.sign-in');
const signInEmail = document.getElementById('signin-email');
const signInPassword = document.getElementById('signin-password');
const signInSubmit = document.getElementById('signin-submit');
const signInError = document.createElement('p');
signInError.style.color = 'red';
signInForm.appendChild(signInError);


const signUpForm = document.querySelector('.sign-up');
const signUpEmail = document.getElementById('signup-email');
const signUpPassword = document.getElementById('signup-password');
const signUpConfirmPassword = document.getElementById('signup-confirm-password');
const signUpSubmit = document.getElementById('signup-submit');
const signUpError = document.createElement('p');
signUpError.style.color = 'red';
signUpForm.appendChild(signUpError);


const togglePasswordSignupButton = document.getElementById('toggle-password-signup');
const toggleConfirmPasswordButton = document.getElementById('toggle-confirm-password');
const togglePasswordSignInButton = document.getElementById('toggle-password-signin');


switchToSignUpButton.addEventListener('click', () => {
    companyOverlay.classList.remove("transformXH");
    companyOverlay.classList.add("transformXZ");
});


switchToSignInButton.addEventListener('click', () => {
    companyOverlay.classList.remove("transformXZ");
    companyOverlay.classList.add("transformXH");
});


signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUpEmail.value.trim();
    const password = signUpPassword.value;
    const confirmPassword = signUpConfirmPassword.value;


    if (!email || !password || !confirmPassword) {
        signUpError.textContent = "All fields are required!";
        return;
    }

    if (password !== confirmPassword) {
        signUpError.textContent = "Passwords do not match!";
        return;
    }


    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];


    const existingUser = existingUsers.find(user => user.email === email);
    if (existingUser) {
        signUpError.textContent = "This email is already in use!";
        return;
    }


    const userData = { email, password };
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    signUpError.textContent = "Account created successfully!";
    setTimeout(() => {
        signUpForm.reset();
        signUpError.textContent = '';
        companyOverlay.style.transform = 'translateX(100%)';
    }, 2000);
});


signInSubmit.addEventListener('click', (e) => {
    e.preventDefault();

    const email = signInEmail.value.trim();
    const password = signInPassword.value;


    if (!email || !password) {
        signInError.textContent = "Both fields are required!";
        return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = savedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        signInError.textContent = "Signed in successfully!";
        showPopup("Signed in successfully!", "success");

        setTimeout(() => {
            signInForm.reset();
            signInError.textContent = '';
        }, 2000);
    } else {
        signInError.textContent = "Invalid credentials!";
    }
});


function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.classList.add('popup', type);
    popup.textContent = message;

    const okButton = document.createElement('button');
    okButton.textContent = "OK";
    okButton.addEventListener('click', () => popup.remove());
    popup.appendChild(okButton);

    document.body.appendChild(popup);

    setTimeout(() => {
        if (popup) popup.remove();
    }, 3000);
}


togglePasswordSignupButton.addEventListener('click', () => {
    togglePasswordVisibility(signUpPassword, togglePasswordSignupButton);
});


toggleConfirmPasswordButton.addEventListener('click', () => {
    togglePasswordVisibility(signUpConfirmPassword, toggleConfirmPasswordButton);
});


togglePasswordSignInButton.addEventListener('click', () => {
    togglePasswordVisibility(signInPassword, togglePasswordSignInButton);
});


function togglePasswordVisibility(inputElement, toggleButton) {
    if (inputElement.type === "password") {
        inputElement.type = "text";
        toggleButton.querySelector('i').classList.remove('fa-eye');
        toggleButton.querySelector('i').classList.add('fa-eye-slash');
    } else {
        inputElement.type = "password";
        toggleButton.querySelector('i').classList.remove('fa-eye-slash');
        toggleButton.querySelector('i').classList.add('fa-eye');
    }
}


const switchToSignupMobile = document.getElementById('switch-to-signup-mobile');
const switchToSigninMobile = document.getElementById('switch-to-signin-mobile');

switchToSigninMobile.addEventListener('click', () => {
    document.querySelector('.sign-up').style.display = "none";
    document.querySelector('.sign-in').style.display = "block";
});

switchToSignupMobile.addEventListener('click', () => {
    document.querySelector('.sign-in').style.display = "none";
    document.querySelector('.sign-up').style.display = "block";
});