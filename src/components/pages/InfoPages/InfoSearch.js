import Search from 'react-leaflet-search/lib';
import Report from '../../globalVariables/Report';
import { useForm } from 'react-hook-form';
import './InfoPages.css'
function IdSearchPage() {
    const { register, handleSubmit } = useForm();
    var FallID 

    const searchReport = (data) => {
        var postRequest = new XMLHttpRequest();
        var url = "http://localhost:8080/report?id=" + data.FallID;
        postRequest.open("GET", url, false);
        postRequest.setRequestHeader('content-type','text/plain')
        postRequest.send(data.FallID)
        console.log(postRequest.responseText);
        //navigate('/summary');
    }
    return (
      <div className='InfoPage-container'>
        <form onSubmit={handleSubmit(searchReport)}>
        <table className='InfoPage-Text'>
            <tr>
                <th>
                    <h1>Fall Suche</h1>
                    <br></br>
                </th>
            </tr>
            <tr>
                <td>
                <p>Geben Sie die Fall ID ein die Sie Suchen möchen<br />
<br />
Ihre Fall ID: <input { ...register('FallID', { required: true, maxLength: 20})} type='text' placeholder='Fall ID'/><br /><br/>
</p>
                  </td>
            </tr>
            <tr>
                <td>
                    <input type='submit' value='Suchen'/>
                </td>
            </tr>
        </table>
        </form>
        
      </div>
    );
  }
  
  export default IdSearchPage;
  