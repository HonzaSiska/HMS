var dataUser = null;
var user = new User();
var uploadpicture = new Uploadpicture();
var passUserData = null;



var loginUser = () => {
  user.loginUser();  
}

var getRoles = () => {
  user.getRoles();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var addUser = () =>{
  openObject('#pop_up');
  document.querySelector(".pop_up_section").style.display="none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText="Registrační formulář";
  document.getElementById("pop_up_section1").style.display="block";
  // document.getElementById('register_password').disabled = false;
  getRoles();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////




var getUsers = () =>{
  window.location.href = URL + "Users/users";
  
}
var deleteUser = () => {
  
    user.deleteUser(passUserData);
    passUserData = null;

}


var goMenu = () => {
  window.location.href = URL + "Principal/principal";
}

//SLIDE DOWN POPUP
var slideDown = (data) => {
  $("#slide_down").animate({
    top:0,
    opacity: 1,
  },500);
  passUserData = data;

}
//SLIDE UP POPUP
var slideUp = (data) => {
  $("#slide_down").animate({
    top:-200,
    opacity: 0,
  },500);
  passUserData = null;
  

}



// UNIVERZALNI FUNKCE PRO ZAVRENI OBJEKTU
var closeObject = (object) => {
  
  document.querySelector(object).style.display="none";
  
}

// UNIVERZALNI FUNKCE PRO OTEVRENI OBJEKTU, 
var openObject = (object, data) => {
  document.querySelector(object).style.display="block";

  //// VYMAZ VSECHNY POLE VE FORMULARI KDYZ JE ZAVREN POPUP 
  switch (object) {
    case "#pop_up":
      document.getElementById('register_name').value="";
      document.getElementById('register_last_name').value="";
      document.getElementById('register_email').value="";
      document.getElementById('register_password').value="";
      break;
  
    default:
      break;
  }
}
//////////////////////////////////////////////////////
var sessionClose = () => {
  user.sessionClose();
  // window.location.href = URL;
}

//////////////////////////////////////
var dataUser = (data)=> {
  openObject('#pop_up', null);
  document.querySelector(".pop_up_section").style.display="none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText="Aktualizace uživatele";
  document.getElementById("pop_up_section1").style.display="block";
  getRoles();
  user.editUser(data);
}


$().ready(()=>{
  
     
  let URLactual = window.location.pathname;
  user.userData(URLactual);// CONTROLA JESTLI JSME NA HLAVNI STRANE,JESTLI ANO,SHOVEJ HEADER atd.

  if(URLactual == PATHNAME+"Users/users"){
  user.getUsers();
  }
  $("#register_button").click((e)=> {
    e.preventDefault();
    user.registerUser();
 
  })
  

  
  anime({
      targets: '#hms',
      keyframes: [
        
        {translateX: 50},
        
        {translateX: -50},
        
      ],
      rotateX: 360,
      duration: 4000,
      easing: 'easeOutExpo',
      loop: true
      
    });

    //   var shape = anime.timeline({
    //     easing: 'easeOutExpo',
    //     duration: 4000,
    //     loop:true
    //   });
      
      // Add children
      
    //   shape.add({
    //     targets: '.shape1',
    //     translateX: 50,
    //   })
    //   .add({
    //     targets: '.shape1',
    //     translateX: -50,
    //   })
    //   .add({
    //     targets: '.shape1',
    //     translateX: 0,
    //   })
    //   .add({
    //     targets: '.shape1',
    //     rotateX: 360,
    //   })
    //   .add({
    //     targets: '.shape1',
    //     rotateX: -360,
    //   })
    //   .add({
    //     targets: '.shape1',
    //     rotateY: 360,
    //   });
    
})