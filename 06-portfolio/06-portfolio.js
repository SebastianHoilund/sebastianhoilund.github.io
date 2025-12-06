document.getElementById("lon").addEventListener("click", function(){
    const canvas =document.getElementById("genderChart");
    canvas.style.display = (canvas.style.display === "none") ? "block" : "none";

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Sundhed', 'Undervisning', 'Pleje','Administration','IT-Branchen'],
            datasets: [{
                label: 'Antal Kvinder (%)',
                data:[80,70,75,65,28], //offcielle tendeser fra kilder
                backgroundColor:[
                    '#ff9999',
                    '#ffcc99',
                    '#99ccff',
                    '#cc99ff',
                    '#66cc99'
                ]
            }]
        },
        options:{
            scales:{
                y:{
                    beginAtZero: true,
                    max: 100
                }
            }
        }
});
});