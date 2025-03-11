const getFruits = async () => {
    try {
        const response = await fetch('https://api.api-onepiece.com/v2/fruits/en');
        const data = await response.json();

        console.log("Datos obtenidos:", data);

        if (Array.isArray(data)) {
            return data;
        } else if (data.data && Array.isArray(data.data)) {
            return data.data;
        } else {
            console.error("Formato inesperado de datos:", data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener las frutas:', error);
        return [];
    }
};

const setupSearch = async () => {
    const fruits = await getFruits();

    if (!fruits.length) {
        console.error("No se pudieron cargar las frutas.");
        return;
    }

    const input = document.getElementById('fruitInput');

    input.addEventListener('input', () => {
        const fruitName = input.value.trim().toLowerCase();
        
        const fruitData = fruits.find(fruit => 
            fruit.name.toLowerCase().replace(/\s+/g, '') === fruitName.replace(/\s+/g, '')
        );

        const cardContainer = document.getElementById('fruitCard');

        if (fruitData) {
            cardContainer.innerHTML = `
                <div class="max-w-sm bg-white shadow-lg rounded-lg p-6 text-center">
                    <img src="${fruitData.filename}" alt="${fruitData.name}" class="rounded-lg mx-auto">
                    <h2 class="text-2xl font-bold mt-3">${fruitData.name}</h2>
                    <p class="text-gray-600">${fruitData.description}</p>
                </div>
            `;
        } else {
            cardContainer.innerHTML = '<p class="text-red-500">No se encontró la fruta</p>';
        }
    });
};

setupSearch();


