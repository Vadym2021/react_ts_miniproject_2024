import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";

import css from './Genres.module.css';
import {genreActions, movieActions} from "../../redux";
import {GenreSelect} from '../../components';

const GenresPage: FC = () => {
    const {genre, genretrue, theme} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();
    const [localyearform, setLocalyearform] = useState<{ dropyear: number | undefined }>({dropyear: undefined});
    const [searchform, setSearchform] = useState<{ searchText: string }>({searchText: ''});


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
    };

    const applyHandler = () => {
        if (searchform.searchText.trim() !== '') {
            dispatch(movieActions.searchMovies({
                year: localyearform.dropyear,
                searchText: searchform.searchText,
                page: 1
            }));
        } else {
            dispatch(movieActions.getMovies({
                year: localyearform.dropyear,
                genretrue,
                page: 1
            }));
        }
    };

    const handleClear = () => {
        setSearchform({searchText: ''});
        setLocalyearform({dropyear: undefined});
        dispatch(genreActions.clearGenre(false));
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                applyHandler();
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    applyHandler();
                }
            }}
        >
            <div className={`${css.genresbody} ${theme === 'night' ? css.night : css.day}`}>
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
                    <div>
                        <button onClick={handleClear} className={css.buttonSearch}>Сбросить</button>
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
                    <div
                        className={searchform.searchText.trim() !== '' ? `${css.genreslist} ${css.disabled}` : css.genreslist}>
                        {genre.map(genreItem => (
                            <GenreSelect
                                key={genreItem.id}
                                genre={genreItem}
                                disabled={searchform.searchText.trim() !== ''}
                            />
                        ))}
                    </div>
                    <button type="submit" className={css.buttonSearch}>Найти</button>
                </div>
            </div>
        </form>
    );
};

export {GenresPage};
