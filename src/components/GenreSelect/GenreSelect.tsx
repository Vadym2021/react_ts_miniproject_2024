import React, {FC} from 'react';
import {useDispatch} from "react-redux";

import css from "../GenreSelect/GenreSelect.module.css";
import {checkBoxChange} from "../../redux";
import {IGenre} from "../../interfaces";

interface IProps {
    genre: IGenre
}

const GenreSelect: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    const dispatch = useDispatch();


    return (
        <div className={css.genre}>
            {/*<div>{name}</div>*/}
            <label className={genre.status ? css.checkedButton : css.button}>
                {name}
                <input
                    type="checkbox"
                    checked={Boolean(genre.status)}
                    onChange={() => dispatch(checkBoxChange({id}))}
                    className={css.hiddenCheckbox}
                />
            </label>
            {/*<input type="checkbox" checked={Boolean(genre.status)} onChange={() => dispatch(checkBoxChange({id}))}/>*/}
        </div>
    );
};

export {GenreSelect};