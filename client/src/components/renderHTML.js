import { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class RenderHTML extends Component {
  render = () => {
    const html = `${this.props.htmlString}`;
    return ReactHtmlParser(html);
  };
}

export default RenderHTML;
