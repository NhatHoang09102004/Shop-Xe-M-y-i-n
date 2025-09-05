document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("bannerTrack");
  const slides = Array.from(track.children);
  const totalSlides = slides.length;

  // Clone slide đầu và cuối để chạy vô hạn
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = track.children;
  let index = 1;
  const slideWidth = 100;
  let interval;

  // Vị trí ban đầu
  track.style.transform = `translateX(-${index * slideWidth}%)`;

  function updateSlide() {
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${index * slideWidth}%)`;
  }

  function jumpToSlide(i) {
    track.style.transition = "none";
    track.style.transform = `translateX(-${i * slideWidth}%)`;
    index = i;
  }

  function nextSlide() {
    if (index >= allSlides.length - 1) return;
    index++;
    updateSlide();

    setTimeout(() => {
      if (index === allSlides.length - 1) {
        jumpToSlide(1);
      }
    }, 650);
  }

  function prevSlide() {
    if (index <= 0) return;
    index--;
    updateSlide();

    setTimeout(() => {
      if (index === 0) {
        jumpToSlide(allSlides.length - 2);
      }
    }, 650);
  }

  // Auto chạy
  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }
  function stopAuto() {
    clearInterval(interval);
  }

  // Hover dừng, rời chuột chạy lại
  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  // Xuất hàm cho nút ❮ ❯
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;

  // Bắt đầu auto
  startAuto();
});

async function fetchProducts() {
  try {
    const res = await fetch("https://6877c8dadba809d901f0e77b.mockapi.io/item");
    const data = await res.json();
    const listContainer = document.getElementById("productList");

    listContainer.innerHTML = "";

    data.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <div class="img-wrapper">
          <img 
            src="${product.img}" 
            alt="${product.name}" 
            data-hover="${product.hoverImg}" 
            onmouseover="this.src=this.dataset.hover" 
            onmouseout="this.src='${product.img}'"
          />
        </div>
        <div class="product-content">
          <h3>${product.name}</h3>
          <p class="price">${product.price}</p>
          <p class="spec">${product.description}</p>
          <div class="btn-group">
            <a href="../Detail/detail.html?id=${product.id}">Xem chi tiết</a>
            <a href="https://www.facebook.com/nguyen.inh.hoa.748090#" target="_blank">Đặt mua</a>

          </div>
        </div>
      `;
      listContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Lỗi tải dữ liệu sản phẩm:", err);
  }
}

// Gọi khi DOM ready
document.addEventListener("DOMContentLoaded", fetchProducts);

// Đóng menu khi click link
document.querySelectorAll(".top-links-a a, .nav-combined a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    document.querySelector(".nav-combined").style.display = "none";
  });
});
