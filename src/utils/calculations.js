export const calculateSubtotal = (items) => {
  if (!items || items?.length === 0) return 0;

  const subtotal = items?.reduce((acc, item) => {
    if (item?.quantity < 1 || item?.unitPrice < 0) {
      return acc;
    }

    return acc + item.quantity * item.unitPrice;
  }, 0);

  return subtotal;
};
export const calculateTax = (subtotal, taxRate) => {
  if (subtotal <= 0 || taxRate <= 0) return 0;
  return subtotal * taxRate;
};
export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};
