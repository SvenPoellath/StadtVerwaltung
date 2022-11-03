import React from 'react';
import './Form.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Citizen from '../globalVariables/Citizen';

export default function Form(){
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
    });
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        Citizen.firstName = data.firstName;
        Citizen.lastName=data.lastName;
        Citizen.mailAddress=data.email;
        Citizen.phoneNumber=data.phoneNumber;
       navigate('/description');
    }
    return(
        <div className='Container'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <table>
            <tr>
                <td>
                    <h3 className='header'>Kontakt Information</h3>
                </td>
            </tr>
            <tr>
                <td>
                    <label className='label'>Vorname*</label>
                </td>
                <td>
                    <label className='label'>Nachname*</label> 
                </td>
            </tr>
            <tr>
                <td>
                    
                    <input
                        { ...register('firstName')}
                        type='text'
                        className="textbox Vorname-TextBox"
                        placeholder="Vorname"
                        required='true'
                    />
                </td>
                <td>
                    <input
                        { ...register('lastName')}
                        type='text'
                        className="textbox Nachname-TextBox"
                        placeholder="Nachname"
                        required='true'
                    /> 
                </td>
            </tr>
            <tr>
                <td>
                    <label className='label'>E-Mail*</label>
                </td>
                <td>
                    <label className='label'>Telefonnummer</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input
                        { ...register('email')}
                        type='email'
                        className="textbox Email-TextBox"
                        placeholder="Email"
                        required='true'
                    />
                </td>
                <td>
                    <input
                        { ...register('phoneNumber')}
                        type='text'
                        className="textbox Telefonnummer-TextBox"
                        placeholder="Telefonnummer"
                    />
                </td>
            </tr>
            <tr>
                (*)Pflichtfelder
            </tr>
            <tr>
                <input type='submit' value='Submit' />
            </tr>
            </table>
            </form>
        </div>
    );

}