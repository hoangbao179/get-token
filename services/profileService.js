const { createProfile, startProfile } = require('./apiService');
const { generateId, getTimestampName, getCurrentISO, getRandomUserAgent } = require('../utils/helpers');

function getBaseConfig() {
    return {
        role: "owner",
        notes: "",
        browserType: "chrome",
        lockEnabled: false,
        timezone: { enabled: true, fillBasedOnIp: true, timezone: "" },
        navigator: {
            userAgent: getRandomUserAgent(),
            resolution: "1920x1080",
            language: "en-US,en;q=0.9",
            platform: "Win32",
            hardwareConcurrency: 2,
            doNotTrack: false,
            deviceMemory: 8,
            maxTouchPoints: 0
        },
        geolocation: {
            mode: "prompt",
            enabled: true,
            customize: true,
            fillBasedOnIp: true,
            latitude: 0,
            longitude: 0,
            accuracy: 10
        },
        debugMode: null,
        os: "win",
        osSpec: "",
        proxyEnabled: false,
        isBookmarksSynced: true,
        autoLang: true,
        webGLMetadata: {
            mode: "mask",
            vendor: "Google Inc. (Intel)",
            renderer: "ANGLE (Intel, Intel(R) HD Graphics 630 (0x00005912) Direct3D11 vs_5_0 ps_5_0, D3D11)"
        },
        fonts: {
            enableMasking: true,
            enableDomRect: true,
            families: ["Arial", "Calibri", "Cambria"]
        },
        facebookAccountData: { notParsedData: {} }
    };
}

async function createNewProfile(proxyData, token) {
    const proxyConfig = {
        mode: 'http',
        host: proxyData.host,
        port: proxyData.httpPort,
        autoProxyRegion: 'us',
        torProxyRegion: 'us'
    };

    const profileConfig = {
        ...getBaseConfig(),
        name: getTimestampName(),
        id: generateId(),
        proxy: proxyConfig,
        proxyEnabled: true,
        createdAt: getCurrentISO(),
        updatedAt: getCurrentISO()
    };

    return await createProfile(profileConfig, token);
}

async function openProfile(profileId, token) {
    return await startProfile(profileId, token);
}

module.exports = { createNewProfile, openProfile };