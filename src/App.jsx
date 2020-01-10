import React from 'react';
import {
  init,
  createCone,
  createCube,
  createPlane,
  createSphere
} from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.02,
      renderer: null,
      scene: null,
      camera: null,
      sphere: null,
      cone: null,
      cube: null,
      plane: null,
      light: null
    };
  }

  componentDidMount = () => {
    const cone = createCone(3, 4, 20, 1, true);
    const cube = createCube(5, 5, 5);
    const plane = createPlane(1000, 1000, 50, 50);
    const sphere = createSphere(1, 30, 30);
    const start = init([cone, cube, plane, sphere], { z: 20 });
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera, light } = start;
    this.setState({
      renderer,
      scene,
      camera,
      cone,
      cube,
      plane,
      light,
      sphere
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const {
      ADD,
      scene,
      camera,
      renderer,
      cone,
      cube,
      plane,
      light,
      sphere
    } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      cone !== null &&
      cube !== null &&
      plane !== null &&
      light !== null &&
      sphere !== null
    ) {
      light.position.x += ADD;
      sphere.position.x += ADD;
      if (light.position.x > 10 || light.position.x < -10) {
        this.setState({
          ADD: ADD * -1
        });
      }
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div ref="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
