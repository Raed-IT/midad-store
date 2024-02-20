import {useState} from "react";
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadAndDisplayImage = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br/>
                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}

            <br/>
            <br/>
            <Button
                component="label"
                role={undefined}
                color='info'
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}
            >
                Upload Image
                <VisuallyHiddenInput type="file" name="myImage" onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}/>
            </Button>

        </div>
    );
};
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default UploadAndDisplayImage;