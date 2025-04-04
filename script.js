let currentPage = 1; 
let currentGender = ''; // Lägg till denna rad för att undvika undefined-fel

const gallery = document.getElementById('userGallery');
const loadMoreBtn = document.getElementById('loadMore');

// Lyssna på filter-knappen
document.getElementById('applyFilters').addEventListener('click', () => {
  const genderFilterElement = document.getElementById('genderFilter');
  currentGender = genderFilterElement.value.trim(); // Hämta könsvärde från dropdown

  console.log("Selected gender:", currentGender); // Logga värdet från dropdown

  currentPage = 1; // Återställ sidan
  document.getElementById('userGallery').innerHTML = ''; // Rensa tidigare användare
  loadUsers();
});


// Funktion för att hämta användardata från backend
async function fetchUsers(page = 1, limit = 10, gender = '') {
  try {
    let url = `http://localhost:3001/api/users?page=${page}&results=${limit}`;
    
    if (gender && gender !== '') { 
      url += `&gender=${gender}`; // Lägg till könsfilter om det finns
    }

    console.log("Fetching users from:", url); // Logga URL för att verifiera

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}


// Funktion för att ladda användare
async function loadUsers() {
  const users = await fetchUsers(currentPage, 10, currentGender);
  users.forEach(user => gallery.appendChild(createUserCard(user)));
  currentPage++;
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
async function loadUsers() {
  const loadingSpinner = document.getElementById('loading');
  const gallery = document.getElementById('userGallery');
  
  // Show spinner and clear gallery
  loadingSpinner.style.display = 'block';
  gallery.innerHTML = '';
  
  try {
    const users = await fetchUsers(currentGender);
    
    // Hide spinner when data is ready
    loadingSpinner.style.display = 'none';
    
    // Add staggered animations
    users.forEach((user, index) => {
      const card = createUserCard(user);
      card.style.animationDelay = `${index * 0.1}s`;
      gallery.appendChild(card);
    });
    
  } catch (error) {
    loadingSpinner.style.display = 'none';
    console.error("Error loading users:", error);
  }
}
// Lyssna på "Ladda mer"-knappen
loadMoreBtn.addEventListener('click', loadUsers);

// Hämta användare vid start
loadUsers();
