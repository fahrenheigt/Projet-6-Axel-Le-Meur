// Récupération id utilisateur et token
function getAuthorization() {
  const token = localStorage.getItem('auth');

  if (!token) {
    // Il n'y a pas de token
    return null;
  }

  const tokenData = JSON.parse(token);
  return 'Bearer ' + tokenData.token;
}
  
  // Utilisateur connecté ?
  function isConnected() {
    const connecting = getAuthorization() ? true : false;
    return connecting;
  }
  