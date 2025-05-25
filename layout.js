// Fix the login button handlers and add individual support booking
function initModals() {
    const loginBtn = document.getElementById("loginBtn")
    const mobileLoginBtn = document.getElementById("mobileLoginBtn")
    const createAccountBtn = document.getElementById("createAccountBtn")
  
    // Desktop login button
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "login.html"
      })
    }
  
    // Mobile login button
    if (mobileLoginBtn) {
      mobileLoginBtn.addEventListener("click", () => {
        window.location.href = "login.html"
      })
    }
  
    // Create account button
    if (createAccountBtn) {
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "login.html"
      })
    }
  }
  
  // Add individual support booking functionality
  function initServiceBooking() {
    // Handle all service buttons
    const serviceButtons = document.querySelectorAll(".service-btn")
  
    serviceButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault()
  
        const buttonText = this.textContent.trim()
        const href = this.getAttribute("href")
  
        // Handle different service actions
        if (buttonText.includes("Book Session") || buttonText.includes("Get Started")) {
          // Redirect to support request page
          window.location.href = "support-request.html"
        } else if (buttonText.includes("Explore Now")) {
          // Redirect to knowledge base
          window.location.href = "knowledge-base.html"
        } else if (href) {
          // Use the original href
          window.location.href = href
        }
      })
    })
  }
  
  // Declare the missing functions
  function initTheme() {}
  function initBackgroundCanvas() {}
  function initNavbarScroll() {}
  function initMobileMenu() {}
  function initTabs() {}
  function initForms() {}
  function initBackToTop() {}
  
  // Update the main DOMContentLoaded event
  document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const currentYearElement = document.getElementById("currentYear")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  
    // Initialize all components
    initTheme()
    initBackgroundCanvas()
    initNavbarScroll()
    initMobileMenu()
    initTabs()
    initForms()
    initBackToTop()
    initModals()
    initServiceBooking() // Add this new function
  
    // Handle create account button specifically
    const createAccountBtn = document.getElementById("createAccountBtn")
    if (createAccountBtn) {
      createAccountBtn.addEventListener("click", () => {
        window.location.href = "login.html"
      })
    }
  })
  