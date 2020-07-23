import React from 'react';
import ImageUploader from '../../../components/Uploader';

export default function UserImageManage(props: any) {
  console.log(props.match.params.id);
  return <ImageUploader title="Add Image" backTo="/profile" />;
}
