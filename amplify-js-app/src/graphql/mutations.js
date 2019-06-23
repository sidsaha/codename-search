// eslint-disable
// this is an auto generated file. This will be overwritten

export const createVideoMetadata = `mutation CreateVideoMetadata($input: CreateVideoMetadataInput!) {
  createVideoMetadata(input: $input) {
    id
    title
    description
    time
    created
    modified
    accessed
    duration
    contains
    category
    folder
    geolocation {
      lat
      lon
    }
    hasSound
    framesize {
      width
      height
    }
    framerate
    format
  }
}
`;
export const updateVideoMetadata = `mutation UpdateVideoMetadata($input: UpdateVideoMetadataInput!) {
  updateVideoMetadata(input: $input) {
    id
    title
    description
    time
    created
    modified
    accessed
    duration
    contains
    category
    folder
    geolocation {
      lat
      lon
    }
    hasSound
    framesize {
      width
      height
    }
    framerate
    format
  }
}
`;
export const deleteVideoMetadata = `mutation DeleteVideoMetadata($input: DeleteVideoMetadataInput!) {
  deleteVideoMetadata(input: $input) {
    id
    title
    description
    time
    created
    modified
    accessed
    duration
    contains
    category
    folder
    geolocation {
      lat
      lon
    }
    hasSound
    framesize {
      width
      height
    }
    framerate
    format
  }
}
`;
