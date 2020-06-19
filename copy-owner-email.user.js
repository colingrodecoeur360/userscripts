// ==UserScript==
// @name Copy Owner Mail
// @version 0.3
// @description Copy the first result's owner mail to the clipboard when searching companies with the webext
// @include https://tools.360learning.com/api/webext/companies/search/*
// @include https://tools.360mooc.com*/api/webext/companies/search/*
// @grant GM_setClipboard
// @downloadURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/copy-owner-email.user.js
// @updateURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/copy-owner-email.user.js
// ==/UserScript==

(async function () {
    "use strict";
    const results = JSON.parse(document.body.textContent);
    const ownerMail = results && results[0].ownerMail;
    if (! ownerMail) { return; }
    GM_setClipboard(ownerMail);
    displayNotification(`Owner mail copied to the clipboard: ${ownerMail}`);
})();

function displayNotification(message) {
    const container = document.createElement("div");
    container.innerHTML = message;
    document.querySelector("body").appendChild(container);

    Object.assign(container.style, {
        position: "fixed",
        bottom: 0,
        right: 0,
        "z-index": 100,
        padding: "20px",
        margin: "20px",
        background: "black",
        color: "white"
    });
}
