import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Report from "./globalVariables/Report";

/**
 * Creates Custom CardItem Component and returns it
 * @param {Object} props contains multiple strings for custimization
 * @returns CardItem Component
 */
function CardItem(props) {
  const [cookies, setCookie] = useCookies(["kindOfReport"]);
  const onClick = () => {
    setCookie("kindOfReport", props.text, { path: "/" });
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
