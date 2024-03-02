import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Genres.module.css'
import {genreActions, movieActions} from "../../redux";
import {GenreSelect} from '../../components';


const GenresPage: FC = () => {

    const {genre} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();
    const [localyearform, setLocalyearform] = useState<{ dropyear: number | undefined }>({dropyear: undefined});
    const [searchform, setSearchform] = useState<{ searchText: string }>({searchText: ''});
    const genretrue = useAppSelector(state => state.genreReducer.genretrue);


    useEffect(() => {
        dispatch(genreActions.getGenres())
    }, [dispatch])

    const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dropyear: number = parseInt(e.target.value);
        setLocalyearform({dropyear: isNaN(dropyear) ? undefined : dropyear});

    };
    const formHandlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        setSearchform({searchText});
        // setSearchform(prevState => ({ ...prevState, searchText }));
    };

    const applyHandler = () => {
        if (searchform.searchText.trim() !== '') {
            dispatch(movieActions.searchMovies({
                searchText: searchform.searchText, page: 1
            }));
        } else {
            dispatch(movieActions.getMovies({
                year: localyearform.dropyear,
                genretrue,
                page: 1
            }));
        }
    };


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            applyHandler();
        }}>
            <div className={css.genresbody}>
                <div className={css.searchbody}>
                    <div className={css.dropyear}>
                        <div> Год выпуска:</div>
                        <label>
                            <input
                                type="text"
                                name="dropyear"
                                value={localyearform.dropyear === undefined ? '' : localyearform.dropyear}
                                onChange={formHandler}
                                placeholder="год выпуска"
                            />
                        </label>
                    </div>
                    <div className={css.dropyear}>
                        <div> Поиск :</div>
                        <label>
                            <input
                                type="text"
                                name="searchText"
                                value={searchform.searchText === undefined ? '' : searchform.searchText}
                                onChange={formHandlerSearch}
                                placeholder="поиск"
                            />
                        </label>

                    </div>
                </div>
                <div className={css.genres}>
                    <div className={css.genreslist}>
                        {genre.map(genre => <GenreSelect key={genre.id} genre={genre}/>)}
                    </div>
                    <button type="submit" className={css.buttonSearch}>Найти</button>
                </div>
            </div>
        </form>

    );

};

export {GenresPage};