import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Movie} from '../Movie/Movie'

const Movies: FC = () => {
    const {movies} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieActions.getMovies())
    }, [dispatch])

    return (
        <div>
            {movies && movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
        </div>
    );
};

export {Movies};