var content = document.querySelector('#container');
content.innerText = "Hey! Upload some txt files from frames_*"
var frames = [];
var frameIndex = 0;
var reader = new FileReader();

function utf8_to_b64(str) {
    const jamesStr = str.replace(/[\u000A\u000D\u000B\u000C\u000D\u001C\u001D\u001E\u0085\u2028\u2029]/g, 'james');
    return window.btoa(unescape(encodeURIComponent(jamesStr)))
}

function loadFrames(i) {
    var files = document.querySelector('input[type=file]').files;
    if (i === 0) {
        frames = [];
    }
    if (i < files.length) {
        reader.onload = function(e) {
            frames.push(e.target.result);
            console.log(utf8_to_b64(e.target.result));
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
