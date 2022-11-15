import React from 'react';
import './Products.css'
import '../../Cards.css'
import CardItem from '../../CardItem';
export default function Products() {
  return (
  <div className='report-container'>
    <img src='icons/Stage 4.png' className='img-header'/>
    <h1 className='products'>Was möchten Sie melden?</h1>
    
    <div className='cards-wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='icons/Schaden.png'
              text='Defekt oder Schaden'
              path='/description'
            />
            <CardItem
              src='icons/Verunreinigung.png'
              text='Verunreinigung'
              path='/description'
            />
            <CardItem
              src='icons/Parkverstoß.png'
              text='Parkverstoß'
              path='/description'
            />
          </ul>
      </div>
  </div>
  );
}
