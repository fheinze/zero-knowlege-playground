const passwordInput1 = document.querySelector('#password1');
const passwordInput2 = document.querySelector('#password2');
const openButton = document.querySelector('#open');

const entryInput = document.querySelector('#entry');
const addEntry = document.querySelector('#add-entry');
const copyButton = document.querySelector('#copy');

const entries = document.querySelector('#entries');

const data = document.querySelector('#data');
const updateData = document.querySelector('#update-data');


function updateLocalStorage(text) {
    localStorage.setItem("entries", text);
}

function loadFromLocalStorage() {
    return localStorage.getItem("entries");
}

function isValidPassword(){
    return passwordInput1.value !== "" && passwordInput1.value.length > 3 && passwordInput1.value === passwordInput2.value;
}

openButton.addEventListener('click', function (e) {
    if(isValidPassword()) {
        const bytes  = CryptoJS.AES.decrypt(loadFromLocalStorage(), passwordInput1.value);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if(decrypted) {
            entries.innerHTML = decrypted;
        } else {
            entries.innerHTML = "WRONG PASSWORD"
        }
    }
});

addEntry.addEventListener('click', function (e) {
    if(isValidPassword()) {
        if(entryInput.value.indexOf("iframe") >= 0) {
            let item = document.createElement('li');
            item.innerHTML = entryInput.value.trim();
            let iframe = item.querySelector("iframe");
            iframe.setAttribute("width", "400");
            iframe.setAttribute("height", "400");
            entries.appendChild(item);
            updateLocalStorage(CryptoJS.AES.encrypt(entries.innerHTML, passwordInput2.value));
        }

    }
    entryInput.value = "";
});

updateData.addEventListener('click', function (e) {
    updateLocalStorage(data.value);
});

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(loadFromLocalStorage());
})
