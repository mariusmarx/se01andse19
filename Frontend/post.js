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
console.log(id)
if (id) {
    loadBlog()
}

async function loadBlog() {
    try {
        const { data } = await axios.post("http://localhost:5000/blogs/getBlog", { blogId: id });
        console.log(data)
        date.innerText = data.blog.createdAt;
        category.innerText = data.blog.category;
        heading.innerText = data.blog.heading;
        image.src = data.blog.image;
        subheadline.innerText = data.blog.subheadline;
        textmain.innerText = data.blog.textmain;
        imageheading.innerText = data.blog.imageheading;
        image2.src = data.blog.image2;
    } catch (error) {
        console.log(error)
    }
}