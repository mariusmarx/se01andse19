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