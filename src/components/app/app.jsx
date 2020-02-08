import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersCount, offersName} = props;
  return (
    <Main
      offersCount = {offersCount}
      offersName = {offersName}
    />
  );
};

export default App;
