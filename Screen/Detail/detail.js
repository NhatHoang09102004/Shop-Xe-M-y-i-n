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

    document.getElementById("spinner").classList.add("d-none");
    const detail = document.getElementById("productDetail");
    detail.classList.remove("d-none");

    detail.innerHTML = `
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
          <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-md-6 text-center">
          <img src="${product.img}" alt="${product.name}" id="mainImage" class="product-image mb-3"/>
          <div class="gallery">
            <img src="${product.img}" class="active" onclick="changeImage(this, '${product.img}')"/>
            <img src="${product.images}" onclick="changeImage(this, '${product.images}')"/>
            <img src="${product.hoverImg}" onclick="changeImage(this, '${product.hoverImg}')"/>
          </div>
        </div>
        <div class="col-md-6">
          <h1 class="text-primary fw-bold mb-3">${product.name}</h1>
          <p class="h5 text-danger fw-bold mb-3">Giá: ${formattedPrice}</p>
          <p class="text-muted">${product.description}</p>

          <table class="table table-bordered mt-3">
            <tbody>
              <tr><th>Công suất động cơ</th><td>${product.capacity}W</td></tr>
              <tr><th>Dung lượng pin</th><td>${product.battery} Ah</td></tr>
              <tr><th>Quãng đường</th><td>${product.distance} km</td></tr>
              <tr><th>Tốc độ tối đa</th><td>${product.speed} km/h</td></tr>
              <tr><th>Thời gian sạc</th><td>${product.Charging} giờ</td></tr>
              <tr><th>Trọng lượng</th><td>${product.Weight} kg</td></tr>
              <tr><th>Bảo hành</th><td>${product.guarantee} tháng</td></tr>
            </tbody>
          </table>

          <div class="d-flex flex-wrap gap-2 mt-3">
            <a href="https://m.me/tenfacebookban" target="_blank" class="btn btn-primary">Mua qua Facebook</a>
            <a href="https://zalo.me/0123456789" target="_blank" class="btn btn-success">Liên hệ Zalo</a>
            <a href="tel:0123456789" class="btn btn-warning">Gọi điện</a>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <h4  class="fw-bold mb-3">Xe tương tự</h4>
        <div class="row" id="relatedProducts"></div>
      </div>
    `;

    loadRelated(product.id);
  } catch (error) {
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("productDetail").classList.remove("d-none");
    document.getElementById(
      "productDetail"
    ).innerHTML = `<p class="text-danger">Không tìm thấy thông tin xe.</p>`;
  }
}

// Gallery đổi ảnh
function changeImage(el, src) {
  document.getElementById("mainImage").src = src;
  document
    .querySelectorAll(".gallery img")
    .forEach((img) => img.classList.remove("active"));
  el.classList.add("active");
}

// Gợi ý xe khác
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
          <p class="text-danger fw-bold mb-0">${Number(p.price).toLocaleString(
            "vi-VN"
          )} VNĐ</p>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

loadProduct();
