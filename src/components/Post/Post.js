import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "components/Avatar";
import defaultPic from "../../img/default-pic.png";
import UserSection from "./UserSection";
import Timestamp from "./Timestamp";
import PostInfo from "./PostInfo";
import PostInteractions from "./PostInteractions";
import CommentSection from "./CommentSection";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  height: 375px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;

const UpperSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 25px;
`;
const LowerSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 25px;
`;

const Post = (props) => {
  const [commentsShown, setCommentsShown] = useState(false);

  const handleCommentSection = () => {
    if (commentsShown) {
      return <CommentSection />;
    }
  };

  return (
    <Root>
      <PostContainer
        style={{ backgroundImage: `url(${props.backgroundImage})` }}
      >
        <UpperSection>
          <UserSection postUser={props.postUser} />
          <Timestamp timestamp={props.timestamp} />
        </UpperSection>
        <LowerSection>
          <PostInfo
            postDescription={props.postDescription}
            postTitle={props.postTitle}
          />
          <PostInteractions commentsShown={commentsShown} setCommentsShown={setCommentsShown}/>
        </LowerSection>
      </PostContainer>
      {handleCommentSection()}
    </Root>
  );
};

export default Post;
