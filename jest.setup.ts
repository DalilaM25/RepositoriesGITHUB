import "@testing-library/jest-dom/extend-expect";

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(), // добавляем заглушку для метода addListener
      removeListener: jest.fn(), // добавляем заглушку для метода removeListener
    };
  };
