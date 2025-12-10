document.addEventListener('DOMContentLoaded', function() {
    const wageDifference = document.getElementById('wageDiffernceChart').getContext('2d');

    new Chart(wageDifference, {
        type: 'bar',
        data: {
            labels: ['Kvinders jobs', 'IT-jobs (mænd)'],
            datasets: [{
                label: 'Månedsløn (kr)',
                data: [35128, 47475],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Lønforskel: 35% lavere for kvinder'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' kr';
                        }
                    }
                }
            }
        }
    });
});
