import { UserCircleIcon } from '@heroicons/react/24/outline';
import { CloseButton } from 'react-bootstrap';

import { ChangeEvent, FC } from 'react';

interface ImageUploadProps {
  id: string;
  image: string | null;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}

export const UploadImage: FC<ImageUploadProps> = ({
  id,
  image,
  handleImageUpload,
  handleRemoveImage,
}) => {
  return (
    <div className='image__upload'>
      <label htmlFor={id}>
        <div className='image__upload_icon'>
          {image ? (
            <>
              <img src={image} alt='Selected' />
              <CloseButton
                className='image__remove'
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleRemoveImage();
                }}
              />
            </>
          ) : (
            <UserCircleIcon width='3.5rem' />
          )}
        </div>
      </label>
      <input
        id={id}
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
    </div>
  );
};
