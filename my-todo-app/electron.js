const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev"); // Import the electron-is-dev package

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // Load the app depending on the environment
  if (isDev) {
    // In development, load the Vite dev server
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // In production, load the built React app from the dist folder
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
