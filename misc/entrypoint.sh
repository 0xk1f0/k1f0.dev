#!/bin/sh

export NODE_ENV=production
export HOST=0.0.0.0
export PORT=80

echo '''
    __  ___________       __
   / /_<  / __/ __ \ ____/ /__ _   __
  / //_/ / /_/ / / // __  / _ \ | / /
 / ,< / / __/ /_/ // /_/ /  __/ |/ /
/_/|_/_/_/  \____(_)__,_/\___/|___/

'''

echo "[+] Waiting for Database Connection ..."

deno -A /app/src/scripts/init.js

echo "[+] Performing initial Cache Run ..."

deno -A /app/src/scripts/cache.js

echo "[+] Starting Web Application ..."

deno --allow-net --allow-read --allow-env /app/dist/server/entry.mjs
