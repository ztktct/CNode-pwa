import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import { fetchTopicDetails } from '../apis';
import { semanticTime } from '../utils';

export default class extends Component {
  state = {
    details: '',
    topic: {},
    replies: [],
    loading: 'loading'
  }
  componentDidMount() {
    fetchTopicDetails(this.props.match.params.id).then(result => {
      if (result.success) {
        this.setState({
          details: result.data.content,
          topic: result.data,
          replies: result.data.replies,
          loading: 'hide'
        })
      }
    })
  }
  render() {
    const topic = this.state.topic
    return <main className='page topicPage'>
      <AppBar
        title={topic.title || '话题'}
        style={{ backgroundColor: '#444' }}
        iconElementLeft={<IconButton><NavigationBack /></IconButton>}
        onLeftIconButtonTouchTap={this.props.history.goBack} />
      <div className="page-content">
        {this.state.loading === 'loading' ?
          <RefreshIndicator
            className='refresh'
            left={50}
            top={0}
            status={this.state.loading} /> :
          <div>
            <h2 className='topicTitle'>{topic.title}</h2>
            <ListItem
              disabled={true}
              className='topicInfo'
              leftAvatar={<Avatar style={{ marginTop: 4 }} src={topic.author && topic.author.avatar_url} />}
              primaryText={<h5>{topic.author && topic.author.loginname}</h5>}
              secondaryText={<div>
                <p>创建于{semanticTime(topic.create_at)}&nbsp;&nbsp;{topic.visit_count}次浏览</p>
              </div>} />
            <div className="markdown-body" dangerouslySetInnerHTML={{
              __html: this.state.details
            }}></div>
            <Divider />
            {/* 回复列表 */}
            {this.state.replies.map(replay => <div className='replayItem' key={replay.id}>
              <ListItem
                disabled={true}
                className='topicInfo'
                leftAvatar={<Avatar style={{ marginTop: 4 }} src={replay.author && replay.author.avatar_url} />}
                primaryText={<h5>{replay.author && replay.author.loginname}</h5>}
                secondaryText={<div>
                  <p>发表于{semanticTime(replay.create_at)}</p>
                </div>} />
                <div className="markdown-body" dangerouslySetInnerHTML={{
                  __html: replay.content
                }}></div>
              </div>)
            }
          </div>}
      </div>
    </main>
  }
}