document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('optagData.json');
        const data = await response.json();

        // Tæl fra "Køn" feltet (Mand/Kvinde)
        const maend = data.filter(person => person.Køn === 'Mand').length;
        const kvinder = data.filter(person => person.Køn === 'Kvinde').length;
        const total = maend + kvinder;

        console.log(`Mænd: ${maend}, Kvinder: ${kvinder}, Total: ${total}`);

        const ctx = document.getElementById('genderDifferenceChart').getContext('2d');

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Mænd', 'Kvinder'],
                datasets: [{
                    data: [maend, kvinder],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Kønsfordeling (${total} elever)`,
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const procent = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed} (${procent}%)`;
                            }
                        }
                    }
                }
            }
        });

    } catch (error) {
        console.error('Fejl ved optagData.json:', error);
        document.getElementById('genderDifferenceChart').style.background = '#f0f0f0';
        document.getElementById('genderDifferenceChart').parentElement.innerHTML +=
            '<p style="color:red;">Fejl: optagData.json ikke fundet</p>';
    }
});
