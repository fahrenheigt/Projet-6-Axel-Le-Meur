// Variables pour la modal suppression de projets
const modalDeleteWork = document.querySelector("#modalsSuppr");
const openGalleryModalBtn = document.querySelector("#projectEdit");
const closeGalleryModalBtn = document.querySelector("#fermer-suppr");

// Variables pour la modal ajout de projets
const modalAddWork = document.querySelector("#modalsAjout");
const openAddWork = document.querySelector("#AjoutPhoto");
const previousBtn = document.querySelector(".precedent");
const closeAddWorkModalBtn = document.querySelector("#fermer-ajout")

// Variables pour upload une image
const uploadImageInput = document.querySelector("#imageUpload");
const projectUpload = document.querySelector("#previewImage");
const uploadContent = document.querySelector("#previewdetails");
const submitProjet = document.querySelector("#validerAjout");
const backgroundPreview = document.querySelector(".AjoutPhotoContainer");

const addProjectForm = document.querySelector("#ajout-form");

// Variable pour background modal
const backgroundModal = document.querySelector("#modals");

// Fonction pour ouvrir modal galerie pour supprimer un projet et celle pour ajouter un projet
function openGalleryModal() {
    modalDeleteWork.style.display = "flex";
    backgroundModal.style.display = "block";
    addWorkModal();
}

function openAddWorkModal() {
    modalAddWork.style.display = "flex";
    backgroundModal.style.display = "block";
}

// Fonction pour fermeture des modals
function closeGalleryModal() {
    modalDeleteWork.style.display = "none";
    backgroundModal.style.display = "none";
}

function closeAddWorkModal() {
    modalAddWork.style.display = "none";
    backgroundModal.style.display = "none";
}

//Clear modal à la fermeture

closeAddWorkModalBtn.addEventListener('click', () => {
  clearModalContent();
});

function clearModalContent() {

    // Clear form data
    document.querySelector('#ajout-form').reset();
    projectUpload.innerHTML = '';
    uploadContent.style.display = '';
  }
  

// Ouvrir les modals
if (openGalleryModalBtn) openGalleryModalBtn.addEventListener("click", openGalleryModal);
if (openAddWork) openAddWork.addEventListener("click", function() {
    closeGalleryModal();
    openAddWorkModal();
})

// Fermer les modals et précédent
closeGalleryModalBtn.addEventListener("click", closeGalleryModal);
closeAddWorkModalBtn.addEventListener("click", closeAddWorkModal);

previousBtn.addEventListener("click", function() {
    closeAddWorkModal();
    openGalleryModal();
    addWorkModal();
    clearModalContent();
});

window.onclick = function (event) {
    if (event.target == backgroundModal) {
        closeAddWorkModal();
        closeGalleryModal();
        clearModalContent();
    }
}


// Supprimer des photos
function deleteWork(event, id) {
    fetch('http://localhost:5678/api/works/' + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Authorization': getAuthorization(),
            'Content-Type': 'application/json',
        },
        params: {
            'id': id
        },
    })
    .then(() => {
        const parentDiv = event.parentNode;
        parentDiv.remove();
         const alert = document.getElementById('alert');
         alert.innerHTML = "Votre photo a été supprimé avec succès";
         alert.style.display = "block";
         setTimeout(() => { alert.style.display = "none"; }, 5000);

// requête http pour voir les photos supprimées
    const fetchWorks = 'http://localhost:5678/api/works';

    fetch(fetchWorks)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const fragment = document.createDocumentFragment();
            let works = data;
            localStorage.setItem('worksedit', JSON.stringify(data));
            createDocumentWorks(works);
        })

    })
    .catch((error) => {
     console.error('Error:', error);
    });
}

// Fonctions pour ajouter des projets
async function sendWorkData(data) {
   const postWorkUrl = 'http://localhost:5678/api/works';

    const response = await fetch(postWorkUrl, {
        method: "POST",
        headers: {
            'Authorization': getAuthorization()
        },
        body: data,
    })
    clearModalContent();
    ;


// requête http pour voir les photos ajoutées
    const fetchWorks = 'http://localhost:5678/api/works';

    fetch(fetchWorks)
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

// Fonction pour gérer l'envoi du formulaire
async function handleFormSubmit(event) {
    event.preventDefault();

    // Vérifier que tous les champs obligatoires sont remplis
    if (!addProjectForm.checkValidity()) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // Récupérer les valeurs du formulaire
    const title = addProjectForm.querySelector("#titreAjout").value;
    const category = addProjectForm.querySelector("#selectCategorie").value;
    const file = uploadImageInput.files[0];

    // Créer un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);

    // Envoyer les données et afficher la réponse
    try {
        const response = await sendWorkData(formData);
        console.log(response);
        
        const alert = document.getElementById('alert');
        alert.innerHTML = "Votre photo a été ajouté avec succès";
        alert.style.display = "block";
        setTimeout(function(){ alert.style.display = "none"; }, 5000);
        
    } catch (error) {
        console.error("Erreur :", error);
    }
}

// Ajout des événements pour gérer l'upload de photos
uploadImageInput.addEventListener("change", function () {
    uploadImage();
});

addProjectForm.addEventListener("submit", handleFormSubmit);

// Fonction pour afficher l'aperçu de l'image
function uploadImage() {
    if (uploadImageInput.files && uploadImageInput.files[0]) {
        const reader = new FileReader();
        const image = new Image();
        const fileName = uploadImageInput.files[0].name;

        reader.onload = event => {
            image.src = event.target.result;
            image.alt = fileName.split(".")[0];
        };

        uploadContent.style.display = "none";
        submitProjet.style.backgroundColor = "#1D6154";
        projectUpload.style.display = "block";
        reader.readAsDataURL(uploadImageInput.files[0]);
        projectUpload.appendChild(image);
    }
}

    // Ajout du debounce pour éviter le spam click
    const handleSubmit = () => {
        submitProjet.addEventListener("click", () => {
          closeAddWorkModal();
        });
  
        requestAnimationFrame(() => {
          submitProjet.removeEventListener("click", handleSubmit);
        });
      };
      handleSubmit();

          // Effet au survol du bouton valider
    submitProjet.addEventListener("mouseover", () => {
        submitProjet.style.backgroundColor = "#297267";
        submitProjet.style.transform = "scale(1.1)";
      });
  
    submitProjet.addEventListener("mouseout", () => {
        submitProjet.style.backgroundColor = "#1D6154";
        submitProjet.style.transform = "scale(1)";
      });
