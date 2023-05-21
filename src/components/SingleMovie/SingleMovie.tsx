import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {movieActions, RootState} from "../../redux";
import {ISingleMovie} from "../../interfaces/singlemovie.interface";
import css from './SingleMovie.module.css'


const SingleMovie = () => {


    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(movieActions.getMovieById({ id: parseInt(id!) }) as any);

        window.scrollTo(0, 0);
    }, [dispatch, id]);

    const {SingleMovie}: { SingleMovie: ISingleMovie | null } = useSelector((state: RootState) => state.movieReducer);
    if (!SingleMovie) {
        return null;
    }
    const {title,genres,poster_path,backdrop_path}: ISingleMovie = SingleMovie;


    return (
        <div>
            <div className={css.singlemovie}>
                <div>{SingleMovie.title}</div>
                <div>{SingleMovie.tagline}</div>
                <div className={css.img}>
                    {backdrop_path ? (
                        <img
                            className={css.img}
                            // src="../../images/logo2.jpg"
                            src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                            alt={title}
                        />
                    ) : (
                        <img
                            className={css.img}
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt="no poster"
                        />
                    )}
                </div>
                <div>Story : {SingleMovie.overview}</div>

                <div>Жанр:</div>

                <div>
                    {genres.map((genre) => (
                        <img key={genre.id} src={`/genresimages/${genre.id}.jpg`} alt="" />
                    ))}
                </div>
                <div>Дата выхода : {SingleMovie.release_date}</div>
                <div>Рейтинг : {SingleMovie.vote_average}</div>
                <div>Сайт : {SingleMovie.homepage}</div>

            </div>

        </div>
    );
};

export {SingleMovie};