"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const prisma_1 = require("./config/prisma");
const server = app_1.app.listen(env_1.env.PORT, () => {
    console.log(`API running on http://localhost:${env_1.env.PORT}`);
});
const shutdown = async () => {
    console.log('Shutting down server...');
    server.close(async () => {
        await prisma_1.prisma.$disconnect();
        process.exit(0);
    });
};
process.on('SIGTERM', () => {
    void shutdown();
});
process.on('SIGINT', () => {
    void shutdown();
});
//# sourceMappingURL=server.js.map