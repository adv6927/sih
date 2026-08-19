export type PanelKey =
  | "overview"
  | "emergency"
  | "match"
  | "tracking"
  | "inventory"
  | "donors"
  | "analytics"
  | "security";

export const activeStage = 2;

export const timeline = [
  { label: "Request raised", time: "10:42" },
  { label: "Match confirmed", time: "10:47" },
  { label: "In transit", time: "11:05" },
  { label: "Delivered", time: "ETA 11:19" },
];

export const bloodStock = [
  { group: "O−", units: 4, capacity: 12, level: "critical" },
  { group: "O+", units: 18, capacity: 24, level: "healthy" },
  { group: "A+", units: 13, capacity: 20, level: "healthy" },
  { group: "B+", units: 9, capacity: 16, level: "healthy" },
];

export const alerts = [
  { title: "O− stock below threshold", detail: "Only 4 units remain across nearby partner banks." },
  { title: "A− availability tightening", detail: "Demand is up 22% across the west zone this week." },
];

export const demandTrend = [18, 22, 20, 27, 25, 31, 29, 35, 33, 39, 37, 44];

export const fulfilTrend = [78, 81, 79, 84, 86, 85, 89, 88, 91, 90, 93, 94];

export const activity = [
  { text: "Sanjeevani Central Bank pledged 2 O− units", time: "2 min ago" },
  { text: "Courier RK-07 left the blood bank", time: "7 min ago" },
  { text: "Dr. Aisha Khan verified the emergency request", time: "12 min ago" },
  { text: "Meera Memorial Hospital updated the case details", time: "18 min ago" },
];

export const inventoryRows = [
  { group: "O−", units: 4, capacity: 12 },
  { group: "O+", units: 18, capacity: 24 },
  { group: "A+", units: 13, capacity: 20 },
  { group: "B+", units: 9, capacity: 16 },
];

export const matches = [
  { name: "Sanjeevani Central Bank", meta: "2 O− units · 2.4 km away", best: true, score: 96, eta: "8 min" },
  { name: "Ruby Hall Blood Centre", meta: "3 O− units · 4.8 km away", best: false, score: 88, eta: "15 min" },
  { name: "Pune District Blood Bank", meta: "5 O− units · 7.2 km away", best: false, score: 79, eta: "24 min" },
];

export const donors = [
  { name: "Arjun Mehta", group: "O−", last: "3 months ago", status: "Available", score: 94 },
  { name: "Maya Kulkarni", group: "O−", last: "4 months ago", status: "Available", score: 91 },
  { name: "Rohan Desai", group: "O−", last: "2 weeks ago", status: "On cooldown", score: 86 },
];