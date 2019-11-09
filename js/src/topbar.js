import React from 'react';
import ReactDOM from 'react-dom';
import form_style from './css/topbar.module.css';


class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input_form : ''

        };        
    }
    submithandle = (event) => {
        event.preventDefault();
        let def = this.state.input_form
        alert(this.state.input_form)
        this.setState({'input_form': ''})
    }
    changehandle = (event) => {
        let val = event.target.value
        this.setState({input_form : val})
    }
    render () {
        return (
            <div>
                <form onSubmit={this.submithandle}>
                    <input
                        className={form_style.input_form} // stlyes
                        onChange={this.changehandle}
                        placeholder="Wikipedia"
                        value = {this.state.input_form}
                    />
                </form>
            </div>
        )
    }
}
export default Topbar;