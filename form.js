const chatLog = document.getElementById('chat-log');
const message = document.getElementById('message');
const form = document.querySelector('form');
const spinner = document.createElement('div');
spinner.classList.add('loader');
let messages = [];

document.addEventListener('DOMContentLoaded', function(event) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = message.value;
        const newMessage = {"role": "user", "content": `${messageText}`};
        messages.push(newMessage);
        message.value = '';
        const messageElement = document.createElement('div');
        messageElement.classList.add('user')
        messageElement.innerHTML = messageText
        chatLog.appendChild(messageElement);
        chatLog.appendChild(spinner);
        chatLog.scrollTop = chatLog.scrollHeight;
        fetch('http://localhost:3000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages
            })
        })
        .then(res => res.json())
        .then(data => {
            let newAssistantMessage = {"role": "assistant", "content": `${data.completion.content}`};
            messages.push(newAssistantMessage);
            const messageElement = document.createElement('div');
            messageElement.classList.add('bot');
            messageElement.innerHTML = data.completion.content;
            chatLog.removeChild(spinner);
            chatLog.appendChild(messageElement);
            chatLog.scrollTop = chatLog.scrollHeight;
        })
    });
});