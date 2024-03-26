import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IMovie, IPage} from "../interfaces";
import {IRes} from "../types";

export const movieService = {
    getMovieImById: (id: number) => axiosService.get(`${urls.movie}/${id}${urls.apiKey}`),
    getMovies: (year: number | undefined, genretrue: number[], page: number): IRes<IPage<IMovie>> => axiosService.get(`${urls.discover}${urls.apiKey}${urls.withgenres}${genretrue}${urls.year}${year}${urls.page}${page}`),
    getMovieBySearch: (searchText: string, year: number | undefined, page: number): IRes<IPage<IMovie>> => axiosService.get(`${urls.search}${urls.apiKey}&${urls.query}${searchText}${urls.year}${year}${urls.page}${page}`),
    getMovieVideos: (id: number) => axiosService.get(`${urls.movie}/${id}/${urls.videos}${urls.apiKey}`),
}