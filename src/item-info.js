import React from 'react';

export default function Item_Info(props){
    return(
	<div className='item-info'>
	    <div style={{display: 'flex'}}>
		<h3><div style={{color: 'green'}}>${props.price}</div>
		{props.name} </h3>
	    </div>
	    <img src={props.img_link} alt='error' width='250'/>
	    <p className='item-descript'>{props.descript}</p>
	    <br/>
	    <br/>
	    <p className='item-zip'>Area : {props.zip}</p>
	    <p className='item-contact'>Contact : {props.email}</p>
	</div>
    );    


}
