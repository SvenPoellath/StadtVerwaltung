import React from 'react';
import '../../App.css';
import './Products.css'
import { Button } from '../Button';
export default function Products() {
  return (
  <div className='report-container'>
    <h1 className='products'>Was möchten Sie melden?</h1>
    <div className='report-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/description'
          kindOfReport='Defekt oder Schaden'
        >
          Defekt oder Schaden
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/description'
          kindOfReport='Verunreinigung'
        >
          Verunreinigung
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--long'
          buttonLink='/description'
          kindOfReport='Parkverstoß'
        >
          Parkverstoß
        </Button>
      </div>
  </div>
  );
}
