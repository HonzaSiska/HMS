class CashRegister {
    constructor(){
        this.function = 0;
    }

    getTrans()
    {
        console.log ("GET TRANS");
    }
    
    insertTrans(func){
        let error = document.querySelector("#transError");
        //error.innerHTML="ERROR";
        //closeAside("#aside");
        let date = document.querySelector("#datum").value;
        let amount = document.querySelector("#castka").value;
        let userValue = document.querySelector("#selectNames").value;
       
        // alert(date);
        if(date != ""){
            if(amount != "")
            {
                if(!isNaN(amount))
                {
                    if(amount != 0 && amount !="")
                    {
                        if(userValue != 0)
                        {
                            $.post(
                                URL + "CashRegister/insertTrans",
                                {
                                    date: date,
                                    amount: amount,
                                    userValue: userValue,
                                    type : func
                                },
                                (response)=>
                                {   
                                    if(response == 0)
                                    {
                                        closeAside("#aside");
                                    }else{
                                        error.innerHTML = "Transakce nemohla byt provedena !!";
                                    }
                                    
                                })
                        }else
                        {
                            error.innerHTML="Vyber uživatele !!"; 
                        }
                    }else
                    {
                        error.innerHTML="Zadej částku !!"; 
                    }
                }else
                {
                    error.innerHTML="částka je v neplatném formátu , zadej číslo !!";   
                }
            }else
            {
                error.innerHTML="Zadej částku !!";   
            }
        }else
        {
            error.innerHTML="Zadej datum !!";  
        }
       
        

    }
    
        
}
// $.post(
//     "CashRegister/insertTrans",
//     $('.transaction_form').serialize(),
//     (response)=>{})