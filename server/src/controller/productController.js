const { PrismaClient } = require("@prisma/client");
const { data } = require("react-router");
const prisma = new PrismaClient();

exports.getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.status(200).json({
      data: products,
      message: "Berhasil ambil data produk",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal ambil data produk",
      error: error.message,
    });
    console.error(error);
  }
};

exports.addProducts = async (req, res) => {
  const newProductData = req.body;

  if (!newProductData.name || !newProductData.price || !newProductData.description || !newProductData.image) {
    return res.status(400).json({
      message: "Semua field (name, price, description, image) wajib di isi",
    });
  }

  const price = Number(newProductData.price);
  if (isNaN(price) || price <= 0) {
    return res.status(400).json({
      message: "Harga harus berupa angka dan lebih dari 0",
    });
  }
  newProductData.price = price;

  try {
    const product = await prisma.product.create({
      data: {
        name: newProductData.name,
        price: newProductData.price,
        description: newProductData.description,
        image: newProductData.image,
      },
    });

    res.status(201).json({
      data: product,
      message: "Produk berhasil ditambahkan",
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal menambahkan produk",
      error: error.message,
    });
    console.error(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);
  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({
      message: "ID produk tidak valid",
    });
  }

  try {
    const deleteMyProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.status(200).json({
      data: deleteMyProduct,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.status(500).json({
      message: "Gagal menghapus produk",
      error: error.message,
    });
    console.error(error);
  }
};
