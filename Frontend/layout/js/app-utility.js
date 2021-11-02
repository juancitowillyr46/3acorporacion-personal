getFormData = function($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};   
    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });
    return unindexed_array;
}


getFormDataJson = function($form){
    return JSON.stringify($form.serializeJSON());
}

setJsonStringify = function(jsonParse) {
    return JSON.stringify(jsonParse);
}