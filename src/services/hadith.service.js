const BASE_URL = `https://random-hadith-generator.vercel.app`;

const books_slug = [
    {
        slug: 'bukhari',
        name: 'Bukhari',
        limit: 7563,
    },
    {
        slug: 'muslim',
        name: 'Muslim',
        limit: 3032,
    }, {
        slug: 'abudawud',
        name: 'Abu Dawud',
        limit: 3998,
    }, {
        slug: 'ibnmajah',
        name: 'Ibnu Majah',
        limit: 4342,
    }, {
        slug: 'tirmidhi',
        name: 'Tirmidhi',
        limit: 3956,
    }];

/**
 * 
 *bukhari
muslim
abudawud
ibnmajah
tirmidhi
 */

async function fetchHadithByBook(book = books_slug[0], chapter) {
    let API_URL = `${BASE_URL}/${book.slug}`;

    if(chapter) {
        if(chapter > book.limit) return [];
        API_URL += `/${chapter}`
    }

    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json());
    

    return response;
}

async function randomHadith() {
    const book = books_slug[Math.floor(Math.random() * books_slug.length)];    
    return await fetchHadithByBook(book.slug);
}

module.exports = { fetchHadithByBook, randomHadith, books_slug };