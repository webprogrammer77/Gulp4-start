module.exports = function() {
    var btnSubmit = document.querySelector('#submit-connect');
    var inputName = document.querySelector('#name-connect');
    var inputMail = document.querySelector('#mail-connect');
    var inputMessage = document.querySelector('#message-connect');
    var regMail = /^[^@]+@[^@.]+\.[^@]+$/;
    var regName = /\D+\S+/g;


    return window.onload = function() {
        btnSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            var stringName = inputName.value;
            var stringMail = inputMail.value;
            var stringMessage = inputMessage.value;
            console.log(( /a/ ).test(stringName));
            // проверяем валидность имени
            if(( regName ).test(stringName) || stringName !== '') {
                inputName.style.border = '1px solid green';
            }
            if(( /\d/ ).test(stringName) || stringName == '' ) {
                inputName.style.border = '1px solid red';
            }
            // проверяем валидность почты
            if((regMail).test(stringMail)) {
                // console.log('мыло верно');
                inputMail.style.border = '1px solid green';
            }
            if(!(regMail).test(stringMail)) {
                // console.log('мыло не верно!');
                inputMail.style.border = '1px solid red';
            }

            // проверяем валидность сообщения
            if(( /\w/ ).test(stringMessage) && stringMessage.length > 10) {
                inputMessage.style.border = '1px solid green';
            }
            if(!( /\w/ ).test(stringMessage) || stringMessage.length <= 10) {
                inputMessage.style.border = '1px solid red';
            }

            // else {
            //     ajaxValidate('../send.php')
            //         .then(function(value) {

            //         })
            //         .catch(function() {

            //         });
            // }
        });
    }

    function ajaxValidate(url) {
        return new Promise(function(resolve, reject) {      
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
            xhr.addEventListener('load', function() {
                resolve();
            });
            xhr.addEventListener('error', function() {
                reject();
            });
        });
    }
}