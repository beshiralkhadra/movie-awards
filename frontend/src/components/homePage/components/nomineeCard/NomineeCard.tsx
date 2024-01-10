import React from "react";
import "./index.css";
import Card from "../../../../shareableComponents/card/Card";
import { DefaultNomineeCardTypes } from "../../../../util/SharedTypes";
import { formatDate } from "../../../../util/sharedFunctions";

type NomineeCardTypes = DefaultNomineeCardTypes & {
  onSelect: () => void;
  isSelected: boolean;
};
const NomineeCard: React.FC<NomineeCardTypes> = React.memo(
  ({
    name,
    description,
    votes,
    stars,
    image_url,
    release_date,
    onSelect,
    isSelected,
  }: NomineeCardTypes) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    React.useEffect(() => {
      console.log("onSelect or isSelected changed");
    }, [onSelect, isSelected]);

    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };

    // const handleClick = () => {
    //   onSelect();
    // };

    return (
      <Card isSelected={isSelected}>
        <img src={image_url} alt={name} className="movie-card_img" />
        <div className="card-info">
          <h3>{name}</h3>
          <p>
            {isExpanded ? description : `${description.substring(0, 100)}...`}
            <span
              onClick={toggleExpanded}
              style={{ color: "#C79F27", cursor: "pointer" }}
            >
              {isExpanded ? " Show less" : " Show more"}
            </span>
          </p>
          <p>Stars: {stars.join(", ")}</p>
          <p>Release Date: {formatDate(release_date.toString())}</p>
          <div className="nominee-card_footer-section">
            <p>Votes: {votes}</p>
            <button id="vote" onClick={onSelect}>
              Vote
            </button>
          </div>
        </div>
      </Card>
    );
  }
);

export default NomineeCard;
