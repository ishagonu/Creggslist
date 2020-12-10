import React from 'react';
import {IoNavigateCircleOutline, IoAlertCircleOutline, IoPinOutline} from 'react-icons/io5';
import {AiOutlineMail, } from 'react-icons/ai';
import {BiMoney, } from 'react-icons/bi';
export default function Item_Info(props){
    return(
	<div className='item-info'>

	   
	    <div style={{display: 'inline-block'}}>
		<img src={props.img_link} alt='error' width='350'/>
		 <h3>
		 {props.name}</h3>
		<p className='item-descript'><IoAlertCircleOutline/> <span style={{fontWeight: 'bold'}}> Description :</span> {props.descript}</p>
	    </div>

	    <br/>
	    <p className='item-price'> <BiMoney/> <span style={{fontWeight: 'bold'}}> Price :</span> ${props.price}  </p>
	    <p className='item-zip'><IoNavigateCircleOutline/><span style={{fontWeight: 'bold'}}> Area :</span> {props.zip}</p>
	    <p className='item-contact'><AiOutlineMail/><span style={{fontWeight: 'bold'}}> Contact :</span> {props.email}</p>
	</div>
    );    


}
