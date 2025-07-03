window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('d-none');
    document.getElementById('loginSection').classList.remove('d-none');
  }, 3000);
});

// Google login simulation
document.getElementById('continueBtn').addEventListener('click', () => {
  alert("✅ Google login successful (demo)");
  showLandingPage();
});

// Email login
document.getElementById('emailLoginBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const otp = document.getElementById('otp').value.trim();

  if (!email || !otp) {
    alert("⚠️ Please enter both Email and OTP.");
    return;
  }

  localStorage.setItem('userEmail', email);
  localStorage.setItem('userOTP', otp);

  alert("✅ Login successful!");
  showLandingPage();
});

function showLandingPage() {
  document.getElementById("loginSection").classList.add("d-none");
  document.getElementById("landingPage").classList.remove("d-none");
}

function goToDashboard(type) {
  if (type === 'bus') {
    document.getElementById("landingPage").classList.add("d-none");
    document.getElementById("mainApp").classList.remove("d-none");
    document.getElementById("type").value = "bus"; // Default preselect
  }
}

// Handle Bus Search
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  const date = document.getElementById('date').value;

  if (!from || !to || !date) {
    alert("⚠️ Please fill in all fields to search your trip.");
    return;
  }

  const results = document.getElementById('resultsSection');
  const container = document.getElementById('ticketResults');
  container.innerHTML = '';

  // Dummy Bus Ticket
  const ticketHTML = `
    <div class="card mb-3">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title mb-1">VRL Travels</h5>
          <p class="card-text mb-0">${from} → ${to}</p>
          <small>10:00 AM - 3:00 PM</small>
        </div>
        <button class="btn btn-main" onclick="showSeatSelection()">Select Your Seat</button>
      </div>
    </div>
  `;

  container.innerHTML = ticketHTML;
  results.classList.remove('d-none');
});

function showSeatSelection() {
  const seatLayout = document.getElementById('seatLayout');
  seatLayout.innerHTML = '';
  for (let i = 1; i <= 12; i++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = i;
    seat.addEventListener('click', () => {
      document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
      seat.classList.add('selected');
      seatLayout.setAttribute('data-selected', i);
    });
    seatLayout.appendChild(seat);
  }
  document.getElementById('seatSection').classList.remove('d-none');

  // Proceed button logic
  document.getElementById('proceedBtn').onclick = () => {
    const name = document.getElementById('passengerName').value.trim();
    const age = document.getElementById('passengerAge').value.trim();
    const email = document.getElementById('passengerEmail').value.trim();
    const selectedSeat = document.querySelector('.seat.selected');

    if (!name || !age || !email || !selectedSeat) {
      alert("⚠️ Please fill all fields and select a seat.");
      return;
    }

    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryAge').textContent = age;
    document.getElementById('summaryEmail').textContent = email;
    document.getElementById('summarySeat').textContent = selectedSeat.textContent;

    document.getElementById('summarySection').classList.remove('d-none');
  };
}
