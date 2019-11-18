import React from 'react'
import axios from '../components/config/axios'

export default class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            mobile:'',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            mobile:this.state.mobile,
            password: this.state.password
        }
        axios.post('/users/register',formData)
       .then((response)=>{
           console.log(formData)
           if(response.data.hasOwnProperty('error')){
               alert(response.data.message)
           }else{
               this.props.history.push('/users/login')
           }
       })
       .catch((err)=>{
           console.log(err)
       })
    
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div>
                <h1>Registration</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        username:
                        <input type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
                    </label> <br />
                    <label>
                        email:
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br />
                    <label>
                    mobile:
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                    </label> <br />
                    <label>
                        password:
                        <input  type="password"  autoComplete="off" value={this.state.password} onChange={this.handleChange} name="password" />
                    </label> <br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}