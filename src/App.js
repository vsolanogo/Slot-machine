import { Motion, spring } from "react-motion";
import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="ui column centered grid">
        <div style={{ width: '100%', top: '50px', position: "absolute" }}>
          <SlotScreen />
        </div>
      </div>
    );
  }
}

class WhiteRectangle extends Component {
  render() {
    const whiteRectangleStyle = {
      width: this.props.width,
      height: this.props.height,
      top: this.props.top,
      // border: "1px solid black",
      position: "absolute",
      zIndex: 1,
      background: "#fff"
    };
    return (
      <div style={whiteRectangleStyle}>

      </div>
    )
  }
}

class SlotScreen extends Component {
  state = {    
    forceUpdateInterval: null,
    forceUpdateInterval2: null,
    forceUpdateInterval3: null, 
    lockSpinButton: false,
  }

  spin = () => {
    this.setState({
      lockSpinButton: true
    })
    setTimeout(() => {
      this.setState({ lockSpinButton: false });
    }, 2000);




    this.setState({
      forceUpdateInterval: setInterval(() => this.refs.Reel1.spin(), 100)
    })
    this.setState({
      forceUpdateInterval2: setInterval(() => this.refs.Reel2.spin(), 100)
    })
    this.setState({
      forceUpdateInterval3: setInterval(() => this.refs.Reel3.spin(), 100)
    })
    
    setTimeout(() => this.clearIntrvl(), 1000);
    setTimeout(() => this.clearIntrvl2(), 1200);
    setTimeout(() => this.clearIntrvl3(), 1400);
  }

  clearIntrvl = () => {
    clearInterval(this.state.forceUpdateInterval);
  }
  clearIntrvl2 = () => {
    clearInterval(this.state.forceUpdateInterval2);
  }
  clearIntrvl3 = () => {
    clearInterval(this.state.forceUpdateInterval3);
  }

  validateSpinButton = () => {
    return this.state.lockSpinButton
  }

  render() {
    return (
      <div>
        <WhiteRectangle
          width={300}
          height={200}
          top={-200}
        />
        <WhiteRectangle
          width={300}
          height={300}
          top={300}
        />

        <Reel ref='Reel1' sequenceNumber={0} />
        <Reel ref='Reel2' sequenceNumber={1} />
        <Reel ref='Reel3' sequenceNumber={2} />

        <div style={{ left: '350px', position: 'absolute' }}>
          <button onClick={this.spin}
            className='ui basic button icon'
            disabled={this.validateSpinButton()}
          >
            Spin
          </button>
        </div>

      </div>
    )
  }
}

class Reel extends Component {
  state = {
    items: [],
    counter: 0,
  }

  componentDidMount() {
    for (var i = 0; i < 3; i++) {
      this.spin();
    }
  }

  spin = () => {
    this.setState(prevState => {
      return {
        items: prevState.items.concat({
          top: -1,
          key: prevState.counter,
        }),
        counter: prevState.counter + 1,
      }
    })

    this.setState(prevState => {
      return {
        items: prevState.items.map((i) => {
          return Object.assign({}, i, {
            top: i.top + 1,
          });
        }),
      }
    });
    setTimeout(() => {
      this.setState(prevState => {
        if (prevState.items.length > 3) {
          return {
            items: prevState.items.slice(1)
          }
        }
      });
    }, 250)

  }

  render() {
    var ReelStyle = {
      position: 'relative',
    }
    return (
      <div style={ReelStyle}>
        <ReelItemsList
          items={this.state.items}
          sequenceNumber={this.props.sequenceNumber}
        />
      </div>
    );
  }
}

class ReelItemsList extends Component {
  render() {
    const ReelItems = this.props.items.map((item) => (
      <ReelItem
        key={item.key}
        id={item.key}
        top={item.top}
        sequenceNumber={this.props.sequenceNumber}
      />
    ))
    return (
      <div id='items'>
        {ReelItems}
      </div>
    )
  }
}

class ReelItem extends Component {
  state = {
    src: "slot-icons/slot" + this.getRandomInt() + ".jpg",
  }
  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(6)) + 1;
  }
  render() {
    var cherryStyle = {
      position: 'absolute',
      left: this.props.sequenceNumber * 100,
    }

    return (
      <div style={cherryStyle}>
        <Motion
          defaultStyle={{ y: -200 }}
          style={{
            y: spring(this.props.top ? this.props.top * 100 : 0, /*{stiffness: 170, damping: 26}*/),
          }}
        >
          {
            style => (
              <div
                style={{
                  transform: `translate3d(0, ${style.y}px, 0)`,
                }}>
                <img
                  /*className="ui small bordered image"*/
                  width="100px"
                  height="100px"
                  src={this.state.src}
                />
              </div>)
          }


        </Motion>
      </div>
    )
  }
}


export default App;
