class CashRegister {
    constructor(){
        this.function = 0;
    }

    getTrans(datum)
    {
        //datum = "2020,10,11";
        // datum = toString(datum);
        // datum = datum.getFullYear() + "-" + parseInt(datum.getMonth()+1) + "- 1";
        // alert(datum);
        if(datum == null || datum == "")
        {
            datum = new Date();
        }else{
            datum = new Date(datum);
        }
        

        datum = (datum > new Date()) ? new Date(): datum;
        // datum.setDate( datum.getDate() - 6 ); reference
        
        datum = (datum.getFullYear() + "-" + parseInt(datum.getMonth()+1) + "-" + datum.getDate());
        //alert(datum);
        
        $.post(
            URL + "CashRegister/getTrans",
            
            {
                datum: datum,
            },
            (response) => {
                console.log(response);
                let data = JSON.parse(response);
                console.log(response);
                let pokladna = document.getElementById("pokladna_total");
                let output = document.getElementById("table_trans_body");
                pokladna.innerHTML = data.sum;
                output.innerHTML = data.table;
                let nav = document.getElementById("month_nav");
                nav.innerHTML = data.nav;
                
            }
        )
    }
    
    insertTrans(func){
        let error = document.querySelector("#transError");
        //error.innerHTML="ERROR";
        //closeAside("#aside");
        let date = document.querySelector("#datum").value;
        let amount = document.querySelector("#castka").value;
        let userValue = document.querySelector("#selectNames").value;
        let desc = document.querySelector("#popis").value;
       
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
                            if(desc != "")
                            {
                                $.post(
                                    URL + "CashRegister/insertTrans",
                                    {
                                        date: date,
                                        amount: amount,
                                        userValue: userValue,
                                        desc: desc,
                                        type : func
                                    },
                                    (response)=>
                                    {   
                                        if(response == 0)
                                        {
                                            closeAside("#aside");
                                            this.getTrans(null);
                                        }else{
                                            error.innerHTML = "Transakce nemohla byt provedena !!";
                                            // console.log(response);
                                        }
                                        
                                    })
                            }else
                            {
                                error.innerHTML="Zadej popis !!"; 
                            }
                            
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
    deleteTrans(data){
        //alert("data to be delete:"+data)
        $.post(
            URL + "CashRegister/deleteTrans",
            {
                IdTrans: data
            },
            (response) => {
                if(response == 0)
                {
                    this.getTrans(null);
                    slideUp();
                }else{
                    alert(response);
                    
                }
            }
        )
    }
    
        
}
