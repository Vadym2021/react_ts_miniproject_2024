import React, {FC} from 'react';


import css from "./Genre.module.css"

interface IProps {
    genre: number
}

const Genre: FC<IProps> = ({genre}) => {


    return (
        <div>
            <div className={css.genreid}>
                <img className={css.genreimg} src={`${genre}` + '.jpg'} alt=""/>
            </div>
        </div>
    );
};

export {Genre};