import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Willkommen in Ludwigshafen</h1>
      <p>Ludwigshafen am Rhein [ˈlutvɪçsˌhafn̩ ʔam ʁaɪ̯n oder ˈluːtvɪks-] ist die größte Stadt der Pfalz, mit rund 172.000 Einwohnern (Stand 2021)[1] nach der Landeshauptstadt Mainz die zweitgrößte Stadt in Rheinland-Pfalz und nach Mannheim die zweitgrößte Stadt der Metropolregion Rhein-Neckar.
      </p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
