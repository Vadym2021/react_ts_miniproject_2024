import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";

import {movieActions} from "../../redux";
import {Movie} from '../../components';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';


import css from "./MoviesPage.module.css";
import {Outlet} from "react-router-dom";


const MoviesPage: FC = () => {
    const {theme, genretrue} = useAppSelector(state => state.genreReducer);
    const {
        movies,
        page,
        total_pages,
        total_results,
        year,
        searchMethod,
        searchText
    } = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch();


    const {register, handleSubmit,} = useForm();


    useEffect(() => {
        if (searchMethod === 'searchMovies') {

            dispatch(movieActions.searchMovies({searchText, year: year, page}));
        } else {

            dispatch(movieActions.getMovies({year: year, genretrue, page}));
        }

    }, [page])
// }, [dispatch, page, searchMethod, genretrue, searchText, year])


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const page = parseInt(data.droppage);
        if (page >= 1 && page <= total_pages) {
            dispatch(movieActions.setPage(page));
        } else {
            dispatch(movieActions.setPage(page));
        }
    };



    return (
        <div>
            <div>
                <Outlet/>
            </div>

            <div className={`${css.theme} ${theme === 'night' ? css.night : css.day}`}>
                <div className={`${css.movies} ${theme === 'night' ? css.night : css.day}`}>
                    {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
                </div>

                <div className={`${css.pagenav} ${theme === 'night' ? css.night : css.day}`}>
                    <div className={`${css.droppage} ${theme === 'night' ? css.night : css.day}`}>
                        <div> Перейти на страницу</div>
                        <form className={css.droppageform} onSubmit={handleSubmit(onSubmit)}>
                            <input type="number" min="1" max={total_pages}
                                   placeholder={`номер стр. от 1 до 500`} {...register('droppage')} />
                            <button type="submit" className={css.buttonNPJump}>перейти</button>
                        </form>
                    </div>
                    <div className={css.paginator}>
                        <div>
                            <button onClick={() => dispatch(movieActions.setPage(page < 2 ? page : page - 1))}
                                    className={css.buttonNPJump}>
                                Prev Page
                            </button>
                        </div>
                        <div>Films found: {total_results}</div>
                        <div>Page: {page} of {total_pages}</div>
                        <div>
                            <button
                                onClick={() => dispatch(movieActions.setPage(page >= total_pages ? page : page + 1))}
                                className={css.buttonNPJump}>
                                Next Page
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MoviesPage};