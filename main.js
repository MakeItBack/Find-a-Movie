// Select the results div element - this is where we will insert the results returned by the API
const results = document.querySelector("#results");

// declare our function to insert movies into the results section
const insertMovies = (data) => {
   // the returned movie data from JSON file is held in an object called Search. Here we drill down and save just the movie data
   const movies = data.Search;

   movies.forEach((movie) => {
      // Loop through each movie and concatenate a string of HTML to display
      const movieString = `
	<div class="card-movie">
    	<div class="image-top">
    		<img src=${movie.Poster}>
    	</div>
    	<div class="content">
			<p>${movie.Year}</p>
			<h5>${movie.Title}</h5>
    	</div>
	</div>
	`;
      // Insert the HTML in the results section (have already selected it in line 2)
      results.insertAdjacentHTML("beforeend", movieString);
   });
};

// This is the OMdB API key
const API_key = "afedf630";

// This is the fetch function to get the data from the omdb movie API
const fetchMovies = (query) => {
   // This is the API url, concatenated with the API key and query term
   const URL = `https://www.omdbapi.com/?s=${query}&apikey=${API_key}`;
   // Send the request
   fetch(URL)
      // This code uses json() method to extract the JSON body from the response and parses the data
      .then((response) => response.json())
      // This code uses the returned data. It runs the insertMovies function using the data as the argument
      .then((data) => {
         insertMovies(data);
      });
};

fetchMovies("gone");

// Select the form element
const form = document.querySelector("#search-form");

// Add event listener on the form - listen for when the submit button is pushed
form.addEventListener("submit", (event) => {
   // prevent default page reload after pressing submit
   event.preventDefault();
   // clear the previous results
   results.innerHTML = "";
   // select the input box and save it to a variable
   const input = document.querySelector("#search-input");
   // Run the fetchMovies function using the value entered in the search box as the argument
   fetchMovies(input.value);
   // Make the results visible
   results.classList.remove("d-none");
});
