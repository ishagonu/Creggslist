// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// CSS
import './view-post.css';

export default function View_Post(){
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
	console.log(imageList, addUpdateIndex);
    };

    return (
	<div className='header'>
	    <div className='Make_post'>
		<ImageUploading
		multiple
		values={images]
		maxNumber={maxNumber}
		dataURLKey='data_url'
		>
		
