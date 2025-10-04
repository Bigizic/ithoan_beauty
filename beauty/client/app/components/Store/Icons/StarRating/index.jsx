import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "./style.css";

const StarRating = ({ onInputClick, value, lock }) => {
    const [rating, setRating] = useState(value || 0);
    const [hover, setHover] = useState(null);

    return (
        <div className='star_rating'>
            {[1, 2, 3, 4, 5].map((index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="rating"
                        value={index}
                        onClick={() => {
                            { !lock &&
                                setRating(index);
                                if (!lock && onInputClick) onInputClick(index);
                            }
                        }}
                    />
                    <FaStar
                        className='star'
                        size={20}
                        color={index <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                        onMouseEnter={() => !lock && setHover(index)}
                        onMouseLeave={() => !lock && setHover(null)}
                    />
                </label>
            ))}
        </div>
    );
};

export default StarRating;
