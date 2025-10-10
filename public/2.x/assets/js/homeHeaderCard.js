const openSourceCard = document.querySelector("#openSourceCard");
const leftHeaderHP = document.querySelector(".home-header-leftHeaderHP");

const wiremockCloudCard = document.querySelector("#wiremockCloudCard");
const rightHeaderHP = document.querySelector(".home-header-rightHeaderHP");

openSourceCard.addEventListener("mouseover", () => {
    leftHeaderHP.classList.add("headerHoverCardOpenStuio");
    leftHeaderHP.classList.add("headerHoverCard");
});
openSourceCard.addEventListener("mouseout", () => {
    leftHeaderHP.classList.remove("headerHoverCard");
});

wiremockCloudCard.addEventListener("mouseover", () => {
    rightHeaderHP.classList.add("headerHoverCardStudio");
    rightHeaderHP.classList.add("headerHoverCard");
});
wiremockCloudCard.addEventListener("mouseout", () => {
    rightHeaderHP.classList.remove("headerHoverCard");
});
