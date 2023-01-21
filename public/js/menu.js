







//


    tag_battery_status = document.querySelector('small#battery_status');
    tag_battery_level = document.querySelector('span#battery_level');
   


//Baterry
     setInterval(function() {
         navigator.getBattery().then(battery=> {
             battery_level = String(battery.level).split('.')[1];
             tag_battery_level.innerHTML = `${(battery_level.length <= 1)? oud(Number(battery_level)): battery_level}% ${battery.charging ? 'charging': 'discharging'}`;
         });
     },
         10);

//Visit

$.getJSON("https://api.countapi.xyz/hit/alpis.eu.org/visitor", function(response) {
    $("#visitor").text(response.value);
})




//Jam
let scrollToTopRoundedfasfauserninjaXfa2xtextprimary=document.querySelector('div#row-no-guttersalign-items-center');let fasfauserninjaXfa2xtextprimary=document.querySelector('div#text-xsfont-weight-boldtext-uppercase-mb-1');setInterval(()=>{var widthdeVicewidthXinitialscalesHrinkno=new Date();const Jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const menit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const Menit = widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const Detik = widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);const detik= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);const jaM= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const mEnit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const detIk= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);scrollToTopRoundedfasfauserninjaXfa2xtextprimary.innerHTML=jaM+":"+mEnit+":"+detIk},250);