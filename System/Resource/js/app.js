var dataUser = null;
var user = new User();
var uploadpicture = new Uploadpicture();
var cashReg = new CashRegister();
var graphs = new Graphs();
var apartment = new Apartments();

var loginUser = () => {
  user.loginUser();
};

var getRoles = () => {
  user.getRoles();
};

var addUser = () => {
  openObject("#pop_up");
  document.querySelector(".pop_up_section").style.display = "none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText =
    "Registrační formulář";
  document.getElementById("pop_up_section1").style.display = "block";
  // document.getElementById('register_password').disabled = false;
  getRoles();
};

var getUsers = () => {
  window.location.href = URL + "Users/users";
};

var cashRegister = () => {
  window.location.href = URL + "CashRegister/cashRegister";
};

let insertTrans = (func) => {
  cashReg.insertTrans(func);
};

let getTrans = (data) => {
  cashReg.getTrans(data);
};

let getGraphs = () => {
  window.location.href = URL + "Graphs/graphs";
};
let apartments = () => {
  window.location.href = URL + "Apartments/apartments";
  // apartment.apartments();
};

var goMenu = () => {
  window.location.href = URL + "Principal/principal";
};
var archivo = (evt) => {
  
  apartment.archivo(evt, "#fotos");


};
var archivo2 = (id) => {
  //var pics = document.getElementById(field).files;
 
//console.log(document.getElementById(id).files);
   //tahle funkce ted nic nedela
}
var insertApartment = () => {
  
  apartment.insertApartment();
};

//----------------------------------------------------
//VYMAZAT FOTKU KONKRETNIHO BYTU
//----------------------------------------------------
var delete_img = (e) => {
 
  //console.log(e.getAttribute('data-img'));
  
  parent = e.parentElement;
  //p element pro zobrazeni message po vymazani fotky
  message = parent.parentElement.nextSibling;// param 2
  img = e.getAttribute('data-img');// param 1
  console.log(message);

  parent.remove();

  apartment.deleteImg(img, message,parent);
  
  
}

// document.getElementById('files').addEventListener('change', uploadpicture.archivo("fotos"), false);

//-------------------------------------------------------
//SLIDE DOWN POPUP
//-------------------------------------------------------
var slideDown = (data, switchData) => {
  $("#slide_down").animate(
    {
      // top:0,
      top: $(window).scrollTop(),
      opacity: 1,
    },
    500
  );

  switch (switchData) {
    case 1:
      //alert(JSON.stringify(data));
      data = JSON.stringify(data);
      var output = "<div id='slide_down_button_wrapper'>";
      output +=
        "<button id='comfirm_btn' class='table_btn edit' onclick='slideUp();'>Zrušit</button>";
      output += `<button id='delete_user_btn' class='table_btn delete' onclick='user.deleteUser(${data});'>Smazat</button>`;
      output += "</div>";
      document.getElementById("slide_down").innerHTML = output;
      break;

    case 2:
      var output = "<div id='slide_down_button_wrapper'>";
      output +=
        "<button id='comfirm_btn' class='table_btn edit' onclick='slideUp();'>Zrušit</button>";
      output +=
        "<button id='delete_user_btn' class='table_btn delete' onclick='cashReg.deleteTrans(" +
        data +
        ");'>Smazat</button>";
      output += "</div>";
      document.getElementById("slide_down").innerHTML = output;
      break;
  }
  passUserData = data;
};
//-------------------------------------------------------
//SLIDE UP POPUP
//-------------------------------------------------------
var slideUp = (data) => {
  $("#slide_down").animate(
    {
      top: -200,
      opacity: 0,
    },
    500
  );
  passUserData = null;
};

