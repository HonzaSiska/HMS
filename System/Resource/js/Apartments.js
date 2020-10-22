class Apartments extends Uploadpicture{
    constructor() {
        super();
    }
    getApartments()
    {
        console.log("APARTMENTS LOADED");
    }


    insertApartment()
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
            console.log(totalFiles);
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
}