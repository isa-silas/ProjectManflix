function post_it(url, body) {
    let request = new XMLHttpRequest
    request.onreadystatechange = function ()  
    {
        if (request.readyState === 4) 
        {
            response(request.status, request.responseText) 
        }
    };

    request.open("POST", url, true)
    request.setRequestHeader("Content-type", "application/json")
    request.send(JSON.stringify(body))
    }



export default function register() {
    event.preventDefault()
    let url = "http://127.0.0.1:8000/users/"
    
    let name = document.querySelector("#name").value
    let idUser = document.querySelector("#idUser").value
    let email = document.querySelector("#email").value;
    let phone = document.querySelector("#phone").value
    let active = document.querySelector("#active").value;
    
    body = {
        "name": name,
        "idUser": idUser,
        "email": email,
        "phone": phone,
        "active": active,
        "signaturesFK":1
    }

        fetch(url)
            .then((response) => {
                let json = response.json();
                return json
            })
            .then((json) => {
                    post_it(url, body)
                    alert("Your password confirmation do not match the first one!")
                    // window.location.href = "http://127.0.0.1:5501/html/index.html"
            }
            )}
    
