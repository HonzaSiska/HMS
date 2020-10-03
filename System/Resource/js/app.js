var dataUser = null;
var user = new User();
var uploadpicture = new Uploadpicture();
var passUserData = null;
var cashRegister = new CashRegister();


var loginUser = () => {
  user.loginUser();  
};

var getRoles = () => {
  user.getRoles();
};

// -----------------------------------------------------------------------------------------------------------

var addUser = () =>{
  openObject('#pop_up');
  document.querySelector(".pop_up_section").style.display="none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText="Registrační formulář";
  document.getElementById("pop_up_section1").style.display="block";
  // document.getElementById('register_password').disabled = false;
  getRoles();
}
// -----------------------------------------------------------------------------------------------------------




var getUsers = () =>{
  window.location.href = URL + "Users/users";
  
};
// var selectUser = () => {
//   this.selectUser();
// }

var cashRegister = () => {
  window.location.href = URL + "CashRegister/cashRegister";
  
}
var deleteUser = () => {
  
    user.deleteUser(passUserData);
    passUserData = null;

};


var goMenu = () => {
  window.location.href = URL + "Principal/principal";
};

//SLIDE DOWN POPUP
var slideDown = (data) => {
  $("#slide_down").animate({
    top:0,
    opacity: 1,
  },500);
  passUserData = data;

};
//SLIDE UP POPUP
var slideUp = (data) => {
  $("#slide_down").animate({
    top:-200,
    opacity: 0,
  },500);
  passUserData = null;
  

};



// UNIVERZALNI FUNKCE PRO ZAVRENI OBJEKTU
var closeObject = (object) => {
  
  document.querySelector(object).style.display="none";
  
};

// UNIVERZALNI FUNKCE PRO OTEVRENI OBJEKTU, 
var openObject = (object, data) => {
  document.querySelector(object).style.display="block";

  //VYMAZ VSECHNY POLE VE FORMULARI KDYZ JE ZAVREN POPUP 
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
};
//UNIVERSAL FUNCTION TO CLOSE ASIDE PANEL
var closeAside = (object) => {
 
  switch (object) {
    
    case "#aside":
      $("#aside").animate({
        width:0,
        opacity: 0,
        padding: 0,
      },300);
      break;
  
    default:
      break;
  }
};

//UNIVERSAL FUNCTION TO OPEN ASIDE PANEL, THE PARAMETER DETERMINSE WHAT ASIDE PANEL IS OPENED
var openAside = (trigger) => {
  w = document.documentElement.clientWidth;
  $("#aside").animate({
    width: w < 650 ? 300 : 400,
    opacity: 1,
    padding: 20,
  },300);
  
  switch (trigger) {
    case "#openAside":
      let object = document.querySelector('#asideWrapper');
      let data = "<div class='asideWrapperSection'><h2>Transakce</h2>";
      data += "<hr><br><label for='datum' class='login_label' >Datum</label><input type='text' id='datum' placeholder='Datum'>"
      data +="<label for='castka' class='login_label' >Částka</label><input type='text' id='castka' placeholder='Částka'></div>";
      data += "<td><label  class='login_label' >Uživatel</label><select id='selectNames'></select></td>"; 
      data += "<button class='table_btn edit aside_button' >Vklad</button>"
      data +="<button class='table_btn delete aside_button'>Výdaj</button>";
      data +="</div>";
      object.innerHTML=data;
      user.selectUser();
      break;
  
    default:
      break;
  }
 
};


// -----------------------------------------------------------------------------------------------------------
var sessionClose = () => {
  user.sessionClose();
  // window.location.href = URL;
};

// -----------------------------------------------------------------------------------------------------------
var dataUser = (data)=> {
  openObject('#pop_up', null);
  document.querySelector(".pop_up_section").style.display="none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText="Aktualizace uživatele";
  document.getElementById("pop_up_section1").style.display="block";
  getRoles();
  user.editUser(data);
};






$().ready(()=>{
  
     
  let URLactual = window.location.pathname;
  user.userData(URLactual);// CONTROLA JESTLI JSME NA HLAVNI STRANE,JESTLI ANO,SHOVEJ HEADER atd.

  if(URLactual == PATHNAME+"Users/users"){
  user.getUsers();
  }
  $("#register_button").click((e)=> {
    e.preventDefault();
    user.registerUser();
 
  });
  

  
    
})