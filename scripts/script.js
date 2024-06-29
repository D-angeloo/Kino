// seleçao de elementos
const resultados = document.querySelector("#resultados")

// funçao para buscar informações da API
async function buscarDados() {
    const resposta = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR")
    const dados = await resposta.json()
    dados.results.forEach((filme) => {
        const novoElemento = document.createElement("div")
        novoElemento.className = "card"
        novoElemento.dataset.id = filme.id
        const notaFormatada = filme.vote_average.toFixed(1)

        novoElemento.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
            <div class="card-content">
                <h2>${filme.title}</h2>
                <p class="rating">Nota: ${notaFormatada}</p>
                <p class="genre">${filme.genre_ids.map(id => getGenreName(id)).join(', ')}</p>
            </div>
        `
        novoElemento.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${filme.id}`
        })
        resultados.append(novoElemento)
    })
}

// funãoo pra catar o genero pelo id
function getGenreName(id) {
    const genres = {
        28: 'Ação',
        12: 'Aventura',
        16: 'Animação',
        35: 'Comédia',
        80: 'Crime',
        99: 'Documentário',
        18: 'Drama',
        10751: 'Família',
        14: 'Fantasia',
        36: 'História',
        27: 'Terror',
        10402: 'Música',
        9648: 'Mistério',
        10749: 'Romance',
        878: 'Ficção Científica',
        10770: 'Cinema TV',
        53: 'Thriller',
        10752: 'Guerra',
        37: 'Faroeste'
    }
    return genres[id] || 'Desconhecido'
}

buscarDados()
