import React from 'react'
import BookReview from '../../containers/book_review_Container';

function BookView(props){
    return (
        <div>
            <BookReview {...props} />
        </div>
    )
}

export default BookView
