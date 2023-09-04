// const movieList = document.querySelector('#movie-list')
const content = document.querySelector('#content')

const homeBtn = document.querySelector('#home')

// read local JSON file in javascript
fetch("./json/movies.json")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        content.innerHTML = renderMovieList(json);
        
    })
    .catch(err => {
        console.log('Request Failed', err);
    });



homeBtn.addEventListener("click", () => {
    fetch("./json/movies.json")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        content.innerHTML = renderMovieList(json);
        
    })
    .catch(err => {
        console.log('Request Failed', err);
    });
})

function renderMovieList(json) {
    return `
        <section class="movie-list">
        ${json.map(movie => {
            return `
                <article>
                    <button data-movie='${JSON.stringify(movie)}' onclick="pressMovie(this)">
                        <img src=${movie.image} class="item-img">
                        <p class="item-name">${movie.name}</>
                        <p class="item-storyline">${movie.storylineShort}</>
                    </button>
                </article>
            `
        }).join("")}
        </section>
    `
}

function pressMovie(button) {
    const movieData = JSON.parse(button.dataset.movie)

    content.innerHTML = `
        <section class="info">
            <img src=${movieData.image} class="info-img">
            <div class="info-div">
                <h1 class="info-name">${movieData.name}</h1>
                <p class="info-details">${movieData.year} / ${movieData.rating} / ${movieData.runningTime}</>
                <p class="info-storyline">${movieData.storylineLong}</>
            </div>
        </section>
        <section class="cast">
            ${movieData.cast.map(actor => {
                return `
                    <div class="actor">
                        <img src=${actor.image} class="actor-img">
                        <p class="actor-name">${actor.name}</>
                        <p class="actor-character">${actor.character}</>
                    </div>
                `
            }).join("")}
        </section>
        <section class="reviews">
        
        </section>
    `
}