getCategory();

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