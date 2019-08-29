import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { getBook, updateBook, clearBook, deletePost }from '../../actions'


class EditView extends PureComponent {

        state = {formdata: {
            _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }

    }

    handleInput = (event, name)=>{

       const newFormData = {...this.state.formdata}
            newFormData[name] = event.target.value;

            this.setState({
                formdata: newFormData
            })

        }


        submitForm = (e)=>{

            e.preventDefault();
            this.props.dispatch(updateBook(this.state.formdata))

        }

        showNewBook = (book) =>(
            book.post ?
                <div className="conf_link"> 
                    Post Success!!<Link to={`/books/${book.bookId}`}>
                        Click the link to see the post
                    </Link>
                     
                </div>
                
                : 
                null

                )

                //getting books

        componentWillMount() {
            this.props.dispatch(getBook(this.props.match.params.id))
        }

        //updating books
        componentWillReceiveProps(nextProps){
            let book = nextProps.books.book;
                 
            this.setState({
                formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review: book.review,
                pages:book.pages,
                rating: book.rating,
                price:book.price
                }
            })
        }
            //clearing books from catche after delete
        componentWillUnmount(){
            this.props.dispatch(clearBook())
        }


        //delete methods

        deleteBookPost = () => {
            this.props.dispatch(deletePost(this.props.match.params.id))
        }

        redirectUser = ()=>{
            setTimeout(()=>{
                this.props.history.push('/user/user-reviews')
            }, 1000)
        }

         render() {
             let books = this.props.books;
             
        return (
            <div className= " rl_container article">

               
                {
                    books.updateBook ?
                    <div className ="edit_confirm"> 
                    Post  updates, <Link to={`/books/${books.book._id}`}> Click to see your update</Link>
                    </div>: null
                }


                {
                    books.postDelete ?
                    <div className="red_flag"> Post deleted 
                    
                     { this.redirectUser()}
                    </div>
                    
                    : null
                }
                <form onSubmit={this.submitForm}>
                    <h2> Edit Review</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder = "Enter Name of The book"
                            value = {this.state.formdata.name}
                            onChange = {(event) => this.handleInput(event, 'name')}
                        />

                        </div>

                    <div className="form_element">
                        <input
                            type="text"
                            placeholder = "Enter author name"
                            value = {this.state.formdata.author}
                            onChange = {(event) => this.handleInput(event, 'author')}
                        />
                    
                    </div>

                    <div className="form_element">
                    <textarea
                        value = {this.state.formdata.review}
                        onChange = {(event) => this.handleInput(event, 'review')}
                    />
                
                </div>


                <div className="form_element">
                <input
                    type="number"
                    placeholder = "Enter pages"
                    value = {this.state.formdata.pages}
                    onChange = {(event) => this.handleInput(event, 'pages')}
                />
            
            </div>

            <div className="form_element">
            <select
                value = {this.state.formdata.rating}
                onChange = {(event) => this.handleInput(event, 'rating')}
            >

            <option value="1"> 1 </option> 
            <option value="2"> 2</option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            </select>
        </div>
                
        <div className="form_element">
        <input
            type="number"
            placeholder = "Enter price"
            value = {this.state.formdata.price}
            onChange = {(event) => this.handleInput(event, 'price')}
        />        

        </div>

        <div>
            <button type="submit" > Edit</button>
            <div className="delete_post">
                <div className="button"
                    onClick= {this.deleteBookPost }> Delete Review</div>
            </div>
        </div>
                </form>
                 
            </div>
        )
    }
}

function mapStateToProps(state){

    return {

        books: state.books
    }
}

export default connect(mapStateToProps)(EditView)
