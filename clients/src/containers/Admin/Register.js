import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { getUsers, userRegistration } from '../../actions'
import { Link } from 'react-router-dom';

class Register extends PureComponent {

        state = 
            {formdata:
            {
            email: '',
            password: '',
            name:'',
            lastname:'',
            error: ''
            }
            };


        handleInput = (event, name)=>{
            const newForm = {...this.state.formdata}
            newForm[name] = event.target.value;
            this.setState({
                formdata: newForm
            })
        }

        componentDidMount() {
            this.props.dispatch(getUsers())
        }
    
        componentWillReceiveProps(nextProps){
            if(nextProps.user.register === false ){
                this.setState({formdata:{error: 'Error, try again'}})
            } else{
                this.setState({
                   formdata:{
                       name:'',
                    lastname: '',
                    email:'',
                    password:''
                   }
                })
            }
            
        }

        submitForm = (e) => {

            e.preventDefault();
            this.setState({
                error:''
            })

            this.props.dispatch(userRegistration({
                email: this.state.formdata.email,
                password: this.state.formdata.password,
                name:this.state.formdata.name,
                lastname:this.state.formdata.lastname
                
            }, this.props.user.users))
        }

        showUsers = (user)=>(
            user.users ?
                user.users.map((item, i)=>(
                    <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                    </tr>
                ))
                :
                null
        );

        


        render() {
          let user = this.props.user  
            return (
                <div className = 'rl_container'>
                    <form onSubmit={this.submitForm}>
                        <h2> Register User</h2>
                        <div className="error">
                            {this.state.formdata.error}
                        </div>
                        <div className="form_element">
                            <input 
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                                value={this.state.formdata.name}
                                onChange={(event) => this.handleInput(event, 'name')}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Enter your lastname"
                                value={this.state.formdata.lastname}
                                onChange={(event) => this.handleInput(event, 'lastname')}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                                value={this.state.formdata.email}
                                onChange={(event) => this.handleInput(event, 'email')}
                            />
                        </div>

                        <div className="form_element">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={this.state.formdata.password}
                                onChange={(event) => this.handleInput(event, 'password')}
                            />
                        </div>

                        <div>
                            <button type="submit" > Add User</button>

                        </div>
                    </form>
                <hr />
                <div className="current_users">
                    <h4> Current users:</h4>
                    <table>
                        <thead>
                            <tr>
                                <th> Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUsers(user)}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register)