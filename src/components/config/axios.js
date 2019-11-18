import Axios from 'axios'

const config = Axios.create({
    baseURL: 'http://localhost:3020'
})

export default config