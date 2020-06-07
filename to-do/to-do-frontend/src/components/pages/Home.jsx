import React, { Fragment, useState } from "react";
import Register from "../Register";
import Login from "../Login";

const Home = () => {
  const [isHaveAccount, setisHaveAccount] = useState(false);

  const handleIsHaveAccount = () => setisHaveAccount(true);
  const handleIsNotHaveAccount = () => setisHaveAccount(false);

  return (
    <Fragment>
      {isHaveAccount ? (
        <Login handleIsNotHaveAccount={handleIsNotHaveAccount} />
      ) : (
        <Register handleIsHaveAccount={handleIsHaveAccount} />
      )}
    </Fragment>
  );
};

export default Home;
