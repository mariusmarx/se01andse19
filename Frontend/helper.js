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
		const { data } = await axios.get("https://se01andse19-q5eo4wheta-ew.a.run.app/users/username",config);

        return data.username

	} catch (error) {
        console.log(error)
       return false
	}
}
