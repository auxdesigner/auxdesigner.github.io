// Create avatar
var imgArray = [
    "001-centaur",
    "002-kraken",
    "003-dinosaur",
    "004-tree-1",
    "005-hand",
    "006-echidna",
    "007-robot",
    "008-mushroom",
    "009-harpy",
    "010-phoenix",
    "011-dragon-1",
    "012-devil",
    "013-troll",
    "014-alien",
    "015-minotaur",
    "016-madre-monte",
    "017-satyr",
    "018-karakasakozou",
    "019-pirate",
    "020-werewolf",
    "021-scarecrow",
    "022-valkyrie",
    "023-curupira",
    "024-loch-ness-monster",
    "025-tree",
    "026-cerberus",
    "027-gryphon",
    "028-mermaid",
    "029-vampire",
    "030-goblin",
    "031-yeti",
    "032-leprechaun",
    "033-medusa",
    "034-chimera",
    "035-elf",
    "036-hydra",
    "037-cyclops",
    "038-pegasus",
    "039-narwhal",
    "040-woodcutter",
    "041-zombie",
    "042-dragon",
    "043-frankenstein",
    "044-witch",
    "045-fairy",
    "046-genie",
    "047-pinocchio",
    "048-ghost",
    "049-wizard",
    "050-unicorn"
];

function randomImage() {
    var imageDOM = document.getElementById('random-photo');
    var randomImage = imgArray[Math.floor(Math.random() * imgArray.length)];
    imageDOM.src = "svg/" + randomImage + ".svg";
}
randomImage();


// Create sliders
var stats = ['str', 'dex', 'const', 'int', 'wis', 'char'];

for (i = 0; i < stats.length; i++) {
    createSlider(stats[i]);
}

var sliderArray = [];

function createSlider(name) {

    var sliderID = name + '-slider';
    var sliderValueID = name + '-val';
    var sliderValueDOM = document.getElementById(sliderValueID);
    var sliderObj = document.getElementById(sliderID);
    var randomize = document.getElementById('randomize');


    noUiSlider.create(sliderObj, {
        start: Math.floor(Math.random() * 100),
        connect: 'lower',
        step: 1,
        range: {
            'min': 0,
            'max': 100
        }
    });

    sliderObj.noUiSlider.on('update', function(values, handle) {
        sliderValueDOM.innerHTML = (Math.round(values[handle]));
    });

    randomize.addEventListener('click', function() {
        randomImage();
        sliderObj.noUiSlider.set(Math.floor(Math.random() * 100));
    });
}


// Image download
var node = document.getElementById('card');
var save = document.getElementById('save');
save.addEventListener('click', function() {
    domtoimage.toBlob(node)
        .then(function(blob) {
            window.saveAs(blob, 'card.png');
        });
});


// Randomize
var randomize = document.getElementById('randomize');
randomize.addEventListener('click', function() {
    randomImage();
    for (i = 0; i < stats.length; i++) {

    }
});