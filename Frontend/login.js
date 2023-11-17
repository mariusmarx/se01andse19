const form = document.getElementById('form');

const email = document.getElementById('email');
const password = document.getElementById('password');
const errorMessage = document.getElementById('error-message')

form.addEventListener('submit', e => {
	e.preventDefault();

	checkInputs();
});

function checkInputs() {
	//get the values from the inputs
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();

	var inputsAreValid = true

	if (emailValue === '') {
		inputsAreValid = false
		setErrorFor(errorMessage, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		inputsAreValid = false
		setErrorFor(errorMessage, 'Not a valid email');
	}

	if (passwordValue === '') {
		inputsAreValid = false
		setErrorFor(errorMessage, 'Password cannot be blank');
	}

	if (inputsAreValid) {
		requestLogin(emailValue,passwordValue)
	}
}

async function requestLogin(emailValue, passwordValue) {
	try {
		const { data } = await axios.post("https://se01andse19-q5eo4wheta-ew.a.run.app/users/login", {
			email:emailValue,
			password:passwordValue,
		});

		localStorage.setItem("authToken", data.token);

		window.location.href = "/";
	} catch (error) {
        if(typeof error === 'string' || error instanceof String){
		    setErrorFor(errorMessage, error);
        }else{
            setErrorFor(errorMessage, error.response.data.error);
        }
		setTimeout(() => {
			setErrorFor(errorMessage, "");
		}, 5000);
	}
}

function setErrorFor(input, message) {
    if (message) {
        input.classList.remove("hidden");
    } else {
        input.classList.add("hidden");
    }
    input.innerText = message;
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}