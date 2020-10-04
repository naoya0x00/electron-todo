import * as Electron from "electron";

class MyApp {
    private mainWindow: Electron.BrowserWindow | null = null;
    private app: Electron.App;
    private mainURL: string = `file://${__dirname}/html/index.html`

    constructor(app: Electron.App) {
        this.app = app;

        this.app.on("window-all-closed", this.onWindowAllClosed.bind(this));
        this.app.on("ready", this.onReady.bind(this));
        this.app.on("activate", this.onActivated.bind(this));
    }

    private onWindowAllClosed() {
        this.app.quit();
    }

    private create() {
        this.mainWindow = new Electron.BrowserWindow({
            width: 600,
            height: 400,
            minWidth: 600,
            minHeight: 400,
            acceptFirstMouse: true,
            titleBarStyle: "hidden"
        });

        this.mainWindow.loadURL(this.mainURL);

        this.mainWindow.on("closed", () => {
            this.mainWindow = null;
        });
    }

    private onReady() {
        this.create();
    }

    private onActivated() {
        if (this.mainWindow === null) {
            this.create();
        }
    }
}

const myApp = new MyApp(Electron.app);