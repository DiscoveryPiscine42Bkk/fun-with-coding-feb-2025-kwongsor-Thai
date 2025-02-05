function getTodos() {
  let cookies = document.cookie.split("; "); // ดึงค่าของ cookies ทั้งหมดใน document และแยกออกเป็นอาร์เรย์โดยใช้ ; เป็นตัวแบ่ง
  for (let cookie of cookies) {
    //วนลูปเพื่อเช็คแต่ละค่าในอาร์เรย์ของ cookies
    let [key, value] = cookie.split("="); //แยกค่า cookie ออกเป็น key และ value โดยใช้ = เป็นตัวแบ่ง
    if (key === "todos") {
      //ตรวจสอบว่า key มีค่าเป็น "todos" หรือไม่
      return JSON.parse(decodeURIComponent(value)); //หากพบค่า "todos" ให้นำค่าที่ถูกเข้ารหัสกลับมาเป็น JSON แล้ว return ออกไป
    }
  }
  return []; //หากไม่พบ "todos" ให้ return อาร์เรย์ว่าง
}

function saveTodos(todos) {
  document.cookie =
    "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}

function addTodo(text, save = true) {
  if (!text) return; //หาก text เป็นค่าว่าง ให้หยุดการทำงานของฟังก์ชันทันที

  let div = document.createElement("div"); //สร้าง div ใหม่
  div.className = "todo"; //กำหนด class ให้ div เป็น "todo"
  div.textContent = text; //กำหนดข้อความภายใน div เป็นค่าที่ได้รับจาก text

  div.onclick = function () {
    //เมื่อคลิก div จะทำตาม func นี้
    if (confirm("Do you want to remove this TO DO?")) {
      // แสดงกล่องยืนยันว่าต้องการลบหรือไม่
      div.remove();
      let todos = getTodos().filter((todo) => todo !== text); //ดึงค่าจาก cookies และกรองออกเฉพาะค่าที่ไม่ตรงกับ text
      saveTodos(todos); // บันทึกค่า todos ที่ถูกแก้ไขกลับไปยัง cookies
    }
  };

  let ftList = document.getElementById("ft_list"); //ค้นหา div ที่มี id="ft_list"
  ftList.prepend(div); //เพิ่ม div ที่สร้างใหม่ไปที่ด้านบนสุดของ <div id="ft_list">

  if (save) {
    let todos = getTodos(); //ดึงค่า todos จาก cookies
    todos.unshift(text); //เพิ่มค่า text ไปที่ต้นอาร์เรย์ todos
    saveTodos(todos);
  }
}

//การโหลดรายการจาก Cookies เมื่อเปิดหน้าเว็บ
window.onload = function () {
  //ทำงานเมื่อหน้าเว็บโหลดเสร็จ
  let todos = getTodos(); //ดึงค่ารายการ todos จาก cookies
  todos.forEach((todo) => addTodo(todo, false)); //เรียกใช้ addTodo สำหรับแต่ละ todo ในอาร์เรย์ โดยไม่ต้องบันทึกซ้ำ
};

//ฟังก์ชันสำหรับเพิ่ม TO-DO ใหม่
document.getElementById("newTodo").onclick = function () {
  //กำหนดให้ปุ่ม new ทำงานเมื่อถูกคลิก
  let text = prompt("Enter a new TO DO:"); //แสดง prompt() เพื่อให้ผู้ใช้กรอกข้อมูล
  if (text) addTodo(text); //ถ้ามีข้อความ ให้เรียก addTodo(text)
};
