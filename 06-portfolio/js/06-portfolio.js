// gender 
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('genderChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sundhed', 'Undervisning', 'Pleje', 'Administration', 'IT-Branchen'],
            datasets: [{
                label: 'Antal Kvinder (%)',
                data: [80, 70, 75, 65, 28],
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
            plugins: { legend: false },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
        }
    });
});


// gender diff
document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('genderDifferenceChart').getContext('2d');

    const data = await fetch('optagData.json').then(r => r.json());

    const itData = data.filter(p => p.INSTITUTIONSAKT_BETEGNELSE?.includes('IT'));
    const maend = itData.filter(p => p.Køn === 'Mand').length;
    const kvinder = itData.filter(p => p.Køn === 'Kvinde').length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mænd', 'Kvinder'],
            datasets: [{ data: [maend, kvinder], backgroundColor: ['#36A2EB', '#FF6384'] }]
        },
        options: {
            plugins: { legend: false }
        }
    });
});

// wage diff
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('wageDiffernceChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Kvinders jobs', 'IT-jobs'],
            datasets: [{ data: [35.128, 47.475], backgroundColor: ['#FF6384', '#36A2EB'] }]
        },
        options: {
            plugins: { legend: false },
            scales: { y: { beginAtZero: true } }
        }
    });
});

// sabbatical years
document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('sabbaticalChart').getContext('2d');

    const data = await fetch('optagData.json').then(r => r.json());

    const counts = {};
    data.forEach(item => {
        const years = item['Antal sabbatår'];
        if (years !== null) {
            const key = years.toString();
            counts[key] = (counts[key] || 0) + 1;
        }
    });

    const sorted = Object.entries(counts)
        .map(([label, value]) => ({ label: label + ' år', value }))
        .sort((a, b) => parseInt(a.label) - parseInt(b.label));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e.label),
            datasets: [{ data: sorted.map(e => e.value), backgroundColor: '#9C27B0' }]
        },
        options: {
            plugins: { legend: false },
            scales: { y: { beginAtZero: true } }
        }
    });
});

// age distribution
document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('ageChart').getContext('2d');

    const data = await fetch('optagData.json').then(r => r.json());

    const counts = {};
    data.forEach(item => {
        const age = item['Alder'];
        if (age !== null && age !== undefined) {
            const key = age.toString();
            counts[key] = (counts[key] || 0) + 1;
        }
    });

    const sorted = Object.entries(counts)
        .map(([label, value]) => ({ label: label + ' år', value }))
        .sort((a, b) => parseInt(a.label) - parseInt(b.label));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(e => e.label),
            datasets: [{ data: sorted.map(e => e.value), backgroundColor: '#FF9800' }]
        },
        options: {
            plugins: { legend: false },
            scales: { y: { beginAtZero: true } }
        }
    });
});
