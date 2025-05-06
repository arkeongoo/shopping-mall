import React from "react";

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

  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {continents.map((continent) => (
        <div key={continent._id}>
          <input
            id={`${continent._id}`}
            type="checkbox"
            onChange={() => handleToggle(continent._id)}
          />{" "}
          <label htmlFor={`${continent._id}`}>{continent.name}</label>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
