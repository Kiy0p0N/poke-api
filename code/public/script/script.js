$(document).ready(()=>{
    const pokeCard = $('#pokemon-card');

    // Gets the text of '#poke-type' and separates the words to get only the type
    const pokeType = $(".type-badge").text().split(' ')[1];
    
    switch (pokeType.toLowerCase()) {
        case 'normal':
            pokeCard.css('background-color', '#A8A77A'); // Verde acinzentado
            break;
        case 'fire':
            pokeCard.css('background-color', '#EE8130'); // Laranja queimado
            break;
        case 'water':
            pokeCard.css('background-color', '#6390F0'); // Azul médio
            break;
        case 'grass':
            pokeCard.css('background-color', '#7AC74C'); // Verde vivo
            break;
        case 'flying':
            pokeCard.css('background-color', '#A98FF3'); // Roxo claro
            break;
        case 'fighting':
            pokeCard.css('background-color', '#C22E28'); // Vermelho escuro
            break;
        case 'poison':
            pokeCard.css('background-color', '#A33EA1'); // Roxo vibrante
            break;
        case 'electric':
            pokeCard.css('background-color', '#F7D02C'); // Amarelo ouro
            break;
        case 'ground':
            pokeCard.css('background-color', '#E2BF65'); // Amarelo terroso
            break;
        case 'rock':
            pokeCard.css('background-color', '#B6A136'); // Dourado fosco
            break;
        case 'psychic':
            pokeCard.css('background-color', '#F95587'); // Rosa intenso
            break;
        case 'ice':
            pokeCard.css('background-color', '#96D9D6'); // Azul gelo
            break;
        case 'bug':
            pokeCard.css('background-color', '#A6B91A'); // Verde musgo
            break;
        case 'ghost':
            pokeCard.css('background-color', '#735797'); // Roxo escuro
            break;
        case 'steel':
            pokeCard.css('background-color', '#B7B7CE'); // Cinza metálico
            break;
        case 'dragon':
            pokeCard.css('background-color', '#6F35FC'); // Roxo intenso
            break;
        case 'dark':
            pokeCard.css('background-color', '#705746'); // Marrom escuro
            pokeCard.css('color', '#fff'); // Texto branco para contraste
            break;
        case 'fairy':
            pokeCard.css('background-color', '#D685AD'); // Rosa pastel
            break;
        default:
            pokeCard.css('background-color', '#FFFFFF'); // Branco como fallback
    };
});