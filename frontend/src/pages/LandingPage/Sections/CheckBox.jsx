import React from "react";
import { Checkbox, Collapse } from "antd";

const CheckBox = ({ continents, checkedContinents, onFilters }) => {
  const handleToggle = (continentId) => {
    // check if the continent is already checked
    const currentIndex = checkedContinents.indexOf(continentId);
    const newCheckedContinents = [...checkedContinents];

    // if not checked, add it to the array
    if (currentIndex === -1) {
      newCheckedContinents.push(continentId);
    } else {
      newCheckedContinents.splice(currentIndex, 1);
    }
    onFilters(newCheckedContinents);
  };

  //   const checkboxItems = (
  //     <div className="p-2 mb-3 bg-gray-100 rounded-md">
  //       {continents.map((continent) => (
  //         <div key={continent._id}>
  //           <input
  //             id={`${continent._id}`}
  //             type="checkbox"
  //             onChange={() => handleToggle(continent._id)}
  //           />{" "}
  //           <label htmlFor={`${continent._id}`}>{continent.name}</label>
  //         </div>
  //       ))}
  //     </div>
  //   );

  const items = [
    {
      key: "1",
      label: "Continents",
      children: (
        <div>
          {continents.map((continent) => (
            <div key={continent._id} className="mb-[8px]">
              <Checkbox
                onChange={() => handleToggle(continent._id)}
                checked={checkedContinents.includes(continent._id)}
              >
                {continent.name}
              </Checkbox>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return <Collapse items={items} defaultActiveKey={["0"]} />;
};

export default CheckBox;
