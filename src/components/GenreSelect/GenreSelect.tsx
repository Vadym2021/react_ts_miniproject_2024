import React, {FC} from 'react';
import {useDispatch} from "react-redux";

import css from "../GenreSelect/GenreSelect.module.css";
import {genreActions} from "../../redux";
import {IGenre} from "../../interfaces";

interface IProps {
    genre: IGenre
}


const GenreSelect: FC<IProps & { disabled: boolean }> = ({genre, disabled}) => {
    const {id, name} = genre;
    const dispatch = useDispatch();

    return (
        <div className={css.genre}>
            <label className={genre.status ? css.checkedButton : css.button}>
                {name}
                <input
                    type="checkbox"
                    checked={Boolean(genre.status)}
                    onChange={() => dispatch(genreActions.checkBoxChange({id}))}
                    className={css.hiddenCheckbox}
                    disabled={disabled}
                />
            </label>
        </div>
    );
};

export {GenreSelect};