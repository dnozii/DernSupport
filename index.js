import { Chart } from "@/components/ui/chart"
// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Initialize background canvas
  initBackgroundCanvas()

  // Initialize navbar scroll effect
  initNavbarScroll()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize tabs
  initTabs()

  // Initialize account type selector
  initAccountTypeSelector()

  // Initialize contact form
  initContactForm()

  // Initialize back to top button
  initBackToTop()

  // Initialize admin panels
  initAdminPanels()

  // Initialize login modal
  initLoginModal()

  // Initialize charts (if admin panel is visible)
  if (document.getElementById("satisfactionChart")) {
    initCharts()
  }
})

// Background Canvas Animation
function initBackgroundCanvas() {
  const canvas = document.getElementById("backgroundCanvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function setCanvasDimensions() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  setCanvasDimensions()
  window.addEventListener("resize", setCanvasDimensions)

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, `
      this.alpha = Math.random() * 0.5 + 0.1
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color + this.alpha + ")"
      ctx.fill()
    }
  }

  // Create particles
  const particles = []
  const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000))

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "rgba(147, 51, 234, 0.05)"
    ctx.lineWidth = 1

    const gridSize = 50
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Update and draw particles
    particles.forEach((particle) => {
      particle.update()
      particle.draw()
    })

    // Draw connections
    ctx.strokeStyle = "rgba(147, 51, 234, 0.1)"
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll() // Initial check
}

// Mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileDropdownTitles = document.querySelectorAll(".mobile-dropdown-title")

  if (!mobileMenuBtn || !mobileMenu) return

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    if (mobileMenu.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    }
  })

  // Mobile dropdowns
  mobileDropdownTitles.forEach((title) => {
    title.addEventListener("click", function () {
      const content = this.nextElementSibling
      content.classList.toggle("active")

      const icon = this.querySelector("i")
      if (content.classList.contains("active")) {
        icon.classList.remove("fa-chevron-down")
        icon.classList.add("fa-chevron-up")
      } else {
        icon.classList.remove("fa-chevron-up")
        icon.classList.add("fa-chevron-down")
      }
    })
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
    })
  })
}

// Tabs
function initTabs() {
  const tabs = document.querySelectorAll(".tab")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      const tabPane = document.getElementById(tabId)

      // Remove active class from all tabs and panes
      document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      document.querySelectorAll(".tab-pane").forEach((p) => p.classList.remove("active"))

      // Add active class to current tab and pane
      this.classList.add("active")
      tabPane.classList.add("active")
    })
  })
}

// Account type selector
function initAccountTypeSelector() {
  const accountTypes = document.querySelectorAll(".account-type")

  accountTypes.forEach((type) => {
    type.addEventListener("click", function () {
      // Remove active class from all types
      document.querySelectorAll(".account-type").forEach((t) => t.classList.remove("active"))

      // Add active class to current type
      this.classList.add("active")
    })
  })
}

// Contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")
  const sendAnotherBtn = document.getElementById("sendAnotherBtn")

  if (!contactForm || !formSuccess || !sendAnotherBtn) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Simulate form submission
    contactForm.classList.add("submitting")

    setTimeout(() => {
      contactForm.classList.remove("submitting")
      formSuccess.classList.add("active")
    }, 1500)
  })

  sendAnotherBtn.addEventListener("click", () => {
    formSuccess.classList.remove("active")
    contactForm.reset()
  })
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (!backToTopBtn) return

  function toggleBackToTopBtn() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  }

  window.addEventListener("scroll", toggleBackToTopBtn)
  toggleBackToTopBtn() // Initial check

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Admin panels
function initAdminPanels() {
  // Admin panel
  const adminBtn = document.getElementById("adminBtn")
  const mobileAdminBtn = document.getElementById("mobileAdminBtn")
  const adminPanel = document.getElementById("adminPanel")
  const adminLogoutBtn = document.getElementById("adminLogoutBtn")
  const adminMenuToggle = document.getElementById("adminMenuToggle")
  const adminSidebar = document.querySelector("#adminPanel .admin-sidebar")

  if (adminBtn && adminPanel) {
    adminBtn.addEventListener("click", (e) => {
      e.preventDefault()
      adminPanel.classList.add("active")
    })
  }

  if (mobileAdminBtn && adminPanel) {
    mobileAdminBtn.addEventListener("click", (e) => {
      e.preventDefault()
      adminPanel.classList.add("active")
    })
  }

  if (adminLogoutBtn && adminPanel) {
    adminLogoutBtn.addEventListener("click", () => {
      adminPanel.classList.remove("active")
    })
  }

  if (adminMenuToggle && adminSidebar) {
    adminMenuToggle.addEventListener("click", () => {
      adminSidebar.classList.toggle("collapsed")
    })
  }

  // Master Admin panel
  const masterAdminBtn = document.getElementById("masterAdminBtn")
  const mobileMasterAdminBtn = document.getElementById("mobileMasterAdminBtn")
  const masterAdminPanel = document.getElementById("masterAdminPanel")
  const masterAdminLogoutBtn = document.getElementById("masterAdminLogoutBtn")
  const masterAdminMenuToggle = document.getElementById("masterAdminMenuToggle")
  const masterAdminSidebar = document.querySelector("#masterAdminPanel .admin-sidebar")

  if (masterAdminBtn && masterAdminPanel) {
    masterAdminBtn.addEventListener("click", (e) => {
      e.preventDefault()
      masterAdminPanel.classList.add("active")
    })
  }

  if (mobileMasterAdminBtn && masterAdminPanel) {
    mobileMasterAdminBtn.addEventListener("click", (e) => {
      e.preventDefault()
      masterAdminPanel.classList.add("active")
    })
  }

  if (masterAdminLogoutBtn && masterAdminPanel) {
    masterAdminLogoutBtn.addEventListener("click", () => {
      masterAdminPanel.classList.remove("active")
    })
  }

  if (masterAdminMenuToggle && masterAdminSidebar) {
    masterAdminMenuToggle.addEventListener("click", () => {
      masterAdminSidebar.classList.toggle("collapsed")
    })
  }
}

// Login modal
function initLoginModal() {
  const loginBtn = document.getElementById("loginBtn")
  const mobileLoginBtn = document.getElementById("mobileLoginBtn")
  const loginModal = document.getElementById("loginModal")
  const loginModalClose = document.getElementById("loginModalClose")

  if (!loginBtn || !loginModal || !loginModalClose) return

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    loginModal.classList.add("active")
  })

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      loginModal.classList.add("active")
    })
  }

  loginModalClose.addEventListener("click", () => {
    loginModal.classList.remove("active")
  })

  // Close modal when clicking outside
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) {
      loginModal.classList.remove("active")
    }
  })

  // Prevent form submission
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Login functionality would be implemented here.")
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Registration functionality would be implemented here.")
    })
  }
}

// Charts
function initCharts() {
  // Customer Satisfaction Chart
  const satisfactionCtx = document.getElementById("satisfactionChart")
  if (satisfactionCtx) {
    new Chart(satisfactionCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Satisfaction Rate",
            data: [92, 93, 95, 94, 96, 93, 94],
            borderColor: "#9333ea",
            backgroundColor: "rgba(147, 51, 234, 0.1)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 85,
            max: 100,
            grid: {
              color: "rgba(147, 51, 234, 0.1)",
            },
            ticks: {
              color: "#6b7280",
            },
          },
          x: {
            grid: {
              color: "rgba(147, 51, 234, 0.1)",
            },
            ticks: {
              color: "#6b7280",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  }

  // System Performance Chart
  const performanceCtx = document.getElementById("performanceChart")
  if (performanceCtx) {
    new Chart(performanceCtx, {
      type: "line",
      data: {
        labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
        datasets: [
          {
            label: "CPU Usage",
            data: [20, 15, 35, 60, 45, 30, 25],
            borderColor: "#9333ea",
            backgroundColor: "rgba(147, 51, 234, 0.1)",
            tension: 0.3,
            fill: false,
          },
          {
            label: "Memory Usage",
            data: [40, 35, 45, 70, 65, 55, 45],
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.1)",
            tension: 0.3,
            fill: false,
          },
          {
            label: "Disk I/O",
            data: [10, 5, 25, 30, 40, 20, 15],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(147, 51, 234, 0.1)",
            },
            ticks: {
              color: "#6b7280",
            },
          },
          x: {
            grid: {
              color: "rgba(147, 51, 234, 0.1)",
            },
            ticks: {
              color: "#6b7280",
            },
          },
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#6b7280",
            },
          },
        },
      },
    })
  }
}
