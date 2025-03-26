import { Socket } from "node:net";

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = 6379;

const checkDB = () =>
    new Promise((resolve, reject) => {
        const socket = new Socket();
        socket.setTimeout(3000);
        socket.on("connect", () => {
            socket.destroy();
            resolve();
        });
        socket.on("timeout", () => {
            socket.destroy();
            reject();
        });
        socket.on("error", () => {
            socket.destroy();
            reject();
        });
        socket.connect(DB_PORT, DB_HOST);
    });

(async () => {
    while (true) {
        try {
            await checkDB();
            break;
        } catch {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
})();
