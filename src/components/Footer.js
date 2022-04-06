/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChampagneGlasses,
  faCompass,
  faBowlFood,
} from '@fortawesome/free-solid-svg-icons';
import FooterStyle from '../default_styles/FooterStyle';

function Footer({ history }) {
  const borderClass = '.menu__border';

  function offsetMenuBorder(element, border) {
    const menu = document.querySelector('.menu');
    const offsetActiveItem = element.getBoundingClientRect();
    const left = `
    ${Math.floor(
    offsetActiveItem.left - menu.offsetLeft - (
      border.offsetWidth - offsetActiveItem.width
    ) / 2,
  )}px
    `;
    border.style.transform = `translate3d(${left}, 0 , 0)`;
  }

  function clickItem({ target }) {
    let activeItem = document.querySelector('.active');
    const menuBorder = document.querySelector(borderClass);
    const menuItem = document.querySelectorAll('.menu__item');

    if (activeItem === target) return;

    if (activeItem) {
      activeItem.classList.remove('active');
    }

    if (target.type !== 'button') {
      const button = target.parentNode;
      if (button.type !== 'button') {
        const button2 = button.parentNode;
        button2.classList.add('active');
        activeItem = button2;
        if (button2 === menuItem[0]) history.push('/foods');
        if (button2 === menuItem[1]) history.push('/explore');
        if (button2 === menuItem[2]) history.push('/drinks');
      } else {
        button.classList.add('active');
        activeItem = button;
        if (button === menuItem[0]) history.push('/foods');
        if (button === menuItem[1]) history.push('/explore');
        if (button === menuItem[2]) history.push('/drinks');
      }
    } else {
      target.classList.add('active');
      activeItem = target;
      if (target === menuItem[0]) history.push('/foods');
      if (target === menuItem[1]) history.push('/explore');
      if (target === menuItem[2]) history.push('/drinks');
    }
    offsetMenuBorder(activeItem, menuBorder);
  }

  useEffect(() => {
    // quando carrega a pagina, pega o path e colocar ativo em [0] se for foods, [1] se for explore e [2] se for drinks
    const placeActiveOnMount = () => {
      const menuItem = document.querySelectorAll('.menu__item');
      const { pathname } = history.location;
      if (pathname === '/foods') {
        menuItem[0].classList.add('active');
        return;
      }
      if (pathname === '/explore') {
        menuItem[1].classList.add('active');
        return;
      }
      if (pathname === '/drinks') {
        menuItem[2].classList.add('active');
        return;
      }
      const border = document.querySelector(borderClass);
      border.classList = 'hidden';
    };
    placeActiveOnMount();

    const activeItem = document.querySelector('.active');

    if (!activeItem) return;

    const menuBorder = document.querySelector(borderClass);
    offsetMenuBorder(activeItem, menuBorder);
  }, [history.location]);

  return (
    <FooterStyle
      data-testid="footer"
    >
      <menu className="menu">
        <button
          onClick={ clickItem }
          type="button"
          className="menu__item"
        >
          <FontAwesomeIcon className="new-icon" icon={ faBowlFood } />
        </button>

        <button
          onClick={ clickItem }
          className="menu__item"
          type="button"
        >
          <FontAwesomeIcon className="new-icon" icon={ faCompass } />

        </button>

        <button
          onClick={ clickItem }
          className="menu__item"
          type="button"
        >
          <FontAwesomeIcon className="new-icon" icon={ faChampagneGlasses } />

        </button>

        <div className="menu__border" />

      </menu>

      <div className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.9 45.5">
          <clipPath id="menu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
            <path
              d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5c9.2,3.6,17.6,4.2,23.3,4H6.7z"
            />
          </clipPath>
        </svg>
      </div>
    </FooterStyle>
  );
}

export default Footer;
