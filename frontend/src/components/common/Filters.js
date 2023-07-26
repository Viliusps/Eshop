import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
  Drawer,
  Button,
  Text,
  Group,
  Divider,
  RangeSlider,
  MultiSelect,
  ActionIcon,
  Tooltip,
  TextInput,
  Select
} from '@mantine/core';
import styled from 'styled-components';
import {
  IconHeadphones,
  IconCamera,
  IconDeviceGamepad2,
  IconBolt,
  IconDevices2,
  IconDeviceMobile,
  IconDotsCircleHorizontal,
  IconCpu,
  IconMenu2,
  IconSquareRoundedX,
  IconFilter,
  IconFilterOff
} from '@tabler/icons-react';
import { productCategories } from './productCategories';
import { findMaxPrice, findMinPrice } from '../api/products-axios';

const StyledButton = styled(Button)`
  margin-top: 5px;
`;

export function Filters({ getData }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [showButton, setShowButton] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [name, setName] = useState('');
  const [rangeValue, setRangeValue] = useState(null);
  const [state, setState] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minPrice, setMinPrice] = useState(0);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const allStates = ['Neveikianti', 'Mažai naudota', 'Naudota', 'Nauja'];

  useEffect(() => {
    localStorage.getItem('Category') && setShowButton(true);
    findMaxPrice().then((maxPrice) => {
      setMaxPrice(maxPrice);
      findMinPrice().then((minPrice) => {
        setMinPrice(minPrice);
        setRangeValue([minPrice, maxPrice]);
      });
    });
  }, []);

  const handleSubmit = () => {
    getData(name, rangeValue[0], rangeValue[1], state, sortColumn, sortDirection);
  };

  const clearFilters = () => {
    setName('');
    setRangeValue([minPrice, maxPrice]);
    setState([]);
    getData(null, null, null, [], sortColumn, sortDirection);
  };

  const handleCategoryClick = (category) => {
    setShowButton(true);
    localStorage.setItem('Category', category);
    getData(null, null, null, [], sortColumn, sortDirection);
    close();
  };

  const removeCategory = () => {
    setShowButton(false);
    localStorage.removeItem('Category');
    getData(null, null, null, [], sortColumn, sortDirection);
  };

  const sortOptions = {
    'Pigiausios viršuje': ['price', 'ASC'],
    'Brangiausios viršuje': ['price', 'DESC'],
    'A-Ž': ['name', 'ASC'],
    'Ž-A': ['name', 'DESC'],
    'Naujausios viršuje': ['createdAt', 'DESC'],
    'Seniausios viršuje': ['createdAt', 'ASC']
  };

  const handleSortChange = (selectedLabel) => {
    const [selectedSortColumn, selectedSortDirection] = sortOptions[selectedLabel];
    setSortColumn(selectedSortColumn);
    setSortDirection(selectedSortDirection);
    getData(name, rangeValue[0], rangeValue[1], state, selectedSortColumn, selectedSortDirection);
  };

  const getValueLabel = (value) => {
    const valueLabelPair = productCategories.find((pair) => pair.value === value);
    return valueLabelPair ? valueLabelPair.label : '';
  };

  const selectedCategory = getValueLabel(localStorage.getItem('Category'));

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Pasirinkite kategoriją">
        <Button.Group orientation="vertical">
          <StyledButton
            variant="gradient"
            leftIcon={<IconDeviceMobile />}
            onClick={() => handleCategoryClick('PHONES')}>
            Telefonai
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconCpu />}
            onClick={() => handleCategoryClick('COMPUTER_PARTS')}>
            Kompiuterių dalys
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconDevices2 />}
            onClick={() => handleCategoryClick('COMPUTERS')}>
            Kompiuteriai
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconBolt />}
            onClick={() => handleCategoryClick('CHARGERS')}>
            Krovikliai
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconHeadphones />}
            onClick={() => handleCategoryClick('AUDIO')}>
            Audio
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconCamera />}
            onClick={() => handleCategoryClick('CAMERAS')}>
            Kameros
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconDeviceGamepad2 />}
            onClick={() => handleCategoryClick('GAMING')}>
            Žaidimų įrenginiai
          </StyledButton>
          <StyledButton
            variant="gradient"
            leftIcon={<IconDotsCircleHorizontal />}
            onClick={() => handleCategoryClick('OTHER')}>
            Kita
          </StyledButton>
        </Button.Group>
      </Drawer>

      <Group>
        <Button onClick={open} leftIcon={<IconMenu2 />} style={{ marginLeft: '10px' }}>
          Kategorijos
        </Button>
        {showButton && (
          <Group>
            <Text>Pasirinkta kategorija: </Text>
            <Button
              variant="light"
              color="blue"
              radius="xl"
              onClick={() => removeCategory()}
              rightIcon={<IconSquareRoundedX style={{ color: '#b22527' }} />}>
              {selectedCategory}
            </Button>
          </Group>
        )}
      </Group>
      <Divider size="sm" orientation="vertical" />
      {showFilters ? (
        <Tooltip
          label="Paslėpti"
          withArrow
          transitionProps={{ transition: 'pop', duration: 300 }}
          color="blue">
          <ActionIcon
            onClick={() => {
              setShowFilters(false);
              clearFilters();
            }}>
            <IconFilterOff />
          </ActionIcon>
        </Tooltip>
      ) : (
        <Tooltip
          label="Filtruoti"
          withArrow
          transitionProps={{ transition: 'pop', duration: 300 }}
          color="blue">
          <ActionIcon onClick={() => setShowFilters(true)}>
            <IconFilter />
          </ActionIcon>
        </Tooltip>
      )}

      {showFilters && (
        <>
          <TextInput
            placeholder="Prekės pavadinimas"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '20%'
            }}>
            <label>Kaina</label>
            <RangeSlider
              min={minPrice}
              max={maxPrice}
              value={rangeValue}
              style={{ width: '100%' }}
              onChange={setRangeValue}
              radius="md"
              labelAlwaysOn
            />
          </div>
          <MultiSelect
            style={{ maxWidth: '20%' }}
            data={allStates}
            placeholder="Pasirinkite būklę/es"
            onChange={setState}
            value={state}
          />
          <Button onClick={() => handleSubmit()}>Filtruoti</Button>
          <Button onClick={() => clearFilters()}>Atstatyti</Button>
          <Divider size="sm" orientation="vertical" />
        </>
      )}
      <Select
        label="Eiliškumas"
        placeholder="Pasirinkite"
        data={[
          'Pigiausios viršuje',
          'Brangiausios viršuje',
          'A-Ž',
          'Ž-A',
          'Naujausios viršuje',
          'Seniausios viršuje'
        ]}
        onChange={(e) => {
          handleSortChange(e);
        }}
      />
    </>
  );
}

Filters.propTypes = {
  getData: function (props, propName, componentName) {
    if (typeof props[propName] !== 'function') {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Validation failed.`);
    }
  }
};
