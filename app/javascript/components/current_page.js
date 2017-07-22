import React from 'react';
import PropTypes from 'prop-types';

const CurrentPage = ({ title, position }) => {

  <div className="currentPage" >
    {position}
  </div>
};

CurrentPage.propTypes = {
  title: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    title: state.getIn(["manual", "pages"]).toJS(),
    position: stete
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPageClick: (id) => {
      dispatch(removePage(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Pages);


export default CurrentPage;