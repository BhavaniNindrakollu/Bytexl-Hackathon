document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       Animated Counter Function
    ========================== */

    function animateCounter(element, target, isMoney = false) {
        let start = 0;
        let duration = 1500;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = Math.min((currentTime - startTime) / duration, 1);

            let value = Math.floor(progress * target);

            if (isMoney) {
                element.innerText = "$" + value.toLocaleString();
            } else {
                element.innerText = value;
            }

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    /* =========================
       Animate All Stat Cards
    ========================== */

    const counters = document.querySelectorAll(".stat-number");

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        const isMoney = counter.getAttribute("data-money") === "true";
        animateCounter(counter, target, isMoney);
    });


    /* =========================
       Donut Chart Dynamic Logic
    ========================== */

    const sold = 60;
    const reserved = 25;
    const available = 15;

    const donut = document.querySelector(".donut");
    const donutPercent = document.getElementById("donutPercent");

    // Update donut gradient dynamically
    donut.style.background = `
        conic-gradient(
            #6366f1 0% ${sold}%,
            #ec4899 ${sold}% ${sold + reserved}%,
            #e5e7eb ${sold + reserved}% 100%
        )
    `;

    // Animate center percentage
    let percentStart = 0;
    const percentTarget = sold;
    const percentDuration = 1200;
    let percentStartTime = null;

    function animatePercent(time) {
        if (!percentStartTime) percentStartTime = time;

        let progress = Math.min((time - percentStartTime) / percentDuration, 1);
        let value = Math.floor(progress * percentTarget);

        donutPercent.innerText = value + "%";

        if (progress < 1) {
            requestAnimationFrame(animatePercent);
        }
    }

    requestAnimationFrame(animatePercent);

});




