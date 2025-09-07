const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {
  try {
    const res = await fetch(
      `https://6877c8dadba809d901f0e77b.mockapi.io/item/${id}`
    );
    const product = await res.json();

    const priceNumber = Number(product.price);
    const formattedPrice = isNaN(priceNumber)
      ? product.price
      : priceNumber.toLocaleString("vi-VN") + " VNĐ";

    // Fade-out skeleton
    const skeleton = document.getElementById("skeletonLoader");
    skeleton.classList.add("fade-out");

    setTimeout(() => {
      skeleton.classList.add("d-none");

      const detail = document.getElementById("productDetail");
      detail.classList.remove("d-none");
      detail.classList.add("fade-in");

      // Ảnh chính + phụ cho Lightbox
      let galleryImages = `
        <a id="mainImageLink" href="${product.img}" data-lightbox="product-gallery">
          <img id="mainImage" src="${product.img}" 
               class="img-fluid rounded shadow-sm mb-3 product-image" 
               alt="${product.name}">
        </a>
      `;

      if (product.images) {
        galleryImages += `<a href="${product.images}" data-lightbox="product-gallery" class="d-none"></a>`;
      }
      if (product.hoverImg) {
        galleryImages += `<a href="${product.hoverImg}" data-lightbox="product-gallery" class="d-none"></a>`;
      }

      // Thumbnail hiển thị
      let thumbnails = `
  <img src="${product.img}" class="img-thumbnail thumb-img active" 
       onclick="changeImage(this, '${product.img}')">
`;
      if (product.images) {
        thumbnails += `
    <img src="${product.images}" class="img-thumbnail thumb-img" 
         onclick="changeImage(this, '${product.images}')">
  `;
      }
      if (product.hoverImg) {
        thumbnails += `
    <img src="${product.hoverImg}" class="img-thumbnail thumb-img" 
         onclick="changeImage(this, '${product.hoverImg}')">
  `;
      }

      detail.innerHTML = `
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item"><a href="../../Screen/Home/Home.html">Trang chủ</a></li>
            <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
          </ol>
        </nav>

        <div class="row">
          <!-- Hình ảnh -->
          <div class="col-md-6 text-center">
            ${galleryImages}

            <!-- Thumbnail -->
            <div class="d-flex gap-2 justify-content-center">
              ${thumbnails}
            </div>
          </div>

          <!-- Thông tin -->
          <div class="col-md-6">
            <h1 class="text-primary fw-bold mb-3">${product.name}</h1>
            <p class="h5 text-danger fw-bold mb-3">Giá: ${formattedPrice}</p>
            <p class="text-muted">${product.description}</p>

            <table class="table table-bordered mt-3">
              <tbody>
                <tr><th>Công suất động cơ</th><td>${product.capacity} W</td></tr>
                <tr><th>Dung lượng pin</th><td>${product.battery} Ah</td></tr>
                <tr><th>Quãng đường</th><td>${product.distance}</td></tr>
                <tr><th>Tốc độ tối đa</th><td>${product.speed} km/h</td></tr>
                <tr><th>Thời gian sạc</th><td>${product.Charging} giờ</td></tr>
                <tr><th>Trọng lượng</th><td>${product.Weight} kg</td></tr>
                <tr><th>Bảo hành</th><td>${product.guarantee} tháng</td></tr>
              </tbody>
            </table>

            <div class="d-flex flex-wrap gap-2 mt-3">
              <a href="https://www.facebook.com/nguyen.inh.hoa.748090" target="_blank" class="btn btn-primary">Mua qua Facebook</a>
              <a href="https://zalo.me/0906657297" target="_blank" class="btn btn-success">Liên hệ Zalo</a>
              <a href="tel:0906657297" class="btn btn-warning">Gọi điện</a>
            </div>
          </div>
        </div>

        <!-- Xe tương tự -->
        <div class="mt-5">
          <h4 class="fw-bold mb-3">Xe tương tự</h4>
          <div class="row" id="relatedProducts"></div>
        </div>
      `;

      loadRelated(product.id);
    }, 500);
  } catch (error) {
    document.getElementById("skeletonLoader").classList.add("d-none");
    const detail = document.getElementById("productDetail");
    detail.classList.remove("d-none");
    detail.innerHTML = `<p class="text-danger">Không tìm thấy thông tin xe.</p>`;
  }
}

// Hàm đổi ảnh chính
function changeImage(el, src) {
  document.getElementById("mainImage").src = src;
  document.getElementById("mainImageLink").href = src;

  document
    .querySelectorAll(".thumb-img")
    .forEach((img) => img.classList.remove("active"));
  el.classList.add("active");
}

// Load xe liên quan
async function loadRelated(currentId) {
  const res = await fetch("https://6877c8dadba809d901f0e77b.mockapi.io/item");
  const products = await res.json();
  const list = products.filter((p) => p.id !== currentId).slice(0, 3);

  document.getElementById("relatedProducts").innerHTML = list
    .map(
      (p) => `
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm related-item" onclick="window.location='detail.html?id=${
          p.id
        }'" style="cursor:pointer;">
          <img src="${p.img}" class="card-img-top" alt="${p.name}"/>
          <div class="card-body text-center">
            <h6 class="card-title fw-bold">${p.name}</h6>
            <p class="text-danger fw-bold mb-0">${Number(
              p.price
            ).toLocaleString("vi-VN")} VNĐ</p>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

loadProduct();
