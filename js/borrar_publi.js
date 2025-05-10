function borrarpubli(id){
    var idpubli = id;
    var confirmar = confirm("esta seguro de borrar su publicacion?");
    if(confirmar){
    $.ajax({        
        url: "php/borrar_publi.php",
        type: "POST",
        dataType: "json",
        data: { idpubli: idpubli },
        async: false,
        success: function (data) {
            alert(data);
            window.location.reload ();
        }
    });
}else{
    return;
}

}