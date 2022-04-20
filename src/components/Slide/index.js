import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './slide.scss';
import React, { useState, useRef } from 'react';
import {
  Splide,
  SplideSlide,
} from '@splidejs/react-splide';

export default function ({ data }) {
  const { tittle, items } = data;
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
        // onMounted={() => {
        //   console.log('mounted');
        // }}
        // onUpdated={() => {
        //   console.log('updated');
        // }}
        // onMoved={() => {
        //   console.log('moved');
        // }}
        // onVisible={(splide, slide) => {
        //   console.log('visible', slide.index);
        // }}
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
          return (
            <SplideSlide key={index} className="slide">
              <img src={item.banner} alt="" />
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}
