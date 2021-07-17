// select DOM
function DOM(ele) {
    return document.querySelector(ele);
}

// click 
function click(ele, func) {
    DOM(ele).addEventListener('click', func);
}

// show
function show(ele) {
    DOM(ele).style.display = 'block';
}

// hide
function hide(ele) {
    DOM(ele).style.display = 'none';
}

// change img
function changeImg(img, newSrc) {
    DOM(img).src = newSrc;
}

// fade out
function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .02) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

// fade in
function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .01) >= 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

// file name
function fileName() {
    var string = window.location.pathname.split("/").pop(); // get filename.html
    return string.substring(0, string.length - 5); // remove .html
}

// logic
function addLogic() {
    document.querySelectorAll('.btn').forEach((btn, index) => {

        // change image
        function changeImgBasedOnIndex() {
            adjIndex = index + 1; // by default, index is 0, make it 1 for file name
            changeImg("img", "img/" + fileName() + adjIndex + ".png") // show cell1.png
        }

        // for each button, add a click event
        btn.addEventListener('click', event => {

            // fade effect if skip
            if(event.target.classList.contains('skip')) {
                // message
                fadeOut(DOM('.slide'));
                setTimeout(function(){ 
                    fadeIn(DOM('.slide'));
                    fadeIn(DOM('.msg'));
                    DOM('.msg').innerHTML = msgArray[index]; // get msg string

                    // image 
                    changeImgBasedOnIndex();
                }, 1000);            
            }
            else {
                // message
                show('.msg'); // show msg div
                DOM('.msg').innerHTML = msgArray[index]; // get msg string

                // image
                changeImgBasedOnIndex();
            }

            
        })
    })
};

// clear localStorage
document.querySelector('a').addEventListener("click", function() {
    localStorage.clear();
});