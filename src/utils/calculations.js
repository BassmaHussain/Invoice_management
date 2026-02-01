export const calculateSubtotal = (items) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );

  return subtotal;
};
export const calculateTax = (subtotal, taxRate) => {
  return subtotal * taxRate;
};
export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};
