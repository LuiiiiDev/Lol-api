const getLolChamps = async () => {
    try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.5.1/data/en_US/champion.json');
        
        if (!response.ok) throw new Error("Error al buscar los champs");

        const data = await response.json();
        const champs = data.data;

        // Guardar los campeones en una variable global para usarlos más tarde en la búsqueda
        window.allChamps = champs;

        // Mostrar todos los campeones al principio
        displayChamps(champs);

        // Agregar el evento para la búsqueda
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            const filteredChamps = Object.values(champs).filter(champ => champ.name.toLowerCase().includes(query));
            displayChamps(filteredChamps);
        });

    } catch (error) {
        console.error('Error al obtener los campeones:', error);
    }
};

// Función para mostrar las tarjetas de los campeones
const displayChamps = (champs) => {
    const cardParent = document.getElementById('cards');
    cardParent.innerHTML = ''; // Limpiar las tarjetas antes de volver a renderizar

    champs.forEach(champ => {
        const card = document.createElement('div');
        card.classList.add('card', 'm-4', 'bg-white', 'rounded-lg', 'shadow-lg', 'w-48', 'text-center');
        
        const champImage = document.createElement('img');
        champImage.src = `https://ddragon.leagueoflegends.com/cdn/15.5.1/img/champion/${champ.image.full}`;
        champImage.alt = champ.name;
        champImage.classList.add('w-full', 'rounded-t-lg');

        const champName = document.createElement('h3');
        champName.textContent = champ.name;
        champName.classList.add('p-2', 'font-bold', 'text-lg');

        card.appendChild(champImage);
        card.appendChild(champName);

        cardParent.appendChild(card);
    });
};

getLolChamps();
