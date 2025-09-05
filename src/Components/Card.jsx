import React from "react";

const Card = ({ slogan, img, bkg }) => {
  return (
    <div className="card1 " style={{ backgroundColor: `${bkg}` }}>
      <p>{slogan}</p>
      <img src={img} />
      <div className="cardIcons">✦✦✦✦✦✦</div>
    </div>
  );
};

export default Card;
{
  /* <div className="card1">
<p>
  Whether you're looking <br />
  to lose weight
</p>
<img src={apple} />
</div> */
}
