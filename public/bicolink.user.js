
 // ==UserScript==
 // @name         Bicolink URL Inspector
 // @namespace    https://neotools.vercel.app/
 // @version      1.0.0
 // @description  Neo-Brutalism URL inspector for Bicolink pages
 // @match        *://bicolink.com/*
 // @match        *://*.bicolink.com/*
 // @match        *://bicolink.xyz/*
 // @match        *://*.bicolink.xyz/*
 // @run-at       document-idle
 // @grant        none
 // ==/UserScript==

 (() => {
   'use strict';

   if (document.getElementById('neo-url-inspector')) return;

   const style = document.createElement('style');
   style.textContent = `
     #neo-url-inspector {
       position: fixed;
       z-index: 2147483647;
       right: 14px;
       bottom: 14px;
       width: min(330px, calc(100vw - 28px));
       padding: 16px;
       background: #c7ff5e;
       color: #171717;
       border: 3px solid #171717;
       box-shadow: 6px 6px 0 #171717;
       font: 14px Arial, sans-serif;
     }
     #neo-url-inspector * { box-sizing: border-box; }
     #neo-url-inspector h3 {
       margin: 0 0 12px;
       font-size: 20px;
       font-weight: 900;
     }
     #neo-url-inspector p {
       overflow-wrap: anywhere;
       line-height: 1.5;
     }
     #neo-url-inspector button {
       width: 100%;
       padding: 11px;
       margin-top: 8px;
       color: #171717;
       background: #c5a6ff;
       border: 3px solid #171717;
       box-shadow: 3px 3px 0 #171717;
       font-weight: 900;
       cursor: pointer;
     }
   `;
   document.documentElement.appendChild(style);

   const panel = document.createElement('section');
   panel.id = 'neo-url-inspector';

   const title = document.createElement('h3');
   title.textContent = '✳ NEO URL INSPECTOR';

   const info = document.createElement('p');

   let parsed;
   try {
     parsed = new URL(location.href);
     info.textContent =
       'Domain: ' + parsed.hostname +
       '\nPath: ' + parsed.pathname +
       '\nProtocol: ' + parsed.protocol +
       '\n\nFormat URL: valid';
     info.style.whiteSpace = 'pre-wrap';
   } catch {
     info.textContent = 'URL halaman tidak valid.';
   }

   const copyButton = document.createElement('button');
   copyButton.textContent = 'SALIN URL';

   copyButton.addEventListener('click', async () => {
     try {
       await navigator.clipboard.writeText(location.href);
       copyButton.textContent = 'TERSALIN ✓';
     } catch {
       copyButton.textContent = 'GAGAL MENYALIN';
     }
   });

   const closeButton = document.createElement('button');
   closeButton.textContent = 'TUTUP';
   closeButton.addEventListener('click', () => panel.remove());

   panel.append(title, info, copyButton, closeButton);
   document.documentElement.appendChild(panel);
 })();
