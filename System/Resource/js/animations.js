
$().ready(()=>{


anime({
    targets: '#hms',
    keyframes: [
      
      {translateX: 50},
      
      {translateX: -50},
      
    ],
    rotateX: 360,
    duration: 4000,
    easing: 'easeOutExpo',
    loop: true
    
  });
  anime({
    targets: '#openAside',
    keyframes: [
      
      {opacity: 0.5},
      {opacity: 1},
      
    ],
    rotateY: 360,
    delay: 1000,
    duration: 2000,
    easing: 'linear',
    loop: true
    
  });
 
    
    // Add children
    
  //   shape.add({
  //     targets: '.shape1',
  //     translateX: 50,
  //   })
  //   .add({
  //     targets: '.shape1',
  //     translateX: -50,
  //   })
  //   .add({
  //     targets: '.shape1',
  //     translateX: 0,
  //   })
  //   .add({
  //     targets: '.shape1',
  //     rotateX: 360,
  //   })
  //   .add({
  //     targets: '.shape1',
  //     rotateX: -360,
  //   })
  //   .add({
  //     targets: '.shape1',
  //     rotateY: 360,
  //   });
});