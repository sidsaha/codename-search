// eslint-disable
// this is an auto generated file. This will be overwritten

export const search = `query Search($params: SearchParams) {
  search(params: $params) {
    items {
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
    nextToken
    total
  }
}
`;
export const getVideoMetadata = `query GetVideoMetadata($id: ID!) {
  getVideoMetadata(id: $id) {
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
export const listVideoMetadatas = `query ListVideoMetadatas(
  $filter: ModelVideoMetadataFilterInput
  $limit: Int
  $nextToken: String
) {
  listVideoMetadatas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const searchVideoMetadatas = `query SearchVideoMetadatas(
  $filter: SearchableVideoMetadataFilterInput
  $sort: SearchableVideoMetadataSortInput
  $limit: Int
  $nextToken: Int
) {
  searchVideoMetadatas(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
  }
}
`;
