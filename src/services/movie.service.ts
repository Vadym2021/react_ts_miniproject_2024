import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IMovie, IPage} from "../interfaces";
import {IRes} from "../types";

export const movieService = {
    getMovieImById: (id: number) => axiosService.get(`${urls.movie}/${id}${urls.apiKey}`),
    getMovies: (year:number,genretrue:number[],page:number): IRes<IPage<IMovie>> => axiosService.get(`${urls.discover}${urls.apiKey}${urls.withgenres}${genretrue}${urls.year}${year}${urls.page}${page}`),
    getMovieImg: (id: number) => axiosService.get(`${urls.movie}/${id}/${urls.images}${urls.apiKey}`),
    // getMovieByFilter: (data: number, page: IPage, year: number) => axiosService.get(`${urls.discover}${urls.apiKey}${urls.withgenres}${data}${urls.page}${page}${urls.year}${year}`).then(value => value.data),
}