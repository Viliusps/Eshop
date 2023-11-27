import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRole } from '../api/users-axios';
import { Profile } from '../utils/ProfileDropdown';
import { IconPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '75%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    },

    ...theme.fn.hover({
      backgroundColor: 'lightblue'
    })
  },

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

function Logout() {
  localStorage.clear();
  window.location.href = '/login';
}

export function NavBar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [role, setRole] = useState(null);
  const { classes, theme } = useStyles();

  useEffect(() => {
    getRole().then((data) => {
      setRole(data);
    });
  }, []);

  return (
    <Box pb={10}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <Link to="/product" className={classes.link}>
              Skelbimai
            </Link>
            {role !== 'GUEST' ? (
              <Link to="/my-products" className={classes.link}>
                Mano skelbimai
              </Link>
            ) : null}
            <Link to="/recycle" className={classes.link}>
              Rūšiuoti
            </Link>
            {role === 'ADMIN' ? (
              <>
                <Link to="/edit-products" className={classes.link}>
                  Redaguoti skelbimus
                </Link>
                <Link to="/users" className={classes.link}>
                  Visi naudotojai
                </Link>
              </>
            ) : null}
          </Group>

          {role === 'GUEST' ? (
            <Group sx={{ height: '100%' }} className={classes.hiddenMobile}>
              <Link to="/rules" className={classes.link}>
                Taisyklės
              </Link>
              <Link to="/login">
                <Button variant="default">Prisijungti</Button>
              </Link>
              <Link to="/register">
                <Button>Registruotis</Button>
              </Link>
            </Group>
          ) : null}
          {role !== 'GUEST' ? (
            <Group sx={{ height: '100%' }} className={classes.hiddenMobile}>
              <Link to="/rules" className={classes.link}>
                Taisyklės
              </Link>
              <Profile />
            </Group>
          ) : null}

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}>
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <Link to="/product" onClick={toggleDrawer} className={classes.link}>
            Skelbimai
          </Link>
          {role !== 'GUEST' ? (
            <Link to="/my-products" onClick={toggleDrawer} className={classes.link}>
              Mano skelbimai
            </Link>
          ) : null}
          <Link to="/recycle" onClick={toggleDrawer} className={classes.link}>
            Rūšiuoti
          </Link>
          {role === 'ADMIN' ? (
            <>
              <Link to="/edit-products" onClick={toggleDrawer} className={classes.link}>
                Redaguoti skelbimus
              </Link>
              <Link to="/users" onClick={toggleDrawer} className={classes.link}>
                Visi naudotojai
              </Link>
            </>
          ) : null}
          {role === 'GUEST' ? (
            <>
              <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
              <Group position="center" grow pb="xl" px="md">
                <Link to="/login" onClick={toggleDrawer}>
                  <Button variant="default">Prisijungti</Button>
                </Link>
                <Link to="/register" onClick={toggleDrawer}>
                  <Button>Registruotis</Button>
                </Link>
              </Group>
            </>
          ) : null}
          {role !== 'GUEST' ? (
            <>
              <Link to="/profile" onClick={toggleDrawer} className={classes.link}>
                Profilio nustatymai
              </Link>
              <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
              <Group position="center" grow pb="xl" px="md">
                <Link to={'/add-product'}>
                  <Button onClick={toggleDrawer} leftIcon={<IconPlus />} color="green" size="sm">
                    Pridėti skelbimą
                  </Button>
                </Link>
                <div onKeyDown={toggleDrawer}>
                  <Button onClick={() => Logout()}>Atsijungti</Button>
                </div>
              </Group>
            </>
          ) : null}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
