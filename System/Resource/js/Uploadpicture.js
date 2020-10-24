class Uploadpicture{
    constructor(){

    };
    // archivo(evt,id) {
    //     let files = evt.target.files; // FileList object
    //     let f = files[0];
    //     if (f.type.match('image.*')) {
    //         let reader = new FileReader();
    //         reader.onload = ((theFile) => {
    //             return (e) => {
    //                 // Insertamos la imagen
    //                 document.getElementById(id).innerHTML = ['<img src="', e.target.result, '" title="', escape(theFile.name), '"/>'].join('');
    //             };
    //         })(f);
    //         reader.readAsDataURL(f);
    //     }
    // }
    

    archivo(evt,id) {
       
        let files = evt.target.files;
        var count = files.length; // FileList object
        for(var i=0; i<count; i++)
            {let f = files[i];
            if (f.type.match('image.*')) {
                let reader = new FileReader();
                reader.onload = ((theFile) => {
                    return (e) => {
                        // Insertamos la imagen
                        // var output = document.getElementById(id);
                        var image = ['<div class="grid-item"><img src="', e.target.result, '" title="', escape(theFile.name), '"/></div>'].join('');
                        $(image).appendTo(id);
                    };
                })(f);
                reader.readAsDataURL(f);}
        }
    }

    
}