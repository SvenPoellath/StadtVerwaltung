import React from 'react';
import './Form.css'

export default function Form(){
    return(
        <div className='Container'>
            <table>
            <tr>
                <td>
                    <label className='label Beschreibung-Text'>Beschreibung*</label>
                </td>
            </tr>
            <tr>
                <td>
                    <textarea
                        type='textarea'
                        className="textbox Beschreibung-TextBox"
                        placeholder="Beschreibung"
                        required='true'
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
                    <input
                        type='text'
                        className="textbox Vorname-TextBox"
                        placeholder="Vorname"
                        required='true'
                    />
                </td>
                <td>
                    <label className='label'>Nachname*</label>
                    <input
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
                    <input
                        type='text'
                        className="textbox Email-TextBox"
                        placeholder="Email"
                        required='true'
                    />
                </td>
                <td>
                    <label className='label'>Telefonnummer</label>
                    <input
                        type='text'
                        className="textbox Telefonnummer-TextBox"
                        placeholder="Telefonnummer"
                    /> 
                </td>
            </tr> 
            </table>
        </div>
    );

}