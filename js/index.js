//check if local storage has mian color
let color = localStorage.getItem("main_color");
if (color != null) {
    document.documentElement.style.setProperty('--main-color', color);
    let colors = document.querySelectorAll(`.list_colors>li`);
    remove_active(colors, document.querySelector(`[data-color="${color}"]`));
}

//Start Toggle icon
document.querySelector(`.gIcon`).onclick = function() {
    this.classList.toggle(`fa-spin`);
    document.querySelector(`.options`).classList.toggle("open");
}

//Start change colors
let colors = document.querySelectorAll(`.list_colors>li`);
colors.forEach(function(li) {
    li.addEventListener("click", function(event) {
        colors.forEach((e) => { e.classList.remove("active") })
        this.classList.add("active");
        document.documentElement.style.setProperty('--main-color', event.target.dataset.color);
        localStorage.setItem("main_color", event.target.dataset.color);
    })
});
// reset button
let button = document.querySelector(`.options .reset`);
button.onclick = function() {
    localStorage.removeItem("main_color");
    localStorage.removeItem("backOption");
    localStorage.removeItem("bulletOption");
    window.location.reload();
};
//end reset button

// //Start Change background randomly

let backgroundOption;

let background_interval;

let options = document.querySelectorAll(`.random_bg ul li`);
randomizeImgs()
document.querySelectorAll(`.random_bg ul li`).forEach(button => {
    button.addEventListener("click", function(event) {
        remove_active(document.querySelectorAll(`.random_bg ul li`), event.target);
        if (event.target.dataset.option == "true") {
            backgroundOption = true;
            localStorage.setItem("backOption", true);
        } else {
            backgroundOption = false;
            localStorage.setItem("backOption", false);
        }
        randomizeImgs(event.target);
    })
});

function randomizeImgs(option) {
    if (localStorage.getItem("backOption") != null) {
        backgroundOption = localStorage.getItem("backOption");
    } else {
        backgroundOption = "true";
    }
    if (backgroundOption === "true") {
        remove_active(options, options[0]);
        let array_of_imgs = [21, 22, 23, 24, 25, 26]
        background_interval = setInterval(() => {
            let rand_num = Math.floor(Math.random() * array_of_imgs.length);
            document.querySelector(`.landing-page`).style.backgroundImage = `url("img/back${array_of_imgs[rand_num]}.jpg")`;
        }, 8000);
    } else {
        remove_active(options, options[1]);
        clearInterval(background_interval);
    }
}

// //End Change background randomly

// Start bullets
function bullets() {
    let bulletOption;
    if (localStorage.getItem("bulletOption") != null) {
        bulletOption = localStorage.getItem("bulletOption");
    } else {
        bulletOption = true;
    }
    if (bulletOption == true) {
        localStorage.setItem("bulletOption", true);
        document.querySelector(`.bullets`).style.display = "flex";
        remove_active(document.querySelectorAll(`.bullet ul li`), document.querySelectorAll(`.bullet ul li`)[0]);
    } else {
        localStorage.setItem("bulletOption", false);
        document.querySelector(`.bullets`).style.display = "none";
        remove_active(document.querySelectorAll(`.bullet ul li`), document.querySelectorAll(`.bullet ul li`)[1]);
    }
}
document.querySelectorAll(`.bullet ul li`).forEach(button => {
    button.addEventListener("click", function(event) {
        bullets();
        remove_active(document.querySelectorAll(`.bullet ul li`), event.target);
        if (event.target.dataset.option == "true") {
            document.querySelector(`.bullets`).style.display = "flex";
            localStorage.setItem("bulletOption", true);
        } else {
            document.querySelector(`.bullets`).style.display = "none";
            localStorage.setItem("bulletOption", false);
        }
    })
});
//End bullets

//Start header
let toggle_icon = document.querySelector(`.header-area .toggle-menu`);
toggle_icon.onclick = function() {
    document.querySelector(`.header-area ul`).classList.toggle("open");
    console.log(document.querySelector(`.header-area ul`))
};
//End header
//Start About
let skills = document.querySelector(`.our-skills`);
window.onscroll = function() {
    // height of part above department skills
    let skillsOffsetTop = skills.offsetTop;
    // height of department skills
    let skillsOuterHeight = skills.offsetHeight;
    // window height
    let windowHeight = this.innerHeight;
    // part i scroll it from window
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".our-skills div span span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.prog;
        });
    };
};
//End About
// Start Gallery
let boxes = document.querySelectorAll(`.Our-gallery .box`);
boxes.forEach(function(box) {
    box.addEventListener("click", (event) => {
        document.querySelector(`.popup`).classList.toggle(`open`);
        document.querySelector(`.popup h3`).innerHTML = event.target.dataset.txt;
        document.querySelector(`.popup img`).setAttribute('src', event.target.getAttribute('src'));
        document.querySelector(`.dark`).classList.toggle(`open`);
    });
});
document.querySelector(`.popup span`).addEventListener("click", function() {
    document.querySelector(`.popup`).classList.remove("open");
    document.querySelector(`.dark`).classList.remove(`open`);
});
// End Gallery
function remove_active(arr, active) {
    arr.forEach((ele) => {
        ele.classList.remove("active");
    });
    active.classList.add("active");
}
