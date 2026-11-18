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

    // Hero: สร้างแถวโค้ดวิ่งอยู่ด้านหลังรูป (แถวคี่วิ่งไปทางหนึ่ง แถวคู่วิ่งกลับ)
  var bg = document.getElementById("codeBg");
  if (bg) {
    var snippets = [
      ["js", 'console.log("Hello World");'],
      ["py", 'print("Hello World")'],
      ["java", 'System.out.println("Hello World");'],
      ["c", 'printf("Hello World\\n");'],
      ["html", "<h1>Hello World</h1>"],
      ["css", "body { color: #04376f; }"],
      ["bash", 'echo "Hello World"'],
      ["git", 'git commit -m "first commit"'],
      ["net", "ip address 192.168.1.1 255.255.255.0"],
      ["js", 'const skills = ["Network", "DevOps"];'],
      ["py", "for i in range(3): print(i)"],
      ["net", "interface vlan 10"],
      ["bash", "ping -c 4 8.8.8.8"],
      ["css", ".hero { display: grid; }"]
    ];
    var build = function () {
      var rows = Math.ceil(bg.clientHeight / 22);
      if (bg.childElementCount === rows) return;
      bg.textContent = "";
      for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.className = "code-row" + (i % 2 ? " reverse" : "");
        row.style.setProperty("--t", 30 + ((i * 7) % 23) + "s");   // ความเร็วต่างกันแต่ละแถว
        row.style.setProperty("--d", "-" + ((i * 5) % 30) + "s");  // จุดเริ่มต่างกัน
        var track = document.createElement("div");
        track.className = "code-track";
        for (var copy = 0; copy < 2; copy++) {                      // 2 ชุด เพื่อให้วนต่อเนื่อง
          for (var n = 0; n < snippets.length; n++) {
            var item = snippets[(n + i * 3) % snippets.length];
            var span = document.createElement("span");
            span.className = "c-" + item[0];
            span.textContent = item[1];
            track.appendChild(span);
          }
        }
        row.appendChild(track);
        bg.appendChild(row);
      }
    };
    build();
    window.addEventListener("resize", build);
    document.documentElement.classList.add("js-ready");
  }

})();
