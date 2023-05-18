import {axiosService} from "./axios.service";
import {urls} from "../constants";
import {IMovie, IPage} from "../interfaces";
import {IRes} from "../types";

export const movieService = {
    getMovieImById: (id: number) => axiosService.get(`${urls.movie}/${id}${urls.apiKey}`).then(value => value.data),
    getMovies: (): IRes<IPage> => axiosService.get(`${urls.discover}/${urls.apiKey}`).then(value => value.data),
    getMovieImg: (id: number) => axiosService.get(`${urls.movie}/${id}/${urls.images}${urls.apiKey}`).then(value => value.data),
    getMovieByFilter: (data: number, page: IPage, year: number) => axiosService.get(`${urls.discover}${urls.apiKey}${urls.withgenres}${data}${urls.page}${page}${urls.year}${year}`).then(value => value.data),
}