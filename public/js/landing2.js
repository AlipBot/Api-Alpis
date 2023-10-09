/* * * * * * * * * * * Varaibles * * * * * * * * * * */

let menuToggleBtn = document.querySelector('.menu-Toggle'), // Slect The Menu Toggle Button

  menuLinks = document.querySelector('.menu-Links'), // Select The Menu Links [ ul ]

  overlay = document.querySelector('.overlay'); // Select The Overlay Layer

/* * * * * * * * * * * Events * * * * * * * * * * */

// When Click On The [ menuToggleBtn ] Run [ showMenu ] Function
menuToggleBtn.addEventListener('click', showMenu);

// Close The Menu When Clikc In AnyWhery Run [ hideMenu ] Function
document.addEventListener('click', hideMenu);

// Stop The Propagation From The MenuLinks, When Clikc In [ menuLinks ] Run [ stopPropagation ] Function
menuLinks.addEventListener("click", stopPropagation);

/* * * * * * * * * * * Functions * * * * * * * * * * */

function showMenu() { // [ showMenu ] Function

  // Toggle Class [ open ] on [ menuLinks ]
  menuLinks.classList.toggle("open");
  // Toggle Class [ show ] on [ overlay ]
  overlay.classList.toggle("show");

};

function hideMenu(e) { // [ hideMenu ] Function

  // Check If The Target Element Is Not [ menuToggleBtn ]
  if (e.target != menuToggleBtn) {
    // Remove Class [ open ] From [ menuLinks ]
    menuLinks.classList.remove("open");
    // Remove Class [ show ] From [ overlay ]
    overlay.classList.remove("show");
  };

};

function stopPropagation(e) { // [ stopPropagation ] Function

  // stopPropagation
  e.stopPropagation();
  
};

// (: