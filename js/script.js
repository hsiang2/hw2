// const movieList = document.querySelector('#movie-list')
const content = document.querySelector('#content')
const homeBtn = document.querySelector('#home')

const filterBtn = document.querySelector('#filter')
const dropdown = document.querySelector('#dropdown')
const recentBtn = document.querySelector('#recent')
const ratingBtn = document.querySelector('#rating')


var reviews = []
var sort = "recent"

// read local JSON file in javascript
fetchData()

filterBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hide")
    dropdown.classList.toggle("show")
})

ratingBtn.addEventListener("click", () => {
    sort = "rating"
    ratingBtn.style.opacity = 1
    recentBtn.style.opacity = 0.7
    fetchData()
})

recentBtn.addEventListener("click", () => {
    sort = "recent"
    ratingBtn.style.opacity = 0.7
    recentBtn.style.opacity = 1
    fetchData()
})

homeBtn.addEventListener("click", () => {
    fetchData()
})

function fetchData() {
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
}

function renderMovieList(json) {
    // if (sort == "recent") {
    //     json.sort( (a, b) => {
    //         if (a.year)
    //     })
    // }
    // var list = json
    if (sort == "rating") {
        
        json.sort((a, b) => {
            return b.score - a.score
        })
        
    } else {
        json.sort((a, b) => {
            a = a.year.split('/')
            b = b.year.split('/')
            return b[0] - a[0] || b[1] - a[1] ||b[2] - a[2]
        })
        console.log(json)
    }
    

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