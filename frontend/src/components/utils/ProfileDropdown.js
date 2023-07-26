import { Avatar, Button, createStyles, Group, Menu, rem, UnstyledButton } from '@mantine/core';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconPlus,
  IconSettings
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    marginBottom: rem(120)
  },

  mainSection: {
    paddingBottom: theme.spacing.sm
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none'
    }
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  tabsList: {
    borderBottom: '0 !important'
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
    }
  },
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  }
}));

export const Profile = () => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, cx } = useStyles();
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <Link to={'/add-product'}>
        <Button leftIcon={<IconPlus />} color="green" size="sm">
          Pridėti skelbimą
        </Button>
      </Link>
      <Menu
        width={150}
        position="bottom-end"
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal>
        <Menu.Target>
          <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
            <Group spacing={7}>
              <Avatar radius="xl" size={40} />
              <IconChevronDown size={rem(12)} stroke={1.5} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => navigate('/wishlist')}
            icon={<IconHeart size="0.9rem" stroke={1.5} />}>
            Įsiminti skelbimai
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate('/profile')}
            icon={<IconSettings size="0.9rem" stroke={1.5} />}>
            Profilio nustatymai
          </Menu.Item>
          <Menu.Item onClick={() => Logout()} icon={<IconLogout size="0.9rem" stroke={1.5} />}>
            Atsijungti
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
