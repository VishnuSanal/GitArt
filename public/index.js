document.addEventListener("DOMContentLoaded", function () {
  const squaresContainer = document.querySelector(".squares");
  const yearSelect = document.getElementById("year-select");

  function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2005; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }

    yearSelect.selectedIndex = 0;
  }
  generateYearOptions();

  function generateCalendar(year) {
    squaresContainer.innerHTML = "";
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const startingDay = new Date(startDate.getFullYear(), 0, 1).getDay();

    let currentDate = startDate;
    currentDate = new Date(
      currentDate.getTime() - startingDay * millisecondsInDay
    );

    while (currentDate <= endDate) {
      const square = document.createElement("li");
      square.setAttribute("data-level", "0");
      square.setAttribute(
        "data-date",
        new Date(currentDate.getTime() + 1 * millisecondsInDay)
          .toISOString()
          .split("T")[0]
      );

      if (currentDate.getFullYear() < startDate.getFullYear()) {
        square.classList.add("previous-year");
      }
      
      dateforgitlist = [];
      squaresContainer.appendChild(square);
      if (!square.classList.contains("previous-year")) {
        square.addEventListener("click", function () {
          const currentLevel = parseInt(square.getAttribute("data-level"));
          const options = { year: "numeric", month: "short", day: "numeric" };
          dateforgit = new Date(square.getAttribute("data-date")).toLocaleDateString("en", options);
          dateforgitlist.push(dateforgit);
          console.log("dateforgit:",dateforgit);
          console.log("dateforgitlist: ",dateforgitlist);
          
          increaseLevel(square, currentLevel);
        });

        square.addEventListener("contextmenu", function (event) {
          event.preventDefault();
          const currentLevel = parseInt(square.getAttribute("data-level"));
          const options = { year: "numeric", month: "short", day: "numeric" };
          dateforgit = new Date(square.getAttribute("data-date")).toLocaleDateString("en", options);
          decreaseLevel(square, currentLevel);
          const index = dateforgitlist.indexOf(dateforgit);
          if (index > -1) {
            dateforgitlist.splice(index, 1);
          }
          console.log("dateforgit:",dateforgit);
          console.log("dateforgitlist: ",dateforgitlist);
        });

        square.addEventListener("mouseover", function (event) {
          const target = event.target;
          if (target && target.matches("li[data-date]")) {
            const date = target.getAttribute("data-date");
            const options = { year: "numeric", month: "long", day: "numeric" };
            target.title = new Date(date).toLocaleDateString("en", options);
          }
        });
      }

      currentDate = new Date(currentDate.getTime() + millisecondsInDay);
    }
  }

  generateCalendar(parseInt(yearSelect.value));
  yearSelect.addEventListener("change", function () {
    generateCalendar(parseInt(yearSelect.value));
  });

  function increaseLevel(square, currentLevel) {
    if (currentLevel < 4) {
      const newLevel = currentLevel + 1;
      square.setAttribute("data-level", newLevel);
    }
  }

  function decreaseLevel(square, currentLevel) {
    if (currentLevel > 0) {
      const newLevel = currentLevel - 1;
      square.setAttribute("data-level", newLevel);
    }
  }
});
