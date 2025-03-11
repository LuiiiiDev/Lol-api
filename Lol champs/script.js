const getLolChamps = async () => {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.5.1/data/en_US/champion.json');
        const data = await response.json();
        return data.data; // Solo retorna los campeones
    } catch (error) {
        console.error('Error al obtener los campeones:', error);
    }
};

const setupSearch = async () => {
    const champions = await getLolChamps();
    const input = document.getElementById('championInput');
    
    input.addEventListener('input', () => {
        const champName = input.value.trim();
        const champData = champions[champName];

        const cardContainer = document.getElementById('championCard');
        if (champData) {
            cardContainer.innerHTML = `
                <div class="max-w-sm bg-white shadow-lg rounded-lg p-6 text-center">
                    <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg" alt="${champData.name}" class="rounded-lg mx-auto">
                    <h2 class="text-2xl font-bold mt-3">${champData.name}</h2>
                    <p class="text-gray-600">${champData.title}</p>
                    <p class="text-gray-500 text-sm mt-2">${champData.blurb}</p>
                </div>
            `;
        } else {
            cardContainer.innerHTML = '';
        }
    });
};

setupSearch();
