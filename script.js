let counter = document.querySelector(".counter");
let display = document.querySelector(".display");
let reset = document.querySelector(".reset-btn");
let dropdown_item2 = document.querySelector(".dropdown-item2");
let background = document.querySelector(".background");
let images = document.querySelector(".images");
let dropdown_item3 = document.querySelector(".dropdown-item3");
let dropdown_item4 = document.querySelector(".dropdown-item4");
let dropdown_item1 = document.querySelector(".dropdown-item1");
let image_default = document.querySelector(".img-default");
let total_counter = document.querySelector(".total-counter");
let zikr_container = document.querySelector(".zikr-container");

counter.onclick = function () {
  let number = parseInt(display.innerHTML);
  display.innerHTML = ++number;
  localStorage.setItem("display", display.innerHTML);
  total();
};

function total() {
  let number = parseInt(total_counter.innerHTML);
  total_counter.innerHTML = ++number;
  localStorage.setItem("total", total_counter.innerHTML);
}

reset.onclick = function () {
  display.innerHTML = 0;
  localStorage.setItem("display", display.innerHTML);
};

dropdown_item2.onclick = function () {
  zikr_container.style.display = "none";

  images.style.display = "none";

  background.style.display = "flex";
};
background.onclick = function (e) {
  let img = e.target;
  if (img.src != null) {
    localStorage.setItem("background", img.src);
    document.body.style.backgroundImage = `url(${localStorage.getItem(
      "background"
    )})`;
  }
};

dropdown_item3.onclick = function () {
  zikr_container.style.display = "none";
  background.style.display = "none";

  images.style.display = "flex";
};
images.onclick = function (e) {
  let img = e.target;
  if (img.src != null) {
    localStorage.setItem("image", img.src);
    document.querySelector(".img-default").src = localStorage.getItem("image");
  }
};

let images_btn = document.querySelector(".images-btn");

images_btn.onclick = function () {
  images.style.display = "none";
};

let background_btn = document.querySelector(".background-btn");

background_btn.onclick = function () {
  background.style.display = "none";
};

dropdown_item4.onclick = function () {
  localStorage.setItem("total_display", "flex");
  total_counter.style.display = localStorage.getItem("total_display");
};
total_counter.onclick = function () {
  localStorage.setItem("total_display", "none");
  total_counter.style.display = localStorage.getItem("total_display");
};

var zikr = document.querySelector(".zikr");
zikr.onclick = function () {
  background.style.display = "none";
  images.style.display = "none";

  document.querySelector(".zikr-container").style.display = "flex";
};

let dropdown_item5=document.querySelector(".dropdown-item5");

dropdown_item5.onclick=function(){
    background.style.display = "none";
  images.style.display = "none";

  document.querySelector(".zikr-container").style.display = "flex";
}

let zikr_btn = document.querySelector(".zikr-btn");

zikr_btn.onclick = function () {
  zikr_container.style.display = "none";
};

zikr_container.onclick = function (e) {
  console.log(e.target.classList);
  if (
    e.target.classList.length === 0 ||
    e.target.classList.contains("text-light")
  ) {
    document.querySelector(".zikr").innerHTML = "";
    localStorage.setItem("zikr", e.target.parentElement.innerHTML);
    document.querySelector(".zikr").innerHTML = localStorage.getItem("zikr");
  }
};

var arr;
arr = JSON.parse(localStorage.getItem("array")) || [];
dropdown_item1.onclick = function () {
  swal("Done!", "", "success");
  let input = document.createElement("input");

  input.setAttribute("class", "form-control");
  input.setAttribute("placeholder", "Add New Zikr");
  input.style.width = "85%";
  let popup = document.querySelector(".swal-title");
  popup.innerHTML = "";
  popup.appendChild(input);
  let popup_btn = document.querySelector(".swal-button");
  popup_btn.onclick = function () {
    if (input.value !== "") {
      let zikr_box = document.createElement("div");
      let h2 = document.createElement("h2");
      let delete_btn = document.createElement("button");

      h2.textContent = input.value;
      h2.classList.add("text-light");

      delete_btn.textContent = "X";
      delete_btn.style.marginLeft = "10px";
      delete_btn.style.cursor = "pointer";
      delete_btn.classList.add("delete-zikr-btn");

      delete_btn.onclick = function () {
        zikr_box.remove();
        delete_zikr(input.value);
      };

      zikr_box.appendChild(h2);
      zikr_box.appendChild(delete_btn);
      zikr_box.classList.add("zikr-box","user-zikr");

      arr.push(input.value);
      zikr_container.prepend(zikr_box);
      localStorage.setItem("array", JSON.stringify(arr));

            localStorage.setItem("zikr",zikr_box.innerHTML);
      document.querySelector(".zikr").innerHTML = "";
document.querySelector(".zikr").innerHTML = localStorage.getItem("zikr");
    }
  };
};

function delete_zikr(value) {
  let index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1); 
  }
  localStorage.setItem("array", JSON.stringify(arr));
}

window.onscroll = function () {
  let scroll_to_top = document.querySelector(".scroll-to-top");
  if (window.scrollY >= 1200) {
    scroll_to_top.style.display = "inline";
  } else {
    scroll_to_top.style.display = "none";
  }

  scroll_to_top.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
};

function reload() {
  document.body.style.backgroundImage = `url(${
    localStorage.getItem("background") || `images/images.jpeg`
  })`;
  display.innerHTML = localStorage.getItem("display") || 0;
  total_counter.innerHTML =
    localStorage.getItem("total") || total_counter.innerHTML;
  total_counter.style.display = localStorage.getItem("total_display") || "none";
  document.querySelector(".zikr").innerHTML =
    localStorage.getItem("zikr") || zikr.innerHTML;
  zikr_container.querySelectorAll(".user-zikr").forEach(el => el.remove());
  for (let i = 0; i < arr.length; i++) {
    let zikr_box = document.createElement("div");
    let h2 = document.createElement("h2");
    let delete_btn = document.createElement("button");

    h2.textContent = arr[i];
    h2.classList.add("text-light");

    delete_btn.textContent = "X";
    delete_btn.style.marginLeft = "10px";
    delete_btn.style.cursor = "pointer";
    delete_btn.classList.add("delete-zikr-btn");

    delete_btn.onclick = function () {
      zikr_box.remove();
      delete_zikr(arr[i]);
    };

    zikr_box.appendChild(h2);
    zikr_box.appendChild(delete_btn);
    zikr_box.classList.add("zikr-box","user-zikr");

    zikr_container.prepend(zikr_box);
  }

  document.querySelector(".img-default").src =
    localStorage.getItem("image") || image_default.src;
}
reload();



