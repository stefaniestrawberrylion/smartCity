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

    // 2. Functies voor het Bijwerken van de UI

    /**
     * Telt geanimeerd naar het gewenste eindgetal.
     * @param {HTMLElement} element - Het HTML-element dat bijgewerkt moet worden.
     * @param {number} endValue - De uiteindelijke waarde.
     * @param {number} duration - De animatieduur in milliseconden.
     */
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
                element.textContent = endValue; // Zorg voor de exacte eindwaarde
            }
        };

        window.requestAnimationFrame(step);
    }

    /**
     * Laadt de kaartentellers en start de animatie.
     */
    function loadCardCounts() {
        const counts = mockData.cardCounts;
        const cardContainer = document.querySelector('.cards-row');

        // Update en animeer elk tel-element
        animateCount(document.getElementById('count-cyber'), counts.cyber);
        animateCount(document.getElementById('count-traffic'), counts.traffic);
        animateCount(document.getElementById('count-iot'), counts.iot);

        // Geef de kaartenrij een 'loaded' klasse om de fade-in/slide-down animatie te starten
        cardContainer.classList.add('loaded');
    }

    /**
     * Genereert de bars, stelt de hoogte in en animeert.
     */
    function loadBarChart() {
        const chartContainer = document.getElementById('bar-chart');
        chartContainer.innerHTML = ''; // Maak de container leeg
        const data = mockData.barChartData;

        // Bepaal de maximale waarde om de hoogtes te schalen
        const maxVal = Math.max(...data.map(item => item.value));
        const maxHeight = 250; // Maximale pixelhoogte voor de hoogste staaf

        data.forEach((item, index) => {
            const bar = document.createElement('div');
            bar.className = `bar ${item.colorClass}`;
            bar.title = `${item.label}: ${item.value}`; // Tooltip voor info

            // De werkelijke hoogte wordt berekend op basis van de maxVal
            const targetHeight = (item.value / maxVal) * maxHeight;

            // Voeg de bar toe aan de DOM
            chartContainer.appendChild(bar);

            // Forceer een reflow (browserherberekening) om ervoor te zorgen dat de browser
            // de initiële hoogte van 0 ziet voordat we de doelgrootte instellen.
            // Dit is nodig om de CSS-overgang te triggeren.
            void bar.offsetWidth;

            // Stel de uiteindelijke hoogte in na de reflow om de CSS-animatie te starten
            bar.style.height = `${targetHeight}px`;
        });
    }

    /**
     * Laadt de sensorenlijst in de zijbalk.
     */
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

        // Geef de sensorenlijst een 'loaded' klasse om de fade-in/slide-in animatie te starten
        sensorContainer.classList.add('loaded');
    }

    // 3. Start de functies voor de initiële animatie en het laden van de data
    loadCardCounts();
    loadBarChart();
    loadSensorsList();
});