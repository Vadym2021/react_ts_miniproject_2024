import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {movieService} from "../../services";
import {IMovie, IPage} from "../../interfaces";
import {ISingleMovie} from "../../interfaces/singlemovie.interface";


interface IState {
    movies: IMovie[],
    SingleMovie: ISingleMovie | null,
    page: number,
    total_pages: number,
    total_results: number,
    year: number,
    id: number,
}


const initialState: IState = {
    movies: [],
    SingleMovie: null,
    page: 1,
    total_pages: 0,
    total_results: 0,
    year: 0,
    id: 0,
};

const getMovies = createAsyncThunk<IPage<IMovie>, { year: number; genretrue: number[]; page: number }>(
    'movieSlice/getMovies',
    async ({year, genretrue, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovies(year, genretrue, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

const getMovieById = createAsyncThunk<ISingleMovie, { id: number }>(
    'movieSlice/getMovieById',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieImById(id);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        }
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
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.SingleMovie = action.payload;
            })
})


const {actions, reducer: movieReducer} = slice;

const movieActions = {
    ...actions,
    getMovies,
    getMovieById
}

export {
    movieActions,
    movieReducer
}