import React from 'react'
import axios from 'axios'
import ContactForm from './contactForm'

class ContactNew extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('http://localhost:3020/contacts', formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(reponse => {
            //console.log(reponse.data)
            if(reponse.data.hasOwnProperty('errors')) {
                alert(reponse.data.message)
            } else {
                this.props.history.push('/contacts')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>Add Contact</h2>
                <ContactForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default ContactNew