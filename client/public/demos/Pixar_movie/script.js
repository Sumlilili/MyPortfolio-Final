// ChatGPT Conversation Links:
// 1.https://chatgpt.com/share/67e96b79-09a8-8004-b422-bf097207764c
// 2.
// Add as many links as needed

const fileInput = document.getElementById("moviefile");
const yearFilter = document.getElementById("movie-year");
const directorFilter = document.getElementById("movie-director");
const orderFilter = document.getElementById("movie-order");
const searchInput = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-posters");
let dataList = [];
let filteredList = [];
let searchList = [];


// File Change
fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    // console.log(file);
    if (!file) return;
    document.getElementById("filename").innerHTML = file.name

    const reader = new FileReader();

    reader.onload = function(e) {
        localStorage.setItem("movies", e.target.result);
        const json = JSON.parse(localStorage.getItem("movies"));
        dataList = json.movies;
        filteredList = dataList;
        addOption(dataList)
        displayMovies(dataList);
    }
    reader.readAsText(file);
});

// Filters
yearFilter.addEventListener("change", function () {
    const year = parseInt(yearFilter.value);
    searchInput.value = ""

    if (yearFilter.value === "All Years") {
        filteredList = dataList.filter(movie => movie.director === directorFilter.value || directorFilter.value === "All Directors");
    } else {
        filteredList = dataList.filter(movie => {
            const movieYear = new Date(movie.releaseDate).getFullYear();
            return movieYear === year && (movie.director === directorFilter.value || directorFilter.value === "All Directors");
        });
    }
    applySorting(filteredList)
    displayMovies(filteredList);
});

directorFilter.addEventListener("change", function () {
    const director = directorFilter.value;
    searchInput.value = ""

    if (directorFilter.value === "All Directors") {
        filteredList = dataList.filter(movie => {
            const movieYear = new Date(movie.releaseDate).getFullYear();
            return movieYear === parseInt(yearFilter.value) || yearFilter.value === "All Years";
        });
    } else {
        filteredList = dataList.filter(movie => {
            return movie.director === director && (new Date(movie.releaseDate).getFullYear() === parseInt(yearFilter.value) || yearFilter.value === "All Years");
        });
    }
    applySorting(filteredList)
    displayMovies(filteredList);
});

orderFilter.addEventListener("change", function () {
    searchInput.value = ""
    applySorting(filteredList)
    displayMovies(filteredList);
});

// Search
searchInput.addEventListener("input", function () {
    yearFilter.value = "All Years"
    directorFilter.value = "All Directors"
    orderFilter.value = "Ascending"
    filteredList = dataList

    let input = searchInput.value.toLowerCase();

    if (input === "") {
        searchList = dataList;
    } else {
        searchList = dataList.filter(movie => movie.title.toLowerCase().includes(input));
    }
    applySorting(searchList)
    displayMovies(searchList);
});

// Display movie
function displayMovies(moviesList){
    movieContainer.innerHTML = "";
    if(moviesList.length === 0){
        const emptyP = document.createElement("p");
        emptyP.innerHTML = "No movies found!"
        movieContainer.appendChild(emptyP);
    }
    else {
        for(i=0;i<moviesList.length;i++){
        
            const releaseDate = moviesList[i].releaseDate;
            const year = new Date(releaseDate).getFullYear();
            
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            movieDiv.innerHTML = `
            <img src="images/${moviesList[i].posterUrl}" alt="${moviesList[i].title}">
            <div class="movie-info">
            <div class="movie-title">${moviesList[i].title}</div>
            <div class="movie-director">${moviesList[i].director}</div>
            <div class="movie-year-rating">
            <span class="movie-year">${year}</span>
            | IMDb: 
            <span class="movie-rating">${moviesList[i].imdbRating}</span>
            </div>
            `;
            movieContainer.appendChild(movieDiv);
        }
    }
}


function addOption(oldList) {
    const years = new Set();
    const directors = new Set();


    oldList.forEach(movie => {
        const releaseDate = movie.releaseDate;
        const director = movie.director;
        const year = new Date(releaseDate).getFullYear();
        years.add(year);
        directors.add(director);
    });
    const sortedYears = [...years].sort((a, b) => b - a);
    const sortedDirectors = [...directors].sort();


    sortedYears.forEach(year => {
        const option = new Option(year, year);
        yearFilter.add(option);
    });

    sortedDirectors.forEach(director => {
        const option = new Option(director, director);
        directorFilter.add(option);
    });
}

function applySorting(list) {
    console.log(orderFilter.value)
    if (orderFilter.value === "Ascending") {
        list.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    } else {
        list.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }
}