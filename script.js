/* =========================================
   STUDENTHUB - FRONTEND PROJECT 4
   Form Design & Validation
   ========================================= */


/* ---------- SELECT ELEMENTS ---------- */

const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const course = document.getElementById("course");

const password = document.getElementById("password");
const confirmPassword =
    document.getElementById("confirmPassword");

const terms = document.getElementById("terms");

const successMessage =
    document.getElementById("successMessage");

const togglePassword =
    document.getElementById("togglePassword");

const toggleConfirmPassword =
    document.getElementById("toggleConfirmPassword");


/* ---------- REGEX PATTERNS ---------- */

// Name: letters and spaces only
const namePattern =
    /^[A-Za-z]+(?:\s+[A-Za-z]+)+$/;


// Email format
const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


// Indian 10-digit phone number
const phonePattern =
    /^[6-9]\d{9}$/;


// Password:
// At least 8 characters
// One uppercase
// One lowercase
// One number
// One special character
const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


/* ---------- ERROR ELEMENTS ---------- */

const errors = {

    fullName:
        document.getElementById("nameError"),

    email:
        document.getElementById("emailError"),

    phone:
        document.getElementById("phoneError"),

    course:
        document.getElementById("courseError"),

    password:
        document.getElementById("passwordError"),

    confirmPassword:
        document.getElementById("confirmPasswordError"),

    terms:
        document.getElementById("termsError")

};


/* ---------- SHOW ERROR ---------- */

function showError(input, errorElement, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    input.setAttribute("aria-invalid", "true");

    errorElement.textContent = message;
}


/* ---------- SHOW SUCCESS ---------- */

function showValid(input, errorElement) {

    input.classList.remove("invalid");

    input.classList.add("valid");

    input.setAttribute("aria-invalid", "false");

    errorElement.textContent = "";
}


/* ---------- CLEAR FIELD ---------- */

function clearField(input, errorElement) {

    input.classList.remove("valid");
    input.classList.remove("invalid");

    input.removeAttribute("aria-invalid");

    errorElement.textContent = "";
}


/* ---------- VALIDATE NAME ---------- */

function validateName() {

    const value = fullName.value.trim();

    if (value === "") {

        showError(
            fullName,
            errors.fullName,
            "Please enter your full name."
        );

        return false;
    }


    if (value.length < 3) {

        showError(
            fullName,
            errors.fullName,
            "Name must contain at least 3 characters."
        );

        return false;
    }


    if (!namePattern.test(value)) {

        showError(
            fullName,
            errors.fullName,
            "Please enter a valid full name using letters only."
        );

        return false;
    }


    showValid(fullName, errors.fullName);

    return true;
}


/* ---------- VALIDATE EMAIL ---------- */

function validateEmail() {

    const value = email.value.trim();

    if (value === "") {

        showError(
            email,
            errors.email,
            "Please enter your email address."
        );

        return false;
    }


    if (!emailPattern.test(value)) {

        showError(
            email,
            errors.email,
            "Please enter a valid email address."
        );

        return false;
    }


    showValid(email, errors.email);

    return true;
}


/* ---------- VALIDATE PHONE ---------- */

function validatePhone() {

    const value = phone.value.trim();

    if (value === "") {

        showError(
            phone,
            errors.phone,
            "Please enter your phone number."
        );

        return false;
    }


    if (!phonePattern.test(value)) {

        showError(
            phone,
            errors.phone,
            "Enter a valid 10-digit Indian phone number."
        );

        return false;
    }


    showValid(phone, errors.phone);

    return true;
}


/* ---------- VALIDATE COURSE ---------- */

function validateCourse() {

    if (course.value === "") {

        showError(
            course,
            errors.course,
            "Please select your course."
        );

        return false;
    }


    showValid(course, errors.course);

    return true;
}


/* ---------- VALIDATE PASSWORD ---------- */

function validatePassword() {

    const value = password.value;

    if (value === "") {

        showError(
            password,
            errors.password,
            "Please create a password."
        );

        return false;
    }


    if (!passwordPattern.test(value)) {

        showError(
            password,
            errors.password,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character."
        );

        return false;
    }


    showValid(password, errors.password);

    return true;
}


