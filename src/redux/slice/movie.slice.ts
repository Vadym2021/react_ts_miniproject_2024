import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {movieService} from "../../services";
import {IMovie, IPage, IVideo, IVideoList} from "../../interfaces";
import {ISingleMovie} from "../../interfaces/singlemovie.interface";


interface IState {
    movies: IMovie[],
    SingleMovie: ISingleMovie | null,
    page: number,
    total_pages: number,
    total_results: number,
    year: number | undefined,
    id: number,
    searchText: string,
    movieVideos: IVideo[],
    searchMethod: string;
}


const initialState: IState = {
    movies: [],
    SingleMovie: null,
    page: 1,
    total_pages: 0,
    total_results: 0,
    year: undefined,
    id: 0,
    searchText: '',
    movieVideos: [],
    searchMethod: 'getMovies',
};

const getMovies = createAsyncThunk<{
    data: IPage<IMovie>,
    year: number | undefined
}, {
    year: number | undefined;
    genretrue: number[];
    page: number
}>(
    'movieSlice/getMovies',
    async ({year, genretrue, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovies(year, genretrue, page);
            return {data, year};
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

const getMovieById = createAsyncThunk<ISingleMovie, {
    id: number
}>(
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

const searchMovies = createAsyncThunk<IPage<IMovie>, {
    searchText: string,
    year: number | undefined,
    page: number
}>(
    'movieSlice/searchMovies',
    async ({searchText, year, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieBySearch(searchText, year, page);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);

const getMovieVideo = createAsyncThunk<IVideoList, {
    id: number
}>(
    'movieSlice/getMovieVideo',
    async ({id}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMovieVideos(id);
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
        },
        setYear: (state, action: PayloadAction<number|undefined>) => {
            state.year = action.payload;
        },
        closeSingleMovie: (state) => {
            state.SingleMovie = null;
            state.movieVideos = [];
        }

    },
    extraReducers: builder =>
        builder
            .addCase(getMovies.fulfilled, (state, action) => {
                const {page, total_pages, total_results, results} = action.payload.data;
                const year = action.payload.year;
                state.page = page;
                state.total_pages = total_pages;
                state.total_results = total_results;
                state.movies = results;
                state.year = year;
                state.searchMethod = 'getMovies';
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.SingleMovie = action.payload;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                const {page, total_pages, total_results, results, year} = action.payload;
                state.page = page;
                state.total_pages = total_pages;
                state.total_results = total_results;
                state.movies = results;
                state.year = year;
                state.searchMethod = 'searchMovies';
                state.searchText = action.meta.arg.searchText;
            })
            .addCase(getMovieVideo.fulfilled, (state, action) => {
                state.movieVideos = action.payload.results;
            })


})


const {actions, reducer: movieReducer} = slice;

const movieActions = {
    ...actions,
    getMovies,
    getMovieById,
    searchMovies,
    getMovieVideo,
};

export {
    movieActions,
    movieReducer
}