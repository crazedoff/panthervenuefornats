window.onload = function() {
    document.body.classList.add('loaded');
    // Step 1: Get DOM elements
    let nextDom = document.getElementById('next');
    let prevDom = document.getElementById('prev');
    let carouselDom = document.querySelector('.carousel');
    let SliderDom = carouselDom.querySelector('.carousel .list');
    let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
    let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
    let timeRunning = 1000; // Animation duration

    // Append the first thumbnail item
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    // Next button click event
    nextDom.onclick = function() {
        showSlider('next');
    };

    // Previous button click event
    prevDom.onclick = function() {
        showSlider('prev');
    };

    // Function to show the slider (next or prev)
    function showSlider(type) {
        let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
        let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            carouselDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            carouselDom.classList.add('prev');
        }

        // Allow immediate button clicks but keep the animation
        setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning); // Time for the animation to complete
    }

    // jQuery for thumbnail click functionality
    $(document).ready(function() {
        // Add click event to thumbnails
        $('.thumbnail .item').on('click', function() {
            var index = $(this).index(); // Get the index of the clicked thumbnail
            $('.carousel .list .item').removeClass('active'); // Remove active class from all items
            $('.carousel .list .item').eq(index).addClass('active'); // Add active class to the corresponding item
        });
    });
};
