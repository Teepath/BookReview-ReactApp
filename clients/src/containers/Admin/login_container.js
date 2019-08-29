import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserLogin } from '../../actions';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        success: false
    }

    sumbitForm = (e) =>{

        e.preventDefault();

        this.props.dispatch(UserLogin(this.state));

    }

    handleInput = (event) =>{
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user');
        }
    }

    render() {

        const user = this.props.user;
        return (
            <div className = "rl_container">
            <form onSubmit={ this.sumbitForm}>
            <h2> User Login</h2>
                <div className="form_element">
                    <input 
                        type="email"
                        name = 'email'
                        value = {this.state.email}
                        placeholder="Enter your mail"
                        onChange = { this.handleInput }
    
                    />
                </div>

                <div className="form_element">
                <input 
                    type="password"
                    name = 'password'
                    value = { this.state.password}
                    placeholder="Enter your password"
                    onChange = {this.handleInput}
                
                />
                </div>

                <button type="submit"> Login</button>

                <div className="error">{
                user.login ?
                    <div> {user.login.message}</div>
                        : null    
                        } 
                </div>
                
            </form>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        user: state.user
    }
}



export default connect(mapStateToProps)(Login);