import {
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    CREATE_COMMENT_FORM_HANDLER,
    EDIT_COMMENT_FORM_HANDLER,
} from './CommentActions';

const mock = {
    list: [
        {
            comment: 'Some comment',
            postId: 'cikqgkv4q01ck7453ualdn3hf',
            author: 'Some author'
        }
    ],
}

const initialState = {
    list: [...mock.list],
    createForm: {
        comment: '',
        author: '',
    },
    editForm: {
        comment: '',
        author: '',
    }
};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            const { author, comment, postId } = action;
            return Object.assign({}, state, { list: [{ author, comment, postId }, ...state.list] });
        }

        case EDIT_COMMENT: {
            const { comment, id } = action;
            let newData = [...state.list];
            newData[id].comment = comment.comment;
            newData[id].author = comment.author;
            return Object.assign({}, state, { list: [...newData] });
        }

        case DELETE_COMMENT: {
            const newList = state.list.filter((c, idx) => idx !== action.id);
            return Object.assign({}, state, { list: newList });
        }

        case CREATE_COMMENT_FORM_HANDLER: {
            const createForm = Object.assign({}, state.createForm, action.comment);
            return Object.assign({}, state, { createForm });
        }

        case EDIT_COMMENT_FORM_HANDLER: {
            const editForm = Object.assign({}, state.editForm, action.comment);
            return Object.assign({}, state, { editForm });
        }

        default:
            return state;
    }
}

// Selectors

export const getComments = (state, postId) => state.comments.list.filter(c => c.postId === postId);
export const getCommentForm = (state) => state.comments.createForm;
export const getEditCommentForm = (state) => state.comments.editForm;

export default CommentReducer;