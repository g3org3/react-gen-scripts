import React, { Component } from 'react';
// import Sidebar from './Sidebar';
import {
  AppBar
} from 'material-ui'
import Container from './Container'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = { open: false };
  }

  toggleSidebar() {
    this.setState({ open: !this.state.open })
  }

  render() {
    return <div>
      {/*<Sidebar open={this.state.open} toggleSidebar={this.toggleSidebar} />*/}
      <AppBar 
        title="Jarvis Dash"
        onLeftIconButtonTouchTap={this.toggleSidebar}
      />
      <Container>
        {this.props.children}
      </Container>
    </div>
  }
}

export default Layout;