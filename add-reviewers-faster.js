// ==UserScript==
// @name Add reviewers faster
// @version 0.1
// @description Add all your reviewers to your PRs faster than ever
// @include https://github.com/360Learning/platform/compare/*
// @include https://github.com/360Learning/platform/pull/*
// @downloadURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/add-reviewers-faster.user.js
// @updateURL https://raw.githubusercontent.com/colingrodecoeur360/userscripts/master/add-reviewers-faster.user.js
// ==/UserScript==

const CONFIG = {
    REVIEWERS: []
};

(function () {
    "use strict";

    const selectMenuHeader = document.querySelector("#reviewers-select-menu .select-menu-header");
    selectMenuHeader.appendChild(buildAddMyReviewersButton());

    function buildAddMyReviewersButton() {
        const button = document.createElement("div");
        button.textContent = "Add mine";
        button.style.float = "right";
        button.style.cursor = "pointer";
        button.addEventListener("click", addMyReviewers)
        return button;
    }
    function addMyReviewers() {
        const potentialReviewers = document.querySelectorAll("#reviewers-select-menu .select-menu-item");
        potentialReviewers.forEach((reviewer) => {
            if (isAmongMyReviewers(reviewer) && ! isSelected(reviewer)) {
                reviewer.click();
            }
        });

        function isAmongMyReviewers(reviewer) {
            return CONFIG.REVIEWERS.includes(getName(reviewer));
        }
        function getName(reviewer) {
            return reviewer.querySelector(".js-username").textContent;
        }
        function isSelected(reviewer) {
            return reviewer.ariaChecked === "true";
        }
    }
})();
