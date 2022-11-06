// import React from 'react';
// import './Button.css';
// import { Link } from 'react-router-dom';

// export function Button() {
//   return (
//     <Link to='sign-up'>
//       <button className='btn'>Sign Up</button>
//     </Link>
//   );
// }

import React from 'react';
import './Button.css';
import { Link, useNavigate } from 'react-router-dom';
import Report from './globalVariables/Report';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large', 'btn--long'];

const LINKS = ['/sign-up', '/home', '/services', '/products', '/maps', '/login', '/description']

export const Button = ({
  children,
  type,
  kindOfReport,
  buttonStyle,
  buttonSize,
  buttonLink
}) => {
  const navigate = useNavigate();
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkLink = LINKS.includes(buttonLink) ? buttonLink : LINKS[0];
  const onClick = () => {
    Report.kindOfReport = kindOfReport;
    navigate(checkLink);
  }
  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};
