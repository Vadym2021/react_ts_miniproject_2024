import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {movieService} from "../../services";
import {IMovie, IPage} from "../../interfaces";


interface IState {
    movies: IMovie[] | undefined,
    page: number,
    total_pages: any,
    total_results: any
}

const initialState: IState = {
    movies: [] as IMovie[] | undefined,
    page: 1,
    total_pages: 0,
    total_results: 0
};

const getMovies = createAsyncThunk<IPage>(
    'movieSlice/getMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovies();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            if (err.response) {
                return rejectWithValue(err.response.data);
            } else {
                return rejectWithValue("An error occurred.");
            }
        }
    }
);

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                const {page, total_pages, total_results, results} = action.payload
                state.page = page
                state.total_pages = total_pages
                state.total_results = total_results
                state.movies = results
            })
})


const {actions, reducer: movieReducer} = slice;

const movieActions = {
    ...actions,
    getMovies
}

export {
    movieActions,
    movieReducer
}