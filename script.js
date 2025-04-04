let currentPage = 1; // starting page for pagination
let currentGender = ''; // Setting the gender value to an empty string

const gallery = document.getElementById('userGallery');
const loadMoreBtn = document.getElementById('loadMore');

// event listener for the "gender filter" button
document.getElementById('applyFilters').addEventListener('click', () => {
  const genderFilterElement = document.getElementById('genderFilter');
  currentGender = genderFilterElement.value.trim(); 
 
  // We want to reset the page when filtering so that old users are not shown
  currentPage = 1; 
  gallery.innerHTML = ''; 

  document.getElementById('userGallery').innerHTML = ''; 
  loadUsers();
});


// Getting the user from backend
async function fetchUsers(page = 1, limit = 10, gender = '') {
  try {
    let url = `http://localhost:3001/api/users?page=${page}&results=${limit}`;
    
    if (gender && gender !== '') { 
      url += `&gender=${gender}`; 
    }

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}


// Creating user cards
function createUserCard(user) {
  const card = document.createElement('section');
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

  // Does not wipe the gallery when loading more users
  loadingSpinner.style.display = 'block';

  try {
    const users = await fetchUsers(currentPage, 10, currentGender);
    
    // Loading animation on pause when data is fetched
    loadingSpinner.style.display = 'none';


    users.forEach((user, index) => {
      const card = createUserCard(user);
      card.style.animationDelay = `${index * 0.1}s`;
      gallery.appendChild(card);
    });

    currentPage++; 

  } catch (error) {
    loadingSpinner.style.display = 'none';
    console.error("Error loading users:", error);
  }
}

loadMoreBtn.addEventListener('click', loadUsers);

// Start loading users on page load
loadUsers();
