let nominations = [];

$("form").submit((e) => {
    e.preventDefault();
    let searchValue = $("#input-value").val();
    $("#results-name").html(searchValue);
    $.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=6735e3c2`, function (data) {
        let resultString = "";
        data.Search = data.Search.slice(0, 5);
        data.Search.forEach(d => {
            resultString += `<li class="mb-2">${d.Title} (${d.Year}) <button class="nominate-button btn btn-light btn-sm border" id="${d.Title} (${d.Year})" onclick="nominate(this)">Nominate</button></li>`;
        })
        $("#search-results").html(resultString);
    })
})

function nominate(obj) {
    var movie = obj.id;
    obj.disabled = true;
    nominations.push(movie);
    console.log(nominations);
    let nominationString = "";
    nominations.forEach(d => {
        nominationString += `<li class="mb-2">${d} <button class="remove-button btn btn-light btn-sm border" data-name="${d}" onclick="remove(this)">Remove</button></li>`;
    })
    $("#nominations").html(nominationString);
    if (nominations.length == 5) {
        alert("5 nominations selected!");
    }
}

function remove(obj) {
    var movie = obj.getAttribute("data-name");
    nominations = nominations.filter(function (item) {
        return item !== movie;
    })
    let nominationString = "";
    nominations.forEach(d => {
        nominationString += `<li class="mb-2">${d} <button class="remove-button btn btn-light btn-sm border" data-name="${d}" onclick="remove(this)">Remove</button></li>`;
    })
    $("#nominations").html(nominationString);
    document.getElementById(movie).disabled = false;
}
