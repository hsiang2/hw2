const content = document.querySelector('#content')
const homeBtn = document.querySelector('#home')

const filterBtn = document.querySelector('#filter')
const dropdown = document.querySelector('#dropdown')
const recentBtn = document.querySelector('#recent')
const ratingBtn = document.querySelector('#rating')


var reviews = []
var sort = "recent"

var movies = [
    {
        "id": 0,
        "name": "Meg 2: The Trench",
        "image": "images/img_meg2.jpg",
        "storylineShort": "A research team encounters multiple threats while exploring the depths of the ocean, including a malevolent mining operation.",
        "storylineLong": "Jonas Taylor has been involved in fighting environmental crimes while also helping Mana One in exploring a further deep part of the Mariana Trench where the Megalodon had been found.",
        "year": "2023/8/25",
        "rating": "PG-13",
        "runningTime": "1h 56m",
        "cast": [
            {
                "name": "Jason Statham",
                "character": "Jonas Taylor",
                "image": "images/img_JasonStatham.jpg"
            },
            {
                "name": "Skyler Samuels",
                "character": "Jess",
                "image": "images/img_SkylerSamuels.jpg"
            }
        ],
        "score": 1.5,
        "reviews": []
    },
    {
        "id": 1,
        "name": "Oppenheimer",
        "image": "images/img_oppenheimer.jpg",
        "storylineShort": "The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.",
        "storylineLong": "A dramatization of the life story of J. Robert Oppenheimer, the physicist who had a large hand in the development of the atomic bomb, thus helping end World War 2. We see his life from university days all the way to post-WW2, where his fame saw him embroiled in political machinations.",
        "year": "2023/7/21",
        "rating": "R-18",
        "runningTime": "3h",
        "cast": [
            {
                "name": "Cillian Murphy",
                "character": "J. Robert Oppenheimer",
                "image": "images/img_CillianMurphy.jpg"
            },
            {
                "name": "Emily Blunt",
                "character": "Kitty Oppenheimer",
                "image": "images/img_EmilyBlunt.jpg"
            },
            {
                "name": "Robert Downey Jr.",
                "character": "Lewis Strauss",
                "image": "images/img_RobertDowneyJr.jpg"
            }
        ],
        "score": 5.0,
        "reviews": []
    },
    {
        "id": 2,
        "name": "Barbie",
        "image": "images/img_barbie.jpg",
        "storylineShort": "Barbie suffers a crisis that leads her to question her world and her existence.",
        "storylineLong": "Barbie suffers a crisis that leads her to question her world and her existence.",
        "year": "2023/7/21",
        "rating": "PG-13",
        "runningTime": "1h 54m",
        "cast": [
            {
                "name": "Margot Robbie",
                "character": "Barbie",
                "image": "images/img_MargotRobbie.jpg"
            },
            {
                "name": "Ryan Gosling",
                "character": "Ken",
                "image": "images/img_RyanGosling.jpg"
            },
            {
                "name": "Emma Mackey",
                "character": "Barbie",
                "image": "images/img_EmmaMackey.jpg"
            }
        ],
        "score": 4,
        "reviews": []
    },
    {
        "id": 3,
        "name": "Get Out",
        "image": "images/img_getOut.jpg",
        "storylineShort": "A young African-American visits his White girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
        "storylineLong": "Chris and his girlfriend Rose go upstate to visit her parents for the weekend. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries lead him to a truth that he never could have imagined.",
        "year": "2017/2/24",
        "rating": "R-18",
        "runningTime": "1h 44m",
        "cast": [
            {
                "name": "Daniel Kaluuya",
                "character": "Chris Washington",
                "image": "images/img_DanielKaluuya.jpg"
            },
            {
                "name": "Allison Williams",
                "character": "Rose Armitage",
                "image": "images/img_AllisonWilliams.jpg"
            },
            {
                "name": "Bradley Whitford",
                "character": "Dean Armitage",
                "image": "images/img_BradleyWhitford.jpg"
            }
        ],
        "score": 4.5,
        "reviews": []
    },    
    {
        "id": 4,
        "name": "Elemental",
        "image": "images/img_elemental.jpg",
        "storylineShort": "Follows Ember and Wade, in a city where fire-, water-, land- and air-residents live together.",
        "storylineLong": "The film journeys alongside an unlikely pair, Ember and Wade, in a city where fire-, water-, land- and air-residents live together. The fiery young woman and the go-with-the-flow guy are about to discover something elemental: how much they actually have in common.",
        "year": "2023/6/16",
        "rating": "0+",
        "runningTime": "1h 41m",
        "cast": [
            {
                "name": "Leah Lewis",
                "character": "Ember(voice)",
                "image": "images/img_LeahLewis.jpg"
            },
            {
                "name": "Mamoudou Athie",
                "character": "Wade(voice)",
                "image": "images/img_MamoudouAthie.jpg"
            }
        ],
        "score": 3.5,
        "reviews": []
    }
]

