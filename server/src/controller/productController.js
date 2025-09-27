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
    console.error(error);

    res.status(500).json({
      message: "Gagal ambil data produk",
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const productId = Number(req.params.id);
  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({
      message: "ID produk tidak valid",
    });
  }

  try {
    const productById = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productById) {
      return res.status(404).json({
        message: `Produk dengan id ${productId} tidak ditemukan`,
      });
    }

    res.status(200).json({
      data: productById,
      message: "Berhasil dapat produk berdasarkan id",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
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
    console.error(error);

    res.status(500).json({
      message: "Gagal menambahkan produk",
      error: error.message,
    });
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
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.status(500).json({
      message: "Gagal menghapus produk",
      error: error.message,
    });
  }
};

exports.editProductById = async (req, res) => {
  const productId = Number(req.params.id);

  const editProductData = req.body;

  if (isNaN(productId) || productId <= 0) {
    return res.status(400).json({
      message: "ID harus berupa angka dan lebih dari 0",
    });
  }

  const dataToUpdate = {};

  if (editProductData.image !== undefined) {
    const image = editProductData.image.trim();
    if (image.length === 0) {
      return res.status(400).json({
        message: "Gambar tidak boleh kosong",
      });
    }
    dataToUpdate.image = image;
  }

  if (editProductData.description !== undefined) {
    const description = editProductData.description.trim();
    if (description.length === 0) {
      return res.status(400).json({
        message: "Deskripsi tidak boleh kosong",
      });
    }
    dataToUpdate.description = description;
  }

  if (editProductData.name !== undefined) {
    const name = editProductData.name.trim();
    if (name.length === 0) {
      return res.status(400).json({
        message: "Nama tidak boleh kosong",
      });
    }
    dataToUpdate.name = name;
  }

  if (editProductData.price !== undefined) {
    const price = parseFloat(editProductData.price);
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        message: "Harga harus berupa angka dan lebih dari 0",
      });
    }
    dataToUpdate.price = price;
  }

  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ message: "Tidak ada field untuk diupdate" });
  }

  try {
    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: dataToUpdate,
    });

    res.status(200).json({
      data: product,
      message: "Produk berhasil diupdate",
    });
  } catch (error) {
    console.error(error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Produk tidak ditemukan",
      });
    }

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
