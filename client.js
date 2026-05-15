const BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ) ? 'http://127.0.0.1:3000' : window.location.origin;

const profileForm = document.querySelector('#profile-form');
const nameInput = document.querySelector('#name-input');
const ageInput = document.querySelector('#age-input');
const weightInput = document.querySelector('#weight-input');
const heightInput = document.querySelector('#height-input');
const sexSelect = document.querySelector('#sex-select');
const profileResults = document.querySelector('#profile-results');

const mealForm = document.querySelector('#meal-form');
const mealInput = document.querySelector('#meal-input');
const personalitySelect = document.querySelector('#personality-select');
const mealResults = document.querySelector('#meal-results');

const burnedForm = document.querySelector('#burned-form');
const activityInput = document.querySelector('#activity-input');
const durationInput = document.querySelector('#duration-input');
const burnedResults = document.querySelector('#burned-results');



mealForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = mealInput.value;
    const personality = personalitySelect.value;

    const response = await fetch(`${BASE_URL}/api/meal`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ query, personality }),
    });

    const data = await response.json();

    if (!data.items.length) {
        mealResults.textContent = 'Meal not found. Try different search.';
        return;
    }
    
    renderMealResults(data);
});

function renderMealResults(data) {
    mealResults.textContent = '';

    data.items.forEach(item => {
        const card = document.createElement('div');

        const name = document.createElement('h3');
        name.textContent = item.name;

        const stats = document.createElement('p');
        stats.textContent = `Calories: ${item.calories} | Protein: ${item.protein_g}g | Fat: ${item.fat_total_g}g | Carbohydrates: ${item.carbohydrates_total_g}g`;

        card.append(name, stats);
        mealResults.append(card);
    });

    const reaction = document.createElement('p');
    reaction.textContent = data.reaction;
    mealResults.append(reaction);
}

burnedForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const activity = activityInput.value;
    const duration = durationInput.value;

    const response = await fetch(`${BASE_URL}/api/burned`, {
        method: "POST",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ activity, duration }),
    });

    const data = await response.json();

    if (!response.ok) {
        burnedResults.textContent = 'Activty not found. Try different search.';
        return;
    }

    renderBurnedResults(data);
});

function renderBurnedResults(data) {
    burnedResults.textContent = '';
    
    const burned = document.createElement('p');
    burned.textContent = `burned kcal: ${data.burned}`;

    burnedResults.append(burned);
}

personalitySelect.addEventListener('change', () => {
    document.body.setAttribute('data-theme', personalitySelect.value);
});

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = nameInput.value;
    const age = Number(ageInput.value);
    const weight = Number(weightInput.value);
    const height = Number(heightInput.value);
    const sex = sexSelect.value;

    const response = await fetch(`${BASE_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name, age, weight, height, sex }),
    });

    const data = await response.json();
    profileResults.textContent = `Profile saved. BMR: ${data.bmr} kcal`;
});