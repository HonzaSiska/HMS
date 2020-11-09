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

const monthsEnglish = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Julio",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const  monthsCzech = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
]

var getToolTip = (e) => {
    console.log("X-",e.clientX);
    console.log("Y-",e.clientY);
    console.log("screenX-",e.screenX);
    console.log("screenY-",e.screenY);
    console.log(e);
    let message = e.target.getAttribute('data-tt');
    // console.log(message);
    let top = e.pageY;
    let right = e.pageX;
    let width = screen.width;
    let height = screen.height;

    
    let newTop = (top > height-200) ? top -40 : top + 50;
    let newLeft = (right > width-200) ? right - 40 : right + 50;
    document.querySelector('#tool_tip').style.left =newLeft +"px";
    document.querySelector('#tool_tip').style.top = newTop+"px";
    document.querySelector('#tool_tip').style.display = 'block';
    document.querySelector('#tool_tip').innerHTML = message;
}
var removeToolTip = (e) => {
    console.log(e.target);
    document.querySelector('#tool_tip').style.display='none';
}