import Report from '../../globalVariables/Report';
import '../InfoPages/InfoPages.css'
function IdInfoPage() {
    const print = () => {
        window.print();
    }
    return (
      <div className='InfoPage-container'>
        <table className='InfoPage-Text'>
            <tr>
                <th>
                    <h1>Wichitge Information</h1>
                    <br></br>
                </th>
            </tr>
            <tr>
                <td>
                <p>Wenn Sie Ihren Fall spezifisch mit allen Informationen finden wollen hilft ihnen Ihre Fall ID diese Können sie dann im Fall Suchen Bereich angeben und Ihr Fall wird Ihnen angezeigt<br />
<br />
Ihre Fall ID: {Report.id}<br /><br/>
</p>
                  </td>
            </tr>
            <tr>
                <td>
                    <button onClick={print}>Seite Drucken</button>
                </td>
            </tr>
        </table>
        
        
      </div>
    );
  }
  
  export default IdInfoPage;
  