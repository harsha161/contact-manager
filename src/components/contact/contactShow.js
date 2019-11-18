import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import config from '../config/axios'


class ContactShow extends React.Component {
    constructor() {
        super()
        this.state = {
            contact : {}
        }
    }

    handleRemove = () => {
        const id = this.props.match.params.id
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            axios.delete(`/contacts/${id}`, {
                headers: {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(reponse => {
                this.props.history.push('/contacts')
            })
        }   
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3020/contacts/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            const contact = reponse.data
            //console.log(customer)
            this.setState({ contact })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    render() {
        console.log(this.props.match.params.id)
        return (
            <div>
                <h2>Contact Show Page</h2>
                <p>
                    {this.state.contact.name},<br/>
                    {this.state.contact.email}, <br/>
                    {this.state.contact.mobile} ,<br/>
                    {this.state.contact.category}
                </p>
                <Link to={`/contacts/edit/${this.state.contact._id}`}>edit</Link>
                <button onClick={this.handleRemove}>Delete</button> ||
                <Link to="/contacts">Back</Link>
            </div>
        )
    }
}

export default ContactShow