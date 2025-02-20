const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUo5cW4xUGN5TlRuOFhycHg1UGNPRFJtcEMwM3ViVklSZk9TT05MWkhVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaithREdhMkRVL25wQ0pMRjdFbUJ3Q044a0dZVXFvWDVvRUVndG9GVWFpOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2TnZjd2hMakNET2JISUVNOGRKWUhoR1h6QmJBQURZYUx1TjJKUmx3NEU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzL0dKUHV3OTdhVnNwZHcwVTQ0MzdSOU9lL2tVQ2lSb3puMHNJL0FEMURRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9HSm1hQkp3aDZuSzU4UlhoS2xhSERhcVp0VUFKTHpXMGg4UFVmOVB4MkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndxZ2ptQXRsY3hGRHVDVmZUc1BIWTBXUmdwcVJ4UDhxZDBMam5kUWVybkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNENHL2pyemlORzNrcGxiUGdJY2J0bG83V1NkRzZSZVZUT1VuL0QyWVlGQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU3YzVmJGdzNtbmtCNjVIaFc5T1REWFNDSWtIbHU2b3A5WnZrVDM5NlNHMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRsRW93ZHljQjBJSjF3WlVmZzJuWUFvc1FMSFI4eXZqYVROZ2QrUzhFVUNQQldDNFNhRXVhcWd5NnE2L1YyVlg4M0NZMS9DN2V4aFRMWVF6T3ZMSmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJCM2NVMnlBcjNaYzFMZWlTamRHUWZaUXRFdzRiMFo5Qy8rZjBwaHZxSVJzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXZkwyQXVrZ1RtYWY2RDJSUnk1NUx3IiwicGhvbmVJZCI6IjllNzllMGUzLWE0M2EtNDc4Zi1iY2RhLWU1YWI5NjI0NDBlMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5NlhTT2NBamxLTlpIYTl6eUptdHg0UnBFVkk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlA4a2ZBNDh1QzByNFZHRUt5czloOS9ITlljPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ilk1VlY3UDJSIiwibWUiOnsiaWQiOiI0MDc3MDgxMTkyOToyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPMmg1UFFFRUkyRTNMMEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJV1J6bm80YnJjbWlXRUZzVUZiTmpueUtwOHo1SXZ6UVRZZ2xJVG5PMGhZPSIsImFjY291bnRTaWduYXR1cmUiOiJFclFCZ1RteWE4TnRua2dyMHgyOURvZWlPeXMyeUJjdGIvRFd0ajVwQ21jeFZYaGxYbzVxUWpBblcwc1lPb2FHZyswV09KSUwxcFhMZGh4WUthVHNDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiU29lV0pZWEVQWmNsRkdha1A4S0pwWndBMUd6RC9oeVBjaW44MVYrU3o4SVlKNGpuUkYyVWI4cGtwekxoMW4zU1I2a29aL0hmTktLMTZSMUpVMzBIaGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MDgxMTkyOToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNGa2M1Nk9HNjNKb2xoQmJGQld6WTU4aXFmTStTTDgwRTJJSlNFNXp0SVcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAwNDY4NzUsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQldBIn0=',
    PREFIXE: process.env.PREFIX || "+",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    OWNER_NAME : process.env.OWNER_NAME || "james",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254758755663",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non", 
    ANTIVV: process.env.ANTIVV|| "non", 
    ADMGROUP: process.env.ADMGROUP || "non", 
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non", 
    AUTO_REPLY: process.env.AUTO_REPLY || "non",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    ANTILINK :process.env.ANTILINK || "non", 
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ JAMES",
    BOT : process.env.BOT_NAME || 'JAMES',
    URL : process.env.BOT_MENU_LINKS || 'https://whatsapp.com/channel/0029VaogSY74IBhJWe8b472H',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
