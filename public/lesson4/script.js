function main() {
    var socket = io.connect('http://localhost:3000');
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var buttonSub = document.getElementById('submit');
    var buttonDel = document.getElementById('del');

    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    buttonSub.onclick = handleSubmit;

    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
    }

    function handleDelete(evt) {
        socket.emit('delete messages');
    }

    buttonDel.onclick = handleDelete;
    socket.on('display message', handleMessage);

    function deleteTags() {
        var pArray = document.querySelectorAll("p");
        for (var i = 0; i < pArray.length; i++ ) {
            pArray[i].parentNode.removeChild(pArray[i]);
        }
    }

    socket.on("delete tags", deleteTags)
} // main closing bracket

window.onload = main;