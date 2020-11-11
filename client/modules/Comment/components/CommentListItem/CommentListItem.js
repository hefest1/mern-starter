import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './CommentListItem.css';

// Import components
import CommentCreateWidget from '../CommentCreateWidget/CommentCreateWidget';

//Import actions
import { editCommentRequest, editCommentFormHandler } from '../../CommentActions';

// Import selectors 
import { getEditCommentForm } from '../../CommentReducer';

class CommentListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showEdit: false,
        }
    }

    changeCommentHandler = (e) => this.props.dispatch(editCommentFormHandler({ comment: e.target.value }));

    changeAuthorHandler = (e) => this.props.dispatch(editCommentFormHandler({ author: e.target.value }));

    submitEdit = () => {
        const { editForm, comment, dispatch, id } = this.props;
        const editedComment = {
            comment: editForm.comment,
            author: editForm.author,
            postId: comment.postId,
        };

        dispatch(editCommentRequest(id, editedComment));
        this.setState({showEdit: false})
    }

    openEditForm = () => {
        const { dispatch, comment } = this.props;
        dispatch(editCommentFormHandler({ comment: comment.comment, author: comment.author }))
        this.setState({ showEdit: true });
    }

    closeEditForm = () => {
        this.props.dispatch(editCommentFormHandler({ comment: '', author: '' }))
        this.setState({ showEdit: false });
    }

    render() {
        const {
            comment,
            onDelete,
            editForm,
        } = this.props;

        const item = (
            <div className={styles.wrapper}>
                <p className={styles.comment}>{comment.comment}</p>
                <p className={styles.author}>{comment.author}</p>
                <div className={styles['btns-line']}>
                    <button className={`${styles.btn} ${styles['edit-btn']}`} type="button" onClick={this.openEditForm}>Edit</button>
                    <button className={`${styles.btn} ${styles['del-btn']}`} type="button" onClick={onDelete}>Delete</button>
                </div>
            </div>
        );

        const editMarkUp = (
            <div className={styles['edit-wrapper']}>
                <button className={`${styles.btn} ${styles['cancel-btn']}`} type="button" onClick={this.closeEditForm}>Cancel</button>
                <CommentCreateWidget
                    commentValue={editForm.comment}
                    authorValue={editForm.author}
                    onChangeComment={this.changeCommentHandler}
                    onChangeAuthor={this.changeAuthorHandler}
                    submitComment={this.submitEdit}
                    submitText={"Save"}
                />
            </div>
        );
        return (
            <Fragment>
                {
                    this.state.showEdit
                        ? editMarkUp
                        : item
                }
            </Fragment>
        );
    }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
    return {
        editForm: getEditCommentForm(state),
    };
}

CommentListItem.propTypes = {
    comment: PropTypes.shape({
        comment: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    editForm: PropTypes.shape({
        comment: PropTypes.string,
        author: PropTypes.string
    }),
}

export default connect(mapStateToProps)(CommentListItem);