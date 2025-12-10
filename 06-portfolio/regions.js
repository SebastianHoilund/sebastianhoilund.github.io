// regionsVertical.js - LILLE vertikal graf (top 5 byer)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('optagData.json');
        const data = await res.json();

        // Tæl byer
        const counts = {};
        data.forEach(item => {
            const key = item.Bopæl_POSTDISTRIKT?.trim() || 'Ukendt';
            counts[key] = (counts[key] || 0) + 1;
        });

        // Top 5
        const top5 = Object.entries(counts)
            .map(([label, value]) => ({ label, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);

        const labels = top5.map(e => e.label);
        const values = top5.map(e => e.value);

        const ctx = document.getElementById('regions').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    data: values,
                    backgroundColor: '#36A2EB',
                    borderRadius: 3,
                    barThickness: 25  // TYNNE søjler
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 5 byer',
                        font: { size: 12 }  // Lille titel
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            font: { size: 10 },  // Lille labels
                            maxRotation: 45
                        },
                        grid: { display: false }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: { size: 10 },  // Lille ticks
                            precision: 0
                        },
                        grid: { display: false }
                    }
                }
            }
        });

    } catch (err) {
        console.error('Fejl:', err);
    }
});
