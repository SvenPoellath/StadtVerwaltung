import React from 'react';
import '../../App.css';
import './Products.css'
import { Button } from '../Button';
import { Link } from 'react-router-dom';
export default function Products() {
  return (
  <div className='report-container'>
    <h1 className='products'>Was möchten Sie melden?</h1>
    <div className='report-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/maps'
        >
          Defekt oder Schaden
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/maps'
        >
          Verunreinigung
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/maps'
        >
          Parkverstoß
        </Button>
      </div>
  </div>
  );
}
