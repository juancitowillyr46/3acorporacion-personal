$(document).ready(function() { 
    $(document).on('click', '.delete-employee',  function() {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar al Colaborador?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                var id = $(this).data("id");
                var body = {};
                body['id'] = id;
                body = setJsonStringify(body);

                var success = deleted(REST_API_EMPLOYEE_DELETE, body);

                success.done(function(response) {
                    if(response.success == true) {
                        Swal.fire(
                            'Borrar',
                            'El Colaborador fue eliminado satisfactoriamente.',
                            'Success'
                        ).then((result) => {
                            location.href = '';
                        });
                        
                    } else {
                        Swal.fire(
                            'Borrar',
                            response.message,
                            'warnning'
                        ).then((result) => {
                            //location.href = '';
                        });
                    }
                });
            }
        });
    });

    var success = get(REST_API_EMPLOYEE_LIST, {});
    var numOrder = 0;
    success.done(function(response) {
        
        response['data'].forEach(element => {
            numOrder = numOrder + 1;
            var html = '';
                html = `<tr>`
                html += `<td><span>${numOrder} - ${element.first_name}</span></td>`
                html += `<td class="tdactions" align="right"><a href="${WEB_EMPLOYEE_REGISTER}?id=${element.id}" class="btn-b">editar</a>`
                html += `<a href="${WEB_EMPLOYEE_DETAIL}?id=${element.id}" class="btn-b">Ver</a>`
                html += `<button data-id="${element.id}" class="btn-c delete-employee" >borrar</button>`
                html += `</td></tr>`;
            $(".table-a").append(html);
        });
    });

    
});