/* ---------- VALIDATE CONFIRM PASSWORD ---------- */

function validateConfirmPassword() {

    const value = confirmPassword.value;

    if (value === "") {

        showError(
            confirmPassword,
            errors.confirmPassword,
            "Please confirm your password."
        );

        return false;
    }


    if (value !== password.value) {

        showError(
            confirmPassword,
            errors.confirmPassword,
            "Passwords do not match."
        );

        return false;
    }


    showValid(
        confirmPassword,
        errors.confirmPassword
    );

    return true;
}


/* ---------- VALIDATE TERMS ---------- */

function validateTerms() {

    if (!terms.checked) {

        terms.setAttribute(
            "aria-invalid",
            "true"
        );

        errors.terms.textContent =
            "You must agree to the terms and conditions.";

        return false;
    }


    terms.setAttribute(
        "aria-invalid",
        "false"
    );

    errors.terms.textContent = "";

    return true;
}


/* ---------- FORM SUBMISSION ---------- */

form.addEventListener("submit", function(event) {

    /*
        Prevent the default form submission.
        This stops the page from refreshing.
    */

    event.preventDefault();


    // Validate every field
    const nameValid = validateName();

    const emailValid = validateEmail();

    const phoneValid = validatePhone();

    const courseValid = validateCourse();

    const passwordValid = validatePassword();

    const confirmPasswordValid =
        validateConfirmPassword();

    const termsValid = validateTerms();


    // Check whether everything is valid
    const formIsValid =
        nameValid &&
        emailValid &&
        phoneValid &&
        courseValid &&
        passwordValid &&
        confirmPasswordValid &&
        termsValid;


    if (formIsValid) {

        /*
            Show success message
            without refreshing the page.
        */

        successMessage.hidden = false;


        // Scroll to success message
        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        // Optional: reset the form
        form.reset();


        // Remove validation styles
        const inputs =
            form.querySelectorAll(
                "input, select"
            );

        inputs.forEach(input => {

            input.classList.remove("valid");

            input.classList.remove("invalid");

            input.removeAttribute(
                "aria-invalid"
            );

        });


        // Hide success message after 6 seconds
        setTimeout(() => {

            successMessage.hidden = true;

        }, 6000);

    } else {

        /*
            Hide success message if
            there are validation errors.
        */

        successMessage.hidden = true;


        // Focus the first invalid field
        const firstInvalid =
            form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }

    }

});


/* ---------- LIVE VALIDATION ---------- */

fullName.addEventListener(
    "blur",
    validateName
);

email.addEventListener(
    "blur",
    validateEmail
);

phone.addEventListener(
    "blur",
    validatePhone
);

course.addEventListener(
    "change",
    validateCourse
);

password.addEventListener(
    "blur",
    validatePassword
);

confirmPassword.addEventListener(
    "blur",
    validateConfirmPassword
);


/* ---------- RECHECK CONFIRM PASSWORD ---------- */

password.addEventListener(
    "input",
    function() {

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }

    }
);


/* ---------- PHONE INPUT ---------- */

phone.addEventListener(
    "input",
    function() {

        // Allow digits only
        phone.value =
            phone.value.replace(/\D/g, "");

    }
);


/* ---------- SHOW / HIDE PASSWORD ---------- */

togglePassword.addEventListener(
    "click",
    function() {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.textContent =
                "Hide";

            togglePassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            togglePassword.textContent =
                "Show";

            togglePassword.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);


/* ---------- SHOW / HIDE CONFIRM PASSWORD ---------- */

toggleConfirmPassword.addEventListener(
    "click",
    function() {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirmPassword.textContent =
                "Hide";

            toggleConfirmPassword.setAttribute(
                "aria-label",
                "Hide confirm password"
            );

        } else {

            confirmPassword.type = "password";

            toggleConfirmPassword.textContent =
                "Show";

            toggleConfirmPassword.setAttribute(
                "aria-label",
                "Show confirm password"
            );

        }

    }
);