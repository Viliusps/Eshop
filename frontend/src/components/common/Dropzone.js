import React, { useState } from 'react';
import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';

export function ImageDropzone({ onImageUpload, imageError, defaultImage, imageSrc }) {
  const theme = useMantineTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrop = (files) => {
    setUploadedFiles(files);
    onImageUpload(files[0]);
  };

  const handleReject = () => {
    setUploadedFiles([]);
    onImageUpload(null);
  };

  return (
    <Dropzone
      style={{
        width: '300px',
        height: '300px',
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        position: 'relative'
      }}
      onDrop={handleDrop}
      onReject={handleReject}
      maxSize={3 * 1024 ** 2}
      accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}>
      {uploadedFiles.length > 0 ? (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          {uploadedFiles.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${file.name}`}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          ))}
        </div>
      ) : defaultImage ? (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          <img
            src={imageSrc}
            alt={`Uploaded image`}
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
          ;
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Įkelkite nuotrauką čia arba paspauskite jei norite pasirinkti
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Prekės nuotrauka gali būti png arba jpg formato
              </Text>
            </div>
          </Group>
        </div>
      )}
      {imageError && (
        <Text
          style={{
            minWidth: '90%',
            textAlign: 'center',
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: theme.colors.red[6],
            fontSize: rem(14)
          }}>
          {imageError}
        </Text>
      )}
    </Dropzone>
  );
}
ImageDropzone.propTypes = {
  onImageUpload: function (props, propName, componentName) {
    if (typeof props[propName] !== 'function') {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
      );
    }
  },
  imageError: function (props, propName, componentName) {
    if (typeof props[propName] !== 'string') {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
      );
    }
  },
  defaultImage: function (props, propName, componentName) {
    if (
      typeof props[propName] !== 'string' &&
      typeof props[propName] !== 'object' &&
      props[propName] !== undefined
    ) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
      );
    }
  },
  imageSrc: function (props, propName, componentName) {
    if (
      typeof props[propName] !== 'string' &&
      typeof props[propName] !== 'object' &&
      props[propName] !== undefined
    ) {
      return new Error(
        `Invalid prop '${propName}' supplied to '${componentName}'. Validation failed.`
      );
    }
  }
};
