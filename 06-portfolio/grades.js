document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch('optagData.json').then(r => r.json());

    const stats = {};
    data.forEach(item => {
        const name = item.INSTITUTIONSAKT_BETEGNELSE || 'Ukendt';
        stats[name] = stats[name] || { count: 0, sum: 0 };
        stats[name].count++;
        stats[name].sum += +item.KVOTIENT || 0;
    });

    const top5 = Object.entries(stats)
        .map(([name, s]) => ({
            name,
            count: s.count,
            avg: +(s.sum / s.count).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    new Chart(document.getElementById('averageGradeChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: top5.map(u => u.name),
            datasets: [{ data: top5.map(u => u.avg), backgroundColor: '#36A2EB' }]
        },
        options: {
            responsive: true,
            plugins: { legend: false },
            scales: { y: { max: 12 } }
        }
    });
});
