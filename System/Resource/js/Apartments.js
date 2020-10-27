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
}