import React from 'react'


class ContactForm extends React.Component {
    constructor(Props) {
        super(Props)
        this.state = {
            name:Props.contact ? Props.contact.name : '',
            mobile:Props.contact ? Props.contact.mobile : '',
            email: Props.contact ? Props.contact.email :'',
            category:Props.contact ? Props.contact.category:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        //console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile,
            category:this.state.category
        }
        console.log(formData)
        this.props.handleSubmit(formData)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name <input type="text" value={this.state.name} onChange={this.handleChange} name="name"/>
                    </label> <br/>
                    <label>
                        Email <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br/>
                    <label>
                        Mobile <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                    </label> <br/>
                    <label>
                      <input type='radio' name='category' value='home' onChange={this.handleChange} /> home
                  </label>
                  <label>
                  <input type='radio' name='category' value='work' onChange={this.handleChange} /> work
                  </label> <br/>
                    <input type="submit" />

                </form>
            </div>
        )
    }
}

export default ContactForm 