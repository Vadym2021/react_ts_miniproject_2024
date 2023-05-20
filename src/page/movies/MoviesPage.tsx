import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import {Movie} from '../../components/Movie/Movie';
import {useForm} from 'react-hook-form';



import css from "./MoviesPage.module.css";
import {Outlet} from "react-router-dom";


const MoviesPage: FC = () => {
    const {movies} = useAppSelector(state => state.movieReducer);
    const {page, total_pages, total_results} = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const genretrue = useAppSelector(state => state.genreReducer.genretrue);




    const {register, handleSubmit,} = useForm();


    useEffect(() => {
        dispatch(movieActions.getMovies({year: 2023, genretrue: genretrue, page}))
    }, [dispatch,page])

    const onSubmit = (droppage: any) => {
        const page = [];
        for (let index in droppage) {
            page.push(droppage[index])
            console.log(page)
        }
        // @ts-ignore
        dispatch(movieActions.setPage(page));
    };


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
                        <input type="number" placeholder={'номер стр. от 1 до 500'} {...register('droppage')}/>
                        <button type="submit">перейти</button>
                    </form>
                </div>
                <div className={css.paginator}>
                    <div>
                        <button onClick={() => dispatch(movieActions.setPage(page < 2 ? page : page - 1))}>
                            Prev Page
                        </button>
                    </div>
                    <div>Films found: {total_results}</div>
                    <div>Page: {page} of {total_pages}</div>
                    <div>
                        <button onClick={() => dispatch(movieActions.setPage(page >= total_pages ? page : page + 1))}>
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MoviesPage};