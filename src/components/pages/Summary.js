import React from 'react';
import './Form.css'
import Report from '../globalVariables/Report';
import Citizen from '../globalVariables/Citizen';

export default function Summary(){
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
    });
    return(
        <div className='Container'>
            <table>
            <tr>
                <td>
                    <label className='label Beschreibung-Text'>Beschreibung</label>
                </td>
            </tr>
            <tr>
                <td>
                    <label className='dataEntry'>
                        {Report.description}
                    </label>
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
                    <label className='label'>Vorname</label>
                </td>
                <td>
                    <label className='label'>Nachname</label>
                </td>
            </tr>
            <tr>
                <td>
                    <label className='dataEntry'>{Citizen.firstName}</label>
                </td>
                <td>
                    <label className='dataEntry'>{Citizen.lastName}</label>
                </td>
            </tr>
            <tr>
                <td>
                <label className='label'>E-Mail</label>
                </td>
                <td>
                <label className='label'>Telefonnummer</label>
                </td>
            </tr>
            <tr>
                <td>
                    <label className='dataEntry'>{Citizen.mailAddress}</label>
                </td>
                <td>
                    <label className='dataEntry'>{Citizen.phoneNumber}</label>
                </td>
            </tr> 
            </table>
        </div>
    );
}