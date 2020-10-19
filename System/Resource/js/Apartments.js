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
        // console.log($('input[type=file]')[0].files);
        // var data = new FormData();
        var error = document.querySelector("#apartment_form_error");
        var images =[];
         var data=[];

        if(
            document.querySelector("#apartment_name").value=="" ||
            document.querySelector("#apartment_ulice").value=="" ||
            document.querySelector("#apartment_city").value=="" ||
            document.querySelector("#apartment_rooms").value=="" 
        )
        {
            error.innerHTML = "Všechna pole s hvezdičkou musí být vyplněna";
        }else{
            $.each($('input[type=file]')[0].files, (i, file) => {
                images.push(file.name);
            });
            console.log(images);
            data.push({'File':images});
            data.push({'Jednotka': document.querySelector("#apartment_name").value });
            data.push({'Ulice': document.querySelector("#apartment_ulice").value });
            data.push({'Mesto': document.querySelector("#apartment_city").value });
            data.push({'Pokoje': document.querySelector("#apartment_rooms").value });
            data.push({'Popis': document.querySelector("#apartment_desc").value });
            data = JSON.stringify(data);
            console.log(data);

            // $.ajax({
            //     url: URL + "Apartments/insertApartment",
            //     data: data,
            //     cache: false,
            //     datatype: "application/json",
            //     contentType: "json",
            //     processData: false,
            //     type: 'POST',
            //     success: (response)=> {
            //         console.log(response);
            //     }
            // })
            $.post(
                URL + "Apartments/insertApartment",
                {data:data},
                (response)=>{
                    console.log(response);
                }

            )
            
        }
        
        
    }
}