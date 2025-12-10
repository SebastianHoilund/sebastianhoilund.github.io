document.addEventListener('DOMContentLoaded', () => {
    new Chart(document.getElementById('wageDiffernceChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Kvinders jobs', 'IT-jobs (mænd)'],
            datasets: [{ data: [35128, 47475], backgroundColor: ['#FF6384', '#36A2EB'] }]
        },
        options: {
            responsive: true,
            plugins: { legend: false },
            scales: { y: { beginAtZero: true } }
        }
    });
});
