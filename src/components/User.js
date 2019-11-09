import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { selectUser } from '../state/action';
import { Col } from 'reactstrap';

export function User (props) {

	const { 
		id,
		name,
		username, 
		email,
		selectedUser
	} = props;

	let styles = {cursor: 'pointer'};

	if( selectedUser === id ) {
		styles = {...styles, borderBottom: '1px solid black'};
	}

	return <Col md={4}><div onClick={handleClick} style={styles}>
		<h4>{ name }</h4>
		<h6>{ username }</h6>
		<p>{ email }</p>
	</div></Col>;


	function handleClick() {
		props.selectUser(id);
	}
}

const mapDispatchToProps = {
	selectUser
}

const mapStateToProps = state => ({
	selectedUser: state.selectedUser
});

export default connect(mapStateToProps, mapDispatchToProps)(User);