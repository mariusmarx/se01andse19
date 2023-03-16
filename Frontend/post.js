const date = document.getElementById('date');
const category = document.getElementById('category');
const heading = document.getElementById('heading');
const image = document.getElementById('image');
const subheadline = document.getElementById('subheadline');
const textmain = document.getElementById('textmain');
const imageheading = document.getElementById('imageheading');
const image2 = document.getElementById('image2');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

if (id) {
    loadBlog()
}

async function loadBlog() {
    try {
        const { data } = await axios.post("http://localhost:5000/blogs/getBlog", { blogId: id });
        console.log(data)
        heading.innerText = data.blog.heading
        text.innerText = data.blog.text
    } catch (error) {
        console.log(error)
    }
}