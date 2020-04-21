export const WATCH_GENRES = ["Romance", "Drama", "Comedy", "Horror"];
export const LISTEN_GENRES = ["Pop", "R&B", "Country", "Workout"];
export const OPTIONS = ["WATCH", "LISTEN"];
export const CURRDATESTR = [
  `${new Date().getMonth() + 1}`,
  `${new Date().getDate()}`,
  `${new Date().getFullYear()}`,
];

export const AUSTREAMS = [
  { label: "Netflix", value: "nfx" },
  { label: "Foxtel Now", value: "ftp" },
  { label: "Stan", value: "stn" },
  { label: "Amazon Prime Video", value: "prv" },
  { label: "Disney Plus", value: "dnp" },
  { label: "Google Play Movies", value: "ply" },
  { label: "Apple iTunes", value: "itu" },
  { label: "Apple TV Plus", value: "atp" },
  { label: "9Now", value: "nnw" },
  { label: "YouTube Premium", value: "ytr" },
  { label: "DocPlay", value: "doc" },
  { label: "hayu", value: "hay" },
  { label: "Microsoft Store", value: "msf" },
  { label: "7plus", value: "spl" },
  { label: "ABC iview", value: "ivw" },
  { label: "SBS On Demand", value: "sbs" },
  { label: "YouTube", value: "yot" },
  { label: "tenplay", value: "tpl" },
  { label: "Quickflix", value: "qfx" },
  { label: "Quickflix Store", value: "qfs" },
  { label: "Mubi", value: "mbi" },
  { label: "Netflix Kids", value: "nfk" },
  { label: "Kanopy", value: "knp" },
  { label: "Tubi TV", value: "tbv" },
  { label: "GuideDoc", value: "gdc" },
  { label: "Crunchyroll", value: "cru" },
  { label: "Acorn TV", value: "act" },
  { label: "Pantaflix", value: "pfx" },
];

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
  var day = date.toLocaleDateString("au-AU", { weekday: "long" });
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

export const LISTENCATEGORIES = {
  items: [
    {
      value: "toplists",
      label: "Top Lists",
    },
    {
      value: "at_home",
      label: "At Home",
    },
    {
      value: "mood",
      label: "Mood",
    },
    {
      value: "pop",
      label: "Pop",
    },
    {
      value: "chill",
      label: "Chill",
    },
    {
      value: "hiphop",
      label: "Hip-Hop",
    },
    {
      value: "workout",
      label: "Workout",
    },
    {
      value: "wellness",
      label: "Wellness",
    },
    {
      value: "indie_alt",
      label: "Indie",
    },
    {
      value: "decades",
      label: "Decades",
    },
    {
      value: "family",
      label: "Kids & Family",
    },
    {
      value: "rock",
      label: "Rock",
    },
    {
      value: "edm_dance",
      label: "Electronic/Dance",
    },
    {
      value: "sleep",
      label: "Sleep",
    },
    {
      value: "dinner",
      label: "Cooking & Dining",
    },
    {
      value: "rnb",
      label: "R&B",
    },
    {
      value: "focus",
      label: "Focus",
    },
    {
      value: "country",
      label: "Country",
    },
    {
      value: "gaming",
      label: "Gaming",
    },
    {
      value: "romance",
      label: "Romance",
    },
    {
      value: "soul",
      label: "Soul",
    },
    {
      value: "roots",
      label: "Folk & Acoustic",
    },
    {
      value: "party",
      label: "Party",
    },
    {
      value: "metal",
      label: "Metal",
    },
    {
      value: "popculture",
      label: "Trending",
    },
    {
      value: "kpop",
      label: "K-Pop",
    },
    {
      value: "punk",
      label: "Punk",
    },
    {
      value: "thirdparty",
      label: "Tastemakers",
    },
    {
      value: "arab",
      label: "Arab",
    },
    {
      value: "jazz",
      label: "Jazz",
    },
    {
      value: "classical",
      label: "Classical",
    },
    {
      value: "inspirational",
      label: "Christian",
    },
    {
      value: "desi",
      label: "Desi",
    },
    {
      value: "travel",
      label: "Travel",
    },
    {
      value: "reggae",
      label: "Reggae",
    },
    {
      value: "blues",
      label: "Blues",
    },
    {
      value: "latin",
      label: "Latin",
    },
    {
      value: "funk",
      label: "Funk",
    },
    {
      value: "pride",
      label: "Pride",
    },
  ],
};
