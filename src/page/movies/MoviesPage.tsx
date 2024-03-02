import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";

import {movieActions} from "../../redux";
import {Movie} from '../../components';
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';


import css from "./MoviesPage.module.css";
import {Outlet} from "react-router-dom";


const MoviesPage: FC = () => {
    const {movies} = useAppSelector(state => state.movieReducer);
    const {page, total_pages, total_results,year} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const genretrue = useAppSelector(state => state.genreReducer.genretrue);
    const searchMethod = useAppSelector(state => state.movieReducer.searchMethod);
    const searchText = useAppSelector(state => state.movieReducer.searchText);



    const {register, handleSubmit,} = useForm();


    // useEffect(() => {
    //     dispatch(movieActions.getMovies({year: undefined , genretrue: genretrue, page}))
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [dispatch, page])

    useEffect(() => {
        if (searchMethod === 'searchMovies') {

            dispatch(movieActions.searchMovies({searchText, page}));
        } else {

            dispatch(movieActions.getMovies({year: year, genretrue, page}));
        }

    }, [dispatch, page, searchMethod, genretrue,searchText,year])


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const page = parseInt(data.droppage);
        if (page >= 1 && page <= total_pages) {
            dispatch(movieActions.setPage(page));
        } else {
            dispatch(movieActions.setPage(page));
        }
    };


    // const onSubmit = (droppage: any) => {
    //     const page = [];
    //     for (let index in droppage) {
    //         page.push(droppage[index])
    //     }
    //     dispatch(movieActions.setPage(page[0]));
    // };


    return (
        <div>
            <div>
                <Outlet/>
            </div>

            <div className={css.movies}>
                {movies.map(movie => <Movie key={movie.id} movie={movie}/>)}
            </div>

            <div className={css.pagenav}>
                <div className={css.droppage}>
                    <div> Перейти на страницу</div>
                    <form className={css.droppageform} onSubmit={handleSubmit(onSubmit)}>
                        <input type="number" min="1" max={total_pages} placeholder={`номер стр. от 1 до 500`} {...register('droppage')} />
                        <button type="submit" className={css.buttonNPJump}>перейти</button>
                    </form>
                </div>
                <div className={css.paginator}>
                    <div>
                        <button onClick={() => dispatch(movieActions.setPage(page < 2 ? page : page - 1))} className={css.buttonNPJump}>
                            Prev Page
                        </button>
                    </div>
                    <div>Films found: {total_results}</div>
                    <div>Page: {page} of {total_pages}</div>
                    <div>
                        <button onClick={() => dispatch(movieActions.setPage(page >= total_pages ? page : page + 1))} className={css.buttonNPJump}>
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MoviesPage};