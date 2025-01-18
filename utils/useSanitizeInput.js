export default function useSanitizeInput(value) {
  const temp = document.createElement("div");
  temp.textContent = value;
  const sanitizedValue = temp.innerHTML;
  temp.remove();
  return sanitizedValue;
}
