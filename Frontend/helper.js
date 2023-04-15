function isLoggedIn() {

    if (localStorage.getItem("authToken")) {
        return true
    } else {
        return false
    }
}

function logOut(){
    localStorage.removeItem("authToken");
}

async function getUsername(){
    if (!isLoggedIn()){
        return false
    }

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

    try {
		const { data } = await axios.get("http://localhost:5000/users/username",config);

        return data.username

	} catch (error) {
        console.log(error)
       return false
	}
}
