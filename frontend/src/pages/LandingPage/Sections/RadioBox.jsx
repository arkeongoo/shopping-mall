import React from "react";
import { Collapse, Radio } from "antd";

const RadioBox = ({ prices, onFilters }) => {
  //   const radioItems = (
  //     <div className="p-2 mb-3 bg-gray-100 rounded-md">
  //       {prices?.map((price) => (
  //         <div key={price._id}>
  //           <input
  //             type="radio"
  //             name="price"
  //             id={price._id}
  //             value={price._id}
  //             checked={checkedPrice === price.array}
  //             onChange={(e) => onFilters(e.target.value)}
  //           />{" "}
  //           <label htmlFor={price._id}>{price.name}</label>
  //         </div>
  //       ))}
  //     </div>
  //   );
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  };

  const items = [
    {
      key: "1",
      label: "Price Range",
      children: (
        <Radio.Group
          style={style}
          defaultValue={0}
          onChange={(e) => onFilters(e.target.value)}
          options={prices.map((price) => ({
            value: price._id,
            label: price.name,
          }))}
        />
      ),
    },
  ];

  return <Collapse items={items} defaultActiveKey={["0"]} />;
};

export default RadioBox;
