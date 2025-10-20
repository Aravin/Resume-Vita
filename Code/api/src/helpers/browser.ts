import puppeteer from 'puppeteer-core';

export interface BrowserConfig {
    timeout?: number;
    protocolTimeout?: number;
    executablePath?: string;
}

export class BrowserManager {
    private static instance: BrowserManager;
    private browser: any = null;

    private constructor() {}

    public static getInstance(): BrowserManager {
        if (!BrowserManager.instance) {
            BrowserManager.instance = new BrowserManager();
        }
        return BrowserManager.instance;
    }

    public async launchBrowser(config: BrowserConfig = {}): Promise<any> {
        const {
            timeout = 30000,
            protocolTimeout = 60000,
            executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
        } = config;

        const browserArgs = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-extensions',
            '--disable-plugins',
            '--disable-images',
            '--disable-javascript',
            '--memory-pressure-off',
            '--max_old_space_size=4096'
        ];

        try {
            this.browser = await puppeteer.launch({
                args: browserArgs,
                headless: true,
                executablePath,
                timeout,
                protocolTimeout
            });

            console.log('Browser launched successfully');
            return this.browser;
        } catch (error) {
            console.error('Failed to launch browser:', error);
            throw error;
        }
    }

    public async createPage(): Promise<any> {
        if (!this.browser) {
            throw new Error('Browser not launched. Call launchBrowser() first.');
        }

        try {
            const page = await this.browser.newPage();
            page.setDefaultTimeout(30000);
            page.setDefaultNavigationTimeout(30000);
            return page;
        } catch (error) {
            console.error('Failed to create page:', error);
            throw error;
        }
    }

    public async closeBrowser(): Promise<void> {
        if (this.browser) {
            try {
                await this.browser.close();
                this.browser = null;
                console.log('Browser closed successfully');
            } catch (error) {
                console.error('Error closing browser:', error);
                throw error;
            }
        }
    }

    public async closePage(page: any): Promise<void> {
        if (page) {
            try {
                await page.close();
            } catch (error) {
                console.error('Error closing page:', error);
            }
        }
    }

    public isBrowserLaunched(): boolean {
        return this.browser !== null;
    }
}

// Utility function for PDF generation with proper error handling
export async function generatePDFWithTimeout(
    page: any,
    options: any,
    timeoutMs: number = 30000
): Promise<Buffer> {
    return Promise.race([
        page.pdf(options),
        new Promise<Buffer>((_, reject) => 
            setTimeout(() => reject(new Error('PDF generation timeout')), timeoutMs)
        )
    ]);
}

// Utility function for screenshot generation with proper error handling
export async function generateScreenshotWithTimeout(
    page: any,
    options: any,
    timeoutMs: number = 30000
): Promise<Buffer> {
    return Promise.race([
        page.screenshot(options),
        new Promise<Buffer>((_, reject) => 
            setTimeout(() => reject(new Error('Screenshot generation timeout')), timeoutMs)
        )
    ]);
}