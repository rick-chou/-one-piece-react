import {
  BetweenWorlds,
  MysteryOfLove,
  在雨中,
  没有理想的人不伤心,
  爱在夏天,
} from '@rickzhou/awesome/assets/music';
import { Cover1, Cover2, Cover3 } from '@rickzhou/awesome/assets/pic';
import { random } from 'lodash-es';

const cover = [Cover1, Cover2, Cover3];

export type TrackType = {
  name: string;
  artist: string;
  cover: string;
  source: string;
  favorites: boolean;
};

const getRandomCover = () => {
  const id = random(0, 2);
  return cover.at(id)!;
};

export const tracks: TrackType[] = [
  {
    name: '没有理想的人不伤心',
    artist: '新裤子',
    cover: getRandomCover(),
    source: 没有理想的人不伤心,
    favorites: true,
  },
  {
    name: '在雨中',
    artist: '韩寒',
    cover: getRandomCover(),
    source: 在雨中,
    favorites: true,
  },
  {
    name: '爱在夏天',
    artist: '告五人',
    cover: getRandomCover(),
    source: 爱在夏天,
    favorites: true,
  },
  {
    name: 'Mystery Of Love',
    artist: 'Sufjan Stevens',
    cover: getRandomCover(),
    source: MysteryOfLove,
    favorites: true,
  },
  {
    name: 'Between Worlds',
    artist: 'Roger Subirana',
    cover: getRandomCover(),
    source: BetweenWorlds,
    favorites: true,
  },
];
