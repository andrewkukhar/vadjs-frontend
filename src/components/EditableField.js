import React from 'react';
import { TextField, Button,  } from '@mui/material';
import { Buffer } from 'buffer';

export default function EditableField({ djData, label, value, isEditing, onChange, toggleEdit, validator }) {
  return (
    <>
      {isEditing ? (
        label === 'Image' ? (
          <>
            <input type="file" onChange={onChange} />
            <img 
                src={value}
                alt="User" 
                width="100" 
                height="100" 
            />
            <Button onClick={() => toggleEdit(false, validator)}>Save</Button>
          </>
        ) : (
          <>
            <TextField 
              label={label}
              variant="outlined"
              value={value}
              onChange={onChange}
            />
            <Button onClick={() => toggleEdit(false, validator)}>Save</Button>
          </>
        )
      ) : (
        <>
          {label === 'Image' ? 
            (
              <img 
                src={djData?.djInfo?.image?.data 
                  ? `data:${djData?.djInfo?.image?.contentType};base64,${Buffer.from(djData?.djInfo?.image?.data).toString('base64')}` 
                  : 'path_to_default_image'} 
                alt="User" 
                width="100" 
                height="100" 
              />
            ) 
            : (<span>{value || `No ${label.toLowerCase()} available.`}</span>)
          }
          <Button onClick={() => toggleEdit(true)}>Edit</Button>
        </>
      )}
    </>
  );
}
