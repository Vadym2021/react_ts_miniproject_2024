import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {genreService} from "../../services";
import {IGenres} from "../../interfaces/genres.interface";
import {RootState} from "../store";
import {IGenre} from "../../interfaces";

interface IState {
    genre: IGenre[],
    checkbox: IGenre[],
    genretrue: number[],
    theme: 'day' | 'night',
}

const initialState: IState = {
    genre: [],
    checkbox: [],
    genretrue: [],
    theme: 'day',
}

const getGenres = createAsyncThunk<IGenres, void>(
    'genreSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getGenres();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);


const slice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {
        checkBoxChange: (state, action) => {
            const genresWithStatus = state.genre.map((genre) => {
                if (genre.id === action.payload.id) {
                    return {
                        ...genre,
                        status: !genre.status,
                    };
                }
                return genre;
            });

            state.genre = genresWithStatus;


            const genreIdsWithStatusTrue = state.genre
                .filter((genre) => genre.status === true)
                .map((genre) => genre.id);
            state.genretrue = genreIdsWithStatusTrue as [];
        },
        clearGenre: (state, action) => {
            state.genre.forEach(genre => {
                if (genre.status) {
                    genre.status = false;
                }
            });

            state.genretrue = [];

        },

        themeSelector: (state) => {
            state.theme = state.theme === 'day' ? 'night' : 'day';
        },

    },
    extraReducers: builder =>
        builder
            .addCase(getGenres.fulfilled, (state, action) => {
                const {genres} = action.payload


                const genresWithStatus = genres.map((genre: IGenre) => ({
                    ...genre,
                    status: false,
                }));
                state.genre = genresWithStatus;
            })
})


const {actions, reducer: genreReducer} = slice;

const genreActions = {
    ...actions,
    getGenres,
}

export {
    genreActions,
    genreReducer,
}

