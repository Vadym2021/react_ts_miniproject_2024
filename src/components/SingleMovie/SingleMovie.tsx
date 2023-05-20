import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../../redux";
import {useAppSelector} from "../../hooks";
import {ISingleMovie} from "../../interfaces/singlemovie.interface";

import css from './SingleMovie.module.css'



const SingleMovie = () => {

    const {SingleMovie} = useAppSelector(state => state.movieReducer);
    console.log(SingleMovie)





    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(movieActions.getMovieById({id}));
            console.log(id);

    }, [dispatch,id]);



    return (
        <div>
            {/*<div className={css.singlemovie}>*/}
            {/*    <div>{SingleMovie.title}</div>*/}
            {/*    <div>{SingleMovie.tagline}</div>*/}
            {/*    <div className={css.img}><img className={css.img}*/}
            {/*                                  src={'https://image.tmdb.org/t/p/original' + `${movie.backdrop_path}`}*/}
            {/*                                  alt=""/></div>*/}
            {/*    <div>Story : {movie.overview}</div>*/}
            {/*    <div>Жанр:</div>*/}

            {/*    <div>*/}
            {/*        {*/}
            {/*            smgenres.map(genreid => <img src={`${genreid.id}` + '.jpg'} alt=""/>)*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <div>Дата выхода : {movie.release_date}</div>*/}
            {/*    <div>Рейтинг : {movie.vote_average}</div>*/}
            {/*    <div>Сайт : {movie.homepage}</div>*/}

            {/*</div>*/}

        </div>
    );
};

export {SingleMovie};