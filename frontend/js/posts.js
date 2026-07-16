import { API_URL } from "./config.js";
import { getToken } from "./auth.js";

async function loadFeed() {
    try {
        const response = await fetch(`${API_URL}feed/`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Erreur chargement feed', error);
        return [];
    }
}

async function getUserPosts(userId) {
    try {
        const response = await fetch(`${API_URL}posts/?author=${userId}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        return [];
    }
}

async function createPost(content) {
    try {
        const response = await fetch(`${API_URL}posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ content })
        });
        if (response.ok) {
            return { success: true, post: await response.json() };
        }
        return { success: false, message: "Erreur lors de la publication" };
    } catch (error) {
        return { success: false, message: "Erreur réseau" };
    }
}

async function likePost(postId) {
    const response = await fetch(`${API_URL}posts/${postId}/like/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.ok;
}

async function unlikePost(postId) {
    const response = await fetch(`${API_URL}posts/${postId}/unlike/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.ok;
}

async function addComment(postId, content) {
    const response = await fetch(`${API_URL}comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ post: postId, content })
    });
    return response.ok;
}

export { loadFeed, getUserPosts, createPost, likePost, unlikePost, addComment };