const form = document.getElementById('form');

const category = document.getElementById('category');
const heading = document.getElementById('heading');
const image = document.getElementById('image-input');
const subheadline = document.getElementById('subheadline');
const textmain = document.getElementById('textmain');
const imageheading = document.getElementById('imageheading');
const image2 = document.getElementById('explain-image-input');

const submitButton = document.getElementById("submit-button")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

if (id) {
  loadBlog()

}

async function loadBlog() {
  header.innerText = "Update Article"
  submitButton.innerText = "Update"
  try {
    const { data } = await axios.post("https://se01andse19-q5eo4wheta-ew.a.run.app/blogs/getBlog", { blogId: id });
    console.log(data.blog.heading)
    category.value = data.blog.category
    heading.value = data.blog.heading
    image.value = data.blog.image
    subheadline.value = data.blog.subheadline
    textmain.value = data.blog.textmain
    imageheading.value = data.blog.imageheading
    image2.value = data.blog.image2
    
  } catch (error) {

  }
}

const errorMessage = document.getElementById("error-message")
form.addEventListener('submit', e => {
  e.preventDefault();

  createPost();
});

async function createPost() {
  const categoryValue = category.value
  const headingValue = heading.value.trim()
  const imageValue = image.value.trim()
  const subheadlineValue = subheadline.value.trim()
  const textmainValue = textmain.value.trim()
  const imageheadingValue = imageheading.value.trim()
  const image2Value = image2.value.trim()

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  try {
    if (id) {
      const { data } = await axios.put("https://se01andse19-q5eo4wheta-ew.a.run.app/blogs/blog", {
        category: categoryValue,
        heading: headingValue,
        image: imageValue,
        subheadline: subheadlineValue,
        textmain: textmainValue,
        imageheading: imageheadingValue,
        image2: image2Value,
        blogId: id
      }, config);
      alert(data.message)
      window.location.href = "/";

    } else {
      const { data } = await axios.post("https://se01andse19-q5eo4wheta-ew.a.run.app/blogs/blog", {
        category: categoryValue,
        heading: headingValue,
        image: imageValue,
        subheadline: subheadlineValue,
        textmain: textmainValue,
        imageheading: imageheadingValue,
        image2: image2Value
      }, config);
      alert(data.message)
      window.location.href = "/";

    }


  } catch (error) {
    console.log(error)
    errorMessage.innerText = error.response.data.error
    setTimeout(() => {
      errorMessage.innerText = ""
    }, 5000);
  }

}

/*poster-image upload*/
document.getElementById("poster-image").addEventListener("click", e => {
    e.preventDefault();
    let imageInput = document.getElementById("image-input");
    let image = document.getElementById("image");
    if (imageInput.value) image.src = imageInput.value;
});

/*explain-image upload*/
document.getElementById("explain-image").addEventListener("click", k => {
    k.preventDefault();
    let imageInput = document.getElementById("explain-image-input");
    let image = document.getElementById("image2");
    if (imageInput.value) image.src = imageInput.value;
});

/*adaptive textarea*/
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput() {
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
}