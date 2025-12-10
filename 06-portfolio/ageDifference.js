document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('optagData.json').then(r => r.json());

    const maend = data.filter(p => p.Køn === 'Mand').length;
    const kvinder = data.filter(p => p.Køn === 'Kvinde').length;

    new Chart(document.getElementById('genderDifferenceChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Mænd', 'Kvinder'],
            datasets: [{ data: [maend, kvinder], backgroundColor: ['#36A2EB', '#FF6384'] }]
        },
        options: {
            responsive: true,
            plugins: { legend: false }
        }
    });
});
