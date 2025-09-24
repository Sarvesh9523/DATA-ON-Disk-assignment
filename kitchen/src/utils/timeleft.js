// ../utils/timeLeft.js
export function getTimeLeft(deliveryDay) {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const now = new Date();
  const todayIndex = now.getDay();

  const deliveryIndex = days.indexOf(deliveryDay);
  let daysDiff = deliveryIndex - todayIndex;
  if (daysDiff < 0) daysDiff += 7; // Next week

  const deliveryDate = new Date();
  deliveryDate.setDate(now.getDate() + daysDiff);
  deliveryDate.setHours(7, 0, 0, 0); // Delivery starts at 7 AM

  const diff = deliveryDate - now;

  if (diff <= 0) return "Available now";

  const totalSeconds = Math.floor(diff / 1000);
  const daysLeft = Math.floor(totalSeconds / (24 * 3600));
  const hoursLeft = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = totalSeconds % 60;

  let result = "";
  if (daysLeft > 0) result += `${daysLeft}d `;
  result += `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s left`;

  return result;
}
