$(document).ready(function () {
  $(".about-me-text").click(function () {
    let randomcolor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    $(".about-me-text").css("background-color", randomcolor);
  });
});

$(document).ready(function () {
  $(".img-container img").click(function () {
    var currentSrc = $(this).attr("src"); // ดึงค่า src ปัจจุบัน

    // ตรวจสอบว่า src ปัจจุบันคือรูปไหน และเปลี่ยนไปเป็นอีกรูป
    if (currentSrc === "../photo/kwongsor_aboutme.jpg") {
      $(this).attr("src", "../photo/kwongsor.jpg"); // เปลี่ยนไปเป็นรูปใหม่
    } else {
      $(this).attr("src", "../photo/kwongsor_aboutme.jpg"); // เปลี่ยนกลับเป็นรูปแรก
    }
  });
});
