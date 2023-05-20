import React, {FC, useEffect, useState} from 'react';



import css from './Genres.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import {GenreSelect} from '../../components';


const GenresPage: FC = () => {

    const {genre} = useAppSelector(state => state.genreReducer);
    const dispatch = useAppDispatch();
    const [localyearform, setLocalyearform] = useState<{ dropyear: number }>({dropyear: 2023});
    const genretrue = useAppSelector(state => state.genreReducer.genretrue);


    useEffect(() => {
        dispatch(genreActions.getGenres())
    }, [dispatch])

    const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dropyear: number = parseInt(e.target.value);
        setLocalyearform({dropyear});
        console.log(localyearform)
    };


    return (
        <div className={css.genresbody}>
            <div className={css.dropyear}>
                <div> Год выпуска:</div>
                <label>
                    <input
                        type="text"
                        name="dropyear"
                        value={isNaN(localyearform.dropyear) ? '' : localyearform.dropyear}
                        onChange={formHandler}
                        placeholder="год выпуска"
                    />

                </label>
            </div>
            <div className={css.genres}>
                <div>
                    {genre.map(genre => <GenreSelect key={genre.id} genre={genre}/>)}
                </div>
                <button onClick={() => dispatch(movieActions.getMovies({
                    year: localyearform.dropyear,
                    genretrue,
                    page:1
                }))}>Применить
                </button>
            </div>
        </div>
    );

};

export {GenresPage};