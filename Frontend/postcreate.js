document.getElementById("b").addEventListener("click", e => {
    e.preventDefault();
    let imageInput = document.getElementById("image-input");
    let image = document.getElementById("image");
    if (imageInput.value) image.src = imageInput.value;
});