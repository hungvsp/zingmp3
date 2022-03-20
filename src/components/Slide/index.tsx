import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './slide.scss';
import React, { useState, useRef } from 'react';
import {
  Splide,
  SplideSlide,
} from '@splidejs/react-splide';

import Detail from './detail.jsx';

const initialItems = [
  {
    item:
      'https://photo-zmp3.zadn.vn/banner/c/3/a/a/c3aa64fca8084bcfd196653b78800def.jpg',
  },
  {
    item:
      'https://photo-zmp3.zadn.vn/banner/8/d/2/0/8d204b05a7b9376917c3eaf985df83a8.jpg',
  },
  {
    item:
      'https://photo-zmp3.zadn.vn/banner/8/d/2/0/8d204b05a7b9376917c3eaf985df83a8.jpg',
  },
  {
    item:
      'https://photo-zmp3.zadn.vn/banner/c/9/8/a/c98ad0786b6349100c1fdb1b1b3aecec.jpg',
  },
  {
    item:
      'https://photo-zmp3.zadn.vn/banner/f/5/0/8/f5081c9084fee26ff34456bb0ffe5638.jpg',
  },
];
export default function () {
  const [items, setItems] = useState(initialItems);
  const optionsSlide = {
    autoplay: true,
    // interval:1, time to sliding
    type: 'loop',
    rewind: false,
    perPage: 3,
    perMove: 1,
    gap: 20,
    pagination: false,
    breakpoints: {
      623: {
        perPage: 2,
        perMove: 1,
      },
      935: {
        perPage: 3,
        perMove: 3,
      },
      1247: {
        perPage: 4,
        perMove: 4,
      },
    },
  };
  return (
    <div className="slide-container">
      <Splide
        options={optionsSlide}
        onMounted={() => {
          console.log('mounted');
        }}
        onUpdated={() => {
          console.log('updated');
        }}
        onMoved={() => {
          console.log('moved');
        }}
        onVisible={(splide, slide) => {
          console.log('visible', slide.index);
        }}
        renderControls={() => (
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">
              <i className="icon ic-go-left"></i>
            </button>
            <button className="splide__arrow splide__arrow--next">
              <i className="icon ic-go-right"></i>
            </button>
          </div>
        )}
      >
        {items.map((item, index) => {
          console.log(index);
          return (
            <SplideSlide key={index} className="slide">
              <Detail src={item.item} />
              <i className="icon ic-song"></i>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
