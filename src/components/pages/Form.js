import React from 'react';
import './Form.css'
import { useForm } from 'react-hook-form';
import App from '../../App'
import { useNavigate } from 'react-router-dom';

export default function Form(){
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
       App.dataEntry = JSON.stringify(data);
       navigate('/summary');
    }
    return(
        <div className='Container'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <table>
            <tr>
                <td>
                    <label className='label Beschreibung-Text'>Beschreibung*</label>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        { ...register('description')}
                        type='textarea'
                        className="textbox Beschreibung-TextBox"
                        placeholder="Beschreibung"
                        required='true'
                        value={App.Beschreibung}
                    />
                </td>
                <td>

                </td>
            </tr>
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
                        { ...register('firstname')}
                        type='text'
                        className="textbox Vorname-TextBox"
                        placeholder="Vorname"
                        required='true'
                    />
                </td>
                <td>
                    <input
                        { ...register('lastname')}
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
                        { ...register('phonenumber')}
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