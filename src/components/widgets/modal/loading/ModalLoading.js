import Modal from 'react-bootstrap/Modal';
import { numbFormat } from '../../../../utils/tools';
import './ModalLoading.css';

function ModalLoading({show, modalData}){
  return (
    <Modal show={show} onHide={() => ''}>
      <Modal.Header>
        <div className='mtc-mdl-hd'>Loading...</div>
      </Modal.Header>
      <Modal.Body> 
        <div className='pd-l20 pd-r20'>         
          <div className="progress" role="progressbar" aria-label="Animated striped" aria-valuenow={modalData.perc} aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: `${modalData.perc}%`}}></div>
          </div>
          <div className='mtc-mdl-stats'>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Chunks processed</td>
                  <td>
                    {numbFormat(modalData.chunkSize ?? 0)} / <span>{numbFormat(modalData.fileSize ?? 0)}</span>
                  </td>
                </tr>
                <tr>
                  <td>Number of entries</td>
                  <td>{numbFormat(modalData.lineCount ?? 0)}</td>
                </tr>
                <tr>
                  <td>Time elapsed</td>
                  <td>{modalData.timer ?? 0} secs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalLoading;