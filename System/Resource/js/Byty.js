class Byty {
    constructor()
    {

    }

    vsechnyByty()
    {
        $.post(
            URL + "Byty/vsechnyByty",
            {},
            response => {
                console.log(response);
            }
        )
    }

    setLargeImage(e){
        
        let largeImage = e.target.parentElement.parentElement.parentElement;
        largeImage = largeImage.parentElement.parentElement.children[0].children[1].children[0];

        let clickedImage = e.target.src;
        largeImage.src = clickedImage;
        console.log(largeImage);
        console.log(clickedImage);
    }
}