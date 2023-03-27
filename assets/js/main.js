const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 20;
let offset = 0;

const maxRecords = 151



function loadPokemonItems(offset, limit) {
    PokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) =>  `
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
        
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}"
                            alt="${pokemon.name}">
                    </div>
        
                </li>
                
            `).join('')
        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtRecordNextPage = offset + limit

if (qtRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItems(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
} else {
    loadPokemonItems(offset, limit)
}

})

// Adicionar o listener para o evento scroll
window.addEventListener('scroll', () => {
    // Verificar se o usuário chegou ao final da página
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      offset += limit
      // Verificar se chegamos ao limite máximo de registros

      const qtRecordNextPage = offset + limit
      if (qtRecordNextPage >= maxRecords) {
        // Remover o botão "load more" se chegarmos ao limite máximo
        loadMoreButton.parentElement.removeChild(loadMoreButton)
      } else {
        loadPokemonItems(offset, limit)
      }
    }
  })