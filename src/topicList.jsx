import React from 'react'
import Topic from './topic'
import PropTypes from 'prop-types'

export default class TopicList extends React.Component {
  handleChangeTopic (topic) {
    this.props.onChangeTopic(topic)
  }

  render () {
    return (<ul className="topic-list">
        {this.props.topicList.map((topic, index) => {
            return <Topic topic={topic} key={index} onChangeTopic={this.handleChangeTopic.bind(this)} curTopic={this.props.curTopic} />
        })}
    </ul>)
  }
}

TopicList.propTypes = {
  onChangeTopic: PropTypes.func,
  curTopic: PropTypes.string,
  topicList: PropTypes.array
}
