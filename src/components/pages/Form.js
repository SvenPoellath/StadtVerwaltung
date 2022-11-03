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
       navigate('/summary');
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
                        { ...register('firstName', { required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i})}
                        type='text'
                        className="textbox Vorname-TextBox"
                        placeholder="Vorname"
                    />
                </td>
                <td>
                    <input
                        { ...register('lastName', { required: true, maxLength: 30, pattern: /^[A-Za-z]+$/i})}
                        type='text'
                        className="textbox Nachname-TextBox"
                        placeholder="Nachname"
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
                        { ...register('email', { required: true, maxLength: 40})}
                        type='email'
                        className="textbox Email-TextBox"
                        placeholder="Email"
                        required='true'
                    />
                </td>
                <td>
                    <input
                        { ...register('phoneNumber', { maxLength: 14 ,pattern: /^[0-9]+$/i})}
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
                <input type='submit' value='Weiter' />
            </tr>
            </table>
            </form>
        </div>
    );

}