import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');

  const globalState = useMemo(() => ({
    currentUser,
    setCurrentUser,
  }), [currentUser]);

  return (
    <AppContext.Provider value={ globalState }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};