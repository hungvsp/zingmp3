import './search.scss';
import Key from './key';
import axios from 'axios';
import Suggest from './suggest';
import { isEmpty } from 'validator';
import { SEARCH } from '../../constants/slug';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MAX_LENGHT } from '../../constants/validation';
import { URL_GET_SUGGESTS } from '../../constants/urlApi';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  hanldeChangeIsCollapse,
  selectSearch,
} from '../../redux/search';

function Search() {
  const [keySeachs] = useSearchParams();
  const keySeachParam = keySeachs.get('key');
  const refForm = useRef();
  const refInput = useRef();
  const navigate = useNavigate();
  const [keySearch, setKeySearch] = useState(
    keySeachParam || ''
  );
  const [dataSuggest, setDataSuggest] = useState([]);

  const dispacth = useDispatch();
  const stateSearch = useSelector(selectSearch);
  const { isCollapse } = stateSearch;

  useEffect(() => {
    window.addEventListener('click', function (e) {
      if (refForm.current) {
        if (refForm.current.contains(e.target)) {
          dispacth(hanldeChangeIsCollapse(true));
        } else {
          dispacth(hanldeChangeIsCollapse(false));
        }
      }
    });
  }, [dispacth]);

  useEffect(() => {
    if (!keySearch) return '';
    axios.get(URL_GET_SUGGESTS + keySearch).then((data) => {
      if (
        data.statusText === 'OK' &&
        data.data.data.err === 0
      ) {
        const dataGetSuggest = data.data.data.data.items;
        setDataSuggest(dataGetSuggest);
      }
    });
  }, [keySearch]);
  const hanldeSubmit = (e) => {
    e.preventDefault();
    navigate(SEARCH + '?key=' + keySearch.trim('#'));
  };
  const handleChangeKey = (e) => {
    dispacth(hanldeChangeIsCollapse(true));
    const valueKey = e.target.value;
    setKeySearch(valueKey);
  };
  const handleClose = () => {
    setKeySearch('');
    if (refInput.current) {
      const input = refInput.current;
      input.focus();
    }
  };
  const isEmptyKey = isEmpty(keySearch.trim());

  return (
    <form ref={refForm} onSubmit={hanldeSubmit}>
      <div
        className={`search-container ${
          isCollapse ? 'is-collapse' : ''
        }`}
      >
        <div className="search">
          <i className="icon ic-search"></i>
          <input
            name="search"
            type="text"
            maxLength={MAX_LENGHT}
            value={keySearch.trimLeft()}
            onChange={handleChangeKey}
            ref={refInput}
          />
          {!isEmptyKey && (
            <i
              className="icon ic-close"
              onClick={handleClose}
            ></i>
          )}
        </div>
        <div className="bot-search">
          {isEmptyKey && (
            <Key setKeySearch={setKeySearch} />
          )}
          {!isEmptyKey && (
            <Key
              setKeySearch={setKeySearch}
              suggestKey={dataSuggest?.[0]?.keywords}
            />
          )}
          <Suggest data={dataSuggest?.[1]?.suggestions} />
        </div>
      </div>
    </form>
  );
}
export default Search;
