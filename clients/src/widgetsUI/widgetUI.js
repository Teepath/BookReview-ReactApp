import React from 'react';
import { Link } from 'react-router-dom';

const WidgetUI = (item) => {
    return (
        <Link to={`/books/${item._id}`} className="book_item" >
            <div className="book_header" >
                <h2> {item.name}</h2>
            </div>
            <div className="book_items">
                <div className="book_author">{item.author}</div>
                <div className="book_bubble">
                    <strong> Price</strong>$ {item.price}
                </div>
                <div className="book_bubble">
                    <strong> Pages</strong> {item.pages}
                </div>

                <div className="book_bubble rating">
                    <strong> Pages</strong> {item.rating}
                </div>   
            </div>
            
        </Link>
    )
};

export default WidgetUI

