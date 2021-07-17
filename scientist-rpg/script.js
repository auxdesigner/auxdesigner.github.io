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

// change img src
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

// gray out btn
function grayOut(elm) {
    elm.classList.add("clicked");
}

// file name
function fileName() {
    var string = window.location.pathname.split("/").pop(); // get filename.html
    return string.substring(0, string.length - 5); // remove .html
}

// logic
function addLogic() {
    document.querySelectorAll('.btn').forEach((btn, index) => {
        

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
            // gray out clicked button
            grayOut(event.target);

            // add event to local storage
            addToLocalStorage();
            
        });

        var adjIndex = index + 1; // by default, index is 0, make it 1
        var itemName = fileName() + '-btn' + adjIndex;

        // if button is clicked, gray it out
        function checkIfClicked(btn) {
            //var btnName = fileName() + '-btn' + adjIndex;
            if (localStorage.getItem(itemName) === 'yes') {
                grayOut(btn);
            }
        }
        checkIfClicked(btn);
        
        // add to local storage 
        function addToLocalStorage() {
            localStorage.setItem(itemName, 'yes');
            console.log(itemName);
        }

        // change to the right image
        function changeImgBasedOnIndex() {
            changeImg("img", "img/" + fileName() + adjIndex + ".png") // show cell1.png
        }

        

        function renderBtn(array) {
            // for each item in array, render a button in div
            // add btn, and btn[i] class
            // 
        }
    })
}

// keyboard shortcut to clear storage
function doc_keyUp(e) {
    if (e.ctrlKey && e.key === 'ArrowDown') {
        localStorage.clear();
    }
}
document.addEventListener('keyup', doc_keyUp, false);

// return all localStorage
function returnAllStorage() {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0, key;

    for (; key = keys[i]; i++) {
        archive.push( key + '=' + localStorage.getItem(key));
    }

    console.log(archive);
}

returnAllStorage();