import PropTypes from 'prop-types';
import ContextApp from './ContextApp';

export default function ContextAppProvider({ children }) {
  return (
    <ContextApp.Provider>
      {children}
    </ContextApp.Provider>
  );
}

ContextAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
