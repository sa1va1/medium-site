const $dashboardForm = document.querySelector('.dashboard-post__form');
const postTitle = $dashboardForm.querySelector('#post-title');
const postImg = $dashboardForm.querySelector('#post-img');
const postTag = $dashboardForm.querySelector('#post-tag');
const postBtn = $dashboardForm.querySelector('.create-post-btn__button');
const addTag = $dashboardForm.querySelector('.post-tag-btn');
const postDescr = $dashboardForm.querySelector('.post-description');
const dashboardHeading = document.querySelector('.dashboard-items__heading');

dashboardHeading.textContent = localStorage.getItem('email');

function Post(title, description, image, tags, author) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.tags = tags;
    this.author = author;
}

const author = JSON.parse(localStorage.getItem('email'))

const handleCreatePost = (e) => {
    e.preventDefault();
    
    let postData = new Post(postTitle.value, postDescr.value, postImg.value, postTag.value, author);
    console.log(postData);

    const tokenUser = JSON.parse(localStorage.getItem('token'));

    fetch('https://blog-post-production-b61c.up.railway.app/api/v1/blogs', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenUser}`
        },
        body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            console.log(data);
            Toastify({
                text: "Post created successfully!",
                duration: 3000, 
                close: true,
                gravity: "top", 
                position: "right",
                backgroundColor: "green",
            }).showToast();
            $dashboardForm.reset();
            location.replace(location.origin + "imtihon/index.html");
        }
    })
    .catch(error => {
        console.log(error);

        Toastify({
            text: "Failed to create post!",
            duration: 3000, 
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "red",
        }).showToast();
    });
}

$dashboardForm.addEventListener('submit', handleCreatePost);
