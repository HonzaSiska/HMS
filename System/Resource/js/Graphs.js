class Graphs
{
    getChart1(){
        var year = document.querySelector("#chartYearInput").value;
        if(year == "")
        {
            year = new Date();
            year = year.getFullYear();
            
        }else
        {
             year = document.querySelector("#chartYearInput").value;
        }
        //alert(year);
        $.post(
            URL + "Graphs/getChart1",
            {year: year},
            (response) => {
                console.log(response);
                try {
                    //console.log(JSON.parse(response));
                    var output = JSON.parse(response);
                    //var target = document.querySelector("#test");
                  
                     var sums = [];
                     var months = [];
                     for(var i = 0 ; i <output.length; i++)
               
                    {
                        months.push( output[i].Month );
                        sums.push(output[i].Sum );
                        
                    }
                    //console.log(months);
                    //console.log(sums);
                    document.querySelector("#chartYearInput").value=year;

                    var czechMonths =[];
                    
                    for(let i = 0; i< months.length; i++)
                    {
                    let item = months[i];
                    // console.log(item);
                    let index = monthsEnglish.indexOf(item);
                    console.log(index);
                    czechMonths.push(monthsCzech[index]);
                    }

                    // -------------
                    // CHART
                    // -------------

                    var ctx = document.getElementById('chart1').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: czechMonths,
                            datasets: [{
                                label: 'útrata',
                                data: sums,
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

                } catch (error) {
                    //console.log(response);
                    
                }
            }
            
        )
    }
}