class Byty {
    constructor()
    {
        
        
    }

    vsechnyByty()
    {
        let target_mobile = document.getElementById('byty_mobile');
        $.post(
            URL + "Byty/vsechnyByty",
            {},
            response => {
                //console.log(response);
                
                target_mobile.innerHTML = response;
                $('.pictureSlide').slick({
                    centerMode: true,
                    centerPadding: '60px',
                    slidesToShow: 3,
                    easing: 'swing',
                    responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 2
                        }
                    }
                    ]
                });
                $(".byt_image").click((e)=>{
                     this.setLargeImage(e);
                })
                $(".large_image_byty").click((e)=>{
                    // console.log(e.offset().top)
                    
                    console.log(e.screenX);
                    console.log(e.screenY);
                    console.log(e.target.offsetWidth)
                    $(e.target).toggleClass('image_size_toggle');

                })
                
            }
            
        )
        
    }
    setLargeImage(e){
        console.log(e)
        let largeImage = e.target.parentElement.parentElement.parentElement;
        largeImage = largeImage.parentElement.parentElement.children[0].children[1].children[0];

        let clickedImage = e.target.src;
        largeImage.src = clickedImage;
        console.log(largeImage);
        console.log(clickedImage);
    }
}