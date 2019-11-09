import { combineReducers } from 'redux';
import {
	SELECT_USER,
	REFRESH_POSTS,
	REQUEST_POSTS,
	RECEIVE_POSTS
} from './action';

function selectedUser(state = 1, action) {
	switch(action.type) {
		case SELECT_USER:
			return action.id;
		default:
			return state;
	}
};

function posts(
	state = {
		isFetching: false,
		refreshPosts: false,
		items: [],
		receivedAt: null
	},
	action
) {
	switch(action.type) {
		case REFRESH_POSTS: 
			return {
				...state,
				refreshPosts: true
			}
		case REQUEST_POSTS: 
			return {
				...state,
				isFetching: true,
				refreshPosts: false
			}
		case RECEIVE_POSTS: {
			return {
				isFetching: false,
				refreshPosts: false,
				items: action.posts,
				receivedAt: action.receivedAt
			}
		}
		default:
			return state;
	}
};

function postsByUser(
	state = {},
	action
) {
	switch(action.type) {
		case REFRESH_POSTS:
		case REQUEST_POSTS:
		case RECEIVE_POSTS: 
			return {
				...state,
				[action.userId] : posts(state[action.userId], action)
			}
		default: 
			return state;
	}
};

export const rootReducer = combineReducers({
	selectedUser,
	postsByUser
});

export default rootReducer;
