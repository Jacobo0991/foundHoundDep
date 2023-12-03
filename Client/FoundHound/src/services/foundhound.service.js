import axios from "axios";
import { jwtDecode } from 'jwt-decode';

export const getAllPosts = async (category, offset = 0) => {
    try {
        const response = await axios.get(`post/category/${category}`, {
            params: {
                pagination: true,
                limit: 20,
                offset: offset,
            }
        });

        return response.data;

    } catch (error) {
        return [];
    }
}

export const getOwnPosts = async (offset = 0) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`post/my-posts`, {
            params: {
                pagination: true,
                limit: 20,
                offset: offset,
            },
            headers: { Authorization: `Bearer ${token}`}
        });

        return response.data;

    } catch (error) {
        return [];
    }
}

export const createPost = async (formData, category) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.post(`post/create/${category}`, formData, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type":'multipart/form-data'}
        });

        return response.data;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export const isTokenExpired = () => {
    
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return true;
        }
        const now = Date.now().valueOf() / 1000
        const decoded = jwtDecode(token);
        const expired = decoded.exp < now;
        return expired;
    } catch (err) {
        return true;
    }
};

export const logOut = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
}

export const getOwnProfile = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get('auth/whoami', { headers: { Authorization: `Bearer ${token}`}});

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const logIn = async (formData, role) => {
    try {
        const response = await axios.post(`auth/login/${role}`, formData, {
            headers: { 'Content-Type': 'application/json' },
        })

        localStorage.setItem("token", response.data.token);
        window.dispatchEvent(new Event("storage"));

        return { message: "Sesión iniciada" };
    } catch (error) {
        console.log(error.response);
        throw new Error(error.response.data.error);
    }
}

export const editProfile = async (formData) => {
    try {
        const token = localStorage.getItem("token")
        
        const response = await axios.patch(`user/profile`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type":'multipart/form-data'}})

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.error);
    }
}

export const registerProfile = async (formData) => {
    try {
        
        const response = await axios.post(`auth/register`, formData, { headers: { "Content-Type":'multipart/form-data'}})

        return response.data.message;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.errors ? error.response.data.errors[0].message : error.response.data.error);
    }
}