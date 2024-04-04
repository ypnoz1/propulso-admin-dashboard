import './BoxContentOne.css';

function BoxContentOne({options}){
  return (
    <div className={`bx-cont-one`}>
      <div className='bx-cont-ht'>
        <div className='bx-cont-one-tl fltl'>{options?.name ?? ''}</div>
        <div className='bx-cont-one-tl-nb fltr'>Best: {options?.numBest ?? ''}</div>
        <div className='clrboth'></div>
      </div>
      <div className=''>
        <div className='bx-cont-one-numb fltl'>{options?.number ?? 0}</div>
        <div className={`${options?.bg}bx-cont-one-icn fltr`}>{options?.icn ?? ''}</div>
        <div className='clrboth'></div>
      </div>
    </div>
  );
}

export default BoxContentOne;