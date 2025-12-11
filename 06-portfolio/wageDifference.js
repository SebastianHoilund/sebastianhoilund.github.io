document.addEventListener('DOMContentLoaded', () => {
    new Chart(document.getElementById('wageDiffernceChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Kvinders jobs', 'IT-jobs (mænd)'],
            datasets: [{ data: [35.128, 47.475], backgroundColor: ['#FF6384', '#36A2EB'] }]
        },
        options: {
            responsive: true,
            plugins: { legend: false },
            scales: { y: { beginAtZero: true } }
        }
    });
});
