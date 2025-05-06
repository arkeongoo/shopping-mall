const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Product = require("../models/Product");
const multer = require("multer");
const qs = require("qs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", auth, async (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.statusCode(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

router.get("/", async (req, res, next) => {
  const order = req.query.order ? req.query.order : "desc";
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? parseInt(req.query.limit) : 20;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  //req.query.filter 클라이언트에서 URL 인코딩된 형태로 데이터를 전달
  const filters = qs.parse(req.query).filters || {}; //qs.parse를 사용하여 URL 인코딩된 데이터를 객체로 변환
  //   console.log("Parsed filters:", filters);
  const term = req.query.searchTerm;

  let findArgs = {};
  for (let key in filters) {
    if (filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: filters[key][0], // 최소값 (greater than or equal)
          $lte: filters[key][1], // 최대값 (less than or equal)
        };
      } else {
        findArgs[key] = filters[key];
      }
    }
  }
  if (term) {
    findArgs["$or"] = [
      { title: { $regex: term, $options: "i" } }, // 제목에서 검색 (대소문자 구분 없음)
      { description: { $regex: term, $options: "i" } }, // 설명에서 검색 (대소문자 구분 없음)
    ];
  }

  //   console.log(findArgs);
  try {
    const products = await Product.find(findArgs) //MongoDB 쿼리를 실행
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments();
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.json({ products, hasMore });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id;
  //   console.log(req.query);

  if (type === "array") {
    let ids = req.params.id.split(",");
    productIds = ids.map((item) => item);
  }
  //   console.log(productIds);
  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져옴.
  try {
    const product = await Product.find({ _id: { $in: productIds } }).populate(
      "writer"
    );
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
