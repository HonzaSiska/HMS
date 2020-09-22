var validarEmail =(email)=>{
    let regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email)) {
        return true;
    }else{
        return false;
    }
}


///----------function to retrieve a parameter email from url via javascript.Other option is via server
var getParameterByName = (name) =>{
    //El método replace () busca una cadena para un valor específico, o una expresión regular , y devuelve una nueva cadena donde se reemplazan los valores especificados.
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    // La función decodeURIComponent() decodifica un componente URI.
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}