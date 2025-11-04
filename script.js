const foods = [
    { name: "Apple", calories: 95, nutrition: 0.5, ratio: 0, amount: 0 },
    { name: "Egg", calories: 70, nutrition: 0.7, ratio: 0, amount: 0 },
    { name: "Milk", calories: 42, nutrition: 0.3, ratio: 0, amount: 0 },
    { name: "Almonds", calories: 7, nutrition: 0.2, ratio: 0, amount: 0 }
];

function optimizeDiet() {
    const maxCalories = parseInt(document.getElementById('maxCalories').value);
    if (isNaN(maxCalories) || maxCalories <= 0) {
        alert("Please enter a valid number of calories");
        return;
    }

    foods.forEach(food => {
        food.ratio = food.nutrition / food.calories;
    });

    const sortedFoods = [...foods].sort((a, b) => b.ratio - a.ratio);

    let remainingCalories = maxCalories;
    let totalNutrition = 0;
    const result = [];

    for (const food of sortedFoods) {
        if (remainingCalories <= 0) break;

        if (food.calories <= remainingCalories) {
            food.amount = 1;
            remainingCalories -= food.calories;
            totalNutrition += food.nutrition;
            result.push({...food, percentage: 100});
        } else {
            const fraction = remainingCalories / food.calories;
            food.amount = fraction;
            totalNutrition += food.nutrition * fraction;
            result.push({...food, percentage: Math.round(fraction * 100)});
            remainingCalories = 0;
        }
    }

    const resultDiv = document.getElementById('result');
    const planDiv = document.getElementById('optimized-plan');
    planDiv.innerHTML = result
        .filter(item => item.amount > 0)
        .map(item => `${item.name} – ${item.percentage}%`)
        .join('<br>');

    document.getElementById('total-calories').textContent = 
        `Total Calories Used: ${(maxCalories - remainingCalories).toFixed(1)} / ${maxCalories}`;
    
    document.getElementById('total-nutrition').textContent = 
        `Total Nutrition: ${totalNutrition.toFixed(2)}`;

    const efficiency = ((maxCalories - remainingCalories) / maxCalories * 100).toFixed(1);
    document.getElementById('efficiency').textContent = 
        `Calorie Efficiency: ${efficiency}%`;

    resultDiv.style.display = 'block';
}
