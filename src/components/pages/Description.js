import React from 'react';
import './Form.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Report from '../globalVariables/Report';

export default function Description(){
    
    var file;
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
    });
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
       Report.description = data.description;
       navigate('/form');
    }
    const fileSelectedHandler = event => {
        file=event.target.files[0];
        console.log(file)
    }
    return(
        <div className='Container'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <table>
            <tr>
                <td>
                    <label className='label Beschreibung-Text'>Beschreiben Sie den Mängel*</label>
                </td>
                    <label className='label'>Sie können auch ein Bild hinzufügen</label>
            </tr>
            <tr>
                <td>
                    <textarea
                        { ...register('description')}
                        type='textarea'
                        className="textbox Beschreibung-TextBox"
                        placeholder="Beschreibung"
                        required={true}
                    />
                </td>
                <td>
                    <input type='file' onChange={fileSelectedHandler}/>
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