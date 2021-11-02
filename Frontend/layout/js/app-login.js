$(document).ready(function() { 
    $("#frm-login").validate({
        beforeSubmit: function(arr, $form, options) {
            disabledButton("btn", true);
        },
        rules: {
          username: {
            required: true,
            email: true
          },
          password: {
            required: true,
            minlength: 8
          }
        },
        messages: {
          username: {
            required: "Es requerido",
            email: "Usuario no válido"
          },
          password: {
            required: "Es requerido",
            minlength: "Máximo 8 caracteres"
          }
        },
        submitHandler: function(form) {
            var body = getFormDataJson($(form));
            var success = post(REST_API_LOGIN, body);
            success.done(function(response) {
                if(response.success == true) {
                  console.log(response);
                  localStorage.setItem('accessToken', response['data']['accessToken']);
                  disabledButton("btn", true);
                  location.href = WEB_REDIRECT_BEFORE;
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: response.message,
                  }).then((result) => {
                      $('#frm-login')[0].reset();
                      disabledButton("btn", false);
                      return true;
                  });
                }
            });
            success.fail(function(response){ 
                Swal.fire({
                    title: 'Error',
                    text: response.responseJSON.message,
                }).then((result) => {
                    $('#frm-login')[0].reset();
                    disabledButton("btn", false);
                    return true;
                });
            }); 
        }
    });

});

