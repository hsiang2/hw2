const movieList = document.querySelector('#movie-list')
const homeBtn = document.querySelector('#home')

// read local JSON file in javascript
fetch("./json/movies.json")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        movieList.innerHTML = renderMovieList(json);
        
    })
    .catch(err => {
        console.log('Request Failed', err);
    });

// homeBtn.addEventListener("click", () => {
//     fetch("./json/movies.json")
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         movieList.innerHTML = renderMovieList(json);
        
//     })
//     .catch(err => {
//         console.log('Request Failed', err);
//     });
// })

function renderMovieList(json) {
    return `
        ${json.map(movie => {
            return `
                <article>
                    <img src=${movie.image} class="item-img">
                    <p class="item-name">${movie.name}</>
                    <p class="item-storyline">${movie.storylineShort}</>
                </article>
            `
        }).join("")}
    `
}