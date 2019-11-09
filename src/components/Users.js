import React from 'react';
import axios from 'axios';
import User from './User';
import { Row, Button } from 'reactstrap';

export class Users extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: []
		};

		this.handleSearchUsers = this.handleSearchUsers.bind(this);
	}

	async handleSearchUsers() {	
		const response = await axios.get('https://jsonplaceholder.typicode.com/users');
		const users = response.data;
		this.setState({users});
	}

	render() {
		const { users } = this.state;
		return <div>
			<div>
				<h3>List of users</h3>
				{
					users.length === 0 && <div>
						<Button outline color="primary" onClick = {this.handleSearchUsers} >Find users</Button>
					</div>
				}
				<hr />
				<div>
					{
						users.length > 0 && <Row>{users.map(user => <User {...user} key={user.id} />)}</Row>
					}
				</div>
			</div>
		</div>
	}

};

export default Users;