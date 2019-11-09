import React from 'react';
import axios from 'axios';
import { fetchPostsIfNeeded, refreshPosts } from '../state/action';
import { connect } from 'react-redux'; 
import { Row, Button } from 'reactstrap';

const mapStateToProps = state => ({
	post: state.postsByUser[state.selectedUser] || {
		isFetching: false,
		items: [],
		notFetched: true
	},
	selectedUser: state.selectedUser
});

const mapDispatchToProps = {
	fetchPostsIfNeeded,
	refreshPosts
};

export const Post = connect(mapStateToProps, mapDispatchToProps)(class Post extends React.Component {

	constructor(props) {
		super(props);

		this.handleSearchPostsByUser = this.handleSearchPostsByUser.bind(this);
		this.refreshPosts = this.refreshPosts.bind(this);
	}

	async handleSearchPostsByUser() {	
		this.props.fetchPostsIfNeeded(this.props.selectedUser)
	}

	refreshPosts() {
		this.props.refreshPosts(this.props.selectedUser);
		this.props.fetchPostsIfNeeded(this.props.selectedUser);
	}

	render() {
		const { isFetching, items, notFetched } = this.props.post;

		return <div>
			<h3>List of posts</h3>
				<div>
					{ !isFetching && items.length === 0 && <Button outline color="danger" onClick = {this.handleSearchPostsByUser} >Find posts by selected user</Button> }
					{ !isFetching && !notFetched && <Button onClick={this.refreshPosts} outline color="warning">Refresh</Button> }
				</div>
			<hr />
			<div>
				{
					isFetching && <div>Loading</div>
				}
				{
					!isFetching && !notFetched && items.length === 0  && <div>Empty</div>
				}
				{
					items.length > 0 && <Row>{ items.map(item => <div key={item.id}><h4>{item.title}</h4><p>{item.body}</p></div>) }</Row>
				}
			</div>
		</div>
	}

});

export default Post;