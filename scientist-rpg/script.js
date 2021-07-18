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
function markedAsClicked(elm) {
    elm.classList.add("clicked");
}

// gray out btn
function markasDisabled(elm) {
    elm.classList.add("disabled");
}

// file name
function fileName() {
    var string = window.location.pathname.split("/").pop(); // get filename.html
    return string.substring(0, string.length - 5); // remove .html
}

// logic
function addLogic() {
    // init time
    function getTime() {
        if (!localStorage.getItem('time')) {
            localStorage.setItem('time', "8:30 am");
        }
        DOM('.time').innerHTML = localStorage.getItem('time');
    }
    getTime();

    document.querySelectorAll('.btn').forEach((btn, index) => {
        var adjIndex = index + 1; // by default, index is 0, make it 1
        var itemName = fileName() + '-btn' + adjIndex;

        // check clicked or disabled buttons on load
        checkIfGrayOut(btn);

        // for each button, add a click event
        btn.addEventListener('click', event => {
            // if button is disbaled, don't add logic
            if (event.target.classList.contains('disabled')) {
                console.log("Oops. Looks like you're not ready yet!");
            } else {
                clickableButtonLogic();
            }

            function clickableButtonLogic() {
                // fade effect if skip
                if (event.target.classList.contains('skip')) {
                    // message
                    fadeOut(DOM('.slide'));
                    setTimeout(function() {
                        fadeIn(DOM('.slide'));
                        fadeIn(DOM('.msg'));
                        DOM('.msg').innerHTML = msgArray[index]; // get msg string
                        updateTime();
                        // image 
                        changeImgBasedOnIndex();
                    }, 1000);
                }
                // no fade effet if not skip
                else {
                    // message
                    show('.msg'); // show msg div
                    DOM('.msg').innerHTML = msgArray[index]; // get msg string
                    updateTime();
                    // image
                    changeImgBasedOnIndex();
                }

                // gray out clicked button
                markedAsClicked(event.target);

                // add event to local storage
                addToLocalStorage();

                // enable button on the same page if dependency is met
                document.querySelectorAll('.btn').forEach((btn) => {
                    if (btn.hasAttribute("data-depend") && localStorage.getItem(btn.getAttribute('data-depend')) === 'yes') {
                        btn.classList.remove('disabled');
                    }
                });
            }
        });

        // if item is clicked or dependency is not met, gray it out
        function checkIfGrayOut(btn) {
            // if item is clicked
            if (localStorage.getItem(itemName) === 'yes') {
                markedAsClicked(btn);
            }
            // if item has data-depend and it's not met
            if (btn.hasAttribute("data-depend") && localStorage.getItem(btn.getAttribute('data-depend')) != 'yes') {
                markasDisabled(btn);
            }
        }

        // add to local storage 
        function addToLocalStorage() {
            localStorage.setItem(itemName, 'yes');
            // console.log(itemName);
        }

        // change to the right image
        function changeImgBasedOnIndex() {
            changeImg("img", "img/" + fileName() + adjIndex + ".png") // show cell1.png
        }

        // update time
        function updateTime() {
            localStorage.setItem('time', timeArray[index]);
            DOM('.time').innerHTML = localStorage.getItem('time');
        }
    })
}

// keyboard shortcut to clear storage
// function doc_keyUp(e) {
//     if (e.ctrlKey && e.key === 'ArrowDown') {
//         localStorage.clear();
//     }
// }
// document.addEventListener('keyup', doc_keyUp, false);

// return all localStorage
function returnAllStorage() {
    var archive = [],
        keys = Object.keys(localStorage),
        i = 0,
        key;

    for (; key = keys[i]; i++) {
        archive.push(key + '=' + localStorage.getItem(key));
    }

    console.log(archive);
}

returnAllStorage();

// sequence
var quest = [
    'desktop-btn1',
    'desktop-btn2',
    'warm-btn1',
    'fridge-btn1',
    'laptop-btn1',
    'cells-btn1',
    'tube-btn1',
    'tube-btn2',
    'tube-btn3',
    'laptop-btn2',
    'laptop-btn3',
    'incubation-btn1',
    'laptop-btn4',
    'microscope-btn1',
    'microscope-btn2',
    'microscope-btn3',
    'incubation-btn2',
    'incubation-btn3',
    'incubation-btn4',
    'laptop-btn5',
    'elisa-btn1',
    'laptop-6'
]

// TODO: for each btn, add data-depend attr. find the item, add the next item name as data-depend