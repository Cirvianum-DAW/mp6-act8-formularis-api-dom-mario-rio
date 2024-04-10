document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //Obtenim tots els valos entrats al formulari
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dni = document.getElementById('dni').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;
    const conditions = document.getElementById('conditions').checked;

    //Validacions:

    //1. Tots els camps del formulari són obligatoris. Heu de mostrar un missatge d'alerta si algun camp no està omplert.
    if (!name || !surname || !email || !password || !dni || !birthdate || !gender) {
        alert('Hi ha camps del formulari buits.');
        return;
    }
    if (!conditions) {
        alert("Has d'acceptar els termes i condicions.");
        return;
    }

    //2. La contrasenya ha de tenir com a mínim 6 caràcters. Heu de mostrar un missatge d'alerta si la contrasenya és massa curta.
    if (password.length < 6) {
        alert("La contrasenya ha de tenir més de 6 caràcters.");
        return;
    }

    //3. L'adreça de correu electrònic ha de tenir un format vàlid. Utilitzeu l'expressió regular proporcionada a continuació per validar l'adreça de correu electrònic:
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        alert("L'adreça de correu electrònic no és vàlida.");
        return;
    }

    //4. L'usuari ha de ser major d'edat per registrar-se. Aquesta validació depèn de la data de naixement proporcionada. Heu de calcular l'edat de l'usuari i mostrar un missatge d'alerta si és menor de 18 anys.
    const today = new Date();
    const birthdateInput = document.getElementById('birthdate').value;
    const birthdateParts = birthdateInput.split('-');
    const birthdateDate = new Date(birthdateParts[0], birthdateParts[1] - 1, birthdateParts[2]);
    const age = today.getFullYear() - birthdateDate.getFullYear();

    if (today.getMonth() < birthdateDate.getMonth() || (today.getMonth() === birthdateDate.getMonth() && today.getDate() < birthdateDate.getDate()) || age < 18) {
        alert("Has de ser major d'edat per registrar-te.");
        return;
    }

    //5. El camp del DNI/NIF ha de tenir un format vàlid. Utilitzeu l'expressió regular proporcionada a continuació per validar aquest camp:
    const dniRegex = /^[a-zA-Z0-9]?[0-9]{7,8}[a-zA-Z0-9]?$/;
    if (!dniRegex.test(dni)) {
        alert("El DNI/NIF no és vàlid.");
        return;
    }

    const formData = {
        name,
        surname,
        email,
        password,
        dni,
        birthdate,
        gender,
    }

    sessionStorage.setItem('formData', JSON.stringify(formData));

    const storedFormData = sessionStorage.getItem('formData');
    console.log(storedFormData);

    window.location.href = 'exercici2.html';
}) 