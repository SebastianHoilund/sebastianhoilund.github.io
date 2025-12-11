document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('optagData.json').then(r => r.json());

    const sum = data.reduce((total, item) => total + (+item.KVOTIENT || 0), 0);
    const avg = +(sum / data.length).toFixed(2);

    new Chart(document.getElementById('averageGradeChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Gennemsnitlig karakter'],
            datasets: [{ data: [avg], backgroundColor: '#36A2EB' }]
        },
        options: {
            responsive: true,
            plugins: { legend: false },
            scales: { y: { max: 12 } }
        }
    });
});
