import {
  createStyles,
  Text,
  Button,
  Textarea,
  Avatar,
  Group,
  rem,
  Divider,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { useEffect, useState } from 'react';
import LoadingWrapper from '../common/LoadingWrapper';
import {
  getCommentsByProductId,
  likeComment,
  postComment,
  getUserLikedComments
} from '../api/comments-axios';
import { getAllUsers, getID } from '../api/users-axios';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm
  }
}));

export default function Comments(data) {
  const { classes } = useStyles();
  const product_id = parseInt(data.data);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLikedComments, setUserLikedComments] = useState([]);
  const [userDislikedComments, setUserDislikedComments] = useState([]);
  const [users, setUsers] = useState([]);

  const [comment, setComment] = useState(null);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    getList();
    getAllUsers().then((data) => {
      setUsers(data);
    });
    getID().then((data) => {
      setUserId(data);
      if (data !== 'GUEST') {
        getUserLikedComments(data, product_id, 'LIKE').then((data) => {
          setUserLikedComments(data);
        });
        getUserLikedComments(data, product_id, 'DISLIKE').then((data) => {
          setUserDislikedComments(data);
        });
      }
    });
  }, []);

  async function getList() {
    getCommentsByProductId(product_id)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleClick = async () => {
    if (!comment) {
      setCommentError('Privaloma užpildyti');
    } else {
      const date = new Date();
      postComment(comment, userId, product_id, date).then(() => {
        getList();
      });
    }
  };

  const handleLike = (status, comment_id) => {
    likeComment(userId, comment_id, status).then(() => {
      getList();
      getUserLikedComments(userId, product_id, 'LIKE').then((data) => {
        setUserLikedComments(data);
      });
      getUserLikedComments(userId, product_id, 'DISLIKE').then((data) => {
        setUserDislikedComments(data);
      });
    });
  };

  return (
    <div style={{ width: '90%' }}>
      <LoadingWrapper loading={loading} error={error}>
        <h1>Komentarai</h1>
        {userId !== 'GUEST' && (
          <>
            <Textarea
              style={{ marginBottom: '10px' }}
              label="Jūsų komentaras"
              radius="md"
              error={commentError}
              onChange={(event) => setComment(event.currentTarget.value)}
            />
            <Button
              style={{ marginBottom: '10px' }}
              onClick={() => {
                handleClick();
              }}>
              Pateikti
            </Button>
            <Divider my="sm" />
          </>
        )}
        {comments.length > 0 ? (
          <>
            {comments.map((comment) => (
              <div key={comment.id}>
                <div style={{ display: 'flex' }}>
                  {' '}
                  <div style={{ width: '80%' }}>
                    <Group>
                      <Avatar radius="xl" />
                      <div>
                        <Text size="sm">
                          {users.map((e) => (e.id === comment.user_id ? e.username : ''))}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {new Date(comment.date).toLocaleString('LT', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Text>
                      </div>
                    </Group>
                    <Text className={classes.body} size="sm" style={{ wordWrap: 'break-word' }}>
                      {comment.text}
                    </Text>
                  </div>
                  <div
                    style={{
                      width: '20%',
                      margin: 'auto',
                      textAlign: 'center',
                      right: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}>
                    {userId !== 'GUEST' && (
                      <>
                        <Group spacing={0} position="right">
                          <Tooltip
                            label="Patinka"
                            withArrow
                            transitionProps={{ transition: 'pop', duration: 300 }}
                            color="blue">
                            <ActionIcon
                              onClick={() => {
                                handleLike('LIKE', comment.id);
                              }}>
                              {userLikedComments.indexOf(comment.id) >= 0 ? (
                                <IconThumbUp fill="green" color="black" />
                              ) : (
                                <IconThumbUp />
                              )}
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip
                            label="Nepatinka"
                            withArrow
                            transitionProps={{ transition: 'pop', duration: 300 }}
                            color="blue">
                            <ActionIcon
                              onClick={() => {
                                handleLike('DISLIKE', comment.id);
                              }}>
                              {userDislikedComments.indexOf(comment.id) >= 0 ? (
                                <IconThumbDown fill="red" color="black" />
                              ) : (
                                <IconThumbDown />
                              )}
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                        <Group spacing={0} position="right">
                          <Text c="dimmed">{comment.likeCount}</Text>
                        </Group>
                      </>
                    )}
                  </div>
                </div>
                <Divider my="sm" />
              </div>
            ))}
          </>
        ) : (
          <center>
            <Text c="dimmed" style={{ marginBottom: '5px' }}>
              Šiuo metu komentarų nėra.
            </Text>
          </center>
        )}
      </LoadingWrapper>
    </div>
  );
}
