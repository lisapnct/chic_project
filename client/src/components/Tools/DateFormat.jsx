import React, { Component } from 'react';
import dayjs from 'dayjs';

export default class DateFormat extends Component {
    
    changeDate = (date) => {
        return dayjs(date).format(this.props.format)
    }
    
    render() {
        return (
            <div>
                {this.changeDate(this.props.date)}
            </div>
        )
    }
}
