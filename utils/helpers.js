// utils/helpers.js (cập nhật)
const fs = require('fs').promises;
const { randomUUID } = require('crypto');

async function appendLine(filePath, content) {
    await fs.appendFile(filePath, `${content}\n`, 'utf8');
}

function generateId() {
    return randomUUID().replace(/-/g, '').slice(0, 24);
}

function getTimestampName(prefix = 'profile') {
    return `${prefix}_${Date.now()}`;
}

function getCurrentISO() {
    return new Date().toISOString();
}

function getRandomUserAgent() {
    const agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.1.2.73 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/123.0.0.0 Safari/537.36',
    ];
    return agents[Math.floor(Math.random() * agents.length)];
}

async function readLines(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    return content.split('\n').filter(line => line.trim());
}

module.exports = {
    appendLine,
    generateId,
    getTimestampName,
    getCurrentISO,
    getRandomUserAgent,
    readLines
};