import React from "react";
import { Link } from "react-router-dom";
import { authState } from "../../redux/stories/authStory";
import CreateDate from "../createDate";
import HeartIcon from "../icons/heartIcon";

interface Props {
  id: string;
  name: string;
  wordCount: number;
  isFavourite: boolean;
  createdAt: Date;
  onRemove: (heroId, heroName) => void;
  onClone: (heroId) => void;
  onFavourite: (heroId, isFavourite) => void;
}

const Card = (props: Props) => {
  const user = authState.getValue();

  const remove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.onRemove(props.id, props.name);
  };

  const clone = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.onClone(props.id);
  };

  const favouriteChange = (e): void => {
    e.stopPropagation();
    e.preventDefault();
    props.onFavourite(props.id, !props.isFavourite);
  };

  const imageNumber = (parseInt(props.id) % 6) + 1;

  return (
    <Link to={"wordhero/" + props.id} className="card">
      <div>
        <img
          title="clone"
          src={require(`../../assets/icons/copy.svg`)}
          alt="word hero img"
          className="copy-icon wh-icon white active"
          onClick={clone}
        />

        <img
          title="remove"
          src={require(`../../assets/icons/delete.svg`)}
          alt="word hero img"
          className="trash-icon wh-icon white active"
          onClick={remove}
        />

        <img
          src={require(`../../assets/images/card-backgrounds/template-${imageNumber}.svg`)}
          alt="word hero img"
          className="wh-image"
        />
      </div>
      <div className="card-details">
        <div className="wh-title">
          <h3>{props.name}</h3>
          <span>{props.wordCount} words</span>
        </div>
        <div className="author-details">
          <img
            src={require(`../../assets/icons/hero.svg`)}
            alt="person"
            className="wh-person"
          />
          <div className="author-info">
            <div>{user.givenName}</div>
            <div className="date">
              <CreateDate createdAt={props.createdAt} />
            </div>
          </div>
        </div>
        <HeartIcon fill={props.isFavourite} onClick={favouriteChange} />
      </div>
    </Link>
  );
};

export default Card;
