const axios = require('axios');
require('dotenv').config(); // Load .env

async function fetchProxy(key, token) {
    try {
        console.log('Fetching proxy with key:', key);
        const response = await axios.get(`${process.env.URL_GET_DATA_ROTATING_PROXY}?key=${key}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Fetch proxy error:', error.response?.data || error.message);
        throw error;
    }
}

async function createProfile(configData, token) {
    try {
        console.log('Creating profile with config:', JSON.stringify(configData, null, 2));
        const response = await axios.post(process.env.GOLOGIN_API_URL, configData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Create profile error:', error.response?.data || error.message);
        throw error;
    }
}

async function startProfile(profileId, token) {
    try {
        console.log('Starting profile with ID:', profileId);
        const response = await axios.post(process.env.LOCAL_GOLOGIN_URL, {
            profileId,
            sync: true
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Start profile error:', error.response?.data || error.message);
        throw error;
    }
}

module.exports = { fetchProxy, createProfile, startProfile };