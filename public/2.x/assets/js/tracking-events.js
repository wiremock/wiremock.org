function addGaEventListener(elementId, location, action, description) {
    var element = document.getElementById(elementId);
    if (element) {
        element.addEventListener('click', () => {
            ga('send', 'event', location, action, description, 1);
        });
    }
}

addGaEventListener('wiremock-standalone-download', 'oss_docs', 'download_standalone_jar_clicked', 'Download WireMock Standalone JAR clicked');
addGaEventListener('slack-link', 'studio_gettnavigationing_started', 'slack_link_clicked', 'Slack link clicked');
