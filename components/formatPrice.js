export function formatToRupiah(price) {
  const numericPrice = parseFloat(price)

  if (isNaN(numericPrice)) {
    return 'Invalid Price'
  }

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2
  }).format(numericPrice)

  return formattedPrice
}
