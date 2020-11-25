

class User {
    constructor(){
        this.function = 0;
        this.IdUser = 0;
    }



    loginUser(){
       
        if(document.getElementById('login_email').value ==""  ||document.getElementById('login_password').value ==""    ){
            document.getElementById("login_error_message").innerHTML="Vypln vsechna pole"; 
            
        }else{
            if(validarEmail(document.getElementById("login_email").value)){
                // alert("this is valid email");
                // console.log($('.login_form').serialize());
                $.post(
                    URL +"Index/userLogin",
                    $('.login_form').serialize(),
                    (response)=>{
                    
                    console.log(response);  
                        try {
                            var item = JSON.parse(response);
                            
                            if (0 < item.IdUser) {
                                localStorage.setItem("user", response);
                                // alert(URL + "Principal/principal");
                                window.location.href = URL + "Principal/principal";
                                
                            } else {
                                document.getElementById("login_error_message").innerHTML = "Uzivatelske jmeno nebo heslo je neplatne";
                            }
                        } catch (error) {
                            document.getElementById("login_error_message").innerHTML = response;
                        }
                    }

                )
                

            }else{
                // alert("this is not valid email");
                
                document.getElementById("login_error_message").innerHTML="Zadej platny email";
                
            }
        }       
    }

    getRoles(){
     var count = 1;
       $.post(
           URL + "Users/getRoles",
           {},
           (response) => {
                try {
                    let item = JSON.parse(response);
                    // console.log(item['results']);
                    
                    
                    if(0 < item.results.length){
                        document.getElementById("roles").options[0] = new Option ("Vyber přístup uživatele",0);
                        for(let i = 0; i < item.results.length; i++){
                            
                            document.getElementById("roles").options[i+1] = new Option(item.results[i].Role, item.results[i].IdRole);
                            
                            document.getElementById('roles').selectedIndex = i-1;
                            count++;
                            
                        }
                        $('select').formSelect();
                    }
                } catch (error) {
                   
                }

           }

       ) 
    }
///udelat funkci get roles , aby byla data v roles, pak se muze pouzit funkce registerUser
    registerUser(){
        if(validarEmail(document.getElementById("register_email").value)){
            // document.getElementById("login_error_message").innerHTML="Tohle je  platny email";
            var data = new FormData();
            var url = this.function == 0 ? "Users/registerUser" : "Users/editUser";
            
            let roles = document.getElementById("roles");
            let role = roles.options[roles.selectedIndex].text;
            // let role = "admin";
            // console.log("role=",role);
            data.append('idUser',this.IdUser);
            data.append('name',document.getElementById('register_name').value);
            data.append('lastName',document.getElementById('register_last_name').value);
            data.append('email',document.getElementById('register_email').value);
            data.append('password',document.getElementById('register_password').value);
            document.getElementById("roles").options[0] = new Option ("Vyber přístup uživatele",0);
            data.append('role',role);
            // console.log(data);
            //ajax
            $.ajax({
                url: URL + url,
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: (response)=> {
                    //alert(response);
                    if(response == 0){
                        document.getElementById('register_name').value="";
                        document.getElementById('register_last_name').value="";
                        document.getElementById('register_email').value="";
                        document.getElementById('register_password').value="";
                        document.getElementById("pop_up_section1").style.display="none";
                        document.querySelector("#pop_up").style.display="none";
                        // window.location.href = URL + "Users/users";
                        
                        this.getUsers();
                        
                    }else{
                        document.getElementById("login_error_message").innerHTML=response;
                    }
                }

            });


        }else{
            document.getElementById("login_error_message").innerHTML="Zadej platny email";
        }
    }
    //-----------------------------------------------
    // EDITACE UZIVATELSKYCH DAT
    //-----------------------------------------------

    editUser(data){
        this.function = 1;
        this.IdUser = data.IdUser;
        document.getElementById('register_name').value = data.Name;
        document.getElementById('register_last_name').value = data.Last_name;
        document.getElementById('register_email').value = data.Email;
        document.getElementById("register_password").value = "";
        //GET USER DATA FROM LOCAL STORAGE AND COMPARE WITH
        var selectedUser = JSON.parse(localStorage.getItem("user"))['IdUser'];
        console.log(this.function);
        // if(selectedUser != data.IdUser && this.function== 1){
        //     document.getElementById('register_password').disabled = true;
        // }
        

        


    }




    getUsers = () => {

        $.post(
            URL + "Users/getUsers",
            {},
            (response)=>{
                
                document.getElementById("table_result").innerHTML = response;
            
            }
        )
    }   
    selectUser = (selectFieldId) =>{
        $.post(
            URL + "Users/selectUser",
            {},
            (response)=>{
                try{
                    console.log(JSON.parse(response));
                    let item = JSON.parse(response);
                    console.log(item[2].Name);
                    let count = 1;
                    if(0 < item.length){
                        
                       // DATA ZALOGOVANEHO UZIVATELE V LOCAL STORAGE
                        var test = JSON.parse(localStorage.getItem("user"));
                        // var f_name = test.Name + " " + test.Lastname;
                        var id = test.IdUser;

                        
                            document.getElementById(selectFieldId).options[0] = new Option ("Vyber uživatele",0);
                        
                        
                        
                        for(let i = 0; i < item.length; i++)
                        {
                            let fullName = item[i].Name + " " + item[i].Last_name;
                            console.log(fullName);
                            document.getElementById(selectFieldId).options[i+1] = new Option(fullName, item[i].IdUser);
                            // V PODMINCE DOSTANEME INDEX POZICI V SELECT DROPDOWNU
                            if(id == item[i].IdUser){
                                var index = count;
                            }
                            // ZALOGOVANY UZIVATEL JE VLOZENE DO SELECT DROPDOWNU
                            document.getElementById(selectFieldId).selectedIndex = index;
                            count++; 
                        }
                        
                        
                    }
                }catch(error){
                    alert(error);
                }
              
            }
        )
    }
     
   //DELETE USER
    deleteUser = (data) => {
        console.log (JSON.stringify(data));
        if(JSON.parse(localStorage.getItem("user"))['IdUser'] == data['IdUser']){
            alert("Nemůžeš smazat sám sebe");
            

        }else{
            //console.log(JSON.parse(localStorage.getItem("user"))['IdUser'], "---",data['IdUser']);
            $.post(
                URL + "Users/deleteUser",
                {
                idUser: data.IdUser,
                email: data.Email
                },
                (response) => {
                    if(response == 0){
                        slideUp(null);
                        this.getUsers();
                    }else{
                        alert(response);
                    }
                    
                });
        } 
    }

    userData = (URLactual)=> {
        //alert(URLactual);
        if (PATHNAME == URLactual) {
            localStorage.removeItem("user");
            // tady je treba odstranit vse co na login strance nesmi byt videt,menu atd., protoze user neni zalogovany
            // document.querySelector('h1').style.display="none";
            document.querySelector('footer').style.display="none";
            document.querySelector('header').style.display="none";
            document.querySelector("#slide_down").style.display="none";
            document.querySelector("#aside").style.display="none";
        }
    }
    sessionClose() {
        localStorage.removeItem("user");
        window.location.href = URL + "Users/destroySession";
    }
}