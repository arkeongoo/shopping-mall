import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = [];

      product.images.map((imageName) => {
        images.push({
          original: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
        });
      });
      setImages(images);
    }
  }, [product]);
  return <ImageGallery items={images} />;
};

export default ProductImage;
