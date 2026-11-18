(function () {
  "use strict";

  // Lightbox for activity photos
  var box = document.getElementById("lightbox");
  var boxImg = box.querySelector("img");
  var boxCap = box.querySelector(".lb-cap");

  document.querySelectorAll(".zoom").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var thumb = btn.querySelector("img");
      boxImg.src = btn.dataset.full;
      boxImg.alt = thumb ? thumb.alt : "";
      boxCap.textContent = btn.dataset.cap || "";
      box.showModal();
    });
  });

  // Close when clicking the dark backdrop
  box.addEventListener("click", function (e) {
    if (e.target === box) box.close();
  });

  // Copy buttons in the contact section
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.dataset.copy;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "คัดลอกแล้ว";
        setTimeout(function () { btn.textContent = old; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {});
      }
    });
  });
})();
