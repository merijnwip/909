const socket = new WebSocket('ws://localhost:3000');

document.getElementById('submit').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    socket.send(name);
});