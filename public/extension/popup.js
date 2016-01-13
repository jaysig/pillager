//Check if Incognito
var signedIn = false;
var called = false;
//For Local Testing 'http://127.0.0.1:8080/api/users/signin';
var serverUrl = 'https://pillager.herokuapp.com/api/users/signin';
var base = function(tab, data) {
    var result;
    chrome.storage.sync.get('pillageToken', function(result) {
        console.log('inside', result);
        result = result.pillageToken;
    });
    called = true;
};

var login = function() {
    un = $('#un').val();
    pw = $('#pw').val();
    var creds = {
        username: un,
        password: pw
    };
    $.ajax({
        method: 'POST',
        contentType: 'application/json',
        url: serverUrl,
        data: JSON.stringify(creds),
        success: function(data) {
            //add token into local storage
            chrome.storage.sync.set({
                'pillageToken': data.token
            }, function() {
                // Notify that we saved.
                console.log(data.token);

            });

            // Redirect to submit page
            location.href = "/submit.html";
        },
        failure: function() {
            console.log("incorrect information");
        }
    });

};

//performs checks when the page is loaded
chrome.browserAction.onClicked.addListener(function callback)
$(this).ready(function() {
    if (!called) {
        base();
    };
    document.getElementById("signInButton").addEventListener("click", login);
});
