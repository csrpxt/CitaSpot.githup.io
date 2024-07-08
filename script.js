// script.js

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        searchWikipedia(query);
    }
});

function searchWikipedia(query) {
    const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search.map(item => ({
                title: item.title,
                snippet: item.snippet,
                link: `https://es.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
            }));
            displayResults(results);
        })
        .catch(error => console.error('Error:', error));
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');

        const titleElement = document.createElement('div');
        titleElement.classList.add('result-title');
        titleElement.innerHTML = `<a href="${result.link}" target="_blank">${result.title}</a>`;
        resultItem.appendChild(titleElement);

        const snippetElement = document.createElement('div');
        snippetElement.classList.add('result-snippet');
        snippetElement.innerHTML = result.snippet;
        resultItem.appendChild(snippetElement);

        const citationElement = document.createElement('div');
        citationElement.classList.add('result-citation');
        citationElement.innerHTML = `${result.title}. Wikipedia. Recuperado de <a href="${result.link}" target="_blank">${result.link}</a>`;
        resultItem.appendChild(citationElement);

        resultsContainer.appendChild(resultItem);
    });
}
