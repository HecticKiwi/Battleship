export default function previewShipPlacement(length, [col, row], orientation, color) {
  for (let i = 0; i < length; i++) {
    if (document.querySelector(`[data-col="${col}"][data-row="${row}"]`)) {
      document.querySelector(`[data-col="${col}"][data-row="${row}"]`).style.backgroundColor = color;
    }

    if (orientation === 'horizontal') {
      col++;
    } else {
      row++;
    }
  }
}
