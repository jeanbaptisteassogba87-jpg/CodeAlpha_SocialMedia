import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

async function getMyProfile() {
    const response = await fetch(`${API_URL}me/`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) return null;
    return await response.json();
}

async function getUserProfile(userId) {
    const response = await fetch(`${API_URL}profile/${userId}/`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    if (!response.ok) return null;
    return await response.json();
}

async function followUser(userId) {
    const response = await fetch(`${API_URL}follow/${userId}/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.ok;
}

async function unfollowUser(userId) {
    const response = await fetch(`${API_URL}unfollow/${userId}/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.ok;
}

async function uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await fetch(`${API_URL}me/avatar/`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${getToken()}` },
        body: formData
    });
    if (!response.ok) return null;
    return await response.json();
}

export { getMyProfile, getUserProfile, followUser, unfollowUser, uploadAvatar };