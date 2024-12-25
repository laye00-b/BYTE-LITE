 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BLZkZNbmdZYnBFWjRFUzJ2Nk1reW5KTGhPUmFuMkVIeXN4NFZ2NWUyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidjYySGl1cnM2bVRSdE53NkJsYndlenN3K3BYa0tiQTJ0amhhRzNXV2hVTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1QjhGL0dhUFltNHppanJMdzNHblJKTmFjSk1mQnRGcUg4VXhIUnk1bDN3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QmwrUUw2eHFGcjdYUFJHYVBuOHNURG9tQXhMZWVUSCtrZDBEM1UvNlV3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JNkVBUUE0OHV4elBmU0NQTnVlaHFzaWRzelVhbHNCaS9vMTVxMXJrRUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJOaUxZcWYxbDdGdk0vL0s4dk1wTHpqalg2K0lIY20renhmeUFHZUJhMjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS094Zzc4R2NPSm9pbUVUem0zcDlicjBnWEhDQmJQc1FXWWE5NmtURi9GRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieVlpNVp1Q1NXRTZ2SldLNXJBRll5M1JjUXRCbFNYa3NWNTRoTnIvWW93TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktQOG9hNGNTMGdxbEpLZmxlVlhoRSszcFc2WjZVdEZSNUZSc2lJZnhnL2JUVjZYMno3TGxkdkx6TDUwRUJVN3lJbG1wVHRrVllFcUF5RTZka3UwZGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6InpzWncwbHVxKytodVVCOE5XdXp1dXZHdHZCZk9ZeUlSZjRyMmZOb2s4c2c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Il9rUlRnaGRzVFR1UHFqa0pKcjh2YWciLCJwaG9uZUlkIjoiZWU0N2U2NmItZjZkYi00MDk2LTllY2UtODRlZjYxMmFjODRmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFEUWRCeHYyUE1Ca2cxMS9hY0N6RjFCMlQwQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5MWYyMG9VclhuV3RSL0x3aTZ2eXU3RDNCbXM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOERRVjk5V1ciLCJtZSI6eyJpZCI6IjIyMTc4OTkyOTIxNToxMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJVdEJBUS9NV2x1d1lZQ2lBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTCt1ZWJoVlNMWEh6cEhNZVJwR3ZZU0hVWnVKNkFGTE1DNUE2c2F4RURBbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiajcyWXNDaVNrZU1sYm1lZ2pVazczOGFRcnUzdlZxeHRONm9BWUV4QjRJaFp0eUNYQnBRNnR1MmRjY05QaEhUZ0lRWmVOT3lJeUc0SUhDUFh6aTNIRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IllCaGNxQjg4NXpCTGxidGdQSTRmSERrY2Jxbjl4QWRaVTcrdEY1UUlyZkNMUUJGelBLcmlHeXFvWnE4NlhQeXVtdlNmZ2FwVEM0WVo2MVdUQkFhOWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIxNzg5OTI5MjE1OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlMvcm5tNFZVaTF4ODZSekhrYVJyMkVoMUdiaWVnQlN6QXVRT3JHc1JBd0sifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzQ5NTk4ODJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "221789929215",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
