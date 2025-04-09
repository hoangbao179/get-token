require('dotenv').config();
const { appendLine, readLines } = require('./utils/helpers');
const { fetchProxy } = require('./services/apiService');
const { createNewProfile, openProfile } = require('./services/profileService');
const { formatProxy } = require('./services/proxyService');
const axios = require('axios');
const imapSimple = require('imap-simple');
const { AuthorizationCode } = require('simple-oauth2');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());



// Định nghĩa hàm delay ở đầu file (nếu chưa có)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function automateProfile(wsUrl) {
    console.log(`Attempting to connect to WebSocket: ${wsUrl}`);
    
    let browser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: wsUrl,
            defaultViewport: null
        });
        console.log('Connected to browser successfully');
    } catch (error) {
        console.error('Failed to connect to browser:', error.message);
        throw error;
    }

    await delay(500);

    let page;
    try {
        page = await browser.newPage();
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => false });
        });
        console.log('New page opened successfully, webdriver hidden');
    } catch (error) {
        console.error('Failed to open new page:', error.message);
        await browser.close();
        throw error;
    }

    try {
        await page.goto('https://app.nodepay.ai/login', { timeout: 60000 });
        console.log('Navigated to Facebook signup page');
        await delay(1000);


 
    } catch (error) {
        console.error('Automation error:', error.message);
        console.log('Keeping browser open due to error');
    }
}

async function main() {
    try {
        const proxyKey = process.env.PROXY_KEY;
        const token = process.env.GOLOGIN_TOKEN;
        if (!proxyKey || !token) throw new Error('Missing PROXY_KEY or GOLOGIN_TOKEN in .env');

        console.log('Using token:', token);
        console.log(`Processing proxy key: ${proxyKey}`);

        const proxyDataRaw = await fetchProxy(proxyKey, token);
        const proxyData = formatProxy(proxyDataRaw);
        console.log(`Got proxy: ${proxyDataRaw.http}`);

        const profile = await createNewProfile(proxyData, token);
        const profileId = profile.id || profile._id;
        await appendLine('profile.txt', profileId);
        console.log(`Created profile: ${profileId}`);

        const startResult = await openProfile(profileId, token);
        console.log(`Started profile: ${JSON.stringify(startResult)}`);

        await automateProfile(startResult.wsUrl);
    } catch (error) {
        console.error('Main error:', error.message);
    }
}

main();