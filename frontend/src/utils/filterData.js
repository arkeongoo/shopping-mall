const continents = [
  { _id: 1, name: "Africa" },
  { _id: 2, name: "Asia" },
  { _id: 3, name: "Europe" },
  { _id: 4, name: "North America" },
  { _id: 5, name: "Oceania" },
  { _id: 6, name: "South America" },
];
const prices = [
  { _id: 0, name: "All", array: [] },
  { _id: 1, name: "$0 to $100", array: [0, 100] },
  { _id: 2, name: "$100 to $200", array: [100, 200] },
  { _id: 3, name: "$200 to $300", array: [200, 300] },
  { _id: 4, name: "$300 to $400", array: [300, 400] },
  { _id: 5, name: "$400 to $500", array: [400, 500] },
  { _id: 6, name: "More than $500", array: [500, 1000000] },
];

export { continents, prices };
