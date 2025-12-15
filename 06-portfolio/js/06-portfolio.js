// gender 
// document.getElementById("lon").addEventListener("click", function () {

// });

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById("genderChart");
    canvas.style.display = (canvas.style.display === "none") ? "block" : "none";

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Sundhed', 'Undervisning', 'Pleje', 'Administration', 'IT-Branchen'],
            datasets: [{
                label: 'Antal Kvinder (%)',
                data: [80, 70, 75, 65, 28], //offcielle tendeser fra kilder
                backgroundColor: [
                    '#ff9999',
                    '#ffcc99',
                    '#99ccff',
                    '#cc99ff',
                    '#66cc99'
                ]
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});



// gender diff
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

// regions
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

// avg grades
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

// wage diff
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
