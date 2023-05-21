const baseURL = `https://api.themoviedb.org/3`

export default baseURL

export const urls = {

    apiKey: `?api_key=bd12ecbfd22a54d853d3679a9d1d5ddd`,
    genre: `/genre/movie/list`,
    popular: `/movie/popular`,
    movie: `/movie`,
    images: `/images`,
    discover: '/discover/movie',
    page: '&page=',
    withgenres: '&with_genres=',
    year: '&primary_release_year=',
    search: '/search',
    query: 'movie?query=',
}