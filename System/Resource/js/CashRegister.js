class CashRegister {
    constructor(){
        this.function = 0;
    }

    getTrans(datum)
    {
        // datum = "2020,10,11";
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
                console.log(data.graphs);
                //vytvorit labels pro sumy vkladu
                let labelsCredit = [];
                let sumsCredit = [];
                for(let i = 0; i < data.graphs[0].length; i++){
                    labelsCredit.push(data.graphs[0][i]['name']);
                }
                //console.log(labelsCredit);
                for(let i = 0; i < data.graphs[0].length; i++){
                    sumsCredit.push(data.graphs[0][i]['creditSum']);
                }
                //console.log(sumsCredit);

                //vytvorit labels pro sumy vydaju
                let labelsDebit = [];
                let sumsDebit = [];
                for(let i = 0; i < data.graphs[1].length; i++){
                    labelsDebit.push(data.graphs[1][i]['name']);
                }
                console.log(labelsCredit);
                for(let i = 0; i < data.graphs[1].length; i++){
                    sumsDebit.push(data.graphs[1][i]['debitSum']);
                }
                console.log(sumsDebit);
                // -------------
                // CHART credit
                // -------------
                if (myChart) myChart.destroy();
                var ctx = document.getElementById('chartCredit').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labelsCredit,
                        datasets: [{
                            label: 'vklady ' + datum,
                            data: sumsCredit,
                            backgroundColor: [
                                'rgba(63, 191, 127)',
                                'rgba(63, 191, 191)',
                                'rgba(63, 127, 191)',
                                'rgba(63, 63, 191)',
                                'rgba(127, 63, 191)',
                                'rgb(191, 63, 127)',
                                // 'rgba(255, 99, 132, 0.2)',
                                // 'rgba(54, 162, 235, 0.2)',
                                // 'rgba(255, 206, 86, 0.2)',
                                // 'rgba(75, 192, 192, 0.2)',
                                // 'rgba(153, 102, 255, 0.2)',
                                // 'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(63, 191, 127)',
                                'rgba(63, 191, 191)',
                                'rgba(63, 127, 191)',
                                'rgba(63, 63, 191)',
                                'rgba(127, 63, 191)',
                                'rgb(191, 63, 127)',
                                // 'rgba(255, 99, 132, 1)',
                                // 'rgba(54, 162, 235, 1)',
                                // 'rgba(255, 206, 86, 1)',
                                // 'rgba(75, 192, 192, 1)',
                                // 'rgba(153, 102, 255, 1)',
                                // 'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    
                    options: {
                        
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                // -------------
                // CHART credit
                // -------------
                
                var ctx = document.getElementById('chartDebit').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labelsDebit,
                        datasets: [{
                            label: 'vklady ' + datum,
                            data: sumsDebit,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                
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