// fetchData()
content.innerHTML = renderMovieList();

filterBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hide")
    dropdown.classList.toggle("show")
})

ratingBtn.addEventListener("click", () => {
    sort = "rating"
    ratingBtn.style.opacity = 1
    recentBtn.style.opacity = 0.5
    // fetchData()
    content.innerHTML = renderMovieList();
})

recentBtn.addEventListener("click", () => {
    sort = "recent"
    ratingBtn.style.opacity = 0.5
    recentBtn.style.opacity = 1
    content.innerHTML = renderMovieList();
    // fetchData()
})

homeBtn.addEventListener("click", () => {
    // fetchData()
    content.innerHTML = renderMovieList();
})

// function fetchData() {
//     fetch("./json/movies.json")
//     .then((response) => {
//         return response.json();
//     })
//     .then((json) => {
//         content.innerHTML = renderMovieList(json);
        
//     })
//     .catch(err => {
//         console.log('Request Failed', err);
//     });
// }

function renderMovieList() {

    if (sort == "rating") {
        
        movies.sort((a, b) => {
            return b.score - a.score
        })
        
    } else {
        movies.sort((a, b) => {
            a = a.year.split('/')
            b = b.year.split('/')
            return b[0] - a[0] || b[1] - a[1] ||b[2] - a[2]
        })
    }
    

    return `
        <section class="movie-list">
        ${movies.map(movie => {
            return `
                <article>
                    <button data-movie='${btoa(JSON.stringify(movie))}' onclick="pressMovie(this)">
                        <img src=${movie.image} class="item-img">
                        <p class="item-name">${movie.name}</>
                        <div>
                            <i class="${movie.score >= 1 ? "fa-solid fa-star" : movie.score >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                            <i class="${movie.score >= 2 ? "fa-solid fa-star" : movie.score >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                            <i class="${movie.score >= 3 ? "fa-solid fa-star" : movie.score >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                            <i class="${movie.score >= 4 ? "fa-solid fa-star" : movie.score >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                            <i class="${movie.score >= 5 ? "fa-solid fa-star" : movie.score >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                        </div>
                        <p class="item-storyline">${movie.storylineShort}</>
                    </button>
                </article>
            `
        }).join("")}
        </section>
    `
}

function pressMovie(button) {
    const movieData = JSON.parse(atob(button.dataset.movie))

    content.innerHTML = `
        <section class="info">
            <img src=${movieData.image} class="info-img">
            <div>
                <h1 class="info-name">${movieData.name}</h1>
                <p class="info-details">${movieData.year} . ${movieData.rating} . ${movieData.runningTime}</>
                <div>
                    <i class="${movieData.score >= 1 ? "fa-solid fa-star" : movieData.score >= 0.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                    <i class="${movieData.score >= 2 ? "fa-solid fa-star" : movieData.score >= 1.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                    <i class="${movieData.score >= 3 ? "fa-solid fa-star" : movieData.score >= 2.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                    <i class="${movieData.score >= 4 ? "fa-solid fa-star" : movieData.score >= 3.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                    <i class="${movieData.score >= 5 ? "fa-solid fa-star" : movieData.score >= 4.5 ? "fa-solid fa-star-half-stroke" : "fa-regular fa-star"}"></i>
                </div>
                <p class="info-storyline">${movieData.storylineLong}</>
            </div>
        </section>
        <section class="cast">
            ${movieData.cast.map(actor => {
                return `
                    <div>
                        <img src=${actor.image} class="actor-img">
                        <p class="actor-name">${actor.name}</>
                        <p class="actor-character">${actor.character}</>
                    </div>
                `
            }).join("")}
        </section>
        <section class="reviews">
            <h1 class="info-name">Rate and Review</h1>
            <form data-movie='${movieData.id}' onsubmit="submitReview(this);return false">
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
            <div id="reviews-list">${movieData.reviews.map(review => {
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
            }).join("")}</div>
        </section>
    `
}

function submitReview(form) {
    const movie = JSON.parse(form.dataset.movie)
    let index = movies.findIndex(e => e.id == movie)
   
    movies[index].reviews.push({"score": form.rating.value, "comment": form.review.value})
   
    document.getElementById("reviews-list").innerHTML = `
        ${movies[index].reviews.map(review => {
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
    form.rating.value = 0
    rangeValue.innerText = 0
    form.review.value = ""
}