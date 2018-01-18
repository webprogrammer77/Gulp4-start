
flipper();

function flipper() {
    const DOC = document;
    const WIN = window;
    const flipper = DOC.getElementById('flipper');
    const flipperRotate = DOC.getElementById('flipper-rotate');
    

    if (flipper) {
        DOC.addEventListener('DOMContentLoaded', () => {
            DOC.getElementById('flipper-rotate')
                .addEventListener('click', () => {
                    flipperRotate.classList.toggle('visually-hidden');
                    flipper.classList.toggle('rotate');
                });
            DOC.getElementsByTagName('body')[0]
                .addEventListener('click', (e) => {
                    if (!e.target.closest('#flipper') && !e.target.closest('#flipper-rotate')) {
                        if (flipper.classList.contains('rotate')) {
                            flipper.classList.remove('rotate');
                            flipperRotate.classList.remove('visually-hidden');
                        }
                    }
                });
        });
    }
}
module.exports = flipper;
