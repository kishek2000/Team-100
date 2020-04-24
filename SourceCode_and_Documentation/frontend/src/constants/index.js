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

export const MOVIE_GENRES = {
  items: [
    {
      value: 28,
      label: "Action",
    },
    {
      value: 12,
      label: "Adventure",
    },
    {
      value: 16,
      label: "Animation",
    },
    {
      value: 35,
      label: "Comedy",
    },
    {
      value: 80,
      label: "Crime",
    },
    {
      value: 99,
      label: "Documentary",
    },
    {
      value: 18,
      label: "Drama",
    },
    {
      value: 10751,
      label: "Family",
    },
    {
      value: 14,
      label: "Fantasy",
    },
    {
      value: 36,
      label: "History",
    },
    {
      value: 27,
      label: "Horror",
    },
    {
      value: 10402,
      label: "Music",
    },
    {
      value: 9648,
      label: "Mystery",
    },
    {
      value: 10749,
      label: "Romance",
    },
    {
      value: 878,
      label: "Science Fiction",
    },
    {
      value: 10770,
      label: "TV Movie",
    },
    {
      value: 53,
      label: "Thriller",
    },
    {
      value: 10752,
      label: "War",
    },
    {
      value: 37,
      label: "Western",
    },
  ],
};

export const TV_GENRES = {
  items: [
    {
      value: 10759,
      label: "Action & Adventure",
    },
    {
      value: 16,
      label: "Animation",
    },
    {
      value: 35,
      label: "Comedy",
    },
    {
      value: 80,
      label: "Crime",
    },
    {
      value: 99,
      label: "Documentary",
    },
    {
      value: 18,
      label: "Drama",
    },
    {
      value: 10751,
      label: "Family",
    },
    {
      value: 10762,
      label: "Kids",
    },
    {
      value: 9648,
      label: "Mystery",
    },
    {
      value: 10763,
      label: "News",
    },
    {
      value: 10764,
      label: "Reality",
    },
    {
      value: 10765,
      label: "Sci-Fi & Fantasy",
    },
    {
      value: 10766,
      label: "Soap",
    },
    {
      value: 10767,
      label: "Talk",
    },
    {
      value: 10768,
      label: "War & Politics",
    },
    {
      value: 37,
      label: "Western",
    },
  ],
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

export const LISTEN_LOGOS = {
  Spotify: "https://img.icons8.com/color/96/000000/spotify--v1.png",
  Itunes: "https://img.icons8.com/metro/104/000000/mac-os.png",
  "Apple Music": "https://img.icons8.com/color/96/000000/itunes.png",
  Youtube:
    "https://346034.smushcdn.com/236617/wp-content/uploads/2018/09/youtube-logo-01-862x391.png?lossy=0&strip=1&webp=1",
  "Youtube Music":
    "https://1401700980.rsc.cdn77.org/data/images/full/94629/youtube-music-logo.jpg",
  Google:
    "https://www.soundguys.com/wp-content/uploads/2019/08/play-music-icon.jpg",
  "Google Store":
    "https://i.pinimg.com/originals/1a/49/22/1a49226d155846acb790eeb919f63c8e.jpg",
  Pandora:
    "https://www.underconsideration.com/brandnew/archives/pandora_2016_logo_P.png",
  Deezer:
    "https://cdn.vox-cdn.com/thumbor/-Wh1t55YLvEobbumloEGu-BzsSE=/0x0:1000x667/1200x800/filters:focal(0x0:1000x667)/cdn.vox-cdn.com/assets/1081565/deezerlogo.jpg",
  Tidal:
    "https://music.mxdwn.com/wp-content/uploads/2015/04/Tidal-streaming.jpg",
  "Amazon Store":
    "https://cdn3.iconfinder.com/data/icons/social-media-logos-flat-colorful/2048/5326_-_Amazon-512.png",
  "Amazon Music":
    "https://djmag.com/sites/default/files/article/image/Amazon-Music-Logo-1476279710-640x400.png",
  Soundcloud:
    "https://i.pcmag.com/imagery/reviews/00RphstxTwTQ48coaU83lPT-7.fit_scale.size_1028x578.v_1569482503.jpg",
  Napster:
    "https://images.squarespace-cdn.com/content/v1/55915377e4b05e44b9c13bca/1535515150211-O2O5767XRDJRF1WG2A1Q/ke17ZwdGBToddI8pDm48kBWyD8QCmC-NZpLkl_N5vSFZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI9aFTLD3JG2DfIRHeuIRpa4xu4_TgvxFcnMk4xTGxEDc/Napster-Logo-.png",
  Yandex:
    "https://avatars.mds.yandex.net/get-bunker/128809/2242b0f7baf7f84a7d0d6cd6020acd311fba9df8/orig",
  Spinrilla:
    "https://www.logolynx.com/images/logolynx/24/24e16814eb4ac17a2261e111f274047c.jpeg",
};
