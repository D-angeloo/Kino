// Seleção de elementos
const resultados = document.querySelector("#resultados");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const genreSelect = document.querySelector("#genreSelect");
const topMoviesLink = document.querySelector("#topMoviesLink");
const latestMoviesLink = document.querySelector("#latestMoviesLink");

// Função para buscar informações da API
async function buscarDados(url) {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    resultados.innerHTML = ""; // Limpar resultados anteriores
    dados.results.forEach((filme) => {
        const novoElemento = document.createElement("div");
        novoElemento.className = "card";
        novoElemento.dataset.id = filme.id;
        const notaFormatada = filme.vote_average.toFixed(1);

        novoElemento.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}">
            <div class="card-content">
                <h2>${filme.title}</h2>
                <p class="rating">Nota: ${notaFormatada}</p>
                <p class="genre">${filme.genre_ids.map(id => getGenreName(id)).join(', ')}</p>
            </div>
        `;
        novoElemento.addEventListener("click", () => {
            window.location.href = `detalhes.html?id=${filme.id}`;
        });
        resultados.append(novoElemento);
    });
}

// Função para buscar filmes populares
function buscarFilmesPopulares() {
    const url = "https://api.themoviedb.org/3/movie/popular?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR";
    buscarDados(url);
}

// Função para buscar filmes com base no termo de pesquisa
function buscarFilmesPorTermo(termo) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR&query=${encodeURIComponent(termo)}`;
    buscarDados(url);
}

// Função para buscar filmes por gênero
function buscarFilmesPorGenero(generoId) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR&with_genres=${generoId}`;
    buscarDados(url);
}

// Função para buscar os melhores filmes (nota >= 7 e número mínimo de votos)
function buscarTopFilmes() {
    const url = "https://api.themoviedb.org/3/discover/movie?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR&vote_average.gte=7&vote_average.lte=9&vote_count.gte=500&sort_by=vote_average.desc";
    buscarDados(url);
}

// Função para buscar lançamentos recentes
function buscarLancamentos() {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR";
    buscarDados(url);
}

// Event listener para o botão de busca
searchButton.addEventListener("click", () => {
    const termo = searchInput.value.trim();
    if (termo) {
        buscarFilmesPorTermo(termo);
    } else {
        buscarFilmesPopulares();
    }
    searchInput.value = ''; // Limpar input após a pesquisa
});

// Event listener para a tecla "Enter" na barra de pesquisa
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const termo = searchInput.value.trim();
        if (termo) {
            buscarFilmesPorTermo(termo);
        } else {
            buscarFilmesPopulares();
        }
        searchInput.value = ''; // Limpar input após a pesquisa
    }
});

// Event listener para a seleção de gênero
genreSelect.addEventListener("change", () => {
    const generoId = genreSelect.value;
    if (generoId) {
        buscarFilmesPorGenero(generoId);
    } else {
        buscarFilmesPopulares();
    }
});

// Event listeners para os links de navegação
topMoviesLink.addEventListener("click", (event) => {
    event.preventDefault();
    buscarTopFilmes();
});

latestMoviesLink.addEventListener("click", (event) => {
    event.preventDefault();
    buscarLancamentos();
});

// Inicializar com filmes populares
buscarFilmesPopulares();

// Função para obter o nome do gênero pelo id
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
    };
    return genres[id] || 'Desconhecido';
}
