import React, {useState} from 'react';


import css from "./Stars.module.css"
import {FaStar} from "@react-icons/all-files/fa/FaStar";


const Stars = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)

    // const starArray = [
    //     {id: 1, i: 11},
    //     {id: 2, i: 12},
    //     {id: 3, i: 13},
    //     {id: 4, i: 14},
    //     {id: 5, i: 15},
    //     {id: 6, i: 16},
    //     {id: 7, i: 17},
    //     {id: 8, i: 18},
    //     {id: 9, i: 19},
    //     {id: 10, i: 20}
    // ];

    return (
        <div>
            {
                [...Array(10)].map((star, i) => {
                    // key = Math.floor(Math.random() * 1000);
                    const ratingValue = i + 1;
                    // console.log(Array)

                    return <label>
                        {/*key = {Math.floor(Math.random() * 1000)}*/}
                        {/*key = {star.id}*/}
                        <input
                            // key = {star.id}
                            key = {Math.floor(Math.random() * 100000000000000)}
                            type="radio" name="rating" value={ratingValue}
                            // onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                            // key = {star.id}
                            // key = {Math.floor(Math.random() * 10000)}
                            // className={css.star} color={ratingValue <= (hover || rating) ? "#ffc107" : "darkgrey"}
                            // onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                        {/*key = {star.id}*/}
                    </label>
                })}
        </div>
    );
};

export {Stars};