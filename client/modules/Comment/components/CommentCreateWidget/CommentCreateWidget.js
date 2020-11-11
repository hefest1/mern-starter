import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommentCreateWidget.css';

function CommentCreateWidget(props) {
    return (
        <div className={styles.wrapper}>
            <textarea
            className={styles['comment-field']}
                placeholder="Enter comment"
                onChange={props.onChangeComment}
                value={props.commentValue}
            ></textarea>
            <input
            className={styles['author-field']}
                placeholder="Enter author"
                value={props.authorValue}
                onChange={props.onChangeAuthor}
            />
            <button type="button" className={styles['submit-btn']} onClick={props.submitComment}>{props.submitText}</button>
        </div >
    );
}

CommentCreateWidget.propTypes = {
    commentValue: PropTypes.string,
    authorValue: PropTypes.string,
    onChangeComment: PropTypes.func.isRequired,
    onChangeAuthor: PropTypes.func.isRequired,
    submitComment: PropTypes.func.isRequired,
    submitText: PropTypes.string.isRequired,
}

export default CommentCreateWidget;