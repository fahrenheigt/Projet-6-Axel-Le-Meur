// Récupération id utilisateur et token
function getAuthorization() {
    const token = JSON.parse(localStorage.getItem('auth')).token;
    return 'Bearer ' + token;
  }
  
  // Utilisateur connecté ?
  function isConnected() {
    const connecting = getAuthorization() ? true : false;
    return connecting;
  }
  