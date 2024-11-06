const apiUrl = 'https://672863f4270bd0b975553389.mockapi.io/cruddata/User';
const userForm = document.getElementById('userForm');
const messageDiv = document.createElement('div');
messageDiv.classList.add("message")
document.body.appendChild(messageDiv);

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

  let valid = true;

  // Username validation

  if (name.trim() === "") {
    nameError.textContent = 'Username is not required*';
    nameError.style.color = "red";
    nameError.style.fontSize = "15px";
    nameError.style.paddingLeft = "27px";
    valid = false;
     
  } else {
    nameError.textContent = '';
  }

  // Email validation

  if (email.trim() === "") {
    emailError.textContent = 'Email is not required*';
    emailError.style.color = "red";
    emailError.style.fontSize = "15px";
    emailError.style.paddingLeft = "27px";
    
    valid = false;
      
  } else {
    emailError.textContent = '';
  }

  // Password validation

  if (password.trim() === "") {
    passwordError.textContent = 'Password is not required*';
    passwordError.style.color = "red";
    passwordError.style.fontSize = "15px";
    passwordError.style.paddingLeft = "27px";
    valid = false;
     
  } else {
    passwordError.textContent = '';
  }
if (!valid) { return
    
}
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            messageDiv.textContent = 'User added successfully!';
            messageDiv.style.color = 'green';

            userForm.reset();
        } else {
            messageDiv.textContent = 'Failed to add user';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'Network error';
        messageDiv.style.color = 'red';
    }
});

fetch(apiUrl)
.then(res => res.json())
.then( data => console.log(data)
)
