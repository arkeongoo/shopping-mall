import React from "react";

const RadioBox = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {prices?.map((price) => (
        <div key={price._id}>
          <input
            type="radio"
            name="price"
            id={price._id}
            value={price._id}
            checked={checkedPrice === price.array}
            onChange={(e) => onFilters(e.target.value)}
          />{" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioBox;
