$(document).ready(function() { 
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    
    const id = parseInt(urlParams.get('id'));
    
    if(id > 0) {

        var success = get(REST_API_EMPLOYEE_READ, {
            "id": id
        });
        success.done(function(response) {
            if(response.success == true){
                Object.keys(response.data).forEach(function(k, v){
                    if($("#" + k)){
                        $("#" + k).html(response.data[k]);
                    }
                });
                $("#qr-image").attr("src", CHART_BASE_PATH_QR + WEB_EMPLOYEE_DETAIL + '?id=' + id );
                $("#photo_url").attr("src", WEB_EMPLOYEE_IMAGE + response.data.photo_url );

                var state = response.data.state;
                var objComment = $("#comment");
                var objState = $("#state");

                if(state == 'ACTIVO'){
                    $(".state_activo").show();
                    $(".state_inactivo, .state_vacaciones").remove();
                    objState.addClass('state-btn-a');
                    objComment.addClass("state-msg-a");
                } else if(state == 'INACTIVO' ) {
                    $(".state_label_from").html('FECHA DE INICIO');
                    $(".state_label_to").html('FECHA DE INACTIVIDAD');
                    $(".state_wrp").show();
                    objState.addClass('state-btn-b');
                    objComment.addClass("state-msg-b");
                    $(".state_activo, .state_vacaciones").remove();
                } else if(state == 'VACACIONES' ) {
                    $(".state_label_from").html('FECHA DE INICIO');
                    $(".state_label_to").html('HASTA');
                    $(".state_wrp").show();
                    objState.addClass('state-btn-c');
                    objComment.addClass("state-msg-c");
                    $(".state_activo, .state_inactivo").remove();
                } 
            } else {
                Swal.fire(
                    'Detalle',
                    'No se encontró al Colaborador',
                    'warnning'
                ).then((result) => {
                    location.href = '';
                });
            }
        });

    }


});