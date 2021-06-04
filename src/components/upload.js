/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource theme-ui */ 
import {useEffect} from 'react';
import {Flex, Box} from 'theme-ui';
import {useDropzone} from 'react-dropzone';
import {uploadCats} from '../api';
import { useToasts } from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';

function Upload () {
    const {acceptedFiles, getRootProps, getInputProps, } = useDropzone();
    const { addToast } = useToasts();
    const history = useHistory();

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <pre>{JSON.stringify(file, null, 2)}</pre>
        </li>
      ));

      const uploadCatImage = async (files) => {
        if(acceptedFiles.length) {
            try {
                addToast('Uploading image', {
                    appearance: 'info',
                    autoDismiss: true
                  })
                await uploadCats(files);
                history.push('/');
            } catch (err) {
                addToast('Something went wrong uploading image', {
                    appearance: 'error',
                    autoDismiss: true,
                  })
            }
        }
      }

     useEffect(() => {

        uploadCatImage(acceptedFiles)

     }, [acceptedFiles])

    return (
        <Box as="section" mx="auto" sx={{
            minWidth:300,
            maxWidth: 1280
        }}>
        <Flex {...getRootProps({className: 'dropzone'})} sx={{
            justifyContent: 'center',
            padding: 80,
            backgroundColor: 'muted',
            border: '1px dashed',
            borderColor: 'secondary'
        }}>
          <input {...getInputProps()} />
          <p sx={{
              fontSize: '48px'
          }}>Drag 'n' drop some files here, or click to select files</p>
        </Flex>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
        </Box>
    )
}

export default Upload;