    // Check if search term has been entered before
    var history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (history.indexOf(searchTerm) === -1) {
        // Save search term to local storage
        history.push(searchTerm);
        localStorage.setItem("searchHistory", JSON.stringify(history));
    } else {
        console.log("Search term already exists in local storage");
    }

    // Do something with the search term (e.g. make API call)
    // ...
