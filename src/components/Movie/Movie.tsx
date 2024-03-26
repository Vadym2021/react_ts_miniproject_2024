import React, {FC} from 'react';
import {Link} from "react-router-dom";

import {IMovie} from "../../interfaces";
import {Genre} from '../Genre/Genre';
import css from "./Movie.module.css"
import {Rating} from '../Stars/Stars';
import {useAppSelector} from "../../hooks";


interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {

    // const [rating, setRating] = React.useState(0);
    const {title, genre_ids, release_date, id, poster_path, vote_average} = movie;
    const {theme} = useAppSelector(state => state.genreReducer);


    return (
        <div className={`${css.moviegrid} ${theme === 'night' ? css.night : css.day}`}>
            <div className={css.moviewrap}>
                <Link className={`${css.movie} ${theme === 'night' ? css.night : css.day}`} to={id.toString()}>

                    <div className={css.img}>
                        {poster_path ? (
                            <img
                                className={css.img}
                                // src="../../images/logo2.jpg"
                                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                                alt={title}
                            />
                        ) : (
                            <img
                                className={css.img}
                                src="/common.jpg"
                                alt="no poster"
                            />
                        )}
                    </div>
                    <div className={`${css.theme} ${theme === 'night' ? css.night : css.day}`}>
                        {title}</div>
                    <div className={`${css.theme} ${theme === 'night' ? css.night : css.day}`}>
                        {release_date}</div>


                    <div className={css.genres}>
                        {genre_ids.map((genre, index) => (
                            <Genre key={index} genre={genre}/>
                        ))}
                    </div>
                </Link>
                <div className={css.stars}>
                    <Rating
                        count={10}
                        value={vote_average}
                        edit={true}
                        // onChange={(value) => setRating(value)}
                    />
                </div>
            </div>

        </div>
    );
};

export {Movie};