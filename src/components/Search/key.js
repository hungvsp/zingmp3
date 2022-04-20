import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEARCH } from '../../constants/slug';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearch,
  getHotKey,
} from '../../redux/search';

function Key({ setKeySearch, setIsCollapse, suggestKey }) {
  const stateSearch = useSelector(selectSearch);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotKey());
  }, [dispatch]);
  const { hotKey } = stateSearch;

  return (
    <div className="key-box">
      <h3 className="tittle">
        {suggestKey
          ? 'Đề xuất cho bạn'
          : 'Từ khóa liên quan'}
      </h3>
      <ul className="suggest-box">
        {!suggestKey
          ? hotKey.map((item, index) => {
              return (
                <li
                  key={index}
                  className="suggest-item"
                  onClick={() => {
                    setKeySearch(item);
                  }}
                >
                  <Link
                    to={SEARCH + '?key=' + item.trim('#')}
                  >
                    <i className="icon ic-trend"></i>
                    <span className="ml-10">{item} </span>
                  </Link>
                </li>
              );
            })
          : suggestKey.map((item, index) => {
              return (
                <li
                  key={index}
                  className="suggest-item"
                  onClick={() => {
                    setKeySearch(item.keyword);
                  }}
                >
                  <Link
                    to={
                      SEARCH +
                      '?key=' +
                      item.keyword.trim('#')
                    }
                  >
                    <i className="icon ic-search"></i>
                    <span className="ml-10">
                      {item.keyword}{' '}
                    </span>
                  </Link>
                </li>
              );
            })}
      </ul>
    </div>
  );
}
export default Key;
