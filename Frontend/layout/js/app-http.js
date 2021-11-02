disabledButton = function(element, disabledBoolean) {
    $("." + element).attr("disabled", disabledBoolean);
    $("." + element).prop('disabled', disabledBoolean);
}

// Method setHeaderHttp
setHeaderHttp = function(request){
    if(localStorage.getItem('accessToken') != undefined){
        request.setRequestHeader('Token', 'Bearer ' + localStorage.getItem('accessToken'));
        return request;
    } else {
        location.href = './login';
    }
}


function post(endpoint, body, usingAccessToken) {
    return $.ajax({
        url: endpoint,
        type: 'POST',
        data: body,
        dataType: 'json',
        contentType: "application/json",
        beforeSend: usingAccessToken? setHeaderHttp : () => {},
        success: function(result) {
            // Do something with the result
        },
        
    });
}

function get(endpoint, body) {
    return $.ajax({
        url: endpoint,
        type: 'GET',
        data: body,
        dataType: 'json',
        contentType: "application/json",
        success: function(result) {
            // Do something with the result
        }
    });
}

function put(endpoint, body) {
    return $.ajax({
        url: endpoint,
        type: 'PUT',
        data: body,
        dataType: 'json',
        contentType: "application/json",
        success: function(result) {
            // Do something with the result
        }
    });
}

function deleted(endpoint, body) {
    return $.ajax({
        url: endpoint,
        type: 'DELETE',
        data: body,
        dataType: 'json',
        contentType: "application/json",
        success: function(result) {
            // Do something with the result
        }
    });
}

function getById(endpoint, id) {
    $.ajax({
        url: endpoint + '/' + id,
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            // Do something with the result
        }
    });
}

function registerUser(body) {
    var response = post('register', body, false);
    return response;
}

function loginUser(body) {
    var response = post('login', body, false);
    return response;
}

function verifyLogin(body) {
    var response = post('verifytoken', body, true);
    return response;
}

function sendOrder(body) {
    var response = post('order', body, true);
    return response;
}