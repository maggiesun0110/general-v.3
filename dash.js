window.addEventListener("DOMContentLoaded", ()=> {
    //^^ waits for window to load before running
    navigator.getBattery().then(function (battery){ 
        //get battery info use .then bc it returns a promise (placeholder for value not there yet) so after you get the battery then....
        const percentage = document.getElementById("batteryPercentage");
        const batteryInfo = document.getElementById("batteryState");
        const batteryFill = document.getElementById("batteryFill");

        batteryFill.style.width = `${percentage}%`;

        //assigns var to the element of id batteryState
        function updateBatteryDisplay(){
            percent = Math.round(battery.level * 100);
            const charging = battery.charging;

            let text = "";

            if(charging){
                text += "charging";
                batteryFill.style.backgroundColor = "#00aaff";
            } else if(percentage <= 20){
                text += "low battery";
                batteryFill.style.backgroundColor = "#ff4d4d";
            } else{
                text += "normal";
                batteryFill.style.backgroundColor = "#4caf50"
            }

            percentage.textContent = `${percent}%`
            batteryInfo.textContent = text;
        }

        updateBatteryDisplay();

        battery.addEventListener("levelchange", updateBatteryDisplay);
        battery.addEventListener("chargingchange", updateBatteryDisplay);
    })
})