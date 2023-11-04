import React, { useEffect, useState } from 'react';
import { Anchor } from '@mantine/core';
import { getLocations } from '../api/locations-axios';
import LoadingWrapper from '../common/LoadingWrapper';
import Map from '../utils/Map';

export default function RecycleInfo() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const mapStyle = {
    height: '80%',
    width: '80%',
    display: 'inline-block'
  };

  useEffect(() => {
    getLocations()
      .then((data) => {
        setLocations(data);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <LoadingWrapper loading={loading} error={error}>
        <h2 style={{ margin: 'auto', width: '90%', textAlign: 'center' }}>
          Elektroninių įrenginių ir jų komponentų rūšiavimo vietos Lietuvoje
        </h2>
        <p data-testid="nepavyko" style={{ textAlign: 'left' }}>
          Nepavyko parduoti prekės? Šiame žemėlapyje pažymėtos atliekų rūšiavimo vietos, kuriose
          galite palikti savo įrenginį ar įrenginio dalį. Daugiau informacijos galite rasti
          apsilankę adresu{' '}
          <Anchor
            data-testid="button"
            component="button"
            type="button"
            onClick={() =>
              window.open(
                'https://atliekos.lt/miestas/vilniaus-m/paslauga/elektronikos-atliekos/',
                '_blank'
              )
            }>
            atliekos.lt
          </Anchor>
        </p>
        <Map data={locations} style={mapStyle} />
      </LoadingWrapper>
    </div>
  );
}
