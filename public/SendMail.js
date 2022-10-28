const sendMessage = (e) => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const message = document.getElementById('comment-message').value
    fetch('/api/send', {
        method: "Post",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ subject: name, message: message + ' From ' + email })
    })
}
