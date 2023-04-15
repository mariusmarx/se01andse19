const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const errorMessage = document.getElementById('error-message')

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs () {
    //get the values from the inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    
	var inputsAreValid = true

    if(usernameValue === '') {
		inputsAreValid = false
        setErrorFor(username, 'Username cannot be blank');
    }else {
        //add success
        setSuccessFor(username, '');
    }
    if(emailValue === '') {
		inputsAreValid = false
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		inputsAreValid = false
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email, '');
	}
	
	if(passwordValue === '') {
		inputsAreValid = false
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password, '');
	}
	
	if(password2Value === '') {
		inputsAreValid = false
		setErrorFor(password2, 'Password Check cannot be blank');
	} else if(passwordValue !== password2Value) {
		inputsAreValid = false
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2, '');
	}
	if (inputsAreValid) {
		requestRegistration(emailValue,passwordValue,usernameValue)
	}
}
async function requestRegistration(emailValue, passwordValue,usernameValue) {
	try {
		const { data } = await axios.post("http://localhost:5000/users/register", {
			email:emailValue,
			password:passwordValue,
			username:usernameValue
		});
		localStorage.setItem("authToken", data.token);

		window.location.href = "/";
	} catch (error) {
		console.log(error)
		setErrorFor(errorMessage, error.response.data.error);
		setTimeout(() => {
			setSuccessFor(errorMessage, "");
		}, 5000);
	}
}

function setErrorFor(input, message) {

    input.innerText = message;
}
function setSuccessFor(input, message) {

    input.innerText = message;
}
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}