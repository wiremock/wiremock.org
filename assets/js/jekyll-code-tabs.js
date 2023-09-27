// For rendering code tabs without UIKit in the original Code Tabs plugin, also with grouping
document.addEventListener("DOMContentLoaded", function() {
    var defaultTabs = document.querySelectorAll("#codeblock-default-selection")
    for (i = 0; i < defaultTabs.length; i++) {
    defaultTabs[i].click();
    }
});

function showTab(evt, tabId) {
    // Declare all variables
    var i, tabcontent, tablinks;
    var currentTab = evt.currentTarget
    var codeblock = currentTab.parentElement.parentElement

    // Get all elements with class="tabcontent" and hide them
    tabcontent = codeblock.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = codeblock.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    codeblock.querySelector("#"+tabId).style.display = "block";
    evt.currentTarget.className += " active";
}

function copyCodeTabToClipboard(evt) {
    var range = document.createRange();
    var currentTab = evt.currentTarget
    var activeTab = currentTab.parentElement.querySelector("button.active")
    var tabId = activeTab.textContent

    var codeblock = currentTab.parentElement.parentElement.querySelector("#"+tabId)
    range.selectNode(codeblock);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}
