const key_enter = 13;

function validation(field) {
    return field != null && field.trim() != '';
}

function login() {
    let userName = document.querySelector('#username').value;
    let passWord = document.querySelector('#password').value;
    if (validation(userName) && validation(passWord)) {
        if (userName == "admin" && passWord == "123456") {
            window.location.replace("libaryManager.html");
        } else {
            alert('Wrong usename or password!');
            manager();
        }
    } else if (!validation(userName)) {
        document.querySelector('#warnUse').innerHTML = `Please enter Usename!<br>`;
        manager();
    } else if (!validation(passWord)) {
        document.querySelector('#warnPass').innerHTML = `Please enter Password!<br>`;
        manager();
    }
}

function pressEnter(e) {
    if (e.keyCode == key_enter) {
        login();
    }
}
function manager() {
    document.querySelector('.container').classList.remove('d-none');
    document.querySelector('.who').classList.add('d-none');
}