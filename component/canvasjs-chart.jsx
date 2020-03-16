import React from 'react';
import dynamic from 'next/dynamic';

class ClientCanvasJSChart extends React.Component {
  static _cjsContainerId = 0;

  constructor(props) {
    super(props);

    this.options = props.options ? props.options : {};

    this.containerProps = props.containerProps
      ? props.containerProps
      : { width: '100%', position: 'relative' };

    this.containerProps.height =
      props.containerProps && props.containerProps.height
        ? props.containerProps.height
        : this.options.height
        ? this.options.height + 'px'
        : '400px';

    this.chartContainerId =
      'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++;
  }

  componentDidMount() {
    const CanvasJS = window.CanvasJS;
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
    this.chart.render();
  }
  shouldComponentUpdate(nextProps, _) {
    return !(nextProps.options === this.options);
  }
  componentDidUpdate() {
    this.chart.options = this.props.options;
    this.chart.render();
  }
  componentWillUnmount() {
    this.chart.destroy();
    if (this.props.onRef) this.props.onRef(undefined);
  }
  render() {
    return <div id={this.chartContainerId} style={this.containerProps} />;
  }
}

export const CanvasJSChart = dynamic(
  () => Promise.resolve(ClientCanvasJSChart),
  {
    ssr: false,
  },
);
