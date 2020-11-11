import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import CommentList from '../../../Comment/components/CommentList';
import CommentCreateWidget from '../../../Comment/components/CommentCreateWidget/CommentCreateWidget';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { 
  deleteCommentRequest, 
  commentFormHandler, 
  addComment,
  editCommentFormHandler,
} from '../../../Comment/CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments, getCommentForm } from '../../../Comment/CommentReducer';

export class PostDetailPage extends Component {
  handleDeleteComment = id => {
    if (confirm('Do you want to delete this comment')) {
      this.props.dispatch(deleteCommentRequest(id));
    }
  }

  handleCommentOnChange = e => {
    this.props.dispatch(commentFormHandler({ comment: e.target.value }));
  }

  handleCommentAuthorOnChange = e => {
    this.props.dispatch(commentFormHandler({ author: e.target.value }));
  }

  handleAddComment = () => {
    if (this.props.commentForm.comment.length !== 0
      && this.props.commentForm.author.length !== 0) {
      const comment = {
        postId: this.props.post.cuid,
        author: this.props.commentForm.author,
        comment: this.props.commentForm.comment,
      };
      this.props.dispatch(addComment(comment));
      this.props.dispatch(commentFormHandler({ author: '', comment: '' }))
    }

  }

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <CommentCreateWidget
          commentValue={this.props.commentForm.comment}
          authorValue={this.props.commentForm.author}
          onChangeComment={this.handleCommentOnChange}
          onChangeAuthor={this.handleCommentAuthorOnChange}
          submitComment={this.handleAddComment}
          submitText="Add comment"
        />
        <CommentList
          comments={this.props.comments}
          handleDeleteComment={this.handleDeleteComment}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getComments(state, props.params.cuid),
    commentForm: getCommentForm(state),
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    comment: PropTypes.string,
    author: PropTypes.string.isRequired,
    postId: PropTypes.string.isRequired,
  })).isRequired,
  commentForm: PropTypes.shape({
    comment: PropTypes.string,
    author: PropTypes.string
  }),
};

export default connect(mapStateToProps)(PostDetailPage);
