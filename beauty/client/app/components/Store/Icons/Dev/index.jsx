import React from 'react';
import './style.css'

{/*href="mailto:olalekanisaac75@gmail.com?subject=Make%20me%20a%20website&body=Good%20day,%0D%0A%0D%0AI%20would%20like%20a%20website."*/}

const Dev = () => {
    return (
        <div
          style={{
            display: 'flex',
            width: 'fit-content',
            border: '1px solid #ffffff',
            borderRight: '5px solid #ffffff',
            borderLeft: '5px solid #ffffff',
            padding: '5px 10px',
            marginTop: '40px',
            letterSpacing: '2px',
          }}
          className='text-white'
        >
        <a
          style={{
            fontSize: '12px',
            marginLeft: '5px',
            textDecoration: 'none',
            color: '#fff',
            display: 'flex'
            }}
            href='https://niox.store'
        >

          <span className="heartt"></span>
            <p style={{ margin: '0px 0px 0px 0px', fontSize: '10px', color: '#fff' }}>Powered by Niox</p>
          </a>
        </div>
    )
}

export default Dev;
