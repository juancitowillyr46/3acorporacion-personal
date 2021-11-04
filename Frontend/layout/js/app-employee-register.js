$(document).ready(function() { 
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const id = parseInt(urlParams.get('id'));

    let validateRulesJson = {
        first_name: {
          required: true
        },
        file: {
          required: true,
        },
        doc_num: {
          required: true
        },
        activity_from: {
            required: false
        },
        job_id: {
            required: true
        },
        comment: {
            required: true
        },
        state: {
            required: true
        },
        state_date_from: {
            required: true
        },
        state_date_to: {
            required: true
        }
    };

    let validateMessageJson ={
        first_name: {
          required: "Es requerido"
        },
        file: {
          required: "Es requerido"
        },
        doc_num: {
          required: "Es requerido"
        },
        activity_from: {
            required: "Es requerido"
        },
        job_id: {
            required: "Es requerido"
        },
        comment: {
            required: "Es requerido"
        },
        state: {
            required: "Es requerido"
        },
        state_date_from: {
            required: "Es requerido"
        },
        state_date_to: {
            required: "Es requerido"
        }
      }
  

    $("#file").change(function(event){
        var fileName = $('input[type=file]').val();
        var clean = "Archivo adjunto: " + fileName.split('\\').pop(); // clean from C:\fakepath OR C:\fake_path 
        $(".filename").html(clean);

        var file_data = $('#file').prop('files')[0];   
        var form_data = new FormData();                  
        form_data.append('file', file_data);
        form_data.append('last_file_delete', $("#last_file_delete").val());
        form_data.append('submit', true);
                            
        var success = $.ajax({
            url: REST_API_EMPLOYEE_UPLOAD,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,                         
            type: 'POST'
        });
        
        success.done(function(response) {
            //alert(JSON.stringify(response.data));
            $("#photo_url").attr("value", response.data.photo_url);
            $(".filename").html(response.data.photo_url);
            $("#last_file_delete").attr("value", response.data.photo_url);
        });
        success.fail(function(response){ 
            Swal.fire({
                title: 'Upload',
                text: 'Error al subir',
            }).then((result) => {
                $('#frm-register')[0].reset();
                disabledButton("btn", false);
                return true;
            });
        }); 

    });

    
    if(id > 0) {

        validateRulesJson = {
            first_name: {
              required: true
            },
            photo_url: {
              required: true,
            },
            doc_num: {
              required: true
            },
            activity_from: {
                required: true
            },
            job_id: {
                required: true
            },
            comment: {
                required: true
            },
            state: {
                required: true
            },
            state_date_from: {
                required: true
            },
            state_date_to: {
                required: true
            }
        };
    
        validateMessageJson ={
            first_name: {
              required: "Es requerido"
            },
            photo_url: {
              required: "Es requerido"
            },
            doc_num: {
              required: "Es requerido"
            },
            activity_from: {
                required: "Es requerido"
            },
            job_id: {
                required: "Es requerido"
            },
            comment: {
                required: "Es requerido"
            },
            state: {
                required: "Es requerido"
            },
            state_date_from: {
                required: "Es requerido"
            },
            state_date_to: {
                required: "Es requerido"
            }
          }

        $("input[name='state']").prop('checked', false);
        $(".btn-a-edit").html('Editar');

        var success = get(REST_API_EMPLOYEE_READ, {
            "id": id
        });
        success.done(function(response) {

            Object.keys(response.data).forEach(function(k, v){
                
                if(k == 'state') {
                    $("input[name='state'][value='"+ response.data[k] +"']").prop('checked', true);
                } else {
                    $("#" + k).prop("value", response.data[k]);
                }
            });

            var fileName = response.data.photo_url;
            var clean = "Archivo adjunto: " + fileName; // clean from C:\fakepath OR C:\fake_path 
            $(".filename").html(clean);
            $("#qr-image-register").attr("src", CHART_BASE_PATH_QR + WEB_EMPLOYEE_DETAIL + '?id=' + response.data.id ).fadeIn();


        });

    }

    $("#frm-register").validate({
        ignore: "input[type='text']:hidden",
        beforeSubmit: function(arr, $form, options) {
            disabledButton("btn", true);
        },
        rules: validateRulesJson,
        messages: validateMessageJson,
        submitHandler: function(form) {

            var body = JSON.parse(getFormDataJson($(form)));

            // Existe un archivo temporal
            if($("#last_file_delete").val() != "") {
                body['photo_url'] = $("#last_file_delete").val();
            }
            delete body['last_file_delete'];

            // Si es nuevo registro
            if(id != 0) {
                body['id'] = id;
                $("#qr-image").fadeIn();
            } else {
                delete body['id'];
                $("#qr-image").hide();
            }

            var setBody = setJsonStringify(body);
            var success = (id == 0)? post(REST_API_EMPLOYEE_CREATE, setBody) : put(REST_API_EMPLOYEE_UPDATE, setBody);
            var message = (id == 0)? 'NUEVO' : 'EDICIÓN';

            success.done(function(response) {
                var dataJson = response.data;
                if(response.success == true) {
                    Swal.fire({
                        title: message,
                        text: response.message,
                    }).then((result) => {
                        // $('#frm-register')[0].reset();
                        // disabledButton("btn", false);
                        location.href = WEB_EMPLOYEE_REGISTER + '?id=' + dataJson.id;
                        //return true;
                    });
                } else {
                    Swal.fire({
                        title: 'Registro',
                        text: response.message,
                    }).then((result) => {
                        $('#frm-register')[0].reset();
                        disabledButton("btn", false);
                        return true;
                    });
                }
                
            });
            success.fail(function(response){                 
                Swal.fire({
                    title: 'Registro',
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