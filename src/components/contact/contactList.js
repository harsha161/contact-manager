import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../config/axios'

export default class ContactList extends React.Component{
    constructor() {
        super()
        this.state = {
            contacts: []
        }
    }

    handleRemove = (id) => {
        const confirmRemove = window.confirm("Are you Sure?")
        if(confirmRemove) {
            axios.delete(`/contacts/${id}`, {
                headers : {
                    'x-auth' : localStorage.getItem('authToken')
                }
            })
            .then(response => {
                console.log(response.data)
                this.setState(prevState => ({
                    contacts: prevState.contacts.filter(contact => contact._id !== response.data._id)
                }))
            })
        }
    }

    componentDidMount() {
        axios.get('/contacts', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const contacts = response.data
            this.setState({contacts})
        })
    }

    render() {
        return (
            <div>
                <h2>Listing contacts - { this.state.contacts.length }</h2>
                
                <table border="1">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>category</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.contacts.map(contact => {
                               return (
                                   <tr key={contact._id}>
                                       <td>{contact._id}</td>
                                       <td>{contact.name}</td>
                                       <td>{contact.email}</td>
                                       <td>{contact.mobile}</td>
                                       <td>{contact.category}</td>
                                       <td>
                                           <Link to={`contacts/${contact._id}`}>Show</Link> ||
                                           <button onClick={() => {
                                               this.handleRemove(contact._id)
                                           }}>Remove</button>
                                       </td>
                                    </tr>
                               )
                           }) 
                        }
                    </tbody>
                </table>
                <Link to="/contacts/new"> Add Contact </Link>
            </div>
        )
    }
}
