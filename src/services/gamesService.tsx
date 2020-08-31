import { dateFrom } from '../utils/DateUtil'

const mockGame: Game = {
  id: "123sdfsdf",
  course: {
    id: "fds3ury83ofh",
    name: "Puolarmaari",
    pars: [3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-13 09:22",
  scores: [
    {
      player: {
        id: "jf8pf8spö3",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 0,
      toPar: 0
    },
    {
      player: {
        id: "fh83p98slhs",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 0,
      toPar: 0
    }
  ],
  temperature: null,
  weatherConditions: [],
  conditions: [],
  highScorers: [],
  illegalScorers: [],
  comment: null,
  contestName: null,
}

const mockGames: Game[] = [{
  id: "123sdfsdf",
  course: {
    id: "fds3ury83ofh",
    name: "Puolarmaari",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-12 09:22",
  scores: [
    {
      player: {
        id: "jf8pf8spö3",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 3, 0, 0, 3, 2, 3, 3, 1, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 49,
      toPar: 4
    },
    {
      player: {
        id: "fh83p98slhs",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 6, 3, 3, 2, 3, 3, 2, 2, 2],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 58,
      toPar: -2
    }
  ],
  temperature: 1,
  weatherConditions: ["snow", "rain"],
  conditions: ["LED"],
  highScorers: ["Teppo"],
  illegalScorers: ["Seppoilijaliini"],
  comment: "Fun :D",
  contestName: null,
}, {
  id: "124fefs3r3gs",
  course: {
    id: "uflshf8sls",
    name: "Puolarmaari",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-11 09:22",
  scores: [
    {
      player: {
        id: "fnslh3f8l3ifslf",
        firstName: "Seppomoinen",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "jfispo3uf9slefi",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: 1,
  weatherConditions: ["rain", "snow", "dark", "windy"],
  conditions: ["LED", "variant layout"],
  highScorers: ["Teppo"],
  illegalScorers: [],
  comment: "Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros. Fun :D Erittäin antoisa kierros.",
  contestName: null,
}, {
  id: "1253rffsfsesfe",
  course: {
    id: "j8fslof8sl3",
    name: "Tali",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-10 09:22",
  scores: [
    {
      player: {
        id: "ja38ofus8los",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "jfl38suf8sofls",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: null,
  weatherConditions: ["snow", "rain"],
  conditions: ["LED"],
  highScorers: ["Teppo"],
  illegalScorers: [],
  comment: "Fun :D",
  contestName: null,
}, {
  id: "1263fs9kföi39öps",
  course: {
    id: "jfs9ö3fus9ljfsi",
    name: "Shorty",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-09 09:22",
  scores: [
    {
      player: {
        id: "jfiljfseo9fjls3f",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "fi3sofjlls8ifjsilf",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: 1,
  weatherConditions: ["snow"],
  conditions: ["LED"],
  highScorers: ["Teppo"],
  illegalScorers: [],
  comment: "Fun :D",
  contestName: null,
}, {
  id: "fsefsef4f127",
  course: {
    id: "flsul8lsejiflse",
    name: "Puolarmaari",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-08-08 09:22",
  scores: [
    {
      player: {
        id: "nfsiefhjiflsji",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "fslf3i8o398ufslf",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: 1,
  weatherConditions: ["snow", "rain"],
  conditions: ["LED"],
  highScorers: ["Teppo"],
  illegalScorers: [],
  comment: "Fun :D",
  contestName: null,
  }, {
    id: "d3f3fg128",
    course: {
      id: "nfuslefh8lsje",
      name: "Kivikko",
      pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
    },
    startDate: null,
    endDate: "2020-06-13 09:22",
    scores: [
      {
        player: {
          id: "jfisöuf9sl3fij",
          firstName: "Seppo",
          guest: false,
        },
        strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
        obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 48,
        toPar: -3
      },
      {
        player: {
          id: "fnuslfu48ljsr",
          firstName: "Teppo",
          guest: false,
        },
        strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
        obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 61,
        toPar: 1
      }
    ],
    temperature: 1,
    weatherConditions: ["snow", "rain"],
    conditions: ["LED"],
    highScorers: ["Teppo"],
    illegalScorers: [],
    comment: "Fun :D",
    contestName: null,
  }, {
    id: "fj3ifolsu8lfu448ls",
    course: {
      id: "j9göu8rlgudlig",
      name: "Tali",
      pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
    },
    startDate: null,
    endDate: "2020-05-13 09:22",
    scores: [
      {
        player: {
          id: "hgfsu4pu83slofj",
          firstName: "Seppo",
          guest: false,
        },
        strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
        obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 48,
        toPar: -3
      },
      {
        player: {
          id: "jfs83oju8soög",
          firstName: "Teppo",
          guest: false,
        },
        strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
        obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: 61,
        toPar: 1
      }
    ],
    temperature: null,
    weatherConditions: [],
    conditions: [],
    highScorers: [],
    illegalScorers: [],
    comment: "",
    contestName: null,
  }, {
  id: "d3f3fg128",
  course: {
    id: "nfuslefh8lsje",
    name: "Puolarmaari",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-05-13 09:22",
  scores: [
    {
      player: {
        id: "jfisöuf9sl3fij",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "fnuslfu48ljsr",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: 1,
  weatherConditions: ["snow", "rain"],
  conditions: ["LED"],
  highScorers: ["Teppo"],
  illegalScorers: [],
  comment: "Fun :D",
  contestName: null,
}, {
  id: "fj3ifolsu8lfu48ls",
  course: {
    id: "j9göu8rlgudlig",
    name: "Puolarmaari",
    pars: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    total: 60,
    layouts: [
      { id: 'fdg', active: true, name: '2020 layout'},
      { id: 'fdfsdg', active: false, name: '2019 layout'}
    ],
  },
  startDate: null,
  endDate: "2020-05-13 09:22",
  scores: [
    {
      player: {
        id: "hgfsu4pu83slofj",
        firstName: "Seppo",
        guest: false,
      },
      strokes: [3, 3, 3, 2, 3, 0, 0, 0, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 48,
      toPar: -3
    },
    {
      player: {
        id: "jfs83oju8soög",
        firstName: "Teppo",
        guest: false,
      },
      strokes: [3, 3, 4, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 6, 3, 3, 3, 2, 3, 3],
      obs: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      total: 61,
      toPar: 1
    }
  ],
  temperature: null,
  weatherConditions: [],
  conditions: [],
  highScorers: [],
  illegalScorers: [],
  comment: "",
  contestName: null,
}]

const mockYears = [2015, 2019, 2016, 2017, 2018, 2020]
const mockMonths = [0, 2, 3, 4, 5, 6, 8]

const getGames = async (year: number, month: number): Promise<Game[]> => {
  // TODO: Replace mock data with API call.
  return mockGames.filter(game => dateFrom(game.endDate).getMonth() === month
      && dateFrom(game.endDate).getFullYear() === year)
}

const getYearsThatHaveGames = async (): Promise<number[]> => {
  // TODO: Replace mock data with API call.
  return mockYears.sort((a, b) => b - a)
}

const createGame = async (course: Course, layout: Layout, players: Player[]): Promise<Game> => {
  // TODO: Replace mock data with API call.
  // Note: If the layout is not active, the active layout should be updated to be the chosen layout.
  return mockGame
}

const getGame = async (id: string): Promise<Game> => {
  // TODO: Replace mock data with API call.
  return mockGame
}

const updateGame = async (game: Game): Promise<Game> => {
  // TODO: Replace mock data with API call.
  return mockGame
}

export default {
  getGames,
  getYearsThatHaveGames,
  createGame,
  getGame,
  updateGame,
}
