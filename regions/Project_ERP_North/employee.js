// Sidebar button click functionality
const sidebarLinks = document.querySelectorAll('.sidebar a');
const contentSections = document.querySelectorAll('.content');

sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all sidebar links
        sidebarLinks.forEach(item => item.classList.remove('active'));

        // Hide all content sections
        contentSections.forEach(section => section.classList.remove('active'));

        // Add active class to clicked link
        this.classList.add('active');

        // Show corresponding content section
        const targetContent = document.getElementById(this.id.replace('Btn', 'Content'));
        targetContent.classList.add('active');
    });
});

// Logout confirmation
document.getElementById('logout').addEventListener('click', function() {
    if (confirm("คุณต้องการออกจากระบบใช่ไหม?")) {
        window.location.href = 'login.html';
    }
});

// Chart.js for task progress
new Chart(document.getElementById('taskChart'), {
    type: 'doughnut',
    data: {
        labels: ['เสร็จแล้ว', 'กำลังดำเนินการ', 'ยังไม่เริ่ม'],
        datasets: [{
            data: [10, 5, 5],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        }]
    }
});

// Search tasks
function searchTasks() {
    const filter = document.getElementById('searchTask').value.toUpperCase();
    const taskList = document.querySelector('.task-list');
    const tasks = taskList.getElementsByTagName('li');

    Array.from(tasks).forEach(function(task) {
        const taskText = task.textContent || task.innerText;
        if (taskText.toUpperCase().indexOf(filter) > -1) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}

// ฟังก์ชันสำหรับจัดการฟอร์มขอลาพัก
document.getElementById('leaveForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // เก็บข้อมูลจากฟอร์ม
    const leaveType = document.getElementById('leaveType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reason = document.getElementById('reason').value;

    // สร้างออบเจ็กต์ข้อมูลการลา
    const leaveRequest = {
        type: leaveType,
        startDate: startDate,
        endDate: endDate,
        reason: reason,
        status: 'รออนุมัติ' // สถานะเริ่มต้น
    };

    // เก็บข้อมูลการลาใน Local Storage
    saveLeaveRequest(leaveRequest);

    // แสดงรายการการลาล่าสุด
    displayLeaveRequests();

    // รีเซ็ตฟอร์ม
    document.getElementById('leaveForm').reset();

    // แสดงการแจ้งเตือน
    showNotification('ส่งคำขอลาเรียบร้อยแล้ว', 'success');
});

// ฟังก์ชันบันทึกข้อมูลการลา
function saveLeaveRequest(leaveRequest) {
    let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    leaveRequests.push(leaveRequest);
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
}

// ฟังก์ชันแสดงรายการการลา
function displayLeaveRequests() {
    const leaveList = document.getElementById('leaveList');
    leaveList.innerHTML = ''; // ล้างรายการเก่า

    const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];

    leaveRequests.forEach((request, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>ประเภท:</strong> ${request.type}<br>
            <strong>วันที่เริ่ม:</strong> ${request.startDate}<br>
            <strong>วันที่สิ้นสุด:</strong> ${request.endDate}<br>
            <strong>เหตุผล:</strong> ${request.reason}<br>
            <strong>สถานะ:</strong> ${request.status}
            <button class="delete-btn" onclick="deleteLeaveRequest(${index})">ลบ</button>
        `;
        leaveList.appendChild(listItem);
    });
}

// ฟังก์ชันลบรายการการลา
function deleteLeaveRequest(index) {
    let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
    
    // ลบรายการที่เลือกออกจากอาร์เรย์
    leaveRequests.splice(index, 1);
    
    // บันทึกข้อมูลที่อัปเดตกลับไปยัง Local Storage
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    
    // แสดงรายการการลาที่อัปเดต
    displayLeaveRequests();
    
    // แสดงการแจ้งเตือน
    showNotification('ลบรายการการลาเรียบร้อยแล้ว', 'success');
}

// ฟังก์ชันแสดงการแจ้งเตือน
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ฟังก์ชันบันทึกรายรับรายจ่าย
document.getElementById('financeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // เก็บข้อมูลจากฟอร์ม
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    // สร้างออบเจ็กต์ข้อมูลรายรับรายจ่าย
    const financeRecord = {
        type: type,
        amount: amount,
        description: description,
        date: date
    };

    // เก็บข้อมูลใน Local Storage
    saveFinanceRecord(financeRecord);

    // แสดงรายการล่าสุด
    displayFinanceRecords();

    // รีเซ็ตฟอร์ม
    document.getElementById('financeForm').reset();

    // แสดงการแจ้งเตือน
    showNotification('บันทึกรายรับรายจ่ายเรียบร้อยแล้ว', 'success');
});

// ฟังก์ชันบันทึกข้อมูลรายรับรายจ่าย
function saveFinanceRecord(financeRecord) {
    let financeRecords = JSON.parse(localStorage.getItem('financeRecords')) || [];
    financeRecords.push(financeRecord);
    localStorage.setItem('financeRecords', JSON.stringify(financeRecords));
}

// ฟังก์ชันแสดงรายการรายรับรายจ่าย
function displayFinanceRecords() {
    const financeList = document.getElementById('financeList');
    financeList.innerHTML = ''; // ล้างรายการเก่า

    const financeRecords = JSON.parse(localStorage.getItem('financeRecords')) || [];
    let totalIncome = 0;
    let totalExpense = 0;

    financeRecords.forEach((record, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>ประเภท:</strong> ${record.type}<br>
            <strong>จำนวนเงิน:</strong> ${record.amount} บาท<br>
            <strong>รายละเอียด:</strong> ${record.description}<br>
            <strong>วันที่:</strong> ${record.date}
            <button class="delete-btn" onclick="deleteFinanceRecord(${index})">ลบ</button>
        `;
        financeList.appendChild(listItem);

        // คำนวณยอดรวม
        if (record.type === 'รายรับ') {
            totalIncome += record.amount;
        } else {
            totalExpense += record.amount;
        }
    });

    // แสดงยอดรวม
    document.getElementById('totalIncome').textContent = totalIncome;
    document.getElementById('totalExpense').textContent = totalExpense;
    document.getElementById('balance').textContent = totalIncome - totalExpense;
}

// ฟังก์ชันลบรายการรายรับรายจ่าย
function deleteFinanceRecord(index) {
    let financeRecords = JSON.parse(localStorage.getItem('financeRecords')) || [];
    financeRecords.splice(index, 1);
    localStorage.setItem('financeRecords', JSON.stringify(financeRecords));
    displayFinanceRecords();
    showNotification('ลบรายการเรียบร้อยแล้ว', 'success');
}

// แสดงรายการเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', displayFinanceRecords);
// แสดงรายการการลาเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', displayLeaveRequests);