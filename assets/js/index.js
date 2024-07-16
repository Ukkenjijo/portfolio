const usernameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const subjectEl = document.getElementById('subject');
const messageEl = document.querySelector('textarea[name="message"]');
const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true; // Reset form validity at the start of each submission

    // Validate username
    if (usernameEl.value.trim() === "") {
        document.getElementById("error-name").innerHTML ="<p style='color:red;text-align:center;'>"+ "Enter name" + "</p>";
        isFormValid = false;
    } else {
        document.getElementById("error-name").innerHTML = "";
    }

    // Validate email
    if (emailEl.value.trim() === "") {
        document.getElementById("error-email").innerHTML =" <p style='color:red;text-align:center;'>"+ "Enter email" + "</p>";
        isFormValid = false;
    } else {
        document.getElementById("error-email").innerHTML = "";
    }

    // Validate subject
    if (subjectEl.value.trim() === "") {
        document.getElementById("error-subject").innerHTML =" <p style='color:red;text-align:center;'>"+ "Enter subject" + "</p>";
        isFormValid = false;
    } else {
        document.getElementById("error-subject").innerHTML = "";
    }

    if (isFormValid) {
        sendMail()
    }
});

function sendMail(){
    const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});
}