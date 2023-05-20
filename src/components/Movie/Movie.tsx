import React, {FC} from 'react';
import {useAppDispatch} from "../../hooks";
import {IMovie} from "../../interfaces";
import {Genre} from '../Genre/Genre';
import {Link} from "react-router-dom";

import css from "./Movie.module.css"
import { Stars } from '../stars/Stars';

interface IProps {
    movie: IMovie
}

const Movie: FC<IProps> = ({movie}) => {


    const {title, genre_ids, backdrop_path, release_date,id} = movie;
    const dispatch = useAppDispatch();


    return (
        <div className={css.moviegrid}>
            <div className={css.moviewrap}>
                <Link className={css.movie} to={id.toString()}>

                <div className={css.img}><img className={css.img}
                                              src={'https://image.tmdb.org/t/p/original' + `${movie.backdrop_path}`}
                                              alt=""/></div>
                <div>{title}</div>
                <div>{release_date}</div>


                <div className={css.genres}>
                    {
                        genre_ids.map(genre => <Genre genre={genre}/>)
                    }
                </div>
                </Link>
                <div className={css.stars}>
                    <Stars/>
                </div>
            </div>

        </div>
    );
};
// console.log(Genre)
export {Movie};