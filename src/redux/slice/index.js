import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import {
  URL_GET_DETAIL_PLAYLISTS,
  URL_GET_INFO_SONG,
} from '../../constants/urlApi';
const saveStorage = (state) => {
  localStorage.setItem('zSlice', JSON.stringify(state));
};
const initalDataStr = localStorage.getItem('zSlice');
const initalData = initalDataStr
  ? {
      ...JSON.parse(initalDataStr),
      isLoadedAvarta: false,
      isShowModal: false,
      isLoading: false,
    }
  : {
      isPlay: false,
      isLoading: false,
      isGetListPlaysByIdSong: false,
      currentIdSong: null,
      currentIdPlaylist: null,
      listPLays: {},
      listPLaysBottom: [],
      dataHome: [],
      countItem: 0,
      hotKey: [],
      isLoadedAvarta: false,
      isLoop: false,
      idCanPlays: [],
      isRandom: false,
    };

export const zSlice = createSlice({
  name: 'zSlice',
  initialState: initalData,
  reducers: {
    haddleIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    haddleIsLoop(state, action) {
      state.isLoop = action.payload;
      saveStorage({ ...state, isLoop: action.payload });
    },
    haddleIsRandom(state, action) {
      state.isRandom = action.payload;
      saveStorage({ ...state, isRandom: action.payload });
    },
    haddleIsGetPlayListBySong(state, action) {
      state.isGetListPlaysByIdSong = action.payload;
      saveStorage({
        ...state,
        isGetListPlaysByIdSong: action.payload,
      });
    },
    haddleIsPlay(state, action) {
      state.isPlay = action.payload;
      saveStorage({ ...state, isPlay: action.payload });
    },

    hanldeChangeListPlay(state, action) {
      state.listPLays = action.payload;
      state.countItem = action.payload?.song?.items.length;
      saveStorage({
        ...state,
        listPLays: action.payload,
        countItem: action.payload?.song?.items.length,
      });
    },
    hanldeChangeListPLaysBottom(state, action) {
      state.listPLaysBottom = action.payload;
      saveStorage({
        ...state,
        listPLaysBottom: action.payload,
      });
    },
    hanldeChangeDataHome(state, action) {
      state.dataHome = action.payload;
    },
    hanldeChangeIsLoadedAvarta(state, action) {
      state.isLoadedAvarta = action.payload;
    },
    hanldeNextPrevSong(state, action) {
      // action.payload = true => next , action.payload= false =>prev
      const { idCanPlays, currentIdSong, isRandom } = state;
      const total = idCanPlays.length;
      if (isRandom) {
        let indexRamdom = 0;
        let i = 0;

        do {
          i++;
          indexRamdom = Math.floor(Math.random() * total);
          console.log(i, indexRamdom);
        } while (
          currentIdSong === idCanPlays[indexRamdom] &&
          i < 50
        );
        state.currentIdSong = idCanPlays[indexRamdom];
      } else {
        if ((indexPlay) => 0) {
          const indexPlay = idCanPlays.findIndex(
            (id) => id === currentIdSong
          );
          state.isLoading = true;
          if (action.payload) {
            const indexPlayNext = indexPlay + 1;
            if (indexPlayNext === total) {
              state.currentIdSong = idCanPlays[0];
            } else {
              state.currentIdSong =
                idCanPlays[indexPlayNext];
            }
          } else {
            const indexPlayNext = indexPlay - 1;
            if (indexPlayNext < 0) {
              state.currentIdSong = idCanPlays[total - 1];
            } else {
              state.currentIdSong =
                idCanPlays[indexPlayNext];
            }
          }
        }
      }
    },
    ChangeCurrentIdSong(state, action) {
      state.currentIdSong = action.payload;
      state.isLoadedAvarta = false;
      state.isLoading = true;
      state.isPlay = true;
      saveStorage({
        ...state,
        currentIdSong: action.payload,
      });
    },
    ChangeCurrentIdPlaylist(state, action) {
      state.currentIdPlaylist = action.payload;
      saveStorage({
        ...state,
        currentIdPlaylist: action.payload,
      });
    },

    haddleCountItem(state, action) {
      state.countItem = action.payload;
      saveStorage({
        ...state,
        countItem: action.payload,
      });
    },
    haddleIdCanPlays(state, action) {
      state.idCanPlays = action.payload;
      saveStorage({
        ...state,
        idCanPlays: action.payload,
      });
    },
  },
});

export const {
  haddleIsPlay,
  haddleIsLoading,
  haddleIsGetPlayListBySong,
  hanldeChangeDataHome,
  hanldeChangeListPlay,
  ChangeCurrentIdSong,
  ChangeCurrentIdPlaylist,
  haddleCountItem,
  haddleIsLoop,
  haddleIsRandom,
  haddleIsShowModal,
  hanldeChangeListPLaysBottom,
  haddleIdCanPlays,
  hanldeNextPrevSong,
} = zSlice.actions;

// call api
export const getDetailPlaylists = (id) => (dispatch) => {
  axios
    .get(URL_GET_DETAIL_PLAYLISTS + id)
    .then((data) => {
      if (data?.data?.data?.err === 0) {
        const result = data.data.data.data;
        let isSetCurrentId = false;
        const idCanPlays = [];
        result?.song?.items.forEach((song) => {
          if (song.streamingStatus === 1) {
            if (!isSetCurrentId) {
              dispatch(ChangeCurrentIdSong(song.encodeId));
              isSetCurrentId = true;
            }
            idCanPlays.push(song.encodeId);
          }
        });
        result?.sections?.forEach((section) => {
          section.items.forEach((song) => {
            idCanPlays.push(song.encodeId);
          });
        });
        dispatch(haddleIdCanPlays(idCanPlays));
        dispatch(hanldeChangeListPlay(result));

        dispatch(ChangeCurrentIdPlaylist(result?.encodeId));
      }
    })

    .catch((err) => {
      console.log(err, 'at call api ');
    });
};
export const getDetailPlaylistsNotSet = (id) => (
  dispatch
) => {
  axios
    .get(URL_GET_DETAIL_PLAYLISTS + id)
    .then((data) => {
      if (data?.data?.data?.err === 0) {
        const result = data.data.data.data;

        const idCanPlays = [];
        result?.song?.items.forEach((song) => {
          if (song.streamingStatus === 1) {
            idCanPlays.push(song.encodeId);
          }
        });
        result?.sections?.forEach((section) => {
          section.items.forEach((song) => {
            idCanPlays.push(song.encodeId);
          });
        });
        dispatch(haddleIdCanPlays(idCanPlays));
        dispatch(hanldeChangeListPlay(result));
        dispatch(ChangeCurrentIdPlaylist(result?.encodeId));
      }
    })
    .catch((err) => {
      console.log(err, 'at call api ');
    });
};
export const getDetailPlaylistsByIdSong = (id) => (
  dispatch
) => {
  axios.get(URL_GET_INFO_SONG + id).then((data) => {
    if (
      data.statusText === 'OK' &&
      data?.data?.err === 0 &&
      data.data?.data?.album
    ) {
      const idPlayList = data.data.data.album.encodeId;
      if (idPlayList)
        dispatch(getDetailPlaylistsNotSet(idPlayList));
    }
  });
};

export const selectData = (state) => state.zSlice;

export default zSlice.reducer;
