const periodButtons = document.querySelectorAll(".btn-period");

periodButtons.forEach((button) => {
  button.addEventListener("click", function () {
    displayPeriodData(button.textContent.toLowerCase());
    document
      .querySelector(".btn-selected-period")
      .classList.remove("btn-selected-period");
    button.classList.add("btn-selected-period");
  });
});

displayPeriodData("weekly");

async function displayPeriodData(period) {
  const categoryData = await getData();

  categoryData?.forEach((category) => {
    document.querySelector(
      `p[data-curr-duration="${category.title}"]`
    ).textContent = `${category.timeframes[period]?.current ?? 0}hrs`;

    document.querySelector(
      `p[data-prev-duration="${category.title}"]`
    ).textContent = `${getPeriodText(period)} ${
      category.timeframes[period]?.previous ?? 0
    }hrs`;
  });
}

async function getData() {
  let data = null;

  try {
    data = await (await fetch("./datas.json")).json();
  } catch (e) {
    console.error("The period data could not be loaded");
    data = [];
  }

  return data;
}

function getPeriodText(period) {
  period = period?.toLowerCase();

  if (period === "daily") return "Yesterday - ";
  if (period === "weekly") return "Last Week - ";
  if (period === "monthly") return "Last Month - ";
}
