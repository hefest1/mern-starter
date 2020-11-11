import React from 'react';
import PropTypes from 'prop-types';

import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = (props) => {
    return (
        <div>
            {
                props.comments.map((comment, idx) => (
                    <CommentListItem
                        comment={comment}
                        id={idx}
                        onDelete={() => props.handleDeleteComment(idx)}
                        key={idx + comment.comment}
                    />
                ))
            }
        </div>
    )
}

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        comment: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired
    })),
    handleDeleteComment: PropTypes.func.isRequired,
};

export default CommentList;