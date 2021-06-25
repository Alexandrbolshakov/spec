function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});


const block = document.querySelector(".block"),
    titles = document.querySelectorAll('.block__title');

if (titles.length > 0 && block) {
    titles.forEach(title => {
        title.addEventListener('click', () => {
            if (block.classList.contains('one')) {
                if (!title.classList.contains('active')) {
                    resetClasses();
                    title.classList.add('active');
                    title.nextElementSibling.classList.add('show');
                } else {
                    resetClasses();
                }
            } else {
                title.classList.toggle('active');
                title.nextElementSibling.classList.toggle('show');
            }

        });
    });
}

function resetClasses() {
    titles.forEach(title => {
        title.classList.remove('active');
        title.nextElementSibling.classList.remove('show');
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);



        if (error === 0) {
            form.classList.add("_sending");
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
                form.classList.remove("_sending");
            } else {
                alert("Ошибка");
                form.classList.remove("_sending");
            }

        } else {
            alert('Заполните все обязательные поля');
        }

    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");

        formReq.forEach(input => {
            formRemoveError(input);

            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        });

        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,8})+$/.test(input.value);
    }


    const formPreview = document.getElementById("formPreview");



    function uploadFile(file) {


        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть меньше 2MB.');
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        }

        reader.onerror = function (e) {
            alert("Ошибка");
        }

        reader.readAsDataURL(file);
    }

    const buttons = document.querySelectorAll('[href^="#"]');
    buttons.forEach(btn=>{
        btn.addEventListener("click", (e)=>{
            e.preventDefault();
            const id = btn.href.replace(/[^#]*(.*)/, '$1');
            const scrollTo = document.getElementById(id.replace("#",""));
            scrollTo.scrollIntoView({behavior: "smooth"});
        });
    });

    const confirm = document.querySelector('.form__button');
    const notification = document.querySelector('.form__button-confirm');
    if(confirm && notification){
        confirm.addEventListener('click',()=>{
            notification.classList.add('active');
            setInterval(()=>{
                notification.classList.remove('active')
            }, 15000);
        });
    }
     
});