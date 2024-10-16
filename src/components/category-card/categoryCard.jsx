import React from "react";
import { Link } from "react-router-dom";

function CategoryCard(props) {
  return (
    <Link to={`/collections?category=${props.name}`} className="text-white space-y-[10px]">
      <img
        src={props.imageURL}
        alt=""
        className="max-w-[110px] lg:max-w-[170px]"
      />
      <p className="text-sm font-semibold">{props.name}</p>
    </Link>
  );
}

export default CategoryCard;
