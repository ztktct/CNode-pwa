import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import IconAll from 'material-ui/svg-icons/content/inbox'
import IconAsk from 'material-ui/svg-icons/action/question-answer'
import IconShare from 'material-ui/svg-icons/action/timeline'
import IconJob from 'material-ui/svg-icons/action/group-work'
import IconGood from 'material-ui/svg-icons/action/thumb-up'
import IconPerson from 'material-ui/svg-icons/social/person'
import IconAbout from 'material-ui/svg-icons/action/info'

// 左侧导航配置
const leftNavConfig = [{
  key: '',
  name: '全部',
  icon: IconAll
},{
  key: 'ask',
  name: '问答',
  icon: IconAsk
},{
  key: 'share',
  name: '分享',
  icon: IconShare
},{
  key: 'job',
  name: '招聘',
  icon: IconJob
},{
  key: 'good',
  name: '精华',
  icon: IconGood
}]

export default class extends Component {
  render() {
    return <Drawer
      docked={false}
      width={200}
      open={this.props.showNav}
      onRequestChange={this.props.onRequestChange}
      containerStyle={{paddingTop: 10}}> 
      {/* 登陆 */}
      <ListItem primaryText='登陆' leftAvatar={<Avatar icon={<IconPerson />} />} />
      <Divider />
      {leftNavConfig.map(nav => (
        <MenuItem key={nav.key} 
          primaryText={nav.name} 
          leftIcon={<nav.icon />} 
          onTouchTap={this.props.onNavtap.bind(this, nav.key)}/>
      ))}
      <Divider />
      <MenuItem primaryText='关于' leftIcon={<IconAbout />}　/>
    </Drawer>
  }
}
