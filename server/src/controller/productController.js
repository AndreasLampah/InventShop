const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.testBro = (req, res) => {
  return res.json({
    message: "halooooo",
  });
};

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
