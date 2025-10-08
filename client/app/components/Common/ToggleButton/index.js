import React, { Component } from "react";
import Switch from "react-switch";

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.checked,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  }

  render() {
    const { label, className = '' } = this.props;
    return (
      <label>
        <div>
          <span>{label}</span>
        </div>
        <Switch
          onChange={this.handleChange}
          checked={this.state.checked}
          className={className}
        />
      </label>
    );
  }
}

export default ToggleSwitch;
