import axios from "axios";
import baseURL from "../constants/urls";


export const axiosService = axios.create({baseURL});

axiosService.interceptors.request.use(request =>{


    request.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDEyZWNiZmQyMmE1NGQ4NTNkMzY3OWE5ZDFkNWRkZCIsInN1YiI6IjYyMDBmMTEwZDM0ZWIzMDEwNWFjMTgzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2LiG50PTAcC6p4cTnJmcW-5awpIR7mH3jaHnt5uJOlI`

    return request
})