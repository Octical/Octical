'use client';

import { useState, useRef, FormEvent } from 'react';

interface BlobData {
  url: string;
}

export default function UploadImg() {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [blob, setBlob] = useState<BlobData | null>(null);

  return (
    <>
      <h1>Upload An Image of Place</h1>

      <h3>This is here as a placeholder for an actual camera</h3>

      <form
        onSubmit={async (event: FormEvent) => {
          event.preventDefault();

          if (inputFileRef.current && inputFileRef.current.files) {
            const file = inputFileRef.current.files[0];

            try {
              const response = await fetch(
                `http://localhost:5000/upload?filename=${file.name}`,
                {
                  method: 'POST',
                  body: file,
                },
              );

              const newBlob: BlobData = await response.json();
              setBlob(newBlob);
            } catch (error) {
              console.error('Error uploading file:', error);
            }
          }
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
