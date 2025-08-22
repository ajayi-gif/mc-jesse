// =============================
// MOBILE NAV TOGGLE
// =============================
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

// =============================
// HERO SLIDESHOW
// =============================
let slides = document.querySelectorAll(".slide");
let index = 0;
if (slides.length > 0) {
  slides[0].classList.add("active");
  function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }
  setInterval(showSlides, 5000);
}

// =============================
// CONTACT FORM VALIDATION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault(); // stop form from submitting immediately

      const name = form.querySelector("input[type='text']");
      const email = form.querySelector("input[type='email']");
      const message = form.querySelector("textarea");

      if (name.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        alert("Please fill in all fields.");
        return;
      }
      if (!validateEmail(email.value)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Simulate sending (in real case use AJAX / backend)
      alert("Thank you " + name.value + "! Your message has been sent.");
      form.reset();
    });
  }
});

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// =============================
// GALLERY LIGHTBOX
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");

  if (galleryImages.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);

    const img = document.createElement("img");
    lightbox.appendChild(img);

    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });

    galleryImages.forEach(image => {
      image.addEventListener("click", () => {
        img.src = image.src;
        lightbox.classList.add("active");
      });
    });
  }
});

// =============================
// EVENT FILTERING
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".event-filter button");
  const eventCards = document.querySelectorAll(".event-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter");

      eventCards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Highlight active button
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
});


// // =============================
// // BOOKING MODAL & CONFIRMATION
// // =============================
// document.addEventListener("DOMContentLoaded", () => {
//   const modal = document.getElementById("bookingModal");
//   const closeBtn = document.querySelector(".close");
//   const bookingForm = document.getElementById("bookingForm");
//   const bookingTitle = document.getElementById("bookingTitle");

//   let selectedService = "";
//   let selectedPrice = "";

//   // Open modal when "Book Now" is clicked
//   document.querySelectorAll(".book-btn").forEach(btn => {
//     btn.addEventListener("click", () => {
//       selectedService = btn.getAttribute("data-service");
//       selectedPrice = btn.getAttribute("data-price");
//       bookingTitle.textContent = `Book ${selectedService} (${selectedPrice})`;
//       modal.style.display = "flex";
//     });
//   });

//   // Close modal
//   closeBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   window.addEventListener("click", e => {
//     if (e.target === modal) {
//       modal.style.display = "none";
//     }
//   });

//   // Handle booking confirmation
//   bookingForm.addEventListener("submit", e => {
//     e.preventDefault();
//     const name = document.getElementById("clientName").value;
//     const email = document.getElementById("clientEmail").value;
//     const date = document.getElementById("bookingDate").value;

//     if (!name || !email || !date) {
//       alert("Please fill all fields.");
//       return;
//     }

//     alert(`✅ Booking Confirmed!\n\nService: ${selectedService}\nPrice: ${selectedPrice}\nName: ${name}\nEmail: ${email}\nDate: ${date}`);
//     bookingForm.reset();
//     modal.style.display = "none";
//   });
// });


// =============================
// BOOKING MODAL & FORM SUBMIT
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("bookingModal");
  const closeBtn = document.querySelector(".close");
  const bookingForm = document.getElementById("bookingForm");
  const bookingTitle = document.getElementById("bookingTitle");

  const serviceInput = document.getElementById("selectedService");
  const priceInput = document.getElementById("selectedPrice");

  let selectedService = "";
  let selectedPrice = "";

  // Open modal
  document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedService = btn.getAttribute("data-service");
      selectedPrice = btn.getAttribute("data-price");

      bookingTitle.textContent = `Book ${selectedService} (${selectedPrice})`;

      // Fill hidden fields
      serviceInput.value = selectedService;
      priceInput.value = selectedPrice;

      modal.style.display = "flex";
    });
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Handle form submit via AJAX
  bookingForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(bookingForm);

    try {
      const response = await fetch(bookingForm.action, {
        method: bookingForm.method,
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert(`✅ Booking Confirmed!\n\nService: ${selectedService}\nPrice: ${selectedPrice}\nWe’ve sent your details to our email. We'll contact you soon!`);
        bookingForm.reset();
        modal.style.display = "none";
      } else {
        alert("❌ Oops! Something went wrong, please try again.");
      }
    } catch (error) {
      alert("⚠️ Network error. Please check your connection.");
    }
  });
});

