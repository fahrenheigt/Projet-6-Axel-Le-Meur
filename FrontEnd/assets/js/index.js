getCategory();
getWorks();

//Récupération des catégories via l'API

function getCategory() {
    const catUrl = 'http://localhost:5678/api/categories';
    fetch(catUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const fragment = document.createDocumentFragment();
            let categoryies = data;

            localStorage.setItem('categoryies', JSON.stringify(data));
            categoryies.forEach((category) => {
                const link = document.createElement('a');
                link.textContent = category.name;
                link.onclick = function () {
                    findByCategory(category.id);
                    link.className.replace('active', '');
                };
                link.classList.add("subcat");
                link.setAttribute("tabindex", "0");
                fragment.appendChild(link);
            });
            const categorie = document.getElementById('category');
            categorie.appendChild(fragment);
        })
}

function findByCategory(id) {
    const works = JSON.parse(localStorage.getItem('worksedit'));
    let worksList = [];

    works.forEach((work) => {
        if(work.categoryId == id) {
            worksList.push(work);
        }
    });
    console.log(worksList);
    createDocumentWorks(worksList);
}

// Afficher tous les projets avec le filtre "Tous"

function showAllWorks() {
    const works = JSON.parse(localStorage.getItem('worksedit'));
    createDocumentWorks(works);
}

// Récupération des projets depuis l'API

function getWorks() {
    const worksUrl = 'http://localhost:5678/api/works';

    fetch(worksUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const fragment = document.createDocumentFragment();
            let works = data;
            localStorage.setItem('worksedit', JSON.stringify(data));
            createDocumentWorks(works);
        })
}

function createDocumentWorks(works) {
    const fragment = document.createDocumentFragment();
    const gallery = document.getElementsByClassName('gallery')[0];

    gallery.innerHTML = ''; 
    works.forEach((work) => {
        const figure = document.createElement('figure');
        const div = document.createElement('div');
        const img = document.createElement('img');

        img.src = work.imageUrl;
        img.crossOrigin = 'anonymous';

        const caption = document.createElement('figcaption')
        caption.textContent = work.title;
        fragment.appendChild(figure);
        figure.appendChild(div);
        div.appendChild(img);
        div.appendChild(caption);
    })
    gallery.appendChild(fragment);
}
