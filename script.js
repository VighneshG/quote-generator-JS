// console.log('Hello Vighnesh');

const quotes = document.getElementById('quotes');
const quote = document.getElementById('quote');
const authors = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuote = document.getElementById('new-quote');
const context = document.getElementById('context');
const loader = document.getElementById('loader');

// Loading animation
function loading() {
    loader.hidden = false;
    quotes.hidden = true;

}

// hide loading

function final() {
    if (!loader.hidden) {
        quotes.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from api

async function getQuote() {
    loading();
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    // const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const alt = 'https://goquotes-api.herokuapp.com/api/v1/random?count=1';

    try {
        const response = await fetch(alt);
        const data = await response.json();
        console.log(data);

        context.innerText = '( '+data.quotes[0].tag+' )';
        quote.innerText = data.quotes[0].text;
        authors.innerText = data.quotes[0].author;
        
        // Stop loader, show Quote
        final();
    } catch (error) {
        // getQuote();
        console.log('Error occured! No Quote :(', error);
    }
}

function tweetQuote() {
    const quotetext = quote.innerText;
    const author = authors.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotetext} - ${author}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners

newQuote.addEventListener('click', getQuote);
twitter.addEventListener('click', tweetQuote);


// Load Quote
getQuote();
// loading();