

let editingUserId = null; 
async function MyButton(event) {
    event.preventDefault(); 
  
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    let nameError = document.getElementById('nameError');
    let emailError = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');
  
    let valid = true;
  
    if (userName.trim() === "") {
        nameError.textContent = "Username is required*";
        nameError.style.color = "red";
        nameError.style.fontSize = "13px";
        nameError.style.paddingLeft = "40px";
        valid = false;
    } else {
        nameError.textContent = '';
    }
  
    if (email.trim() === "") {
        emailError.textContent = "Email is required*";
        emailError.style.color = "red";
        emailError.style.fontSize = "13px";
        emailError.style.paddingLeft = "40px";
        valid = false;
    } else {
        emailError.textContent = '';
    }
  
    if (password.trim() === "") {
        passwordError.textContent = "Password is required*";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "13px";
        passwordError.style.paddingLeft = "40px";
        valid = false;
    } 
    else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters.";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "13px";
        passwordError.style.paddingLeft = "15px";
        valid = false;
    }
    else {
        passwordError.textContent = '';
    }
    
    if (valid) {
        const data = {
            userName: userName,
            email: email,
            password: password,
        };

        try {
            let response;
            if (editingUserId) {
                response = await fetch(`https://672863f4270bd0b975553389.mockapi.io/cruddata/User/${editingUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } else {
                response = await fetch('https://672863f4270bd0b975553389.mockapi.io/cruddata/User', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }

            if (response.ok) {
                const result = await response.json();
                console.log(editingUserId ? "User updated successfully:" : "User created successfully:", result);
                alert(editingUserId ? "User updated successfully!" : "User created successfully!");
                document.getElementById('userForm').reset(); 
                editingUserId = null; 
                fetchUserData();
            } else {
                throw new Error(editingUserId ? "Update failed" : "Creation failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error submitting the form.");
        }
    }
}

async function fetchUserData() {
    try {
        const response = await fetch('https://672863f4270bd0b975553389.mockapi.io/cruddata/User');
        if (response.ok) {
            const users = await response.json();
            displayTable(users);
        } else {
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayTable(users) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; 

    users.forEach(user => {
        const row = `<tr>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button class="btn bg-success "onclick="editUser(${user.id})" >Edit</button>
                <button class="btn bg-danger " onclick="deleteUser(${user.id})" >Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

async function editUser(id) {
    try {
        const response = await fetch(`https://672863f4270bd0b975553389.mockapi.io/cruddata/User/${id}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById('userName').value = user.userName;
            document.getElementById('email').value = user.email;
            document.getElementById('password').value = user.password;
            editingUserId = id; 
        } else {
            throw new Error("Failed to fetch user data");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


async function deleteUser(id) {
    try {
        const response = await fetch(`https://672863f4270bd0b975553389.mockapi.io/cruddata/User/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert("User deleted successfully");
            fetchUserData(); 
        } else {
            throw new Error("Failed to delete user");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchUserData();
