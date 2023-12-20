import axios from 'axios'

export const API_URL = "https://alumineers-backend.onrender.com"
// export const API_URL = "http://localhost:8000"

export const token = localStorage.getItem("alumineersToken")

axios.defaults.withCredentials = true;

export async function createEvent(data, token){
    const url = `${API_URL}/api/events/`
    return axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function cancelEvent(id, token){
    const url = `${API_URL}/api/events/cancel/${id}`
    return axios.put(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)

}

export async function updateEvent(data, id, token){
    const url = `${API_URL}/api/events/${id}`
    return axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function deleteEvent(id, token){
    const url = `${API_URL}/api/events/${id}`
    return axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getEvents(token) {
    const url = `${API_URL}/api/events/`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getUpcomingEvents(){
    const url = `${API_URL}/api/events/upcoming`
    return axios.get(url).then(response => response.data)
}

export async function getOneEvent(id) {
    const url = `${API_URL}/api/events/${id}`
    return axios.get(url).then(response => response.data)
}

export async function handleRegister(data, token){
    const url = `${API_URL}/api/events/event/rsvp`
    return axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)

}


export async function signup(data){
    const url = `${API_URL}/api/users/signup`
    return axios.post(url, data).then(response => response.data)
}

export async function verifyEmail(data){
    const url = `${API_URL}/api/users/verify-email`
    return axios.post(url, data).then(response => response.data)
}

export async function forgotPassword(data){
    const url = `${API_URL}/api/users/forgot-password`
    return axios.put(url, data).then(response => response.data)

}

export async function login(data){
    const url = `${API_URL}/api/users/login`
    return axios.post(
            url, data,
            )
            .then(response => response.data)
}

//Logout
export async function logout(token){
    const url = `${API_URL}/api/users/logout`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getCurrentUser(token){
    const url = `${API_URL}/api/users/me`
    return axios.post(url, {token}, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getMyEvents(userId, token){
    const url = `${API_URL}/api/events/user/${userId}`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getMyRegisteredEvents(userId, token){
    const url = `${API_URL}/api/events/user/${userId}/registered`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getUsers(token){
    const url = `${API_URL}/api/users/`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getOneUser(id, token){
    const url = `${API_URL}/api/users/${id}`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function updateUser(data, id, token){
    const url = `${API_URL}/api/users/${id}`
    return axios.put(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function changePassword(id, data, token){
    const url = `${API_URL}/api/users/change-password/${id}`
    return axios.put(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function softDeleteUser(id, token){
    const url = `${API_URL}/api/users/soft-delete/${id}`
    return axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function changeProfilePicture(id, data, token){
    const url = `${API_URL}/api/users/change-profile-picture/${id}`
    return axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getRecentActivities(id, token){
    const url = `${API_URL}/api/activities/recent/${id}`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getAllUserActivities(id, token){
    const url = `${API_URL}/api/activities/user/${id}`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function createNews(data, token){
    const url = `${API_URL}/api/news/`
    return axios.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function updateNews(data, id, token){
    const url = `${API_URL}/api/news/${id}`
    return axios.put(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`

        },
      }).then(response => response.data)
}

export async function deleteNews(id, token){
    const url = `${API_URL}/api/news/${id}`
    return axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getAllNews(token){
    const url = `${API_URL}/api/news/`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function getNewsById(id, token){
    const url = `${API_URL}/api/news/${id}`
    return axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(response => response.data)
}

export async function sendContact(data){
    const url = `${API_URL}/api/contacts/`
    return axios.post(url, data).then(response => response.data)
}