/**
 * =========================================================================
 * 💖 LOVERS SURPRISE WEBSITE - CENTRAL CONFIGURATION 💖
 * =========================================================================
 * Neenga indha file-la unga partner details, names, dates, photos,
 * flowers, pickup lines, proposal, and messages-ah romba easy-ah edit pannikalam!
 */

const LOVE_CONFIG = {
  // Couple Details
  partnerName: "Adithya",        // Unga lover name / pet name
  partnerNickname: "Aadhi",           // Nickname
  senderName: "Yours Forever",           // Unga name
  specialDate: "2803",                   // Secret Lock Code (e.g., 1402 for 14 Feb or any 4 digits)
  specialDateFormatted: "14 February",   // Date text for hint/display
  secretHint: "Hint: Namba life-oda romba special-ana date 🔒✨",

  // 1. Aesthetic Photo Frame Reveal on Unlock
  unlockFrame: {
    photo: "assets/images/1.jpg",
    title: "The Keeper of My Heart 🫀✨",
    subtitle: "Ulagathula evlo azhagu irundhalum, un smile-kku munnadi ellam dust thaan di!",
    dateTag: "Forever & Always",
    buttonText: "Step Into Our Magical Universe 💖"
  },

  // Audio Tracks
  music: {
    bgmTitle: "Nee Kobapattal 🎵",
    bgmSrc: "assets/audio/nee.mp3",
    letterBgmSrc: "assets/audio/letter-bgm.mp3",
    autoPlayPrompt: "Click anywhere to begin our story ✨"
  },

  // 2. The Enchanted Flower Garden (Flower Theme Section)
  flowerGarden: {
    title: "The Eternal Flower Garden 🌸",
    subtitle: "Like flowers in spring, you brought colors to my entire life 💐",
    flowers: [
      {
        id: "rose",
        name: "Red Velvet Rose 🌹",
        meaning: "Eternal Passion & Pure Love",
        message: "Red rose evlo intense-o, athe maadhiri thaan en love for you. Every single day it grows deeper and deeper. 🫀",
        color: "#f43f5e"
      },
      {
        id: "peony",
        name: "Pink Peony 🌸",
        meaning: "Softness, Care & Warm Cuddles",
        message: "Un hugging warmth and gentle care... En whole tension-ah ye marakka vechudum my angel. 🫂🤍",
        color: "#fb7185"
      },
      {
        id: "sunflower",
        name: "Golden Sunflower 🌻",
        meaning: "Radiant Joy & Your Bright Smile",
        message: "Sunflower sun-ah paathu thirumbura maathiri, en eyes and heart eppovum unna thedi thaan thirumbum! ☀️✨",
        color: "#fbbf24"
      },
      {
        id: "lily",
        name: "White Starlight Lily 🪷",
        meaning: "Purest Soul & Inner Peace",
        message: "Unga heart evlo pure theriyuma... Being around you gives me a calm peace that nowhere else exists. 🕊️💫",
        color: "#f1f5f9"
      },
      {
        id: "orchid",
        name: "Royal Purple Orchid 🌺",
        meaning: "Rare, Precious & Once In A Lifetime",
        message: "Million-la oruthar kedaipanga nu solvanga, but enaku kedaicha nee ulagathulaye unique masterpiece! 👑💎",
        color: "#c084fc"
      }
    ],
    bouquetGiftMessage: "You have collected all 5 enchanted flowers! Here is a virtual eternal bouquet for my princess 💐💖"
  },

  // 3. Moving Photos Section (Infinite Moving Filmstrip)
  movingPhotos: [
    { image: "assets/images/1.jpg", caption: "The day our eyes met ✨" },
    { image: "assets/images/1.jpg", caption: "My favourite smile 😚" },
    { image: "assets/images/1.jpg", caption: "Endless 3 AM memories 🌙" },
    { image: "assets/images/1.jpg", caption: "Our cinematic frame 🎞️" },
    { image: "assets/images/1.jpg", caption: "Holding hands forever 🤝" },
    { image: "assets/images/1.jpg", caption: "Pure bliss with you 🧿" },
    { image: "assets/images/1.jpg", caption: "The one my heart chose ❤️" },
    { image: "assets/images/1.jpg", caption: "Two souls, one rhythm 💫" },
    { image: "assets/images/1.jpg", caption: "Growing old together ♾️" },
    { image: "assets/images/1.jpg", caption: "Forever my favorite person 🤍" },
    { image: "assets/images/1.jpg", caption: "Timeless beauty 👑" },
    { image: "assets/images/1.jpg", caption: "Colourful in every memory 🌈" }
  ],

  // 4. Romantic Pickup Lines & 3D Ring Proposal Section
  pickupLines: [
    {
      line: "Are you a magician? 🪄",
      punchline: "Because whenever I look at you, everyone else in the world completely disappears! ✨"
    },
    {
      line: "Doctor kitta poga koodadhu nu nenachen... 🩺",
      punchline: "Aana un smile paatha apram en heartbeat control-la illaiye! 🫀💘"
    },
    {
      line: "Do you have a band-aid? 🩹",
      punchline: "Because I just scraped my knees falling head over heels in love with you! 🙈"
    },
    {
      line: "Google Maps kooda un kitta fail aaidum theriyuma? 🧭",
      punchline: "Because looking into your eyes, I found my only true destination in life! 🌍🤍"
    },
    {
      line: "Is your name Wi-Fi? 📶",
      punchline: "Because I am feeling an unbreakable, powerful connection with you! ⚡💖"
    }
  ],

  proposal: {
    leadText: "Every pickup line was just an excuse to say one real truth...",
    question: "Will you stay in my story forever and hold my hand until my last breath? 💍✨",
    yesText: "YES! A Million Times YES! 💍💖",
    noResponses: [
      "No clicking No! 😜",
      "Try again! 🏃💨",
      "Escape button activated! 🙈",
      "You have to say YES! 😚",
      "Can't escape my love! 💖",
      "Only YES allowed! 🥰"
    ],
    acceptedMessage: "SHE/HE SAID YES! 🎉💍\nForever starts now. You are officially stuck with me for eternity and all lifetimes! 🫀✨"
  },

  // Milestones (Constellation of Us)
  milestones: [
    {
      id: 1,
      starName: "The First Spark ✨",
      date: "The Day We Met",
      title: "When Our Eyes First Met",
      caption: "Aniku therila nee thaan en ulagame aaga poranu... But the moment you smiled, en heart romba fast-ah beat aaga start aachudhu. 💫",
      photo: "assets/images/1.jpg"
    },
    {
      id: 2,
      starName: "Late Night Magic 🌙",
      date: "The First 3 AM Call",
      title: "Hours Felt Like Seconds",
      caption: "Time pona the theriyala. Talking about everything and nothing, laughing at silly jokes... Aniku therinjidhu you are my safest place. 📞🤍",
      photo: "assets/images/1.jpg"
    },
    {
      id: 3,
      starName: "Butterflies In My Soul 🦋",
      date: "Our Unforgettable Date",
      title: "Holding Hands For The First Time",
      caption: "Un kaiya pidicha antha second... Whole world silent aana maathiri irundhudhu. The warmest feeling I've ever experienced. 🫶",
      photo: "assets/images/1.jpg"
    },
    {
      id: 4,
      starName: "The Realization 🫀",
      date: "The Day I Knew",
      title: "You Are The Only One",
      caption: "Ellarume life-la varuvanga povanga, but unkuda irukumbothu matum thaan I felt truly complete. You are my home, my person, my everything. ❤️‍🩹",
      photo: "assets/images/1.jpg"
    },
    {
      id: 5,
      starName: "Today & Eternity ♾️",
      date: "Forever & Always",
      title: "Growing Old With You",
      caption: "No matter how many ups and downs come our way, en kai eppovum un kaiya vidaadhu. You and me against the whole universe! 💍✨",
      photo: "assets/images/1.jpg"
    }
  ],

  // "Why I Love You" Reasons (Origami Jar)
  reasons: [
    "Un siripu paatha enoda worst day kooda instant-ah best day aaidum ☀️",
    "Nee kovapadum bothu un nose-ah surukura antha cute look 🥺",
    "Unkuda pesumbothu matum thaan na full-ah naanaave iruka mudiyudhu 🤍",
    "En mela nee vechurukura unconditional care & concern 🫂",
    "Nee sapda marandhuta na remind panradhum, nee enna thituradhum 😂",
    "Enoda chinna chinna habits kooda notice panni neyabagam vechirukiye athu 🫶",
    "Nee thungumbothu un innocence face paaka evlo azhagu theriyuma 😴",
    "Un hugging warmth... It melts away all my stress in seconds 🫀",
    "Namba rendu perum silly things-ku serndhu sirikiradhu 🙈",
    "En life-oda best decision na unna love pannadhu thaan 🧿",
    "Nee en pakkathula irundha vera ethuvume thevai illa nu thonum 🌍",
    "You believe in me even when I doubt myself 🌟",
    "Un voice kekumbothu vara antha strange inner peace 🎶",
    "Namba sandai potalum, 10 minutes-la patch up aagidurome athu 🥹",
    "Un eye contact... ipovum butterflies kudukudhu 🦋",
    "The way you say my name with that special tone 🥰",
    "You are my best friend first, lover second, and forever soulmate 🔐",
    "Unkuda long walks and silent moments spend panradhu romba pudikum 🌙",
    "You make ordinary days feel like extraordinary fairy tales 📖",
    "Because loving you is the easiest and most natural thing I've ever done 💖"
  ],

  // Couples Telepathy Game
  quiz: [
    {
      question: "Who fell in love first? 💘",
      options: [
        { text: "Definitely Me! (En heart thaan first flat aachu)", reaction: "Aww! Un love thaan first spark aachu... and it set my whole soul on fire! 🔥❤️" },
        { text: "You! (Nee thaan enna paathu mayanguney)", reaction: "Haha correct thaan, unna paatha yarala thaan vizhama iruka mudiyum? 😚✨" },
        { text: "Both at the exact same second! ⚡", reaction: "Pure destiny! Two souls destined for each other. 💫" }
      ]
    },
    {
      question: "Sanda potta, who says sorry first? 🥺",
      options: [
        { text: "Me (Ego vida un smile thaan mukkiyam)", reaction: "En thangam! Indha maturity and care-kaga thaan unna romba pudikum! 🫂🤍" },
        { text: "You (Nee thaan eppovum samadhanam pannuva)", reaction: "Aama di/da, un kooda pesama 5 minutes kooda ennala iruka mudiyadhu! 🥹" },
        { text: "Sandaye varadhu, we are too cute! 🥰", reaction: "Hehe cute lie, but our patch-ups are sweeter than anything! 🍯" }
      ]
    },
    {
      question: "Namba dream date location enna? 🏖️",
      options: [
        { text: "Quiet beach under the stars with cold breeze 🌊", reaction: "Waves sound, un kai en kaiyila, and endless talks... Soon nadakum! 🌌" },
        { text: "Cozy mountain cottage with rain and hot tea 🌧️", reaction: "Raindrops outside, warm blanket, and cuddling with you... Perfect! ☕❤️" },
        { text: "Just our room, ordering food & binge watching 🍕", reaction: "The simplest moments with you are the most precious ones! 🍿📺" }
      ]
    },
    {
      question: "Enakku unkitta ellathaiyum vida romba pudichadhu enna? 🫀",
      options: [
        { text: "Un Beautiful Eyes & Sweet Smile ✨", reaction: "Antha kannula thaan na mulusa tholanjiten! 👁️✨" },
        { text: "Un Pure Heart & Caring Nature 🫂", reaction: "Unga mathiri oru soul kedaika na romba kuduthu vechirukanum! 🌸" },
        { text: "EVERY SINGLE THING ABOUT YOU! 💯", reaction: "100% CORRECT! You are literally perfection to me in every single way! 💍💖" }
      ]
    }
  ],

  // Polaroids
  polaroids: [
    { image: "assets/images/1.jpg", caption: "The smile that stole my heart forever 🤍", date: "Golden Memory" },
    { image: "assets/images/1.jpg", caption: "Random candid, but you looked breathtaking ✨", date: "Precious Moments" },
    { image: "assets/images/1.jpg", caption: "Every frame with you is my favorite chapter 📖", date: "Our Story" },
    { image: "assets/images/1.jpg", caption: "Look how happy we look together 🧿", date: "Pure Bliss" },
    { image: "assets/images/1.jpg", caption: "Never letting go of these hands 🤝", date: "Together" },
    { image: "assets/images/1.jpg", caption: "My forever favorite human 💫", date: "Forever" }
  ],

  // Wax Letter
  letter: {
    salutation: "To the Love of My Life,",
    body: `En anbe,\n
Some people enter our lives quietly, but they change every single beat of our heart forever. Nee en life-la vandhadhuku appram thaan, love evlo azhagaanadhu, evlo peaceful-aanadhu nu na purinjikiten.\n
Enoda happy days-la unkuda sirikiradhum, tough days-la un kaiya pidikumbodhu vara relief-um... words-la explain panna mudiyadhu. You are not just my love, you are my best friend, my peace, and my sweetest addiction.\n
Ulagathula evlo per irundhalum, en eyes eppavum unna thaan thedum. En heart eppavum unakkaaga thaan thudikkum. Through every storm, every laughter, every dream... I promise to stand beside you, hold your hand tight, and love you more and more every single day.\n
Happy Birthday / Happy Anniversary, My Dear! You are my once-in-a-lifetime kind of love. 🫀✨`,
    signature: "Yours in this life & every life to come,",
    signOff: "With Endless Love 💖"
  },

  // Final Wishing Lanterns
  lanternWish: "May all our dreams come true, together forever under these eternal stars. 🏮✨",

  // 5. Our Journey Section (The Odyssey of Us & Roadmap to Forever)
  ourJourney: {
    title: "Our Journey to Forever 🧭✨",
    subtitle: "Every kilometer, every memory, and every heartbeat led me straight to you 🗺️",
    boardingPass: {
      flightNo: "HEART-1402",
      from: "Two Strangers in this Big World 🌍",
      to: "Together For Eternity ♾️",
      seat: "Side by Side (1A & 1B)",
      gate: "Love Gate 01",
      date: "Forever & Always",
      stampText: "APPROVED FOR ETERNITY 💍"
    },
    stations: [
      {
        icon: "📍",
        name: "Station 1: Crossroads of Serendipity",
        desc: "In a world of 8 billion people, our paths crossed at the exact right second. What felt like coincidence was actually destiny. 💫",
        highlight: "Where It All Began"
      },
      {
        icon: "🌙",
        name: "Station 2: The Horizon of Late Nights",
        desc: "Late night calls, silly jokes, laughing till our stomachs hurt. In your voice, I found my permanent home. 🏡✨",
        highlight: "Falling Deeper"
      },
      {
        icon: "🌧️",
        name: "Station 3: The Rainbow Bridge",
        desc: "Life wasn't always sunny, but through every little storm and tear, we held hands tighter and came out stronger than ever. 🌈🤝",
        highlight: "Unbreakable Bond"
      },
      {
        icon: "✈️",
        name: "Station 4: Dreams & Future Adventures",
        desc: "Long drives with no destination, catching sunrises together, and making memories in every corner of this earth. 🗺️🎒",
        highlight: "Our Shared Dreams"
      },
      {
        icon: "♾️",
        name: "Station 5: Destination: Growing Old Together",
        desc: "Holding your wrinkled hands, laughing at our old memories, and loving you just as intensely as day one. 💍👵👴",
        highlight: "Forever & Beyond"
      }
    ],
    bucketList: [
      { id: 1, title: "Midnight Ice Cream Run in the Rain 🍦🌧️" },
      { id: 2, title: "Watching Mountain Sunrise Wrapped in One Blanket 🌄" },
      { id: 3, title: "Cooking Our Favorite Meal & Messing Up the Kitchen 👩‍🍳👨‍🍳" },
      { id: 4, title: "Late Night Stargazing on a Quiet Beach 🌌🌊" }
    ]
  }
};
