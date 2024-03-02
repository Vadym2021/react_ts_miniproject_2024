import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { movieActions, RootState } from '../../redux';
import { ISingleMovie } from '../../interfaces/singlemovie.interface';
import css from './SingleMovie.module.css';
import { IVideo } from '../../interfaces';

const SingleMovie = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(movieActions.getMovieById({ id: parseInt(id!) }) as any);
        dispatch(movieActions.getMovieVideo({ id: parseInt(id!) }) as any);

        window.scrollTo(0, 0);
    }, [dispatch, id]);

    const { SingleMovie, movieVideos }: { SingleMovie: ISingleMovie | null; movieVideos: IVideo[] } = useSelector((state: RootState) => ({
        SingleMovie: state.movieReducer.SingleMovie,
        movieVideos: state.movieReducer.movieVideos,
    }));

    const handleCloseClick = () => {
        dispatch(movieActions.closeSingleMovie());
    };

    if (!SingleMovie) {
        return null;
    }

    const { title, genres, poster_path, backdrop_path }: ISingleMovie = SingleMovie;

    const trailerVideo = movieVideos.find((video) => video.type === 'Trailer');

    return (
        <div>
            <div className={css.singlemovie}>
                <button className={css.closeButton} onClick={handleCloseClick}>
                    <span className={css.closeIcon}>&times;</span>
                </button>
                <div>{SingleMovie.title}</div>
                <div>{SingleMovie.tagline}</div>
                <div className={css.img}>
                    {backdrop_path ? (
                        <img className={css.img} src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt={title} />
                    ) : (
                        <img className={css.img} src={`https://image.tmdb.org/t/p/original${poster_path}`} alt={title} />
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
                <div>
                    {trailerVideo && (
                        <iframe
                            key={trailerVideo.id}
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                            title={trailerVideo.name}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </div>
    );

};

export { SingleMovie };
