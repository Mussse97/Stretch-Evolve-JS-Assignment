let currentPage = 1; 
const gallery = document.getElementById('userGallery');
const loadMoreBtn = document.getElementById('loadMore');

// avändning av fetch för att hämta användardata
async function fetchUsers(page = 1, limit = 20) {
    try {
      const response = await fetch(`http://localhost:3001/api/users?page=${page}&results=${limit}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  // Funktion för att skapa användarkort
function createUserCard(user) {
  const card = document.createElement('div');
  card.className = 'user-card';
  card.innerHTML = `
    <img src="${user.picture.medium}" alt="${user.name.first}">
    <h3>${user.name.first} ${user.name.last}</h3>
    <p>Age: ${user.dob.age}</p>
    <p>Gender: ${user.gender}</p>
    <p>${user.location.city}, ${user.location.country}</p>
  `;
  return card;
}
// Funktion för att ladda användare och lägga till dem i galleriet
async function loadUsers() {
  const users = await fetchUsers(currentPage);
  users.forEach(user => gallery.appendChild(createUserCard(user)));
  currentPage++;
}

loadMoreBtn.addEventListener('click', loadUsers);
loadUsers();