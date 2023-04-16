import { BaseSyntheticEvent } from 'react';

export interface FileUploadProps {
  name: string;
  onChange?: (e: BaseSyntheticEvent) => void;
}
