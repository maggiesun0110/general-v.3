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
            } else if(percentage <= 20){
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
})