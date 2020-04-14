export const WATCH_GENRES = ["Romance", "Drama", "Comedy", "Horror"];
export const LISTEN_GENRES = ["Pop", "R&B", "Country", "Workout"];
export const OPTIONS = ["WATCH", "LISTEN"];
export const CURRDATESTR = [
  `${new Date().getMonth() + 1}`,
  `${new Date().getDate()}`,
  `${new Date().getFullYear()}`,
];

console.log(CURRDATESTR.join("/"));
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "August",
  "November",
  "December",
];
export const TIME = () => {
  var date = new Date(CURRDATESTR.join("/"));
  console.log(date);
  var day = date.toLocaleDateString("au-AU", { weekday: "long" });
  console.log(day);
  return {
    day: day,
    date: CURRDATESTR[1],
    month: MONTHS[CURRDATESTR[0] - 1],
    year: CURRDATESTR[2],
  };
};
export const SEARCHTEXT = {
  WATCH: "Search for Movie or TV Show by name...",
  LISTEN: "Search for Podcast or Music by name...",
};
