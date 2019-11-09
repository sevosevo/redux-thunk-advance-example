import axios from 'axios';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_USER = 'SELECT_USER';
export const REFRESH_POSTS = 'REFRESH_POSTS';
export const RECEIVE_POSTS_ERROR = 'RECEIVE_POSTS_ERROR';

export function selectUser(userId) {
	return {
		type: SELECT_USER,
		id: userId
	}
};

export function refreshPosts(userId) { 
	return {
		type: REFRESH_POSTS,
		userId: userId
	}
};

function requestPosts(userId) {
	return {
		type: REQUEST_POSTS,
		userId
	}
};

function receivePosts(userId, posts) {
	return {
		type: RECEIVE_POSTS,
		userId,
		posts,
		receivedAt: Date.now()
	}
};

function receivePostsError(userId, error) {
	return {
		type: RECEIVE_POSTS_ERROR,
		error: error.message
	}
}

export function fetchPosts(userId) {

	return async dispatch => {

		dispatch(requestPosts(userId));

		try {

			const posts = ( await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`) ).data;

			dispatch(receivePosts(userId, posts));

		} catch(err) {

			dispatch(receivePostsError(err));

		}

	}

}

function shouldFetchPosts(state, userId) {
	const posts = state.postsByUser[userId];

	if(!posts)
		return true;
	else if (posts.isFetching) 
		return false;
	else 
		return posts.refreshPosts
}

export function fetchPostsIfNeeded(userId) {
	return (dispatch, getState) => {

		if(shouldFetchPosts(getState(), userId)) 
			dispatch(fetchPosts(userId))

	}
}