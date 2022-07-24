// TODO записать в куки
export const state = {
  pause: true,
  triggerGame: false,
  sec: 0,
  countMove: 0,
  audioSrc: "/public/music/Звук_Игры.mp3",
};

export type State = typeof state;
