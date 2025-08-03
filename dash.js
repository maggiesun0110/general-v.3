window.addEventListener("DOMContentLoaded", ()=> {
    //^^ waits for window to load before running
    navigator.getBattery().then(function (battery){ 
        //get battery info use .then bc it returns a promise (placeholder for value not there yet) so after you get the battery then....
        const percentage = document.getElementById("batteryPercentage");
        const batteryInfo = document.getElementById("batteryState");
        const batteryFill = document.getElementById("batteryFill");

        //assigns var to the element of id batteryState
        function updateBatteryDisplay(){
            percent = Math.round(battery.level * 100);
            const charging = battery.charging;

            batteryFill.style.width = `${percent}%`;

            let text = "";

            if(charging){
                text += "charging";
                batteryFill.style.backgroundColor = "#79A27D";
            } else if(percent <= 20){
                text += "low battery";
                batteryFill.style.backgroundColor = "#7a2e2e";
            } else{
                text += "normal";
                batteryFill.style.backgroundColor = "#5C8A64";
            }

            percentage.textContent = `${percent}%`
            batteryInfo.textContent = text;
        }

        updateBatteryDisplay();

        battery.addEventListener("levelchange", updateBatteryDisplay);
        battery.addEventListener("chargingchange", updateBatteryDisplay);
    })

    //== Date Section ==
    const date = new Date();
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("twenty4time");

    dateElement.textContent =  `${date.toDateString()}`;
    timeElement.textContent = `${date.toLocaleTimeString()}`;

    function updateTime(){
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }

    updateTime();

    setInterval(updateTime, 500);


    //== Light Mode Toggle ==
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (prefersLight || localStorage.getItem('lightMode') === 'true') {
        document.body.classList.add('lightmode');
        document.getElementById('mode-toggle').checked = true;
        updateWeatherWidget("pure");
    } else {
        updateWeatherWidget("dark");
    }

    function updateWeatherWidget(theme) {
        const scrollContainer = document.getElementById("weatherScroll");

        scrollContainer.style.opacity = 0;

        setTimeout(() =>{
            // Clear old widget
            scrollContainer.innerHTML = '';

            // Create new widget
            const newWidget = document.createElement("a");
            newWidget.setAttribute("id", "weatherWidget");
            newWidget.setAttribute("class", "weatherwidget-io");
            newWidget.setAttribute("href", "https://forecast7.com/en/37d35n121d96/santa-clara/");
            newWidget.setAttribute("data-label_1", "santa clara");
            newWidget.setAttribute("data-label_2", "weather");
            newWidget.setAttribute("data-font", "Roboto");
            newWidget.setAttribute("data-icons", "Climacons Animated");
            newWidget.setAttribute("data-days", "5");

            if (theme === "dark") {
                // Keep your original dark style
                newWidget.setAttribute("data-theme", "dark");
                newWidget.setAttribute("data-basecolor", "#1b1e23");
                newWidget.setAttribute("data-shadow", "#0D0D0D");
                newWidget.setAttribute("data-suncolor", "#f3cc0b");
                newWidget.setAttribute("data-accent", "");
                newWidget.setAttribute("data-lowcolor", "");
            } else {
                // New light theme style
                newWidget.setAttribute("data-theme", "pure");
                newWidget.setAttribute("data-basecolor", "#eaeaea");
                newWidget.setAttribute("data-suncolor", "#f3cc0b");
                newWidget.setAttribute("data-textcolor", "#222222");
                newWidget.setAttribute("data-cloudcolor", "#444444");
                newWidget.setAttribute("data-accent", "");
                newWidget.setAttribute("data-lowcolor", "");
                newWidget.setAttribute("data-highcolor", "#222222"); // dark gray
            }

            newWidget.innerText = "santa clara weather";

            scrollContainer.appendChild(newWidget);

            // Re-inject the widget script
            const script = document.createElement("script");
            script.src = "https://weatherwidget.io/js/widget.min.js";
            document.body.appendChild(script);

            setTimeout(() => {
                scrollContainer.style.opacity = 1;
            }, 200)
        }, 100)
    }

    // Update storage when toggling
    const toggle = document.getElementById("mode-toggle");
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("lightmode");
        localStorage.setItem('lightMode', document.body.classList.contains('lightmode'));
        updateWeatherWidget(document.body.classList.contains('lightmode') ? "pure" : "dark");

    });


})