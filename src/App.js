import React from 'react';
import axios from './components/config/axios'
import { BrowserRouter, Route, Link ,Switch} from 'react-router-dom'

import Register from './components/register'
import Login from './components/login'
import Home from './components/home'

import ContactList from './components/contact/contactList'
import ContactShow from './components/contact/contactShow'
import ContactNew from './components/contact/contactNew'
import ContactEdit from './components/contact/contactEdit'

function App() {
  function handleClick() {
    axios.delete('/users/logout', {
      headers: {
        'x-auth' : localStorage.getItem('authToken')
      }
    })
    .then(response => {
      console.log(response)
      alert(response.data.notice)
      localStorage.removeItem('authToken')
      window.location.reload()
      window.location.href = "/"
    })
  }
  return (
    <BrowserRouter>
    <div>
        <h1>Contact Manager</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          {
            localStorage.getItem('authToken') ? (
              <div>
                <li><Link to="/contacts">Contacts</Link></li>
                <li><Link to="#" onClick={handleClick}>Logout</Link></li>
              </div>
            ) : (
              <div>
                <li><Link to="/users/register">Register</Link></li>
                <li><Link to="/users/login">Login</Link></li>
              </div>
            )
          }
        </ul>
        <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />
        <Route path="/contacts" component={ContactList} exact={true} />
        <Route path ="/contacts/new" component={ContactNew} exact={true}/>
        <Route path ="/contacts/:id" component={ContactShow}  exact={true}/>
      
        <Route path ="/contacts/edit/:id" component={ContactEdit} exact={true}/>
        </Switch>
    </div> 
    </BrowserRouter>
  )
}

export default App;