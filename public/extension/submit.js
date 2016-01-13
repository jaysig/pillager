var token;
chrome.storage.sync.get('pillageToken', function(result) {
    token = result.pillageToken;
});
var pillage = function(tab, data) {
    // Send Data to server
    var currentURL;
    var serverUrl = 'http://pillager.herokuapp.com/api/urls';
    var array = $('#tags').val();
    // splits the user's tag input
    array = array.split(',').map(function(str) {
        return str.trim();
    });
    chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true
    }, function(tabs) {
        currentURL = tabs[0].url;
    });
    $.ajax({
            method: 'POST',
            headers: {
                "x-access-token": token
            },
            contentType: 'application/json',
            url: serverUrl,
            data: JSON.stringify({
                tags: array
            }),
            success: function(res) {
                console.log(res);
            }
        });
};
var linkOpener = function() {
        console.log('openPlease');
        var newURL = 'https://pillager.herokuapp.com';
        chrome.tabs.create({
            url: newURL
        });
    };
// KNOWN Bug - Pillager function tries to pillage every websites besides the extension
$(document).ready(function() {
    document.getElementById("tagSubmission").addEventListener("click", pillage);
    document.getElementById("outerLink").addEventListener("click", linkOpener);

});
