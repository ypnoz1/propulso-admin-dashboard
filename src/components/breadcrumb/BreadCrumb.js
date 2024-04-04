import './BreadCrumb.css';

function BreadCrumb({arrayBreadCrumb}){
  return (
    <div className='mtc-brc-container'>
      <span className='mtc-brc-sep'>
        Home
      </span>
      {
        arrayBreadCrumb.map((elm, index) => {
          return (
            <span key={index}>
              <span className='mtc-brc-sep'> / </span>
              <span className='mtc-brc-elm'>{elm}</span>
            </span>
          )
        })
      }
    </div>
  );
}

export default BreadCrumb;
