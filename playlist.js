window.onload = init;
function init() {
    var button = document.getElementById("addButton");
    button.onclick = handleButtonClick;
    loadPlaylist();
}
function handleButtonClick() {
    var textInput = document.getElementById("songTextInput");
    var songName = textInput.value;
    textInput.value = "";
    if (songName) {
        if (songName[0] != " ") {
            var li = document.createElement("li");
            var ul = document.getElementById("playlist");
            li.innerHTML = songName;
            ul.appendChild(li);
            save(songName);
        }

    }
}