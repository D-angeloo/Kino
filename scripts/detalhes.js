
const bannerFilme = document.querySelector("#banner-filme")
const detalhesFilme = document.querySelector("#detalhes-filme")

async function buscarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search)
    const filmeId = urlParams.get('id')

    const resposta = await fetch(`https://api.themoviedb.org/3/movie/${filmeId}?api_key=7d14869f82ca6dee1750249a3ab5f398&language=pt-BR`)
    const filme = await resposta.json()

    bannerFilme.innerHTML = `
        <img src="https://image.tmdb.org/t/p/original${filme.poster_path}" alt="${filme.title}">
    `

    detalhesFilme.innerHTML = `
        <h2>${filme.title}</h2>
        <p><strong>Nota:</strong> ${filme.vote_average}</p>
        <p><strong>Data de Lançamento:</strong> ${filme.release_date}</p>
        <p><strong>Orçamento:</strong> $${filme.budget.toLocaleString()}</p>
        <p><strong>Receita:</strong> $${filme.revenue.toLocaleString()}</p>
        <p><strong>Gêneros:</strong> ${filme.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Duração:</strong> ${filme.runtime} minutos</p>
        <p><strong>Sinopse:</strong> ${filme.overview}</p>
    `
}

buscarDetalhes()

