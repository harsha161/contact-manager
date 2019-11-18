import React from 'react'
import axios from 'axios'
import ContactForm from './contactForm'

class ContactEdit extends React.Component {
    constructor(){
        super()
        this.state={
            contact:{}
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`http://localhost:3020/contacts/${id}`, {
            headers: {
                'x-auth' :localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const contact = response.data
            this.setState({contact})
        })
    }
    handleSubmit(formData){
        const id= this.props.match.params.id
        axios.put(`http://localhost:3020/contacts/${id}`, 
        formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response =>{
            if(response.data.hasOwnProperty('errors')) {
                alert(response.data.message)
            } else {
                this.props.history.push(`/contacts/${response.data._id}`)
            }
        })
    }
    render() {
        return (
            <div>
                <h2>Edit Contact</h2>
                {Object.keys(this.state.contact).length !==0 && <ContactForm  contact={this.state.contact} handleSubmit ={this.handleSubmit}  /> }
                   
                </div>
        )
    }
}

export default ContactEdit