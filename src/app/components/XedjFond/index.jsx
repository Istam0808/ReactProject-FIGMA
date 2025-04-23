import React from 'react';
import './style.scss';


function XedFond() {
    return (
        <div className="xedj-fond">
            <div className="background-overlay"></div>
            <div className="content">
                <div className="container">
                    <h1 className="title">Хедж-фонд</h1>
                    <p className="description">
                        Классический выбор профессиональных инвесторов с заданными умеренными 
                        параметрами риска. Основан на инвестировании в бумаги индекса S&P 500 с 
                        диверсификацией по 11 секторам экономики.
                    </p>
                    <button className="details-btn">Подробнее</button>
                </div>
            </div>
        </div>
    );
}

export default XedFond;