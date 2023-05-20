import {axiosService} from "./axios.service";
import {urls} from "../constants";

export const genreService = {

    getGenres: () => axiosService.get(`${urls.genre}${urls.apiKey}`)

}