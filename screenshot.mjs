import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = join(__dirname, 'temporary screenshots');
if (!existsSync(dir)) mkdirSync(dir);

const existing = existsSync(dir) ? readdirSync(dir).filter(f => f.endsWith('.png')).length : 0;
const n = existing + 1;
const filename = `screenshot-${n}${label ? '-' + label : ''}.png`;
const filepath = join(dir, filename);

const chromePaths = [
  'C:/Users/nateh/.cache/puppeteer/chrome/win64-131.0.6778.204/chrome-win64/chrome.exe',
  'C:/Users/lucas/.cache/puppeteer/chrome/win64-131.0.6778.204/chrome-win64/chrome.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];

const executablePath = chromePaths.find(p => existsSync(p));

const browser = await puppeteer.launch({
  ...(executablePath ? { executablePath } : {}),
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: filepath });
await browser.close();
console.log(`Saved: temporary screenshots/${filename}`);
