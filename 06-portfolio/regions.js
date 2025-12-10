document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('optagData.json').then(r => r.json());

    const counts = {};
    data.forEach(item => {
        const key = item.Bopæl_POSTDISTRIKT?.trim() || 'Ukendt';
        counts[key] = (counts[key] || 0) + 1;
    });

    const top5 = Object.entries(counts)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    new Chart(document.getElementById('regions').getContext('2d'), {
        type: 'bar',
        data: {
            labels: top5.map(e => e.label),
            datasets: [{ data: top5.map(e => e.value), backgroundColor: '#36A2EB' }]
        },
        options: {
            responsive: true,
            plugins: { legend: false },
            scales: { x: { ticks: { maxRotation: 45 } } }
        }
    });
});
