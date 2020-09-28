// ==UserScript==
// @name Create PRs from other branches
// @version 0.1
// @description Add buttons to create PRs from branches other than the main branch
// @include https://github.com/360Learning/platform/branches/all*
// @downloadURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/create-pr-from-other-branches.user.js
// @updateURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/create-pr-from-other-branches.user.js
// ==/UserScript==

const CONFIG = {
    BRANCHES: ["beta", "prod"],
    MAIN_BRANCH: "dev"
};

(function () {
    "use strict";
    Array.from(document.querySelectorAll(".test-compare-link")).forEach((createPRButton) => {
        createPRButton.innerText = `PR (${CONFIG.MAIN_BRANCH})`;
        CONFIG.BRANCHES.forEach((targetBranch) => {
            createPRButton.parentElement.prepend(buildCreatePRButton(createPRButton.outerHTML, targetBranch));
        });
    });

    function buildCreatePRButton(html, targetBranch) {
        const button = document.createElement("div");
        button.innerHTML = html;
        button.style.marginRight = "10px";
        const anchor = button.querySelector("a");
        anchor.innerText = `PR (${targetBranch})`;
        anchor.href = anchor.href.replace("/compare/", `/compare/${targetBranch}...`);
        return button;
    }
})();
