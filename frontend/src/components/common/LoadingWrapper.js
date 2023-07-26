import React from 'react';
import { Alert, LoadingOverlay } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import styled from 'styled-components';

const StyledLoading = styled(LoadingOverlay)`
  height: 100vh; /* Magic here */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingWrapper(children) {
  if (children.loading) return <StyledLoading visible />;
  else if (children.error)
    return (
      <Alert
        icon={<IconAlertCircle size="1rem" />}
        style={{ minWidth: '200px', maxWidth: '500px', margin: 'auto' }}
        title="Klaida!"
        color="red">
        Įvyko serverio klaida. Bandykite vėliau.
      </Alert>
    );
  return <>{children.children}</>;
}
