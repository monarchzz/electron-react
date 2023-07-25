import { graphql } from 'renderer/gql';

const AttachmentFragment = graphql(`
  fragment AttachmentFragment on AttachmentPayload {
    id
    fileName
    length
    contentType
    url
  }
`);

export default AttachmentFragment;
