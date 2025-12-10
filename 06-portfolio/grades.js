// karakterChart.js - Ud fra DATASÆT (automatisk erstatter PB)
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('optagData.json');
        const data = await res.json();

        const map = {};
        data.forEach(item => {
            const name = item.INSTITUTIONSAKT_BETEGNELSE || 'Ukendt';
            if (!map[name]) map[name] = { count: 0, sum: 0 };
            map[name].count++;
            map[name].sum += parseFloat(item.KVOTIENT) || 0;
        });

        // Beregn alle gennemsnit og sorter efter antal studerende
        const allUddannelser = Object.entries(map)
            .map(([label, s]) => ({
                label,
                count: s.count,
                avg: parseFloat((s.sum / s.count).toFixed(2))
            }))
            .sort((a, b) => b.count - a.count);

        // Find PB og erstatt med næste uddannelse
        let top5 = allUddannelser.slice(0, 5);
        const pbIndex = top5.findIndex(u => u.label.includes('PB'));

        if (pbIndex !== -1 && allUddannelser[5]) {
            // Erstat PB med uddannelse nr. 6
            top5[pbIndex] = allUddannelser[5];
            top5.sort((a, b) => b.count - a.count); // Gensorter
        }

        const labels = top5.map(e => e.label);
        const values = top5.map(e => e.avg);

        const ctx = document.getElementById('averageGradeChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Gennemsnitlig karakter',
                    data: values,
                    backgroundColor: '#36A2EB',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 5 uddannelser - gennemsnitlig karakter',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const entry = top5[ctx.dataIndex];
                                return `Gennemsnit: ${ctx.parsed.y} (n=${entry.count})`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 12,
                        ticks: { stepSize: 1 }
                    },
                    x: {
                        ticks: { maxRotation: 45 }
                    }
                }
            }
        });

        console.log('Top 5 uden PB:', top5);
        console.log('Alle uddannelser:', allUddannelser.slice(0, 10));
    } catch (err) {
        console.error('Fejl:', err);
    }
});
