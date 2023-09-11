// const movieList = document.querySelector('#movie-list')
const content = document.querySelector('#content')
const homeBtn = document.querySelector('#home')

var reviews = []

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
                <p class="info-details">${movieData.year} . ${movieData.rating} . ${movieData.runningTime}</>
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
            <h1 class="info-name">Rate and Review</h1>
            <form onsubmit="submitReview(this);return false">
                <p class="info-details">Rate this movie on a scale of 1-5.</p>
                <div class="slider">
                    <input 
                        type="range" 
                        id="rating" name="rating"
                        min="0" max="5" 
                        step="0.5" value="0" 
                        oninput="rangeValue.innerText = this.value"
                    >
                    <p id="rangeValue">0</p>
                </div> 
                <p class="info-details">Write a review.</p>
                <textarea class="text-input" rows="8" name="review"></textarea>
                <input class="btn" type="submit" value="SUBMIT">
            </form>
        </section>
        <section class="reviews">
            <h1 class="info-name">Reviews</h1>
            <div id="reviews-list"></div>
        </section>
    `
}

// ${reviews.map(review => {
//     return `
//         <div>
//             <p>${review.score}</p>
//             <p>${review.comment}</p>
//         </div>
//     `
// }).join("")}

function submitReview(form) {
    reviews.push({"score": form.rating.value, "comment": form.review.value})


    document.getElementById("reviews-list").innerHTML = `
        ${reviews.map(review => {
            return `
                <article class="review-item">
                    <div>
                        <i class="${review.score >= 1 ? "fa-solid fa-star" : review.score >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                        <i class="${review.score >= 2 ? "fa-solid fa-star" : review.score >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                        <i class="${review.score >= 3 ? "fa-solid fa-star" : review.score >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                        <i class="${review.score >= 4 ? "fa-solid fa-star" : review.score >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                        <i class="${review.score >= 5 ? "fa-solid fa-star" : review.score >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                    </div>
                    <p>${review.comment}</p>
                </article>
            `
        }).join("")}
    `
    // document.getElementById("reviews-list").innerHTML = `
    //         <p>${form.rating.value}</p>
    //         <p>${form.review.value}</p>
    //     `
    form.rating.value = 0
    rangeValue.innerText = 0
    form.review.value = ""
   

}