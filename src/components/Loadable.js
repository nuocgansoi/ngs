import React from 'react';
import LogoSVG from './LogoSVG';

const Loading = () => (
  <div id="loading">
    <LogoSVG/>
    <div className="icon">
      <i className="fa fa-cog fa-2x fa-spin" data-nth="1"/>
      <i className="fa fa-cog fa-3x fa-spin" data-nth="2"/>
      <i className="fa fa-cog fa-1x fa-spin" data-nth="3"/>
    </div>
  </div>
);

export const loadable = (Component) => {
  return class extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      this.timeout = setTimeout(() => {
        this.setState({loading: false});
      }, 600);

    }

    componentWillUnmount() {
      clearTimeout(this.timeout);
    }

    render() {
      const {loading} = this.state;

      return loading ? <Loading/> : <Component {...this.props}/>;
    }
  };
};
