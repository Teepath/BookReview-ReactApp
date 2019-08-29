export default function(state={}, action){

    switch(action.type){
        case 'GET_BOOKS':
            return{...state, list: action.payload}

        case 'GET_BOOK_W_REVIEWER':
            return{
                ...state, 
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
            case 'clearBookWithReviewer':
                return{
                    ...state, 
                    book: action.payload.book,
                    reviewer: action.payload.reviewer
                }

            case 'ADD_BOOK':
                return {
                    ...state, newbook: action.payload
                }

            case 'CLEAR_NEW_BOOK':
                return {...state, newbook: action.payload
                
                }
            case 'UPDATE_BOOK':
                return {...state, 
                            updateBook: action.payload.success,
                            book: action.payload.doc
                        }
            case 'DELETE_BOOK':
                return {
                    ...state, 
                        postDelete: action.payload
                }
            case 'GET_BOOK':
                return {...state, book: action.payload
                }

            case 'CLEAR_BOOK':
                return {
                    ...state, 
                    book: action.payload.book,
                    updateBook: action.payload.updateBook,
                    postDelete: action.payload.postDelete
    
                }

           

           
        default: 
            return state
    }
}