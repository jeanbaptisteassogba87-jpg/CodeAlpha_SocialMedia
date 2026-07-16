import { API_URL } from "./config.js";

async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access);
            return "Connexion réussie";
        } else {
            return "Identifiants incorrects";
        }
    } catch (erreur) {
        return "Erreur de connexion au serveur";
    }
}

async function register(name, email, password) {
    try {
        const response = await fetch(`${API_URL}users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            return "Compte créé avec succès";
        }

        const errorData = await response.json();
        if (errorData.email) return `Email : ${errorData.email[0]}`;
        if (errorData.password) return `Mot de passe : ${errorData.password[0]}`;
        if (errorData.name) return `Nom : ${errorData.name[0]}`;
        return "Erreur lors de la création du compte.";

    } catch (erreur) {
        return "Erreur de connexion au serveur";
    }
}

function logout() {
    localStorage.removeItem('token');
}

function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

function getToken() {
    return localStorage.getItem('token');
}

export { login, register, logout, isAuthenticated, getToken };