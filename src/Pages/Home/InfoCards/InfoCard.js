import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`card md:card-side shadow-xl text-white ${bgClass} p-6`}>
            <figure>
                <img src={icon} alt="Movie" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className=''>{description}</p>

            </div>
        </div>
    );
};

export default InfoCard;