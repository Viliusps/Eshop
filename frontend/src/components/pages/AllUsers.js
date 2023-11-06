import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  ScrollArea,
  useMantineTheme,
  Divider,
  Modal,
  Button,
  createStyles,
  Tooltip,
  Pagination
} from '@mantine/core';
import { IconLockAccess, IconLockAccessOff, IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { getAllUsers, getID } from '../api/users-axios';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoadingWrapper from '../common/LoadingWrapper';

const jobColors = {
  user: 'blue',
  admin: 'lime',
  blocked: 'red'
};

const Cancel = styled(Button)`
  margin: 0;
  float: left;
  margin-left: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
  margin-bottom: 25px;
  margin-top: 10px;
`;

const Approve = styled(Button)`
  margin: 0;
  float: right;
  margin-right: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
  margin-bottom: 25px;
  margin-top: 10px;
`;

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  }
}));

// eslint-disable-next-line react/prop-types
export default function AllUsers({ deleteUser, adminUpdateUser }) {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [users, setUsers] = useState([]);
  const [chosenDeleteUser, setDeleteUser] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePage, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    setPage(1);
    getAllUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        navigate('/product');
      })
      .finally(() => {
        setLoading(false);
      });
    getID().then((data) => {
      setId(data);
    });
  }, []);

  const handleDelete = () => {
    deleteUser(chosenDeleteUser.id).then(() => {
      getAllUsers().then((data) => {
        setUsers(data);
        showToastMessage();
      });
    });
    close();
  };

  function giveAccess(user) {
    adminUpdateUser(user.id, user.username, user.email, user.phone, user.password, 'USER').then(
      () => {
        getAllUsers().then((data) => {
          setUsers(data);
          showAccessToastMessage();
        });
      }
    );
  }

  function blockAccess(user) {
    adminUpdateUser(user.id, user.username, user.email, user.phone, user.password, 'BLOCKED').then(
      () => {
        getAllUsers().then((data) => {
          setUsers(data);
          showAccessToastMessage();
        });
      }
    );
  }

  const showAccessToastMessage = () => {
    toast.success('Prieiga pakeista!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  };

  const showToastMessage = () => {
    toast.success('Pašalinta sėkmingai!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  };

  const chunks = users.reduce((acc, curr) => {
    if (acc.length === 0 || acc[acc.length - 1].length === pageSize) {
      acc.push([]);
    }
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <LoadingWrapper loading={loading} error={error}>
      <div className="details" style={{ maxWidth: 850 }}>
        <div className={classes.hiddenMobile}>
          <ScrollArea>
            <Table horizontalSpacing="xl" verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Naudotojas</th>
                  <th>Rolė</th>
                  <th>El. paštas</th>
                  <th>Tel. nr.</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {chunks.length > 0 && (
                  <>
                    {chunks[activePage - 1].map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Group spacing="sm">
                            <Avatar size={30} radius={30} />
                            <Text fz="sm" fw={500}>
                              {user.username}
                            </Text>
                          </Group>
                        </td>
                        <td>
                          <Badge
                            color={jobColors[user.role.toLowerCase()]}
                            variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
                            {user.role}
                          </Badge>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <Text fz="sm" c="dimmed">
                            {user.phone}
                          </Text>
                        </td>
                        <td>
                          {id !== user.id ? (
                            <Group spacing={0} position="right">
                              <Tooltip
                                label="Redaguoti"
                                withArrow
                                transitionProps={{ transition: 'pop', duration: 300 }}
                                color="blue">
                                <ActionIcon onClick={() => navigate('/users/' + user.id)}>
                                  <IconPencil size="1.3rem" stroke={1.5} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip
                                label="Ištrinti"
                                withArrow
                                transitionProps={{ transition: 'pop', duration: 300 }}
                                color="blue">
                                <ActionIcon
                                  data-testid="istrinti"
                                  onClick={() => {
                                    setDeleteUser(user);
                                    open();
                                  }}
                                  color="red">
                                  <IconTrash size="1.3rem" stroke={1.5} />
                                </ActionIcon>
                              </Tooltip>
                              {user.role === 'BLOCKED' ? (
                                <Tooltip
                                  label="Atblokuoti"
                                  withArrow
                                  transitionProps={{ transition: 'pop', duration: 300 }}
                                  color="blue">
                                  <ActionIcon
                                    data-testid="atblokuoti"
                                    onClick={() => giveAccess(user)}
                                    color="green">
                                    <IconLockAccess size="1.3rem" stroke={1.5} />
                                  </ActionIcon>
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  label="Užblokuoti"
                                  withArrow
                                  transitionProps={{ transition: 'pop', duration: 300 }}
                                  color="blue">
                                  <ActionIcon
                                    data-testid="blokuoti"
                                    onClick={() => blockAccess(user)}
                                    color="red">
                                    <IconLockAccessOff size="1.3rem" stroke={1.5} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </Group>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </Table>
            <Pagination
              total={chunks.length}
              page={activePage}
              onChange={setPage}
              position="center"
              style={{ marginTop: '30px', marginBottom: '10px' }}
            />
          </ScrollArea>
        </div>
        <Modal opened={opened} onClose={close} withCloseButton={false} xOffset="0vh" centered>
          <h2 style={{ textAlign: 'center' }}>
            Ar tikrai norite ištrinti
            <br />
            &quot;{chosenDeleteUser.username}&quot;?
          </h2>
          <Divider my="sm" />
          <div>
            <Cancel color="indigo" radius="xl" size="lg" onClick={close}>
              Atšaukti
            </Cancel>
            <Approve
              color="red"
              radius="xl"
              size="lg"
              leftIcon={<IconTrash />}
              onClick={handleDelete}>
              Patvirtinti
            </Approve>
          </div>
        </Modal>
      </div>
    </LoadingWrapper>
  );
}
