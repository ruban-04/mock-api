
// let editingRow = null; 
// const apiUrl = 'https://672863f4270bd0b975553389.mockapi.io/cruddata/User';
// const userForm = document.getElementById('userForm');
// const messageDiv = document.createElement('div');
// messageDiv.classList.add("message")
// document.body.appendChild(messageDiv);

// userForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     const nameError = document.getElementById('nameError');
//     const emailError = document.getElementById('emailError');
//     const passwordError = document.getElementById('passwordError');

//   let valid = true;

//   // Username validation

//   if (name.trim() === "") {
//     nameError.textContent = 'Username is not required*';
//     nameError.style.color = "red";
//     nameError.style.fontSize = "15px";
//     nameError.style.paddingLeft = "30px";
//     valid = false;
     
//   } else {
//     nameError.textContent = '';
//   }

//   // Email validation

//   if (email.trim() === "") {
//     emailError.textContent = 'Email is not required*';
//     emailError.style.color = "red";
//     emailError.style.fontSize = "15px";
//     emailError.style.paddingLeft = "30px";
    
//     valid = false;
      
//   } else {
//     emailError.textContent = '';
//   }

//   // Password validation

//   if (password.trim() === "") {
//     passwordError.textContent = 'Password is not required*';
//     passwordError.style.color = "red";
//     passwordError.style.fontSize = "15px";
//     passwordError.style.paddingLeft = "30px";
//     valid = false;
     
//   } else {
//     passwordError.textContent = '';
//   }
// if (!valid) { return

// }
//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, email, password }),
//         });

//         if (response.ok) {
//             messageDiv.textContent = 'User added successfully!';
//             messageDiv.style.color = 'green';

//             userForm.reset();
//         } else {
//             messageDiv.textContent = 'Failed to add user';
//             messageDiv.style.color = 'red';
//         }
//     } catch (error) {
//         messageDiv.textContent = 'Network error';
//         messageDiv.style.color = 'red';
//     }
    
//   if (valid) {
//     if (editingRow) {
      
      
//       editingRow.cells[0].innerHTML = name.value;
//       editingRow.cells[1].innerHTML = email.value;
//       editingRow.cells[2].innerHTML = password.value;
  
//       editingRow = null; 
//     } else {
      
      
//       let tableBody = document.getElementById('table-body');
//       let row = `
//         <tr>
//           <td>${name.value}</td>
//           <td>${email.value}</td>
//           <td>${password.value}</td>
          
//           <td>
//             <button class="btn bg-success edit-btn">Edit</button>
//             <button class="btn bg-danger delete-btn">Delete</button>
//           </td>
//         </tr>`;

//       tableBody.innerHTML += row;
//     }

//     form.reset(); 
    
//   }
// });

// // fetch(apiUrl)
// // .then(res => res.json())
// // .then( data => console.log(data)
// // )


let editingRow = null; 
const apiUrl = 'https://672863f4270bd0b975553389.mockapi.io/cruddata/User';
const userForm = document.getElementById('userForm');
const messageDiv = document.createElement('div');
messageDiv.classList.add("message");
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
        nameError.textContent = 'Username is required*';
        nameError.style.color = "red";
        nameError.style.fontSize = "15px";
        nameError.style.paddingLeft = "30px";
        valid = false;
    } else {
        nameError.textContent = '';
    }

    // Email validation
    if (email.trim() === "") {
        emailError.textContent = 'Email is required*';
        emailError.style.color = "red";
        emailError.style.fontSize = "15px";
        emailError.style.paddingLeft = "30px";
        valid = false;
    } else {
        emailError.textContent = '';
    }

    // Password validation
    if (password.trim() === "") {
        passwordError.textContent = 'Password is required*';
        passwordError.style.color = "red";
        passwordError.style.fontSize = "15px";
        passwordError.style.paddingLeft = "30px";
        valid = false;
    } else {
        passwordError.textContent = '';
    }

    if (!valid) return;

    // If valid, attempt to add or update the user
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
            if (editingRow) {
                editingRow.cells[0].textContent = name;
                editingRow.cells[1].textContent = email;
                editingRow.cells[2].textContent = password;
                editingRow = null;
            } else {
                addTableRow(name, email, password);
            }
        } else {
            messageDiv.textContent = 'Failed to add user';
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        messageDiv.textContent = 'Network error';
        messageDiv.style.color = 'red';
    }
});

function addTableRow(name, email, password) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = email;
    row.appendChild(emailCell);

    const passwordCell = document.createElement('td');
    passwordCell.textContent = password;
    row.appendChild(passwordCell);

    const actionsCell = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'bg-success', 'edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editUser(row, name, email, password));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'bg-danger', 'delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteUser(row));

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
}

function editUser(row, name, email, password) {
    editingRow = row;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
}

function deleteUser(row) {
    const tableBody = document.getElementById('table-body');
    tableBody.removeChild(row);
}

async function fetchUsers() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        data.forEach(user => {
            addTableRow(user.name, user.email, user.password);
        });
    } catch (error) {
        messageDiv.textContent = 'Error fetching users';
        messageDiv.style.color = 'red';
    }
}

window.onload = fetchUsers;
