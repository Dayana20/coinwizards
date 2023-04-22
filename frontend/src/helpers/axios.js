import axios from "axios"

// uses cloud mongodb
const baseURL = process.env.REACT_APP_DEV_URL

// uses local
// const baseURL = process.env.REACT_APP_DEV_URL

const axiosInstance = axios.create({
    baseURL: baseURL,
})

export default axiosInstance
