document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.learn-more-btn').addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('#projects').offsetTop,
            behavior: 'smooth'
        });
    });
    
});
