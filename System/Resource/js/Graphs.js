class Graphs {

    getChart1() {

        var year = document.querySelector("#chartYearInput").value;
        if (year == "") {
            year = new Date();
            year = year.getFullYear();

        } else {
            year = document.querySelector("#chartYearInput").value;
        }

        //alert(year);
        $.post(
            URL + "Graphs/getChart1",
            { year: year },
            (response) => {
                console.log(response);
                try {
                    //console.log(JSON.parse(response));
                    var output = JSON.parse(response);
                    //var target = document.querySelector("#test");

                    var sums = [];
                    var months = [];
                    for (var i = 0; i < output.length; i++) {
                        months.push(output[i].Month);
                        sums.push(output[i].Sum);

                    }
                    //console.log(months);
                    //console.log(sums);
                    document.querySelector("#chartYearInput").value = year;

                    var czechMonths = [];

                    // Preklad Z anglickych mesicu na ceske
                    for (let i = 0; i < months.length; i++) {
                        let item = months[i];
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
                                label: 'útrata ' + year,
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
                    console.log(error);

                }
            }

        )
    }

    getChart2() {
        var year = document.querySelector("#chartYearInput").value;
        if (year == "") {
            year = new Date();
            year = year.getFullYear();

        } else {
            year = document.querySelector("#chartYearInput").value;
        }

        $.post(
            URL + "Graphs/getChart2",
            { year: year },
            (response) => {
                try {
                    //onsole.log("chart2"+ response);
                    var output = JSON.parse(response);
                    
                    let years = [];
                    let sums = [];
                    var cycle = output.length;
                    var arrayLength;

                    // Switch urcuje pocet ukazanych roku v chartu
                    // arrayLength odecteno od output.length urcuje zacatek cyklu a pocet zobrazenych let
                    // maximalne 3 v pripade, ze sql prines minimalne data za 3 roky, jinak mene
                    switch (cycle) {
                        // case cycle > 2:
                        //     arrayLength = 3;
                        //     break;
                        case cycle = 2:
                            arrayLength = 2;
                            break;
                        case cycle = 1:
                            arrayLength = 1;
                            break;
                        case cycle = 0:
                                arrayLength = 0;
                                break;
                        default:
                            arrayLength = 3;


                    }
                    // console.log("CYCLE-"+ cycle);
                    // console.log("CYCLE2-"+ output.length);
                    // console.log("ARRAY LENGTH-"+ arrayLength);

                    for (let i = output.length - arrayLength; i < output.length; i++) {
                        years.push(output[i].Year);
                        sums.push(output[i].Sum);
                    }
                    console.log(years + "-" + sums);



                    // -------------
                    // CHART 2
                    // -------------

                    var ctx = document.getElementById('chart2').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: years,
                            datasets: [{
                                label: 'útrata ' + year,
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

                }
                document.querySelector("#chartYearInput").value = year;



            }
        )
    }
}