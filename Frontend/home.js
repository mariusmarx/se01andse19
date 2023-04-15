var filterItem = document.querySelectorAll('[id=category]');
console.log(filterItem)

//Active to Button
filterItem.forEach((item) => {
  item.addEventListener("click", () => {
    filterItem.forEach((item) => {
      if (item.classList.contains("bg-orange-500")) {
        item.classList.remove("bg-orange-500");
      }
    });
    item.classList.add("bg-orange-500");
  });
});

var filterItem = document.querySelectorAll(".category");
var postBox = document.querySelectorAll(".post-box");

const articleSection = document.getElementById("article-section")

async function loadBlogs() {
  try {
    const { data } = await axios.get("http://localhost:5000/blogs");

    const blogs = data.blogs.reverse()

    const username = await getUsername()
    for (blog of blogs) {
      const postTemplate = `
        <div class="w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg">
                <a href="/blogarticles.html?id=${blog._id}" class="flex flex-wrap no-underline hover:no-underline">
                    <img src="img/img1.jpg" alt="" class="h-full w-full rounded-t pb-6">
                    <p class="w-full text-gray-600 text-xs md:text-sm px-6">${blog.category}</p>
                    <div class="w-full font-bold text-xl text-gray-900 px-6">${blog.heading}</div>
                    <p class="text-gray-800 font-serif text-base px-6 mb-5">${blog.text}</p>
                </a>
            </div>
            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6">
                <div class="flex items-center justify-between">
                    <img class="w-8 h-8 rounded-full mr-4 avatar" data-tippy-content="${blog.username}"
                        src="img/profile1.jpg" alt="Avatar of Author">
                    <p class="text-gray-600 text-xs md:text-sm">${new Date(blog.createdAt).toLocaleString()}</p>
                </div>
                ${username === blog.username ? `<a href="/article.html?id=${blog._id}">Edit your article</a>` : ''}
            </div>
        </div>`;
      articleSection.innerHTML += postTemplate;
    }    

    postBox = document.querySelectorAll(".post-box");

  } catch (error) {
    console.log(error)
  }

}

loadBlogs()

//Filter JS

filterItem.forEach((item) => {
  item.addEventListener("click", () => {
    const value = item.getAttribute("data-filter");
    if (value == "all") {
      postBox.forEach((box) => {
        box.style.display = "block";
      });
    } else {
      postBox.forEach((box) => {
        if (box.classList.contains(value)) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      });
    }
  });
});

//Add Login Button
let login = document.getElementById('login-button')
//console.log(login)
login.addEventListener("click", () => {
  if (isLoggedIn()) {
    logOut()
    location.href = "/"
    return
  }else {
    location.href = "/login.html"
  }
})

if (isLoggedIn()) {
  login.innerHTML = "Logout"
}