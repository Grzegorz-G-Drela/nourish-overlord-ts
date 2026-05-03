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

    const response = await fetch('http://localhost:3000/api/meal', {
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

    const response = await fetch('http://localhost:3000/api/burned', {
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