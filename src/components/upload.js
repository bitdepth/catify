/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource theme-ui */ 
import {useEffect} from 'react';
import {Flex, Container} from 'theme-ui';
import {useDropzone} from 'react-dropzone';
import {uploadCats} from '../api';
import { useToasts } from 'react-toast-notifications';
import {useHistory} from 'react-router-dom';

function Upload () {
    const {acceptedFiles, getRootProps, getInputProps, } = useDropzone({
        multiple: false
    });
    const { addToast } = useToasts();
    const history = useHistory();

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
        <Container sx={{
            maxWidth: 1280,
            padding: [1, 2, 4]
        }}>
        <Flex {...getRootProps({className: 'dropzone'})} sx={{
            justifyContent: 'center',
            padding: [20, 40, 60],
            backgroundColor: 'muted',
            border: '1px dashed',
            borderColor: 'secondary'
        }}>
          <input {...getInputProps()} />
          <p sx={{
              fontSize: [16, 32, 48]
          }}>Drag 'n' drop some files here, or click to select files</p>
        </Flex>
        </Container>
    )
}

export default Upload;