import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route } from 'react-router-dom';
import ListPage from './pages/listPage.jsx';
import TopicPage from './pages/topicPage.jsx';

export default class extends Component {
	render() {
		return <MuiThemeProvider>
			<div>
				{/* 总是匹配首页，首页默认不销毁 */}
				<Route component={ListPage}></Route>
				<Route path='/topic/:id?' key='topicDetails' component={TopicPage} />
			</div>
		</MuiThemeProvider>
	}
}