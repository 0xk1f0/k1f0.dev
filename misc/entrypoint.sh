#!/bin/bash

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

node /app/init.js

echo "[+] Performing initial Cache Run ..."

node /app/cache.js

echo "[+] Starting Web Application ..."

node /app/dist/server/entry.mjs
