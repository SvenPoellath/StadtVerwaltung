import React from "react";
import { Link } from "react-router-dom";
import Report from "./globalVariables/Report";

function CardItem(props) {
  const onClick = () => {
    Report.kindOfReport = props.text;
  };
  return (
    <>
      <li className="cards__item">
        <Link className="cards__item__link" to={props.path} onClick={onClick}>
          <figure className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              alt="Travel Image"
              src={props.src}
            />
          </figure>
          <div className="cards__item__info">
            <h3 className="cards__item__text">{props.text}</h3>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
