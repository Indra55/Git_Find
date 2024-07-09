document.addEventListener('DOMContentLoaded', function() {
    const changingWordElement = document.querySelector('.changing-word');
    const words = ["Anytime", "Anywhere"]; 
    let wordIndex = 0;

    function changeWord() {
        wordIndex = (wordIndex + 1) % words.length;
        changingWordElement.textContent = words[wordIndex];
    }

    setInterval(changeWord, 2000); 

   
function isFullScreen() {
    return window.innerWidth == screen.width && window.innerHeight == screen.height;
}


function updateOverflow() {
    if (isFullScreen()) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}


window.addEventListener('resize', updateOverflow);


updateOverflow();

});
