import axios from 'axios'

export const API_URL = "http://localhost:8000"

export const token = localStorage.getItem("alumneersToken")

axios.defaults.withCredentials = true;

export async function createEvent(data){
    const url = `${API_URL}/api/events/`
    return axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }).then(response => response.data)
}

export async function updateEvent(data, id){
    const url = `${API_URL}/api/events/${id}`
    return axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }).then(response => response.data)
}

export async function deleteEvent(id){
    const url = `${API_URL}/api/events/${id}`
    return axios.delete(url).then(response => response.data)
}

export async function getEvents() {
    const url = `${API_URL}/api/events/`
    return axios.get(url).then(response => response.data)
}

export async function getOneEvent(id) {
    const url = `${API_URL}/api/events/${id}`
    return axios.get(url).then(response => response.data)
}

export async function handleRegister(data){
    const url = `${API_URL}/api/events/event/rsvp`
    return axios.post(url, data).then(response => response.data)

}


export async function signup(data){
    const url = `${API_URL}/api/users/signup`
    return axios.post(url, data).then(response => response.data)
}

export async function verifyEmail(data){
    const url = `${API_URL}/api/users/verify-email`
    return axios.post(url, data).then(response => response.data)
}

export async function login(data){
    const url = `${API_URL}/api/users/login`
    return axios.post(
            url, data,
            )
            .then(response => response.data)
}

//Logout
export async function logout(){
    const url = `${API_URL}/api/users/logout`
    return axios.get(url).then(response => response.data)
}

export async function getCurrentUser(token){
    const url = `${API_URL}/api/users/me`
    return axios.post(url, {token}).then(response => response.data)
}

export async function getMyEvents(userId){
    const url = `${API_URL}/api/events/user/${userId}`
    return axios.get(url).then(response => response.data)
}

export async function getMyRegisteredEvents(userId){
    const url = `${API_URL}/api/events/user/${userId}/registered`
    return axios.get(url).then(response => response.data)
}

export async function getUsers(){
    const url = `${API_URL}/api/users/`
    return axios.get(url).then(response => response.data)
}

export async function getOneUser(id){
    const url = `${API_URL}/api/users/${id}`
    return axios.get(url).then(response => response.data)
}

export async function updateUser(data, id){
    const url = `${API_URL}/api/users/${id}`
    return axios.put(url, data).then(response => response.data)
}

export async function changePassword(id, data){
    const url = `${API_URL}/api/users/change-password/${id}`
    return axios.put(url, data).then(response => response.data)
}

export async function softDeleteUser(id){
    const url = `${API_URL}/api/users/soft-delete/${id}`
    return axios.delete(url).then(response => response.data)
}

export async function changeProfilePicture(id, data){
    const url = `${API_URL}/api/users/change-profile-picture/${id}`
    return axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }).then(response => response.data)
}