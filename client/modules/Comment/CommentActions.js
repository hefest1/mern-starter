import callApi from '../../util/apiCaller';

// Export Constants 
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const CREATE_COMMENT_FORM_HANDLER = 'CREATE_COMMENT_FORM_HANDLER';
export const EDIT_COMMENT_FORM_HANDLER = 'EDIT_COMMENT_FORM_HANDLER';

// Export Actions 
export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment: comment.comment,
        author: comment.author,
        postId: comment.postId,
    }
}

export function addCommentRequest(comment) {
    return dispatch => {
        return callApi('comments', 'post', {
            comment: {
                comment: comment.comment,
                author: comment.author,
                postId: comment.postId,
            }
        }).then(res => dispatch(addComment(comment)));
    }
}

export function editComment(id, comment) {
    return {
        type: EDIT_COMMENT,
        id,
        comment,
    }
}

export function editCommentRequest(id, comment) {
    return dispatch => {
        return callApi(`comments/${id}`, 'put', {
            comment: {
                comment: comment.comment,
                author: comment.author,
                postId: comment.postId,
            }
        }).then(res => dispatch(editComment(id, comment)));
    }
}

export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id,
    }
}

export function deleteCommentRequest(id) {
    return dispatch => {
        return callApi(`comments/${id}`, 'delete')
            .then(() => dispatch(deleteComment(id)));
    }
}

export function commentFormHandler(comment) {
    return {
        type: CREATE_COMMENT_FORM_HANDLER,
        comment
    }
}

export function editCommentFormHandler(comment) {
    return {
        type: EDIT_COMMENT_FORM_HANDLER,
        comment
    }
}