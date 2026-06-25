import type { TournamentState } from '../types'

const PLAYER_IDS = {
  djokovic: 'wb-player-djokovic',
  alcaraz: 'wb-player-alcaraz',
  nadal: 'wb-player-nadal',
  murray: 'wb-player-murray',
  zverev: 'wb-player-zverev',
  // Additional players required so the headline players can reach their
  // match counts (e.g. Djokovic plays 9). Without these the round-robin
  // would cap every player at 4 matches. Each filler is given at most one
  // win (3 pts) so they all rank below Zverev, keeping the top five intact.
  sinner: 'wb-player-sinner',
  medvedev: 'wb-player-medvedev',
  rublev: 'wb-player-rublev',
  tsitsipas: 'wb-player-tsitsipas',
  fritz: 'wb-player-fritz',
  ruud: 'wb-player-ruud',
} as const

const win = (id: string, homeId: string, awayId: string) => ({
  id,
  homeId,
  awayId,
  homeScore: 1,
  awayScore: 0,
})

export const initialWimbledonState: TournamentState = {
  teams: [
    { id: PLAYER_IDS.djokovic, name: 'Djokovic' },
    { id: PLAYER_IDS.alcaraz, name: 'Alcaraz' },
    { id: PLAYER_IDS.nadal, name: 'Nadal' },
    { id: PLAYER_IDS.murray, name: 'Murray' },
    { id: PLAYER_IDS.zverev, name: 'Zverev' },
    { id: PLAYER_IDS.sinner, name: 'Sinner' },
    { id: PLAYER_IDS.medvedev, name: 'Medvedev' },
    { id: PLAYER_IDS.rublev, name: 'Rublev' },
    { id: PLAYER_IDS.tsitsipas, name: 'Tsitsipas' },
    { id: PLAYER_IDS.fritz, name: 'Fritz' },
    { id: PLAYER_IDS.ruud, name: 'Ruud' },
  ],
  // homeId is always the winner (homeScore 1, awayScore 0).
  matches: [
    // --- Round-robin between the five headline players ---
    win('wb-match-1', PLAYER_IDS.alcaraz, PLAYER_IDS.djokovic),
    win('wb-match-2', PLAYER_IDS.djokovic, PLAYER_IDS.nadal),
    win('wb-match-3', PLAYER_IDS.djokovic, PLAYER_IDS.murray),
    win('wb-match-4', PLAYER_IDS.djokovic, PLAYER_IDS.zverev),
    win('wb-match-5', PLAYER_IDS.alcaraz, PLAYER_IDS.nadal),
    win('wb-match-6', PLAYER_IDS.alcaraz, PLAYER_IDS.murray),
    win('wb-match-7', PLAYER_IDS.zverev, PLAYER_IDS.alcaraz),
    win('wb-match-8', PLAYER_IDS.nadal, PLAYER_IDS.murray),
    win('wb-match-9', PLAYER_IDS.nadal, PLAYER_IDS.zverev),
    win('wb-match-10', PLAYER_IDS.murray, PLAYER_IDS.zverev),

    // --- Djokovic vs fillers: 2 wins, 3 losses (-> 5W 4L total) ---
    win('wb-match-11', PLAYER_IDS.djokovic, PLAYER_IDS.sinner),
    win('wb-match-12', PLAYER_IDS.djokovic, PLAYER_IDS.medvedev),
    win('wb-match-13', PLAYER_IDS.rublev, PLAYER_IDS.djokovic),
    win('wb-match-14', PLAYER_IDS.tsitsipas, PLAYER_IDS.djokovic),
    win('wb-match-15', PLAYER_IDS.fritz, PLAYER_IDS.djokovic),

    // --- Alcaraz vs fillers: 1 win, 2 losses (-> 4W 3L total) ---
    win('wb-match-16', PLAYER_IDS.alcaraz, PLAYER_IDS.fritz),
    win('wb-match-17', PLAYER_IDS.sinner, PLAYER_IDS.alcaraz),
    win('wb-match-18', PLAYER_IDS.medvedev, PLAYER_IDS.alcaraz),

    // --- Nadal vs fillers: 1 win, 1 loss (-> 3W 3L total) ---
    win('wb-match-19', PLAYER_IDS.nadal, PLAYER_IDS.fritz),
    win('wb-match-20', PLAYER_IDS.ruud, PLAYER_IDS.nadal),

    // --- Murray vs fillers: 1 win (-> 2W 3L total) ---
    win('wb-match-21', PLAYER_IDS.murray, PLAYER_IDS.fritz),
  ],
}
