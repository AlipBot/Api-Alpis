







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

$.getJSON("https://api.countapi.xyz/hit/rest-api-alip.herokuapp.com/visitor", function(response) {
    $("#visitor").text(response.value);
})


//count Time

var countDownDate = new Date("Jul 10, 2022 00:00:00").getTime();

// Update Hitungan Mundur Setiap 1 Detik
var x = setInterval(function() {

    // Mengambil Tanggal Dan Waktu
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Kalkulator Waktu Hari, Jam, Menit, Detik 
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Menampilkan Hasil Di Dalam element Menggunakan id="time"
    document.getElementById("jadwaltime").innerHTML = days + "Hari  " + hours + "Jam " + minutes + "Menit " + seconds + "Detik ";

    // Ketika countdown timer sudah berakhir Maka Tulisan Berakhir
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("jadwaltime").innerHTML = "Berakhir";
    }
}, 1000);

//Jam
let scrollToTopRoundedfasfauserninjaXfa2xtextprimary=document.querySelector('div#row-no-guttersalign-items-center');let fasfauserninjaXfa2xtextprimary=document.querySelector('div#text-xsfont-weight-boldtext-uppercase-mb-1');setInterval(()=>{var widthdeVicewidthXinitialscalesHrinkno=new Date();const Jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const jam= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const menit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const Menit = widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const Detik = widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);const detik= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);const jaM= widthdeVicewidthXinitialscalesHrinkno.getHours().toString().padStart(2,0);const mEnit= widthdeVicewidthXinitialscalesHrinkno.getMinutes().toString().padStart(2,0);const detIk= widthdeVicewidthXinitialscalesHrinkno.getSeconds().toString().padStart(2,0);if(Jam<4){fasfauserninjaXfa2xtextprimary.innerHTML="Selamat Dini Hari";}else if(jam<11){fasfauserninjaXfa2xtextprimary.innerHTML="Selamat Pagi";}else if(Jam<16){fasfauserninjaXfa2xtextprimary.innerHTML="Selamat Siang";}else if(jam<20){fasfauserninjaXfa2xtextprimary.innerHTML="Selamat Petang";}else{fasfauserninjaXfa2xtextprimary.innerHTML="Selamat Malam";}scrollToTopRoundedfasfauserninjaXfa2xtextprimary.innerHTML=jaM+":"+mEnit+":"+detIk},250);