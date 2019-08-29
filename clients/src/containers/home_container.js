import React, { Component } from 'react';
import { connect } from 'react-redux';
import WidgetUI from '../widgetsUI/widgetUI';

import { getBooks } from '../actions';

class HomeContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getBooks(2, 0,'desc'))
    }


    renderItems = (books) => (
        books.list ?
            books.list.map(item => (
            <WidgetUI {...item} key={item._id} />
        ))
        
        :
        null

    )


    loadMore = () => {
        const count = this.props.books.list.length;

        this.props.dispatch(getBooks(2, count, 'desc', this.props.books.list))
    }

    render() {
        return (
            <div>
                {this.renderItems(this.props.books)}

                <div className="loadmore"
                    onClick = { this.loadMore}
                >
                    LoadMore
                </div>
            </div>
        )
    }
}

function  mapStateToProps(state){
    return {
        books: state.books
    }
}


export default  connect(mapStateToProps)(HomeContainer)
