var content = document.querySelector('#container');
var frames = [];
var frameIndex = 0;
var reader = new FileReader();

function loadFrames(i) {
    var files = document.querySelector('input[type=file]').files;
    if (i === 0) {
        frames = [];
    }
    if (i < files.length) {
        reader.onload = function(e) {
            frames.push(e.target.result);
            loadFrames(i+1);
        }
        reader.readAsText(files[i])
    }
}

setInterval(function() {
    if (++frameIndex > frames.length - 1) {
        frameIndex = 0;
    }
    var frame = frames[frameIndex];
    if (frame) {
        content.innerText = frame
    }
}, 50)
