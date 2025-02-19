// scripts.js - Untuk memuat postingan di halaman utama
document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");

    if (postsContainer) {
        fetch("/posts.json") // Pastikan path benar
            .then(response => response.json())
            .then(data => {
                postsContainer.innerHTML = ""; // Kosongkan kontainer

                data.posts.forEach(post => {
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");

                    postElement.innerHTML = `
                        <img src="${post.image_url}" alt="${post.title}">
                        <div class="post-content">
                            <h2><a href="${post.url}">${post.title}</a></h2>
                            <p>${post.excerpt}</p>
                            <div class="post-actions">
                                <a href="${post.url}">[Selengkapnya...]</a>
                            </div>
                        </div>
                    `;

                    postsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                console.error("Error loading posts:", error);
                if (postsContainer) {
                    postsContainer.innerHTML = "<p>Gagal memuat data.</p>";
                }
            });
    }
});


// Slider untuk halaman posting
let slideIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides ? slides.children.length : 0;
    if (totalSlides > 0) {
        slideIndex = (slideIndex + direction + totalSlides) % totalSlides;
        slides.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
}

// Auto-slide dengan jeda 5 detik
let autoSlide = setInterval(() => moveSlide(1), 5000);

// Pause auto-slide ketika mouse berada di atas slider
const slider = document.querySelector('.image-slider');
if (slider) {
    slider.addEventListener('mouseover', () => clearInterval(autoSlide));
    slider.addEventListener('mouseout', () => autoSlide = setInterval(() => moveSlide(1), 5000));
}
