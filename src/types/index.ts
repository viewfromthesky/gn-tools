export interface Player {
	id: string,
	name: string
};

export interface PlayerState {
	players: Player[]
};

// The Game and Player types are the same now, but they could change in future
export interface Game {
	id: string,
	name: string,
	playersPerTeam: number
};

export interface GameState {
	games: Game[]
};
