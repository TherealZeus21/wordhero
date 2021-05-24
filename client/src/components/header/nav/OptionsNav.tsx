import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { authState } from "../../../redux/stories/authStory";
import { logout } from "../../../services/authProvider";
import Accordion from "../../accordion";

const OptionsNav: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const [userName, setUserName] = useState("");
  const [isLogged, setLogged] = useState(false);

  useEffect(() => {
    authState.subscribe((story) => {
      setLogged(story.isLogged);
      setUserName(`${story.givenName} ${story.familyName}`);
    });
  });

  const { location } = props;

  return (
    <div className="option-nav">
      {location.pathname.indexOf("/app/lesson/create/") > -1 && (
        <>
          <div>
            <FontAwesomeIcon icon={faCog} />
          </div>
        </>
      )}
      {isLogged && (
        <Accordion>
          <Accordion.Header>
            <div className="user-profile">
              <span>{userName}</span>
              <img
                src={require(`../../../assets/icons/hero.svg`)}
                alt="person"
                className="wh-person"
              />
            </div>
          </Accordion.Header>
          <Accordion.Item>
            <NavLink exact to="/" activeClassName="selected">
              <div className="user-item">
                <img
                  src={require(`../../../assets/icons/home.svg`)}
                  alt="person"
                  className="wh-person"
                />
                <span>Home</span>
              </div>
            </NavLink>
          </Accordion.Item>
          <Accordion.Item>
            <div className="user-item disabled">
              <img
                src={require(`../../../assets/icons/settings.svg`)}
                alt="person"
                className="wh-person"
              />
              <span>Settings</span>
            </div>
          </Accordion.Item>
          <Accordion.Item>
            <div className="user-item" onClick={logout}>
              <img
                src={require(`../../../assets/icons/logout.svg`)}
                alt="person"
                className="wh-person"
              />
              <span>Logout</span>
            </div>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
};

export default withRouter(OptionsNav);
