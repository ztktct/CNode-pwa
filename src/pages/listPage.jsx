import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { Link } from 'react-router-dom';
import LeftNav from '../components/leftNav.jsx';
import { semanticTime } from '../utils';
import { fetchTopicList } from '../apis';

const TAB_CN = {
	ask: '问答',
	share: '分享',
	job: '招聘'
}

// 一条列表
const Item = (props) => {
	const li = props.li
	return <Link to={`/topic/${li.id}`}>
		<ListItem
		className='item'
		leftAvatar={<Avatar style={{marginTop: 8}} src={li.author && li.author.avatar_url} />}
		primaryText={<h3 className='item-primary'>{li.title}</h3>}
		secondaryText={<div className='item-secondry'>
			<p>
				<span className='item-tab'>{li.top ? '置顶' : TAB_CN[li.tab]}</span>
				<span className='item-info'><em>{li.reply_count}</em> 回复 / {li.visit_count} 浏览</span>
			</p>
			<span>{semanticTime(li.last_reply_at)}</span>
		</div>} />
	</Link>
}

export default class extends Component {
	state = {
		showNav: false,  // 是否显示左侧导航
		currentPage: 1,	// 当前页
		list: [],	// 页面列表数据
		refresh: 'hide', // 刷新状态
		currentKey: '', // 当前分类
	}

	// 切换左侧导航
	toggleNav = () => this.setState({ showNav: !this.state.showNav })
	// 关闭左侧导航
	closeNav = () => this.setState({ showNav: false })

	// 获取列表
	fetchTopicList = async (page, key) => {
		if(this.state.refresh === 'loading') return;
		this.setState({ refresh: 'loading' })
		const result = await fetchTopicList(page, key);
		if (result.success) {
			this.setState({
				list: page === 1 ? result.data : this.state.list.concat(result.data),
				currentPage: page + 1,
			})
		}
		this.setState({ refresh: 'hide' })
	}

	// 刷新列表
	refreshList = (key = '') => {
		this.setState({
			showNav: false,
			currentKey: key
		})
		this.fetchTopicList(1, key).then(() => {
			this.setState({
				currentPage: 2
			})
		})
	}

	// 上拉加载
	loadData = (e) =>{
		const target = e.target;
		if(target.scrollTop + target.offsetHeight + 200 >= target.scrollHeight){
			this.fetchTopicList(this.state.currentPage, this.state.currentKey)
		}
	}

	componentDidMount() {
		this.refreshList()
	}

	render() {
		return <main className='page listPage'>
			<AppBar
				className='page-navbar'
				title='CNode 社区'
				style={{ backgroundColor: '#444' }}
				onLeftIconButtonTouchTap={this.toggleNav} />
			<LeftNav
				showNav={this.state.showNav}
				onRequestChange={open => this.setState({ showNav: open })}
				onNavtap={this.refreshList} />
			<List className='page-content'
				onScroll={this.loadData}>
				<RefreshIndicator
					className="refresh"
					size={40}
					left={50}
					top={0}
					status={this.state.refresh} />
				{this.state.list.map((li, index) => <Item key={li.id || index} li={li} />)}
			</List>
		</main>
	}
}