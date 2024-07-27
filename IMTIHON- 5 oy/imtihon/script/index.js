const swiperSlide = document.querySelector('.swiper-wrapper');
const $logOut = document.querySelector('.logout');

const truncate = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
};

const getData = (blogs) => {
    blogs.data.forEach(blog => {
        console.log(blog);
        const { description, title, image, author, id } = blog;
        swiperSlide.innerHTML += `
            <a target="_blank" href="./pages/single-post.html?blog-data=${btoa(JSON.stringify(blog))}" class="swiper-slide" placeholder="https://archive.org/download/placeholder-image/placeholder-image.jpg">
                <img src="${image}" alt="">
                <div class="swiper-slide__body">
                    <h4 class="swiper-slide__title">${truncate(title, 20)}</h4>
                    <p class="swiper-slide__info">${truncate(description, 60)}</p>
                    <div class="swiper-slide__author">
                        <img src="./images/avatar.png" alt="avatar" class="swiper-slide-author__img">
                        <div class="swiper-slide-author__about">
                            <h5 class="swiper-slide-author__name">${author}</h5>
                            <small class="swiper-slide-author__role">Author</small>
                        </div>
                    </div>
                </div>
            </a>
        `;
    });

    swiper.update();
};

let swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

function btnsReoload(){
    const tokenUser = JSON.parse(localStorage.getItem('token'));
    if (tokenUser) {
        document.querySelector(".logout").style.display = 'block';
        document.querySelector('.log').style.display = 'none';
        document.querySelector('.reg').style.display = 'none';
        document.querySelector('.dash').style.display = 'block';
    } else {
        document.querySelector(".logout").style.display = 'none';
        document.querySelector('.log').style.display = 'block';
        document.querySelector('.reg').style.display = 'block';
        document.querySelector('.dash').style.display = 'none';
    }

    if(location.reload === true){
        location.reload();
    } 
}

btnsReoload()

fetch(`https://blog-post-production-b61c.up.railway.app/api/v1/blogs`, {
    headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => getData(data))
    .catch(error => console.error('Error fetching data:', error));

$logOut.addEventListener('click', (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('token');
        location.reload();

        alert("You have successfully logged out!");
    } else {
        return;
    }
});
