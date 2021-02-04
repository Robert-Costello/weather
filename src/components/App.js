import React, {Component} from 'react';
import Footer from './Footer';
class App extends Component {
  componentDidMount() {
    console.log('Mounted!');
  }
  render() {
    return (
      <div>
        <Footer />
      </div>
    );
  }
}

export default App;
