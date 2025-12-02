document.addEventListener('DOMContentLoaded', () => {
    // 1. Mock Data
    const mockData = {
        // Data voor de kaarten
        cardCounts: {
            cyber: 100,
            traffic: 50,
            iot: 20
        },
        // Data voor de staafgrafiek
        // incidentenAlgemeen, incidentenWordenVerholpen, incidentenVerholpen, overige
        barChartData: [
            { label: "Totaal Incidenten", value: 85, colorClass: "color-1" },
            { label: "In Behandeling", value: 120, colorClass: "color-2" },
            { label: "Opgelost", value: 70, colorClass: "color-3" },
            { label: "Nieuwe Incidenten", value: 95, colorClass: "color-4" }
        ],
        // Data voor de sensorenlijst
        sensors: [
            { name: "Verkeerscamera 1", isActive: true },
            { name: "Luchtkwaliteit Sensor 2", isActive: true },
            { name: "Slimme Straatverlichting 3", isActive: true },
            { name: "Afvalcontainer Sensor 4", isActive: false },
            { name: "Verkeerslicht Controller 5", isActive: true },
            { name: "Geluidsmeter 6", isActive: false }
        ]
    };

    //Functies voor het Bijwerken van de UI
    function animateCount(element, endValue, duration = 1000) {
        const startValue = 0;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const currentValue = Math.floor(percentage * (endValue - startValue) + startValue);

            element.textContent = currentValue;

            if (percentage < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = endValue;
            }
        };

        window.requestAnimationFrame(step);
    }


    function loadCardCounts() {
        const counts = mockData.cardCounts;
        const cardContainer = document.querySelector('.cards-row');

        animateCount(document.getElementById('count-cyber'), counts.cyber);
        animateCount(document.getElementById('count-traffic'), counts.traffic);
        animateCount(document.getElementById('count-iot'), counts.iot);

        cardContainer.classList.add('loaded');
    }

   //Bars van grafiek instellen
    function loadBarChart() {
        const chartContainer = document.getElementById('bar-chart');
        chartContainer.innerHTML = '';
        const data = mockData.barChartData;

        // Bepaal de maximale waarde om de hoogtes te schalen
        const maxVal = Math.max(...data.map(item => item.value));
        const maxHeight = 250;

        data.forEach((item, index) => {
            const bar = document.createElement('div');
            bar.className = `bar ${item.colorClass}`;
            bar.title = `${item.label}: ${item.value}`;

            const targetHeight = (item.value / maxVal) * maxHeight;

            chartContainer.appendChild(bar);

            void bar.offsetWidth;

            bar.style.height = `${targetHeight}px`;
        });
    }

    //Sensoren lijst laden
    function loadSensorsList() {
        const listContainer = document.getElementById('sensors-list');
        listContainer.innerHTML = ''; // Maak de container leeg
        const sensorContainer = document.querySelector('.sensors-list');

        mockData.sensors.forEach(sensor => {
            const item = document.createElement('div');
            item.className = `sensor-item ${sensor.isActive ? 'active' : 'inactive'}`;
            item.innerHTML = `
                ${sensor.name}
                <span class="status ${sensor.isActive ? 'active' : 'inactive'}">
                    ${sensor.isActive ? 'Actief' : 'Inactief'} •
                </span>
            `;
            listContainer.appendChild(item);
        });

        sensorContainer.classList.add('loaded');
    }
    loadCardCounts();
    loadBarChart();
    loadSensorsList();
});