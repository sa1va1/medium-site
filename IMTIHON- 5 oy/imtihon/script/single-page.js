const url = location.search;
const blogData = new URLSearchParams(url).get('blog-data');
const decodedData = atob(blogData);
const blog = JSON.parse(decodedData);

const tokenUser = JSON.parse(localStorage.getItem('token'));

function renderButtons() {
    if (tokenUser) {
        document.querySelector('.nav__home').style.display = 'block';
        document.querySelector('.log').style.display = 'none';
        document.querySelector('.reg').style.display = 'none';
        document.querySelector('.delete-button').style.display = 'block';
    } else {
        document.querySelector('.nav__home').style.display = 'none';
        document.querySelector('.log').style.display = 'block';
        document.querySelector('.reg').style.display = 'block';
        document.querySelector('.delete-button').style.display = 'none';
    }
}

console.log(blog);

const img = document.querySelector('.content__img');
const description = document.querySelector('.content-description');
const title = document.querySelector('.content-heading__title');
const tag = document.querySelector('.content-heading__tag');

img.src = blog.image;
description.textContent = blog.description;
title.textContent = blog.title;
tag.textContent = "#" + blog.tags.join(", ");

renderButtons();
