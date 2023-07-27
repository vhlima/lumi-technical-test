export const useConsumptionFilter = () => {
  const filters = {
    cost: {
      label: "Cost",
    },
    energySpent: {
      label: "Energy Spent",
    },
  };

  return {
    filters,
  };
};
