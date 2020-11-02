class Apartments extends Uploadpicture{
    constructor() {
        super();
    }
    
    insertApartment = () =>
    {   
       
        var error = document.querySelector("#apartment_form_error");
        if(
            document.querySelector("#apartment_name").value=="" ||
            document.querySelector("#apartment_ulice").value=="" ||
            document.querySelector("#apartment_city").value=="" ||
            document.querySelector("#apartment_rooms").value=="" 
        )
        {
            error.innerHTML = "Všechna pole s hvezdičkou musí být vyplněna";
        }else{
            
            var totalFiles = document.getElementById("files").files.length;
            
            var data = new FormData();
            for(var index = 0; index<totalFiles;index++)
            {
                console.log(document.querySelector("#files").files[index]);
                data.append('files[]',document.querySelector("#files").files[index]);
            }

            //var images = document.querySelector("#files").files;
            //$.each($('input[type=file]')[0].files, (i, file) => {
                // data.append('file', file);
                //alert(file['name']);
                //array.push(file);
            // });
            let users = document.getElementById("apartment_user");
            let user = users.options[users.selectedIndex].value; 
            data.append('Uzivatel', user);
            data.append('Jednotka', document.querySelector("#apartment_name").value );
            data.append('Ulice', document.querySelector("#apartment_ulice").value );
            data.append('Mesto', document.querySelector("#apartment_city").value );
            data.append('Pokoje', document.querySelector("#apartment_rooms").value );
            data.append('Popis', document.querySelector("#apartment_desc").value );
            // data= JSON.stringify(data);

            $.ajax({
                url: URL + "Apartments/insertApartment",
                data: data,
                cache: false,
                // dataType: 'json',
                contentType: false,
                processData: false,
                type: 'post',
                success: (response)=> {
                    console.log(response);
                    // alert(response)
                    if(response == 0){
                        document.getElementById("apartment_form").reset();
                        document.getElementById("fotos").innerHTML = null;
                        document.getElementById('addAptPopUp').classList.remove("popupIsOpen");
                    document.getElementById('addAptPopUp').classList.add("closed");
                        this.getApartments("admin");
                    }
                }
            })
            // $.post(
            //     URL + "Apartments/insertApartment",
            //     {data:data},
            //     (response)=>{
            //         console.log(response);
            //     }

            // )
            
        }
        
        
    }
    getApartments = (diff) => 
    {
        $.post(
            URL + "Apartments/getApartments",
            {data: diff},
            response => 
            {
                try {
                    document.querySelector("#apartment_list_admin").innerHTML=response;
                    // console.log(response);   
                } catch (error) {
                    console.log(error) ;
                }
                //console.log(response);
            }
        )
    }

    deleteImg(img, message, parent)
    {
        console.log(img, message, parent);
        $.post(
            URL + "Apartments/deleteImg",
            {
                img: img
            
            },
            response => 
            {
                try {
                    
                    console.log(response);
                    parent.remove();
                    message.innerHTML=`Fotka ${img} byla smazána !!`;  
                    setTimeout(function(){  message.innerHTML=""; }, 5000);
                    


                } catch (error) {
                    console.log(response);
                    message.innerHTML="Fotka nemohla být smazána !!";
                    setTimeout(function(){  message.innerHTML=""; }, 5000);
                    
                }
                
            }
        )
    }
    addImages(id, IdApartment)
    {   
        var message = document.getElementById(id);
        var totalFiles = document.getElementById(id).files.length;
        if(totalFiles != 0)
        {
            
            var data = new FormData();
            for(var index = 0; index < totalFiles;index++)
            {
                data.append('files[]',document.getElementById(id).files[index]);
            }
            data.append('IdApartment',IdApartment);
            
            $.ajax({
                url: URL + "Apartments/addImages",
                data: data,
                cache: false,
                // dataType: 'json',
                contentType: false,
                processData: false,
                type: 'post',
                success: (response)=> {
                    console.log(response);
                    // alert(response)
                    if(response == 0){


                        this.getApartments("admin");
                    }else if(response == 1){
                        
                        message.parentElement.parentElement.parentElement.previousSibling.innerHTML="stala se chyba !!";

                        setTimeout(()=>{
                            message.parentElement.parentElement.parentElement.previousSibling.innerHTML="";
                        },3000)
                        
                        // message.parentElement.previousSibling.innerHTML=" stachyba !!";
                    }else
                    {
                        message.parentElement.parentElement.parentElement.previousSibling.innerHTML="Některá z fotek nebyla ulozena!!";

                        setTimeout(()=>{
                            message.parentElement.parentElement.parentElement.previousSibling.innerHTML="";
                        },3000)
                        this.getApartments("admin");
                        
                    }
                }

            })

        }else
        {
         
            let message = document.getElementById(id);
            
            console.log(message.parentElement.parentElement.parentElement.previousSibling);
            message.parentElement.parentElement.parentElement.previousSibling.innerHTML="Vyber fotku !!";

            setTimeout(()=>{
                message.parentElement.parentElement.parentElement.previousSibling.innerHTML="";
            },3000)
        }

            
    }
    deleteApartment(IdApartment)
    {
        $.post(
            URL + "Apartments/deleteApartment",
            {
                IdApt : IdApartment
            }, 
            response => {
                if(response == 0)
                {
                    slideUp(null);  
                    this.getApartments("admin");
                    
                    
                }else{
                     //alert("Byt nebyl smazán !!");
                    alert(response);
                }

            }
        )
        
    }
    updateApartment(id){
        console.log(id);
        var error = document.querySelector("#apartment_edit_form_error"+id);
        if(
            document.querySelector("#apartment_name_edit"+id).value=="" ||
            document.querySelector("#apartment_ulice_edit"+id).value=="" ||
            document.querySelector("#apartment_city_edit"+id).value=="" ||
            document.querySelector("#apartment_rooms_edit"+id).value=="" 
        )
        {
            error.innerHTML = "Všechna pole s hvezdičkou musí být vyplněna";
        }else{
            let users = document.getElementById("apartment_user_edit"+id);
            let user = users.options[users.selectedIndex].value;
            var data = new FormData();
            data.append('Uzivatel', user);
            data.append('Jednotka', document.querySelector("#apartment_name_edit"+id).value );
            data.append('Ulice', document.querySelector("#apartment_ulice_edit"+id).value );
            data.append('Mesto', document.querySelector("#apartment_city_edit"+id).value );
            data.append('Pokoje', document.querySelector("#apartment_rooms_edit"+id).value );
            data.append('Popis', document.querySelector("#apartment_desc_edit"+id).value );
            data.append('aptId', id);

            $.ajax({
                url: URL + "Apartments/updateApartment",
                data: data,
                cache: false,
                // dataType: 'json',
                contentType: false,
                processData: false,
                type: 'post',
                success: (response)=> {
                    console.log(response);
                    // alert(response)
                    if(response == 0){
                        document.getElementById("apartment_form-edit"+id).reset();
                        this.getApartments("admin");
                        
                    }else{
                        error.innerHTML = response;
                        setTimeout(() => {
                            error.innerHTML = "";
                        }, 5000);
                    }
                }
            })
        }
    }
}