//-------------------------------------------------------
// UNIVERZALNI FUNKCE PRO ZAVRENI OBJEKTU
//-------------------------------------------------------
var closeObject = (object) => {
  document.querySelector(object).style.display = "none";
};
//-------------------------------------------------------
// UNIVERZALNI FUNKCE PRO OTEVRENI OBJEKTU,
//-------------------------------------------------------
var openObject = (object, data) => {
  document.querySelector(object).style.display = "block";

  //VYMAZ VSECHNY POLE VE FORMULARI KDYZ JE ZAVREN POPUP
  switch (object) {
    case "#pop_up":
      document.getElementById("register_name").value = "";
      document.getElementById("register_last_name").value = "";
      document.getElementById("register_email").value = "";
      document.getElementById("register_password").value = "";
      break;

    default:
      break;
  }
};
//-------------------------------------------------------
//UNIVERSAL FUNCTION TO CLOSE ASIDE PANEL
//-------------------------------------------------------
var closeAside = (object) => {
  switch (object) {
    case "#aside":
      $("#aside").animate(
        {
          width: 0,
          opacity: 0,
          padding: 0,
        },
        300
      );
      break;

    default:
      break;
  }
};
//-------------------------------------------------------
//UNIVERSAL FUNCTION TO OPEN ASIDE PANEL, THE PARAMETER DETERMINES WHAT ASIDE PANEL IS OPENED
//-------------------------------------------------------
var openAside = (trigger) => {
  w = document.documentElement.clientWidth;
  $("#aside").animate(
    {
      width: w < 650 ? 300 : 400, // responsivness
      opacity: 1,
      padding: 20,
    },
    300
  );

  switch (trigger) {
    case "#openAside":
      let object = document.querySelector("#asideWrapper");
      let data =
        "<form id='transaction_form' method='POST' enctype='multipart/form-data' onsubmit='return false'> ";
      data +=
        "<div class='asideWrapperSection'><h2 id='draggable'>Transakce</h2>";
      data +=
        "<hr><br><label for='datum' class='login_label' >Datum</label><input type='date' id='datum' class='ui-widget-conten' placeholder='Datum'>";
      data +=
        "<label for='castka' class='login_label' >Částka</label><input type='text' id='castka' ></div>";
      data +=
        "<td><label  class='login_label' >Uživatel</label><select id='selectNames'></select></td>";
      data +=
        "<td><label  for='popis' class='login_label' >Popis</label><input type='text' id='popis'></td>";
      data += "<label id='transError'></label>";
      data +=
        "<button type='submit' onclick='insertTrans(\"deposit\");' id='vklad'  class='table_btn edit aside_button'>Vklad</button>";
      data +=
        "<button  type='submit' onclick='insertTrans(\"debit\");' class='table_btn delete aside_button'>Výdaj</button>";
      data += "</div>";
      data += "</form>";
      object.innerHTML = data;
      user.selectUser("selectNames");
      break;

    default:
      break;
  }
};


var sessionClose = () => {
  user.sessionClose();
};

//-----------------------------------------------
//VLOZ DATA UZIVATELE DO FORMULARE PRO EDITACI
//-----------------------------------------------
var dataUser = (data) => {
  openObject("#pop_up", null);
  document.querySelector(".pop_up_section").style.display = "none"; // UJISTIT SE ZE V POPUP OKNE NENI ZADNY OBSAH
  document.getElementById("titulek-registrace").innerText =
    "Aktualizace uživatele";
  document.getElementById("pop_up_section1").style.display = "block";
  getRoles();
  user.editUser(data);
};

$().ready(() => {
  let URLactual = window.location.pathname;
  user.userData(URLactual); // CONTROLA JESTLI JSME NA HLAVNI STRANE,JESTLI ANO,ScHOVEJ HEADER atd.

  //ZMENIT BARVU CASTKY V POKLADNE

  if (URLactual == PATHNAME + "Users/users") {
    user.getUsers();
  }

  if (URLactual == PATHNAME + "CashRegister/cashRegister") {
    cashReg.getTrans(null);
    let output = document.getElementById("pokladna_total");
    output.value > 0
      ? (output.style.color = "green")
      : (output.style.color = "green");
  }

  // Po nacteni stranky Graphu
  if (URLactual == PATHNAME + "Graphs/graphs") {
    graphs.getChart1();
    graphs.getChart2();
  }

  if (URLactual == PATHNAME + "Apartments/apartments") {
    apartment.getApartments("admin");
    document.getElementById("files").addEventListener("change", archivo, false);
    //  document.querySelector(".aptFiles").addEventListener("change", archivo2, false);
    // user.selectUser("apartment_user");
  }

  //----------------------------------------------------
  //Registrace Uzivatele
  //----------------------------------------------------
  $("#register_button").click((e) => {
    e.preventDefault();
    user.registerUser();
  });
  //----------------------------------------------------
  //Update charts
  //----------------------------------------------------
  $("#updateChart").click((e) => {
    graphs.getChart1();
    graphs.getChart2();
  });
  //----------------------------------------------------
  //Kdyz zvolim fotky pro upload a znovu zmacknu button upload ,puvodne zvolene fotky jsou vymazany
  //----------------------------------------------------
  $("#files").click((e) => {
    var parent = document.querySelector("#fotos");
    if (parent.hasChildNodes() == true) {
      console.log(parent);
      parent.innerHTML = "";
    }
  });
  
 
  
});
