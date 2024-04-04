import './LazyLoad.css';

function LazyLoad(){
  const boxSm = ['box-lazyload pulse', 'box-lazyload pulse', 'box-lazyload pulse', 'box-lazyload pulse'];
  const boxMd = ['box-lazyload pulse', 'box-lazyload pulse'];
  return (
    <>
      <div className='mtc-lzy-container-sm'>
        {boxSm.map((clss, index) => <div className={clss} key={index}>&nbsp;</div>)}
      </div>
      <div className='mtc-lzy-container-md'>
        {boxMd.map((clss, index) => <div className={clss} key={index}>&nbsp;</div>)}
      </div>
    </>
  );
}

export default LazyLoad;
