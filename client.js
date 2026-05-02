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
    console.log(data);
});