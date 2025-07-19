// homeScript.js
let currentSlideIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("bannerTrack");
  const slides = track.children;
  const totalSlides = slides.length;

  function updateSlide() {
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  }

  window.nextSlide = function () {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateSlide();
  };

  window.prevSlide = function () {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  };

  // Auto slide
  setInterval(window.nextSlide, 5000);
});

window.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  let currentSlide = 0;
  const track = document.getElementById("bannerTrack");
  const totalSlides = document.querySelectorAll(".banner-slide").length;

  function updateSlide() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlide();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  // Tự động chạy sau mỗi 5 giây
  setInterval(nextSlide, 6000);
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
<a href="detail.html?id=${product.id}">Xem chi tiết</a>
      <a href="#">Đặt mua</a>
    </div>
  </div>
`;
      listContainer.appendChild(div);
    });
  } catch (err) {
    console.error("Lỗi tải dữ liệu sản phẩm:", err);
  }
}

// Gọi hàm khi trang đã tải xong
document.addEventListener("DOMContentLoaded", fetchProducts);
