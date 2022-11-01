import React from 'react';
import './Form.css'
import App from '../../App'

export default function Summary(){
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
                        value={App.dataEntry.description}
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
                        value="Vorname"
                        required='true'
                    />
                </td>
                <td>
                    <label className='label'>Nachname*</label>
                    <input
                        type='text'
                        className="textbox Nachname-TextBox"
                        value="Nachname"
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
                        value="Email"
                        required='true'
                    />
                </td>
                <td>
                    <label className='label'>Telefonnummer</label>
                    <input
                        type='text'
                        className="textbox Telefonnummer-TextBox"
                        value="Telefonnummer"
                    /> 
                </td>
            </tr> 
            </table>
        </div>
    );

}