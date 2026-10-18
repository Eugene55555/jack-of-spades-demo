(function () {
  "use strict";

  /* --- Доступное мобильное меню --- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* --- Демонстрационный диалог (покупка отключена) --- */
  var dialog = document.getElementById("demo-dialog");
  var openers = document.querySelectorAll("[data-open-demo]");

  function openDemo(event) {
    if (event) event.preventDefault();
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
      return;
    }
    window.alert(
      "Это демонстрационный макет. Покупка отключена: оформление заказа " +
        "и оплата не подключены, товар не продаётся. Данные не собираются."
    );
  }

  Array.prototype.forEach.call(openers, function (button) {
    button.addEventListener("click", openDemo);
  });

  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target !== dialog) return;
      var rect = dialog.getBoundingClientRect();
      var inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }
})();
